import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { ServiceCard } from "../../components/serviceCard";
import { Marginer } from "../../components/marginer";
import tw from "twin.macro";


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
    `};
`;

const WarningText = styled.h3 `
    color: rgba(100, 100, 100);
    font-weight: 500;
`;




const wait = (num) => new Promise((rs) => setTimeout(rs, num));

export function Services(props) {
    const [offeredServices, setServices] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const isServicesEmpty = !offeredServices || (offeredServices && offeredServices.length === 0);
    

    const fetchServices = async() => {
        setLoading(true);
        const response = await axios.get("http://localhost:9000/services").catch((err) => {
            console.log("Error: ", err);
        });
        
        await wait(1500);

        if(response) {
            setServices(response.data);
        }
        setLoading(false);
    };
    useEffect(() => {
        fetchServices();     
    }, []);


    return ( 
        <ServicesContainer>
            <Title>Current ads</Title>
            <Marginer direction="vertical" margin="3em"/>
            <ServicesWrapper>
                {isServicesEmpty && !isLoading && (
                     <WarningText>No adds available yet! Create yours.</WarningText>
                )}
                {isLoading && (<WarningText>Loading...</WarningText>)}
                {!isServicesEmpty && !isLoading && offeredServices.map((service, idx) => (
                    <ServiceCard key={idx} {...service}/>
                ))}
            </ServicesWrapper>
        </ServicesContainer>
    );
}