import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { SCREENS } from "../../components/responsive";
import { Button } from "../../components/button";
import { Marginer } from "../../components/marginer";
import TopSectionImg from "../../../assets/images/home2.jpeg"
import { injected } from "../../components/wallet/connectors";
import { useWeb3React } from "@web3-react/core";

const TopSectionContainer = styled.div`
    min-height: 500px
    margin-top: 10em;
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
       
    `};
`;

const LeftContainer = styled.div`
    ${tw`
        w-1/2
        flex
        items-start
        justify-between
        flex-col
        pl-16
    `};
`;


const Slogan = styled.h1 `
    ${tw`
        
        text-black
        text-2xl 
        md:text-5xl 
        font-extrabold
        md:font-black
        md:leading-normal  
    `};
`;

const Description = styled.p`
    ${tw`
        
        max-w-2xl 
        text-sm
        text-gray-500 
        md:text-base
        font-normal
        mt-4
    `}
`;

const StandaloneApartment = styled.div`
width:40em;
height: 30em;
position: absolute;

z-index: -1;


img {
    width: 100%;
    height: auto;
    max-height: max-content;
}

@media (min-width: ${SCREENS.sm}) {
    top: 10em;
    right: 5em;
    width: 30em;
    max-height: 20em;
}

@media (min-width: ${SCREENS.lg}) {
    top: 10em;
    right: 5em;
    width: 50em;
    max-height: 20em;

}

@media (min-width: ${SCREENS.xl}) {
    top: 10em;
    right: 5em;
    width: 70em;
    max-height: 20em;
}
    }
`;

const ButtonsContainer=styled.div`
    ${tw`
        flex   
        mt-4 
        flex-wrap
    `};
`;



export function TopSection(props) {

    const {active, account,  activate, deactivate } = useWeb3React();
    
   

    async function connect() {
        try {
            await activate(injected)
        } catch(ex) {
            console.log(ex)
        }
    }

    async function disconnect() {
        try {
            deactivate(injected)
        } catch(ex) {
            console.log(ex)
        }
    }

   

    return (
            <TopSectionContainer>
                <LeftContainer>
                    <Marginer direction="vertical" margin="1.5em"/>
                    <Slogan>Click and Go!</Slogan>
                    <Slogan>Live decentralized </Slogan>
                    <Slogan>All arround the globe!</Slogan>
                    <Marginer direction="vertical" margin="1em"/>
                    <Description>
                        Visit your favorite places and rent appartments with the best available prices by paying via your favorite cryptocurency!
                        Become a member now!
                    </Description>
                    {!active ? <ButtonsContainer onClick={() => connect()} > 
                        {<Button text="Sign in with metamask" />}
                    </ButtonsContainer> : 
                    <ButtonsContainer onClick={() => disconnect() }> 
                        <Button text="Disconect from metamask" />                    
                    </ButtonsContainer>}
                        
                    { active ? <Description > Connected with {account} </Description>  : <Description> Not connected </Description>}                
                </LeftContainer>
                <StandaloneApartment>
                    <img src={TopSectionImg} alt="" />
                </StandaloneApartment>
                <Marginer direction="vertical" margin="5em" />
            </TopSectionContainer>
    );
}