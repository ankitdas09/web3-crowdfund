import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
	CampaignFactory.abi,
	'0x6Bee87A74ac2F457E939683F29629dC17307F0C6',
);
export default instance;
