const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'pages', 'ContactPage.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Hero Eyebrow
content = content.replace(
  `text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-[#d99120] select-none`,
  `text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-[#C77A17] select-none`
);

// 2. Hero Heading
content = content.replace(
  `<h1 className="font-serif text-[38px] sm:text-[46px] lg:text-[52px] xl:text-[56px] font-bold tracking-tight leading-[1.14] text-[#10264b]">`,
  `<h1 className="font-serif text-[38px] sm:text-[46px] lg:text-[52px] xl:text-[56px] font-bold tracking-tight leading-[1.14] text-[#142B59]">`
);
content = content.replace(
  `<span className="text-[#d99120]">{CONTACT_HERO_DATA.titleHighlight}</span>`,
  `<span className="text-[#D98219]">{CONTACT_HERO_DATA.titleHighlight}</span>`
);

// 3. Hero Description
content = content.replace(
  `<p className="text-[16px] sm:text-[17px] lg:text-[18px] text-[#354765] leading-relaxed max-w-2xl font-normal">`,
  `<p className="text-[16px] sm:text-[17px] lg:text-[18px] text-[#45546B] leading-relaxed max-w-2xl font-normal">`
);

// 4. Hero Primary Button
content = content.replace(
  `className="inline-flex items-center justify-center gap-2 text-[16px] font-semibold px-8 py-3.5 rounded-xl bg-[#d99120] hover:bg-[#bd7810] text-white shadow-md shadow-amber-600/25 transition-all duration-200 cursor-pointer"`,
  `className="inline-flex items-center justify-center gap-2 text-[16px] font-semibold px-8 py-3.5 rounded-xl bg-[#D98219] hover:bg-[#bd7810] text-white shadow-md shadow-[#D98219]/25 transition-all duration-200 cursor-pointer"`
);

// 5. Hero Secondary Button
content = content.replace(
  `className="inline-flex items-center justify-center gap-2 text-[16px] font-semibold px-8 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#10264b] border border-slate-300 shadow-sm transition-all duration-200 cursor-pointer"`,
  `className="inline-flex items-center justify-center gap-2 text-[16px] font-semibold px-8 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#142B59] border border-slate-300 shadow-sm transition-all duration-200 cursor-pointer"`
);

// 6. Section 2 Get in Touch Header
content = content.replace(
  `<h2 className="font-serif text-[32px] sm:text-[38px] lg:text-[42px] font-bold text-[#10264b] tracking-tight">\n              Get in <span className="text-[#d99120]">Touch</span>\n            </h2>`,
  `<h2 className="font-serif text-[32px] sm:text-[38px] lg:text-[42px] font-bold text-[#142B59] tracking-tight">\n              Get in <span className="text-[#D98219]">Touch</span>\n            </h2>`
);
content = content.replace(
  `<p className="text-[15px] sm:text-[16px] text-slate-600 leading-relaxed font-normal">`,
  `<p className="text-[15px] sm:text-[16px] text-[#45546B] leading-relaxed font-normal">`
);

// Touch cards
content = content.replace(
  `<h3 className="font-serif text-[19px] sm:text-[20px] font-bold text-[#10264b]">\n                    {card.title}\n                  </h3>`,
  `<h3 className="font-serif text-[19px] sm:text-[20px] font-bold text-[#172B50]">\n                    {card.title}\n                  </h3>`
);
content = content.replace(
  `className="text-[15px] sm:text-[16px] font-bold text-[#10264b] hover:text-[#d99120] transition-colors break-words block"`,
  `className="text-[15px] sm:text-[16px] font-bold text-[#142B59] hover:text-[#D98219] transition-colors break-words block"`
);
content = content.replace(
  `<p className="text-[15px] sm:text-[16px] font-bold text-[#10264b]">\n                      {card.primaryValue}\n                    </p>`,
  `<p className="text-[15px] sm:text-[16px] font-bold text-[#142B59]">\n                      {card.primaryValue}\n                    </p>`
);
content = content.replace(
  `<p className="text-[13px] sm:text-[14px] text-slate-500 leading-relaxed pt-1">\n                    {card.description}\n                  </p>`,
  `<p className="text-[13px] sm:text-[14px] text-[#53647A] leading-relaxed pt-1">\n                    {card.description}\n                  </p>`
);

// 7. Section 3 Send Us a Message & Locations Headers
content = content.replace(
  `<h2 className="font-serif text-[28px] sm:text-[34px] font-bold text-[#10264b] tracking-tight">\n                  Send Us a <span className="text-[#d99120]">Message</span>\n                </h2>`,
  `<h2 className="font-serif text-[28px] sm:text-[34px] font-bold text-[#142B59] tracking-tight">\n                  Send Us a <span className="text-[#D98219]">Message</span>\n                </h2>`
);
content = content.replace(
  `<p className="text-[15px] sm:text-[16px] text-slate-600">\n                  Fill in the details below and our team will get back to you shortly.\n                </p>`,
  `<p className="text-[15px] sm:text-[16px] text-[#45546B]">\n                  Fill in the details below and our team will get back to you shortly.\n                </p>`
);
content = content.replace(
  `<h2 className="font-serif text-[28px] sm:text-[34px] font-bold text-[#10264b] tracking-tight">\n                  Our <span className="text-[#d99120]">Locations</span>\n                </h2>`,
  `<h2 className="font-serif text-[28px] sm:text-[34px] font-bold text-[#142B59] tracking-tight">\n                  Our <span className="text-[#D98219]">Locations</span>\n                </h2>`
);
content = content.replace(
  `<p className="text-[15px] sm:text-[16px] text-slate-600">\n                  Visit our offices to meet our team and discuss your business requirements.\n                </p>`,
  `<p className="text-[15px] sm:text-[16px] text-[#45546B]">\n                  Visit our offices to meet our team and discuss your business requirements.\n                </p>`
);

// Location cards
content = content.replace(
  `<h3 className="font-serif text-[18px] sm:text-[19px] font-bold text-[#10264b]">\n                            {office.title}\n                          </h3>`,
  `<h3 className="font-serif text-[18px] sm:text-[19px] font-bold text-[#172B50]">\n                            {office.title}\n                          </h3>`
);
content = content.replace(
  `<p className="text-[13px] sm:text-[14px] text-slate-600 leading-relaxed">\n                          {office.address}\n                        </p>`,
  `<p className="text-[13px] sm:text-[14px] text-[#53647A] leading-relaxed">\n                          {office.address}\n                        </p>`
);
content = content.replace(
  `text-[13px] font-bold text-[#d99120] hover:text-[#bd7810] transition-colors py-1 px-3 rounded-lg border border-[#d99120]/40 hover:border-[#d99120] bg-amber-50/30`,
  `text-[13px] font-bold text-[#D98219] hover:text-[#bd7810] transition-colors py-1 px-3 rounded-lg border border-[#D98219]/40 hover:border-[#D98219] bg-amber-50/30`
);

// Form Button
content = content.replace(
  `className="w-full py-4 rounded-xl bg-[#d99120] hover:bg-[#bd7810] text-white font-bold text-[16px] shadow-md shadow-amber-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"`,
  `className="w-full py-4 rounded-xl bg-[#D98219] hover:bg-[#bd7810] text-white font-bold text-[16px] shadow-md shadow-[#D98219]/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"`
);

// Form Labels
content = content.replace(/font-semibold text-slate-700 mb-1.5/g, 'font-semibold text-[#142B59] mb-1.5');

// Section 4 Why Get in Touch Header
content = content.replace(
  `<h2 className="font-serif text-[30px] sm:text-[36px] lg:text-[40px] font-bold text-[#10264b] tracking-tight">\n              Why Get in <span className="text-[#d99120]">Touch with Us?</span>\n            </h2>`,
  `<h2 className="font-serif text-[30px] sm:text-[36px] lg:text-[40px] font-bold text-[#142B59] tracking-tight">\n              Why Get in <span className="text-[#D98219]">Touch with Us?</span>\n            </h2>`
);
content = content.replace(
  `<p className="text-[15px] sm:text-[16px] text-slate-600 leading-relaxed font-normal">\n              We are committed to understanding your business needs and providing the right technology solutions.\n            </p>`,
  `<p className="text-[15px] sm:text-[16px] text-[#45546B] leading-relaxed font-normal">\n              We are committed to understanding your business needs and providing the right technology solutions.\n            </p>`
);
content = content.replace(
  `<h3 className="font-bold text-[16px] sm:text-[17px] text-[#10264b] leading-snug">\n                    {card.title}\n                  </h3>`,
  `<h3 className="font-bold text-[16px] sm:text-[17px] text-[#172B50] leading-snug">\n                    {card.title}\n                  </h3>`
);
content = content.replace(
  `<p className="text-[12px] sm:text-[13px] text-slate-500 leading-relaxed">\n                    {card.description}\n                  </p>`,
  `<p className="text-[12px] sm:text-[13px] text-[#53647A] leading-relaxed">\n                    {card.description}\n                  </p>`
);

// Replace remaining #10264b with #142B59
content = content.replace(/#10264b/g, '#142B59');
// Replace remaining #354765 with #45546B
content = content.replace(/#354765/g, '#45546B');
// Replace remaining #d99120 with #D98219
content = content.replace(/#d99120/g, '#D98219');

fs.writeFileSync(filePath, content, 'utf8');
console.log('ContactPage.tsx successfully updated!');

