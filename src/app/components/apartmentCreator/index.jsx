import React from "react";
import styled from "styled-components";
import { Marginer } from "../marginer";
import tw from "twin.macro";
import { useState, useEffect } from 'react';
import { Button } from "../../components/button";


const{ create } = require('ipfs-http-client');
const client = create({host: 'ipfs.infura.io', port: 5001, protocol: 'https'});



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
    
    useEffect(() => {
        if (buffer != null) {
            async function fetchfile(){
                const file = await client.add(buffer)
                console.log( JSON.stringify(file));
                setImgLink(`https://ipfs.infura.io/ipfs/${file.path}`)
            }       
            fetchfile()
        }
    }, [buffer]);
    
    const[imgLink, setImgLink] = useState('');

   

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
            {imgLink!=='' && <ButtonsContainer onClick={console.log(0)}>
                <Button text="Create Apartment" />
            </ButtonsContainer> } 

                      
        </ApartmentCreatorContainer>
    );
}



