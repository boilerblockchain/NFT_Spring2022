import React from "react";
import ReactDOM from 'react-dom';
import logo from './assets/logo3.png';
import './styles/App.css';
import App from './App.js'
import SignUpPage from "./SignUpPage.js";
import MintPage from "./MintPage.js";


class WalletPage extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          wallets: [{}, {}]
        };
    }
    connectWallet = async () => {
        try {
            const { ethereum } = window;
            
            //if no metamask wallet is found
            if (!ethereum) {
                alert("Get MetaMask");
                return; //breaks from method
            }

            //requesting access to the account
            const wallet = await ethereum.request({ method: "eth_requestAccounts" });

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
                <code>BoilerBlockchain</code>
            </p>
            <div className="container">
                <div className="header-container">
                    <p className="header gradient-text">Mint Your Own NFT</p>
                        <button onClick = {this.connectWallet}> Connect Wallet </button>    
                </div>
            </div>
        </div>
        );
    }
}
export default WalletPage;