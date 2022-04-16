var fs = require('fs');
var inputFolders = fs.readdirSync('layers');

const width = 1000;
const height = 1000;
const dir = __dirname;
const description = "This is an NFT made by the coolest generative code.";
const baseImageUri = "https://hashlips/nft";
const startEditionFrom = 1;//don't change
const endEditionAt = 10;//max tokens

const defaultWeight = 50

const races = {
    layers: [
    ],
};

//console.log(inputFolders)

//console.log(races['skull']['layers'])
for (let i = 0; i < inputFolders.length; i++) {
  var currentFolder = fs.readdirSync('./input/'+inputFolders[i]);
    
        //console.log(currentFolder)
        
        races['layers'][i]={}
        races['layers'][i]['name']=inputFolders[i]

        races['layers'][i]['elements']=[]
        
        for (let j = 0; j < currentFolder.length; j++) {
            var id = j
            var location = `${dir}/`+inputFolders[i]+'/'+currentFolder[j]
            var name = currentFolder[j].substring(0,currentFolder[j].length-4)
            //console.log('id: ' + id)
            //console.log('location: ' + location);
            //console.log('name: ' + name)
            races['layers'][i]['elements'][j]={'id':id, 'weight':defaultWeight}


        }
    
   
}
races['layers'].shift()

//created name
//console.log(races['skull']['layers'][0])
//console.log(races['skull'])
//console.log('----------------------------------------')
/*
for(i=0;i<10;i++){
    console.log(races['skull']['layers'][i])
}
*/

//console.log(races)
//console.log(races['skull'])

var dictstringProperties = JSON.stringify(properties);
fs.writeFile("./input/properties.json", dictstringProperties, function(err, result) {
  if(err) console.log('error', err);
});

var dictstringRaces = JSON.stringify(races);
fs.writeFile("./input/races.json", dictstringRaces, function(err, result) {
  if(err) console.log('error', err);
});

console.log('DictCreate: Successful')
