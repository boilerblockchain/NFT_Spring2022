import React from "react";
import App from "../App";
import logo from '../assets/logo3.png';
import '../styles/App.css';


class WalletPage extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          accounts: null
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
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });

            //printing public address
            console.log("Connected", accounts[0]);
            console.log(accounts.length());
            this.setState(
                accounts[0]
            );
    
        } catch (error) {
          console.log(error)
        }
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