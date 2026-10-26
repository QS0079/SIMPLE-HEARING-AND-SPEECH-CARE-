const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function run() {
  const publicDir = path.join(__dirname, '..', 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const inputPath = path.join(__dirname, '..', 'logo_downloaded.png');
  if (!fs.existsSync(inputPath)) {
    console.error('Input file not found:', inputPath);
    return;
  }

  // Artwork bounds without the 5px border frame
  const minX = Math.max(0, 352 - 35);
  const minY = Math.max(0, 792 - 35);
  const maxX = Math.min(8405, 8040 + 35);
  const maxY = Math.min(6005, 5212 + 35);
  const cropW = maxX - minX;
  const cropH = maxY - minY;

  // 1800px width for retina clarity
  const { data, info } = await sharp(inputPath)
    .extract({ left: minX, top: minY, width: cropW, height: cropH })
    .resize(1800)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const darkBuf = Buffer.alloc(info.width * info.height * 4);
  const lightBuf = Buffer.alloc(info.width * info.height * 4);

  // Exact brand colors
  const GOLD_R = 245;
  const GOLD_G = 191;
  const GOLD_B = 3;

  const DARK_R = 24;
  const DARK_G = 33;
  const DARK_B = 46;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const dr = 255 - r;
    const dg = 255 - g;
    const db = 255 - b;
    const maxDiff = Math.max(dr, dg, db);

    if (maxDiff <= 3) {
      // Background white -> fully transparent
      continue;
    }

    // Determine if gold or dark element
    // Gold elements: high R, medium-to-high G, distinctly low B compared to R and G.
    const isGold = (r > 160 && g > 110 && (r - b > 80));

    let alpha = 0;
    if (isGold) {
      // In gold, B is the distinguishing channel (B ~ 3 in pure gold, B = 255 in white)
      const bDiff = 255 - b;
      alpha = Math.min(255, Math.max(0, Math.round((bDiff / 248) * 255)));
      if (alpha > 0 && alpha < 30) alpha = 0; // trim distant fringe

      // Dark logo receives brand gold
      darkBuf[i] = GOLD_R;
      darkBuf[i + 1] = GOLD_G;
      darkBuf[i + 2] = GOLD_B;
      darkBuf[i + 3] = alpha;

      // Light logo receives brand gold
      lightBuf[i] = GOLD_R;
      lightBuf[i + 1] = GOLD_G;
      lightBuf[i + 2] = GOLD_B;
      lightBuf[i + 3] = alpha;
    } else {
      // Dark element (silhouette, sound line, typography)
      // Average brightness diff from white
      const avgBrightness = (r + g + b) / 3;
      const darkness = 255 - avgBrightness;
      // In dark elements: darkness is ~225. In white: 0.
      alpha = Math.min(255, Math.max(0, Math.round((darkness / 225) * 255)));
      if (alpha > 0 && alpha < 20) alpha = 0; // trim distant background noise

      // Dark logo receives brand dark charcoal navy
      darkBuf[i] = DARK_R;
      darkBuf[i + 1] = DARK_G;
      darkBuf[i + 2] = DARK_B;
      darkBuf[i + 3] = alpha;

      // Light logo receives crisp pure white
      lightBuf[i] = 255;
      lightBuf[i + 1] = 255;
      lightBuf[i + 2] = 255;
      lightBuf[i + 3] = alpha;
    }
  }

  const darkOut = path.join(publicDir, 'logo.png');
  const lightOut = path.join(publicDir, 'logo-light.png');

  await sharp(darkBuf, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(darkOut);

  await sharp(lightBuf, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(lightOut);

  // Also create a small icon / mark (just the head with ear and speech waves)
  // Let's create an icon for favicon / mobile if needed
  console.log('Successfully generated:');
  console.log(' -', darkOut, '(' + info.width + 'x' + info.height + ')');
  console.log(' -', lightOut, '(' + info.width + 'x' + info.height + ')');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
