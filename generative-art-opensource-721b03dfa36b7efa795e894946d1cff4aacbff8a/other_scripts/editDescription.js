var fs = require("fs");

const config = require("../settings/config.json");

description = "NFT Punks"
const changeDescription = async (_description)=>{
    
    config.image_description = _description
    console.log(config)
    
    var dictstringConfig = JSON.stringify(config);
    fs.writeFile("./settings/config.json", dictstringConfig, function(err, result) {
      if(err) console.log('error', err);
    });
  }
  
changeDescription(description);