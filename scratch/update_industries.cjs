const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'pages', 'IndustriesPage.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Hero Eyebrow
content = content.replace(
  `text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-blue-600 select-none`,
  `text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-[#C77A17] select-none`
);

// 2. Hero Heading
content = content.replace(
  `<h1 className="text-[36px] sm:text-[44px] lg:text-[50px] xl:text-[54px] font-extrabold tracking-tight leading-[1.14] text-[#10264b]">`,
  `<h1 className="font-serif text-[38px] sm:text-[46px] lg:text-[52px] xl:text-[56px] font-bold tracking-tight leading-[1.14] text-[#142B59]">`
);
content = content.replace(
  `<span className="text-[#7139e8]">{INDUSTRIES_HERO_DATA.titleHighlight}</span>`,
  `<span className="text-[#D98219]">{INDUSTRIES_HERO_DATA.titleHighlight}</span>`
);

// 3. Hero Description
content = content.replace(
  `<p className="text-[16px] sm:text-[17px] lg:text-[18px] text-[#354765] leading-relaxed max-w-2xl font-normal">`,
  `<p className="text-[16px] sm:text-[17px] lg:text-[18px] text-[#45546B] leading-relaxed max-w-2xl font-normal">`
);

// 4. Hero Primary Button
content = content.replace(
  `className="inline-flex items-center justify-center gap-2 text-[16px] font-semibold px-8 py-3.5 rounded-xl bg-[#0878f9] hover:bg-blue-700 text-white shadow-md shadow-blue-600/25 transition-all duration-200 cursor-pointer"`,
  `className="inline-flex items-center justify-center gap-2 text-[16px] font-semibold px-8 py-3.5 rounded-xl bg-[#D98219] hover:bg-[#bd7810] text-white shadow-md shadow-[#D98219]/25 transition-all duration-200 cursor-pointer"`
);

// 5. Hero Secondary Button
content = content.replace(
  `className="inline-flex items-center justify-center gap-2 text-[16px] font-semibold px-8 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200/90 shadow-sm transition-all duration-200 cursor-pointer"`,
  `className="inline-flex items-center justify-center gap-2 text-[16px] font-semibold px-8 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#142B59] border border-slate-200/90 shadow-sm transition-all duration-200 cursor-pointer"`
);

// 6. Section 2 Header
content = content.replace(
  `<span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-blue-600">\n              {INDUSTRIES_SECTION_HEADER.eyebrow}\n            </span>`,
  `<span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-[#C77A17]">\n              {INDUSTRIES_SECTION_HEADER.eyebrow}\n            </span>`
);
content = content.replace(
  `<h2 className="text-[32px] sm:text-[38px] lg:text-[42px] font-extrabold text-[#10264b] tracking-tight">\n              {INDUSTRIES_SECTION_HEADER.titleStart}{' '}\n              <span className="text-[#7139e8]">{INDUSTRIES_SECTION_HEADER.titleHighlight}</span>\n            </h2>`,
  `<h2 className="font-serif text-[32px] sm:text-[38px] lg:text-[42px] font-bold text-[#142B59] tracking-tight">\n              {INDUSTRIES_SECTION_HEADER.titleStart}{' '}\n              <span className="text-[#D98219]">{INDUSTRIES_SECTION_HEADER.titleHighlight}</span>\n            </h2>`
);
content = content.replace(
  `<p className="text-[16px] sm:text-[17px] text-[#354765] leading-relaxed max-w-3xl mx-auto">\n              {INDUSTRIES_SECTION_HEADER.description}\n            </p>`,
  `<p className="text-[16px] sm:text-[17px] text-[#45546B] leading-relaxed max-w-3xl mx-auto">\n              {INDUSTRIES_SECTION_HEADER.description}\n            </p>`
);

// Section 2 Cards
content = content.replace(
  `<h3 className="text-[18px] sm:text-[19px] font-bold text-[#10264b] group-hover:text-blue-600 transition-colors leading-snug">`,
  `<h3 className="text-[18px] sm:text-[19px] font-bold text-[#172B50] group-hover:text-[#D98219] transition-colors leading-snug">`
);
content = content.replace(
  `<p className="text-[13px] sm:text-[14px] text-slate-600 leading-relaxed font-normal">`,
  `<p className="text-[13px] sm:text-[14px] text-[#53647A] leading-relaxed font-normal">`
);

// 7. Section 3 Header & Cards
content = content.replace(
  `<h2 className="text-[32px] sm:text-[38px] lg:text-[42px] font-extrabold text-[#10264b] tracking-tight">\n              {INDUSTRY_VALUE_DATA.titleStart}{' '}\n              <span className="text-[#7139e8]">{INDUSTRY_VALUE_DATA.titleHighlight}</span>\n            </h2>`,
  `<h2 className="font-serif text-[32px] sm:text-[38px] lg:text-[42px] font-bold text-[#142B59] tracking-tight">\n              {INDUSTRY_VALUE_DATA.titleStart}{' '}\n              <span className="text-[#D98219]">{INDUSTRY_VALUE_DATA.titleHighlight}</span>\n            </h2>`
);
content = content.replace(
  `<p className="text-[16px] sm:text-[17px] text-[#354765] leading-relaxed">\n              {INDUSTRY_VALUE_DATA.description}\n            </p>`,
  `<p className="text-[16px] sm:text-[17px] text-[#45546B] leading-relaxed">\n              {INDUSTRY_VALUE_DATA.description}\n            </p>`
);
content = content.replace(
  `<h3 className="text-[17px] font-bold text-[#10264b] leading-snug">\n                    {val.title}\n                  </h3>`,
  `<h3 className="text-[17px] font-bold text-[#172B50] leading-snug">\n                    {val.title}\n                  </h3>`
);
content = content.replace(
  `<p className="text-[13px] text-[#354765] leading-relaxed">\n                    {val.description}\n                  </p>`,
  `<p className="text-[13px] text-[#53647A] leading-relaxed">\n                    {val.description}\n                  </p>`
);

// 8. Section 4 Engagement Model
content = content.replace(
  `<h2 className="text-[32px] sm:text-[38px] lg:text-[42px] font-extrabold text-[#10264b] tracking-tight">\n              {INDUSTRY_ENGAGEMENT_DATA.titleStart}{' '}\n              <span className="text-[#7139e8]">{INDUSTRY_ENGAGEMENT_DATA.titleHighlight}</span>\n            </h2>`,
  `<h2 className="font-serif text-[32px] sm:text-[38px] lg:text-[42px] font-bold text-[#142B59] tracking-tight">\n              {INDUSTRY_ENGAGEMENT_DATA.titleStart}{' '}\n              <span className="text-[#D98219]">{INDUSTRY_ENGAGEMENT_DATA.titleHighlight}</span>\n            </h2>`
);
content = content.replace(
  `<p className="text-[16px] sm:text-[17px] text-[#354765] leading-relaxed">\n              {INDUSTRY_ENGAGEMENT_DATA.description}\n            </p>`,
  `<p className="text-[16px] sm:text-[17px] text-[#45546B] leading-relaxed">\n              {INDUSTRY_ENGAGEMENT_DATA.description}\n            </p>`
);
content = content.replace(
  `<h3 className="mt-4 text-[15px] font-bold text-[#10264b] leading-tight group-hover:text-blue-600 transition-colors">\n                      {step.title}\n                    </h3>`,
  `<h3 className="mt-4 text-[15px] font-bold text-[#172B50] leading-tight group-hover:text-[#D98219] transition-colors">\n                      {step.title}\n                    </h3>`
);

// 9. Section 5 Contact CTA
content = content.replace(
  `<span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-wider text-blue-600">\n                  {INDUSTRIES_CONTACT_CTA_DATA.eyebrow}\n                </span>`,
  `<span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-wider text-[#C77A17]">\n                  {INDUSTRIES_CONTACT_CTA_DATA.eyebrow}\n                </span>`
);
content = content.replace(
  `<h2 className="text-[28px] sm:text-[34px] lg:text-[38px] font-extrabold text-[#10264b] tracking-tight leading-tight">\n                  {INDUSTRIES_CONTACT_CTA_DATA.titleStart}{' '}\n                  <span className="text-[#7139e8]">\n                    {INDUSTRIES_CONTACT_CTA_DATA.titleHighlight}\n                  </span>\n                </h2>`,
  `<h2 className="font-serif text-[28px] sm:text-[34px] lg:text-[38px] font-bold text-[#142B59] tracking-tight leading-tight">\n                  {INDUSTRIES_CONTACT_CTA_DATA.titleStart}{' '}\n                  <span className="text-[#D98219]">\n                    {INDUSTRIES_CONTACT_CTA_DATA.titleHighlight}\n                  </span>\n                </h2>`
);
content = content.replace(
  `<p className="text-[15px] sm:text-[16px] text-[#354765] leading-relaxed max-w-xl">\n                  {INDUSTRIES_CONTACT_CTA_DATA.description}\n                </p>`,
  `<p className="text-[15px] sm:text-[16px] text-[#45546B] leading-relaxed max-w-xl">\n                  {INDUSTRIES_CONTACT_CTA_DATA.description}\n                </p>`
);
content = content.replace(
  `className="inline-flex items-center justify-center gap-2 text-[15px] sm:text-[16px] font-semibold px-8 py-3.5 rounded-xl bg-[#0878f9] hover:bg-blue-700 text-white shadow-md shadow-blue-600/25 transition-all cursor-pointer"`,
  `className="inline-flex items-center justify-center gap-2 text-[15px] sm:text-[16px] font-semibold px-8 py-3.5 rounded-xl bg-[#D98219] hover:bg-[#bd7810] text-white shadow-md shadow-[#D98219]/25 transition-all cursor-pointer"`
);

// Replace remaining #10264b with #142B59
content = content.replace(/#10264b/g, '#142B59');
// Replace remaining #354765 with #45546B
content = content.replace(/#354765/g, '#45546B');

fs.writeFileSync(filePath, content, 'utf8');
console.log('IndustriesPage.tsx successfully updated!');

