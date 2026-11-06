const fs = require('fs');

let content = fs.readFileSync('src/components/layout/SiteFooter.tsx', 'utf8');
content = content.replace(/group-hover:text-\[#63C7F7\]/g, 'group-hover:text-atlas-gold');
content = content.replace(/hover:border-\[#2454E8\] hover:bg-\[#2454E8\] text-white/g, 'hover:border-atlas-gold hover:bg-atlas-gold text-white hover:text-atlas-navy');
content = content.replace(/text-\[#63C7F7\]/g, 'text-atlas-gold');
content = content.replace(/bg-\[#2454E8\] rounded-full/g, 'bg-atlas-gold rounded-full');
content = content.replace(/bg-\[#2454E8\] shrink-0/g, 'bg-atlas-gold shrink-0');
content = content.replace(/bg-\[#2454E8\] text-white flex items-center justify-center shrink-0 shadow-2xs/g, 'bg-atlas-gold text-atlas-navy flex items-center justify-center shrink-0 shadow-2xs');
content = content.replace(/hover:text-\[#63C7F7\]/g, 'hover:text-atlas-gold');

fs.writeFileSync('src/components/layout/SiteFooter.tsx', content, 'utf8');
console.log('SiteFooter updated to gold #E0A33B');

