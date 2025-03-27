//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract VotingSystem {
    address public admin;
    struct Candidate {
        string name;
        uint256 voteCount;
    }
    mapping(address=>bool) public hasVoted;
    Candidate[] public candidates;
    event VoteCasted(address voter, string candidate);
    constructor(string[] memory _candidates) {
        admin = msg.sender;
        for(uint i = 0; i < _candidates.length; i++) {
            candidates.push(Candidate(_candidates[i], 0));
            console.log("Candidate added:", _candidates[i]);
        }
    }

    function vote(uint _candidateIndex) public {
        require(!hasVoted[msg.sender], "You have already voted");
        hasVoted[msg.sender] = true;
        candidates[_candidateIndex].voteCount++;
        console.log("Vote casted by:", msg.sender, "for candidate:", candidates[_candidateIndex].name);
    }
    function getWinner() external view returns (uint){
        uint maxVotes = 0;
        uint winnerIndex = 0;
        for(uint i = 0; i < candidates.length; i++) {
            if(candidates[i].voteCount > maxVotes) {
                maxVotes = candidates[i].voteCount;
                winnerIndex = i;
            }
            console.log("Candidate:", candidates[i].name, "Votes:", candidates[i].voteCount);
        }
        return winnerIndex;
    }
}