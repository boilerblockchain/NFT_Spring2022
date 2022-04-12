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

const defaultWeight = 50

const raceWeights = [
  {
    value: "skull",
    from: 1,
    to: editionSize,
  },
];


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
    && inputFolders[i] != ('editProperties.js') && inputFolders[i] != ('uploadFolders.js') && inputFolders[i] != ('properties.json')) {
        var currentFolder = fs.readdirSync('./input/'+inputFolders[i]);
        //console.log(currentFolder)
        
        races['skull']['layers'][i]={}
        races['skull']['layers'][i]['name']=inputFolders[i]

        races['skull']['layers'][i]['elements']=[]
        
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

var dictstring = JSON.stringify(properties);
fs.writeFile("./input/properties.json", dictstring, function(err, result) {
  if(err) console.log('error', err);
});

var dictstring = JSON.stringify(races);
fs.writeFile("./input/races.json", dictstring, function(err, result) {
  if(err) console.log('error', err);
});


console.log('DictCreate: Successful')