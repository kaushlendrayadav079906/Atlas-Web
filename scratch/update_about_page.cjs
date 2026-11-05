const fs = require('fs');
const path = require('path');

const aboutPath = path.join(__dirname, '../src/pages/AboutPage.tsx');
let content = fs.readFileSync(aboutPath, 'utf8');

const startIndex = content.indexOf('{/* INTERACTIVE CONSULTATION BOOKING MODAL');
const endIndex = content.indexOf('</Modal>') + '</Modal>'.length;

if (startIndex !== -1 && endIndex !== -1) {
  const replacement = `{/* REUSABLE ENTERPRISE CONSULTATION MODAL                                    */}
      {/* ========================================================================= */}
      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultService="SAP Business One Implementation"
      />`;
  
  content = content.substring(0, startIndex) + replacement + content.substring(endIndex);
  fs.writeFileSync(aboutPath, content, 'utf8');
  console.log('✓ Successfully replaced Modal in AboutPage.tsx');
} else {
  console.error('Could not find modal block:', { startIndex, endIndex });
}
