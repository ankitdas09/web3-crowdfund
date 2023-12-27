import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, Message } from 'semantic-ui-react';
import web3, { init } from '../../../../ethereum/web3';
import Campaign from '../../../../ethereum/campaign';

const NewRequest = () => {
	const [description, setDescription] = useState<string>();
	const [value, setValue] = useState<number>();
	const [receipient, setReceipient] = useState<string>();
	const [err, setErr] = useState<string>('');
	const [tc, setTC] = useState(false);
	const [loading, setLoading] = useState<boolean>(false);

	const router = useRouter();
	const { address } = router.query;
	async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		try {
			e.preventDefault();
			setLoading(true);
			setErr('');

			const { address } = router.query;
			const accounts: [string?] = await web3.eth.getAccounts();
			if (!accounts.length) {
				init();
				setLoading(false);
				return;
			}

			const campaign = Campaign(address);
			await campaign.methods
				.createRequest(description, web3.utils.toWei(value, 'ether'), receipient)
				.send({ from: accounts[0] });

			setLoading(false);
			setDescription('');
			setTC(false);
			router.replace(`/campaigns/${address}/requests`);
		} catch (error) {
			setErr(error.message);
			setTC(false);
			setLoading(false);
		}
	}

	return (
		<div>
			<Link href={`/campaigns/${address}`}>Back</Link>
			<h2>Create new request</h2>
			<Form onSubmit={onSubmit} error={!!err.length}>
				<Form.Field>
					<label>Description</label>
					<Input
						// label="Ether"
						// labelPosition="right"
						placeholder="Description"
						type="text"
						value={description}
						required
						onChange={(e) => {
							setDescription(e.target.value);
						}}
					/>
				</Form.Field>
				<Form.Field>
					<label>Value</label>
					<Input
						label="Ether"
						labelPosition="right"
						placeholder="Amount"
						type="number"
						value={value}
						minimum={0}
						step={'any'}
						required
						onChange={(e) => {
							try {
								setValue(parseFloat(e.target.value));
							} catch (error) {
								alert(error);
							}
						}}
					/>
				</Form.Field>
				<Form.Field>
					<label>Receipient</label>
					<Input
						// label="Ether"
						// labelPosition="right"
						placeholder="Receipient"
						type="text"
						value={receipient}
						required
						onChange={(e) => {
							setReceipient(e.target.value);
						}}
					/>
				</Form.Field>
				<Form.Field>
					<Checkbox label="The receipient is correct." checked={tc} onClick={() => setTC(!tc)} />
				</Form.Field>
				<Message error header="Oops" content={err} />
				<Button type="submit" loading={loading} primary disabled={loading || !tc}>
					Create Request
				</Button>
			</Form>
		</div>
	);
};

export default NewRequest;
