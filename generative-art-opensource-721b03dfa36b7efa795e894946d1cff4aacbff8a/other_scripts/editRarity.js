var fs = require("fs");

const rarity = require("../settings/rarity.json");

//inputs
//Which folder? User clicks on folder which is name
//Which element
var folder = '90-headwear' //variable to search folder
var element = 'Stealth.png' //variable to search folder's element
var newWeight = 100; //variable to edit weight


const changeRarity = async (_folder, _element, _newWeight)=>{
  for(i=0;i<rarity.layers.length;i++){
    //locate folder
    if(rarity['layers'][i]['name'] == folder) {
      for(j=0;j<rarity['layers'][i]['attributes'].length;j++){
        //locate element with name
        
          if(rarity['layers'][i]['attributes'][j]['name'] == element) {
  
            rarity['layers'][i]['attributes'][j]['weight'] = newWeight
            console.log(rarity['layers'][i]['attributes'][j])
          }
       
        
      }
    }
  }
  
  var dictstringRarity = JSON.stringify(rarity);
  fs.writeFile("./settings/rarity.json", dictstringRarity, function(err, result) {
    if(err) console.log('error', err);
  });
}

changeRarity(folder, element, newWeight);


module.exports = {
  rarity
}

console.log("editRarity: Successful")
