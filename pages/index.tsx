import React, { useEffect } from 'react';
import factory from '../ethereum/factory';
import { Button, Card, Container } from 'semantic-ui-react';

type Items = { header: string; description: string; fluid: boolean };
type Campaign = string;
type Props = {
	campaigns: [Campaign];
	items: [Items?];
};

const Index = (props: Props) => {
	return (
		<>
			<h3>Open Campaigns</h3>
			<Button content="Create Campaign" icon="add" primary floated="right" />
			<Card.Group items={props.items} />
		</>
	);
};

function makeCardProps(campaigns: [Campaign]): [Items?] {
	let items: [Items?] = [];
	campaigns.forEach((c) => {
		items.push({ header: c, description: 'View Campaign', fluid: true });
	});
	return items;
}

export const getServerSideProps = async (): Promise<{ props: Props }> => {
	const campaigns: [string] = await factory.methods.getDeployedCampaigns().call();
	let items = makeCardProps(campaigns);

	return {
		props: {
			campaigns,
			items,
		},
	};
};

export default Index;
