const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");

const pinFileToIPFS = async () => {

    // Pinata URL at which to pin file
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

    // File data to upload, encapsulated as an object
    let data = new FormData();
    data.append("file", fs.createReadStream("./logo/logo2.png"));

    // Write a fetch to url above containing file contents
    const res = await axios.post(url, data, {
        maxContentLength: "Infinity",
        headers: {
            "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
            pinata_api_key: process.env.PINATA_API_KEY,
            pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY,
        },
    });

    // Log response and retrieval link
    console.log(res.data);
    console.log('File can be retrieved at: ' + 'https://gateway.pinata.cloud/ipfs/' + res.data.IpfsHash)

};

pinFileToIPFS();
