import { Jimp } from "jimp";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function cropLogo() {
  try {
    const inputPath = path.join(__dirname, "src", "assets", "invenger logo.jpg");
    const outputPath = path.join(__dirname, "public", "invenger-logo-icon.jpg");

    // Read the image
    const image = await Jimp.read(inputPath);
    
    // The image size is e.g. 500x120. 
    // The icon is on the left. The height is the limiting factor. Let's make it a square crop.
    const height = image.bitmap.height;
    const cropWidth = height; // Square crop
    
    // Crop: x, y, w, h
    image.crop( {x: 0, y: 0, w: cropWidth, h: height } );
    
    // Resize to standard favicon sizes could be good, but just cropping is enough since browsers support any size.
    await image.write(outputPath);
    console.log("Successfully cropped logo to", cropWidth, "x", height);
  } catch (error) {
    console.error("Error cropping image:", error);
  }
}

cropLogo();
