//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Token {

    string public name = "Decentralized Apartment Renting Token";
    string public symbol = "DAR";
    uint256 public totalSupply = 1000000;

    mapping(address => uint) balances;
    
    address private fee = 0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199;
    
     event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    constructor() {
        balances[msg.sender] = totalSupply;
    }

    function balanceOf(address _account) external view returns (uint) {
        return balances[_account];
    }

    function transferfee(uint256 _amount) external payable{
        require(balances[msg.sender] >= _amount, "Not enough tokens");

        balances[msg.sender] -= _amount;
        balances[fee] += _amount;
        
        emit Transfer(msg.sender, fee, _amount);

    }

    function transfer(uint256 _amount, address _to) external payable{
        require(balances[msg.sender] >= _amount, "Not enough tokens");

        balances[msg.sender] -= _amount;
        balances[_to] += _amount;

        emit Transfer(msg.sender, _to, _amount);

    }

    function transferFrom(address _from, address _to, uint256 _amount) external payable {
        require(_amount <= balances[_from]);

        balances[_from] -= _amount;
        balances[_to] += _amount;


        emit Transfer(_from, _to, _amount);
    }

}