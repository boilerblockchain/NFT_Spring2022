import React from 'react';
import ReactDOM from 'react-dom';
import logo from './assets/logo3.png';
import './styles/App.css';
import CreateAccountPage from "./CreateAccountPage";
import MintPage from "./MintPage.js";
import { useMoralis } from "react-moralis";
import { MoralisProvider } from "react-moralis";

const NewWalletPage = () => {

    const {
        authenticate,
        isAuthenticated,
        isAuthUndefined,
        user,
        auth,
        setUserData,
        logout
    } = useMoralis();

    const connectWallet = async() => {
        await authenticate({signingMessage: "Moralis Authentication"})
        if (user.get('email') == null) {
            console.log("Full name " + user.get('email'))
            ReactDOM.render(
                <React.StrictMode>
                    <MoralisProvider serverUrl={process.env.REACT_APP_MORALIS_SERVER_URL} appId={process.env.REACT_APP_MORALIS_APP_ID}>
                        <CreateAccountPage/>
                    </MoralisProvider>
                </React.StrictMode>,
                document.getElementById('root')
            );
        } else {
            console.log("Full name" + user.get('email'))
            ReactDOM.render(
                <React.StrictMode>
                    <MoralisProvider serverUrl={process.env.REACT_APP_MORALIS_SERVER_URL} appId={process.env.REACT_APP_MORALIS_APP_ID}>
                        <MintPage />
                    </MoralisProvider>
                </React.StrictMode>,
                document.getElementById('root')
            );
        } 

    }
    

    return (
    <div className="WalletPage">
        <img src={logo} className="App-logo" alt="logo"/>
        <p>
            <code className="boilerblockchain-text">BoilerBlockchain</code>
        </p>
        <div className="connect-container">
            <div className="header-container">
                <p className="mint-your-own-text">MINT YOUR OWN NFT</p>
                <button className="connect-wallet-btn" onClick = {connectWallet}> CONNECT WALLET </button>   
            </div>
        </div>
    </div>
    );
}
export default NewWalletPage;