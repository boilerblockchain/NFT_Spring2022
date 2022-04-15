import React from 'react';
import {  Link } from "react-router-dom";
const navbar= () =>{
  return (
  <div>
    <li>
      <Link to="/">WalletPage</Link>
    </li>
    <li>
      <Link to="/">LogInPage</Link>
    </li>
    <li>
      <Link to="/sheeps">MintPage</Link>
    </li>
  </div>
  );
}
export default navbar;