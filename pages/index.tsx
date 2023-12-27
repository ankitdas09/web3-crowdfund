import React, { ReactElement, useEffect } from 'react';
import factory from '../ethereum/factory';
import { Button, Card, Container } from 'semantic-ui-react';
import Link from 'next/link';

type Items = { header: string; description: ReactElement; fluid: boolean };
type Campaign = string;

type Props = {
	campaigns: [Campaign];
};

const Index = (props: Props) => {
	return (
		<>
			<h3>Open Campaigns</h3>
			<Link href={'/campaigns/new'}>
				<Button content="Create Campaign" icon="add" primary floated="right" />
			</Link>
			<Card.Group items={makeCardProps(props.campaigns)} />
		</>
	);
};

function makeCardProps(campaigns: [Campaign]): [Items?] {
	let items: [Items?] = [];
	campaigns.forEach((c) => {
		items.push({
			header: c,
			description: <Link href={`/campaigns/${c}`}>View Campaign</Link>,
			fluid: true,
		});
	});
	return items;
}

export const getServerSideProps = async (): Promise<{ props: Props }> => {
	const campaigns: [string] = await factory.methods.getDeployedCampaigns().call();

	return {
		props: {
			campaigns,
		},
	};
};

export default Index;
