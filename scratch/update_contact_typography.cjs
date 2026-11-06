const fs = require('fs');
const path = require('path');

const filePath = path.resolve('src/pages/ContactPage.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Callback card & enquiry heading
content = content.replace(
  `<div className="lg:col-span-6 space-y-5">
              <div>
                <span className="text-[13px] font-bold uppercase tracking-wider text-[#1F4FE0] block mb-1">
                  DIRECT ENQUIRY
                </span>
                <h2 className="atlas-h2-size font-serif font-extrabold text-[#0A1B4F]">
                  Send Us an <span className="bg-gradient-to-r from-[#1F4FE0] via-[#1F4FE0] to-[#1F4FE0] bg-clip-text text-transparent font-accent italic font-semibold tracking-[-0.01em] pr-[0.08em]">Enquiry</span>
                </h2>
                <p className="text-[15px] sm:text-[16px] text-[#4A5876] mt-1">
                  Fill in the details below and an ATLAS enterprise consultant will get back to you shortly.
                </p>
              </div>

              {/* Quick Action: Request a Callback Card */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50/70 border border-blue-200/90 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#1F4FE0] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-[#0A1B4F]">
                      Prefer a Direct Phone Call?
                    </h3>
                    <p className="text-[13px] text-[#4A5876] mt-0.5">
                      Choose your preferred date and time slot. Our certified consultants will call you.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCallbackModalOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-blue-50 text-[#1F4FE0] border border-blue-300 font-semibold text-[13.5px] shadow-xs hover:shadow transition-all shrink-0 cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 text-[#1F4FE0]" />
                  <span>Request a Callback</span>
                </button>
              </div>

<div className="bg-white rounded-2xl border border-blue-100/80 shadow-md p-6 sm:p-8 lg:p-9">`,
  `<div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-[14px] sm:text-[15px] font-bold uppercase tracking-wider text-atlas-goldDeep block mb-1">
                  DIRECT ENQUIRY
                </span>
                <h2 className="text-[26px] sm:text-[30px] font-serif font-extrabold text-atlas-navy tracking-tight">
                  Send Us an <span className="text-atlas-goldDeep font-accent italic font-semibold tracking-[-0.01em] pr-[0.08em]">Enquiry</span>
                </h2>
                <p className="text-[16px] sm:text-[17px] text-[#4A5876] mt-1.5 leading-relaxed">
                  Fill in the details below and an ATLAS enterprise consultant will get back to you shortly.
                </p>
              </div>

              {/* Quick Action: Request a Callback Card */}
              <div className="bg-gradient-to-r from-amber-50/70 to-orange-50/50 border border-atlas-creamBorder rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-atlas-gold text-atlas-navy flex items-center justify-center shrink-0 shadow-xs">
                    <PhoneCall className="w-5 h-5 text-atlas-navy" />
                  </div>
                  <div>
                    <h3 className="text-[19px] sm:text-[20px] font-bold text-atlas-navy">
                      Prefer a Direct Phone Call?
                    </h3>
                    <p className="text-[15px] sm:text-[16px] text-[#4A5876] mt-1 leading-relaxed">
                      Choose your preferred date and time slot. Our certified consultants will call you.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCallbackModalOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-atlas-gold hover:bg-[#D4972F] text-atlas-navy font-bold text-[15px] sm:text-[16px] shadow-xs hover:shadow transition-all shrink-0 cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 text-atlas-navy" />
                  <span>Request a Callback</span>
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8 lg:p-9">`
);

// 2. Form labels: 16px, inputs: 16-17px, submit button: 16-17px gold pill
content = content.replace(/text-\[13\.5px\] font-semibold text-\[#0A1B4F\] mb-1\.5/g, 'text-[16px] font-semibold text-atlas-navy mb-2');
content = content.replace(/px-4 py-3 rounded-xl border text-\[14\.5px\]/g, 'px-4 py-3.5 rounded-xl border text-[16px] sm:text-[17px]');
content = content.replace(
  `className="w-full py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-[#1F4FE0] to-[#1F4FE0] hover:from-[#1739B8] hover:to-[#1739B8] text-white font-bold text-[16px] shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"`,
  `className="w-full py-4 rounded-full bg-atlas-gold hover:bg-[#D4972F] text-atlas-navy font-bold text-[16px] sm:text-[17px] shadow-[0_4px_14px_rgba(224,163,59,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed active:scale-[0.99]"`
);

// 3. Right column: Office locations headings and details
content = content.replace(
  `<div id="locations" className="lg:col-span-6 space-y-5">
              <div>
                <span className="text-[13px] font-bold uppercase tracking-wider text-[#1F4FE0] block mb-1">
                  OFFICE LOCATIONS
                </span>
                <h2 className="atlas-h2-size font-serif font-extrabold text-[#0A1B4F]">
                  Visit Our <span className="bg-gradient-to-r from-[#1F4FE0] via-[#1F4FE0] to-[#1F4FE0] bg-clip-text text-transparent font-accent italic font-semibold tracking-[-0.01em] pr-[0.08em]">Offices</span>
                </h2>
                <p className="text-[15px] sm:text-[16px] text-[#4A5876] mt-1">
                  Visit our Mumbai corporate offices to consult with our leadership and solution specialists in person.
                </p>
              </div>`,
  `<div id="locations" className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-[14px] sm:text-[15px] font-bold uppercase tracking-wider text-atlas-goldDeep block mb-1">
                  OFFICE LOCATIONS
                </span>
                <h2 className="text-[26px] sm:text-[30px] font-serif font-extrabold text-atlas-navy tracking-tight">
                  Visit Our <span className="text-atlas-goldDeep font-accent italic font-semibold tracking-[-0.01em] pr-[0.08em]">Offices</span>
                </h2>
                <p className="text-[16px] sm:text-[17px] text-[#4A5876] mt-1.5 leading-relaxed">
                  Visit our Mumbai corporate offices to consult with our leadership and solution specialists in person.
                </p>
              </div>`
);

content = content.replace(
  `<div className="p-4 sm:p-5 space-y-2.5">
                        <div className="flex items-center gap-2 text-[#1F4FE0]">
                          <MapPin className="w-4.5 h-4.5 shrink-0" />
                          <h3 className="font-serif text-[17px] sm:text-[18px] font-bold text-[#0A1B4F]">
                            {office.title}
                          </h3>
                        </div>

                        <p className="text-[13px] text-[#4A5876] leading-relaxed">
                          {office.address}
                        </p>

                        <div className="pt-1">
                          <a
                            href={office.googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[12.5px] font-bold text-[#1F4FE0] hover:text-[#1F4FE0] transition-colors py-1 px-3 rounded-lg border border-blue-200 hover:border-[#1F4FE0] bg-blue-50/50"
                          >
                            <span>Open in Google Maps</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>`,
  `<div className="p-5 sm:p-6 space-y-3">
                        <div className="flex items-center gap-2 text-atlas-goldDeep">
                          <MapPin className="w-5 h-5 shrink-0" />
                          <h3 className="font-serif text-[19px] sm:text-[21px] font-bold text-atlas-navy">
                            {office.title}
                          </h3>
                        </div>

                        <p className="text-[16px] sm:text-[17px] text-[#4A5876] leading-relaxed">
                          {office.address}
                        </p>

                        <div className="pt-1.5">
                          <a
                            href={office.googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-[14px] sm:text-[15px] font-bold text-atlas-navy hover:text-atlas-navy transition-colors py-2 px-4 rounded-lg border border-atlas-creamBorder bg-atlas-goldTint hover:bg-atlas-gold shadow-2xs"
                          >
                            <span>Open in Google Maps</span>
                            <ArrowRight className="w-4 h-4" />
                          </a>
                        </div>
                      </div>`
);

// 4. Section 4: Why connect with ATLAS Technosoft? (Heading: 26-30px, Description: 16-18px)
content = content.replace(
  `<div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12">
            <div className="mb-2.5">
              <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-[#1F4FE0] select-none">
                VALUE COMMITMENT
              </span>
            </div>
            <h2 className="atlas-h2-size font-serif font-extrabold text-[#0A1B4F]">
              Why Connect with{' '}
              <span className="bg-gradient-to-r from-[#1F4FE0] via-[#1F4FE0] to-[#1F4FE0] bg-clip-text text-transparent font-accent italic font-semibold tracking-[-0.01em] pr-[0.08em]">
                ATLAS Technosoft?
              </span>
            </h2>
            <p className="mt-3 text-[15px] sm:text-[17px] text-[#4A5876] leading-relaxed">
              We combine deep ERP domain expertise with agile automation to deliver measurable, lasting business impact.
            </p>
          </div>`,
  `<div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12">
            <div className="mb-2.5">
              <span className="text-[14px] sm:text-[15px] font-bold uppercase tracking-wider text-atlas-goldDeep select-none">
                VALUE COMMITMENT
              </span>
            </div>
            <h2 className="text-[26px] sm:text-[30px] font-serif font-extrabold text-atlas-navy tracking-tight">
              Why Connect with{' '}
              <span className="text-atlas-goldDeep font-accent italic font-semibold tracking-[-0.01em] pr-[0.08em]">
                ATLAS Technosoft?
              </span>
            </h2>
            <p className="mt-3 text-[16px] sm:text-[18px] text-[#4A5876] leading-relaxed">
              We combine deep ERP domain expertise with agile automation to deliver measurable, lasting business impact.
            </p>
          </div>`
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated ContactPage.tsx typography!');

