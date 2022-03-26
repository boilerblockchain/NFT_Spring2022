//Define Paths
const base = process.cwd()
const buildBasePath = path.join(base,"/build")
const layersBasePath = path.join(base,"/layers")

//Defining canvas
const { createCanvas } = require('canvas')
const canvas = createCanvas(config.image_details.width, config.image_details.height)
const ctx = canvas.getContext("2d");



//Saving image
const saveImage = (_imageCount) => {
    console.log("Saving Image...")
    FileSystem.writeFileSync(
        `${buildBasePath}/images/${_imageCount}.png`,
        canvas.toBuffer("image/png")
    )
    console.log("Saved!")
}