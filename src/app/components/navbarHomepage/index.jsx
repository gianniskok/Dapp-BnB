import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Logo } from "../logo";
import { NavItems } from "./navitems";

const NavBarContainer = styled.div `
    min-height:68px;
    ${tw`
        w-full
        max-w-screen-xl
        flex
        flex-row
        justify-between
        lg:pl-14
        lg:pr-14
        bg-gray-300 
    `}
`;

const LogoContainer = styled.div`
    ${tw`
        w-full
        flex
        flex-row
        justify-between
        items-center
        mb-5
    `};
`;
export function NavBar(props) {
   return (
        <NavBarContainer>
            <LogoContainer>
                <Logo/>
                <NavItems/>
            </LogoContainer>
        </NavBarContainer>
   );
}