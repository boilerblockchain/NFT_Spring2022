//import React, { Component } from "react";
import axios from 'axios';
import logo from './assets/logo3.png';
import './styles/App.css';
//import React, { useEffect, useState } from "react";
//import { constants, ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

//Component imports
import ConnectWalletButton from "./components/ConnectWalletButton.js";
import CustomHeader from "./components/CustomHeader.js"
import CustomTextField from "./components/CustomTextField.js"
import MintBtn from "./components/MintButton.js"
import DisplayImage from "./components/DisplayImage.js"
// import MetaMaskAuth from './components/metamask-auth';

import abi from "./utils/NFT.json"

const contractABI = abi.abi
const CONTRACT_ADDRESS="0x24531DA25f8A26Cd90f48C5C6694E5a8A5356bf4";
const OPENSEA_LINK = '';

const App = () => {

    //state variable to store user's public wallet
    const [currentAccount, setCurrentAccount] = useState("");
    const [isAvailable, setAvailable] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [isMining, setMining] = useState(false);

    const [isExistant, setExistant] = useState(false);
  
    const checkIfWalletIsConnected = async () => {
      //access to window.ethereum
      const { ethereum } = window;
  
      if (!ethereum) {
        console.log("Make sure you have metamask");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }
  
      //check if authorized to access user's wallet
      const accounts = await ethereum.request({method: 'eth_accounts'});
  
      //if user has multiple authorized accounts, we use the first one if it's there
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account: ", account);
        setCurrentAccount(account)
        setupEventListener();
      } else {
        console.log("No authorized account found")
      }
  
    }
  
    const connectWallet = async () => {
      try {
        const { ethereum } = window;
        
        //if no metamask wallet is found
        if (!ethereum) {
          alert("Get MetaMask");
          return; //breaks from method
        }
  
        //requesting access to the account
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
  
        //printing public address
        console.log("Connected", accounts[0]);
        console.log(accounts.length());
        setCurrentAccount(accounts[0]);
  
  
  
  
      } catch (error) {
        console.log(error)
      }
    }
  
    const setupEventListener = async () => {
      try {
        const { ethereum } = window;
  
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, contractABI,signer);
  
          connectedContract.on("NewNFTMinted", (from, tokenId) => {
            console.log(from, tokenId.toNumber())
            alert(`Hey there! We've minted your NFT and sent it to your wallet. It may be blank right now. It can take a max of 10 min to show up on OpenSea. Here's the link: https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`)
          });
  
          setAvailable(true);
  
          console.log("Setup event listener!")
        } else {
          console.log("Ethereum object doesn't exist");
        }
      } catch (error) {
        console.log(error)
      }
    }

    const pinFileToIPFS = async () => {
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
    }
  
    const askContractToMintNFT = async () => {
  
      try {
        const { ethereum } = window;
  
        if (ethereum) {
          //provider is used to talk to ethereum nodes that Metamaks provides to send and receive data from deployed contract
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          
          //creates connection to contract
          //always need contract address, abi file, and signer to connect
          const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
  
          setAvailable(false);
          setLoading(true);
         
  
          console.log("Opening wallet to pay gas fees...")
          let nftTxn = await connectedContract.createNFT();
          setMining(true);
          console.log("Mining...")
          
          await nftTxn.wait()
  
          console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);
          setMining(false);
          setLoading(false);
          setAvailable(true);
          
        } else {
          console.log("Ethereum object doesn't exist");
        }
      } catch (error) {
        console.log(error)
      }
    }
  
    // Render Methods
    const renderNotConnectedContainer = () => (
      <button onClick = {connectWallet} className="cta-button connect-wallet-button">
        Connect to Wallet
      </button>
    );

    const exists = async () => {
      setExistant(true)
    }
  
    //runs function when page loads
    useEffect(() => {
      checkIfWalletIsConnected();
    }, [])
  
  
  //Conditional render since we don't want to show Connect button when already connected
    return (
      <div className="App">
        <img src={logo} className="App-logo" alt="logo"/>
        <p>
            <code>BoilerBlockchain</code>
        </p>
        <div className="container">
          <div className="header-container">
            <p className="header gradient-text">Mint Your Own NFT</p>

            {!isExistant && (<button onClick={exists}>
                Does this account not already exist?
            </button>
            )}
  

            {currentAccount && isExistant && (
              //if wallet is connected and account is not found withing MongoDB Database, ask user to create username & password
              <div className="app__inputContainer">
                <input value={CustomTextField} placeholder="Email"/>
                
            </div>
            )}

            {currentAccount && isExistant && (
              <div className="app__inputContainer">
                <input value={CustomTextField} placeholder="Discord Tag"/>
                
            </div>
            )}

            {currentAccount && isExistant && (
              <div className="app__inputContainer">
                <input value={CustomTextField} placeholder="Password"/>
                
            </div>
            )}

            {currentAccount && isExistant && (
              <div className="app__inputContainer">
                <button>
                  Create Account
                </button>
              </div>
              
            )}
            
            {currentAccount === "" ? (
              renderNotConnectedContainer()
            ) : (
              //if wallet is connected and account is found within MongoDB Database, show mint button
              <button onClick={askContractToMintNFT} className="cta-button connect-wallet-button">
                Mint NFT
              </button>
            )}


          </div>
  
          {isLoading && (
              <div className = "loading"> </div>
          )}
  
          {isMining && (
              <div className = "sub-text2">Mining Block... </div>
          )}        
          
        </div>
      </div>
    );
  };

/*
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

mint = async () => {
    await this.pinFileToIPFS();
    // TODO Implement minting logic
  }

  

    // Log response and retrieval link
    console.log(res.data);
    console.log('NFT can be retrieved at: ' + 'https://gateway.pinata.cloud/ipfs/' + res.data.IpfsHash)
    this.setState({
      retrieveUrl: 'https://gateway.pinata.cloud/ipfs/' + res.data.IpfsHash
    });

  };

*/

export default App;
