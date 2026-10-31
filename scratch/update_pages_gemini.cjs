const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');
const pagesDir = path.join(srcDir, 'pages');

const pageFiles = [
  'HomePage.tsx',
  'AboutPage.tsx',
  'SolutionsPage.tsx',
  'IndustriesPage.tsx',
  'CaseStudiesPage.tsx',
  'PartnersPage.tsx',
  'ContactPage.tsx'
];

pageFiles.forEach(file => {
  const filePath = path.join(pagesDir, file);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Replace eyebrow labels: #C77A17, #d99120 to Gemini Blue #1B72E8
  content = content.replace(/text-\[#C77A17\]/g, 'text-[#1B72E8]');
  
  // 2. Replace highlight words in headings: #D98219, #d99120, #7139e8 with Gemini Gradient
  content = content.replace(
    /<span className="text-\[#D98219\]">([^<]+)<\/span>/g,
    '<span className="bg-gradient-to-r from-[#1B72E8] via-[#7139E8] to-[#9B72CF] bg-clip-text text-transparent">$1</span>'
  );
  content = content.replace(
    /<span className="text-\[#d99120\]">([^<]+)<\/span>/g,
    '<span className="bg-gradient-to-r from-[#1B72E8] via-[#7139E8] to-[#9B72CF] bg-clip-text text-transparent">$1</span>'
  );
  content = content.replace(
    /<span className="text-\[#7139e8\]">([^<]+)<\/span>/g,
    '<span className="bg-gradient-to-r from-[#1B72E8] via-[#7139E8] to-[#9B72CF] bg-clip-text text-transparent">$1</span>'
  );

  // 3. Replace Primary button classes from orange to Gemini gradient button
  content = content.replace(
    /bg-\[#D98219\]\s+hover:bg-\[#bd7810\]/g,
    'bg-gradient-to-r from-[#1B72E8] to-[#7139E8] hover:from-[#1557B0] hover:to-[#5B21B6]'
  );
  content = content.replace(
    /bg-\[#d99120\]\s+hover:bg-\[#bd7810\]/g,
    'bg-gradient-to-r from-[#1B72E8] to-[#7139E8] hover:from-[#1557B0] hover:to-[#5B21B6]'
  );
  content = content.replace(
    /shadow-\[#D98219\]\/(20|25)/g,
    'shadow-blue-500/25'
  );
  content = content.replace(
    /shadow-amber-600\/(20|25)/g,
    'shadow-blue-500/25'
  );

  // 4. Replace hover / group-hover text colors
  content = content.replace(/hover:text-\[#D98219\]/g, 'hover:text-[#1B72E8]');
  content = content.replace(/hover:text-\[#d99120\]/g, 'hover:text-[#1B72E8]');
  content = content.replace(/hover:text-\[#bd7810\]/g, 'hover:text-[#1557B0]');
  content = content.replace(/group-hover:text-\[#D98219\]/g, 'group-hover:text-[#1B72E8]');
  content = content.replace(/group-hover:text-\[#d99120\]/g, 'group-hover:text-[#1B72E8]');

  // 5. Replace any remaining highlight or accent tokens
  content = content.replace(/text-\[#D98219\]/g, 'text-[#1B72E8]');
  content = content.replace(/text-\[#d99120\]/g, 'text-[#1B72E8]');
  content = content.replace(/text-\[#ed861d\]/g, 'text-[#1B72E8]');
  content = content.replace(/stroke="#d99120"/g, 'stroke="#7139E8"');
  content = content.replace(/bg-\[#d99120\]/g, 'bg-gradient-to-r from-[#1B72E8] to-[#7139E8]');

  // 6. Contact page specific touch & location card borders/accents
  content = content.replace(/border-\[#f6d396\]/g, 'border-[#c7d9fe]');
  content = content.replace(/bg-\[#fffdf7\]/g, 'bg-[#f8faff]');
  content = content.replace(/bg-amber-50\/30/g, 'bg-blue-50/40');
  content = content.replace(/border-\[#D98219\]\/40/g, 'border-[#1B72E8]/40');
  content = content.replace(/hover:border-\[#D98219\]/g, 'hover:border-[#1B72E8]');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated Gemini colors on ${file}`);
});

