// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

contract CampaignFactory {
	address[] public deployedCampaigns;

	function createCampaign(uint minAmt) public {
		Campaign newCampaign = new Campaign(minAmt, msg.sender);
		deployedCampaigns.push(address(newCampaign));
	}

	function getDeployedCampaigns() public view returns (address[] memory) {
		return deployedCampaigns;
	}
}

contract Campaign {
	struct Request {
		uint amt;
		address payable receipient;
		string description;
		uint approvals;
		bool completed;
		mapping(address => bool) voters;
	}

	address public manager;
	uint public minAmt;
	mapping(address => bool) contributors;
	uint public totalContributors;
	uint numRequests;
	mapping(uint => Request) public requests;

	modifier restricted() {
		require(msg.sender == manager);
		_;
	}

	constructor(uint _minAmt, address _manager) {
		minAmt = _minAmt;
		manager = _manager;
		numRequests = 0;
	}

	function contribute() public payable {
		require(msg.value >= minAmt);
		contributors[msg.sender] = true;
		totalContributors++;
	}

	function createRequest(
		string memory description,
		uint amt,
		address payable receipient
	) public restricted {
		Request storage newRequest = requests[numRequests++];
		newRequest.description = description;
		newRequest.amt = amt;
		newRequest.receipient = receipient;
		newRequest.completed = false;
	}

	function approveRequest(uint index) public {
		require(contributors[msg.sender]);
		require(!requests[index].voters[msg.sender]);
		requests[index].approvals++;
		requests[index].voters[msg.sender] = true;
	}

	function finalizeRequest(uint index) public restricted {
		Request storage request = requests[index];
		require(!request.completed);
		require(request.approvals > (totalContributors / 2));
		request.receipient.transfer(request.amt);
		request.completed = true;
	}
}
