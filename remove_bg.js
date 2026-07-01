const { Jimp } = require('jimp');

async function removeWhiteBg() {
  try {
    const inputPath = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\326ecad7-34e0-433e-aeba-debc19a577cd\\kbc_logo_final_final_1782735587855.png';
    const outputPath = 'resources/icon.png';
    
    console.log('Loading image...');
    const image = await Jimp.read(inputPath);
    
    // Make white pixels transparent (using a distance threshold to handle anti-aliasing)
    console.log('Removing white background...');
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      const red   = this.bitmap.data[idx + 0];
      const green = this.bitmap.data[idx + 1];
      const blue  = this.bitmap.data[idx + 2];
      
      // If the pixel is very close to white
      if (red > 240 && green > 240 && blue > 240) {
        this.bitmap.data[idx + 3] = 0; // Alpha to 0
      }
    });
    
    console.log('Saving to ' + outputPath);
    await image.write(outputPath);
    console.log('Done!');
  } catch (err) {
    console.error('Error:', err);
  }
}

removeWhiteBg();
