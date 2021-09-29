import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
// import { BookCard } from "../../components/bookCard";
import { Marginer } from "../../components/marginer";
import { NavBar } from "../../components/navbarHomepage";
import { AboutUs } from "./aboutUs";
import { BookingSteps } from "./bookingSteps";
import { TopSection } from "./topSection";
import { Services } from "../../containers/HomePage/services";
import { Footer } from "../../components/footer";
import {  ApartmentCreatorUi } from "../../components/apartmentCreator";
import { ApartmentRenterUi } from "../../components/apartmentRenter";



const PageContainer = styled.div `
    min-height:800px;
    ${tw`
        flex
        flex-col
        w-full
        h-full
        items-center
        overflow-x-hidden
    `}
`;


  
export function HomePage(props) {
    return (   
            <PageContainer>
                <NavBar />
                <Marginer direction="vertical" margin="2em" />
                <TopSection />
                <Marginer direction="vertical" margin="5em" />
                <BookingSteps />
                <Marginer direction="vertical" margin="5em" />
                <AboutUs />
                <Marginer direction="vertical" margin="5em" />
                <ApartmentCreatorUi />
                <Marginer direction="vertical" margin="5em" />
                <Services />
                <Marginer direction="vertical" margin="5em" />
                <ApartmentRenterUi />
                <Marginer direction="vertical" margin="5em" />
                {/* <BookCard /> */}
                <Marginer direction="vertical" margin="6em" />
                <Footer />
            </PageContainer>
    );
}