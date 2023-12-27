import { useRouter } from 'next/router';
import React from 'react';

const Campaign = () => {
	const router = useRouter();
	return <div>Campaign: {router.query.id}</div>;
};

export default Campaign;
