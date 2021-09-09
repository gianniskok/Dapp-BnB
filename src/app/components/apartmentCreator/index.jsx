import React from "react";
import styled from "styled-components";
import { Marginer } from "../marginer";
import tw from "twin.macro";
import { useState } from 'react';
import { ethers, Contract } from 'ethers';
import { Button } from "../../components/button";
import CreateApartment from "../../../artifacts/contracts/CreateApartment.sol/CreateApartment.json"
import Token from '../../../artifacts/contracts/Token.sol/Token.json';

const createApartmentAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
const tokenAddress = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0';

const ApartmentCreatorContainer = styled.div`
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

export function ApartmentCreatorUi(props) {

    async function requestAccount() {
        await window.ethereum.request({ method : 'eth_requestAccounts' });
    }

    const [price, setPrice] = useState('');
    const [apartmentID, setApartmentId] = useState('');

    async function transferToken() {
        if( typeof window.ethereum !== 'undefined') {
            await requestAccount()
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner()
            const contract = new ethers.Contract(tokenAddress, Token.abi, signer)
            const transaction = await contract.transferfee(5)
            await transaction.wait()
        }
    }

    async function createApartment() {
        if( !price ) {console.log("Put valid price") ;
            return} 
        if( typeof window.ethereum !== 'undefined') {
            await requestAccount()
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner()
            const contract = new ethers.Contract(createApartmentAddress, CreateApartment.abi, signer)
            const transaction = await contract.createApartment(price)
            await transaction.wait()
            transferToken()               
        }
    }

    return(
        <ApartmentCreatorContainer>
            <Title> Declare your apartment </Title>
            <Marginer direction="vertical" margin = "1em"/>
            <StepDescription>
                Declare the price of your apartment in Tokens per night!
            </StepDescription>
            <Marginer direction="vertical" margin = "1em"/>
            <PriceContainer>
                <Input size="0.02em" onChange={e => setPrice(e.target.value)} placeholder="0" />             
                <ButtonsContainer onClick={createApartment}>
                    <Button text="Set Price Of Apartment in Tokens"/>
                </ButtonsContainer>
            </PriceContainer> 
        </ApartmentCreatorContainer>
    );
}



