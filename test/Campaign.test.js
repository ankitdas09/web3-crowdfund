const assert = require('assert');
const ganache = require('ganache');
const { Web3 } = require('web3');

const web3 = new Web3(ganache.provider());
const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
	accounts = await web3.eth.getAccounts();
	factory = await new web3.eth.Contract(compiledFactory.abi)
		.deploy({ data: compiledFactory.evm.bytecode.object })
		.send({ from: accounts[0], gas: '2000000' });

	await factory.methods.createCampaign('100').send({ from: accounts[0], gas: '1000000' });
	[campaignAddress] = await factory.methods.getDeployedCampaigns().call();
	campaign = await new web3.eth.Contract(compiledCampaign.abi, campaignAddress);
});

describe('Campaigns', () => {
	it('deploys a factory and a campaign', () => {
		assert.ok(factory.options.address);
		assert.ok(campaign.options.address);
	});

	it('marks the caller as campaign manager', async () => {
		const manager = await campaign.methods.manager().call();
		assert.equal(accounts[0], manager);
	});

	it('allows people to contribute money and marks them as approvers', async () => {
		await campaign.methods.contribute().send({ value: 200, from: accounts[1] });
		const isContributor = await campaign.methods.contributors(accounts[1]).call();
		assert(isContributor);
	});

	it('requires a minimum value to contribute', async () => {
		try {
			await campaign.methods.contribute().send({ value: 50, from: accounts[1] });
			assert(false);
		} catch (error) {
			assert(error);
		}
	});

	it('allows manager to create a request', async () => {
		await campaign.methods
			.createRequest('Mocha test', 200, accounts[1])
			.send({ from: accounts[0], gas: '1000000' });
		const request = await campaign.methods.requests(0).call();
		assert.equal('Mocha test', request.description);
	});

	it('doesnt allow others to create a request', async () => {
		try {
			await campaign.methods
				.createRequest('Mocha test', 200, accounts[2])
				.send({ from: accounts[1], gas: '1000000' });
			assert(false);
		} catch (error) {
			assert(error);
		}
	});

	it('only contributor can approve a request', async () => {
		try {
			await campaign.methods
				.contribute()
				.send({ from: accounts[1], value: web3.utils.toWei('10', 'ether') });
			await campaign.methods
				.createRequest('end to end test', web3.utils.toWei('5', 'ether'), accounts[2])
				.send({ from: accounts[0], gas: '1000000' });
			await campaign.methods.approveRequest(0).send({ from: accounts[0], gas: '1000000' });
			assert(false);
		} catch (error) {
			assert(error);
		}
	});

	it('processes a request', async () => {
		let initialBalance = await web3.eth.getBalance(accounts[1]);
		initialBalance = web3.utils.fromWei(initialBalance, 'ether');
		initialBalance = parseFloat(initialBalance);

		await campaign.methods
			.contribute()
			.send({ from: accounts[0], value: web3.utils.toWei('10', 'ether') });
		await campaign.methods
			.createRequest('end to end test', web3.utils.toWei('5', 'ether'), accounts[1])
			.send({ from: accounts[0], gas: '1000000' });
		await campaign.methods.approveRequest(0).send({ from: accounts[0], gas: '1000000' });
		await campaign.methods.finalizeRequest(0).send({ from: accounts[0], gas: '1000000' });

		let balance = await web3.eth.getBalance(accounts[1]);
		balance = web3.utils.fromWei(balance, 'ether');
		balance = parseFloat(balance);

		assert(balance - initialBalance > 4);
	});
});
