// SPDX-License-Identifier: UNLICENSED

// some contents of contracts are taken from buildspace.so nft project
pragma solidity ^0.8.0;
//import openzeppelin contracts
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFT is ERC721URIStorage {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721 ("NFT Collection Name", "SHAPE") {
        console.log("Constructing Smart Contract");
    }

    //Contents of Contract...

    function createNFT(string memory tokenURI) public returns (uint) {

        _tokenIds.increment();
        //current token id, initially at 0
        uint256 newItemId = _tokenIds.current();

        //mint nft sender to msg
        _safeMint(msg.sender, newItemId);

        
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
        
    }
}