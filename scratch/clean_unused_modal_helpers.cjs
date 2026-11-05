const fs = require('fs');
const path = require('path');

function removeLinesBetween(relPath, startPattern, endPattern, keepEnd) {
  const filePath = path.resolve(relPath);
  let content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split(/\r?\n/);
  
  let startIndex = -1;
  let endIndex = -1;
  
  for (let i = 0; i < lines.length; i++) {
    if (startIndex === -1 && startPattern.test(lines[i])) {
      startIndex = i;
    } else if (startIndex !== -1 && endPattern.test(lines[i])) {
      endIndex = keepEnd ? i : i + 1;
      break;
    }
  }

  if (startIndex !== -1 && endIndex !== -1) {
    lines.splice(startIndex, endIndex - startIndex);
    fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
    console.log(`Successfully trimmed ${relPath} (lines ${startIndex} to ${endIndex})`);
  } else {
    console.log(`Could not find matching lines in ${relPath}: startIndex=${startIndex}, endIndex=${endIndex}`);
  }
}

removeLinesBetween('src/pages/CaseStudiesPage.tsx', /const \[formData, setFormData\]/, /const renderCardIcon/, true);
removeLinesBetween('src/pages/IndustriesPage.tsx', /const \[formData, setFormData\]/, /const renderIndustryIcon/, true);
removeLinesBetween('src/pages/PartnersPage.tsx', /const \[formData, setFormData\]/, /const renderBadgeIcon/, true);
removeLinesBetween('src/pages/IndividualPartnerPage.tsx', /const \[formData, setFormData\]/, /const renderBadgeIcon/, true);
