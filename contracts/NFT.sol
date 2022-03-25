//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFT is ERC721URIStorage{

    uint public tokenCount; //if variable is not initialized within solidity, then value will set get set to its default type depending on the datatype (uint)
    
    constructor() ERC721("Square NFT", "Square"){
        
    }

    function mint(string memory _tokenURI) external returns(uint) {
        tokenCount++; //incrementing token number since we're minting a new nft
        _safeMint(msg.sender, tokenCount); //safemint reverts if given tokenID already exists
        _setTokenURI(tokenCount, _tokenURI); //sets metadata for newly minted nft

        return(tokenCount);
    }
}