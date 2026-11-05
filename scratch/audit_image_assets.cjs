const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../src/data');
const publicDir = path.join(__dirname, '../public');

const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.ts'));
const imageRegex = /['"](\/(?:images|assets)\/[^'"]+\.(?:jpg|png|webp|svg|jpeg))['"]/g;

let missing = [];
let total = 0;

for (const f of files) {
  const content = fs.readFileSync(path.join(dataDir, f), 'utf-8');
  let match;
  while ((match = imageRegex.exec(content)) !== null) {
    total++;
    const imgRel = match[1].replace(/^\//, '');
    const imgPath = path.join(publicDir, imgRel);
    if (!fs.existsSync(imgPath)) {
      missing.push({ file: f, image: match[1] });
    }
  }
}

console.log('Total image references scanned:', total);
console.log('Missing images count:', missing.length);
if (missing.length > 0) {
  console.log('Missing images details:');
  missing.forEach(m => console.log(`  - In ${m.file}: ${m.image}`));
} else {
  console.log('✓ All image references exist in public/ folder!');
}

