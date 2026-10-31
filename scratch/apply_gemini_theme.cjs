const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');

// ============================================================================
// 1. Update src/styles/index.css
// ============================================================================
const indexCssPath = path.join(srcDir, 'styles', 'index.css');
let indexCss = fs.readFileSync(indexCssPath, 'utf8');

indexCss = indexCss.replace(
  /--color-highlight:\s*#[a-fA-F0-9]+;/,
  '--color-highlight: #7139E8;'
);
indexCss = indexCss.replace(
  /--color-label:\s*#[a-fA-F0-9]+;/,
  '--color-label: #1B72E8;'
);

const geminiVars = `  --gemini-blue: #1B72E8;
  --gemini-purple: #7139E8;
  --gemini-lavender: #9B72CF;
  --gemini-gradient: linear-gradient(135deg, #1B72E8 0%, #7139E8 55%, #9B72CF 100%);
`;

if (!indexCss.includes('--gemini-blue')) {
  indexCss = indexCss.replace(
    /--font-body:[^;]+;\s*/,
    `$&${geminiVars}`
  );
}

// Update .text-highlight utility
indexCss = indexCss.replace(
  /\.text-highlight\s*\{[^}]*\}/,
  `.text-highlight {\n    background: linear-gradient(135deg, #1B72E8 0%, #7139E8 60%, #9B72CF 100%);\n    -webkit-background-clip: text;\n    -webkit-text-fill-color: transparent;\n    display: inline-block;\n  }`
);

if (!indexCss.includes('.text-gemini')) {
  indexCss = indexCss.replace(
    /\.text-highlight\s*\{[^}]*\}/,
    `$&\n  .text-gemini {\n    background: linear-gradient(135deg, #1B72E8 0%, #7139E8 60%, #9B72CF 100%);\n    -webkit-background-clip: text;\n    -webkit-text-fill-color: transparent;\n    display: inline-block;\n  }\n  .bg-gemini {\n    background: linear-gradient(135deg, #1B72E8 0%, #7139E8 100%);\n  }`
  );
}

fs.writeFileSync(indexCssPath, indexCss, 'utf8');
console.log('Updated index.css');

// ============================================================================
// 2. Update tailwind.config.js
// ============================================================================
const tailwindPath = path.join(__dirname, '..', 'tailwind.config.js');
let tailwindConfig = fs.readFileSync(tailwindPath, 'utf8');

tailwindConfig = tailwindConfig.replace(
  /highlight:\s*['"]#[a-fA-F0-9]+['"]/,
  "highlight: '#7139E8'"
);
tailwindConfig = tailwindConfig.replace(
  /label:\s*['"]#[a-fA-F0-9]+['"]/,
  "label: '#1B72E8'"
);
tailwindConfig = tailwindConfig.replace(
  /orange:\s*['"]#[a-fA-F0-9]+['"]/,
  "gemini: '#7139E8', geminiBlue: '#1B72E8', geminiPurple: '#7139E8', geminiLavender: '#9B72CF'"
);

fs.writeFileSync(tailwindPath, tailwindConfig, 'utf8');
console.log('Updated tailwind.config.js');

// ============================================================================
// 3. Update Button.tsx
// ============================================================================
const buttonPath = path.join(srcDir, 'components', 'ui', 'Button.tsx');
let buttonContent = fs.readFileSync(buttonPath, 'utf8');

buttonContent = buttonContent.replace(
  /primary:\s*"[^"]+"/,
  'primary: "bg-gradient-to-r from-[#1B72E8] to-[#7139E8] hover:from-[#1557B0] hover:to-[#5B21B6] text-white focus-visible:ring-[#1B72E8] focus-visible:ring-offset-white shadow-md shadow-blue-500/25"'
);
buttonContent = buttonContent.replace(
  /gold:\s*"[^"]+"/,
  'gold: "bg-gradient-to-r from-[#1B72E8] to-[#7139E8] hover:from-[#1557B0] hover:to-[#5B21B6] text-white font-semibold shadow-md shadow-blue-500/25"'
);
buttonContent = buttonContent.replace(
  /outline:\s*"[^"]+"/,
  'outline: "bg-transparent text-[#1B72E8] hover:bg-blue-50 border border-[#1B72E8] focus-visible:ring-[#1B72E8] focus-visible:ring-offset-white"'
);

fs.writeFileSync(buttonPath, buttonContent, 'utf8');
console.log('Updated Button.tsx');

// ============================================================================
// 4. Update SectionHeading.tsx
// ============================================================================
const sectionHeadingPath = path.join(srcDir, 'components', 'ui', 'SectionHeading.tsx');
let sectionHeading = fs.readFileSync(sectionHeadingPath, 'utf8');

sectionHeading = sectionHeading.replace(
  /text-\[#C77A17\]/g,
  'text-[#1B72E8]'
);
sectionHeading = sectionHeading.replace(
  /<span className="text-\[#D98219\]">\{titleHighlight\}<\/span>/g,
  '<span className="bg-gradient-to-r from-[#1B72E8] via-[#7139E8] to-[#9B72CF] bg-clip-text text-transparent">{titleHighlight}</span>'
);

fs.writeFileSync(sectionHeadingPath, sectionHeading, 'utf8');
console.log('Updated SectionHeading.tsx');

// ============================================================================
// 5. Update SiteHeader.tsx
// ============================================================================
const siteHeaderPath = path.join(srcDir, 'components', 'layout', 'SiteHeader.tsx');
let headerContent = fs.readFileSync(siteHeaderPath, 'utf8');

headerContent = headerContent.replace(
  /text-\[#D98219\]/g,
  'text-[#1B72E8]'
);
headerContent = headerContent.replace(
  /bg-\[#D98219\]/g,
  'bg-gradient-to-r from-[#1B72E8] to-[#7139E8]'
);
headerContent = headerContent.replace(
  /hover:bg-\[#bd7810\]/g,
  'hover:from-[#1557B0] hover:to-[#5B21B6]'
);
headerContent = headerContent.replace(
  /group-hover:text-\[#d99120\]/g,
  'group-hover:text-[#1B72E8]'
);

fs.writeFileSync(siteHeaderPath, headerContent, 'utf8');
console.log('Updated SiteHeader.tsx');

// ============================================================================
// 6. Update SolutionCard.tsx & IndustryCard.tsx
// ============================================================================
const solutionCardPath = path.join(srcDir, 'components', 'ui', 'SolutionCard.tsx');
if (fs.existsSync(solutionCardPath)) {
  let sc = fs.readFileSync(solutionCardPath, 'utf8');
  sc = sc.replace(/text-\[#D98219\]/g, 'text-[#1B72E8]');
  sc = sc.replace(/hover:text-\[#D98219\]/g, 'hover:text-[#1B72E8]');
  sc = sc.replace(/group-hover:text-\[#D98219\]/g, 'group-hover:text-[#1B72E8]');
  fs.writeFileSync(solutionCardPath, sc, 'utf8');
  console.log('Updated SolutionCard.tsx');
}

const industryCardPath = path.join(srcDir, 'components', 'ui', 'IndustryCard.tsx');
if (fs.existsSync(industryCardPath)) {
  let ic = fs.readFileSync(industryCardPath, 'utf8');
  ic = ic.replace(/group-hover:text-\[#D98219\]/g, 'group-hover:text-[#1B72E8]');
  fs.writeFileSync(industryCardPath, ic, 'utf8');
  console.log('Updated IndustryCard.tsx');
}

// ============================================================================
// 7. Update JourneyTimeline.tsx
// ============================================================================
const journeyPath = path.join(srcDir, 'components', 'about', 'JourneyTimeline.tsx');
if (fs.existsSync(journeyPath)) {
  let jt = fs.readFileSync(journeyPath, 'utf8');
  jt = jt.replace(/text-\[#C77A17\]/g, 'text-[#1B72E8]');
  jt = jt.replace(/text-\[#D98219\]/g, 'text-[#7139E8]');
  fs.writeFileSync(journeyPath, jt, 'utf8');
  console.log('Updated JourneyTimeline.tsx');
}

