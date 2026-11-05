const fs = require('fs');

const path = 'src/data/solutionsContent.ts';
let content = fs.readFileSync(path, 'utf8');

// Replace Beas, Produmex, and B1UP linkHref
content = content.replace(
  /id:\s*"beas"[\s\S]*?linkHref:\s*"#contact-cta"/,
  (match) => match.replace('"#contact-cta"', '"/solutions/manufacturing"')
);

content = content.replace(
  /id:\s*"produmex"[\s\S]*?linkHref:\s*"#contact-cta"/,
  (match) => match.replace('"#contact-cta"', '"/solutions/warehouse-management"')
);

content = content.replace(
  /id:\s*"b1up"[\s\S]*?linkHref:\s*"#contact-cta"/,
  (match) => match.replace('"#contact-cta"', '"/solutions/boyum-it"')
);

// In overview cards, update atlas-addons link to /solutions/atlas-addons
content = content.replace(
  /id:\s*"atlas-addons"[\s\S]*?linkHref:\s*"#atlas-addons-section"/,
  (match) => match.replace('"#atlas-addons-section"', '"/solutions/atlas-addons"')
);

fs.writeFileSync(path, content, 'utf8');
console.log('Updated solutionsContent.ts');

