const fs = require('fs');

let content = fs.readFileSync('src/pages/ContactPage.tsx', 'utf8');

// 1. Root wrapper
content = content.replace(
  'className="relative bg-[#F5F9FF] text-[#45546B] selection:bg-[#0866D9] selection:text-white"',
  'className="relative bg-white text-[#45546B] selection:bg-[#0866D9] selection:text-white"'
);

// 2. Section 1 Hero
content = content.replace(
  'className="relative overflow-hidden bg-gradient-to-b from-[#F5F9FF] via-white to-[#F5F9FF] pt-10 pb-14 lg:pt-16 lg:pb-20 border-b border-blue-100/70"',
  'className="relative overflow-hidden bg-gradient-to-b from-sky-50/50 via-white to-white pt-10 pb-14 lg:pt-16 lg:pb-20 border-b border-slate-100"'
);

// 3. Section 2 Channels
content = content.replace(
  'className="py-12 sm:py-16 bg-white border-b border-blue-100/70"',
  'className="py-12 sm:py-16 bg-white border-b border-slate-100"'
);

// 4. Section 3 Enquiry Form & Locations
content = content.replace(
  'className="py-14 sm:py-20 bg-[#F5F9FF] border-b border-blue-100/70"',
  'className="py-14 sm:py-20 bg-slate-50/60 border-b border-slate-100"'
);

// 5. Section 4 Value Commitment
content = content.replace(
  'className="py-14 sm:py-18 bg-white border-b border-blue-100/70"',
  'className="py-14 sm:py-18 bg-white border-b border-slate-100"'
);

// 6. Section 4 Value cards background
content = content.replace(
  /className="bg-\[#F5F9FF\] rounded-2xl p-6 border border-blue-100/g,
  'className="bg-slate-50/70 hover:bg-white rounded-2xl p-6 border border-slate-200/80'
);

// 7. General border-blue-100 on cards
content = content.replace(/border-blue-100\/90/g, 'border-slate-200/90');
content = content.replace(/border border-blue-100/g, 'border border-slate-200/90');

fs.writeFileSync('src/pages/ContactPage.tsx', content, 'utf8');
console.log('ContactPage.tsx background colors updated successfully.');

