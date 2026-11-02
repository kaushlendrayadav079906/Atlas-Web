const fs = require('fs');

let content = fs.readFileSync('src/pages/ContactPage.tsx', 'utf8');

// 1. Root container: #F0F7FF
content = content.replace(
  'className="relative bg-white text-[#45546B] selection:bg-[#0866D9] selection:text-white"',
  'className="relative bg-[#F0F7FF] text-[#45546B] selection:bg-[#0866D9] selection:text-white"'
);

// 2. Hero Section:
content = content.replace(
  'className="relative overflow-hidden bg-gradient-to-b from-sky-50/50 via-white to-white pt-10 pb-14 lg:pt-16 lg:pb-20 border-b border-slate-100"',
  'className="relative overflow-hidden bg-gradient-to-b from-[#F0F7FF] via-[#F8FBFF] to-[#F0F7FF] pt-10 pb-14 lg:pt-16 lg:pb-20 border-b border-blue-100/60"'
);

// 3. Section 2 Channels:
content = content.replace(
  'className="py-12 sm:py-16 bg-white border-b border-slate-100"',
  'className="py-12 sm:py-16 bg-white border-b border-blue-100/60"'
);

// 4. Section 3 Form & Locations:
content = content.replace(
  'className="py-14 sm:py-20 bg-slate-50/60 border-b border-slate-100"',
  'className="py-14 sm:py-20 bg-[#F0F7FF] border-b border-blue-100/60"'
);

// 5. Section 4 Value Commitment:
content = content.replace(
  'className="py-14 sm:py-18 bg-white border-b border-slate-100"',
  'className="py-14 sm:py-18 bg-white border-b border-blue-100/60"'
);

// 6. Section 4 Value cards:
content = content.replace(
  /className="bg-slate-50\/70 hover:bg-white rounded-2xl p-6 border border-slate-200\/80/g,
  'className="bg-[#F0F7FF] hover:bg-white rounded-2xl p-6 border border-blue-100/80'
);

// 7. Channel and Form card borders:
content = content.replace(/border-slate-200\/90/g, 'border-blue-100/80');

fs.writeFileSync('src/pages/ContactPage.tsx', content, 'utf8');
console.log('ContactPage.tsx updated with Branded Light Ice Blue (#F0F7FF) successfully.');

