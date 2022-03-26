//SPDX-License-Identifier: MIT

//run command (npx hardhat test) to run all tests
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

//guard marketplace from re-entrency attacks
//marketplace keeps track of all nfts listed for sale
//stores all the properties and data regarding the nft (seller, id, contract, price,...)
contract Marketplace is ReentrancyGuard {
    
    //marketplace charges fees/commission for any nft purchased
    
    address payable public immutable feeAccount; //account that receives fees
    uint public immutable feePercent; // fee percentage of sales
    uint public itemCount;

    //struct is like the javascript equivalent of objects
    //helps create complex datatypes with multiple different fields
    struct Item {
        //instances
        uint itemId;
        IERC721 nft;
        uint tokenId;
        uint price;
        address payable seller;
        bool sold; //whether nft has been sold or not
    }

    event Offered (
        uint itemId,
        address indexed nft,
        uint tokenId,
        uint price,
        address indexed seller
    );

    event Bought (
        uint itemId,
        address indexed nft,
        uint tokenId,
        uint price,
        address indexed seller,
        address indexed buyer
    );
    
    //we need something to store all the different items using mapping 
    //itemId will be key and item struct will be the return value

    //keytype => valuetype as the input
    mapping(uint => Item) public items; //items-name of the map


    //inputting feePercent
    constructor(uint _feePercent){
        feeAccount = payable(msg.sender); //assigning msg.sender as a payable account
        feePercent = _feePercent;
    }

    //from frontend, user will pass in the address of the nft contract, solidity turns it into nft contract instance
    //inherits Reentrancy guard-nonReentrant prevents bad actors from calling makeItem function and the calling function again before the first callback for makeItem is finished
    function makeItem( IERC721 _nft, uint _tokenId, uint _price) external nonReentrant {
        //second input is EVM revert error message
        require(_price > 0, "Price must be greater than zero"); //if condition is false, function stops executing and any changes to the state are reverted
        //increment itemCount
        itemCount ++;
        //transfer nft
        //address(this) is the address of the contract
        //from, to, tokenID
        _nft.transferFrom(msg.sender, address(this), _tokenId);

        //adds new item to items map
        //registered into the marketplace
        items[itemCount] = Item (
            itemCount, //set as key
            _nft,
            _tokenId,
            _price,
            payable(msg.sender),
            false
        );

        emit Offered(
            itemCount,
            address(_nft),
            _tokenId,
            _price,
            msg.sender
        );

    }

    function purchaseItem(uint _itemId) external payable nonReentrant {
        uint _totalPrice = getTotalPrice(_itemId);
        Item storage item = items[_itemId];
        require(_itemId > 0 && _itemId <= itemCount, "item doesn't exist");
        require(msg.value >= _totalPrice, "not enough to cover item price and market fee");
        require(!item.sold, "item already sold");
        //paying the seller and the fee account
        item.seller.transfer(item.price); //calling transfer method on the seller's address, passing in price's item
        feeAccount.transfer(_totalPrice - item.price); //transfer the fee to the feeAccount address, passing in the totalPrice - item.price
        //update the item as sold
        item.sold = true;
        //transferring the nft item to the buyer
        item.nft.transferFrom(address(this), msg.sender, item.tokenId);
        //emit a bot event
        emit Bought(
            _itemId,
            address(item.nft),
            item.tokenId,
            item.price,
            item.seller,
            msg.sender
        );
    }

    //view is only for reading any state variables
    function getTotalPrice(uint _itemId) view public returns(uint) {
        return items[_itemId].price*(100 + feePercent)/100;
    }
}