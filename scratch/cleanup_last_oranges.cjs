const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');

// 1. Clean ContactPage.tsx
const contactPath = path.join(srcDir, 'pages', 'ContactPage.tsx');
let contact = fs.readFileSync(contactPath, 'utf8');
contact = contact.replace(/focus:border-\[#D98219\]/g, 'focus:border-[#1B72E8]');
contact = contact.replace(/focus:ring-amber-200\/50/g, 'focus:ring-blue-200/50');
contact = contact.replace(/focus:ring-\[#D98219\]/g, 'focus:ring-[#1B72E8]');
contact = contact.replace(/bg-\[#D98219\]\s+text-white\s+shadow-lg\s+hover:bg-\[#bd7810\]/g, 'bg-gradient-to-r from-[#1B72E8] to-[#7139E8] text-white shadow-lg hover:from-[#1557B0] hover:to-[#5B21B6]');
contact = contact.replace(/bg-\[#D98219\]\s+text-white\s+font-semibold\s+hover:bg-\[#bd7810\]/g, 'bg-gradient-to-r from-[#1B72E8] to-[#7139E8] text-white font-semibold hover:from-[#1557B0] hover:to-[#5B21B6]');
contact = contact.replace(/renderTouchIcon\(iconName\)\s*\{[^}]+\}/s, (match) => {
  return match.replace(/#d99120/g, '#1B72E8');
});
fs.writeFileSync(contactPath, contact, 'utf8');

// 2. Clean SolutionsPage.tsx
const solutionsPath = path.join(srcDir, 'pages', 'SolutionsPage.tsx');
let solutions = fs.readFileSync(solutionsPath, 'utf8');
solutions = solutions.replace(/bg-\[#D98219\]/g, 'bg-gradient-to-r from-[#1B72E8] to-[#7139E8]');
fs.writeFileSync(solutionsPath, solutions, 'utf8');

// 3. Clean src/data/contactContent.ts
const contactDataPath = path.join(srcDir, 'data', 'contactContent.ts');
let contactData = fs.readFileSync(contactDataPath, 'utf8');
contactData = contactData.replace(/text-\[#d99120\]/g, 'text-[#1B72E8]');
contactData = contactData.replace(/border-\[#d99120\]\/40 hover:border-\[#d99120\]/g, 'border-[#1B72E8]/40 hover:border-[#1B72E8]');
fs.writeFileSync(contactDataPath, contactData, 'utf8');

// 4. Clean src/data/industriesContent.ts
const industriesDataPath = path.join(srcDir, 'data', 'industriesContent.ts');
let industriesData = fs.readFileSync(industriesDataPath, 'utf8');
industriesData = industriesData.replace(/'#d99120'/g, "'#1B72E8'");
fs.writeFileSync(industriesDataPath, industriesData, 'utf8');

// 5. Clean src/data/partnersContent.ts
const partnersDataPath = path.join(srcDir, 'data', 'partnersContent.ts');
let partnersData = fs.readFileSync(partnersDataPath, 'utf8');
partnersData = partnersData.replace(/'#d99120'/g, "'#7139E8'");
fs.writeFileSync(partnersDataPath, partnersData, 'utf8');

console.log('Cleanup completed successfully!');

