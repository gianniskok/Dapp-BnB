import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { injected } from "../../components/wallet/connectors";
import { useWeb3React } from "@web3-react/core";

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

export function NavItems (props) {

    

    const {active, activate, deactivate } = useWeb3React();

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
        <ListContainer>
            <NavItem >
                Contact Us
            </NavItem>
            {!active ? <NavItem onClick={connect}> Sign In With Metamask</NavItem> : <NavItem onClick={disconnect}> Disconnect from Metamask</NavItem>}
            
        </ListContainer>
    );
}