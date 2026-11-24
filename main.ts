// News-image entry (Node 22, standard library only): the image is stored as base64
// in image.b64 beside this file, and the program decodes it to /output/entry.png.
// The image is a 1024x1024 JPEG of 24 November 2026 world news, 391 KB, under the 1 MiB gate.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(OUTPUT_DIR, { recursive: true });
const b64 = readFileSync(new URL('./image.b64', import.meta.url), 'utf8');
writeFileSync(join(OUTPUT_DIR, 'entry.png'), Buffer.from(b64.replace(/\s/g, ''), 'base64'));
