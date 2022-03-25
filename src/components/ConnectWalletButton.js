import React, { useEffect, useState } from "react";


const ConnectWalletbutton = ({connectWallet, ...props}) => {
    return (
        <button 
        onClick={connectWallet}
        className = "cta-button connect-to-wallet-button">
            Connect Metamask Wallet
        </button>
    )
};



export default ConnectWalletbutton;
