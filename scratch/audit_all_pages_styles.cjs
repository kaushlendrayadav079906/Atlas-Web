const fs = require('fs');
const path = require('path');

const pagesDir = path.resolve(__dirname, '..', 'src', 'pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));

console.log('Auditing pages in:', pagesDir);

files.forEach(file => {
  const filePath = path.join(pagesDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  console.log(`\n=================== ${file} ===================`);

  // Check H1
  const h1Matches = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  h1Matches.forEach(m => {
    const isSerif = m.includes('font-serif');
    const isNavy = m.includes('text-[#142B59]') || m.includes('text-[#10264b]');
    const hasGeminiGradient = m.includes('from-[#1B72E8]');
    console.log(`  H1: serif=${isSerif}, navy=${isNavy}, gemini=${hasGeminiGradient}`);
    if (!isSerif || !isNavy || !hasGeminiGradient) {
      console.log('    Snippet:', m.substring(0, 150).replace(/\n/g, ' '));
    }
  });

  // Check H2
  const h2Matches = content.match(/<h2[^>]*>([\s\S]*?)<\/h2>/gi) || [];
  h2Matches.forEach((m, idx) => {
    const isSerif = m.includes('font-serif');
    const isNavy = m.includes('text-[#142B59]') || m.includes('text-[#172B50]') || m.includes('text-[#10264b]');
    const hasGeminiGradient = m.includes('from-[#1B72E8]');
    if (!isSerif || !isNavy) {
      console.log(`  H2 #${idx + 1}: serif=${isSerif}, navy=${isNavy}, gemini=${hasGeminiGradient}`);
      console.log('    Snippet:', m.substring(0, 150).replace(/\n/g, ' '));
    }
  });

  // Check for any red or orange color classes
  const nonThemeColors = content.match(/(orange|amber|#f59e0b|#d97706|#ea580c|#f97316|#ef4444|#dc2626|#b45309|#c2410c|#e11d48|#be123c|#f43f5e|#eab308|#ca8a04|text-red-|bg-red-|text-orange-|bg-orange-|text-amber-|bg-amber-|text-rose-|bg-rose-)[^"'\s`]*/gi) || [];
  const filteredColors = nonThemeColors.filter(c => !c.includes('FA4616')); // UiPath logo orange
  if (filteredColors.length > 0) {
    console.log(`  NON-THEME COLORS FOUND (${filteredColors.length}):`, [...new Set(filteredColors)].join(', '));
  } else {
    console.log('  Non-theme colors: NONE (clean!)');
  }
});

