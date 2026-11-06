// Photo pools used as backgrounds for the image feature cards (UI only).
// Each pool groups existing /public images by theme; cards cycle through a pool.

export const CARD_IMAGE_POOLS = {
  technology: [
    '/images/dashboards/executive-command-center.jpg',
    '/images/solutions/solutions_hero_monitor.jpg',
    '/images/dashboards/cfo-pulse.jpg',
    '/images/partners/partners_sap_monitor.jpg',
    '/images/solutions/solutions_integrated_ecosystem.jpg',
    '/images/dashboards/dashboard-preview.jpg',
    '/images/partners/partners_sap_laptop.jpg',
    '/images/solutions/solutions_b1up_interface.jpg',
  ],
  people: [
    '/images/about/about_expertise_hub.jpg',
    '/images/about/about_story_team.jpg',
    '/images/solutions/solutions_sales_handshake.jpg',
    '/images/case_studies/cs_hero_team.jpg',
    '/images/contact/contact_hero_consultation.jpg',
    '/images/partners/partners_hero.jpg',
    '/images/about/about_hero_building.jpg',
    '/images/contact/office_borivali.jpg',
  ],
  manufacturing: [
    '/images/industries/ind_manufacturing.jpg',
    '/images/solutions/solutions_beas_manufacturing.jpg',
    '/images/dashboards/plant-operations.jpg',
    '/images/industries/ind_engineering.jpg',
    '/images/case_studies/cs_featured_manufacturing.jpg',
    '/images/dashboards/multi-plant.jpg',
    '/images/industries/ind_chemicals.jpg',
    '/images/industries/ind_pharma.jpg',
  ],
  warehouse: [
    '/images/solutions/solutions_produmex_wms.jpg',
    '/images/solutions/solutions_wms_operator.jpg',
    '/images/partners/partners_boyum_warehouse.jpg',
    '/images/case_studies/cs_warehouse.jpg',
    '/images/industries/ind_logistics.jpg',
    '/images/partners/partners_produmex.jpg',
    '/images/solutions/solutions_gate_entry_truck.jpg',
    '/images/partners/partners_beas.jpg',
  ],
  finance: [
    '/images/dashboards/cfo-pulse.jpg',
    '/images/dashboards/executive-command-center.jpg',
    '/images/crystal_hd/ind_finance.jpg',
    '/images/case_studies/cs_retail.jpg',
    '/images/solutions/solutions_hero_monitor.jpg',
    '/images/dashboards/dashboard-preview.jpg',
    '/images/industries/ind_retail.jpg',
    '/images/solutions/solutions_sales_handshake.jpg',
  ],
  trading: [
    '/images/industries/ind_trading.jpg',
    '/images/crystal_hd/ind_shipping.jpg',
    '/images/case_studies/cs_trading.jpg',
    '/images/industries/ind_logistics.jpg',
    '/images/solutions/solutions_gate_entry_truck.jpg',
    '/images/industries/ind_food_beverages.jpg',
    '/images/case_studies/cs_warehouse.jpg',
    '/images/industries/ind_retail.jpg',
  ],
  automation: [
    '/images/partners/partners_uipath_robot.jpg',
    '/images/partners/partners_uipath_ai.jpg',
    '/images/solutions/solutions_uipath_robot.jpg',
    '/images/case_studies/cs_automation.jpg',
    '/images/dashboards/executive-command-center.jpg',
    '/images/solutions/solutions_integrated_ecosystem.jpg',
    '/images/solutions/solutions_hero_monitor.jpg',
    '/images/dashboards/dashboard-preview.jpg',
  ],
  boyum: [
    '/images/partners/partners_beas.jpg',
    '/images/partners/partners_produmex.jpg',
    '/images/partners/partners_b1up.jpg',
    '/images/solutions/solutions_b1up_interface.jpg',
    '/images/partners/partners_boyum_warehouse.jpg',
    '/images/solutions/solutions_beas_manufacturing.jpg',
    '/images/solutions/solutions_produmex_wms.jpg',
    '/images/solutions/solutions_wms_operator.jpg',
  ],
} as const;

export type CardImagePool = keyof typeof CARD_IMAGE_POOLS;

/** Pick an image for card `index`, starting at `offset` so neighbouring sections differ. */
export const cardImage = (pool: CardImagePool, index: number, offset = 0): string => {
  const list = CARD_IMAGE_POOLS[pool];
  return list[(index + offset) % list.length];
};

/** Map a route slug (service, industry or partner) to the most fitting pool. */
export const poolForSlug = (slug: string | undefined): CardImagePool => {
  const s = (slug || '').toLowerCase();
  if (s.includes('manufactur')) return 'manufacturing';
  if (s.includes('warehouse') || s.includes('logistic') || s.includes('wms')) return 'warehouse';
  if (s.includes('finance') || s.includes('admin')) return 'finance';
  if (s.includes('trading') || s.includes('shipping')) return 'trading';
  if (s.includes('uipath') || s.includes('automation') || s.includes('rpa')) return 'automation';
  if (s.includes('boyum')) return 'boyum';
  if (s.includes('support') || s.includes('ams') || s.includes('atlas')) return 'people';
  return 'technology';
};
