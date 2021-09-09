import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import HomePageImg from "../../../assets/images/home1.jpg"
import { SCREENS } from "../../components/responsive";

const AboutUsContainer = styled.div`
${tw`
    w-full
    flex
    items-center
    max-w-screen-xl
    xl:justify-center
    pt-4 
    pb-4 
    pr-7 
    pl-7 
    md:pl-0 
    md:pr-0 
    bg-white
`};
`;

const HouseContainer = styled.div`
    
    height:23em;
    margin-left: 200px;

   
    

    img {
        width:auto;
        height: 100%;
    }

    @media {min-width: ${SCREENS.md}{
        height: 30em;
    }

    @media {min-width: ${SCREENS.lg}{
        height: 40em;
    }

    @media {min-width: ${SCREENS.xl}{
        height: 45em;
        margin-left: 0;
    }

}`;

const InfoContainer = styled.div`
    ${tw`
        
        w-1/2
        flex
        items-start
        justify-between
        flex-col
        pl-16
    `};
`;

const Title = styled.h1`
    ${tw`
        
        text-black
        text-2xl 
        md:text-5xl 
        font-extrabold
        md:font-black
        md:leading-normal      
    `};
`;

const InfoText = styled.p`
    ${tw`
        
        max-w-2xl 
        text-sm
        text-gray-500 
        md:text-base
        font-normal
        mt-4
    `};
`;

export function AboutUs(props) {
    return (
    <AboutUsContainer>
        <InfoContainer>
            <Title>We are AirBnb but better!</Title>
            <InfoText>
               Rent an appartment now and pay with your favorite cryptocurency! Use our brand new decentralized app and live anywhere you want all around the globe! 
               You can find us on Facebook, Instagram, Twitter and you can subscribe to our newsletter. 
               From all of our team have a nice vacation.
            </InfoText>
        </InfoContainer>
        <HouseContainer>
            <img src={HomePageImg} />
        </HouseContainer>
    </AboutUsContainer>
    );
}