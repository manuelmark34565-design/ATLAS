const sharp = require('sharp');
const fs = require('fs');

async function removeBlackBg() {
  const inputPath = 'c:/Users/TFC/Desktop/ATLAS/public/images/logo/atlas-logo.png';
  const outputPath = 'c:/Users/TFC/Desktop/ATLAS/public/images/logo/atlas-logo.png';

  try {
    // Read image and get raw data
    const image = sharp(inputPath);
    const { data, info } = await image
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    // Process each pixel
    for (let i = 0; i < data.length; i += info.channels) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      let a = data[i + 3];

      // If pixel is pure black or very close to black, make it transparent
      if (r < 20 && g < 20 && b < 20) {
        data[i + 3] = 0; // Make alpha fully transparent
      } else {
        data[i + 3] = 255; // Keep everything else opaque
      }
    }

    // Create new image with processed data and save
    await sharp(data, {
      raw: {
        width: info.width,
        height: info.height,
        channels: info.channels,
      }
    })
      .png({ quality: 100, compressionLevel: 9 })
      .toFile(outputPath);

    console.log('✓ Background removed! Logo is now transparent');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

removeBlackBg();
