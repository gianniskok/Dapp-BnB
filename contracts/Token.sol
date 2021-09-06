//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Token {
    string public name = "DecentBnb Token";
    string public symbol = "DCB";
    uint public totalSupply = 1000000;
    mapping(address => uint) balances;
    address public to = 0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199;
    constructor() {
        balances[msg.sender] = totalSupply;
    }

    function transferfee(uint _amount) external payable{
        require(balances[msg.sender] >= _amount, "Not enough tokens");
        balances[msg.sender] -= _amount;
        balances[to] += _amount;
    }

    function transferToken(uint _amount, address _to) external payable{
        require(balances[msg.sender] >= _amount, "Not enough tokens");
        balances[msg.sender] -= _amount;
        balances[_to] += _amount;
    }

    function balanceOf(address _account) external view returns (uint) {
        return balances[_account];
    }
}