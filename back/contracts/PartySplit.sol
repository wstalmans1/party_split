// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Party {
    uint256 public deposit = 0;
    uint256 public contribution;
    address [] public participants;

    constructor (uint256 _contribution) {
        contribution = _contribution;        
    }

    function rsvp() external payable {
        require (msg.value == contribution, "Incorrect contribution amount");
        deposit += msg.value;
        participants.push(msg.sender);        
    }    

}