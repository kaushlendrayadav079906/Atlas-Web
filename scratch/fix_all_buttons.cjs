const fs = require('fs');
const path = require('path');

const pages = [
  'AboutPage.tsx',
  'SolutionsPage.tsx',
  'IndustriesPage.tsx',
  'CaseStudiesPage.tsx',
  'PartnersPage.tsx',
  'ContactPage.tsx',
  'HomePage.tsx'
];

pages.forEach(file => {
  const filePath = path.join(__dirname, '..', 'src', 'pages', file);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace primary button blue styling
  content = content.replace(/bg\[#0878f9\]\s+hover:bg-blue-700/g, 'bg-[#D98219] hover:bg-[#bd7810]');
  content = content.replace(/shadow-blue-600\/(20|25)/g, 'shadow-[#D98219]/25');
  
  // Also check for standalone bg-[#0878f9] in buttons
  content = content.replace(/bg\[#0878f9\]\s+text-white\s+font-semibold\s+hover:bg-blue-700/g, 'bg-[#D98219] text-white font-semibold hover:bg-[#bd7810]');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated buttons in ${file}`);
});

