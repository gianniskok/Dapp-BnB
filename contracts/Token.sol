//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Token {

    string public name = "Decentralized Apartment Renting Token";
    string public symbol = "DAR";
    uint256 public totalSupply = 1000000;

    mapping(address => uint) balances;
    
    address payable public fee = payable(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266);
    address payable  main;
     event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    constructor() {
        balances[msg.sender] = totalSupply;
        main = payable(msg.sender);
    }

    function balanceOf(address _account) external view returns (uint) {
        return balances[_account];
    }
    
    function getbalanceOf() external view returns (uint) {
        return balances[msg.sender];
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
        require(_amount <= balances[_from], "Not enough tokens");

        balances[_from] -= _amount;
        balances[_to] += _amount;


        emit Transfer(_from, _to, _amount);
    }

    function buy(uint _tokens) external payable {
        require(balances[main] >= _tokens, "Not enough tokens");
        balances[msg.sender] += _tokens;
        balances[main] -= _tokens;
    }

    // function sell(uint _tokens) external payable {
    //     require(balances[msg.sender] >= _tokens, "Not enough tokens");
    //     balances[msg.sender] -= _tokens;
    //     balances[main] += _tokens;
    // }

    // function msgsender() external view returns(address){
    //     return msg.sender;
    // }
}
