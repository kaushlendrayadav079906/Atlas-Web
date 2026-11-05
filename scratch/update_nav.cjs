const fs = require('fs');

// 1. Update MegaMenuDropdown.tsx
let p1 = 'src/components/layout/MegaMenuDropdown.tsx';
let c1 = fs.readFileSync(p1, 'utf8');
if (!c1.includes('Ship,')) {
  c1 = c1.replace(/HelpCircle,?\r?\n\} from 'lucide-react';/, "HelpCircle,\n  Ship,\n} from 'lucide-react';");
  c1 = c1.replace(/HelpCircle,?\r?\n\};/, "HelpCircle,\n  Ship,\n};");
  fs.writeFileSync(p1, c1, 'utf8');
  console.log('Updated MegaMenuDropdown.tsx');
}

// 2. Update SiteHeader.tsx
let p2 = 'src/components/layout/SiteHeader.tsx';
let c2 = fs.readFileSync(p2, 'utf8');
if (!c2.includes('Ship,')) {
  c2 = c2.replace(/HelpCircle\r?\n\} from 'lucide-react';/, "HelpCircle,\n  Ship\n} from 'lucide-react';");
  c2 = c2.replace(/HelpCircle,?\r?\n\};/, "HelpCircle,\n  Ship,\n};");
  fs.writeFileSync(p2, c2, 'utf8');
  console.log('Updated SiteHeader.tsx');
}

