import logo from './logo.svg';
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
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <CustomHeader text={"NFT Minter"}></CustomHeader>
      <CustomTextField id={"email"} update={checkEmail} text={"Purdue Email"}></CustomTextField>
      <br/>
      <ConnectWalletButton connectWallet={connectWallet}/>
      
    </div>
  );
}

export default App;
