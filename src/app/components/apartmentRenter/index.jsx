import React from "react";
import styled from "styled-components";
import { Marginer } from "../marginer";
import tw from "twin.macro";
import { useState } from 'react';
import { ethers } from 'ethers';
import { Button } from "../../components/button";
import Token from '../../../artifacts/contracts/Token.sol/Token.json';
import CreateApartment from '../../../artifacts/contracts/CreateApartment.sol/CreateApartment.json';

const tokenAddress = '0xe7f1725e7734ce288f8367e1bb143e90bb3f0512';
const createApartmentAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

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

export function ApartmentRenterUi(props) {
    
    async function requestAccount() {
        await window.ethereum.request({ method : 'eth_requestAccounts' });
    }

    const [apartmentID, setApartmentId] = useState('');

    async function transferToken(from, to, amount) {
        if( typeof window.ethereum !== 'undefined') {
            await requestAccount()
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner()
            const contract = new ethers.Contract(tokenAddress, Token.abi, signer)
            const transaction = await contract.transferFrom(from, to, amount)
            await transaction.wait()
            console.log(`${amount} Coins successfully sent to ${to} from ${from}`)
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
            const transaction = await contract.apartmentRent(apartmentID)
            await transaction.wait()  
            const from = await contract.getApartmentRenter(apartmentID)
            getToAmount(from)
        }
    }

    async function getToAmount(_from) {
        if( !apartmentID ) {console.log("Put valid ID") ;
        return} 
        if( typeof window.ethereum !== 'undefined') {
            await requestAccount()
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(createApartmentAddress, CreateApartment.abi, provider)
            const to = await contract.getApartmentOwner(apartmentID)
            const amount = await contract.getApartmentPrice(apartmentID)
            transferToken(_from, to, amount)
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
            const transaction = await contract.ownerResetApartment(apartmentID)
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
                const data = await contract.getApartmentRenter(apartmentID)
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
               Declare the id of the apartment you want to rent!
            </StepDescription>
            <Marginer direction="vertical" margin = "1em"/>
            <PriceContainer>
                <Input size="0.02em" onChange={e => setApartmentId(e.target.value)} placeholder="0" />             
                <ButtonsContainer onClick={rentApartment}>
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



