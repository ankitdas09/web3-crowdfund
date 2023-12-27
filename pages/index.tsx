import React, { useEffect } from 'react';
import factory from '../ethereum/factory';

type Props = {
	campaigns: [string];
};

const Index = (props: Props) => {
	return (
		<div>
			{props.campaigns.map((c, idx) => {
				return <p key={idx}>{c}</p>;
			})}
		</div>
	);
};
export const getServerSideProps = async () => {
	const campaigns = await factory.methods.getDeployedCampaigns().call();
	return {
		props: {
			campaigns,
		},
	};
};

export default Index;
