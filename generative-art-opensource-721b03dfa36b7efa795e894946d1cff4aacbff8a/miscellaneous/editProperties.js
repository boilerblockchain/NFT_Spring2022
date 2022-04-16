var fs = require("fs");
var inputFolders = fs.readdirSync('input');

//inputs
const newWidth = 1000; //default at 1000
const newHeight = 1000; //default at 1000
const newEditionSize = 20; //default at 10
const requestUnique = false;
const newEndEditionAt = 20;


//console.log(raceWeights[0])

const races = require("./races.json");

const properties = require("../other_scripts/properties.json");
const raceWeights = properties['raceWeights']
raceWeights[0]['to'] = newEditionSize
properties['raceWeights'] = raceWeights

properties['unique'] = requestUnique

properties['endEditionAt'] = newEndEditionAt

console.log(properties)
console.log(races['skull']['layers'][0]['size'])

for(i=0;i<races['skull']['layers'].length;i++){
    //locate folder
    races['skull']['layers'][i]['size']={ width: newWidth, height: newHeight }
}
console.log(races['skull']['layers'][0]['size'])


var dictstringProperties = JSON.stringify(properties);
fs.writeFile("./input/properties.json", dictstringProperties, function(err, result) {
  if(err) console.log('error', err);
});

var dictstringRaces = JSON.stringify(races);
fs.writeFile("./input/races.json", dictstringRaces, function(err, result) {
  if(err) console.log('error', err);
});


console.log("editProperties: Successful")
