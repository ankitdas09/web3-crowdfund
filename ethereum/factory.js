import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
	CampaignFactory.abi,
	'0x224Ec721AB91e9B151A19925129C64979E7EA23B',
);
export default instance;
