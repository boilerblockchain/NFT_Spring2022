import React, { Component } from "react";
import axios from 'axios';
import logo from './assets/logo3.png';
import './styles/App.css';
//import React, { useEffect, useState } from "react";
//import { constants, ethers } from "ethers";

//Component imports
import ConnectWalletButton from "./components/ConnectWalletButton.js";
import CustomHeader from "./components/CustomHeader.js"
import CustomTextField from "./components/CustomTextField.js"
import MintBtn from "./components/MintButton.js"
import DisplayImage from "./components/DisplayImage.js"
// import MetaMaskAuth from './components/metamask-auth';

class App extends React.Component {
  // Initialization and functions
  
  constructor(props) {
    super(props);
    this.state = {
      nft: null,
      retrieveUrl: null
    };

    this.changeNFT = this.changeNFT.bind(this);
    this.connect = this.connect.bind(this);
    this.mint = this.mint.bind(this);
  }


  // Called when button is pressed
  // const connectWallet = async () => {
  //  alert("Get MetaMask");
  //}


  async connect(onConnected) {

    if (!window.ethereum) {
      alert("Get MetaMask!");
      return;
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    onConnected(accounts[0]); // this function connect the user to metamask.
  }

  changeNFT = async (image) => {
    this.setState({
      nft: image
    });
  }

  // Called when mint button is pressed
  mint = async () => {
    await this.pinFileToIPFS();
    // TODO Implement minting logic
  }

  // Pin selected NFT to IPFS
  pinFileToIPFS = async () => {
    // Pinata URL at which to pin file
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

    // File data to upload, encapsulated as an object
    let data = new FormData();
    data.append("file", this.state.nft);

    // Write a fetch to url above containing file contents
    const res = await axios.post(url, data, {
      maxContentLength: "Infinity",
      headers: {
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
        pinata_secret_api_key: process.env.REACT_APP_PINATA_SECRET_API_KEY,
      },
    });

    // Log response and retrieval link
    console.log(res.data);
    console.log('NFT can be retrieved at: ' + 'https://gateway.pinata.cloud/ipfs/' + res.data.IpfsHash)
    this.setState({
      retrieveUrl: 'https://gateway.pinata.cloud/ipfs/' + res.data.IpfsHash
    });

  };

  /* Page rendering */
  render() {
    let afterMint;
    if (this.state.retrieveUrl) {
      afterMint = <text>NFT can be retrieved <a href={this.state.retrieveUrl}>here</a>.</text>
    } else {
      afterMint = <text></text>
    }

    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <p>
              <code>BoilerBlockchain</code>
            </p>
            <div className="Content1">
              <CustomHeader text={"NFT Minter"}></CustomHeader>
              <DisplayImage changeNFT={this.changeNFT}/>
              <CustomTextField text={"Purdue Email"}></CustomTextField>
              <input placeholder='Discord Tag'></input>
              <br/>
              <ConnectWalletButton connectWallet={this.connect}/>
              <br/>
              <MintBtn mintClick={this.mint}/>
              <br/>
              {afterMint}
            </div>
          </header>

        </div>
    );
  }
}

export default App;
