// SPDX-License-Identifier: UNLICENSED

// some contents of contracts are taken from buildspace.so nft project
pragma solidity ^0.8.1;
//import openzeppelin contracts
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "hardhat/console.sol";

contract NFT is ERC721URIStorage {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721 ("NFT Collection Name", "SHAPE") {
        console.log("Constructing Smart Contract");
    }

    //Contents of Contract...

    function createNFT() public {
        //current token id, initially at 0
        uint256 newItemId = _tokenIds.current();

        //mint nft sender to msg
        _safeMint(msg.sender, newItemId);

        //setting the data of nft
        //second parameter stores the json url of the Token (tokenURI)
        _setTokenURI(newItemId, "");

        //incrementing id of the nft
        _tokenIds.increment();
    }
}