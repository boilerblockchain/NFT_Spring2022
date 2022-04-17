import React from "react";
import ReactDOM from 'react-dom';
import logo from './assets/logo3.png';
import './styles/App.css';
import App from './App.js'
import CreateAccount from "./CreateAccount";
import SignUpPage from "./SignUpPage.js";
import MintPage from "./MintPage.js";
import { useMoralis } from "react-moralis";

class WalletPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {    
          wallets: null,
          authenticate: false
        };
    }


    isWalletLinked(inputWallet) {
        // Still needs to traverse the moralis db for assocated accounts...
        console.log("Is Wallet Linked!?")
        console.log("Wallet" + inputWallet)
        if (inputWallet != null) {
            console.log("True")
            return true
        } else {
            return false
        }
    }

    connectWallet = async () => {
        //useMoralis.authenticate()
        try {
            const { ethereum } = window;
            
            //if no metamask wallet is found
            if (!ethereum) {
                alert("Get MetaMask");
                return; //breaks from method
            }

            //requesting access to the account

            var wallet = null
            wallet = await ethereum.request({ method: "eth_requestAccounts" });

            //printing public address
            this.setState({
                wallets: wallet
            });
            //console.log(this.accounts.length);
    

            //if (!(ethereum.isConnected())) { // Go to create acct page
            if (this.isWalletLinked(wallet)) {
                console.log("Create account!")
                ReactDOM.render(
                    <React.StrictMode>
                        <CreateAccount walletProp={wallet}></CreateAccount>
                    </React.StrictMode>
                );
            }

            //printing public address
            this.setState({
                wallets: [wallet]
            });
            console.log("Connected", this.wallets);
            //console.log(this.accounts.length);
    

            if ((ethereum.isConnected())) { // Go to create acct page
                console.log("Create account!")
                ReactDOM.render(
                    <React.StrictMode>
                        <SignUpPage />
                    </React.StrictMode>,
                    document.getElementById('root')
                );
            } else { // Go to mint page
                console.log("Mint!")
                ReactDOM.render(
                    <React.StrictMode>
                        <MintPage />
                    </React.StrictMode>,
                    document.getElementById('root')
                );
            }
        } catch (error) {
            console.log(error)
        }
      }

    getAddress = () => {
        return this.state.accounts[0]
    }
    
    
   
    render() {
        return (
        <div className="WalletPage">
            <img src={logo} className="App-logo" alt="logo"/>
            <p>
                <code className="boilerblockchain-text">BoilerBlockchain</code>
            </p>
            <div className="connect-container">
                <div className="header-container">
                    <p className="mint-your-own-text">MINT YOUR OWN NFT</p>
                    <button className="connect-wallet-btn" onClick = {this.connectWallet}> CONNECT WALLET </button>    
                </div>
            </div>
        </div>
        );
    }
}
export default WalletPage;