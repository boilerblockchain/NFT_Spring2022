import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import axios from 'axios';
import logo from './assets/logo3.png';
import './styles/App.css';
//Component imports
import CustomHeader from "./components/CustomHeader.js"
import CustomTextField from "./components/CustomTextField.js"
import MintBtn from "./components/MintButton.js"
import DisplayImage from "./components/DisplayImage.js"
// import MetaMaskAuth from './components/metamask-auth';
import abi from "./utils/NFT.json"

const contractABI = abi.abi
const CONTRACT_ADDRESS="0x24531DA25f8A26Cd90f48C5C6694E5a8A5356bf4";
let OPENSEA_LINK = '';
let TOKEN_ID = 0;
// Pinata URL at which to pin file
const PINATA_GATEWAY = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

// class NFTProperties extends React.Component {
//   // Initialization and functions
//
//   constructor(props) {
//     super(props);
//     this.state = {
//       NFSs: null,
//       IPFS_URLs: null
//     };
//
//     this.changeNFTs = this.changeNFTs.bind(this);
//   }
//
// }

const App = () => {
    //state variable to store user's public wallet
    const [currentAccount, setCurrentAccount] = useState("");
    const [isAvailable, setAvailable] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [isMining, setMining] = useState(false);
    const [isExistant, setExistant] = useState(false);
    const [isMinted, setMinted] = useState(false);
    // Array of NFT file metadata
    const [NFTs, setNFTs] = useState([]);
    // Array of rendered URLs or empty
    const [renderedURLs, setRenderedURLs] = useState([]);

    //runs function when page loads
    useEffect(() => {
        checkIfWalletIsConnected();
        setRenderedURLs([])
    }, [])

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
            setMinted(true);


            OPENSEA_LINK=`https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`
            TOKEN_ID=tokenId.toNumber();

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

    // Start image selection, IPFS code, and IPFS url handling
    const changeNFTs = async (images) => {
        setNFTs(images);
    }

    const pinFileToIPFS = async () => {
        // Array for storing all URLs returned from Pinata
        let urls = []

        // Loop through entire NFTs state array
        for (let i = 0; i < NFTs.length; i++) {
            // File data to upload, encapsulated as an object
            let data = new FormData();
            data.append("file", NFTs[i]);

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

        await renderURLs(urls)
        return urls;
    }

    const renderURLs = async (urls) => {
        let renders = []
        for (let i = 0; i < urls.length; i++) {
            renders.push(<text>NFT #{i + 1} can be retrieved <a href={urls[i]}>here</a>.</text>)
            renders.push(<br/>)
        }
        setRenderedURLs(renders);
    }
    // End image selection, IPFS code, and IPFS url handling

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
          let nftTxn = await connectedContract.createNFT();
          setMining(true);
          console.log("Mining...")

          await nftTxn.wait()

          console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);
          console.log(OPENSEA_LINK)
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
  
    const CreateAccount = () => {
        console.log("Create Account!")
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

            {currentAccount && !isExistant && (
                <div>
                    <button onClick={exists}>
                        Does this account not already exist?
                    </button>
                </div>
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

            {currentAccount && isExistant && ( //Confusing
              <div className="app__inputContainer">
                <button onClick={CreateAccount}>
                  Create Account
                </button>
              </div>

            )}

            <DisplayImage changeNFTs={changeNFTs}/>


            {!currentAccount && (
              <div onClick={connectWallet} className="cta-button connect-wallet-button">
                <button>
                  Connect to Wallet
                </button>
              </div>
            )}

            {currentAccount && (
              <div onClick={askContractToMintNFT} className="app__inputContainer">
                <button>
                Mint NFT
                </button>
              </div>
            )}

            {isMinted && (
              <div>
                <a href = {"https://testnets.opensea.io/assets/"+CONTRACT_ADDRESS+"/"+TOKEN_ID} target="_blank" rel="noopener noreferrer"> See NFT </a>
              </div>
            )}

            {currentAccount && isExistant && (
              <div className="app__inputContainer">
                How would you like to upload your NFTs? (If images have been already created and are ready to mint, hit Upload Images. If you would like to upload layers and want us to randomize and combine layers into images, hit Upload Layers.)
              </div>
            )}

            {currentAccount && isExistant && (
              <div className="app__inputContainer">
                <button>
                  Upload Images
                </button>
              </div>
            )}

            {currentAccount && isExistant && (
              <div className="app__inputContainer">
                <button>
                  Upload Layers
                </button>
              </div>
            )}
          </div>

          {isLoading && (
              <div className = "loading"> </div>
          )}

          {isMining && (
              <div className = "sub-text2">Mining Block... </div>
          )}

        {!isLoading && !isMining && (
            <div>
                {renderedURLs}
            </div>
        )}
        </div>
      </div>
    );
  };

export default App;
