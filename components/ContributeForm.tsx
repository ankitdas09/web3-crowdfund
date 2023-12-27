import { useRouter } from 'next/router';
import React, { useState } from 'react';

export const ContributeForm = () => {
	const [amt, setAmt] = useState<number>(null);
	const [err, setErr] = useState<string>('');
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
			setLoading(false);
		}
	}

	return (
		<div>
			<h1>Create New Campaign</h1>

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
					<Checkbox label="I agree to the Terms and Conditions" />
				</Form.Field>
				<Message error header="Oops" content={err} />
				<Button type="submit" loading={loading} primary disabled={loading}>
					Submit
				</Button>
			</Form>
		</div>
	);
};
