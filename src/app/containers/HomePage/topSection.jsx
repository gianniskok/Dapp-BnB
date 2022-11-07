import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { useState, useEffect } from "react";

import { Button } from "../../components/button";
import { Marginer } from "../../components/marginer";
import TopSectionImg from "../../../assets/images/home2.jpeg"
import { Link } from "react-router-dom";
import algosdk from "algosdk";
import { PeraWalletConnect } from "@perawallet/connect";
import PeraLogo from "../../../assets/images/button-pera-connect@2x.png";

const peraWallet = new PeraWalletConnect();


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

const ServicesContainer = styled.div `
    ${tw`
        w-full
        flex
        flex-col
        items-center
        ml-10
    `};
`;

const NavItem = styled.li`
    ${tw`
        flex
        items-start
        text-xs
        md:text-base
        text-black
        font-medium
        mr-1
        md:mr-5
        cursor-pointer
        transition
        duration-300
        ease-in-out
        hover:text-gray-700
               
    `};
`;

const Title = styled.h1 `
    ${tw`
        text-4xl
        font-extrabold
        text-white
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

const Image = styled.div`
    width: auto;
    ${tw`h-6 md:h-10`};

    img {
        width: auto;
        height: 100%;
    }
`;

const LogoText = styled.div`
    ${tw`
        text-sm
        md:text-lg
        font-bold
        text-black
        ml-3
        
    `};
`;

const LogoContainer = styled.div`
    ${tw`
        flex
        items-center
        ml-5
        mt-5
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
        mt-0.5
    `}
`;

const StandaloneApartment = styled.div`
    width:40em;
    max-height: 30em;
    position: absolute;
    top: 10em;
    right: 5em;
    z-index: -1;


    img {
        width: 100%;
        height: auto;
        max-height: max-content;
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

    const [accountAddress, setAccountAddress] = useState(null);
    

    const isConnectedToPeraWallet = !!accountAddress;
    useEffect(() => {
      // Reconnect to the session when the component is mounted
      peraWallet
        .reconnectSession()
        .then((accounts) => {
          peraWallet.connector.on("disconnect", handleDisconnectWalletClick);
  
          if (accounts.length) {
            setAccountAddress(accounts[0]);
          }
        })
        .catch((e) => console.log(e));
    }, []);

    function handleDisconnectWalletClick() {
        peraWallet.disconnect();
    
        setAccountAddress(null);
    }

    function handleConnectWalletClick() {
        peraWallet
          .connect()
          .then((newAccounts) => {
            peraWallet.connector.on("disconnect", handleDisconnectWalletClick);
    
            setAccountAddress(newAccounts[0]);
            setTimeout(5000)

          })
          .catch((error) => {
            if (error?.data?.type !== "CONNECT_MODAL_CLOSED") {
              console.log(error);
            }
          });
    }
    if(accountAddress === null){
        return(
            <TopSectionContainer>
                <LeftContainer>
                    <Marginer direction="vertical" margin="1.5em"/>
                    <Slogan>Fuck Caesar!</Slogan>
                    <Description>
                        Ressurect and upgrade your OG BrokeBoiz
                    </Description>

                    <ServicesContainer>
            <Title>You need to connect wallet first!</Title>
            <NavItem onClick={
                handleConnectWalletClick
            }>
            {
                <LogoContainer>
                    <Image>
                        <img src={PeraLogo}  alt=""/>
                    </Image>
                    <LogoText>
                        Connect
                    </LogoText>
                </LogoContainer> }
            </NavItem>
            
        </ServicesContainer>
                </LeftContainer>
                <LeftContainer>
                    <StandaloneApartment>
                        <img src={TopSectionImg} alt="" />
                    </StandaloneApartment>
                </LeftContainer>
                <Marginer direction="vertical" margin="5em" />
            </TopSectionContainer>
        )
    }
        return (
            <TopSectionContainer>
                <LeftContainer>
                    <Marginer direction="vertical" margin="1.5em"/>
                    <Slogan>Fuck Caesar!</Slogan>
                    <Description>
                        Ressurect and upgrade your OG BrokeBoiz
                    </Description>

                    <Link to="/resurrect">
                        <ButtonsContainer onClick={console.log(0)} > 
                            {<Button text="Resurrect Your BBs" />}
                        </ButtonsContainer> 
                    </Link>
                    <Link to="/upgrade">
                        <ButtonsContainer onClick={console.log(0) }> 
                            <Button text="Upgrade Your BBs" />                    
                        </ButtonsContainer>  
                    </Link>         
                </LeftContainer>
                <LeftContainer>
                    <StandaloneApartment>
                        <img src={TopSectionImg} alt="" />
                    </StandaloneApartment>
                </LeftContainer>
                <Marginer direction="vertical" margin="5em" />
            </TopSectionContainer>
    );
}