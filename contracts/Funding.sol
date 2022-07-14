//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

/**
 * @title Ballot
 * @dev Implements voting process along with vote delegation
 */
contract CrowdFaunding {
    mapping(address => uint256) public contributors; //contributors[msg.sender]=100
    address public manager;
    uint256 public minimumContribution;
    uint256 public deadline;
    uint256 public target;
    uint256 public raisedAmount;
    uint256 public noOfContributors;

    struct Request {
        string description;
        address payable recipent;
        uint256 value;
        bool completed;
        uint256 noOfVoters;
        mapping(address => bool) voters;
    }
    mapping(uint256 => Request) public requests;
    uint256 public numRequests;

    constructor(uint256 _target, uint256 _deadline) {
        target = _target;
        deadline = block.timestamp + _deadline; //10sec + 3600sec (60*60)
        minimumContribution = 100 wei;
        manager = msg.sender;
    }

    function sendEth() public payable {
        require(block.timestamp < deadline, "Deadline has passed");
        require(
            msg.value >= minimumContribution,
            "Minimum Contribution is not met"
        );

        if (contributors[msg.sender] == 0) {
            noOfContributors++;
        }
        contributors[msg.sender] += msg.value;
        raisedAmount += msg.value;
    }

    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function refund() public {
        require(
            block.timestamp > deadline && raisedAmount < target,
            "You are not eligible for refund"
        );
        require(contributors[msg.sender] > 0);
        address payable user = payable(msg.sender);
        user.transfer(contributors[msg.sender]);
        contributors[msg.sender] = 0;
    }

    modifier onlyManager() {
        require(msg.sender == manager, "Only manager can call this function");
        _;
    }

    function createRequests(
        string memory _description,
        address payable _recipent,
        uint256 _value
    ) public onlyManager {
        Request storage newRequests = requests[numRequests];
        numRequests++;
        newRequests.description = _description;
        newRequests.recipent = _recipent;
        newRequests.value = _value;
        newRequests.completed = false;
        newRequests.noOfVoters = 0;
    }

    function voteRequests(uint256 _requNo) public {
        require(contributors[msg.sender] > 0, "You must be the contributor");
        Request storage thisRequest = requests[_requNo];
        require(
            thisRequest.voters[msg.sender] == false,
            "YOU HAVE already voted"
        );
        thisRequest.voters[msg.sender] = true;
        thisRequest.noOfVoters++;
    }

    function makePayement(uint256 _requestNo) public view onlyManager {
        require(raisedAmount >= target);
        Request storage thisRequest = requests[_requestNo];
        require(
            thisRequest.completed == false,
            "the request has been completed"
        );
        require(thisRequest.noOfVoters > noOfContributors / 2);
    }
}
