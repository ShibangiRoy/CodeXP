import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, "../public");

async function generate() {
  const iconSvg = fs.readFileSync(path.join(publicDir, "icon.svg"));
  const maskableSvg = fs.readFileSync(path.join(publicDir, "icon-maskable.svg"));

  // 1. 192x192 PNG
  await sharp(iconSvg)
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, "pwa-192x192.png"));
  console.log("Generated pwa-192x192.png");

  // 2. 512x512 PNG
  await sharp(iconSvg)
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, "pwa-512x512.png"));
  console.log("Generated pwa-512x512.png");

  // 3. 512x512 Maskable PNG
  await sharp(maskableSvg)
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, "pwa-maskable-512x512.png"));
  console.log("Generated pwa-maskable-512x512.png");

  // 4. Apple Touch Icon 180x180
  await sharp(iconSvg)
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, "apple-touch-icon.png"));
  console.log("Generated apple-touch-icon.png");

  // 5. Favicon PNG 32x32
  await sharp(iconSvg)
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, "favicon-32x32.png"));
  console.log("Generated favicon-32x32.png");

  console.log("All PWA Android icons successfully generated!");
}

generate().catch((err) => {
  console.error("Icon generation error:", err);
  process.exit(1);
});
