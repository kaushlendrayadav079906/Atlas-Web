const fs = require('fs');

let c = fs.readFileSync('src/pages/HomePage.tsx', 'utf8');

c = c.replace(
  /import { LogoMarquee } from '\.\.\/components\/ui\/LogoMarquee';\r?\nimport { ClientLogoMarquee } from '\.\.\/components\/ui\/ClientLogoMarquee';/,
  "import { LogoMarquee, ClientLogoMarquee } from '../components/ui/LogoMarquee';"
);

fs.writeFileSync('src/pages/HomePage.tsx', c, 'utf8');
console.log('HomePage import fixed.');

