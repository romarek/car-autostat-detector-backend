const Jimp = require('jimp') ;

async function crop() {
   const image = await Jimp.read
   ('./image.jpg');
   image.crop(100, 50, 470, 270)
   .write('./image-crop.jpg');
}

crop();
console.log("Image is processed successfully");