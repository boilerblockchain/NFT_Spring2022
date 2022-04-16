var fs = require("fs");

const config = require("../settings/config.json");

count = 5
const changeCount = async (_count)=>{
    
    config.image_count = _count
    console.log(config)
    
    var dictstringConfig = JSON.stringify(config);
    fs.writeFile("./settings/config.json", dictstringConfig, function(err, result) {
      if(err) console.log('error', err);
    });
  }
  
changeCount(count);