const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, replacements) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  for (const [target, replacement] of replacements) {
    content = content.split(target).join(replacement);
  }
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

// 1. Modals
replaceInFile('src/components/ui/CallbackModal.tsx', [
  [
    'bg-gradient-to-r from-[#1F4FE0] to-[#1F4FE0] hover:from-[#1739B8] hover:to-[#1739B8] shadow-md shadow-blue-500/25',
    'bg-atlas-gold hover:bg-[#D4972F] !text-atlas-navy font-bold shadow-[0_4px_14px_rgba(224,163,59,0.35)]'
  ]
]);

replaceInFile('src/components/ui/ConsultationModal.tsx', [
  [
    'bg-gradient-to-r from-[#1F4FE0] to-[#1F4FE0] hover:from-[#1739B8] hover:to-[#1739B8] shadow-md shadow-blue-500/25',
    'bg-atlas-gold hover:bg-[#D4972F] !text-atlas-navy font-bold shadow-[0_4px_14px_rgba(224,163,59,0.35)]'
  ]
]);

// 2. FaqAccordion
replaceInFile('src/components/ui/FaqAccordion.tsx', [
  [
    "bg-[#1F4FE0] text-white shadow-sm shadow-blue-500/20",
    "bg-atlas-gold text-atlas-navy font-bold shadow-[0_2px_8px_rgba(224,163,59,0.25)]"
  ],
  [
    "isOpen ? 'bg-[#1F4FE0] text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-[#1F4FE0]'",
    "isOpen ? 'bg-atlas-gold text-atlas-navy' : 'bg-slate-100 text-slate-500 group-hover:bg-amber-50 group-hover:text-atlas-goldDeep'"
  ]
]);

// 3. LeadershipSection & DomainSolutionTemplate
replaceInFile('src/components/about/LeadershipSection.tsx', [
  [
    'bg-[#1F4FE0] hover:bg-[#1739B8] text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-sm',
    'bg-atlas-gold hover:bg-[#D4972F] text-atlas-navy text-xs sm:text-sm font-bold uppercase tracking-wider shadow-[0_4px_14px_rgba(224,163,59,0.35)]'
  ]
]);

replaceInFile('src/components/solutions/DomainSolutionTemplate.tsx', [
  [
    'className="bg-[#1F4FE0] hover:bg-blue-700 text-white font-semibold px-6 py-3.5 rounded-lg shadow-sm transition-all duration-200 inline-flex items-center gap-2"',
    'className="bg-atlas-gold hover:bg-[#D4972F] text-atlas-navy font-bold px-6 py-3.5 rounded-lg shadow-[0_4px_14px_rgba(224,163,59,0.35)] transition-all duration-200 inline-flex items-center gap-2"'
  ],
  [
    'className="inline-flex items-center gap-2 bg-[#1F4FE0] hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-sm transition-all duration-200"',
    'className="inline-flex items-center gap-2 bg-atlas-gold hover:bg-[#D4972F] text-atlas-navy font-bold px-6 py-3 rounded-lg shadow-[0_4px_14px_rgba(224,163,59,0.35)] transition-all duration-200"'
  ],
  [
    'className="bg-[#1F4FE0] hover:bg-blue-600 text-white font-bold text-base px-8 py-4 rounded-xl shadow-lg transition-all duration-200 inline-flex items-center gap-2"',
    'className="bg-atlas-gold hover:bg-[#D4972F] text-atlas-navy font-bold text-base px-8 py-4 rounded-xl shadow-[0_4px_14px_rgba(224,163,59,0.35)] transition-all duration-200 inline-flex items-center gap-2"'
  ]
]);

// 4. Update all src/pages buttons
const pagesDir = path.resolve('src/pages');
const pageFiles = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));

for (const file of pageFiles) {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Blue gradient button -> Gold button
  content = content.replace(
    /bg-gradient-to-r from-\[#1F4FE0\] to-\[#1F4FE0\] hover:from-\[#1739B8\] hover:to-\[#1739B8\] text-white shadow-md shadow-blue-500\/25/g,
    'bg-atlas-gold hover:bg-[#D4972F] !text-atlas-navy font-bold shadow-[0_4px_14px_rgba(224,163,59,0.35)]'
  );

  content = content.replace(
    /bg-\[#1F4FE0\] hover:bg-blue-700 text-white/g,
    'bg-atlas-gold hover:bg-[#D4972F] !text-atlas-navy font-bold shadow-[0_4px_14px_rgba(224,163,59,0.35)]'
  );

  content = content.replace(
    /bg-\[#1F4FE0\] hover:bg-blue-600 text-white/g,
    'bg-atlas-gold hover:bg-[#D4972F] !text-atlas-navy font-bold shadow-[0_4px_14px_rgba(224,163,59,0.35)]'
  );

  content = content.replace(
    /bg-\[#1F4FE0\] hover:bg-\[#1739B8\] text-white/g,
    'bg-atlas-gold hover:bg-[#D4972F] !text-atlas-navy font-bold shadow-[0_4px_14px_rgba(224,163,59,0.35)]'
  );

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated page: ${file}`);
  }
}

console.log('All blue buttons converted to gold #E0A33B successfully!');

