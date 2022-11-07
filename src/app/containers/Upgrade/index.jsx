import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Marginer } from "../../components/marginer";
import { NavBar } from "../../components/navbarHomepage";
import { TopSection } from "./topSection";
import { Footer } from "../../components/footer";



const PageContainer = styled.div `
    min-height:800px;
    background-color: #000;

    ${tw`
        flex
        flex-col
        w-full
        h-full
        items-center
        overflow-x-hidden
    `}
`;


  
export function Upgrade(props) {
    return (   
            <PageContainer>
                <NavBar />
                <Marginer direction="vertical" margin="2em" />
                <TopSection />
                <Footer />
            </PageContainer>
    );
}