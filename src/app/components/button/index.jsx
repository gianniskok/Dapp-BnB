import React from "react";
import styled from "styled-components";
import tw from "twin.macro";



const BaseButton = styled.button `
    ${tw`
        pl-5
        pr-5 
        pt-4 
        pb-4 
        outline-none
        rounded-md
        text-white
        text-base
        font-semibold
        border-transparent
        border-2
        border-solid
        focus:outline-none
        transition-all
        duration-200 
        ease-in-out
        m-1 
    `};
`;

const OutlinedButton = styled(BaseButton)`
    ${tw`
        bg-black
        hover:bg-transparent
        hover:text-black 
        hover:border-black 
    `};
`;

export function Button(props) {

    const {text} = props;
    return <OutlinedButton>{ text }</OutlinedButton>;
    
}