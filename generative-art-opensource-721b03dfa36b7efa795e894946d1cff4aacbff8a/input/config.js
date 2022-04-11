const fs = require("fs");
var inputFolders = fs.readdirSync('input');


const width = 1000;
const height = 1000;
const dir = __dirname;
const description = "This is an NFT made by the coolest generative code.";
const baseImageUri = "https://hashlips/nft";
const startEditionFrom = 1;
const editionSize = 10;

var raceWeights = [
  {
    value: "skull",
    from: 1,
    to: editionSize,
  },
];

var {
  races
} = require("./dictCreate.js");


//--------------------------------------------------------------------
/*
const races = {
  skull: {
    name: "Skull",
    layers: [
      {
        name: "Background",
        elements: [
          {
            id: 0,
            name: "LightBlue",
            path: `${dir}/1-background/LightBlue.png`,
            weight: 10,
          },
          {
            id: 1,
            name: "Orange",
            path: `${dir}/1-background/Orange.png`,
            weight: 10,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
      },
      {
        name: "Suit",
        elements: [
          {
            id: 0,
            name: "Regular",
            path: `${dir}/2-suit/Regular.png`,
            weight: 10,
          },
          {
            id: 1,
            name: "Orange",
            path: `${dir}/2-suit/Orange.png`,
            weight: 10,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
      },
      {
        name: "Shoulder",
        elements: [
          {
            id: 0,
            name: "LunaFlag",
            path: `${dir}/3-shoulder/LunaFlag.png`,
            weight: 10,
          },
          {
            id: 1,
            name: "USA",
            path: `${dir}/3-shoulder/USA.png`,
            weight: 10,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
      },
      {
        name: "Pin",
        elements: [
          {
            id: 0,
            name: "Smiley",
            path: `${dir}/4-pin/Smiley.png`,
            weight: 10,
          },
          {
            id: 1,
            name: "LunaBluePin",
            path: `${dir}/4-pin/LunaBluePin.png`,
            weight: 90,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
      },
      {
        name: "Race",
        elements: [
          {
            id: 0,
            name: "Skull",
            path: `${dir}/5-skin/Skull.png`,
            weight: 10,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
      },
      {
        name: "Facial hair",
        elements: [
          {
            id: 0,
            name: "NoFacialHair",
            path: `${dir}/6-facial-hair/NoFacialHair.png`,
            weight: 10,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
      },
      {
        name: "Mask",
        elements: [
          {
            id: 0,
            name: "NoMask",
            path: `${dir}/7-mask/NoMask.png`,
            weight: 10,
          },
          {
            id: 1,
            name: "mask",
            path: `${dir}/7-mask/mask.png`,
            weight: 10,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
      },
      {
        name: "Hair",
        elements: [
          {
            id: 0,
            name: "BlondeBun",
            path: `${dir}/8-hair/BlondeBun.png`,
            weight: 10,
          },
          {
            id: 1,
            name: "Pink",
            path: `${dir}/8-hair/Pink.png`,
            weight: 10,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
      },
      {
        name: "Accessories",
        elements: [
          {
            id: 0,
            name: "NoAcc",
            path: `${dir}/9-accessories/NoAcc.png`,
            weight: 10,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
      },
      {
        name: "Headwear",
        elements: [
          {
            id: 0,
            name: "GlassDome",
            path: `${dir}/90-headwear/GlassDome.png`,
            weight: 10,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
      },
    ],
  },
};

//--------------------------------------------------------------------


/*
const races = {
  skull: {
    name: "Skull",
    layers: [
      {
        name: "Background",
        elements: [
          {
            id: 0,
            name: "Light blue",
            path: `${dir}/1-background/LightBlue.png`,
            weight: 10,
          },
          {
            id: 1,
            name: "Orange",
            path: `${dir}/1-background/Orange.png`,
            weight: 80,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
      },
      {
        name: "Suit",
        elements: [
          {
            id: 0,
            name: "Regular",
            path: `${dir}/2-suit/Regular.png`,
            weight: 100,
          },
          {
            id: 1,
            name: "Orange",
            path: `${dir}/2-suit/Orange.png`,
            weight: 20,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
      },
      {
        name: "Shoulder",
        elements: [
          {
            id: 0,
            name: "LunaFlag",
            path: `${dir}/3-shoulder/LunaFlag.png`,
            weight: 100,
          },
          {
            id: 1,
            name: "USA",
            path: `${dir}/3-shoulder/USA.png`,
            weight: 90,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
      },
      {
        name: "Pin",
        elements: [
          {
            id: 0,
            name: "Smiley",
            path: `${dir}/4-pin/Smiley.png`,
            weight: 100,
          },
          {
            id: 1,
            name: "LunaBluePin",
            path: `${dir}/4-pin/LunaBluePin.png`,
            weight: 90,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
      },
      {
        name: "Race",
        elements: [
          {
            id: 0,
            name: "Skull",
            path: `${dir}/5-skin/Skull.png`,
            weight: 100,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
      },
      {
        name: "Facial hair",
        elements: [
          {
            id: 0,
            name: "No facial hair",
            path: `${dir}/6-facial-hair/NoFacialHair.png`,
            weight: 100,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
      },
      {
        name: "Mask",
        elements: [
          {
            id: 0,
            name: "No mask",
            path: `${dir}/7-mask/NoMask.png`,
            weight: 100,
          },
          {
            id: 1,
            name: "Medical",
            path: `${dir}/7-mask/mask.png`,
            weight: 5,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
      },
      {
        name: "Hair",
        elements: [
          {
            id: 0,
            name: "Blonde bun",
            path: `${dir}/8-hair/BlondeBun.png`,
            weight: 100,
          },
          {
            id: 1,
            name: "Pink",
            path: `${dir}/8-hair/Pink.png`,
            weight: 91,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
      },
      {
        name: "Accessories",
        elements: [
          {
            id: 0,
            name: "No accessories",
            path: `${dir}/9-accessories/NoAcc.png`,
            weight: 100,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
      },
      {
        name: "Headwear",
        elements: [
          {
            id: 0,
            name: "Glass dome",
            path: `${dir}/10-headwear/GlassDome.png`,
            weight: 100,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
      },
    ],
  },
};
*/

//const races1 = finalDict
console.log(races)
//console.log(races1)
console.log(typeof races)
console.log(typeof races1)

//console.log('--------------------------')
//console.log(races['skull'])
//console.log(races1['skull'])
//console.log('--------------------------')


/*
for(i=0;i<10;i++){
  console.log(races['skull']['layers'][i])
  console.log(races1['skull']['layers'][i])
}
console.log('--------------------------')
console.log('--------------------------')
console.log('--------------------------')
console.log('--------------------------')
for(i=0;i<10;i++){
  console.log(races1['skull']['layers'][i])
}
*/



module.exports = {
  width,
  height,
  description,
  baseImageUri,
  editionSize,
  startEditionFrom,
  races,
  raceWeights,
};
