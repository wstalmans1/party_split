// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Party {
    uint256 public cost;
    mapping (address => uint256) public payments;

    constructor (uint256 _cost) {
        cost = _cost;        
    }

    function rsvp() external payable {
        require (msg.value == cost, "Incorrect contribution amount");
        require (payments[msg.sender] == 0, "payment already done");
        payments[msg.sender] = msg.value;        
    }

    function totalDeposits() external view returns (uint256) {
        return address(this).balance;
    }    

}