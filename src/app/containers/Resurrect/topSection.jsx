import React, { useRef } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Marginer } from "../../components/marginer";
import { useState, useEffect } from "react";
import algosdk from "algosdk";
import { PeraWalletConnect } from "@perawallet/connect";
import PeraLogo from "../../../assets/images/button-pera-connect@2x.png";
import MyAlgoLogo from "../../../assets/images/myalgo.svg";
import MyAlgoConnect from '@randlabs/myalgo-connect';
import axios from "axios";
 
 
const peraWallet = new PeraWalletConnect();

const token = ''
const api = 'https://testnet-api.algonode.cloud'
const port = '443'
const client = new algosdk.Algodv2(token, api, port);

const TopSectionContainer = styled.div`
    min-height: 500px
    margin-top: 10em;
    background-color: #000;

    ${tw`
        w-full
        max-w-screen-xl
        flex
        flex-col
        justify-between
        lg:pl-12 
        lg:pr-12
        pl-3
        pr-3
        pt-10
       
    `};
`;

const Slogan = styled.h1 `
    ${tw`
        
        text-white
        text-2xl 
        md:text-5xl 
        font-extrabold
        md:font-black
        md:leading-normal  
    `};
`;

// const ButtonsContainer=styled.div`
//     ${tw`
//         flex   
//         mt-4 
//         flex-wrap
//     `};
// `;

const ServicesContainer = styled.div `
    ${tw`
        w-full
        flex
        flex-col
        items-center
        ml-10
    `};
`;

const Title = styled.h1 `
    ${tw`
        text-4xl
        font-extrabold
        text-white
    `};
`;

const ServicesWrapper = styled.div`
    ${tw`
        flex
        flex-wrap
        ml-10
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
    height: 25em;
    width: 18em;
    background-color: #000;
`;

const TopContainer = styled.div `    
    ${tw`
        w-full
    `};
`;

const ServiceThumbnail = styled.div `
    width: 100%;
    height: 19em;
    
    img {
        width: 85%;
        height: 90%;
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
        items-center
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

const Input = styled.input.attrs(props => ({
    type: "number",
  }))`
    border: 2px solid black;
    width: 50px;
    height: 40px;
    ${tw`
        text-4xl
        
    `};
`;

const NavItem = styled.li`
    ${tw`
        flex
        items-start
        text-xs
        md:text-base
        text-black
        font-medium
        mr-1
        md:mr-5
        cursor-pointer
        transition
        duration-300
        ease-in-out
        hover:text-gray-700
               
    `};
`;

const LogoContainer = styled.div`
    ${tw`
        flex
        items-center
        ml-5
        mt-5
    `};
`;

const Image = styled.div`
    width: auto;
    ${tw`h-6 md:h-10`};

    img {
        width: auto;
        height: 100%;
    }
`;

const LogoText = styled.div`
    ${tw`
        text-sm
        md:text-lg
        font-bold
        text-white
        ml-3
        
    `};
`;

const BaseButton = styled.button `
    ${tw`
        pl-5
        pr-5 
        pt-4 
        pb-4 
        outline-none
        rounded-md
        text-white
        text-sm
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
        text-sm
        bg-white
        text-black
        hover:bg-transparent
        hover:text-white 
        hover:border-white 
    `};
`;


export function TopSection(props) {

    const [apartmentID, setApartmentId] = useState([]);
    
    

    const [apartments, setApartments] = useState([]);
    const [mapping, setMapping] = useState('not')
    const [burntAll, setBurnt] = useState('');
    const [accountAddress, setAccountAddress] = useState(null);
    

    const isConnectedToPeraWallet = !!accountAddress;
    useEffect(() => {
      // Reconnect to the session when the component is mounted
      peraWallet
        .reconnectSession()
        .then((accounts) => {
          peraWallet.connector.on("disconnect", handleDisconnectWalletClick);
  
          if (accounts.length) {
            setAccountAddress(accounts[0]);
          }
        })
        .catch((e) => console.log(e));
    }, []);
    const [resu, setRes] = useState([])
    const url = 'https://mainnet-idx.algonode.cloud/v2/transactions?limit=3000&tx-type=axfer&address=BOIZJGSWS3QKNKKAHI4YCP6LJOA6JT3JMKNICKY3PMWAJOV5NIEWIT3UPY&address-role=receiver&exclude-close-to=true'
    const [ind, setInd] = useState([])


    const getData = async () =>  {
            const {data} = await axios.get(url)
            setApartments(data['transactions'])       
    };

    const getIpfs = async (urls) => {
        const res =  await axios.get(urls)
        setRes(resu => [...resu, res.data['asset']['params']['url']])
    };

    // useEffect(() => {
    //     setApartments(JSON.parse(window.localStorage.getItem('parssed')));
    // }, []);
    
    // useEffect(() => {
    //     getData()
    //     console.log(apartments)
    //     window.localStorage.setItem('parssed', JSON.stringify(apartments));
    // }, [apartments]);


    useEffect(() => {
        let burnt = [];
        getData()
        let i = 0
        apartments.map((arr) => {if('asset-transfer-transaction' in arr && arr['asset-transfer-transaction']['amount'] == 1 && arr['sender'] == accountAddress){burnt.push(arr['asset-transfer-transaction']['asset-id'])} })
        if (burnt.length > 50){
            for (let i=0; i<Math.floor(burnt.length /50); i+=1){
                for (let j = 50*i; j<50*i + 50; j+=1){
                    if(j < burnt.length){
                        let url_per_img = 'https://mainnet-idx.algonode.cloud/v2/assets/'
                        let final_url = url_per_img.concat(burnt[j])
                        getIpfs(final_url)
                    }else{
                        break
                    }
                }
            }
        }else{
            for (let j = 0; j<burnt.length; j+=1){
                let url_per_img = 'https://mainnet-idx.algonode.cloud/v2/assets/'
                let final_url = url_per_img.concat(burnt[j])
                getIpfs(final_url)
            }
        } 

        if(burnt.length > 0){
            setMapping(true)
            setBurnt(burnt)
        }


    },[apartments.length]) 

    useEffect(() =>{
        (async () => {
            console.log(await client.status().do());
        })().catch((e) => {
            console.log(e);
        })},[]
    )
    

    function handleConnectWalletClick() {
        peraWallet
          .connect()
          .then((newAccounts) => {
            peraWallet.connector.on("disconnect", handleDisconnectWalletClick);
    
            setAccountAddress(newAccounts[0]);
          })
          .catch((error) => {
            if (error?.data?.type !== "CONNECT_MODAL_CLOSED") {
              console.log(error);
            }
          });
    }
    
    function handleDisconnectWalletClick() {
        peraWallet.disconnect();
    
        setAccountAddress(null);
    }

    if (accountAddress === null) {return( 
        <ServicesContainer>
            <Title>You need to connect wallet first!</Title>
            <NavItem onClick={
                handleConnectWalletClick
            }>
            {
                <LogoContainer>
                    <Image>
                        <img src={PeraLogo}  alt=""/>
                    </Image>
                    <LogoText>
                        Connect
                    </LogoText>
                </LogoContainer> }
            </NavItem>
            
        </ServicesContainer>)}
    if ( mapping === 'not') { return <ServicesContainer>You haven't burnt any BrokeBoiz yet !</ServicesContainer>}
    
    return (
            <TopSectionContainer>
                <Marginer direction="vertical" margin="1.5em"/>
                <Slogan>Resurrect your Burnt OGs!</Slogan>
                <Marginer direction="vertical" margin="5em" />
                <ServicesContainer>
                    <Title>Current burnt BrokeBoiz</Title>
                    <Marginer direction="vertical" margin="3em"/>                           
                        <ServicesWrapper >
                        {resu.map((ipfs_urls) => (        
                            <CardContainer key={ipfs_urls} >
                                <LogoText> Id: {burntAll[resu.indexOf(ipfs_urls)]}</LogoText>
                                <ServiceThumbnail >
                                    <img src={ipfs_urls.replace("ipfs://", "https://ipfs.io/ipfs/")} alt=" " />
                                </ServiceThumbnail>
                                <BaseButton onClick={() => console.log(resu[resu.indexOf(ipfs_urls)])}> Ressurect</BaseButton>                    
                            </CardContainer>
                            ))}         
                        </ServicesWrapper>
                </ServicesContainer>
            </TopSectionContainer>
    );
}