const rarity = require("../settings/rarity.json")
const fs = require('fs');


function jsonReader(path, cb) {
    fs.readFile(path, 'utf-8', (err, fileData) => {
        if (err) {
            return cb && cb(err);
        } else  {
            try {
                const object = JSON.parse(fileData);
                return cb && cb(null, object);
            } catch(err) {
                return cb && cb(err);
            }
        }
    });
}

jsonReader("../settings/rarity.json", (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(data.layers);
    }
});