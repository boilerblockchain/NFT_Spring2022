require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.1",
  networks: {
    rinkeby: {
      url: process.env.ALCHEMY_API_URL, //part of gitignore
      accounts: [process.env.PRIVATE_KEY], //part of gitignore
    }
  }
};