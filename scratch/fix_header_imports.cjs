const fs = require('fs');
const path = require('path');

const p = path.resolve('src/components/layout/SiteHeader.tsx');
let c = fs.readFileSync(p, 'utf8');
c = c.replace(/Linkedin\s*\}/, 'Linkedin,\n  BookOpen,\n  FileText,\n  HelpCircle\n}');
fs.writeFileSync(p, c, 'utf8');
console.log('Fixed SiteHeader.tsx correctly');
