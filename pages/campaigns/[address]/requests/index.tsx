import { NextPageContext } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Button, Label, Table } from 'semantic-ui-react';
import Campaign from '../../../../ethereum/campaign';
import RequestRow, { Cell } from '../../../../components/request-row';
import web3 from '../../../../ethereum/web3';

type Request = {
	amt: number;
	receipient: string;
	description: string;
	approvals: number;
	completed: boolean;
};

type RequestResponse = {
	amt: BigInt;
	receipient: string;
	description: string;
	approvals: BigInt;
	completed: boolean;
};
type Props = {
	requests: Request[];
	totalContributors: number;
};

const ViewRequests = (props: Props) => {
	const router = useRouter();
	const { address } = router.query;
	return (
		<div>
			<h2>Requests</h2>
			<Link href={`/campaigns/${address}/requests/new`}>
				<Button primary floated="right" style={{ marginBottom: '12px' }}>
					New Request
				</Button>
			</Link>
			<Table>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>ID</Table.HeaderCell>
						<Table.HeaderCell>Description</Table.HeaderCell>
						<Table.HeaderCell>Amount (Ether)</Table.HeaderCell>
						<Table.HeaderCell>Approval Count</Table.HeaderCell>
						<Table.HeaderCell>Receipient</Table.HeaderCell>
						<Table.HeaderCell>Approve</Table.HeaderCell>
						<Table.HeaderCell>Finalize</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				{renderRows(props.requests, props.totalContributors)}
			</Table>
			<p>Found {props.requests.length} requests.</p>
		</div>
	);
};

function renderRows(requests: Request[], totalContributors: number): React.JSX.Element {
	let rows = requests.map((request, idx) => {
		return (
			<RequestRow
				id={idx}
				amt={web3.utils.fromWei(request.amt, 'ether')}
				description={request.description}
				approvals={request.approvals}
				receipient={request.receipient}
				completed={request.completed}
				totalContributors={totalContributors}
			/>
		);
	});
	return <Table.Body>{rows}</Table.Body>;
}

export async function getServerSideProps(
	ctx: NextPageContext,
): Promise<{ props?: Props; redirect?: any }> {
	try {
		const { address } = ctx.query;
		const campaign = Campaign(address);
		let numRequests = await campaign.methods.getRequestCount().call();
		let totalContributors: BigInt = await campaign.methods.totalContributors().call();

		numRequests = Number(numRequests);
		const requests: RequestResponse[] = await Promise.all(
			Array(numRequests)
				.fill(NaN)
				.map((element, index) => {
					return campaign.methods.requests(index).call();
				}),
		);

		let reqs: Request[] = [];
		requests.forEach((request, idx) => {
			reqs[idx] = {
				amt: Number(request['amt']),
				description: request['description'],
				approvals: Number(request['approvals']),
				receipient: request['receipient'],
				completed: request['completed'],
			};
		});

		return {
			props: { requests: reqs, totalContributors: Number(totalContributors) },
		};
	} catch (error) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}
}

export default ViewRequests;
