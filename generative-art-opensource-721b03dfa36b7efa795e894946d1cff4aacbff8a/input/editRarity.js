var fs = require("fs");

var {
  races
} = require("./config.js");


//Which folder? User clicks on folder which is name
//Which element
var folder = '1-background' //variable to search folder
var element = 'LightBlue' //variable to search folder's element
var newWeight = 10; //variable to edit weight


for(i=0;i<10;i++){
  //locate folder
  if(races['skull']['layers'][i]['name'] == folder) {
    for(j=0;j<races['skull']['layers'][i]['elements'].length;j++){
      //locate element with name
      
        if(races['skull']['layers'][i]['elements'][j]['name'] == element) {
          console.log(races['skull']['layers'][i]['elements'][j])

          var id = races['skull']['layers'][i]['elements'][j]['id']
          var name = races['skull']['layers'][i]['elements'][j]['name']
          var location = races['skull']['layers'][i]['elements'][j]['path']

          races['skull']['layers'][i]['elements'][j]={'id':id,'name':name,'path':location,'weight':newWeight}
          console.log(races['skull']['layers'][i]['elements'][j])
        }
     
      
    }
  }
}

var dictstring = JSON.stringify(races);
fs.writeFile("./races.json", dictstring, function(err, result) {
  if(err) console.log('error', err);
});

module.exports = {
  races
}