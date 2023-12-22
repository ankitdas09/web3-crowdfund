const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf-8');

var input = {
	language: 'Solidity',
	sources: {
		'Campaign.sol': {
			content: source,
		},
	},
	settings: {
		outputSelection: {
			'*': {
				'*': ['*'],
			},
		},
	},
};
fs.ensureDirSync(buildPath);

var output = JSON.parse(solc.compile(JSON.stringify(input)));
const contracts = output['contracts']['Campaign.sol'];

for (let contract in contracts) {
	fs.outputJSONSync(path.resolve(buildPath, contract + '.json'), contracts[contract]);
}
