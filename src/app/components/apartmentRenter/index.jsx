import React from "react";
import styled from "styled-components";
import { Marginer } from "../marginer";
import tw from "twin.macro";
import { useState , useEffect} from 'react';
import { ethers } from 'ethers';
import { Button } from "../../components/button";
import Token from '../../../artifacts/contracts/Token.sol/Token.json';
import CreateApartment from '../../../artifacts/contracts/CreateApartment.sol/CreateApartment.json';

const tokenAddress = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0';
const createApartmentAddress = '0xe7f1725e7734ce288f8367e1bb143e90bb3f0512';

const ApartmentRenterContainer = styled.div`
    width: 100%;
    ${tw`
        w-full
        max-w-screen-xl
        flex
        flex-col
        justify-between
        lg:pl-12 
        lg:pr-12
        pl-3
        pr-3
        pt-10
        items-center
    `};
`;

const StepDescription = styled.p`
    ${tw`
        text-xs
        md:text-sm
        text-center
        w-10/12 
        text-gray-600 
    `};
`;

const Title = styled.h2`
    ${tw`
        text-5xl
        lg:text-4xl 
        text-black
        font-extrabold
    `};
`;

const PriceContainer = styled.div `
    ${tw`
        flex
        items-center
        flex-row
    `};
`;

const Input = styled.input.attrs(props => ({
    type: "number",
  }))`
    border: 2px solid black;
    width: 50px;
    height: 40px;
    ${tw`
        text-4xl
        
    `};
`;

const ButtonsContainer=styled.div`
    width: 200px;
    ${tw`
        flex    
        flex-wrap
        h-full
    `};
`;

const InputDate = styled.input.attrs(props => ({
    type: "date",
  }))`
    border: 2px solid black;
    width: 200px;
    height: 40px;
    ${tw`
    
        text-2xl
        
        
    `};
`;

export function ApartmentRenterUi(props) {
    
    async function requestAccount() {
        await window.ethereum.request({ method : 'eth_requestAccounts' });
    }

    const [apartmentID, setApartmentId] = useState('');
    const [arrivingDate, setArrivingDate] = useState(new Date());
    const [departuringDate, setDeparturingDate] = useState(new Date());
    const [currentTimeStamp, setCurrentTimeStamp] = useState(Date.now())
    
    useEffect(() => {
        const id = setInterval(() => setCurrentTimeStamp(Date.now()), 1000);
        return () => {
            clearInterval(id);
        }
    },[currentTimeStamp]);
    
    // useEffect (() => {
    //     console.log(currentTimeStamp);
    // });

    const [arUnix, setArUnix] = useState(null);
    useEffect (() => {
        setArUnix(new Date(arrivingDate).getTime())
    },[arrivingDate]);

    const [depUnix, setDepUnix] = useState(null);
    useEffect (() => {
        setDepUnix(new Date(departuringDate).getTime())
    },[departuringDate]);

    useEffect(() =>{
        console.log(arUnix);
        console.log(depUnix);
    },[arUnix, depUnix])

    async function getToAmount() {
        if( !apartmentID ) {console.log("Put valid ID") ;
            return} 
        if( typeof window.ethereum !== 'undefined') {
            await requestAccount()
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner()
            const contract = new ethers.Contract(createApartmentAddress, CreateApartment.abi, signer) 
            const to = await contract.getApartmentOwner(apartmentID)
            const amount = await contract.getApartmentPrice(apartmentID)
            const bool = await  contract.checkAvailable(apartmentID, arUnix, depUnix)
            if(bool) {transferToken(to, amount)} else console.log("Not available")
        }
    }

    async function transferToken(to, amount) {
        if( typeof window.ethereum !== 'undefined') {
            await requestAccount()
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner()
            const sender = signer.getAddress()
            const contract = new ethers.Contract(tokenAddress, Token.abi, signer)
            const coins = ((depUnix - arUnix)/86400000)*amount
            const transaction = await contract.transferFrom(sender, to, coins)
            await transaction.wait()
            console.log(`${coins} Coins successfully sent to ${to} `)
            rentApartment()
        }
        
    }

    async function rentApartment() {
        if( !apartmentID ) {console.log("Put valid ID") ;
            return} 
        if( typeof window.ethereum !== 'undefined') {
            await requestAccount()
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner()
            const contract = new ethers.Contract(createApartmentAddress, CreateApartment.abi, signer)
            const transaction = await contract.reserve(apartmentID, arUnix, depUnix)
            await transaction.wait()  
        }
    }

    async function makeApartmentAvailable() {
        if( !apartmentID ) {console.log("Put valid ID") ;
        return} 
        if( typeof window.ethereum !== 'undefined') {
            await requestAccount()
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner()
            const contract = new ethers.Contract(createApartmentAddress, CreateApartment.abi, signer)
            const transaction = await contract.cancelReservation(apartmentID, arUnix)
            await transaction.wait() 
        }   
    }

    async function getApartmentRenter() {
        if (!apartmentID) {console.log("Put Apartments Number"); 
            return}
        if(typeof window.ethereum !== 'undefined' ){
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const contract = new ethers.Contract(createApartmentAddress, CreateApartment.abi, provider)
            try { 
                const data = await contract.renterOf(apartmentID, arUnix)
                console.log('Apartment renter: ', data.toString())
            } catch(err) {
                console.log("Error: ", err)
            }

        }
    }

    return(
        <ApartmentRenterContainer>
            <Title> Select the apartment you want to rent </Title>
            <Marginer direction="vertical" margin = "1em"/>
            <StepDescription>
               Declare the id, the date of your arival and departure of the apartment you want to rent!
            </StepDescription>
            <Marginer direction="vertical" margin = "1em"/>
            <PriceContainer>
                <Input size="0.02em" onChange={e => setApartmentId(e.target.value)} placeholder="0" /> 
                <InputDate size="0.1em" onChange={e => setArrivingDate(e.target.value)} placeholder="Arriving" /> 
                <InputDate size="0.1em" onChange={e => setDeparturingDate(e.target.value)} placeholder="Departuring" />              
            </PriceContainer> 
            <Marginer direction="vertical" margin = "1em"/>
            <PriceContainer>
                <ButtonsContainer onClick={getToAmount}>
                    <Button text="Select the Id of the wanted apartment"/>
                </ButtonsContainer>
                <ButtonsContainer onClick={makeApartmentAvailable}>
                    <Button text="Release the wanted apartment"/>
                </ButtonsContainer>
                <ButtonsContainer onClick={getApartmentRenter}>
                    <Button text="See Apartment's renter"/>                         
                </ButtonsContainer>
            </PriceContainer>
        </ApartmentRenterContainer>
    );
}
