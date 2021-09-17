//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/math/SafeMath.sol";
import "./Token.sol";

contract CreateApartment  {
using Counters for Counters.Counter;
Counters.Counter private _apartmentsIds;

address payable public owner;  

    constructor() {
        console.log("Creating new apartment factory:" );
        owner = payable(msg.sender);
    }

    struct Apartment {
        uint apartmentsId;
        address payable ownerAp;
        address payable renterAp;
        uint price;
        string imageLink;
        string adressAp;
        string details;
        bool rented;  

    }

    mapping(uint256 => Apartment) public idToApartment;

    event ApartmentCreated (
        uint indexed apartmentsId,
        address ownerAp,
        address renterAp,
        uint256 price,
        string imageLink,
        string adressAp,
        string details,
        bool rented
   
    );

    function apartmentImageLink(uint256 _apartmentId) public view returns (string memory) {
        string memory imageLink = idToApartment[_apartmentId].imageLink;
        return imageLink;
    }

    function apartmentAdress(uint256 _apartmentId) public view returns (string memory) {
        string memory apAdress = idToApartment[_apartmentId].adressAp;
        return apAdress;
    }

    function fetchApartmentsCreated() public view returns (Apartment[] memory) {
        uint apartmentCount =  _apartmentsIds.current();
        Apartment[] memory apartments = new Apartment[](apartmentCount);
        uint currentIndex = 0;
        for (uint i = 0; i < apartmentCount; i++) {
            uint currentId = i +1;
            Apartment storage currentApartment = idToApartment[currentId];
            apartments[currentIndex] = currentApartment;
            currentIndex +=1;
        }
        return apartments;
    }

    function createApartment (uint256 _price, string memory _imageLink , string memory _addressAp, string memory _details)  public payable {
        require(_price > 0, "Price must be at least 1 wei");
        

        _apartmentsIds.increment();
        uint256 apartmentsId = _apartmentsIds.current();
        idToApartment[apartmentsId] = Apartment(
            apartmentsId,
            payable(msg.sender),
            payable(address(0)),
            _price,
            _imageLink,
            _addressAp,
            _details,
            false
        );

        emit ApartmentCreated(
            apartmentsId,
            msg.sender,
            address(0),
            _price,
            _imageLink,
            _addressAp,
            _details,
            false
        );
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

    function ownerResetApartment(uint256 _apartmentId) public{
        require(idToApartment[_apartmentId].ownerAp == msg.sender, "Not the owner");
        require(idToApartment[_apartmentId].rented == true, "Apartment is not rented");

        idToApartment[_apartmentId].rented = false;
    }
}
