// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.1;
//import openzeppelin contracts
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "hardhat/console.sol";

contract NFT is ERC721URIStorage {
    constructor() ERC721 ("NFT Collection Name", "SHAPE") {
        console.log("This is a NFT Smart Contract");
    }

    //Contents of Contract...
}