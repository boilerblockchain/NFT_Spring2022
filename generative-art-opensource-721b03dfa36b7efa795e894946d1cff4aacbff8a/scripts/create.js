

var d = new Date();
var d1 = new Date();

const config = require("../settings/config.json")
const path = require("path");
const fs = require("fs");
const crypto = require('crypto')

// Define Paths
const base = process.cwd()
//console.log(base)
const buildBasePath = path.join(base, "/build")
const layersBasePath = path.join(base, "/layers")

// Define Rarity
let rarity

// Define Helpers
const { getAttributes, loadAttribute } = require("../helpers/attributes")
const { createMetadata, defineAttributes } = require("../helpers/metadata")


//Check
//Goes to rarity.json to initialize rarity
const initialize = () => {
    try { // Determine if rarity.json exists
        rarity = require("../settings/rarity.json")
    } catch (error) {
        throw new Error('Missing rarity.json file')
    }

    if (fs.existsSync(buildBasePath)) {
        fs.rmdirSync(buildBasePath, { recursive: true })
    }

    fs.mkdirSync(buildBasePath);
    fs.mkdirSync(path.join(buildBasePath, "/json"))
    fs.mkdirSync(path.join(buildBasePath, "/images"))
}

// Define Canvas

const { createCanvas } = require('canvas')
const canvas = createCanvas(config.image_details.width, config.image_details.height)
const ctx = canvas.getContext("2d");

// -- Create on the canvas
const createImage = async () => {
    let imageCount = 1
    let imagesFailed = 0
    let AttributesLoaded = []
    let layerNames = []
    let layersPath = ""
    let imageHashes = []

    var is1 = true

    // We need a way to break out if image_count is higher than what can be generated...

    while (imageCount <= config.image_count) { //says if current imagecount is greater than that of what was requested in config
        if (imagesFailed > 100) { break }
        d = new Date();

        // Determine Layer Path
        //iterates through
        for (var i = 0; i < config.layers.length; i++) {

            if (i>1) {
                is1 = false
            }

            // Fetch layers
            const attributes = await getAttributes(`${layersBasePath}/${config.layers[i]}/`)
            //creates an array full of dictionaries that store each element of the layer and id number starting from 0
            //console.log(layersBasePath)
            //console.log(attributes)
            
            let totalWeight = 0

            

            for (var x = 0; x < attributes.length; x++) { //iterating through each element of each layer: nested for loop
                totalWeight += rarity.layers[i].attributes[x].weight //adds up weight to get totalWeight for each layer
            }
            

            let random = Math.floor(Math.random() * totalWeight)
            let selectedLayer

            /*
            if(is1) {
                console.log("attributes")
                console.log(attributes)
            }
            */
            //chooses what image makes it
            for (var j = 0; j < attributes.length; j++) { //iterates through each attribute
                // subtract the current weight from the random weight until we reach a sub zero value.
                random -= rarity.layers[i].attributes[j].weight

                if (random < 0) { //if random < 0, 
                    selectedLayer = attributes[j].filename
                    layerNames.push(attributes[j].filename)
                    /*
                    if(is1) {
                        console.log("layerNames")
                        console.log(layerNames)
                    }
                    */
                    break
                }
            }

            // Determine layer path
            const layerPath = `${layersBasePath}/${config.layers[i]}/${selectedLayer}`
            
                //console.log("layerPath")
                //console.log(layerPath)
            
            layersPath += layerPath//adds up all paths together
            /*
            if(is1) {
                console.log("layersPath")   
                console.log(layersPath)
            }
            */

            // Load layer
            const { path, attribute } = await loadAttribute(layerPath) //loads image of layer path
            
            if(is1) {
                //console.log("attribute")
                //console.log(attribute)
            }
            
            AttributesLoaded.push(attribute)

            
            
        }


        //finished creating attributes loaded

        /*
        console.log("AttributesLoaded")
        console.log(AttributesLoaded)
        */
        //console.log(layerNames)

        const imageHash = crypto.createHash('sha1').update(layersPath).digest('hex')
        
        /*
        console.log("imageHash")
        console.log(imageHash)
        */

        let isCreated

        for (var i = 0; i < imageHashes.length; i++) { //if same hash somewhere on imageHashes, we 
            if (imageHash === imageHashes[i]) {
                console.log(`Image already created...\n`)
                imagesFailed++
                AttributesLoaded = []
                layersPath = []
                isCreated = true
            }
        }

        imageHashes.push(imageHash)
        
        /*
        console.log("imageHashes")
        console.log(imageHashes)
        */


        if (isCreated) { continue } //skips this iteration if image has already been created

        for (var i = 0; i < AttributesLoaded.length; i++) {
            //0,0 to make it centered
            ctx.drawImage(AttributesLoaded[i], 0, 0, config.image_details.width, config.image_details.height)
        }

        // Save Image & Metadata
        saveImage(imageCount)
        saveMetadata(createMetadata(imageHash, imageCount, defineAttributes(layerNames)), imageCount)

        //console.log(imageHash)
        console.log(`Created Image: ${imageCount}\n`)

        // Increment, Reset values & canvas
        imageCount++
        AttributesLoaded = []
        layerNames = []
        layersPath = ""
        ctx.clearRect(0, 0, config.image_details.width, config.image_details.height)
        
    }
    d1 = new Date();

            //console.log(totalWeight)
            console.log(d1-d)
}


//Check
// Save the image
const saveImage = (_imageCount) => {
    console.log(`Saving Image...\n`)

    fs.writeFileSync(
        `${buildBasePath}/images/${_imageCount}.png`,
        canvas.toBuffer("image/png")
    )
}



// Save the metadata
const saveMetadata = (_metadata, _imageCount) => {
    fs.writeFileSync(`${buildBasePath}/json/${_imageCount}.json`, JSON.stringify(_metadata, null, 2))
}

//Check
const main = () => {
    try {
        initialize()
        createImage()
        d1 = new Date();
    } catch (error) {
        console.log(error)
    }
}

main()



console.log(d1-d)