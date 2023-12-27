import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
	CampaignFactory.abi,
	'0x50AE13a5CC6AbdC663eE29Eae6C7f99a26233603',
);
export default instance;
