var fs = require('fs');
var inputFolders = fs.readdirSync('input');

const width = 1000;
const height = 1000;
const dir = __dirname;
const description = "This is an NFT made by the coolest generative code.";
const baseImageUri = "https://hashlips/nft";
const startEditionFrom = 1;
const endEditionAt = 10;
const editionSize = 10;
const raceWeights = [
  {
    value: "skull",
    from: 1,
    to: editionSize,
  },
];

const finalDict = {skull: {
        name: "Skull",
        layers: [
        ],  
    },
};

//console.log(inputFolders)
defaultWeight = 100
//console.log(finalDict['skull']['layers'])
for (let i = 0; i < inputFolders.length; i++) {
    if(inputFolders[i] != ('config.js') && inputFolders[i] != ('.DS_Store') && inputFolders[i] != ('filefinder.js') && inputFolders[i] != ('dictCreate.js')) {
        var currentFolder = fs.readdirSync('./input/'+inputFolders[i]);
        //console.log(currentFolder)
        
        finalDict['skull']['layers'][i]={}
        finalDict['skull']['layers'][i]['name']=inputFolders[i]

        finalDict['skull']['layers'][i]['elements']=[]
        
        for (let j = 0; j < currentFolder.length; j++) {
            var id = j
            var location = `${dir}/`+inputFolders[i]+'/'+currentFolder[j]
            var name = currentFolder[j].substring(0,currentFolder[j].length-4)
            //console.log('id: ' + id)
            //console.log('location: ' + location);
            //console.log('name: ' + name)
            finalDict['skull']['layers'][i]['elements'][j]={'id':id,'path':location,'weight':defaultWeight}


        }
        finalDict['skull']['layers'][i]['position']={ x: 0, y: 0 }
        finalDict['skull']['layers'][i]['size']={ width: width, height: height }
    }
    
   
}
finalDict['skull']['layers'].shift()

//created name
//console.log(finalDict['skull']['layers'][0])
//console.log(finalDict['skull'])
//console.log('----------------------------------------')
/*
for(i=0;i<10;i++){
    console.log(finalDict['skull']['layers'][i])
}
*/

module.exports = {
    finalDict
  };