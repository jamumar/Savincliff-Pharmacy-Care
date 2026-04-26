export const CATEGORIES = [
  { id: 'all', label: 'All Products' },
  { id: 'rx', label: 'Prescription Rx' },
  { id: 'otc', label: 'Over-the-Counter' },
  { id: 'vitamins', label: 'Vitamins & Supplements' },
  { id: 'baby', label: 'Baby & Child Care' },
  { id: 'personal', label: 'Personal Care' },
  { id: 'medical', label: 'Medical Supplies' },
];

export const PRODUCTS = [
  // OTC
  { id: 1, name: 'Paracetamol 500mg', brand: 'Emzor', category: 'otc', price: 350, unit: 'Pack of 20', badge: 'Bestseller', desc: 'Fast-acting pain reliever and fever reducer. Suitable for adults and children over 12.', tags: ['Pain Relief', 'Fever'], img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80', inStock: true },
  { id: 2, name: 'Ibuprofen 400mg', brand: 'May & Baker', category: 'otc', price: 480, unit: 'Pack of 24', badge: null, desc: 'Anti-inflammatory for pain, swelling, and fever. Take with food.', tags: ['Pain Relief', 'Anti-inflammatory'], img: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&q=80', inStock: true },
  { id: 3, name: 'Loratadine 10mg', brand: 'Fidson', category: 'otc', price: 620, unit: 'Pack of 10', badge: 'New', desc: 'Non-drowsy antihistamine for seasonal allergies, hay fever, and hives.', tags: ['Allergy', 'Antihistamine'], img: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=400&q=80', inStock: true },
  { id: 4, name: 'Antacid Suspension', brand: 'GSK', category: 'otc', price: 890, unit: '200ml Bottle', badge: null, desc: 'Fast-acting relief from heartburn, indigestion, and acid reflux.', tags: ['Digestive', 'Antacid'], img: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&q=80', inStock: true },
  { id: 5, name: 'ORS Sachet', brand: 'Nestlé Health', category: 'otc', price: 150, unit: 'Per sachet', badge: 'Essential', desc: 'Oral rehydration salts for diarrhoea, vomiting, and dehydration.', tags: ['Hydration', 'Diarrhoea'], img: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&q=80', inStock: true },
  { id: 6, name: 'Cough Syrup (Adult)', brand: 'Swiss Pharma', category: 'otc', price: 1200, unit: '100ml Bottle', badge: null, desc: 'Soothes dry and productive coughs. Non-drowsy formula.', tags: ['Cold & Flu', 'Cough'], img: 'https://images.unsplash.com/photo-1576671081837-49000212a370?w=400&q=80', inStock: false },

  // Vitamins
  { id: 7, name: 'Vitamin C 1000mg', brand: 'Bayer', category: 'vitamins', price: 1800, unit: 'Bottle of 60', badge: 'Popular', desc: 'High-strength Vitamin C with zinc for immune support and skin health.', tags: ['Immunity', 'Vitamin C'], img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80', inStock: true },
  { id: 8, name: 'Multivitamin Complete', brand: 'Abbott', category: 'vitamins', price: 3200, unit: 'Bottle of 90', badge: 'Bestseller', desc: 'Complete daily multivitamin with 23 essential nutrients for overall health.', tags: ['Multivitamin', 'Daily Wellness'], img: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&q=80', inStock: true },
  { id: 9, name: 'Omega-3 Fish Oil', brand: 'Novartis', category: 'vitamins', price: 2700, unit: 'Bottle of 60', badge: null, desc: 'Premium omega-3 for heart, brain, and joint health.', tags: ['Omega-3', 'Heart Health'], img: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&q=80', inStock: true },
  { id: 10, name: 'Vitamin D3 5000IU', brand: 'Pfizer', category: 'vitamins', price: 2100, unit: 'Bottle of 30', badge: 'New', desc: 'High-potency Vitamin D3 for bone health, immunity, and mood support.', tags: ['Vitamin D', 'Bone Health'], img: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=400&q=80', inStock: true },
  { id: 11, name: 'Probiotic Daily', brand: 'Sanofi', category: 'vitamins', price: 3800, unit: 'Bottle of 30', badge: null, desc: '10 billion CFU probiotic for gut health and digestive balance.', tags: ['Probiotics', 'Gut Health'], img: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&q=80', inStock: true },

  // Baby
  { id: 12, name: 'Infant Formula Stage 1', brand: 'Nestlé Health', category: 'baby', price: 5500, unit: '400g Tin', badge: 'Essential', desc: 'Complete nutrition for infants 0–6 months. DHA and ARA enriched.', tags: ['Infant', 'Formula'], img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80', inStock: true },
  { id: 13, name: 'Baby Paracetamol Syrup', brand: 'Emzor', category: 'baby', price: 650, unit: '60ml Bottle', badge: null, desc: 'Gentle fever and pain relief for infants and toddlers aged 2–12 months.', tags: ['Fever', 'Infant'], img: 'https://images.unsplash.com/photo-1576671081837-49000212a370?w=400&q=80', inStock: true },
  { id: 14, name: 'Baby Moisturizing Lotion', brand: 'J&J', category: 'baby', price: 1400, unit: '200ml Pump', badge: 'Popular', desc: 'Gentle, clinically tested moisturizer for soft, healthy baby skin.', tags: ['Skincare', 'Baby'], img: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&q=80', inStock: true },

  // Personal Care
  { id: 15, name: 'SPF 50 Sunscreen', brand: 'Bayer', category: 'personal', price: 2800, unit: '100ml Tube', badge: 'New', desc: 'Broad-spectrum UVA/UVB protection. Water-resistant up to 4 hours.', tags: ['Sun Protection', 'Skincare'], img: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&q=80', inStock: true },
  { id: 16, name: 'Antiseptic Mouthwash', brand: 'P&G', category: 'personal', price: 1100, unit: '500ml Bottle', badge: null, desc: 'Kills 99.9% of germs for fresh breath and gum protection.', tags: ['Oral Care', 'Hygiene'], img: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&q=80', inStock: true },
  { id: 17, name: 'Hand Sanitizer 70%', brand: 'Swiss Pharma', category: 'personal', price: 750, unit: '250ml Bottle', badge: null, desc: '70% ethanol gel sanitizer for effective hand hygiene on-the-go.', tags: ['Hygiene', 'Sanitizer'], img: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=400&q=80', inStock: true },

  // Medical Supplies
  { id: 18, name: 'Digital Blood Pressure Monitor', brand: 'Abbott', category: 'medical', price: 18500, unit: 'Device + Cuff', badge: 'Recommended', desc: 'Upper arm BP monitor with irregular heartbeat detection and memory for 60 readings.', tags: ['BP Monitor', 'Diagnostics'], img: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&q=80', inStock: true },
  { id: 19, name: 'Glucometer Kit', brand: 'Roche', category: 'medical', price: 14500, unit: 'Meter + 10 Strips', badge: 'Popular', desc: 'Accurate blood glucose monitor with fast 5-second reading. Includes lancets.', tags: ['Diabetes', 'Glucometer'], img: 'https://images.unsplash.com/photo-1576671081837-49000212a370?w=400&q=80', inStock: true },
  { id: 20, name: 'Digital Thermometer', brand: 'Neimeth', category: 'medical', price: 2200, unit: 'Device', badge: null, desc: 'Fast 10-second oral/axillary thermometer with fever alert beep.', tags: ['Thermometer', 'Diagnostics'], img: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&q=80', inStock: true },
  { id: 21, name: 'First Aid Kit', brand: 'J&J', category: 'medical', price: 4800, unit: 'Complete Kit', badge: 'Essential', desc: '32-piece first aid kit including bandages, antiseptics, and emergency essentials.', tags: ['First Aid', 'Emergency'], img: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&q=80', inStock: true },

  // Rx (require prescription note)
  { id: 22, name: 'Amlodipine 5mg', brand: 'Pfizer', category: 'rx', price: 1200, unit: 'Pack of 30', badge: 'Rx Required', desc: 'Calcium channel blocker for hypertension and angina management.', tags: ['Hypertension', 'Cardiac'], img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80', inStock: true },
  { id: 23, name: 'Metformin 500mg', brand: 'Merck', category: 'rx', price: 980, unit: 'Pack of 30', badge: 'Rx Required', desc: 'First-line oral medication for type 2 diabetes blood sugar management.', tags: ['Diabetes', 'Blood Sugar'], img: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&q=80', inStock: true },
  { id: 24, name: 'Amoxicillin 500mg', brand: 'GSK', category: 'rx', price: 1450, unit: 'Pack of 21', badge: 'Rx Required', desc: 'Broad-spectrum penicillin antibiotic for bacterial infections.', tags: ['Antibiotic', 'Infection'], img: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=400&q=80', inStock: true },
];

export const SORT_OPTIONS = [
  { id: 'default', label: 'Default' },
  { id: 'price_asc', label: 'Price: Low to High' },
  { id: 'price_desc', label: 'Price: High to Low' },
  { id: 'name', label: 'Name A–Z' },
];