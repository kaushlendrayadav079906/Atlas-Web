const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.css') || file.endsWith('.json') || file.endsWith('.js')) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = walk('src');
const patterns = [
  /orange/i,
  /amber/i,
  /#d98219/i,
  /#c77a17/i,
  /#f28a24/i,
  /#ed861d/i,
  /#ea580c/i,
  /#ff9b27/i,
  /#f97316/i,
  /#fb923c/i,
  /#f59e0b/i,
  /#d97706/i,
  /#b45309/i,
  /#f08a24/i,
  /#fdba74/i,
  /#fed7aa/i,
  /#ffedd5/i,
  /#fff7ed/i,
];

let matchCount = 0;
files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    for (const pat of patterns) {
      if (pat.test(line)) {
        console.log(`${file}:${idx + 1}: ${line.trim()}`);
        matchCount++;
        break;
      }
    }
  });
});
console.log(`\nTotal matches found: ${matchCount}`);

