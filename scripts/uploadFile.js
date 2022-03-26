const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
REACT_APP_PINATA_API_KEY = '548e23ff78606b8f1260'
REACT_APP_PINATA_SECRET_API_KEY = '1a36bd596ad96515278336ea4c09a7916353f48450633debdd45791b1abfd6fc'



// Sample file to upload a file to IPFS via Pinata
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
            pinata_api_key: REACT_APP_PINATA_API_KEY,
            pinata_secret_api_key: REACT_APP_PINATA_SECRET_API_KEY,
        },
    });

    // Log response and retrieval link
    console.log(res.data);
    console.log('File can be retrieved at: ' + 'https://gateway.pinata.cloud/ipfs/' + res.data.IpfsHash)

};

pinFileToIPFS();
