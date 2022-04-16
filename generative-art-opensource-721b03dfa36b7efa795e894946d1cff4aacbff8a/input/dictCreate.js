var fs = require('fs');
var inputFolders = fs.readdirSync('input');

const width = 1000;
const height = 1000;
const dir = __dirname;
const description = "This is an NFT made by the coolest generative code.";
const baseImageUri = "https://hashlips/nft";
const startEditionFrom = 1;//don't change
const endEditionAt = 10;//max tokens
const editionSize = 10;//rarity

var defaultWeight = 0

const critical = require("./critical.json");

const raceWeights = [
  {
    value: "skull",
    from: 1,
    to: editionSize,
  },
];

//Critical Features: always appear in image. All weights of pngs have to equal 100
//Non-Critical Features: not necessary, so doesn't appear all the time. All weights of pngs within layer have to be less than 100
const properties = {
  width: width,
  height: height,
  dir: __dirname,
  description: description,
  baseImageUri: baseImageUri,
  startEditionFrom: startEditionFrom,
  endEditionAt: endEditionAt,
  editionSize: editionSize,
  raceWeights: raceWeights,
  unique: true
};

const races = {
      skull: {
        name: "Skull",
        layers: [
        ],  
    },
};

//console.log(inputFolders)

//console.log(races['skull']['layers'])
for (let i = 0; i < inputFolders.length; i++) {
    if(inputFolders[i] != ('config.js') && inputFolders[i] != ('.DS_Store') && inputFolders[i] != ('filefinder.js') 
    && inputFolders[i] != ('dictCreate.js') && inputFolders[i] != ('editRarity.js') && inputFolders[i] != ('races.json')
    && inputFolders[i] != ('editProperties.js') && inputFolders[i] != ('uploadFolders.js') && inputFolders[i] != ('properties.json')
    && inputFolders[i] != ('critical.json')) {
        var currentFolder = fs.readdirSync('./input/'+inputFolders[i]);
        //console.log(currentFolder)
        
        races['skull']['layers'][i]={}
        races['skull']['layers'][i]['name']=inputFolders[i]

        races['skull']['layers'][i]['elements']=[]
        console.log(inputFolders[i])

        critical["critical"].push(inputFolders[i])

        console.log(currentFolder.length)

        defaultWeight = 100/currentFolder.length
        for (let j = 0; j < currentFolder.length; j++) {
          
          var id = j
          var location = `${dir}/`+inputFolders[i]+'/'+currentFolder[j]
          var name = currentFolder[j].substring(0,currentFolder[j].length-4)
          //console.log('id: ' + id)
          //console.log('location: ' + location);
          //console.log('name: ' + name)
          
          races['skull']['layers'][i]['elements'][j]={'id':id,'name':name,'path':location,'weight':defaultWeight}


        }
        races['skull']['layers'][i]['position']={ x: 0, y: 0 }
        races['skull']['layers'][i]['size']={ width: width, height: height }
    }
    
   
}
races['skull']['layers'].shift()

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

var dictstringCritical = JSON.stringify(critical);
fs.writeFile("./input/critical.json", dictstringCritical, function(err, result) {
  if(err) console.log('error', err);
});

console.log('DictCreate: Successful')
