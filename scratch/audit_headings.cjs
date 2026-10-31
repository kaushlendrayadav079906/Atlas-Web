const fs = require('fs');
const path = require('path');

const pages = [
  'src/pages/HomePage.tsx',
  'src/pages/AboutPage.tsx',
  'src/pages/SolutionsPage.tsx',
  'src/pages/IndustriesPage.tsx',
  'src/pages/CaseStudiesPage.tsx',
  'src/pages/PartnersPage.tsx',
  'src/pages/ContactPage.tsx'
];

pages.forEach(page => {
  const content = fs.readFileSync(page, 'utf8');
  console.log(`\n=== ${page} ===`);
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    if (line.includes('<SectionHeading') || (line.includes('title=') && lines[idx-1] && lines[idx-1].includes('SectionHeading')) || line.includes('titleHighlight')) {
      console.log(`L${idx+1}: ${line.trim()}`);
    }
    // Also look for h1, h2, h3 tags to see how they are styled
    if (line.includes('<h1') || line.includes('<h2') || line.includes('<h3')) {
      console.log(`H-TAG L${idx+1}: ${line.trim()}`);
    }
  });
});

