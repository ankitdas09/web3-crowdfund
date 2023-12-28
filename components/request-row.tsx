import React, { useEffect, useState } from 'react';
import { Button, Label, Table } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import { useRouter } from 'next/router';
import web3 from '../ethereum/web3';

export type Cell = {
	id: number;
	amt: number;
	receipient: string;
	description: string;
	approvals: number;
	completed: boolean;
	totalContributors: number;
};
const RequestRow = ({
	id,
	amt,
	description,
	receipient,
	approvals,
	completed,
	totalContributors,
}: Cell) => {
	const router = useRouter();
	const readyToFinalize = approvals > totalContributors / 2;

	async function onApprove() {
		try {
			const campaign = Campaign(router.query.address);
			const accounts = await web3.eth.getAccounts();
			await campaign.methods.approveRequest(id).send({ from: accounts[0] });
			router.replace(`/campaigns/${router.query.address}/requests`);
		} catch (error) {
			// alert(error.message);
		}
	}
	async function onFinalize() {
		try {
			const campaign = Campaign(router.query.address);
			const accounts = await web3.eth.getAccounts();
			await campaign.methods.finalizeRequest(id).send({ from: accounts[0] });
			router.replace(`/campaigns/${router.query.address}/requests`);
		} catch (error) {
			// alert(error.message);
		}
	}

	return (
		<Table.Row disabled={completed} positive={readyToFinalize && !completed}>
			<Table.Cell>
				<Label ribbon>{id}</Label>
			</Table.Cell>
			<Table.Cell>{description}</Table.Cell>
			<Table.Cell>{amt}</Table.Cell>
			<Table.Cell>
				{approvals}/{totalContributors}
			</Table.Cell>
			<Table.Cell>{receipient}</Table.Cell>
			<Table.Cell>
				<Button color="green" onClick={onApprove} disabled={completed} basic>
					Approve
				</Button>
			</Table.Cell>
			<Table.Cell>
				<Button color="blue" onClick={onFinalize} disabled={completed || !readyToFinalize} basic>
					Finalize
				</Button>
			</Table.Cell>
		</Table.Row>
	);
};

export default RequestRow;
