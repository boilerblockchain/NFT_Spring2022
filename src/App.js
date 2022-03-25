import logo from './assets/logo3.png';
import './styles/App.css';
import React, { useEffect, useState } from "react";
import { constants, ethers } from "ethers";

//Component imports
import ConnectWalletButton from "./components/ConnectWalletButton.js";
import CustomHeader from "./components/CustomHeader.js"
import CustomTextField from "./components/CustomTextField.js"
import MintBtn from "./components/MintButton.js"
import DisplayImage from "./components/DisplayImage.js"
import MetaMaskAuth from './components/metamask-auth';

function App() {
  // Initialization and functions

  // Called when button is pressed
 // const connectWallet = async () => {
  //  alert("Get MetaMask");
  //}


  async function connect(onConnected) { 
    if (!window.ethereum) {
      alert("Get MetaMask!");
      return;
    }
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
  
    onConnected(accounts[0]); // this function connect the user to metamask. 
  }

  // Called when mint button is pressed
  const mint = async () => {
    alert("Mint")
  }

  /* Page rendering */
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <code>BoilerBlockchain</code>
        </p>
        <div className="Content1"> 
          <CustomHeader text={"NFT Minter"}></CustomHeader>
          <DisplayImage/>
          <CustomTextField text={"Purdue Email"}></CustomTextField>
          <input placeholder='Discord Tag'></input>
          <br/>
          <ConnectWalletButton connectWallet={connect}/>
          <br/>
          <MintBtn mintClick={mint}/>
          <br/>
          
        </div>
      </header>
      
    </div>
  );
}

export default App;
