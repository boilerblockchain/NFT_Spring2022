//hre is Hardhat Runtime Environment

const main = async () => {
    const nftContractFactory = await hre.ethers.getContractFactory('NFT');
    const nftContract = await nftContractFactory.deploy();
    console.log("Contract deployed to:", nftContract.address);

    //Call the function
    let txn = await nftContract.NFT()
    //Wait for it to be mined
    await txn.wait()

};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

runMain();