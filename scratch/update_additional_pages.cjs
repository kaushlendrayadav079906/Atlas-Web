const fs = require('fs');
const path = require('path');

// 1. CaseStudiesPage.tsx
{
  const filePath = path.resolve('src/pages/CaseStudiesPage.tsx');
  let content = fs.readFileSync(filePath, 'utf8');

  // Add ConsultationModal import
  if (!content.includes('import { ConsultationModal }')) {
    content = content.replace("import { Modal } from '../components/ui/Modal';", "import { Modal } from '../components/ui/Modal';\nimport { ConsultationModal } from '../components/ui/ConsultationModal';");
  }

  // Remove unused ContactFormData import
  content = content.replace("import { ContactFormData } from '../types';\n", "");

  // Remove formData, formErrors, isSubmitting, isSuccessSubmitted
  content = content.replace(/\s*\/\/ Form State[\s\S]*?const handleFormSubmit = \(e: React\.FormEvent\) => \{[\s\S]*?\};\n/m, '\n');

  // Replace Consultation Modal
  const modalStart = content.indexOf('{/* CONSULTATION BOOKING MODAL');
  if (modalStart !== -1) {
    const modalEnd = content.indexOf('</Modal>', modalStart);
    if (modalEnd !== -1) {
      const before = content.substring(0, modalStart);
      const after = content.substring(modalEnd + '</Modal>'.length);
      const replacement = `{/* REUSABLE ENTERPRISE CONSULTATION MODAL */}
      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        defaultService="SAP Business One Implementation"
        title="Book a Case Study Consultation"
      />`;
      content = before + replacement + after;
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Updated CaseStudiesPage.tsx');
}

// 2. IndustriesPage.tsx
{
  const filePath = path.resolve('src/pages/IndustriesPage.tsx');
  let content = fs.readFileSync(filePath, 'utf8');

  // Add ConsultationModal import
  if (!content.includes('import { ConsultationModal }')) {
    content = content.replace("import { Modal } from '../components/ui/Modal';", "import { Modal } from '../components/ui/Modal';\nimport { ConsultationModal } from '../components/ui/ConsultationModal';");
  }

  // Remove unused ContactFormData import
  content = content.replace("import { ContactFormData } from '../types';\n", "");

  // Remove formData, formErrors, isSubmitting, isSuccessSubmitted
  content = content.replace(/\s*\/\/ Form State[\s\S]*?const handleFormSubmit = \(e: React\.FormEvent\) => \{[\s\S]*?\};\n/m, '\n');

  // Replace MODAL 2: CONSULTATION BOOKING MODAL
  const modalStart = content.indexOf('{/* MODAL 2: CONSULTATION BOOKING MODAL');
  if (modalStart !== -1) {
    const modalEnd = content.indexOf('</Modal>', modalStart);
    if (modalEnd !== -1) {
      const before = content.substring(0, modalStart);
      const after = content.substring(modalEnd + '</Modal>'.length);
      const replacement = `{/* REUSABLE ENTERPRISE CONSULTATION MODAL */}
      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        defaultService={selectedIndustry ? \`Industry Assessment: \${selectedIndustry.title}\` : "SAP Business One Implementation"}
        title="Book an Industry Consultation"
      />`;
      content = before + replacement + after;
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Updated IndustriesPage.tsx');
}

// 3. PartnersPage.tsx
{
  const filePath = path.resolve('src/pages/PartnersPage.tsx');
  let content = fs.readFileSync(filePath, 'utf8');

  // Add ConsultationModal import
  if (!content.includes('import { ConsultationModal }')) {
    content = content.replace("import { Modal } from '../components/ui/Modal';", "import { Modal } from '../components/ui/Modal';\nimport { ConsultationModal } from '../components/ui/ConsultationModal';");
  }

  // Remove unused ContactFormData import
  content = content.replace("import { ContactFormData } from '../types';\n", "");

  // Remove formData, formErrors, isSubmitting, isSuccessSubmitted
  content = content.replace(/\s*\/\/ Form state[\s\S]*?const handleFormSubmit = \(e: React\.FormEvent\) => \{[\s\S]*?\};\n/m, '\n');

  // Replace Consultation Modal
  const modalStart = content.indexOf('{/* CONSULTATION BOOKING MODAL');
  if (modalStart !== -1) {
    const modalEnd = content.indexOf('</Modal>', modalStart);
    if (modalEnd !== -1) {
      const before = content.substring(0, modalStart);
      const after = content.substring(modalEnd + '</Modal>'.length);
      const replacement = `{/* REUSABLE ENTERPRISE CONSULTATION MODAL */}
      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        defaultService="SAP Business One Partner Ecosystem"
        title="Book a Partner Consultation"
      />`;
      content = before + replacement + after;
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Updated PartnersPage.tsx');
}

// 4. IndividualPartnerPage.tsx
{
  const filePath = path.resolve('src/pages/IndividualPartnerPage.tsx');
  let content = fs.readFileSync(filePath, 'utf8');

  // Add ConsultationModal import
  if (!content.includes('import { ConsultationModal }')) {
    content = content.replace("import { Modal } from '../components/ui/Modal';", "import { Modal } from '../components/ui/Modal';\nimport { ConsultationModal } from '../components/ui/ConsultationModal';");
  }

  // Remove unused ContactFormData import
  content = content.replace("import { ContactFormData } from '../types';\n", "");

  // Remove formData, formErrors, isSubmitting, isSuccessSubmitted
  content = content.replace(/\s*const \[formData, setFormData\] = useState<ContactFormData>\(\{[\s\S]*?const handleFormSubmit = \(e: React\.FormEvent\) => \{[\s\S]*?\};\n/m, '\n');

  // Replace Consultation Modal
  const modalStart = content.indexOf('{/* INTERACTIVE CONSULTATION BOOKING MODAL');
  if (modalStart !== -1) {
    const modalEnd = content.indexOf('</Modal>', modalStart);
    if (modalEnd !== -1) {
      const before = content.substring(0, modalStart);
      const after = content.substring(modalEnd + '</Modal>'.length);
      const replacement = `{/* REUSABLE ENTERPRISE CONSULTATION MODAL */}
      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        defaultService={partner ? \`Partner Consultation: \${partner.name}\` : "SAP Business One Implementation"}
        title={partner ? \`Book a \${partner.name} Consultation\` : "Book a Partner Consultation"}
      />`;
      content = before + replacement + after;
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Updated IndividualPartnerPage.tsx');
}

