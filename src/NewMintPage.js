import React, { useState } from "react";
import { ethers } from "ethers";
import axios from 'axios';
import styles from './styles/App.css';
import logo from './assets/logo3.png';
import styled from 'styled-components';
import { useMoralis } from "react-moralis";
import abi from "./utils/NFT.json"

const PINATA_GATEWAY = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
let OPENSEA_LINK = '';
const CONTRACT_ADDRESS="0x24531DA25f8A26Cd90f48C5C6694E5a8A5356bf4";
const contractABI = abi.abi
const NewMintPage = () => {

    // Array of NFT file metadata
    const [NFTs, setNFTs] = useState([]);
    // Array of rendered URLs or empty
    const [renderedURLs, setRenderedURLs] = useState([]);

    const [isAvailable, setAvailable] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [isMining, setMining] = useState(false);
    const [isExistant, setExistant] = useState(false);
    const [isMinted, setMinted] = useState(false);
    const [numberOfNFTs, setNumberOfNFTs] = useState(0);
    const [baseImage, setBaseImage] = useState(null);


    const {
        user
    } = useMoralis();

    console.log(user)
    console.log(user.get("fullName"))

    const fullName = user.get("fullName");

    const changeNumberOfNFTs = async(event) => {
        setNumberOfNFTs(event.target.value);
    }

    const changeBaseImage = async(event) => {
        setBaseImage(event.target.value);
    }

    const showButtons = () => {
        if (numberOfNFTs > 0 && numberOfNFTs % 1 == 0) {
            return false;
        }
        return true;

    }

    const pinFileToIPFS = async () => {
        // Array for storing all URLs returned from Pinata
        let urls = []

        // Loop through entire NFTs state array
        for (let i = 0; i < 1; i++) {
            // File data to upload, encapsulated as an object
            let data = new FormData();
            data.append("file", baseImage);

            // Write a fetch to url above containing file contents
            const res = await axios.post(PINATA_GATEWAY, data, {
                maxContentLength: "Infinity",
                headers: {
                    "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
                    pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
                    pinata_secret_api_key: process.env.REACT_APP_PINATA_SECRET_API_KEY,
                },
            });

            // Append proper url to urls array
            urls.push('https://gateway.pinata.cloud/ipfs/' + res.data.IpfsHash)
        }
    }

    const askContractToMintNFT = async () => {
        try {
          // Pin NFTs to IPFS and obtain IPFS_URLs
          let urls = await pinFileToIPFS();
  
  
  
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
            for(var i = 0; i < urls.length; i++) {
              let nftTxn = await connectedContract.createNFT(urls[i]);
              setMining(true);
              console.log("Mining...")
  
              await nftTxn.wait()
              console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);
            console.log(OPENSEA_LINK)
            }
  
            
            setMining(false);
            setLoading(false);
            setAvailable(true);
            setMinted(true);
  
          } else {
            console.log("Ethereum object doesn't exist");
          }
        } catch (error) {
          console.log(error)
        }
      }


    return (
        <div className="WalletPage">
            <img src={logo} className="App-logo" alt="logo"/>
            <p>
                <code className="boilerblockchain-text">BoilerBlockchain</code>
            </p>
            <div className="center">
                <h1 className="Header-text">{"Welcome, " + fullName}</h1>

                <p className="body-text">Upload Base Image</p>
                <input type='file' className="file-upload" onChange={changeBaseImage}></input>  

                <div className="form-trailing-space"></div>

                <p className="body-text">Upload Layers (Optional)</p>
                <input type='file' className="file-upload"></input>     

                <div className="form-trailing-space"></div>
                <div className="form-trailing-space"></div>

                <input type='number' placeholder="# of NFTs" onChange={changeNumberOfNFTs}></input>

                <div className="form-trailing-space"></div>

                <p className="body-text">Choose a contract type:</p>

                <select id="Contract Type">
                <option value="721">ERC 721</option>
                <option value="1155">ERC 1155</option>
                </select>

                <div className="form-trailing-space"></div>

                <p className="body-text">Choose a storage type:</p>

                <select id="Contract Type">
                <option value="onchain">On Chain</option>
                <option value="1155">Off Chain</option>
                </select>

                <div className="form-trailing-space"></div>

                <button hidden={showButtons()}>Preview Collection</button>
                <div className="form-trailing-space"></div>
                <button hidden={showButtons()} onClick={askContractToMintNFT}>Mint</button>
              
            </div>
        </div>

    )
}

export default NewMintPage;