const fs = require('fs');
const content = fs.readFileSync('src/pages/CaseStudiesPage.tsx', 'utf8');
const lines = content.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('<h1') || line.includes('<h2') || line.includes('<SectionHeading')) {
    console.log(`L${idx+1}: ${line.trim()}`);
    if (lines[idx+1]) console.log(`   +1: ${lines[idx+1].trim()}`);
    if (lines[idx+2]) console.log(`   +2: ${lines[idx+2].trim()}`);
  }
});

