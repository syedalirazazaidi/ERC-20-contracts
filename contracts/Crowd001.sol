//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract CrowFunding {
    mapping(address => uint256) public contributors; //contributors[msg.sender]=100
    address public manager;
    uint256 public minimumContribution;
    uint256 public deadline;
    uint256 public target;
    uint256 public raisedAmount;
    uint256 public noOfContributors;

    constructor(uint256 _target, uint256 _deadline) {
        target = _target;
        deadline = block.timestamp + _deadline; //10sec + 3600sec (60*60)
        minimumContribution = 100 wei;
        manager = msg.sender;
    }
}
