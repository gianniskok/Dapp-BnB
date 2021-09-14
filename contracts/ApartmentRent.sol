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

    enum State { Rent, Locked, Release, Closed, Complete}

    State public state;

    modifier condition(bool _condition) {
        require(_condition);
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
        address ownerAp = idToApartment[_apartmentId].ownerAp;
        return ownerAp;
    }

    function getApartmentRenter(uint256 _apartmentId) public view returns (address) {
        require(idToApartment[_apartmentId].rented == true, "Not rented yet");
        address renter = idToApartment[_apartmentId].renterAp;
        return renter;
    }

    function getApartmentPrice(uint256 _apartmentId) public view returns (uint256) {
        uint256 priceAp = idToApartment[_apartmentId].price;
        return priceAp;
    }

    function isRented(uint256 _apartmentId) public view returns( uint ) {
       if (idToApartment[_apartmentId].rented) {
           return 1;
       }
       return 0;
    }
    
    function apartmentRent(uint256 _apartmentId) public payable {
        require(idToApartment[_apartmentId].rented == false, "Apartment is rented");
        idToApartment[_apartmentId].renterAp = payable(msg.sender);
        idToApartment[_apartmentId].rented = true;
    }

    function ownerResetApartment(uint256 _apartmentId) public onlyOwner {
        require(idToApartment[_apartmentId].ownerAp == msg.sender, "Not the owner");
        require(idToApartment[_apartmentId].rented == true, "Apartment is not rented");

        idToApartment[_apartmentId].rented = false;
    }

    

}