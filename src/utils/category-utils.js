const CATEGORY_DECORATIONS = {
  'rx': {
    tagline: 'PCN verified',
    desc: 'Brand and generic prescription drugs dispensed by registered pharmacists.',
    products: ['Antibiotics', 'Antihypertensives', 'Diabetes medications', 'Asthma inhalers'],
  },
  'otc': {
    tagline: 'Everyday essentials',
    desc: 'Trusted medications for common conditions with professional guidance.',
    products: ['Pain relief', 'Cold & flu', 'Allergy relief', 'Digestive care'],
  },
  'vitamins': {
    tagline: 'Premium wellness',
    desc: 'Nutritional supplements to support immunity, energy, and whole-body wellness.',
    products: ['Multivitamins', 'Vitamin C & D', 'Omega-3', 'Probiotics'],
  },
  'baby': {
    tagline: 'Pediatric-gentle',
    desc: 'Pediatric-approved formulations and nutrition products for infants and children.',
    products: ['Infant formulas', 'Baby skincare', 'Pediatric medicines', 'Teething essentials'],
  },
  'personal': {
    tagline: 'Clinical-grade',
    desc: 'High-quality personal hygiene, skincare, oral care and beauty essentials.',
    products: ['Skincare', 'Oral hygiene', 'Feminine care', 'Sun protection'],
  },
  'medical': {
    tagline: 'Home diagnostics',
    desc: 'Home medical devices to monitor, manage and support your health daily.',
    products: ['BP monitors', 'Glucometers', 'Thermometers', 'First-aid kits'],
  },
};

export const decorateCategories = (backendCategories) => {
  return backendCategories.map(cat => ({
    id: cat.slug || cat.id,
    title: cat.name,
    count: 'Live Inventory', // We could potentially fetch counts from backend
    tagline: CATEGORY_DECORATIONS[cat.slug]?.tagline || 'Verified Quality',
    desc: cat.description || CATEGORY_DECORATIONS[cat.slug]?.desc || 'Pharmaceutical grade quality products.',
    products: CATEGORY_DECORATIONS[cat.slug]?.products || []
  }));
};
