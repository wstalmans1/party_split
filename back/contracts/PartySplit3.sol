// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract PartySplit4 {
    uint256 public cost;
    mapping (address => bool) public payments;
    address[] public members; 

    constructor (uint256 _cost) {
        cost = _cost;        
    }

    function rsvp() external payable {
        require (msg.value == cost, "Incorrect contribution amount");
        require (payments[msg.sender] == false, "payment already done");
        payments[msg.sender] = true; // Mark the payment as done
        members.push(msg.sender);
    }

    function totalDeposits() external view returns (uint256) {
        return address(this).balance;
    }

    function payBill (address payable _venue, uint256 _billAmount) external {
        require(address(this).balance >= _billAmount, "Insufficient balance in contract");
        require(_venue != address(0), "Invalid address");
        uint256 remainingBalancePerContributor = (address(this).balance - _billAmount)/(members.length);
        _venue.transfer(_billAmount);
        for (uint256 i=0; i<members.length; i++) {
            address payable contributor = payable(members[i]);
            contributor.transfer(remainingBalancePerContributor);
            payments[contributor] = false;
        }
        delete members;
    } 

}