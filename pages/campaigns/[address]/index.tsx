import { useRouter } from 'next/router';
import React from 'react';
import Campaign from '../../../ethereum/campaign';
import { NextPageContext } from 'next';
import { Button, Card, Grid } from 'semantic-ui-react';
import web3 from '../../../ethereum/web3';
import ContributeForm from '../../../components/contribute-form';
import Link from 'next/link';

type Props = {
	minAmt: number;
	balance: number;
	numRequest: number;
	totalContributors: number;
	manager: string;
};

type ContractSummaryResponse = {
	'0': bigint;
	'1': bigint;
	'2': bigint;
	'3': bigint;
	'4': string;
};

type CardGroupItem = {
	header: string;
	description: string;
	meta?: string;
	style?: any;
};
const CampaignShow = (props: Props) => {
	const router = useRouter();
	return (
		<div>
			<Link href={`/`} style={{ display: 'block', marginBottom: '12px' }}>
				Back
			</Link>
			<Grid>
				<Grid.Row>
					<Grid.Column width={10}>
						<Card.Group items={makeCardGroup(props)} />
					</Grid.Column>
					<Grid.Column width={6}>
						<ContributeForm />
					</Grid.Column>
				</Grid.Row>
				<Grid.Row>
					<Grid.Column>
						<Link href={`/campaigns/${router.query.address}/requests`}>
							<Button primary>View Requests</Button>
						</Link>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</div>
	);
};

function makeCardGroup(props: Props): CardGroupItem[] {
	const items: CardGroupItem[] = [
		{
			header: props.manager,
			description: 'The manager created this campaign and can make requests to withdraw balance.',
			meta: 'Address of manager',
			style: { overflowWrap: 'break-word' },
		},
		{
			header: props.minAmt.toString(),
			description: 'You must contribute atleast this much amount to be a approver.',
			meta: 'Miminum Contribution (wei)',
		},
		{
			header: props.numRequest.toString(),
			description:
				'A request tries to withdraw money from the contract. Requests must be approved by the approvers',
			meta: 'Number of requests',
		},
		{
			header: props.totalContributors.toString(),
			description: 'Number of people who have already donated to this campaign.',
			meta: 'Number of contributors',
		},
		{
			header: web3.utils.fromWei(props.balance, 'ether'),
			description: 'Balance shows how much money is left to spend.',
			meta: 'Campaign balance (ether)',
		},
	];

	return items;
}

export async function getServerSideProps(
	context: NextPageContext,
): Promise<{ props?: Props; redirect?: any }> {
	const { address } = context.query;
	try {
		const campaign = Campaign(address);
		const summary: ContractSummaryResponse = await campaign.methods.getSummary().call();
		return {
			props: {
				minAmt: Number(summary[0]),
				balance: Number(summary[1]),
				numRequest: Number(summary[2]),
				totalContributors: Number(summary[3]),
				manager: summary[4],
			},
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

export default CampaignShow;
