import { faCalendarAlt, faHouseUser, faMapMarkedAlt} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState} from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Marginer } from "../../components/marginer";
import { Button } from "../../components/button";
import { ethers} from 'ethers';

import Token from '../../../artifacts/contracts/Token.sol/Token.json';

const tokenAddress = '0xe7f1725e7734ce288f8367e1bb143e90bb3f0512';

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

const FooterContainer = styled.div`
    ${tw`
        flex
        flex-row
        justify-between 
        items-center
    `};
`;

const ButtonsContainer=styled.div`
    width: 200px;
    ${tw`
        flex    
        flex-wrap
        h-full
    `};
`;

const Input = styled.input.attrs(props => ({
    type: "number",
  }))`
    border: 2px solid black;
    width: 160px;
    height: 40px;
    ${tw`
        text-2xl
        
    `};
`;
export function BookingSteps(props) {

    async function getBalance() {
        if(typeof window.ethereum !== 'undefined' ){
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const sender = signer.getAddress()
            const contract = new ethers.Contract(tokenAddress, Token.abi, signer)
            try { 
                const data = await contract.balanceOf(sender)
                console.log('Account Balance: ', data.toString())
            } catch(err) {
                console.log("Error: ", err)
            }

        }
    }
    const [tokens, setTokens] = useState('');
    async function buyTokens() {
        if (!tokens) {console.log("Put valid number of tokens");
        return}
        if(typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const contract = new ethers.Contract(tokenAddress, Token.abi, signer)
            const transaction = await signer.sendTransaction({
                to: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
                value: ethers.utils.parseEther((tokens/100000).toString())
            })
            await transaction.wait()
            const tx = await contract.buy(tokens)
            await tx.wait()
        }
    }

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
        <Marginer direction="vertical" margin="2em" />
        <FooterContainer>
            <ButtonsContainer onClick={getBalance}>
                <Button text="See balances"/>                         
            </ButtonsContainer>
            <ButtonsContainer onClick={buyTokens}>
                <Button text="Buy tokens"/>                         
            </ButtonsContainer>
            <Input onChange={e => setTokens(e.target.value)} placeholder="Buy Tokens" />
        </FooterContainer>
    </Container>
}