export interface LogoSliderItem {
  id: string;
  name: string;
  category: string;
  badge: string;
  route: string;
  logoType: 'sap-b1' | 'boyum-it' | 'uipath' | 'beas' | 'produmex-wms' | 'b1up' | 'sap-hana' | 'produmex-scan';
}

export const LOGO_SLIDER_ITEMS: LogoSliderItem[] = [
  {
    id: 'sap-hana',
    name: 'SAP HANA',
    category: 'In-Memory Platform',
    badge: 'High Performance',
    route: '/services/sap-business-one',
    logoType: 'sap-hana',
  },
  {
    id: 'produmex-scan',
    name: 'Produmex Scan',
    category: 'Mobile RF Barcode Scanning',
    badge: 'Certified Solution',
    route: '/services/boyum-it',
    logoType: 'produmex-scan',
  },
  {
    id: 'sap-business-one',
    name: 'SAP Business One',
    category: 'Enterprise ERP Core',
    badge: 'Authorized Channel Partner',
    route: '/services/sap-business-one',
    logoType: 'sap-b1',
  },
  {
    id: 'boyum-it',
    name: 'Boyum IT',
    category: 'Manufacturing & WMS',
    badge: 'Silver Partner',
    route: '/services/boyum-it',
    logoType: 'boyum-it',
  },
  {
    id: 'uipath',
    name: 'UiPath',
    category: 'Robotic Process Automation',
    badge: 'Silver Partner',
    route: '/services/uipath-automation',
    logoType: 'uipath',
  },
  {
    id: 'beas-manufacturing',
    name: 'Beas Manufacturing',
    category: 'APS & Shop-Floor Execution',
    badge: 'Certified Solution',
    route: '/services/boyum-it',
    logoType: 'beas',
  },
  {
    id: 'produmex-wms',
    name: 'Produmex WMS',
    category: 'Advanced Warehouse Logistics',
    badge: 'Certified Solution',
    route: '/services/boyum-it',
    logoType: 'produmex-wms',
  },
  {
    id: 'b1up',
    name: 'B1 Usability Package',
    category: 'Screen Customization & UX',
    badge: 'Certified Solution',
    route: '/services/boyum-it',
    logoType: 'b1up',
  },
];

