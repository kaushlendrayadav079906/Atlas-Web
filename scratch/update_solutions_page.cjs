const fs = require('fs');
const path = require('path');

const pagePath = path.join(__dirname, '../src/pages/SolutionsPage.tsx');
let content = fs.readFileSync(pagePath, 'utf8');

// 1. Replace import Modal with ConsultationModal
content = content.replace(
  "import { Modal } from '../components/ui/Modal';",
  "import { ConsultationModal } from '../components/ui/ConsultationModal';"
);

// 2. Remove ContactFormData import
content = content.replace("import { ContactFormData } from '../types';\r\n", "");
content = content.replace("import { ContactFormData } from '../types';\n", "");

// 3. Replace state block
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

const newStateBlock = `  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);`;

content = content.replace(oldStateBlock, newStateBlock);

// 4. Remove validateForm, handleInputChange, handleFormSubmit, generateMailtoLink
const handlersRegex = /  const validateForm = \(\): boolean => \{[\s\S]*?return `mailto:\$\{BRAND_INFO\.contact\.email\}\?subject=\$\{subject\}&body=\$\{body\}`;\r?\n  \};\r?\n/m;
content = content.replace(handlersRegex, '');

// 5. Replace Modal block with ConsultationModal
const startIdx = content.indexOf('{/* INTERACTIVE CONSULTATION BOOKING MODAL');
const endIdx = content.indexOf('</Modal>') + '</Modal>'.length;

if (startIdx !== -1 && endIdx !== -1) {
  const replacement = `{/* REUSABLE ENTERPRISE CONSULTATION MODAL                                    */}
      {/* ========================================================================= */}
      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultService="SAP Business One Implementation"
      />`;
  content = content.substring(0, startIdx) + replacement + content.substring(endIdx);
  fs.writeFileSync(pagePath, content, 'utf8');
  console.log('✓ Successfully updated SolutionsPage.tsx');
} else {
  console.error('Could not find modal block in SolutionsPage.tsx', { startIdx, endIdx });
}

