import React from "react";
import styled from "styled-components";
import { useEffect } from "react";
import { useState } from "react";
import { Marginer } from "../../components/marginer";
import tw from "twin.macro";
import { ethers} from 'ethers';
import CreateApartment from "../../../artifacts/contracts/CreateApartment.sol/CreateApartment.json";
import { Button } from "../../components/button";

const createApartmentAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

const ServicesContainer = styled.div `
    ${tw`
        w-full
        flex
        flex-col
        items-center
    `};
`;

const Title = styled.h1 `
    ${tw`
        text-4xl
        font-extrabold
        text-black
    `};
`;

const ServicesWrapper = styled.div`
    ${tw`
        flex
        flex-wrap
    `}


`;

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
    width: 440px;
    height: 560px;
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
    height: 20em;
    
    img {
        width: 100%;
        height: 100%;
    }
`;

const ContentContainer = styled.div `
    ${tw`
        w-full
        flex
        flex-col
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
        flex-col
        items-center
        justify-between
        pt-6
        pr-4 
        pl-4 
    `};

`;

const Title2 = styled.h2 `
    font-size: 20px;
    font-weight: 500;
    ${tw`
        text-black
        text-base
    `};
`;

const Title3 = styled.h2 `
    font-size: 20px;
    font-weight: 500;
    ${tw`
        text-red-900
        text-lg
    `};
`;

const SpecialistName = styled.h4 `

    ${tw`
        text-black
        text-base
        items-center
    `};
    font-size: 20px;


`;

const RatingContainer = styled.div `
    display: flex;
    color: #000;
`;

const PriceContainer = styled.div `
    ${tw`
        flex
        items-center
    `};
`;

const PriceText = styled.div `
    ${tw`
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
        pl-96
        
        
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

export function Services(props) {
    const [apartmentID, setApartmentId] = useState('');
    
    async function getApartmentPrice() {
        if (!apartmentID) {console.log("Put Apartments Number"); 
            return}
        if(typeof window.ethereum !== 'undefined' ){
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const contract = new ethers.Contract(createApartmentAddress, CreateApartment.abi, provider)
            try { 
                const data = await contract.getApartmentPrice(apartmentID)
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
                const data = await contract.getApartmentOwner(apartmentID)
                console.log('Apartments owner: ', data)
            } catch(err) {
                console.log("Error: ", err)
            }

        }
    }

    async function getApartmentImgLink() {
        if (!apartmentID) {console.log("Put Apartments Number"); 
            return}
        if(typeof window.ethereum !== 'undefined' ){
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const contract = new ethers.Contract(createApartmentAddress, CreateApartment.abi, provider)
            try { 
                const data = await contract.apartmentImageLink(apartmentID)
                console.log('Apartments Image Link: ', data)
            } catch(err) {
                console.log("Error: ", err)
            }

        }
    }

    async function getApartmentAdress() {
        if (!apartmentID) {console.log("Put Apartments Number"); 
            return}
        if(typeof window.ethereum !== 'undefined' ){
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const contract = new ethers.Contract(createApartmentAddress, CreateApartment.abi, provider)
            try { 
                const data = await contract.apartmentAdress(apartmentID)
                console.log('Apartments Adress: ', data)
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
            const contract = new ethers.Contract(createApartmentAddress, CreateApartment.abi, provider)
            try { 
                const data = await contract.isRented(apartmentID)
                console.log('Apartments rented: ', data.toString())
            } catch(err) {
                console.log("Error: ", err)
            }

        }
    }

    const [apartments, setApartments] = useState([]);
    const [mapping, setMapping] = useState('not')
    useEffect(() => {
        loadApartments()
    }, [])

    async function loadApartments() {
        if(typeof window.ethereum !== 'undefined' ){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(createApartmentAddress, CreateApartment.abi, signer);
            const data = await contract.fetchApartmentsCreated();

            const apartmentsL = await Promise.all(data.map(async i => {
                let apartmentL = {
                    apartmentsId: i.apartmentsId,
                    ownerAp: i.ownerAp,
                    renterAp: i.renterAp,
                    price: i.price,
                    imageLink: i.imageLink,
                    adressAp: i.adressAp,
                    details: i.details,
                    rented: i.rented,
                }
                return apartmentL;
                
            }))
            console.log(apartmentsL.length)
            if(apartmentsL.length > 0) { setMapping('yes')}
            setApartments([apartmentsL])

        }
    }
    if ( mapping === 'not') { return <ServicesContainer>No apartments created</ServicesContainer>}
   console.log(apartments)
    return ( 
        <ServicesContainer>
            <Title>Current ads</Title>
            <Marginer direction="vertical" margin="3em"/>                           
                <ServicesWrapper >
                {apartments.map((apartment) => (
                    apartment.map((x) => (            
                    <CardContainer key={x.apartmentsId.toString()} >
                        <TopContainer >
                            <ServiceThumbnail >
                                <img src={x.imageLink} alt=" " />
                            </ServiceThumbnail>
                        </TopContainer>
                        <ContentContainer>
                            <Title3> ID: {x.apartmentsId.toString()}</Title3>
                            {x.rented ? <Title3>RENTED</Title3> : <Title3>AVAILABLE</Title3>}
                            <Title2>Adress: {x.adressAp}</Title2>
                            <SpecialistName> Details: {x.details} </SpecialistName>
                        </ContentContainer>
                        <BottomContainer>
                            <RatingContainer>
                                Owner: {x.ownerAp}
                            </RatingContainer>
                            <Marginer direction='vertical' margin="1em" />
                            <PriceContainer>
                                <StartingAtText>STARTING AT:  </StartingAtText>
                                <Marginer direction='horizontal' margin="0.2em" />
                                <PriceText>{x.price.toString()} DAR/night </PriceText>
                                <Marginer direction='horizontal' margin="0.5em" />
                            </PriceContainer>
                        </BottomContainer>
                    </CardContainer>
                    ))
                    ))}              
                </ServicesWrapper>
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
                    <ButtonsContainer onClick={getApartmentImgLink}>
                        <Button text="See Apartment's Image Link"/>                         
                    </ButtonsContainer>
                    <ButtonsContainer onClick={getApartmentAdress}>
                        <Button text="See Apartment's Adress"/>                         
                    </ButtonsContainer>
                    <PriceContainer>
                        <Input size="0.02em" onChange={e => setApartmentId(e.target.value)} placeholder="0" />
                    </PriceContainer>                                          
                </FooterContainer>             
        </ServicesContainer>
    );
}