import re

path = 'src/pages/HomePage.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Update CustomerStoryItem interface to include objectPosition
old_interface = r'export interface CustomerStoryItem \{.*?\n\}'
new_interface = """export interface CustomerStoryItem {
  id: string;
  category: string;
  quote: string;
  designation: string;
  companyCategory: string;
  imageSrc: string;
  objectPosition?: string;
  caseStudyUrl: string;
  verificationNote: string;
}"""
content = re.sub(old_interface, new_interface, content, flags=re.DOTALL)

# Update CUSTOMER_STORIES with high-res HD image files
old_stories = r'export const CUSTOMER_STORIES: CustomerStoryItem\[\] = \[.*?\n\];'
new_stories = """export const CUSTOMER_STORIES: CustomerStoryItem[] = [
  {
    id: 'warehouse-management',
    category: 'Warehouse Management',
    quote: 'Deploying Produmex WMS with SAP Business One transformed our fulfillment. Dispatch errors dropped significantly, and warehouse throughput increased by over 40%.',
    designation: 'Supply Chain & Logistics Director',
    companyCategory: 'Industrial Distribution Sector',
    imageSrc: '/images/case_studies/cs_warehouse.jpg',
    objectPosition: '50% 40%',
    caseStudyUrl: '/case-studies/warehouse-management',
    verificationNote: 'Sample Enterprise Story · Logistics'
  },
  {
    id: 'trading-distribution',
    category: 'Trading & Distribution',
    quote: 'The multi-currency reconciliation and automated landed-cost tracking unified our import-export operations across four distribution centers with live visibility.',
    designation: 'Head of International Trade',
    companyCategory: 'Global Commodity & Trading Group',
    imageSrc: '/images/crystal_hd/ind_shipping.jpg',
    objectPosition: 'center 45%',
    caseStudyUrl: '/case-studies/trading-operations',
    verificationNote: 'Sample Enterprise Story · Trading'
  },
  {
    id: 'retail-wholesale',
    category: 'Retail & Wholesale',
    quote: 'Our omnichannel inventory synchronization between retail storefronts and central warehousing eliminated stockouts and gave our management instant cash-flow control.',
    designation: 'Retail Operations Director',
    companyCategory: 'Multi-Store Retail Chain',
    imageSrc: '/images/solutions/solutions_sales_handshake.jpg',
    objectPosition: 'center 35%',
    caseStudyUrl: '/case-studies/inventory-visibility',
    verificationNote: 'Sample Enterprise Story · Retail'
  },
  {
    id: 'manufacturing',
    category: 'Manufacturing',
    quote: 'Beas Manufacturing integration with SAP Business One gave our production floor live shop-floor data capture, job costing precision, and flawless BOM scheduling.',
    designation: 'Plant & Production Manager',
    companyCategory: 'Precision Component Manufacturing',
    imageSrc: '/images/case_studies/cs_featured_manufacturing.jpg',
    objectPosition: 'center 40%',
    caseStudyUrl: '/case-studies/warehouse-management',
    verificationNote: 'Sample Enterprise Story · Manufacturing'
  },
  {
    id: 'finance-administration',
    category: 'Finance & Administration',
    quote: 'Automated invoice approvals and instant bank reconciliations cut our month-end financial closing time from ten days to under 48 hours without increasing headcount.',
    designation: 'Chief Financial Officer',
    companyCategory: 'Commercial Services Group',
    imageSrc: '/images/crystal_hd/ind_finance.jpg',
    objectPosition: 'center 35%',
    caseStudyUrl: '/case-studies/business-process-automation',
    verificationNote: 'Sample Enterprise Story · Finance'
  },
  {
    id: 'business-process-automation',
    category: 'Business Process Automation',
    quote: 'UiPath software robots implemented by ATLAS now process our routine vendor validations and transactional entries 24/7 with zero processing errors.',
    designation: 'Head of Digital Transformation',
    companyCategory: 'Enterprise Logistics & Supply',
    imageSrc: '/images/solutions/solutions_uipath_robot.jpg',
    objectPosition: 'center 40%',
    caseStudyUrl: '/case-studies/business-process-automation',
    verificationNote: 'Sample Enterprise Story · RPA & AI'
  }
];"""
content = re.sub(old_stories, new_stories, content, flags=re.DOTALL)

# In Section 8 JSX, ensure objectPosition is passed and container has max-w-[1320px]
old_card_jsx = r'<TestimonialCard\s+key=\{story\.id\}.*?/>'
new_card_jsx = """<TestimonialCard
                          key={story.id}
                          id={story.id}
                          category={story.category}
                          quote={story.quote}
                          author={story.designation}
                          companyCategory={story.companyCategory}
                          imageSrc={story.imageSrc}
                          objectPosition={story.objectPosition}
                          to={story.caseStudyUrl}
                          verificationNote={story.verificationNote}
                        />"""
content = re.sub(old_card_jsx, new_card_jsx, content, flags=re.DOTALL)

# Update container max-w-6xl to max-w-[1320px]
content = content.replace(
    'className="relative max-w-6xl mx-auto px-3 sm:px-4 md:px-14 lg:px-16"',
    'className="relative max-w-[1320px] mx-auto px-3 sm:px-4 md:px-14 lg:px-16"'
)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated HomePage.tsx successfully with HD images and layout fixes")

