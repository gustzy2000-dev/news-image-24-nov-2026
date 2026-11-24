// News-image entry (Node 22, standard library only).
// The entry image lives beside this file as a single line of base64
// (image.b64) and is decoded to entry.png in the output directory.
//
// Run locally with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const imagePath = new URL('./image.b64', import.meta.url);

mkdirSync(outputDir, { recursive: true });

const encoded = readFileSync(imagePath, 'utf8').replace(/\s/g, '');
const png = Buffer.from(encoded, 'base64');

// Fail fast if the stored data is not a JPEG at all
// (the file is named entry.png, but its bytes are JPEG).
const jpegMagic = Buffer.from([0xff, 0xd8, 0xff]);
if (!png.subarray(0, 3).equals(jpegMagic)) {
  throw new Error('image.b64 does not decode to a JPEG');
}

writeFileSync(join(outputDir, 'entry.png'), png);
