import { faCalendarAlt, faCarSide, faHouseUser, faMapMarkedAlt, faWarehouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Marginer } from "../../components/marginer";

const Container = styled.div`
    ${tw`
        w-full
        flex
        flex-col
        items-center
        pt-3 
        pb-3 
        lg:pt-6 
        lg:pb-6 
    `};
`;

const Title = styled.h2`
    ${tw`
        text-5xl
        lg:text-4xl 
        text-black
        font-extrabold
    `};
`;

const StepsContainer = styled.div` 
    ${tw`
        flex
        justify-evenly
        flex-wrap
        mt-7 
        lg:mt-16 
    `};
`;

const StepContainer = styled.div`
    ${tw`
        flex
        flex-col
        m-3
        md: w-96 
        items-center
        transition-colors
        hover:text-black 
    `};
`;

const Step = styled.div`
    box-shadow: 0 1.3px 12px -3px rgba(0, 0, 0, 0.4);
    ${tw`
        flex
        rounded-lg
        items-center
        justify-center
        p-6 
    `};
`;

const StepTitle = styled.h4`
    ${tw`
        text-black
        text-lg
        font-semibold
        mt-4 
    `};
`;

const StepDescription = styled.p`
    ${tw`
        text-xs
        md:text-sm
        text-center
        w-10/12 
        text-gray-600 
    `};
`;

const StepIcon = styled.span`
    ${tw`
        text-black
        text-5xl 
    `};
`;

export function BookingSteps(props) {
    return <Container>
        <Marginer direction="vertical" margin="2em" />
        <Title> Book your appartment now with these THREE simple steps!</Title>
        <StepsContainer>
            <StepContainer>
                <Step>
                    <StepIcon>
                        <FontAwesomeIcon icon={faMapMarkedAlt} />
                    </StepIcon>
                </Step>
                <StepTitle>Choose Location</StepTitle>
                <StepDescription>
                    Select the location you want to go to!
                </StepDescription>
            </StepContainer>
            <StepContainer>
                <Step>
                    <StepIcon>
                        <FontAwesomeIcon icon={faCalendarAlt} />
                    </StepIcon>
                </Step>
                <StepTitle>Choose the wanted Date</StepTitle>
                <StepDescription>
                    Choose the date of arriving!
                </StepDescription>
            </StepContainer>
            <StepContainer>
                <Step>
                    <StepIcon>
                        <FontAwesomeIcon icon={faHouseUser} />
                    </StepIcon>
                </Step>
                <StepTitle>Book your appartment</StepTitle>
                <StepDescription>
                    Book an available appartment!
                </StepDescription>
            </StepContainer>
        </StepsContainer>

    </Container>
}