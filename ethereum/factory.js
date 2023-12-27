import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
	CampaignFactory.abi,
	'0x1cd0B306B420ecF77062372CFa6815DcbD1097c1',
);
export default instance;
