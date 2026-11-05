const fs = require('fs');
const path = require('path');

const p = path.resolve('src/pages/ContactPage.tsx');
let lines = fs.readFileSync(p, 'utf8').split(/\r?\n/);

const s = lines.findIndex(l => l.includes('const handleModalInputChange ='));
if (s !== -1) {
  lines.splice(s, 11);
}

const insertIdx = lines.findIndex(l => l.includes('const scrollToEnquiryForm ='));
if (insertIdx !== -1) {
  const mailtoCode = [
    '  const createMailtoLink = (data: ContactEnquiryFields) => {',
    '    const subjectLine = encodeURIComponent(`[ATLAS Consultation Enquiry] ${data.companyName} - ${data.service}`);',
    '    const bodyText = encodeURIComponent(',
    '      `Full Name: ${data.fullName}\\n` +',
    '      `Business Email: ${data.email}\\n` +',
    '      `Phone: ${data.phone}\\n` +',
    '      `Company: ${data.companyName}\\n` +',
    '      `Service of Interest: ${data.service}\\n\\n` +',
    '      `Message / Requirements:\\n${data.message}\\n\\n` +',
    '      `Submitted via ATLAS Technosoft Contact Page`',
    '    );',
    '    return `mailto:sales@atlastechnosoft.com?subject=${subjectLine}&body=${bodyText}`;',
    '  };',
    ''
  ];
  lines.splice(insertIdx, 0, ...mailtoCode);
}

fs.writeFileSync(p, lines.join('\n'), 'utf8');
console.log('Fixed ContactPage.tsx successfully');

