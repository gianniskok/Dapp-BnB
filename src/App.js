import './App.css';
import { HomePage } from './app/containers/HomePage';
import React from "react";
import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from 'ethers';

export function getLibrary(provider) { 
  return  new ethers.providers.Web3Provider(window.ethereum); 
}

function App() {
  return (
    <div className="App">
      <Web3ReactProvider getLibrary={getLibrary}>
        <HomePage />
      </Web3ReactProvider>
    </div>
  );
      
}

export default App;
