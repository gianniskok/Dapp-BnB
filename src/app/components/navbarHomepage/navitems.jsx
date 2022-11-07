import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { useState, useEffect } from "react";
import { PeraWalletConnect } from "@perawallet/connect";
import PeraLogo from "../../../assets/images/button-pera-connect@2x.png";
import MyAlgoLogo from "../../../assets/images/myalgo.svg";
import MyAlgoConnect from '@randlabs/myalgo-connect';



const peraWallet = new PeraWalletConnect();
// const myAlgoWallet = new MyAlgoConnect();

const ListContainer = styled.ul`
    ${tw`
        flex
        list-none

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

const LogoContainer = styled.div`
    ${tw`
        flex
        items-center
        ml-5
        mt-5
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
        md:text-sm
        font-bold
        text-white
        ml-3
        
    `};
`;

export function NavItems (props) {


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

    function handleConnectWalletClick() {
        peraWallet
          .connect()
          .then((newAccounts) => {
            peraWallet.connector.on("disconnect", handleDisconnectWalletClick);
    
            setAccountAddress(newAccounts[0]);
          })
          .catch((error) => {
            if (error?.data?.type !== "CONNECT_MODAL_CLOSED") {
              console.log(error);
            }
          });
      }
    
    function handleDisconnectWalletClick() {
        peraWallet.disconnect();
    
        setAccountAddress(null);
    }

    // async function connectToMyAlgo() {
    //     try {
    //       const accounts = await myAlgoWallet.connect();
    //       const addresses = accounts.map(account => account.address);
          
    //     } catch (err) {
    //       console.error(err);
    //     }
    //   }
    return (
        <ListContainer>
            <NavItem onClick={isConnectedToPeraWallet
                ? handleDisconnectWalletClick
                : handleConnectWalletClick
            }>
            {isConnectedToPeraWallet ? 
                <LogoContainer>
                    <Image>
                        <img src={PeraLogo}  alt=""/>
                    </Image>
                    <LogoText>
                        { accountAddress.slice(0, 7)}
                    </LogoText>
                </LogoContainer> : <LogoContainer>
                    <Image>
                        <img src={PeraLogo}  alt=""/>
                    </Image>
                    <LogoText>
                        Connect
                    </LogoText>
                </LogoContainer> }
            </NavItem>
            {/* <NavItem onClick={connectToMyAlgo}> 
                <LogoContainer>
                    <Image>
                        <img src={MyAlgoLogo}  alt=""/>
                    </Image>
                </LogoContainer>
            </NavItem> */}
        </ListContainer>
    );
}