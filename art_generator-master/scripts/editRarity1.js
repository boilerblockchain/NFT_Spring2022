let rarity = [require("../settings/rarity.json")]
//console.log(rarity)

function iterateObjects(obj) {
    for(prop in obj) {
        if(typeof(obj[prop]) == "object") {
            iterateObjects(obj[prop])
        } else {
            console.log(`${obj[prop]}`)
        }
    }
}

rarity.filter(item => {
    iterateObjects(item);
});