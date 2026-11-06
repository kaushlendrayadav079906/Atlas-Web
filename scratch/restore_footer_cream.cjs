const fs = require('fs');

let content = fs.readFileSync('src/components/layout/SiteFooter.tsx', 'utf8');

content = content.replace(/bg-\[#0A1B4F\] text-white/g, 'atlas-cream text-white');
content = content.replace(/bg-\[#071340\] py-5 text-white/g, 'atlas-cream atlas-cream-deep py-5 text-white');

fs.writeFileSync('src/components/layout/SiteFooter.tsx', content, 'utf8');
console.log('SiteFooter background restored to atlas-cream');

