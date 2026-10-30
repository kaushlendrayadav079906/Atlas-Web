const fs = require('fs');

for (const p of ['AboutPage', 'HomePage', 'ContactPage']) {
  const content = fs.readFileSync(`src/pages/${p}.tsx`, 'utf8');
  console.log(`=== ${p} ===`);
  const secRegex = /<section([^>]*)>/g;
  let match;
  let i = 1;
  while ((match = secRegex.exec(content)) !== null) {
    const s = match[1];
    const idMatch = s.match(/id="([^"]+)"/);
    const clsMatch = s.match(/className="([^"]+)"/);
    const id = idMatch ? idMatch[1] : `sec-${i}`;
    const cls = clsMatch ? clsMatch[1] : '';
    const bgs = cls.split(/\s+/).filter(c => c.includes('bg-') || c.includes('gradient'));
    console.log(`  ${id.padEnd(20)}: ${bgs.join(' ') || 'NONE'}`);
    i++;
  }
}

