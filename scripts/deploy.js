const main = async () => {
    //compiles contract and generates files we need to work with contract under artifacts
    const nftContractFactory = await hre.ethers.getContractFactory('NFT');
    //hardhat creates local ethereum network
    //everytime contract is run, it will create new blockchain and after running, the local network is destroyed
    const nftContract = await nftContractFactory.deploy();
    //waiting for contract to get mined (by fake miners in hardhat)
    await nftContract.deployed();

    //NFT Constructor runs when contract is deployed
    console.log("Contract deployed to:", nftContract.address);


    //Contents of NFT Minting...
}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();