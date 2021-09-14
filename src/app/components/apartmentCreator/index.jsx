import React from "react";
import styled from "styled-components";
import { Marginer } from "../marginer";
import tw from "twin.macro";
import { useState, useEffect } from 'react';
import { ethers, Contract } from 'ethers';
import { Button } from "../../components/button";
import CreateApartment from "../../../artifacts/contracts/CreateApartment.sol/CreateApartment.json"
import Token from '../../../artifacts/contracts/Token.sol/Token.json';

const{ create } = require('ipfs-http-client');
const client = create({host: 'ipfs.infura.io', port: 5001, protocol: 'https'});

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
        flex-col
    `};
`;

const Input = styled.input.attrs(props => ({
    type: "number",
  }))`
    border: 2px solid black;
    width: 370px;
    height: 40px;
    ${tw`
        text-2xl
        
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

const Form = styled.form`
  ${tw`
    w-full
    flex
    flex-col
    items-center
  `};
`;

const InputText = styled.input.attrs(props => ({
    type: "text",
  }))`
    border: 2px solid black;
    width: 370px;
    height: 40px;
    ${tw`
    
        text-2xl
        
        
    `};
`;

const InputFile = styled.input.attrs(props => ({
    type: "file",
  }))`
    border: 2px solid black;
    width: 370px;
    height: 40px;
    ${tw`

        text-2xl
        
        
    `};
`;

export function ApartmentCreatorUi(props) {

    async function requestAccount() {
        await window.ethereum.request({ method : 'eth_requestAccounts' });
    }

    const [price, setPrice] = useState('');
    const [apartmentID, setApartmentId] = useState('');
    const [details, setDetails] = useState('');
    const [address, setAddress] = useState('');
    const [img, setImg] = useState(null); 

    useEffect(() => {
        if (img != null) { 
            var fileReader = new window.FileReader();
            fileReader.readAsArrayBuffer(img);
            fileReader.onloadend = () => { 
                setBuffer(Buffer(fileReader.result))
            }
        }
    }, [img]);

    const [buffer, setBuffer] = useState([]);
    //QmPCRujFGNRCuiJ1dGwBBcBESQ51YU9USn7pM6axXf7Cy1
    useEffect(() => {
        if (buffer != null) {
            async function fetchfile(){
                const file = await client.add(buffer)
                console.log( JSON.stringify(file));
                setImgLink(file.path)
            }       
            fetchfile()
        }
    }, [buffer]);
    
    const[imgLink, setImgLink] = useState('');

    function bufferout() {
        console.log('Test', imgLink);      

    }

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
            const transaction = await contract.createApartment(price, imgLink, address, details)
            await transaction.wait()
            transferToken()               
        }
    }
  


    return(
        <ApartmentCreatorContainer>
            <Title> Declare your apartment </Title>
            <Marginer direction="vertical" margin = "1em"/>        
            <Form>
                <StepDescription>
                    Declare the price of your apartment in Tokens per night!
                </StepDescription>
                <Input size="0.2em" onChange={e => setPrice(e.target.value)} placeholder="Price of Apartment" />
                <Marginer direction="vertical" margin="1em" />
                <StepDescription>
                    Upload image of your apartment!
                </StepDescription>
                <InputFile size="0.2em" onChange={e => setImg(e.target.files[0])}  placeholder="Upload Image" />
                <Marginer direction="vertical" margin="1em" />
                <StepDescription>
                    Declare the address of your apartment!
                </StepDescription>
                <InputText size="0.1em" onChange={e => setAddress(e.target.value)} placeholder="Zip code/City/Address" />
                <Marginer direction="vertical" margin="1em" />
                <StepDescription>
                    Declare the details of your apartment (WC, Kitchen, Living room, BedRooms)
                </StepDescription>
                <InputText size="0.1em" onChange={e => setDetails(e.target.value)} placeholder="Details of Apartment" />          
            </Form>  
            <Marginer direction="vertical" margin="1em" />
            {imgLink!='' && <ButtonsContainer onClick={createApartment}>
                <Button text="Create Apartment" />
            </ButtonsContainer> } 

                      
        </ApartmentCreatorContainer>
    );
}



