import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Logo } from "../logo";
import { NavItems } from "./navitems";
import { Link } from "react-router-dom";



const NavBarContainer = styled.div `
    min-height:58px;
    max-height: 70px;
    background-color: #000;


    ${tw`
        w-full
        max-w-screen-xl
        flex
        flex-row
        justify-between
        lg:pl-14
        lg:pr-14
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
                <Link to="/">
                    <Logo/>
                </Link>
                <NavItems />
            </LogoContainer>
        </NavBarContainer>
   );
}