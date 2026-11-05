const fs = require('fs');
const path = require('path');

// 1. BoyumITPage.tsx
{
  const filePath = path.resolve('src/pages/BoyumITPage.tsx');
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/setFormData\(prev => \(\{[\s\S]*?\}\)\);\s*setIsModalOpen\(true\);/g, 'setIsModalOpen(true);');
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Fixed BoyumITPage.tsx');
}

// 2. HomePage.tsx
{
  const filePath = path.resolve('src/pages/HomePage.tsx');
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Ensure selectedService is defined after isModalOpen
  if (!content.includes('const [selectedService, setSelectedService]')) {
    content = content.replace(
      'const [isModalOpen, setIsModalOpen] = useState(false);',
      'const [isModalOpen, setIsModalOpen] = useState(false);\n  const [selectedService, setSelectedService] = useState("SAP Business One Implementation");'
    );
  }
  
  // Remove leftover formData, formErrors, isSubmitting, isSuccessSubmitted
  content = content.replace(/\s*const \[formData, setFormData\] = useState<ContactFormData>\(\{[\s\S]*?\}\);/g, '');
  content = content.replace(/\s*const \[formErrors, setFormErrors\] = useState<Partial<Record<keyof ContactFormData, string>>>\(\{\}\);/g, '');
  content = content.replace(/\s*const \[isSubmitting, setIsSubmitting\] = useState\(false\);/g, '');
  content = content.replace(/\s*const \[isSuccessSubmitted, setIsSuccessSubmitted\] = useState\(false\);/g, '');
  content = content.replace(/\s*const openConsultationFor = \(area: string\) => \{[\s\S]*?\};\n/g, '\n');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Fixed HomePage.tsx');
}

// 3. IndividualCaseStudyPage.tsx
{
  const filePath = path.resolve('src/pages/IndividualCaseStudyPage.tsx');
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/\s*const \[formSubmitted, setFormSubmitted\] = useState\(false\);/g, '');
  content = content.replace(/\s*const \[formData, setFormData\] = useState<ContactFormData>\(\{[\s\S]*?\}\);/g, '');
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Fixed IndividualCaseStudyPage.tsx');
}

// 4. IndustryDetailPage.tsx
{
  const filePath = path.resolve('src/pages/IndustryDetailPage.tsx');
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/\s*const \[formSubmitted, setFormSubmitted\] = useState\(false\);/g, '');
  content = content.replace(/\s*const \[formData, setFormData\] = useState<ContactFormData>\(\{[\s\S]*?\}\);/g, '');
  
  if (!content.includes('const [selectedService, setSelectedService]')) {
    content = content.replace(
      'const [isModalOpen, setIsModalOpen] = useState(false);',
      'const [isModalOpen, setIsModalOpen] = useState(false);\n  const [selectedService, setSelectedService] = useState(industry ? `Industry Assessment: ${industry.title}` : "Industry Assessment");'
    );
  }

  content = content.replace(
    /setFormData\(prev => \(\{ \.\.\.prev, areaOfInterest: `\$\{industry\.title\} - \$\{cap\.title\}` \}\)\);/g,
    'setSelectedService(`${industry.title} - ${cap.title}`);'
  );

  content = content.replace(
    'defaultService={industry ? `Industry Assessment: ${industry.title}` : "SAP Business One Implementation"}',
    'defaultService={selectedService}'
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Fixed IndustryDetailPage.tsx');
}

// 5. ServiceDetailPage.tsx
{
  const filePath = path.resolve('src/pages/ServiceDetailPage.tsx');
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/\s*const \[formSubmitted, setFormSubmitted\] = useState\(false\);/g, '');
  content = content.replace(/\s*const \[formData, setFormData\] = useState<ContactFormData>\(\{[\s\S]*?\}\);/g, '');

  if (!content.includes('const [selectedService, setSelectedService]')) {
    content = content.replace(
      'const [isModalOpen, setIsModalOpen] = useState(false);',
      'const [isModalOpen, setIsModalOpen] = useState(false);\n  const [selectedService, setSelectedService] = useState(service ? service.title : "SAP Business One");'
    );
  }

  content = content.replace(
    /setFormData\(prev => \(\{ \.\.\.prev, areaOfInterest: `\$\{service\.title\} - \$\{cap\.title\}` \}\)\);/g,
    'setSelectedService(`${service.title} - ${cap.title}`);'
  );

  content = content.replace(
    'defaultService={service ? `${service.title} ${service.titleHighlight}` : "SAP Business One Implementation"}',
    'defaultService={selectedService}'
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Fixed ServiceDetailPage.tsx');
}

// 6. ServicesPage.tsx
{
  const filePath = path.resolve('src/pages/ServicesPage.tsx');
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/\s*const \[formSubmitted, setFormSubmitted\] = useState\(false\);/g, '');
  content = content.replace(/\s*const \[formData, setFormData\] = useState<ContactFormData>\(\{[\s\S]*?\}\);/g, '');
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Fixed ServicesPage.tsx');
}

// 7. SolutionsPage.tsx
{
  const filePath = path.resolve('src/pages/SolutionsPage.tsx');
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/\s*const \[formData, setFormData\] = useState<ContactFormData>\(\{[\s\S]*?\}\);/g, '');
  content = content.replace(/\s*const \[formErrors, setFormErrors\] = useState<Partial<Record<keyof ContactFormData, string>>>\(\{\}\);/g, '');
  content = content.replace(/\s*const \[isSubmitting, setIsSubmitting\] = useState\(false\);/g, '');
  content = content.replace(/\s*const \[isSuccessSubmitted, setIsSuccessSubmitted\] = useState\(false\);/g, '');
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Fixed SolutionsPage.tsx');
}

