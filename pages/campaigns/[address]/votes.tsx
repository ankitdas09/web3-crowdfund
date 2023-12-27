import { useRouter } from 'next/router';
import React from 'react';

const Votes = () => {
	const router = useRouter();

	return <div>Votes for campaign : {router.query.address}</div>;
};

export default Votes;
