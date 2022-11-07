import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Marginer } from "../../components/marginer";
import { NavBar } from "../../components/navbarHomepage";
import { TopSection } from "./topSection";
import { Footer } from "../../components/footer";




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

const InputFile = styled.input.attrs(props => ({
    type: "file",
  }))`
    border: 2px solid black;
    width: 370px;
    height: 40px;
    ${tw`
        bg-white
        text-2xl       
    `};
`;

const ServicesContainer = styled.div `
    ${tw`
        w-full
        flex
        flex-col
        items-center
    `};
`;

const Title = styled.h1 `
    ${tw`
        text-4xl
        font-extrabold
        text-black
    `};
`;

const ServicesWrapper = styled.div`
    ${tw`
        flex
        flex-wrap
    `}


`;

const CardContainer = styled.div `
    ${tw`
        flex
        flex-col
        overflow-hidden
        mt-0.5 
        mb-5
        mr-2
        ml-9
    `};
    width: 440px;
    height: 560px;
    background-color: #fff;
    box-shadow: 0 0 3.9px rgba(0, 0 ,0, 0.27);
    border-bottom: 3px solid rgba(0, 0, 255, 1);
    border-top: 3px solid rgba(0, 0, 255, 1);
    border-left: 3px solid rgba(0, 0, 255, 1);
    border-right: 3px solid rgba(0, 0, 255, 1);
`;

const TopContainer = styled.div `    
    ${tw`
        w-full
    `};
`;

const ServiceThumbnail = styled.div `
    width: 100%;
    height: 20em;
    
    img {
        width: 100%;
        height: 100%;
    }
`;

const ContentContainer = styled.div `
    ${tw`
        w-full
        flex
        flex-col
        items-center
        justify-between
        pr-4
        pl-4
        pt-1
    `};

`;

const BottomContainer = styled.div `
    ${tw`
        
        w-full
        flex
        flex-col
        items-center
        justify-between
        pt-6
        pr-4 
        pl-4 
    `};

`;

const Title2 = styled.h2 `
    font-size: 20px;
    font-weight: 500;
    ${tw`
        text-black
        text-base
    `};
`;

const Title3 = styled.h2 `
    font-size: 20px;
    font-weight: 500;
    ${tw`
        text-red-900
        text-lg
    `};
`;

const SpecialistName = styled.h4 `

    ${tw`
        text-black
        text-base
        items-center
    `};
    font-size: 20px;


`;

const RatingContainer = styled.div `
    display: flex;
    color: #000;
`;

const PriceContainer = styled.div `
    ${tw`
        flex
        items-center
    `};
`;

const PriceText = styled.div `
    ${tw`
    `};
    color: #2A9D8F;
    font-weight: 500;
`;

const StartingAtText = styled.h6 `
    color: rgba(0, 1, 100, 0.5);
    font-weight: 400;
`;

const ButtonsContainer=styled.div`
    width: 200px;
    ${tw`
        flex    
        flex-wrap
        h-full
    `};
`;

const FooterContainer = styled.div `
    height:100%;
    ${tw`
        w-full
        flex
        flex-row
        items-center
        pl-96
        
        
    `};
    
`;




  
export function HomePage(props) {
    return (   
            <PageContainer>
                <NavBar />
                <Marginer direction="vertical" margin="2em" />
                <TopSection />
                <Marginer direction="vertical" margin="20em" />
                <Footer />
            </PageContainer>
    );
}