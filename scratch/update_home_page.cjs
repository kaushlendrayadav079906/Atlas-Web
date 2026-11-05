const fs = require('fs');
const path = require('path');

const homePath = path.join(__dirname, '../src/pages/HomePage.tsx');
let content = fs.readFileSync(homePath, 'utf8');

// 1. Replace Modal import with ConsultationModal
content = content.replace(
  "import { Modal } from '../components/ui/Modal';",
  "import { ConsultationModal } from '../components/ui/ConsultationModal';"
);

// 2. Remove ContactFormData import
content = content.replace("import { ContactFormData } from '../types';\r\n", "");
content = content.replace("import { ContactFormData } from '../types';\n", "");

// 3. Replace form state and openConsultationFor
const oldStateBlock = `  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    companyName: '',
    workEmail: '',
    phoneNumber: '',
    areaOfInterest: 'sap-b1',
    message: ''
  });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessSubmitted, setIsSuccessSubmitted] = useState(false);`;

const newStateBlock = `  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('SAP Business One Implementation');
  const [showScrollTop, setShowScrollTop] = useState(false);`;

content = content.replace(oldStateBlock, newStateBlock);

// 4. Update openConsultationFor
const oldOpenFunc = `  const openConsultationFor = (area: string) => {
    setFormData(prev => ({ ...prev, areaOfInterest: area }));
    setIsModalOpen(true);
  };`;

const newOpenFunc = `  const openConsultationFor = (area: string) => {
    setSelectedService(area);
    setIsModalOpen(true);
  };`;

content = content.replace(oldOpenFunc, newOpenFunc);

// 5. Remove validateForm, handleInputChange, handleFormSubmit, generateMailtoLink
const formHandlersRegex = /  \/\/ Form Field Validation\r?\n  const validateForm = \(\): boolean => \{[\s\S]*?return `mailto:\$\{BRAND_INFO\.contact\.email\}\?subject=\$\{subject\}&body=\$\{body\}`;\r?\n  \};\r?\n/m;
content = content.replace(formHandlersRegex, '');

// 6. Replace Modal block with ConsultationModal
const startIdx = content.indexOf('{/* INTERACTIVE CONSULTATION BOOKING MODAL');
const endIdx = content.indexOf('</Modal>') + '</Modal>'.length;

if (startIdx !== -1 && endIdx !== -1) {
  const replacement = `{/* REUSABLE ENTERPRISE CONSULTATION MODAL                                    */}
      {/* ========================================================================= */}
      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultService={selectedService}
      />`;
  content = content.substring(0, startIdx) + replacement + content.substring(endIdx);
  fs.writeFileSync(homePath, content, 'utf8');
  console.log('✓ Successfully updated HomePage.tsx');
} else {
  console.error('Could not find modal block in HomePage.tsx', { startIdx, endIdx });
}

