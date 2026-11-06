const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDir(fullPath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let original = content;

      content = content.replace(/from-\[#1F4FE0\] via-\[#1F4FE0\] to-\[#1F4FE0\]/g, 'from-[#E0A33B] via-[#E0A33B] to-[#E0A33B]');
      content = content.replace(/from-\[#1F4FE0\] to-\[#1F4FE0\]/g, 'from-[#E0A33B] to-[#E0A33B]');
      content = content.replace(/text-\[#1F4FE0\]/g, 'text-[#E0A33B]');
      content = content.replace(/hover:text-\[#1F4FE0\]/g, 'hover:text-[#E0A33B]');
      content = content.replace(/group-hover:text-\[#1F4FE0\]/g, 'group-hover:text-[#E0A33B]');
      content = content.replace(/text-blue-600/g, 'text-[#E0A33B]');
      content = content.replace(/hover:text-blue-600/g, 'hover:text-[#E0A33B]');
      content = content.replace(/group-hover:text-blue-600/g, 'group-hover:text-[#E0A33B]');

      if (content !== original) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated text color in: ${fullPath}`);
      }
    }
  }
}

processDir(path.resolve('src/pages'));
processDir(path.resolve('src/components'));

console.log('All blue text colors successfully converted to #E0A33B!');

