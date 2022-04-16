var fs = require("fs");

const config = require("../settings/config.json");

dimensions = 256
const changeDimensions = async (_dimensions)=>{
    
    config.image_details.height = _dimensions
    config.image_details.width = _dimensions
    console.log(config)
    
    var dictstringConfig = JSON.stringify(config);
    fs.writeFile("./settings/config.json", dictstringConfig, function(err, result) {
      if(err) console.log('error', err);
    });
  }
  
changeDimensions(dimensions);