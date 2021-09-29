//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/math/SafeMath.sol";
import "./Token.sol";
import "./RivalIntervalTree.sol";


contract CreateApartment is Token {
using RivalIntervalTreeLibrary for RivalIntervalTreeLibrary.Tree;
using Counters for Counters.Counter;
Counters.Counter private _apartmentsIds;

event Reserve(address indexed _renter, uint256 _tokenId, uint256 _start, uint256 _end);
event CancelReservation(address indexed _renter, uint256 _tokenId, uint256 _start, uint256 _end);


address payable public owner;  

    constructor() {
        console.log("Creating new apartment factory:" );
        owner = payable(msg.sender);
    }

    struct Apartment {
        uint apartmentsId;
        address payable ownerAp;
        uint price;
        string imageLink;
        string adressAp;
        string details;
    }

    mapping(uint256 => Apartment) public idToApartment;

    event ApartmentCreated (
        uint indexed apartmentsId,
        address ownerAp,
        uint256 price,
        string imageLink,
        string adressAp,
        string details
    );

    struct Reservation {
        uint256 apartmentId;
        address renter;
        uint256 start;
        uint256 end;
    }

    mapping (uint256 => RivalIntervalTreeLibrary.Tree) calendars;
    mapping(uint256 => mapping(uint256 => Reservation)) reservations;

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
            _price,
            _imageLink,
            _addressAp,
            _details
        );

        emit ApartmentCreated(
            apartmentsId,
            msg.sender,
            _price,
            _imageLink,
            _addressAp,
            _details
        );
    }

    function getApartmentOwner(uint256 _apartmentId) public view returns (address) {
        address ownerAp = idToApartment[_apartmentId].ownerAp;
        return ownerAp;
    }

    function renterOf(uint256 _apartmentId, uint256 _time) public view returns (address) {
        return reservations[_apartmentId][_time].renter;
    }

    function getApartmentPrice(uint256 _apartmentId) public view returns (uint256) {
        uint256 priceAp = idToApartment[_apartmentId].price;
        return priceAp;
    }

    mapping(uint => uint) startToDays;
    
    function reserve(uint256 _apartmentId, uint256 _start ,uint256 _end) external returns (bool success) {
        calendars[_apartmentId].insert(_start, _end);

        Reservation memory r = Reservation(
            _apartmentId,
            msg.sender,
            _start,
            _end
        );
        uint256 time = _end - _start;
        time = SafeMath.div(time, 86400000);
        console.log(time);
        for (uint i=0; i <= time; i++){
            reservations[_apartmentId][_start + i*86400000] = r; 
        }
        startToDays[_start] = time;
        emit Reserve(msg.sender, _apartmentId, _start, _end);
        return true;
    } 

    function cancelReservation(uint256 _apartmentId, uint256 _start) external returns (bool success) {
        require(idToApartment[_apartmentId].ownerAp == msg.sender , "Not the owner");
        calendars[_apartmentId].remove(_start);
        for(uint i = 0; i <= startToDays[_start]; i++){
            delete reservations[_apartmentId][_start + i*86400000];
        }
        return true;
    }

    function checkAvailable(uint256 _apartmentId, uint256 _start, uint256 _end) external view returns (bool available) {
        return !calendars[_apartmentId].overlaps(_start, _end);
    }

    
}
