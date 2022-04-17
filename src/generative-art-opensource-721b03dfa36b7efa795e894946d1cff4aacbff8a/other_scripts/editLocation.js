var fs = require("fs");

const config = require("../settings/config.json");

location = "https://images.com"
const changeLocation = async (_location)=>{
    
    config.image_location = _location
    console.log(config)
    
    var dictstringConfig = JSON.stringify(config);
    fs.writeFile("./settings/config.json", dictstringConfig, function(err, result) {
      if(err) console.log('error', err);
    });
  }
  
changeLocation(location);