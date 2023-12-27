const { Web3 } = require('web3');
const ganache = require('ganache');
let compiledFactory = require('./build/CampaignFactory.json');

const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));

const deploy = async () => {
	const accounts = await web3.eth.getAccounts();
	console.log('Attempting to deploy from account', accounts[0]);

	const result = await new web3.eth.Contract(compiledFactory.abi)
		.deploy({ data: compiledFactory.evm.bytecode.object })
		.send({ from: accounts[0], gas: '2000000' });
	console.log('Contract deployed to', result.options.address);
};
// deploy();

async function test() {
	addr = '0x071086a6cce3cdc206e37228abfb377e7488b85a';
	let campaignF = new web3.eth.Contract(compiledFactory.abi, addr);
	const campaigns = await campaignF.methods.getDeployedCampaigns().call();
	console.log(campaigns);
}
test();
