const fs = require('fs');

let content = fs.readFileSync('src/pages/ContactPage.tsx', 'utf8');

content = content.replace(/bg-\[#2454E8\] hover:bg-\[#1b43be\] text-white shadow-\[0_4px_14px_rgba\(36,84,232,0\.35\)\]/g, 'bg-atlas-gold hover:bg-[#D4972F] text-atlas-navy shadow-[0_4px_14px_rgba(224,163,59,0.35)]');
content = content.replace(/text-\[#2454E8\]/g, 'text-atlas-goldDeep');
content = content.replace(/hover:border-\[#2454E8\]/g, 'hover:border-atlas-gold');
content = content.replace(/group-hover:text-\[#2454E8\]/g, 'group-hover:text-atlas-goldDeep');
content = content.replace(/bg-\[#EAF2FF\] text-atlas-goldDeep flex items-center justify-center border border-blue-200\/60/g, 'bg-amber-50 text-atlas-goldDeep flex items-center justify-center border border-amber-200/60');
content = content.replace(/border border-blue-200 bg-\[#EAF2FF\] hover:bg-\[#2454E8\] hover:text-white text-atlas-goldDeep/g, 'border border-atlas-creamBorder bg-atlas-goldTint hover:bg-atlas-gold hover:text-atlas-navy text-atlas-navy');
content = content.replace(/hover:bg-blue-50 text-\[#1F4FE0\] border border-blue-300/g, 'hover:bg-amber-50 text-atlas-goldDeep border border-amber-300');

fs.writeFileSync('src/pages/ContactPage.tsx', content, 'utf8');
console.log('ContactPage updated to gold #E0A33B');

