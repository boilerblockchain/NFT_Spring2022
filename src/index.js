import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import WalletPage from './WalletPage';
import NewWalletPage from './NewWalletPage'
import Login from './Login'
import reportWebVitals from './reportWebVitals';
import { Wallet } from 'ethers';
import { MoralisProvider } from "react-moralis";

ReactDOM.render(
  <React.StrictMode>
      <MoralisProvider serverUrl={process.env.REACT_APP_MORALIS_SERVER_URL} appId={process.env.REACT_APP_MORALIS_APP_ID}>
          <NewWalletPage />
      </MoralisProvider>

  </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
