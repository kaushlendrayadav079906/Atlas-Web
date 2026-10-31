const fs = require('fs');
const path = require('path');

const pagesDir = path.resolve(__dirname, '..', 'src', 'pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));

console.log('--- DETAILED HEADINGS & TEXT AUDIT ---');

files.forEach(file => {
  const content = fs.readFileSync(path.join(pagesDir, file), 'utf8');
  console.log(`\n📄 ${file}:`);

  // Find all h1, h2, h3
  const tags = content.match(/<(h[1-3])([^>]*)>([\s\S]*?)<\/\1>/gi) || [];
  tags.forEach(t => {
    const match = /<(h[1-3])([^>]*)>([\s\S]*?)<\/\1>/i.exec(t);
    if (!match) return;
    const tag = match[1].toLowerCase();
    const attrs = match[2];
    const innerText = match[3].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');

    const hasSerif = attrs.includes('font-serif');
    const hasNavy = attrs.includes('#142B59') || attrs.includes('#172B50') || attrs.includes('#10264b') || attrs.includes('text-heading');
    const hasGemini = t.includes('from-[#1B72E8]') || t.includes('text-highlight') || t.includes('text-gemini');

    if (tag === 'h1' || tag === 'h2') {
      console.log(`  [${tag.toUpperCase()}] "${innerText.substring(0, 50)}..." | serif: ${hasSerif} | navy: ${hasNavy} | gemini: ${hasGemini}`);
      if (!hasSerif) {
        console.warn(`    ⚠️ MISSING font-serif on ${tag}: ${attrs}`);
      }
    }
  });
});

