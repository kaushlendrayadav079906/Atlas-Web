const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'pages', 'CaseStudiesPage.tsx');
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
  `<span className="text-[#7139e8]">{CASE_STUDIES_HERO_DATA.titleHighlight}</span>`,
  `<span className="text-[#D98219]">{CASE_STUDIES_HERO_DATA.titleHighlight}</span>`
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

// 6. Section 2 Featured Case Study Eyebrow & Heading
content = content.replace(
  `<span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-blue-600">\n              {FEATURED_CASE_STUDY_DATA.eyebrow}\n            </span>`,
  `<span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-[#C77A17]">\n              {FEATURED_CASE_STUDY_DATA.eyebrow}\n            </span>`
);
content = content.replace(
  `<h2 className="text-[30px] sm:text-[36px] lg:text-[40px] font-extrabold text-[#10264b] tracking-tight max-w-4xl leading-tight">\n              Manufacturing Company Streamlines Operations with{' '}\n              <span className="text-[#7139e8]">SAP Business One</span>\n            </h2>`,
  `<h2 className="font-serif text-[30px] sm:text-[36px] lg:text-[40px] font-bold text-[#142B59] tracking-tight max-w-4xl leading-tight">\n              Manufacturing Company Streamlines Operations with{' '}\n              <span className="text-[#D98219]">SAP Business One</span>\n            </h2>`
);
content = content.replace(
  `<h3 className="text-[22px] sm:text-[25px] font-bold text-[#10264b] leading-snug">\n                  {FEATURED_CASE_STUDY_DATA.title}\n                </h3>`,
  `<h3 className="font-serif text-[22px] sm:text-[25px] font-bold text-[#142B59] leading-snug">\n                  {FEATURED_CASE_STUDY_DATA.title}\n                </h3>`
);
content = content.replace(
  `className="inline-flex items-center justify-center gap-2 text-[15px] sm:text-[16px] font-semibold px-8 py-3.5 rounded-xl bg-[#0878f9] hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 transition-all cursor-pointer"`,
  `className="inline-flex items-center justify-center gap-2 text-[15px] sm:text-[16px] font-semibold px-8 py-3.5 rounded-xl bg-[#D98219] hover:bg-[#bd7810] text-white shadow-md shadow-[#D98219]/20 transition-all cursor-pointer"`
);

// 7. Section 3 More Case Studies
content = content.replace(
  `<h2 className="text-[32px] sm:text-[38px] lg:text-[42px] font-extrabold text-[#10264b] tracking-tight">\n              More Case <span className="text-[#7139e8]">Studies</span>\n            </h2>`,
  `<h2 className="font-serif text-[32px] sm:text-[38px] lg:text-[42px] font-bold text-[#142B59] tracking-tight">\n              More Case <span className="text-[#D98219]">Studies</span>\n            </h2>`
);
content = content.replace(
  `<p className="text-[16px] sm:text-[17px] text-[#354765] leading-relaxed max-w-3xl">\n              Explore how businesses across different industries have improved their operations with our solutions.\n            </p>`,
  `<p className="text-[16px] sm:text-[17px] text-[#45546B] leading-relaxed max-w-3xl">\n              Explore how businesses across different industries have improved their operations with our solutions.\n            </p>`
);
content = content.replace(
  `<h3 className="text-[19px] font-bold text-[#10264b] leading-snug group-hover:text-blue-600 transition-colors">\n                      {study.title}\n                    </h3>`,
  `<h3 className="text-[19px] font-bold text-[#172B50] leading-snug group-hover:text-[#D98219] transition-colors">\n                      {study.title}\n                    </h3>`
);
content = content.replace(
  `<p className="text-[14px] text-[#354765] leading-relaxed line-clamp-3">\n                      {study.description}\n                    </p>`,
  `<p className="text-[14px] text-[#53647A] leading-relaxed line-clamp-3">\n                      {study.description}\n                    </p>`
);
content = content.replace(
  `className="text-[14px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 transition-colors cursor-pointer"`,
  `className="text-[14px] font-bold text-[#142B59] hover:text-[#D98219] flex items-center gap-1.5 transition-colors cursor-pointer"`
);

// 8. Section 4 Our Approach
content = content.replace(
  `<h2 className="text-[32px] sm:text-[38px] lg:text-[42px] font-extrabold text-[#10264b] tracking-tight">\n              {OUR_APPROACH_DATA.titleStart}{' '}\n              <span className="text-[#7139e8]">{OUR_APPROACH_DATA.titleHighlight}</span>\n            </h2>`,
  `<h2 className="font-serif text-[32px] sm:text-[38px] lg:text-[42px] font-bold text-[#142B59] tracking-tight">\n              {OUR_APPROACH_DATA.titleStart}{' '}\n              <span className="text-[#D98219]">{OUR_APPROACH_DATA.titleHighlight}</span>\n            </h2>`
);
content = content.replace(
  `<p className="text-[16px] sm:text-[17px] text-[#354765] leading-relaxed">\n              {OUR_APPROACH_DATA.description}\n            </p>`,
  `<p className="text-[16px] sm:text-[17px] text-[#45546B] leading-relaxed">\n              {OUR_APPROACH_DATA.description}\n            </p>`
);
content = content.replace(
  `<h3 className="mt-4 text-[15px] font-bold text-[#10264b] leading-tight group-hover:text-blue-600 transition-colors">`,
  `<h3 className="mt-4 text-[15px] font-bold text-[#172B50] leading-tight group-hover:text-[#D98219] transition-colors">`
);

// 9. Section 5 Technology Showcase
content = content.replace(
  `<h2 className="text-[32px] sm:text-[38px] lg:text-[42px] font-extrabold text-[#10264b] tracking-tight">\n              {TECHNOLOGY_SHOWCASE_DATA.titleStart}{' '}\n              <span className="text-[#7139e8]">{TECHNOLOGY_SHOWCASE_DATA.titleHighlight}</span>\n            </h2>`,
  `<h2 className="font-serif text-[32px] sm:text-[38px] lg:text-[42px] font-bold text-[#142B59] tracking-tight">\n              {TECHNOLOGY_SHOWCASE_DATA.titleStart}{' '}\n              <span className="text-[#D98219]">{TECHNOLOGY_SHOWCASE_DATA.titleHighlight}</span>\n            </h2>`
);
content = content.replace(
  `<p className="text-[16px] sm:text-[17px] text-[#354765] leading-relaxed">\n              {TECHNOLOGY_SHOWCASE_DATA.description}\n            </p>`,
  `<p className="text-[16px] sm:text-[17px] text-[#45546B] leading-relaxed">\n              {TECHNOLOGY_SHOWCASE_DATA.description}\n            </p>`
);
content = content.replace(
  `<h3 className="text-[17px] font-bold text-[#10264b]">\n                      {tech.name}\n                    </h3>`,
  `<h3 className="text-[17px] font-bold text-[#172B50]">\n                      {tech.name}\n                    </h3>`
);
content = content.replace(
  `<p className="text-[13px] text-[#354765] leading-relaxed pt-1">\n                      {tech.description}\n                    </p>`,
  `<p className="text-[13px] text-[#53647A] leading-relaxed pt-1">\n                      {tech.description}\n                    </p>`
);

// 10. Section 6 Contact CTA
content = content.replace(
  `<span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-wider text-blue-600">\n                  LET'S WORK TOGETHER\n                </span>`,
  `<span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-wider text-[#C77A17]">\n                  LET'S WORK TOGETHER\n                </span>`
);
content = content.replace(
  `<h2 className="text-[28px] sm:text-[34px] lg:text-[38px] font-extrabold text-[#10264b] tracking-tight leading-tight">\n                  {CASE_STUDIES_CTA_DATA.titleStart}{' '}\n                  <span className="text-[#7139e8]">\n                    {CASE_STUDIES_CTA_DATA.titleHighlight}\n                  </span>\n                </h2>`,
  `<h2 className="font-serif text-[28px] sm:text-[34px] lg:text-[38px] font-bold text-[#142B59] tracking-tight leading-tight">\n                  {CASE_STUDIES_CTA_DATA.titleStart}{' '}\n                  <span className="text-[#D98219]">\n                    {CASE_STUDIES_CTA_DATA.titleHighlight}\n                  </span>\n                </h2>`
);
content = content.replace(
  `<p className="text-[15px] sm:text-[16px] text-[#354765] leading-relaxed max-w-xl">\n                  {CASE_STUDIES_CTA_DATA.description}\n                </p>`,
  `<p className="text-[15px] sm:text-[16px] text-[#45546B] leading-relaxed max-w-xl">\n                  {CASE_STUDIES_CTA_DATA.description}\n                </p>`
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
console.log('CaseStudiesPage.tsx successfully updated!');

