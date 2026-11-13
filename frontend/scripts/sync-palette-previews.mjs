import fs from 'fs';
import path from 'path';
import { buildCyberneticHtml } from './palette-templates-extra.mjs';

const previews = [
  {
    file: 'palette-8.html',
    key: 'midnight-electric',
    title: 'Fluxera — Cybernetic Runtime | Midnight Black & Electric Blue',
    themeColor: '#02070A',
    build: buildCyberneticHtml,
  },
];

for (const p of previews) {
  const out = p.build(p);
  fs.writeFileSync(path.resolve(p.file), out, 'utf8');
}

console.log(`Synced ${previews.length} showcase entry file (palette-8.html).`);
