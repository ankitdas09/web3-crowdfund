import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
	CampaignFactory.abi,
	'0xCe716EF77509B3606065fFC20d3463545b2b8983',
);
export default instance;
