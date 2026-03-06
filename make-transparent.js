import sharp from 'sharp';

async function makeTransparent() {
  try {
    const input = '/Users/sam/projects/hidden-hills-llc/src/assets/logo-bw.png';
    const output = '/Users/sam/projects/hidden-hills-llc/src/assets/logo-transparent.png';
    
    // We want to make the white background transparent.
    // Sharp doesn't have a direct 'make color transparent' but we can use bitmask or simpler:
    // Since it's a black and white logo, we can use the image itself as an alpha channel
    // or just use the 'transparent' color replacement if we were using a different tool.
    // With Sharp, the most robust way for B&W is to treat the lightness as the alpha.
    
    await sharp(input)
      .ensureAlpha()
      .extractChannel('red') // Extract any channel since it's B&W
      .negate() // Invert so white (255) becomes 0 (transparent) and black (0) becomes 255 (opaque)
      .toBuffer()
      .then(async (alphaBuffer) => {
        await sharp(input)
          .joinChannel(alphaBuffer)
          .toFile(output);
      });
      
    console.log('Transparent logo created at:', output);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

makeTransparent();
