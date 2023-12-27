import { useRouter } from 'next/router';
import React, { useState } from 'react';
import web3, { init } from '../ethereum/web3';
import factory from '../ethereum/factory';
import { Button, Checkbox, Form, Input, Message } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';

const ContributeForm = () => {
	const [amt, setAmt] = useState<number>();
	const [err, setErr] = useState<string>('');
	const [tc, setTC] = useState(false);
	const [loading, setLoading] = useState<boolean>(false);

	const router = useRouter();

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
				.contribute()
				.send({ from: accounts[0], value: web3.utils.toWei(amt, 'ether') });

			setLoading(false);
			setAmt(0);
			setTC(false);
			router.replace(`/campaigns/${address}`);
		} catch (error) {
			setErr(error.message);
			setLoading(false);
		}
	}

	return (
		<div>
			<h2>Contribute to this campaign!</h2>
			<Form onSubmit={onSubmit} error={!!err.length}>
				<Form.Field>
					<label>Amount to Contribute</label>
					<Input
						label="Ether"
						labelPosition="right"
						placeholder="Amount"
						type="number"
						value={amt}
						minimum={0}
						step={'any'}
						required
						onChange={(e) => {
							try {
								setAmt(parseFloat(e.target.value));
							} catch (error) {
								alert('Invalid Input');
							}
						}}
					/>
				</Form.Field>
				<Form.Field>
					<Checkbox
						label="I am contributing to the correct campaign."
						checked={tc}
						onClick={() => setTC(!tc)}
					/>
				</Form.Field>
				<Message error header="Oops" content={err} />
				<Button type="submit" loading={loading} primary disabled={loading || !tc}>
					Contribute
				</Button>
			</Form>
		</div>
	);
};

export default ContributeForm;
