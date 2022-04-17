var FormData = require('form-data');
var fs = require('fs');

const axios = require('axios')
const PINATA_GATEWAY = 'https://api.pinata.cloud/pinning/pinFileToIPFS'
//const nft = require("../images/Screen Shot 2022-04-07 at 3.56.43 PM.png")

const images = fs.readdirSync("./images");
console.log(images.length)

const NFTs = []

for(var i = 0; i < images.length; i++) {
    var currentFile = images[i];
    console.log(currentFile)
    NFTs[i]=currentFile
}
//console.log(NFTs)

/*

console.log(NFTs)
NFTs[1]= require("../images/screenshot.png")
console.log(NFTs)
*/

const pinFileToIPFS = async () => {
    // Array for storing all URLs returned from Pinata
    let urls = []

    // Loop through entire NFTs state array
    for (let i = 0; i < NFTs.length; i++) {
        // File data to upload, encapsulated as an object
        let data = new FormData();
        data.append("file", NFTs[i]);

        // Write a fetch to url above containing file contents
        const res = await axios.post(PINATA_GATEWAY, data, {
            maxContentLength: "Infinity",
            headers: {
                "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
                pinata_api_key: '329c3a9ee8cb5e6914fc',
                pinata_secret_api_key: '66f86548a1f16b8b6d2528b40362d9ab1a3186511bf23a06085f41801fe02c7f',
            },
        });

        // Append proper url to urls array
        urls.push('https://gateway.pinata.cloud/ipfs/' + res.data.IpfsHash)
    }
    return urls;
}


pinFileToIPFS()
