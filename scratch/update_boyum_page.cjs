const fs = require('fs');
const path = require('path');

const pagePath = path.join(__dirname, '../src/pages/BoyumITPage.tsx');
let content = fs.readFileSync(pagePath, 'utf8');

// 1. Replace import Modal with ConsultationModal
content = content.replace(
  "import { Modal } from '../components/ui/Modal';",
  "import { ConsultationModal } from '../components/ui/ConsultationModal';"
);

// 2. Remove ContactFormData import
content = content.replace("import { ContactFormData } from '../types';\r\n", "");
content = content.replace("import { ContactFormData } from '../types';\n", "");

// 3. Replace state block & openProductModal
const stateRegex = /  \/\/ Modal & Form State[\s\S]*?const \[isSuccessSubmitted, setIsSuccessSubmitted\] = useState\(false\);\r?\n/m;
const newState = `  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<BoyumProductCard | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);`;

content = content.replace(stateRegex, newState);

// 4. Remove validateForm, handleSubmit, handleInputChange, openProductModal, generateMailtoLink
const handlersRegex = /  const validateForm = \(\): boolean => \{[\s\S]*?return `mailto:\$\{BRAND_INFO\.contact\.email\}\?subject=\$\{subject\}&body=\$\{body\}`;\r?\n  \};\r?\n/m;

const newOpenProductModal = `  const openProductModal = (product: BoyumProductCard) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };`;

content = content.replace(handlersRegex, newOpenProductModal + '\n');

// 5. Replace Modal block with ConsultationModal
const startIdx = content.indexOf('{/* MODAL: BOOK A CONSULTATION FORM');
const endIdx = content.indexOf('</Modal>') + '</Modal>'.length;

if (startIdx !== -1 && endIdx !== -1) {
  const replacement = `{/* REUSABLE ENTERPRISE CONSULTATION MODAL                                    */}
      {/* ========================================================================= */}
      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
        defaultService={selectedProduct ? \`Boyum IT Solutions (\${selectedProduct.name})\` : "Boyum IT Solutions (Beas Manufacturing / Produmex WMS)"}
        title={selectedProduct ? \`Consultation: \${selectedProduct.name}\` : "Book a Boyum IT Consultation"}
        subtitle="Speak directly with an ATLAS Technosoft certified Boyum IT specialist. We will evaluate your current SAP Business One workflow and share tailored implementation recommendations."
      />`;
  content = content.substring(0, startIdx) + replacement + content.substring(endIdx);
  fs.writeFileSync(pagePath, content, 'utf8');
  console.log('✓ Successfully updated BoyumITPage.tsx');
} else {
  console.error('Could not find modal block in BoyumITPage.tsx', { startIdx, endIdx });
}

