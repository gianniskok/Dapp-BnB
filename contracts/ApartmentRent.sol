//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/math/SafeMath.sol";


contract ApartmentCreator {
    using Counters for Counters.Counter;
    Counters.Counter private _apartmentsIds;
    
    uint public fee;
    address payable public owner;
    address payable public renter;
    address payable transferFee;

    uint256 listingPrice = 0.1 ether;

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

    modifier notOwner() {
        require( 
            msg.sender != owner, 
            "Owner should not be calling this"
        );
        _;
    }

    modifier notRenter() {
        require( 
            msg.sender != renter,
            "Renter should not be calling this"
        );
        _;
    }

    modifier inState(State _state) {
        require(
            state == _state,
            "Invalid state"
        );
        _;
    }

    event Closed(
        uint256 when
    );

    event ConfirmPurchase(
        uint256 when,
        address by
    );

    event ConfirmReseived(
        uint256 when,
        address by 
    );

    event OwnerRefundRenter(
        uint256 when
    );

    event OwnerRefunded(
        uint256 when
    );

    event Restarted(
        uint256 when
    );

    event End(
        uint256 when
    );

    constructor() payable {
        owner = payable(msg.sender);
        transferFee = payable(0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199);
        fee = msg.value;

    }

    struct Apartment {
        uint apartmentsId;
        address payable owner;
        address payable renter;
        uint price;
        bool rented;

        
    }

    mapping(uint256 => Apartment) private idToApartment;

    event ApartmentCreated (
        uint indexed apartmentsId,
        address owner,
        address renter,
        uint256 price,
        bool rented
   
    );

    function close() public onlyOwner inState(State.Rent) {
        state = State.Closed;
        owner.transfer(address(this).balance);

        emit Closed(
            block.timestamp
        );
    }
    
    function confirmPurchase(uint256 _apartmentId, uint256 _rentingDays) public notOwner inState(State.Rent) condition(msg.value == (2 * idToApartment[_apartmentId].price * _rentingDays)) payable {
        require(idToApartment[_apartmentId].rented == false);
        renter = payable(msg.sender);
        state = State.Locked;
        idToApartment[_apartmentId].rented == true;
        emit ConfirmPurchase(
            block.timestamp,
            renter
        );
    }

    function confirmReceived(uint256 _apartmentId, uint256 _rentingDays) public onlyRenter inState(State.Locked) {
        state = State.Release;
        renter.transfer(idToApartment[_apartmentId].price * _rentingDays);
        emit ConfirmReseived(block.timestamp, renter);   
    }

    function refundRenter(uint256 _apartmentId) public onlyRenter inState(State.Locked) {
        state = State.Rent;
        idToApartment[_apartmentId].rented == false;
        renter = payable(0);

        emit OwnerRefundRenter(block.timestamp);
    }

    function refundOwner(uint256 _apartmentId, uint256 _rentingDays) public onlyOwner inState(State.Release) {
        state = State.Complete;
        owner.transfer(3*idToApartment[_apartmentId].price * _rentingDays);
        
        emit OwnerRefunded(block.timestamp);
    }
    
    function restartContract(uint256 _apartmentId, uint256 _rentingDays) public onlyOwner payable {
        if (state == State.Closed || state == State.Complete) {
            require((2 * idToApartment[_apartmentId].price * _rentingDays) == msg.value, "Value has to be equal to 2x price");
            state = State.Rent;
            renter = payable(0);
            idToApartment[_apartmentId].rented == true;

            emit Restarted(block.timestamp);
        }
    }



    function end(uint256 _apartmentId) public onlyOwner {
        if(state == State.Closed || state == State.Complete) {
            idToApartment[_apartmentId].rented == true;
            emit End(block.timestamp);
            selfdestruct(owner);
        }
    }

    function apartmentPrice(uint256 _apartmentId) public view returns (uint256) {
         uint256 price = idToApartment[_apartmentId].price;
         return price;
    }


    function createApartment (uint256 _price) public onlyOwner payable {
        require(_price > 0, "Price must be at least 1 wei");
        

        _apartmentsIds.increment();
        uint256 apartmentsId = _apartmentsIds.current();
        idToApartment[apartmentsId] = Apartment(
            apartmentsId,
            payable(msg.sender),
            payable(address(0)),
            _price,
            false
        );

        transferFee.transfer(fee);

        emit ApartmentCreated(
            apartmentsId,
            msg.sender,
            address(0),
            _price,
            false
        );
    }

    function isRented(uint256 _apartmentId) public view returns( bool ) {
        return idToApartment[_apartmentId].rented;
    }
    

}