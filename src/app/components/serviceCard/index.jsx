import React, { useEffect } from "react";
import styled from "styled-components";
import { Marginer } from "../marginer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import tw from "twin.macro";
import { typeOf } from "react-is";
import { useState } from 'react';
import { ethers, Contract } from 'ethers';
import { Button } from "../button";
import ApartmentCreator from "/home/giannis/react-project101/my-app/src/artifacts/contracts/ApartmentRent.sol/ApartmentCreator.json";
import CreateApartment from "/home/giannis/react-project101/my-app/src/artifacts/contracts/CreateApartment.sol/CreateApartment.json"
import Token from '/home/giannis/react-project101/my-app/src/artifacts/contracts/Token.sol/Token.json';

const apartmentRentAddress= "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const createApartmentAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
const tokenAddress = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0';

const CardContainer = styled.div `
    ${tw`
        flex
        flex-col
        overflow-hidden
        mt-0.5 
        mb-5
        mr-2
        ml-9
    `};

    width: 410px;
    height: 480px;
    background-color: #fff;
    box-shadow: 0 0 3.9px rgba(0, 0 ,0, 0.27);
    border-bottom: 3px solid rgba(0, 0, 255, 1);
    border-top: 3px solid rgba(0, 0, 255, 1);
    border-left: 3px solid rgba(0, 0, 255, 1);
    border-right: 3px solid rgba(0, 0, 255, 1);
`;

const TopContainer = styled.div `    
    ${tw`
        w-full
    `};
`;

const ServiceThumbnail = styled.div `
    width: 100%;
    height: 17em;

    
    img {
        width: 100%;
        height: 100%;
    }
`;

const ContentContainer = styled.div `
    ${tw`
        w-full
        flex
        flex-row
        items-center
        justify-between
        pr-4
        pl-4
        pt-1
    `};

`;

const BottomContainer = styled.div `
    ${tw`
        
        w-full
        flex
        items-center
        justify-between
        pt-2
        pr-4 
        pl-4 
    `};

`;

const Title = styled.h2 `
    font-size: 12px;
    font-weight: 500;
    ${tw`
        text-black
        text-sm
    `};
`;

const SpecialistName = styled.h4 `

    ${tw`
        text-black
        text-sm
        items-center
    `};
    font-size: 13px;


`;

const RatingContainer = styled.div `
    ${tw`
        flex
    `};
    color: #EBE204;
`;

const PriceContainer = styled.div `
    ${tw`
        flex
        items-center
    `};
`;

const PriceText = styled.div `
    ${tw`
        ml-0.5
    `};
    color: #2A9D8F;
    font-weight: 500;
`;

const StartingAtText = styled.h6 `
    color: rgba(0, 1, 100, 0.5);
    font-weight: 400;
`;

const ButtonsContainer=styled.div`
    width: 200px;
    ${tw`
        flex    
        flex-wrap
        h-full
    `};
`;

const FooterContainer = styled.div `
    height:100%;
    ${tw`
        w-full
        flex
        flex-row
        items-center
        justify-between
        pr-4
        pl-4 
        pb-1
        
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

const Form = styled.form`
  width: 100%;
`;



export function ServiceCard(props) {
    async function requestAccount() {
        await window.ethereum.request({ method : 'eth_requestAccounts' });
    }

    const [price, setPrice] = useState('');
    const [rentingDays, setRentingDaysValue] = useState('');
    const [apartmentID, setApartmentId] = useState('');
    const [formInput, updateFormInput] = useState({ price: ''});
     
    async function getApartmentPrice() {
        if (!apartmentID) {console.log("Put Apartments Number"); 
            return}
        if(typeof window.ethereum !== 'undefined' ){
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const contract = new ethers.Contract(createApartmentAddress, CreateApartment.abi, provider)
            try { 
                const data = await contract.apartmentPrice(apartmentID)
                console.log('Price of apartment per night: ', data.toString())
            } catch(err) {
                console.log("Error: ", err)
            }

        }
    }

    async function getApartmentOwner() {
        if (!apartmentID) {console.log("Put Apartments Number"); 
            return}
        if(typeof window.ethereum !== 'undefined' ){
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const contract = new ethers.Contract(createApartmentAddress, CreateApartment.abi, provider)
            try { 
                const data = await contract.apartmentOwner(apartmentID)
                console.log('Apartments owner: ', data)
            } catch(err) {
                console.log("Error: ", err)
            }

        }
    }

    async function getApartmentRenting() {
        if (!apartmentID) {console.log("Put Apartments Number"); 
            return}
        if(typeof window.ethereum !== 'undefined' ){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(apartmentRentAddress, ApartmentCreator.abi, provider)
            try { 
                const data = await contract.isRented(apartmentID)
                console.log('Apartments rented: ', data)
            } catch(err) {
                console.log("Error: ", err)
            }

        }
    }

    const {thumbnailUrl, specialist, id, title, rating, rate} = props;
    
    return(
        <CardContainer>
            <TopContainer>
                <ServiceThumbnail >
                    <img src={thumbnailUrl} alt={title} />
                </ServiceThumbnail>
            </TopContainer>
            <ContentContainer>
                <Title>{ title } </Title>
                <Marginer direction="horizontal" margin={10}/>
                <SpecialistName> { specialist.fullName } </SpecialistName>
            </ContentContainer>
            <BottomContainer>
                <RatingContainer>
                    <FontAwesomeIcon icon={faStar} size="sm"/>
                    {rating}
                </RatingContainer>
                <PriceContainer>
                    <StartingAtText>STARTING AT: </StartingAtText>
                    <Marginer direction='horizontal' margin="0.2em" />
                    <PriceText>{rate}$ </PriceText>
                    <Marginer direction='horizontal' margin="0.2em" />
                    <StartingAtText> per night</StartingAtText>
                </PriceContainer>
            </BottomContainer>
            <Marginer direction='vertical' margin="2em" />
            <FooterContainer>
            <ButtonsContainer onClick={getApartmentRenting}>
                    <Button text="See Apartment's rented"/>                         
                </ButtonsContainer>
                <ButtonsContainer onClick={getApartmentPrice}>
                    <Button text="See Apartment's cost"/>                         
                </ButtonsContainer>
                <ButtonsContainer onClick={getApartmentOwner}>
                    <Button text="See Apartment's owner"/>                         
                </ButtonsContainer>
                <PriceContainer>
                    <Input size="0.02em" onChange={e => setApartmentId(e.target.value)} placeholder="0" />
                </PriceContainer>
            </FooterContainer>
        </CardContainer>

    );
}