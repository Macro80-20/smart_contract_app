// SPDX-License-Identifier: MIT
pragma solidity ^0.7.4;

contract Inbox {
    // storage variables, can be mofidied or access and be called by anyone on the networks
     // 1st gotcha if you market a storage variable with public the contract is automatically going to create A NEw function for you with the same name
    string public message;

   
    constructor(string memory initialMessage) {
        message = initialMessage;
    }

    function setMessage(string memory newMessage) public {
        message = newMessage;
    }

    //public: anyone can call this function
    // private only this contract can call this function
    // view : a function returns data and does not modifiy the contracts data

    function getMessage() public view returns (string memory) {
        return message;
    }
}
