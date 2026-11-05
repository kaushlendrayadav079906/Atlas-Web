const fs = require('fs');
const path = require('path');

function updateServicesPage() {
  const filePath = path.join(__dirname, '../src/pages/ServicesPage.tsx');
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace import Modal
  content = content.replace(
    "import { Modal } from '../components/ui/Modal';",
    "import { ConsultationModal } from '../components/ui/ConsultationModal';"
  );
  content = content.replace("import { ContactFormData } from '../types';\r\n", "");
  content = content.replace("import { ContactFormData } from '../types';\n", "");

  // Replace state & handlers
  const oldState = `  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    workEmail: '',
    phoneNumber: '',
    companyName: '',
    areaOfInterest: 'Enterprise Services & Solutions',
    message: ''
  });`;

  const newState = `  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);`;

  content = content.replace(oldState, newState);

  // Remove handleFormSubmit
  const handlersRegex = /  const handleFormSubmit = \(e: React\.FormEvent\) => \{[\s\S]*?      \}\);\r?\n    \}, 2500\);\r?\n  \};\r?\n/m;
  content = content.replace(handlersRegex, '');

  // Replace Modal
  const startIdx = content.indexOf('{/* Consultation Modal */}');
  const endIdx = content.indexOf('</Modal>') + '</Modal>'.length;
  if (startIdx !== -1 && endIdx !== -1) {
    const replacement = `{/* Consultation Modal */}
      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultService="SAP Business One Implementation"
        title="Book a Consultation — ATLAS Technosoft"
      />`;
    content = content.substring(0, startIdx) + replacement + content.substring(endIdx);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('✓ Successfully updated ServicesPage.tsx');
  } else {
    console.error('Could not find modal in ServicesPage.tsx', { startIdx, endIdx });
  }
}

function updateServiceDetailPage() {
  const filePath = path.join(__dirname, '../src/pages/ServiceDetailPage.tsx');
  let content = fs.readFileSync(filePath, 'utf8');

  content = content.replace(
    "import { Modal } from '../components/ui/Modal';",
    "import { ConsultationModal } from '../components/ui/ConsultationModal';"
  );
  content = content.replace("import { ContactFormData } from '../types';\r\n", "");
  content = content.replace("import { ContactFormData } from '../types';\n", "");

  const oldState = `  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    workEmail: '',
    phoneNumber: '',
    companyName: '',
    areaOfInterest: service ? service.title : 'SAP Business One',
    message: ''
  });`;

  const newState = `  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);`;

  content = content.replace(oldState, newState);

  const handlersRegex = /  const handleFormSubmit = \(e: React\.FormEvent\) => \{[\s\S]*?      \}\);\r?\n    \}, 2500\);\r?\n  \};\r?\n/m;
  content = content.replace(handlersRegex, '');

  const startIdx = content.indexOf('{/* INTERACTIVE BOOK A CONSULTATION MODAL');
  const endIdx = content.indexOf('</Modal>') + '</Modal>'.length;
  if (startIdx !== -1 && endIdx !== -1) {
    const replacement = `{/* INTERACTIVE BOOK A CONSULTATION MODAL                                    */}
      {/* ========================================================================= */}
      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultService={service ? \`\${service.title} \${service.titleHighlight}\` : "SAP Business One Implementation"}
        title={\`Book a Consultation — \${service.title}\`}
      />`;
    content = content.substring(0, startIdx) + replacement + content.substring(endIdx);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('✓ Successfully updated ServiceDetailPage.tsx');
  } else {
    console.error('Could not find modal in ServiceDetailPage.tsx', { startIdx, endIdx });
  }
}

function updateIndustryDetailPage() {
  const filePath = path.join(__dirname, '../src/pages/IndustryDetailPage.tsx');
  let content = fs.readFileSync(filePath, 'utf8');

  content = content.replace(
    "import { Modal } from '../components/ui/Modal';",
    "import { ConsultationModal } from '../components/ui/ConsultationModal';"
  );
  content = content.replace("import { ContactFormData } from '../types';\r\n", "");
  content = content.replace("import { ContactFormData } from '../types';\n", "");

  const oldState = `  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    workEmail: '',
    phoneNumber: '',
    companyName: '',
    areaOfInterest: industry ? \`Industry Assessment: \${industry.title}\` : 'Industry Assessment',
    message: ''
  });`;

  const newState = `  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);`;

  content = content.replace(oldState, newState);

  const handlersRegex = /  const handleFormSubmit = \(e: React\.FormEvent\) => \{[\s\S]*?      \}\);\r?\n    \}, 2500\);\r?\n  \};\r?\n/m;
  content = content.replace(handlersRegex, '');

  const startIdx = content.indexOf('{/* INTERACTIVE BOOK A CONSULTATION MODAL');
  const endIdx = content.indexOf('</Modal>') + '</Modal>'.length;
  if (startIdx !== -1 && endIdx !== -1) {
    const replacement = `{/* INTERACTIVE BOOK A CONSULTATION MODAL                                    */}
      {/* ========================================================================= */}
      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultService={industry ? \`Industry Assessment: \${industry.title}\` : "SAP Business One Implementation"}
        title={\`Book Industry Assessment — \${industry.title}\`}
      />`;
    content = content.substring(0, startIdx) + replacement + content.substring(endIdx);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('✓ Successfully updated IndustryDetailPage.tsx');
  } else {
    console.error('Could not find modal in IndustryDetailPage.tsx', { startIdx, endIdx });
  }
}

function updateCaseStudyDetailPage() {
  const filePath = path.join(__dirname, '../src/pages/IndividualCaseStudyPage.tsx');
  let content = fs.readFileSync(filePath, 'utf8');

  content = content.replace(
    "import { Modal } from '../components/ui/Modal';",
    "import { ConsultationModal } from '../components/ui/ConsultationModal';"
  );
  content = content.replace("import { ContactFormData } from '../types';\r\n", "");
  content = content.replace("import { ContactFormData } from '../types';\n", "");

  const oldState = `  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    workEmail: '',
    phoneNumber: '',
    companyName: '',
    areaOfInterest: caseStudy ? \`Case Study Inquiry: \${caseStudy.title}\` : 'Case Study Consultation',
    message: ''
  });`;

  const newState = `  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);`;

  content = content.replace(oldState, newState);

  const handlersRegex = /  const handleFormSubmit = \(e: React\.FormEvent\) => \{[\s\S]*?      \}\);\r?\n    \}, 2500\);\r?\n  \};\r?\n/m;
  content = content.replace(handlersRegex, '');

  const startIdx = content.indexOf('{/* INTERACTIVE BOOK A CONSULTATION MODAL');
  const endIdx = content.indexOf('</Modal>') + '</Modal>'.length;
  if (startIdx !== -1 && endIdx !== -1) {
    const replacement = `{/* INTERACTIVE BOOK A CONSULTATION MODAL                                    */}
      {/* ========================================================================= */}
      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultService={caseStudy ? \`Case Study Inquiry: \${caseStudy.title}\` : "SAP Business One Implementation"}
        title={\`Book a Consultation — \${caseStudy.title}\`}
      />`;
    content = content.substring(0, startIdx) + replacement + content.substring(endIdx);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('✓ Successfully updated IndividualCaseStudyPage.tsx');
  } else {
    console.error('Could not find modal in IndividualCaseStudyPage.tsx', { startIdx, endIdx });
  }
}

function updateContactPageModal() {
  const filePath = path.join(__dirname, '../src/pages/ContactPage.tsx');
  let content = fs.readFileSync(filePath, 'utf8');

  content = content.replace(
    "import { Modal } from '../components/ui/Modal';",
    "import { ConsultationModal } from '../components/ui/ConsultationModal';"
  );

  // In ContactPage, replace the modal block
  const startIdx = content.indexOf('{/* CONSULTATION MODAL');
  const endIdx = content.indexOf('</Modal>') + '</Modal>'.length;
  if (startIdx !== -1 && endIdx !== -1) {
    const replacement = `{/* CONSULTATION MODAL                                                        */}
      {/* ========================================================================= */}
      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        defaultService="SAP Business One Implementation"
      />`;
    content = content.substring(0, startIdx) + replacement + content.substring(endIdx);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('✓ Successfully updated ContactPage.tsx Modal');
  } else {
    console.error('Could not find modal in ContactPage.tsx', { startIdx, endIdx });
  }
}

updateServicesPage();
updateServiceDetailPage();
updateIndustryDetailPage();
updateCaseStudyDetailPage();
updateContactPageModal();

