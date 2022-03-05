import logo from './logo3.png';
import './App.css';

//Component imports
import ConnectWalletButton from "./components/ConnectWalletButton.js";
import CustomHeader from "./components/CustomHeader.js"
import CustomTextField from "./components/CustomTextField.js"

function App() {
  // Initialization and functions
  const connectWallet = async () => {
    alert("Get MetaMask");
  }

  const checkEmail = async () => {
    alert("test");

  }

  /* Page rendering */
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <code>BoilerBlockchain</code>
        </p>
        <CustomHeader text={"NFT Minter"}></CustomHeader>
      <CustomTextField id={"email"} update={checkEmail} text={"Purdue Email"}></CustomTextField>
      <br/>
      <ConnectWalletButton connectWallet={connectWallet}/>
      </header>
      
    </div>
  );
}

export default App;
