//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./CreateApartment.sol";
import "./Token.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/math/SafeMath.sol";


contract ApartmentCreator is CreateApartment {
    
    
    uint public fee;
    address payable public renter;

    enum State { Rent, Locked, Release, Closed, Complete}

    State public state;

    modifier condition(bool _condition) {
        require(_condition);
        _;
    }

    modifier onlyRenter() {
        require(
            msg.sender == renter,
            "Only renter can call this"
        );
        _;
    }

    modifier onlyOwner {
        require(
            msg.sender == owner,
            "Only owner can call this."
        );
        _;
    }

    function getApartmentOwner(uint256 _apartmentId) public view returns (address) {
        address owner = idToApartment[_apartmentId].ownerAp;
        return owner;
    }

    function getApartmentPrice(uint256 _apartmentId) public view returns (uint) {
        uint256 price = idToApartment[_apartmentId].price;
        return price;
    }

    function isRented(uint256 _apartmentId) public view returns( uint ) {
       if (idToApartment[_apartmentId].rented) {
           return 1;
       }
       return 0;
    }
    
    function apartmentRent(uint256 _apartmentId) public payable {
        require(idToApartment[_apartmentId].rented == false, "Apartment is rented");
        idToApartment[_apartmentId].renter = payable(msg.sender);
        idToApartment[_apartmentId].rented = true;
        transferTokenRent(idToApartment[_apartmentId].price, idToApartment[_apartmentId].ownerAp);
    }

    function ownerResetApartment(uint256 _apartmentId) public payable {
        require(idToApartment[_apartmentId].ownerAp == msg.sender);
        idToApartment[_apartmentId].rented = false;
    }

    

}