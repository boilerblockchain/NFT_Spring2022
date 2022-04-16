var fs = require("fs");

const config = require("../settings/config.json");
const rarity = require("../settings/rarity.json");

layers = [
    "1-background",
    "2-suit",
    "3-shoulder",
    "4-pin",
    "5-skin",
    "6-facial-hair",
    "90-headwear",
    "8-hair",
    "7-mask",
    "9-accessories"
]

const changeLayers = async (_layers)=>{
    
    config.layers = _layers
    console.log(config)


    
    var dictstringConfig = JSON.stringify(config);
    fs.writeFile("./settings/config.json", dictstringConfig, function(err, result) {
      if(err) console.log('error', err);
    });
  }
  
changeLayers(layers);