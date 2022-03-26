//works with localhost, not Alchemy

const { ethers } = require("hardhat");

async function main() {

  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // deploy contracts here:
  const NFT = await ethers.getContractFactory("NFT");
  const nft = await NFT.deploy();
  console.log("nft contract address: " + nft.address);

  const Marketplace = await ethers.getContractFactory("Marketplace");
  const marketplace = await Marketplace.deploy(1); //need 1 since we have a constructor within Marketplace.sol
  console.log("marketplace contract address: " + marketplace.address);
  
  


  //Promise used to handle asynchronous function calls
  
  
  // For each contract, pass the deployed contract and name to this function to save a copy of the contract ABI and address to the front end.
  //nft contract, name of the contract
  saveFrontendFiles(nft, "NFT");

  //saving marketplace files to frontend/
  saveFrontendFiles(marketplace, "Marketplace");
}

function saveFrontendFiles(contract, name) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../../frontend/contractsData";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }


  //creates files for the smart contract for the frontend to read the smart contracts

  //smart contract's address
  fs.writeFileSync(
    contractsDir + `/${name}-address.json`,
    JSON.stringify({ address: contract.address }, undefined, 2)
  );

  const contractArtifact = artifacts.readArtifactSync(name);


  //save copy of smart contract's abi file
  fs.writeFileSync(
    contractsDir + `/${name}.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
