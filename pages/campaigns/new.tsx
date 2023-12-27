import React, { useState } from 'react';
import { Button, Checkbox, Form, Grid, Input, Message } from 'semantic-ui-react';
import web3, { init } from '../../ethereum/web3';
import factory from '../../ethereum/factory';
import { useRouter } from 'next/router';

const NewCampaign = () => {
	const [amt, setAmt] = useState<number>(null);
	const [err, setErr] = useState<string>('');
	const [tc, setTC] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	const router = useRouter();

	async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		try {
			e.preventDefault();
			setLoading(true);
			setErr('');
			const accounts: [string?] = await web3.eth.getAccounts();
			if (!accounts.length) {
				init();
				setLoading(false);
				return;
			}
			await factory.methods.createCampaign(amt).send({ from: accounts[0] });
			setLoading(false);
			router.replace('/');
		} catch (error) {
			setErr(error.message);
			setTC(false);
			setLoading(false);
		}
	}

	return (
		<div>
			<h1>Create New Campaign</h1>

			<Grid>
				<Grid.Column width={10}>
					<Form onSubmit={onSubmit} error={!!err.length}>
						<Form.Field>
							<label>Minimum Contribution</label>
							<Input
								label="Wei"
								labelPosition="right"
								placeholder="Minimum Contribution"
								type="number"
								value={amt}
								minimum={1}
								required
								onChange={(e) => {
									try {
										setAmt(parseInt(e.target.value));
									} catch (error) {
										alert('Invalid Input');
									}
								}}
							/>
						</Form.Field>
						<Form.Field>
							<Checkbox
								label="I am sure I want to create a new campaign."
								checked={tc}
								onClick={() => setTC(!tc)}
							/>
						</Form.Field>
						<Message error header="Oops" content={err} />
						<Button type="submit" loading={loading} primary disabled={loading || !tc}>
							Create
						</Button>
					</Form>
				</Grid.Column>
			</Grid>
		</div>
	);
};

export default NewCampaign;
