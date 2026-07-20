const fs = require('fs');
const path = require('path');

// Using native Node.js with sharp if available, otherwise with a canvas approach
try {
  const Sharp = require('sharp');
  
  Sharp('c:/Users/TFC/Desktop/ATLAS/public/images/logo/atlas-logo.png')
    .removeAlpha()
    .toFormat('png')
    .toBuffer()
    .then(data => {
      // Now read it back and add alpha channel
      return Sharp(data)
        .ensureAlpha()
        .composite([
          {
            input: Buffer.from(
              '<svg><rect fill="transparent" width="100%" height="100%"/></svg>'
            ),
            blend: 'dest-in'
          }
        ])
        .toFile('c:/Users/TFC/Desktop/ATLAS/public/images/logo/atlas-logo.png');
    })
    .then(() => {
      console.log('BACKGROUND_REMOVED');
      process.exit(0);
    })
    .catch(err => {
      console.error('Sharp not available, trying alternative method');
      removeBlackBackgroundManual();
    });
} catch (e) {
  removeBlackBackgroundManual();
}

function removeBlackBackgroundManual() {
  try {
    const PNG = require('pngjs').PNG;
    const fs = require('fs');
    
    fs.createReadStream('c:/Users/TFC/Desktop/ATLAS/public/images/logo/atlas-logo.png')
      .pipe(new PNG())
      .on('parsed', function() {
        for (let y = 0; y < this.height; y++) {
          for (let x = 0; x < this.width; x++) {
            const idx = (this.width * y + x) << 2;
            const r = this.data[idx];
            const g = this.data[idx + 1];
            const b = this.data[idx + 2];
            
            // If pixel is very dark (black), make it transparent
            if (r < 50 && g < 50 && b < 50) {
              this.data[idx + 3] = 0; // Set alpha to 0
            }
          }
        }
        
        this.pack().pipe(
          fs.createWriteStream('c:/Users/TFC/Desktop/ATLAS/public/images/logo/atlas-logo.png')
        ).on('finish', () => {
          console.log('BACKGROUND_REMOVED');
          process.exit(0);
        });
      });
  } catch (err) {
    console.log('ImageMagick approach needed');
    process.exit(1);
  }
}
