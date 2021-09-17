import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { Logo } from "../logo";
import tw from "twin.macro";

const FooterContainer = styled.div `
min-height: 250px;
border-top: 0.5px solid #000;
    ${tw`
        w-full
        flex
        flex-col
        justify-between
        pr-10
        pl-10 
        pt-10 
        pb-5 
    `};
`;

const TopContainer = styled.div `
    ${tw`
        w-full
        flex
    `};
`;

const ContentContainer = styled.div `
    ${tw`
        flex
        flex-col
        items-start
    `};

    &:not(:last-of-type) {
        margin-right: 4%;
    }
`;

const BottomContainer = styled.div `
    height: 70px;
    border-top: 0.6px solid #000;
    ${tw`
        flex
        justify-between
        items-center
        pr-1 
        pl-1 
    `};


`;

const RightBottomContainer = styled.div `
    ${tw`
        flex
    `};
`;

const LeftBottomContainer = styled.div `
    ${tw`
        flex
    `};
`;

const Title = styled.h2 `
    ${tw`
        mb-2
        text-black
    `};
    font-weight: 600;
    font-size: 20px;
`;

const FLink = styled.a `
    text-decoration: none;
    color: #6F6F6F;
    font-weight: 500;
    font-size: 15px;
    cursor: pointer;
    &:not(:last-of-type){
        margin-bottom: 5px;
    }
`;

const PrivacyText = styled.h6 `
    color: #afafaf;
    font-size: 12px;
    ${tw`
        flex
        items-center
        ml-2
        pt-3.5
    `};
`;

const SocialIconn = styled.div `
    color: #8a8a8a;
    font-size: 20px;
    cursor: pointer;
    transition: background-color, 200ms ease-in-out;
    &:not(:last-of-type) {
        margin-right: 15px;
    }

    &:hover {
        color: #777777;
    }
`;
export function Footer(props) {
    return (
        <FooterContainer>
            <TopContainer>
                <ContentContainer>
                    <Title>Access</Title>
                    <FLink>Log In </FLink>
                </ContentContainer>
                <ContentContainer>
                    <Title>Contact Us</Title>
                    <FLink>via e-mail</FLink>
                    <FLink>Via chat</FLink>
                </ContentContainer>
            </TopContainer>
            <BottomContainer>
                <LeftBottomContainer>
                    <Logo hideLogo color="#8A8A8A" textsize={25} />
                    <PrivacyText> &#169; All Rights Reserved, 2021</PrivacyText>
                </LeftBottomContainer>
                <RightBottomContainer>
                    <SocialIconn >
                        <FontAwesomeIcon icon={faGithub} />
                    </SocialIconn>                 
                    <SocialIconn >
                        <FontAwesomeIcon icon={faLinkedin} />
                    </SocialIconn>
                </RightBottomContainer>
            </BottomContainer>
        </FooterContainer>
        
    );
}