import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import WalletPage from './WalletPage';
import Login from './Login'
import reportWebVitals from './reportWebVitals';
import { Wallet } from 'ethers';

ReactDOM.render(
  <React.StrictMode>
    <WalletPage />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
