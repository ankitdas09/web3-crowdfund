import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Button } from 'semantic-ui-react';

const ViewRequests = () => {
	const router = useRouter();
	return (
		<div>
			<h2>Requests</h2>
			<Link href={`/campaigns/${router.query.address}/requests/new`}>
				<Button primary>New Request</Button>
			</Link>
		</div>
	);
};

export default ViewRequests;
