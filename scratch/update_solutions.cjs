const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'pages', 'SolutionsPage.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Hero Eyebrow
content = content.replace(
  `text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-blue-600 select-none`,
  `text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-[#C77A17] select-none`
);

// 2. Hero Heading
content = content.replace(
  `<h1 className="text-[34px] sm:text-[42px] lg:text-[48px] xl:text-[52px] font-extrabold tracking-tight leading-[1.14] text-[#10264b]">`,
  `<h1 className="font-serif text-[36px] sm:text-[44px] lg:text-[50px] xl:text-[54px] font-bold tracking-tight leading-[1.14] text-[#142B59]">`
);
content = content.replace(
  `<span className="text-[#7139e8]">{SOLUTIONS_HERO_DATA.titleHighlight}</span>`,
  `<span className="text-[#D98219]">{SOLUTIONS_HERO_DATA.titleHighlight}</span>`
);

// 3. Hero Description
content = content.replace(
  `<p className="text-[16px] sm:text-[17px] lg:text-[18px] text-[#354765] leading-relaxed max-w-2xl font-normal">`,
  `<p className="text-[16px] sm:text-[17px] lg:text-[18px] text-[#45546B] leading-relaxed max-w-2xl font-normal">`
);

// 4. Hero Primary Button
content = content.replace(
  `className="text-[16px] sm:text-[17px] font-semibold px-7 py-3.5 shadow-md shadow-blue-600/20 bg-[#0878f9] hover:bg-blue-700"`,
  `className="text-[16px] sm:text-[17px] font-semibold px-7 py-3.5 shadow-md shadow-[#D98219]/20 bg-[#D98219] hover:bg-[#bd7810] text-white"`
);

// 5. Hero Secondary Button
content = content.replace(
  `className="text-[16px] sm:text-[17px] font-semibold px-7 py-3.5"`,
  `className="text-[16px] sm:text-[17px] font-semibold px-7 py-3.5 text-[#142B59] hover:text-[#D98219]"`
);

// 6. Metrics labels & sublabels
content = content.replace(
  `className="text-[15px] sm:text-[16px] font-bold text-[#10264b] leading-snug"`,
  `className="text-[15px] sm:text-[16px] font-bold text-[#142B59] leading-snug"`
);
content = content.replace(
  `className="text-[12px] sm:text-[13px] text-slate-500 leading-snug mt-0.5"`,
  `className="text-[12px] sm:text-[13px] text-[#53647A] leading-snug mt-0.5"`
);

// 7. Section 3 Overview Cards:
content = content.replace(
  `<h3 className="text-[17px] sm:text-[18px] font-bold text-[#10264b] group-hover:text-blue-600 transition-colors leading-snug">`,
  `<h3 className="text-[17px] sm:text-[18px] font-bold text-[#172B50] group-hover:text-[#D98219] transition-colors leading-snug">`
);
content = content.replace(
  `<p className="text-[13px] sm:text-[14px] text-slate-600 leading-snug">`,
  `<p className="text-[13px] sm:text-[14px] text-[#53647A] leading-snug">`
);
content = content.replace(
  `className="text-[13px] sm:text-[14px] font-semibold text-blue-600 group-hover:text-blue-700 transition-colors flex items-center gap-1.5"`,
  `className="text-[13px] sm:text-[14px] font-semibold text-[#142B59] group-hover:text-[#D98219] transition-colors flex items-center gap-1.5"`
);

// 8. Section 4: SAP B1 Deep Dive
content = content.replace(
  `<span className="text-[13px] font-bold uppercase tracking-wider text-blue-600 block">\n                {SAP_B1_DEEP_DIVE.eyebrow}\n              </span>`,
  `<span className="text-[13px] font-bold uppercase tracking-wider text-[#C77A17] block">\n                {SAP_B1_DEEP_DIVE.eyebrow}\n              </span>`
);
content = content.replace(
  `<h2 className="text-[26px] sm:text-[32px] lg:text-[34px] font-bold text-[#10264b] tracking-tight leading-tight">\n                {SAP_B1_DEEP_DIVE.heading}\n              </h2>`,
  `<h2 className="font-serif text-[28px] sm:text-[34px] lg:text-[38px] font-bold text-[#142B59] tracking-tight leading-tight">\n                {SAP_B1_DEEP_DIVE.heading}\n              </h2>`
);
content = content.replace(
  `<p className="text-[15px] sm:text-[16px] text-[#354765] leading-relaxed">\n                {SAP_B1_DEEP_DIVE.description}\n              </p>`,
  `<p className="text-[15px] sm:text-[16px] text-[#45546B] leading-relaxed">\n                {SAP_B1_DEEP_DIVE.description}\n              </p>`
);
content = content.replace(
  `<span className="text-[14px] sm:text-[15px] font-medium text-slate-800">\n                      {item}\n                    </span>`,
  `<span className="text-[14px] sm:text-[15px] font-medium text-[#45546B]">\n                      {item}\n                    </span>`
);
content = content.replace(
  `<div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">`,
  `<div className="w-5 h-5 rounded-full bg-[#D98219] text-white flex items-center justify-center shrink-0">`
);
content = content.replace(
  `className="text-[15px] sm:text-[16px] font-semibold px-6 py-3 bg-[#0878f9] hover:bg-blue-700 shadow-md shadow-blue-600/20"`,
  `className="text-[15px] sm:text-[16px] font-semibold px-6 py-3 bg-[#D98219] hover:bg-[#bd7810] text-white shadow-md shadow-[#D98219]/20"`
);
content = content.replace(
  `<h4 className="text-[16px] sm:text-[17px] font-bold text-[#10264b] mb-3 text-left">\n                Key Benefits\n              </h4>`,
  `<h4 className="text-[16px] sm:text-[17px] font-bold text-[#172B50] mb-3 text-left">\n                Key Benefits\n              </h4>`
);
content = content.replace(
  `<span className="text-[13px] sm:text-[14px] font-bold text-[#10264b] leading-tight">\n                      {b.title}\n                    </span>`,
  `<span className="text-[13px] sm:text-[14px] font-bold text-[#172B50] leading-tight">\n                      {b.title}\n                    </span>`
);

// 9. Section 5: Boyum IT Deep Dive
content = content.replace(
  `<span className="text-[13px] font-bold uppercase tracking-wider text-blue-600 block">\n                {BOYUM_IT_DEEP_DIVE.eyebrow}\n              </span>`,
  `<span className="text-[13px] font-bold uppercase tracking-wider text-[#C77A17] block">\n                {BOYUM_IT_DEEP_DIVE.eyebrow}\n              </span>`
);
content = content.replace(
  `<h2 className="text-[26px] sm:text-[32px] font-bold text-[#10264b] tracking-tight leading-tight">\n                {BOYUM_IT_DEEP_DIVE.title}\n              </h2>`,
  `<h2 className="font-serif text-[28px] sm:text-[34px] lg:text-[38px] font-bold text-[#142B59] tracking-tight leading-tight">\n                {BOYUM_IT_DEEP_DIVE.title}\n              </h2>`
);
content = content.replace(
  `<h3 className="text-[17px] sm:text-[18px] font-semibold text-slate-700 leading-snug">\n                {BOYUM_IT_DEEP_DIVE.subtitle}\n              </h3>`,
  `<h3 className="text-[17px] sm:text-[18px] font-semibold text-[#142B59] leading-snug">\n                {BOYUM_IT_DEEP_DIVE.subtitle}\n              </h3>`
);
content = content.replace(
  `<p className="text-[15px] sm:text-[16px] text-[#354765] leading-relaxed">\n                {BOYUM_IT_DEEP_DIVE.description}\n              </p>`,
  `<p className="text-[15px] sm:text-[16px] text-[#45546B] leading-relaxed">\n                {BOYUM_IT_DEEP_DIVE.description}\n              </p>`
);
content = content.replace(
  `className="text-[15px] sm:text-[16px] font-semibold px-6 py-3 bg-[#0878f9] hover:bg-blue-700 shadow-md shadow-blue-600/20"`,
  `className="text-[15px] sm:text-[16px] font-semibold px-6 py-3 bg-[#D98219] hover:bg-[#bd7810] text-white shadow-md shadow-[#D98219]/20"`
);
// Modules
content = content.replace(
  `<h4 className="text-[16px] sm:text-[17px] font-bold text-[#10264b] leading-snug">\n                          {mod.title}\n                        </h4>`,
  `<h4 className="text-[16px] sm:text-[17px] font-bold text-[#172B50] leading-snug">\n                          {mod.title}\n                        </h4>`
);
content = content.replace(
  `<p className="text-[13px] text-slate-600 leading-snug">\n                        {mod.subtitle}\n                      </p>`,
  `<p className="text-[13px] text-[#53647A] leading-snug">\n                        {mod.subtitle}\n                      </p>`
);
content = content.replace(
  `className="text-[13px] font-semibold text-blue-600 group-hover:text-blue-700 transition-colors"\n                      >\n                        Learn More`,
  `className="text-[13px] font-semibold text-[#142B59] group-hover:text-[#D98219] transition-colors"\n                      >\n                        Learn More`
);

// 10. Section 6: UiPath RPA Deep Dive
content = content.replace(
  `<span className="text-[13px] font-bold uppercase tracking-wider text-blue-600 block">\n                {UIPATH_RPA_DEEP_DIVE.eyebrow}\n              </span>`,
  `<span className="text-[13px] font-bold uppercase tracking-wider text-[#C77A17] block">\n                {UIPATH_RPA_DEEP_DIVE.eyebrow}\n              </span>`
);
content = content.replace(
  `<h2 className="text-[26px] sm:text-[30px] font-bold text-[#10264b] tracking-tight leading-tight">\n                {UIPATH_RPA_DEEP_DIVE.title}\n              </h2>`,
  `<h2 className="font-serif text-[28px] sm:text-[34px] lg:text-[38px] font-bold text-[#142B59] tracking-tight leading-tight">\n                {UIPATH_RPA_DEEP_DIVE.title}\n              </h2>`
);
content = content.replace(
  `<h3 className="text-[16px] sm:text-[17px] font-semibold text-slate-700 leading-snug">\n                {UIPATH_RPA_DEEP_DIVE.subtitle}\n              </h3>`,
  `<h3 className="text-[16px] sm:text-[17px] font-semibold text-[#142B59] leading-snug">\n                {UIPATH_RPA_DEEP_DIVE.subtitle}\n              </h3>`
);
content = content.replace(
  `<p className="text-[15px] sm:text-[16px] text-[#354765] leading-relaxed">\n                {UIPATH_RPA_DEEP_DIVE.description}\n              </p>`,
  `<p className="text-[15px] sm:text-[16px] text-[#45546B] leading-relaxed">\n                {UIPATH_RPA_DEEP_DIVE.description}\n              </p>`
);
content = content.replace(
  `<h4 className="text-[16px] sm:text-[17px] font-bold text-[#10264b] mb-3 text-left">\n                Key Automation Areas\n              </h4>`,
  `<h4 className="text-[16px] sm:text-[17px] font-bold text-[#172B50] mb-3 text-left">\n                Key Automation Areas\n              </h4>`
);
content = content.replace(
  `<h5 className="text-[14px] sm:text-[15px] font-bold text-[#10264b] leading-snug">\n                        {area.title}\n                      </h5>`,
  `<h5 className="text-[14px] sm:text-[15px] font-bold text-[#172B50] leading-snug">\n                        {area.title}\n                      </h5>`
);
content = content.replace(
  `<p className="text-[12px] text-slate-500 leading-snug mt-0.5">\n                        {area.subtitle}\n                      </p>`,
  `<p className="text-[12px] text-[#53647A] leading-snug mt-0.5">\n                        {area.subtitle}\n                      </p>`
);

// 11. Section 7: ATLAS Add-ons
content = content.replace(
  `<span className="text-[13px] font-bold uppercase tracking-wider text-blue-600 block mb-1">\n                {ATLAS_ADDONS_DEEP_DIVE.eyebrow}\n              </span>`,
  `<span className="text-[13px] font-bold uppercase tracking-wider text-[#C77A17] block mb-1">\n                {ATLAS_ADDONS_DEEP_DIVE.eyebrow}\n              </span>`
);
content = content.replace(
  `<h2 className="text-[26px] sm:text-[32px] lg:text-[36px] font-bold text-[#10264b] tracking-tight leading-tight">\n                {ATLAS_ADDONS_DEEP_DIVE.title}\n              </h2>`,
  `<h2 className="font-serif text-[28px] sm:text-[34px] lg:text-[38px] font-bold text-[#142B59] tracking-tight leading-tight">\n                {ATLAS_ADDONS_DEEP_DIVE.title}\n              </h2>`
);
content = content.replace(
  `<p className="text-[15px] sm:text-[16px] text-[#354765] max-w-2xl mt-1 leading-relaxed">\n                {ATLAS_ADDONS_DEEP_DIVE.description}\n              </p>`,
  `<p className="text-[15px] sm:text-[16px] text-[#45546B] max-w-2xl mt-1 leading-relaxed">\n                {ATLAS_ADDONS_DEEP_DIVE.description}\n              </p>`
);
content = content.replace(
  `className="text-[15px] font-semibold px-6 py-3 shrink-0 bg-[#0878f9] hover:bg-blue-700 shadow-md shadow-blue-600/20"`,
  `className="text-[15px] font-semibold px-6 py-3 shrink-0 bg-[#D98219] hover:bg-[#bd7810] text-white shadow-md shadow-[#D98219]/20"`
);
content = content.replace(
  `<h4 className="text-[15px] sm:text-[16px] font-bold text-[#10264b] leading-snug">\n                        {item.title}\n                      </h4>`,
  `<h4 className="text-[15px] sm:text-[16px] font-bold text-[#172B50] leading-snug">\n                        {item.title}\n                      </h4>`
);
content = content.replace(
  `<p className="text-[12px] sm:text-[13px] text-slate-600 leading-snug">\n                      {item.subtitle}\n                    </p>`,
  `<p className="text-[12px] sm:text-[13px] text-[#53647A] leading-snug">\n                      {item.subtitle}\n                    </p>`
);

// 12. Section 8: Industries We Serve
content = content.replace(
  `<span className="text-[13px] font-bold uppercase tracking-wider text-blue-600 block mb-2">\n              INDUSTRIES WE SERVE —\n            </span>`,
  `<span className="text-[13px] font-bold uppercase tracking-wider text-[#C77A17] block mb-2">\n              INDUSTRIES WE SERVE —\n            </span>`
);
content = content.replace(
  `<h2 className="text-[28px] sm:text-[34px] lg:text-[38px] font-bold text-[#10264b] tracking-tight leading-tight">\n              Solutions Designed Around <span className="text-[#7139e8]">Your Industry</span>\n            </h2>`,
  `<h2 className="font-serif text-[30px] sm:text-[36px] lg:text-[40px] font-bold text-[#142B59] tracking-tight leading-tight">\n              Solutions Designed Around <span className="text-[#D98219]">Your Industry</span>\n            </h2>`
);
content = content.replace(
  `<h3 className="text-[16px] sm:text-[17px] font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">\n                        {ind.title}\n                      </h3>`,
  `<h3 className="text-[16px] sm:text-[17px] font-bold text-[#172B50] group-hover:text-[#D98219] transition-colors leading-snug">\n                        {ind.title}\n                      </h3>`
);
content = content.replace(
  `<p className="text-[13px] text-slate-600 leading-snug">\n                      {ind.description}\n                    </p>`,
  `<p className="text-[13px] text-[#53647A] leading-snug">\n                      {ind.description}\n                    </p>`
);

// 13. Section 9: Contact CTA
content = content.replace(
  `<span className="text-[12px] font-bold uppercase tracking-wider text-blue-600 block">\n                  {SOLUTIONS_CONTACT_CTA_DATA.eyebrow}\n                </span>`,
  `<span className="text-[12px] font-bold uppercase tracking-wider text-[#C77A17] block">\n                  {SOLUTIONS_CONTACT_CTA_DATA.eyebrow}\n                </span>`
);
content = content.replace(
  `<h2 className="text-[26px] sm:text-[32px] lg:text-[36px] font-bold text-[#10264b] tracking-tight leading-tight">\n                  {SOLUTIONS_CONTACT_CTA_DATA.titleStart}{' '}\n                  <span className="text-[#7139e8]">{SOLUTIONS_CONTACT_CTA_DATA.titleHighlight}</span>\n                </h2>`,
  `<h2 className="font-serif text-[28px] sm:text-[34px] lg:text-[38px] font-bold text-[#142B59] tracking-tight leading-tight">\n                  {SOLUTIONS_CONTACT_CTA_DATA.titleStart}{' '}\n                  <span className="text-[#D98219]">{SOLUTIONS_CONTACT_CTA_DATA.titleHighlight}</span>\n                </h2>`
);
content = content.replace(
  `<p className="text-[15px] sm:text-[17px] text-[#354765] leading-relaxed max-w-lg">\n                  {SOLUTIONS_CONTACT_CTA_DATA.description}\n                </p>`,
  `<p className="text-[15px] sm:text-[17px] text-[#45546B] leading-relaxed max-w-lg">\n                  {SOLUTIONS_CONTACT_CTA_DATA.description}\n                </p>`
);
content = content.replace(
  `className="text-[16px] sm:text-[17px] font-semibold px-8 py-3.5 shadow-md shadow-blue-600/25 bg-[#0878f9] hover:bg-blue-700"`,
  `className="text-[16px] sm:text-[17px] font-semibold px-8 py-3.5 shadow-md shadow-[#D98219]/25 bg-[#D98219] hover:bg-[#bd7810] text-white"`
);

// Replace any remaining #10264b with #142B59
content = content.replace(/#10264b/g, '#142B59');
// Replace any remaining #354765 with #45546B
content = content.replace(/#354765/g, '#45546B');

fs.writeFileSync(filePath, content, 'utf8');
console.log('SolutionsPage.tsx successfully updated!');

