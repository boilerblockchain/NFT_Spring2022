

const path = require("path");
const fs = require("fs");




const inputFolders = fs.readdirSync('./layers');

/*
const getLayers = async () => {
    return fs
        .readdirSync(`${layersBasePath}`)
        .filter((item) => !/(^|\/)\.[^\/\.]/g.test(item))
        .map((name) => {
            return {
                name
            }
        })
}

getLayers()
*/

//console.log(inputFolders)
//console.log(typeof(inputFolders))
const config = {}

config.layers = []
config.image_description='NFT Project'
config.image_count = 10
config.image_details = {width:512,height:512}
config.image_location = 'https://images.com'

for (var i = 0; i < inputFolders.length; i++) {
    if(inputFolders[i] != ('.DS_Store')) {
        //console.log(inputFolders[i])
        config.layers.push(inputFolders[i])
    }
    
}

console.log(config)

var dictstringConfig = JSON.stringify(config);
fs.writeFile("./settings/config.json", dictstringConfig, function(err, result) {
    if(err) console.log('error', err);
});
