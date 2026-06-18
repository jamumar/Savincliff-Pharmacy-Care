// Default CMS structures representing current pharmacy content

export const DEFAULT_HOME_SECTIONS = [
  {
    id: 'hero',
    type: 'home_hero',
    data: {
      topLabel: 'SAVINCLIFF PHARMACY — 2026',
      line1Small: 'delivering',
      line1Big: 'CLINICAL CARE',
      line2Small: 'for the',
      line2Big: 'PATIENTS OF',
      line3Big: 'TOMORROW',
      lottieBg: '/lottie_background.json',
      linkText: 'Enter Archive'
    }
  },
  {
    id: 'manifesto',
    type: 'home_manifesto',
    data: {
      label: 'Clinical Manifesto',
      title: 'Our Protocol',
      text: 'We are a clinical pharmacy where science meets precision. Verification is our compass, ensuring every medication is authenticated at the source. We infuse every prescription with purpose, crafting therapeutic protocols that protect across every interaction. Quality is our foundation, maintaining the highest pharmaceutical standards in every formulation we dispense.',
      interactiveWords: ['Verification', 'prescription', 'Quality'],
      columns: [
        { text: 'Verified pharmaceutical sourcing\nstandards for medication safety\nand authenticity' },
        { text: 'Temperature-controlled storage\nsystems designed to maintain\nmedication quality and integrity' }
      ]
    }
  },
  {
    id: 'marquee',
    type: 'marquee',
    data: {
      text: 'SAVINCLIFF PHARMACY - CLINICAL PRECISION - PRIMARY SOURCE -',
      velocity: -0.25
    }
  },
  {
    id: 'carousel',
    type: 'product_carousel',
    data: {
      title: 'FEATURED FORMULATIONS',
      linkText: 'View All',
      products: [
        { id: 1, name: 'NEUROGEN AXON', brand: 'SVZ PHARMA', price: 15400, img: '/images/product2.png', unit: '30 CAPS' },
        { id: 2, name: 'SPECTRUM DROPS', brand: 'CLINICAL SPEC', price: 8900, img: '/images/product1.png', unit: '10 ML' },
        { id: 3, name: 'AURUM REGEN', brand: 'AURUM LABS', price: 24500, img: '/images/product3.png', unit: '30 ML' }
      ]
    }
  },
  {
    id: 'cta',
    type: 'cta',
    data: {
      label: 'Ready to begin?',
      title1: 'LET’S DELIVER',
      title2: 'something',
      title3: 'VITAL',
      primaryBtnText: 'Explore Inventory',
      primaryBtnLink: '/shop',
      secondaryBtnText: 'Upload Rx',
      secondaryBtnLink: '/rx-terminal'
    }
  }
];

export const DEFAULT_ABOUT_SECTIONS = [
  {
    id: 'hero',
    type: 'about_hero',
    data: {
      lines: ['PRECISION', 'WELLNESS', 'HUMANITY', 'FUTURE'],
      color: '#1B6E8C',
      bottomLabel: 'Constant Motion'
    }
  },
  {
    id: 'narrative',
    type: 'about_narrative',
    data: {
      words: [
        { text: 'We' }, { text: 'are' }, { text: 'a' }, { text: 'clinical' }, { text: 'pharmacy' },
        { text: 'where' }, { text: 'science' }, { text: 'meets' }, { text: 'precision.' },
        { text: 'Verification', teal: true }, { text: 'is' }, { text: 'our' }, { text: 'compass,' },
        { text: 'ensuring' }, { text: 'every' }, { text: 'medication' }, { text: 'is' },
        { text: 'authenticated' }, { text: 'at' }, { text: 'the' }, { text: 'source.' },
        { text: 'We' }, { text: 'infuse' }, { text: 'every' }, { text: 'prescription', teal: true },
        { text: 'with' }, { text: 'purpose,' }, { text: 'crafting' }, { text: 'therapeutic' },
        { text: 'protocols' }, { text: 'that' }, { text: 'protect' }, { text: 'across' }, { text: 'every' },
        { text: 'interaction.' }, { text: 'Quality', teal: true }, { text: 'is' }, { text: 'our' },
        { text: 'foundation,' }, { text: 'maintaining' }, { text: 'the' }, { text: 'highest' },
        { text: 'pharmaceutical' }, { text: 'standards' }, { text: 'in' }, { text: 'every' },
        { text: 'formulation' }, { text: 'we' }, { text: 'dispense.' },
        { text: 'Through' }, { text: 'full-spectrum' }, { text: 'clinical' }, { text: 'certainty.' }
      ]
    }
  },
  {
    id: 'story',
    type: 'about_story',
    data: {
      title1: 'OUR',
      title2: 'FOUNDATION',
      subtitle: 'Built in Abuja to modernize the pharmacy experience through precision, trust, and patient-centered care',
      body: 'Traditional pharmacy models often prioritize speed over precision. Savincliff was created to deliver a more thoughtful standard of pharmaceutical care – where every prescription is reviewed carefully, every medication is verified at the source, & every patient interaction is built on trust.',
      videoUrl: '/animations/whatsapp_2.mp4'
    }
  },
  {
    id: 'split_sticky',
    type: 'about_split_sticky',
    data: {
      label: '[OUR DIFFERENCE]',
      title: 'WHY SAVINCLIFF',
      panels: [
        {
          title: 'Clinical Standards',
          bgColor: 'bg-brand-teal',
          textColor: 'text-white',
          items: [
            { label: 'VERIFIED SOURCING', text: 'Authenticated pharmaceutical supply systems' },
            { label: 'PRESCRIPTION REVIEW', text: 'Every prescription reviewed by licensed pharmacists' },
            { label: 'STORAGE SYSTEMS', text: 'Temperature-controlled medication handling & cold-chain handling' },
            { label: 'DIGITAL ACCESS', text: 'Secure prescription and patient portal systems' },
            { label: 'PATIENT SUPPORT', text: 'Consultation-driven pharmaceutical care' }
          ]
        },
        {
          title: 'Built for Modern Care',
          bgColor: 'bg-white',
          textColor: 'text-black',
          items: [
            { label: 'VERIFIED SOURCING', text: 'Authenticated pharmaceutical supply chain' },
            { label: 'DIGITAL PRESCRIPTIONS', text: 'Secure prescription upload and review' },
            { label: 'PATIENT PORTAL', text: 'Private medication records and review' },
            { label: 'CLINICAL CONSULTATION', text: 'Consultation-driven medication support' },
            { label: 'DELIVERY & COLLECTION', text: 'Flexible pickup and local delivery systems' }
          ]
        },
        {
          title: 'Precision Infrastructure',
          bgColor: 'bg-brand-teal',
          textColor: 'text-white',
          items: [
            { label: 'DIGITAL RX', text: 'Integrated prescription intake systems' },
            { label: 'CLINICAL REVIEW', text: 'Licensed pharmacist oversight protocols' },
            { label: 'SOURCE TRACEABILITY', text: 'Medication authentication at procurement level' },
            { label: 'PATIENT ACCESS', text: 'Secure patient portal architecture' },
            { label: 'STORAGE CONTROL', text: 'Environmental monitoring and storage integrity' }
          ]
        }
      ]
    }
  },
  {
    id: 'marquee',
    type: 'marquee',
    data: {
      text: 'PCN - NAFDAC - NDPR - VERIFIED - SECURE - COMPLIANT - AUTHENTICATED - ',
      velocity: -1.5
    }
  },
  {
    id: 'showcase',
    type: 'about_showcase',
    data: {
      label: '[CLINICAL SYSTEMS]',
      title: 'DESIGNED FOR CLINICAL PRECISION',
      stories: [
        {
          id: 'AUTHENTICATION',
          label: 'AUTHENTICATION',
          headline: 'SAVINCLIFF COMBINES CLINICAL\nOVERSIGHT, DIGITAL\nINFRASTRUCTURE, AND MODERN\nPHARMACEUTICAL WORKFLOWS\nTO CREATE A SAFER AND MORE\nINTELLIGENT DISPENSING\nEXPERIENCE',
          cta: 'READ CLINICAL REPORT',
          stats: [
            { value: 'VERIFIED', label: 'MULTI-STEP\nPRESCRIPTION\nREVIEW' },
            { value: 'SECURE', label: 'PROTECTED\nDIGITAL PATIENT\nSYSTEMS' },
            { value: 'CONTROLLED', label: 'TEMPERATURE-\nMONITORED\nMEDICATION\nHANDLING' }
          ]
        },
        {
          id: 'DISPENSING',
          label: 'DISPENSING',
          headline: 'CLINICAL DISPENSING SYSTEMS\nSTRUCTURED AROUND RIGOROUS\nPHARMACEUTICAL OVERSIGHT,\nMEDICATION AUTHENTICATION,\nAND PATIENT-CENTERED\nACCURACY.',
          cta: 'READ CLINICAL REPORT',
          stats: []
        },
        {
          id: 'PATIENT ACCESS',
          label: 'PATIENT ACCESS',
          headline: 'INTEGRATED DIGITAL PORTALS\nDESIGNED FOR SECURE\nPRESCRIPTION UPLOADS,\nSEAMLESS REFILL COORDINATION,\nAND CONVENIENT PATIENT\nACCESS TO PHARMACEUTICAL CARE.',
          cta: 'READ CLINICAL REPORT',
          stats: [
            { value: 'DIGITAL', label: 'ONLINE\nPRESCRIPTION\nSUBMISSION' },
            { value: 'ACCESSIBLE', label: 'PATIENT\nMEDICATION\nHISTORY ACCESS' },
            { value: 'CONNECTED', label: 'INTEGRATED\nPAYMENT AND\nREFILL SYSTEMS' }
          ]
        }
      ]
    }
  },
  {
    id: 'dispensing_care',
    type: 'about_dispensing_care',
    data: {
      label: '[ DISPENSING ENVIRONMENT ]',
      title: 'BUILT FOR THE FUTURE OF PHARMACEUTICAL DISPENSING CARE',
      images: [
        { url: '/images/pharmacy_interior.png', label: 'INTERIOR RENDER', number: '01' },
        { url: '/images/digital_terminal.png', label: 'DIGITAL WORKFLOW', number: '02' },
        { url: '/images/medication_shelving.png', label: 'STORAGE SHELVING', number: '03' },
        { url: '/images/lab.png', label: 'CLINICAL LAB', number: '04' },
        { url: '/images/pharmacist.png', label: 'PHARMACIST CONSULTATION', number: '05' }
      ]
    }
  },
  {
    id: 'cta',
    type: 'about_cta',
    data: {
      title: 'EXPERIENCE THE PRECISION',
      btn1Text: 'Explore Inventory',
      btn2Text: 'Consult Pharmacist'
    }
  }
];

export const DEFAULT_SERVICES_SECTIONS = [
  {
    id: 'hero',
    type: 'services_hero',
    data: {
      title: 'SAVINCLIFF',
      modelUrl: '/models/opt_africa.glb',
      leftLabel: 'SCROLL & EXPLORE THE SAVINCLIFF REALM',
      rightLabel: 'ABUJA, NIGERIA'
    }
  },
  {
    id: 'header',
    type: 'services_header',
    data: {
      title: 'CAPABILITIES',
      subtitle: 'CLINICAL SERVICE PORTFOLIO - 2026 EDITION'
    }
  },
  {
    id: 'capabilities',
    type: 'services_capabilities',
    data: {
      capabilities: [
        {
          id: '[01]',
          title: 'CLINICAL REGULATION',
          desc: 'We align on medical regulatory compliance so every compound dispensed is rigidly verified.',
          list: ['Regulatory compliance audit', 'DEA compliance checking', 'Federal health standards verification', 'Workflow validation guidelines', 'Risk assessment protocols'],
          visualType: 'bars'
        },
        {
          id: '[02]',
          title: 'COMPOUNDING BRAND',
          desc: 'We formulate therapeutic preparations with raw chemical grade essences and clinical accuracy.',
          list: ['Active ingredient assay', 'Excipient customization', 'Bioidentical hormone formulas', 'Liquid and oral suspension compounds', 'Topical dermal preparations', 'Veterinary compounding adaptions'],
          visualType: 'morph'
        },
        {
          id: '[03]',
          title: 'DISPENSING PRESETS',
          desc: 'We craft safe medication alignment designs, balancing multiple therapeutic targets in harmony.',
          list: ['Bar-coded medication validation', 'Pharmacist clinical reviews', 'Dosage verification engines', 'Multi-drug interaction audits', 'Adherence support models', 'Patient profile sync algorithms'],
          visualType: 'orbit'
        },
        {
          id: '[04]',
          title: 'THERAPEUTIC ENGINE',
          desc: 'We support integrated care infrastructures that monitor therapeutic compliance at scale.',
          list: ['Custom dosage optimization', 'Therapeutic efficacy logs', 'Adverse reaction tracking', 'Real-time adherence reporting', 'Tele-pharmacy support channels', 'EHR record synchronizations'],
          visualType: 'spin'
        },
        {
          id: '[05]',
          title: 'COLD-CHAIN DISPATCH',
          desc: 'We secure temperature-controlled cold chain networks for end-to-end medication integrity.',
          list: ['Temperature-controlled packouts', 'Continuous sensor logging', 'Insulated barrier shipping', 'Real-time transit alerts', 'Secure handoff authentications', 'Proof-of-delivery logging'],
          visualType: 'triangle'
        },
        {
          id: '[06]',
          title: 'INTEGRITY TESTING',
          desc: 'We run quality testing assays to ensure compound purity and active agent potency.',
          list: ['High-Performance Liquid Chromatography', 'Sterility testing protocols', 'Endotoxin presence screens', 'Particulate analysis audits', 'Potency and safety certifications'],
          visualType: 'potency'
        },
        {
          id: '[07]',
          title: 'CARE ECOSYSTEMS',
          desc: 'We compile smart patient care plans that help do the work of healing so patients focus on wellness.',
          list: ['Patient compliance counseling', 'Refill synchronization algorithms', 'Interactive medication counseling', 'Self-reporting patient portals', 'Provider clinical consulting', 'Care coordination dashboards'],
          visualType: 'grid'
        }
      ]
    }
  },
  {
    id: 'curved_text',
    type: 'services_curved_text',
    data: {
      curveText: 'CLINICAL PRECISION. PHARMACEUTICAL EXCELLENCE. SAVINCLIFF VERIFIED. ZERO COMPROMISE. PRECISION DISPENSING. EVERY PRESCRIPTION COUNTS.',
      modelUrl: '/models/opt_the_yin_yang_yin_yang_med.glb',
      paragraphs: [
        'SAVINCLIFF CLIENTS HAVE ACCESSED OVER ₦500M+ IN CLINICAL DISPENSING ACROSS A ₦2B+ COMBINED PORTFOLIO, INCLUDING 12+ INSTITUTIONAL PARTNERSHIPS ACROSS ABUJA, LAGOS, AND THE PAN-AFRICAN CORRIDOR.',
        'WE\'VE SERVED INSTITUTIONS BACKED BY FEDERAL HEALTH MANDATES AND PARTNERED WITH TOP HEALTHCARE PROVIDERS — ENSURING EVERY PRESCRIPTION IS VERIFIED, SECURED, AND DELIVERED WITH ZERO COMPROMISE.'
      ]
    }
  },
  {
    id: 'logistics',
    type: 'services_logistics',
    data: {
      title: 'PRECISION LOGISTICS',
      desc: 'Our logistics node is a project of efficiency. Temperature-controlled transit environments, real-time clinical tracking, and total audit trails for every delivery.',
      imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80'
    }
  },
  {
    id: 'cta',
    type: 'services_cta',
    data: {
      label: 'Wholesale & Institutional',
      title: 'ENTERPRISE HEALTH',
      btnText: 'Initiate Partnership',
      btnLink: '/contact'
    }
  }
];

export const DEFAULT_WELLNESS_SECTIONS = [
  {
    id: 'hero',
    type: 'wellness_hero',
    data: {
      topLabel: 'SAVINCLIFF WELLNESS — CATALOGUE 2026',
      title: 'HEALTH BEYOND',
      italicWord: 'prescriptions',
      subtext: 'Savincliff Wellness is a curated marketplace for daily health, preventive care, fitness support, beauty, family wellness, and longevity-focused living.',
      primaryBtnText: 'Explore Wellness',
      primaryBtnLink: '/shop',
      secondaryBtnText: 'Upload Script',
      secondaryBtnLink: '/rx-terminal'
    }
  },
  {
    id: 'philosophy',
    type: 'wellness_philosophy',
    data: {
      label: '[ WELLNESS PHILOSOPHY ]',
      title: 'CURATED FOR MODERN LIVING',
      copy: 'Wellness is not separate from healthcare — it is the foundation of it. Our wellness marketplace brings together supplements, personal care, fitness nutrition, baby care, skincare, and home health essentials selected to support everyday wellbeing.'
    }
  },
  {
    id: 'categories',
    type: 'wellness_categories',
    data: {
      label: '[ WELLNESS CORE ]',
      title: 'WELLNESS CATEGORIES',
      categories: [
        { title: 'Vitamins & Micronutrients', text: 'Daily nutritional support for energy, immunity, and overall health.', tag: 'Daily Health' },
        { title: 'Immune Support', text: 'Products designed to support resilience, recovery, and seasonal wellness.', tag: 'Prevention' },
        { title: 'Sports Nutrition', text: 'Protein, hydration, electrolytes, and recovery support for active lifestyles.', tag: 'Performance' },
        { title: 'Clinical Skincare', text: 'Dermatology-informed skincare and personal care essentials.', tag: 'Dermatology' },
        { title: 'Mother & Baby', text: 'Care products for mothers, infants, and growing families.', tag: 'Family' },
        { title: 'Home Health Devices', text: 'BP monitors, glucometers, thermometers, nebulizers, and health tracking tools.', tag: 'Monitoring' }
      ]
    }
  },
  {
    id: 'gym',
    type: 'wellness_gym',
    data: {
      label: '[ PERFORMANCE CORE ]',
      title: 'PERFORMANCE MEETS RECOVERY',
      copy: 'Located above a fitness community, Savincliff Wellness supports active lifestyles with curated products for hydration, muscle recovery, joint health, energy, and daily performance.',
      tags: ['Sports Nutrition', 'Sleep & Recovery', 'Joint Care', 'Weight Care'],
      imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&q=80'
    }
  },
  {
    id: 'family',
    type: 'wellness_family',
    data: {
      label: '[ MULTI-GENERATIONAL ]',
      title: 'CARE FOR EVERY GENERATION',
      copy: 'From baby care to healthy aging, Savincliff provides wellness essentials for families, professionals, parents, and older adults seeking trusted everyday healthcare support.'
    }
  },
  {
    id: 'quality',
    type: 'wellness_quality',
    data: {
      label: '[ SOURCE COMPLIANCE ]',
      title: 'VERIFIED WELLNESS PRODUCTS',
      copy: 'Every wellness product we stock is selected with quality, authenticity, and safety in mind. Our goal is to offer trusted products that support prevention, recovery, and better daily health.',
      detailTitle: 'AUDITED & SEALED',
      detailText: 'We check expiry tracking, batch controls, and thermal chain validations across supplements and devices so you get absolute potency.'
    }
  },
  {
    id: 'marquee',
    type: 'marquee',
    data: {
      text: 'PREVENTIVE CARE / DAILY WELLNESS / RECOVERY / LONGEVITY - ',
      velocity: -0.35
    }
  },
  {
    id: 'carousel',
    type: 'product_carousel',
    data: {
      title: 'CURATED FORMULATIONS',
      linkText: 'Explore Inventory',
      products: [
        { id: 101, name: 'Magnesium Complex', brand: 'Sleep & Recovery', price: 8500, img: 'https://images.unsplash.com/photo-1616671285420-569d6c70eb37?w=600&q=80', unit: '60 CAPS' },
        { id: 102, name: 'Clinical Vit C + Zinc', brand: 'Immune Support', price: 6200, img: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=600&q=80', unit: '30 TABS' },
        { id: 103, name: 'Hydration Electrolytes', brand: 'Sports Nutrition', price: 12000, img: 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=600&q=80', unit: '250 G' },
        { id: 104, name: 'Dermal Ceramide Barrier', brand: 'Clinical Skincare', price: 18500, img: 'https://images.unsplash.com/photo-1608248597481-496100c80836?w=600&q=80', unit: '50 ML' }
      ]
    }
  },
  {
    id: 'cta',
    type: 'wellness_cta',
    data: {
      label: 'READY TO SYSTEMIZE?',
      title: 'BUILD YOUR DAILY wellness SYSTEM',
      subtext: 'Explore curated wellness products or speak with our team for guidance on products that fit your health goals.',
      primaryBtnText: 'Explore Wellness',
      primaryBtnLink: '/shop',
      secondaryBtnText: 'Chat With Savincliff',
      secondaryBtnLink: '/contact'
    }
  }
];

export const DEFAULT_NAVBAR_SETTINGS = {
  navItems: [
    { label: 'HOME', path: '/' },
    { label: 'ABOUT', path: '/about' },
    { label: 'INVENTORY', path: '/shop' },
    { label: 'WELLNESS', path: '/products' },
    { label: 'SERVICES', path: '/services' },
    { label: 'PROTOCOLS', path: '/protocols' },
    { label: 'INQUIRIES', path: '/faqs' },
    { label: 'RX TERMINAL', path: '/rx-terminal' }
  ],
  marqueeText: 'UPLOAD RX →'
};

export const DEFAULT_FOOTER_SETTINGS = {
  whatsappLink: 'https://wa.me/2349232512064',
  whatsappVideo: '/animations/whatsapp_1.mp4',
  copyright: '© 2026 Savincliff Pharmacy & Chronic Care Centre. All rights reserved.',
  compliance: 'PCN REGISTERED · NAFDAC COMPLIANCE',
  giantWatermark: 'savincliff rx',
  socialLinks: [
    { name: 'INSTAGRAM', path: '#' },
    { name: 'LINKEDIN', path: '#' }
  ],
  footerLinks: [
    { title: 'COMPANY', links: [{ name: 'HOME', path: '/' }, { name: 'ABOUT', path: '/about' }] },
    { title: 'MARKET', links: [{ name: 'INVENTORY', path: '/shop' }, { name: 'WELLNESS', path: '/products' }] },
    { title: 'CLINICAL', links: [{ name: 'SERVICES', path: '/services' }, { name: 'PROTOCOLS', path: '/protocols' }] },
    { title: 'ACCESS', links: [{ name: 'INQUIRIES', path: '/faqs' }, { name: 'RX TERMINAL', path: '/rx-terminal' }] },
    { title: 'SOCIALS', links: [{ name: 'INSTAGRAM', path: '#' }, { name: 'LINKEDIN', path: '#' }] }
  ],
  models: [
    { url: '/models/opt_savincliff_pill.glb', label: 'PILL YIN YANG' },
    { url: '/models/opt_azure_embrace.glb', label: 'AZURE EMBRACE' },
    { url: '/models/opt_candy_ribbon.glb', label: 'CANDY RIBBON' },
    { url: '/models/opt_crystal_spiral.glb', label: 'CRYSTAL SPIRAL' },
    { url: '/models/opt_emerald_duet.glb', label: 'EMERALD DUET' },
    { url: '/models/opt_golden_ember.glb', label: 'GOLDEN EMBER' },
    { url: '/models/opt_leather_wings_in_flig.glb', label: 'LEATHER WINGS' },
    { url: '/models/opt_pill_yin_yang.glb', label: 'MESHY YIN YANG' },
    { url: '/models/opt_the_yin_yang_yin_yang_med.glb', label: 'YIN YANG MED' },
    { url: '/models/opt_Atlas_on_Fire_0508010357.glb', label: 'ATLAS ON FIRE' },
    { url: '/models/opt_Azure_Embrace_0506235638.glb', label: 'AZURE EMBRACE 2' },
    { url: '/models/opt_Azure_Spiral_0508010416.glb', label: 'AZURE SPIRAL' },
    { url: '/models/opt_Blue_Yin_Yang_of_Pill_0504002208.glb', label: 'BLUE YIN YANG' },
    { url: '/models/opt_Candy_Ribbon_0506235751.glb', label: 'CANDY RIBBON 2' },
    { url: '/models/opt_Crimson_S_curve_0508014249.glb', label: 'CRIMSON S CURVE' },
    { url: '/models/opt_Crystal_Spiral_0506235732.glb', label: 'CRYSTAL SPIRAL 2' },
    { url: '/models/opt_Earth_in_an_S_0508010344.glb', label: 'AFRICA S CURVE' },
    { url: '/models/opt_Emerald_Duet_0506235505.glb', label: 'EMERALD DUET 2' },
    { url: '/models/opt_Glass_Wave_Duo_0508010604.glb', label: 'GLASS WAVE DUO' },
    { url: '/models/opt_Golden_Ember_0506235551.glb', label: 'GOLDEN EMBER 2' },
    { url: '/models/opt_Ice_Sculpture_0508010522.glb', label: 'ICE SCULPTURE' },
    { url: '/models/opt_Interwoven_Waves_0508010554.glb', label: 'INTERWOVEN WAVES' },
    { url: '/models/opt_Leather_Wings_in_Flig_0506235622.glb', label: 'LEATHER WINGS 2' },
    { url: '/models/opt_Luminescent_Crescent_0508010511.glb', label: 'LUMINESCENT CRESCENT' },
    { url: '/models/opt_Luminous_S_Curve_0508010546.glb', label: 'LUMINOUS S CURVE' },
    { url: '/models/opt_Luminous_Serpent_0508010451.glb', label: 'LUMINOUS SERPENT' },
    { url: '/models/opt_Molecular_Yin_Yang_0508010438.glb', label: 'MOLECULAR YIN YANG' },
    { url: '/models/opt_Neon_Leaf_0508010502.glb', label: 'NEON LEAF' },
    { url: '/models/opt_Pill_Yin_Yang_0506235536.glb', label: 'PILL YIN YANG 2' },
    { url: '/models/opt_The_Yin_Yang_of_Medic_0506235604.glb', label: 'YIN YANG MED 2' },
    { url: '/models/opt_Whisper_of_Glass_0508014335.glb', label: 'WHISPER OF GLASS' }
  ],
  pageFooters: {
    '/about': {
      topText: null,
      line1: 'BUILDING THE FUTURE',
      middleText: 'OF',
      line2: 'COMMUNITY HEALTHCARE',
      ctaText: 'CONTACT US',
      ctaPath: '/contact'
    },
    '/services': {
      topText: 'MODERN',
      line1: 'PHARMACEUTICAL',
      middleText: null,
      line2: 'CARE SYSTEMS',
      ctaText: 'CONTACT US',
      ctaPath: '/contact'
    },
    '/shop': {
      topText: null,
      line1: 'HEALTH',
      middleText: null,
      line2: 'BEYOND PRESCRIPTIONS',
      ctaText: 'CONTACT US',
      ctaPath: '/contact'
    },
    '/products': {
      topText: null,
      line1: 'HEALTH',
      middleText: null,
      line2: 'BEYOND PRESCRIPTIONS',
      ctaText: 'CONTACT US',
      ctaPath: '/contact'
    },
    '/rx-terminal': {
      topText: 'YOUR',
      line1: 'DIGITAL HEALTH',
      middleText: null,
      line2: 'PORTAL',
      ctaText: 'ACCESS TERMINAL',
      ctaPath: '/rx-terminal'
    },
    '/protocols': {
      topText: null,
      line1: 'TRUST BUILT',
      middleText: 'INTO',
      line2: 'EVERY PROCESS',
      ctaText: 'CONTACT US',
      ctaPath: '/contact'
    },
    '/faqs': {
      topText: 'ANSWERS',
      line1: 'FOR MODERN',
      middleText: null,
      line2: 'HEALTHCARE ACCESS',
      ctaText: 'ACCESS TERMINAL',
      ctaPath: '/rx-terminal'
    },
    'default': {
      topText: 'MODERN',
      line1: 'PHARMA CARE',
      middleText: null,
      line2: null,
      ctaText: 'CONTACT US',
      ctaPath: '/contact'
    }
  }
};

export const DEFAULT_FAQS_SECTIONS = [
  {
    id: 'hero',
    type: 'faqs_hero',
    data: {
      title1: 'COMMON',
      titleLetter1: 'U',
      titleLetter2: 'S',
      titleLetter3: 'O',
      desc: 'Explore the categories below to find the information you need and learn more about us.'
    }
  },
  {
    id: 'categories',
    type: 'faqs_categories',
    data: {
      categories: [
        {
          id: 'about-savincliff',
          idNum: '[01]',
          title: 'ABOUT SAVINCLIFF',
          tag: 'ABOUT SAVINCLIFF',
          questions: [
            {
              slug: 'default',
              q: 'What makes Savincliff Pharmacy different?',
              a: 'Savincliff blends state-of-the-art digital infrastructure with strict clinical pharmacy standards, ensuring verified sourcing and precise custom compounding.'
            },
            {
              slug: 'licensing',
              q: 'Is Savincliff a fully licensed pharmacy?',
              a: 'Yes, Savincliff is fully licensed under all applicable health regulatory guidelines, with certified pharmacists overseeing every order.'
            }
          ]
        },
        {
          id: 'prescriptions-and-refills',
          idNum: '[02]',
          title: 'PRESCRIPTIONS & REFILLS',
          tag: 'PRESCRIPTIONS & REFILLS',
          questions: [
            {
              slug: 'prescription-upload',
              q: 'How do I upload my prescription?',
              a: 'You can submit your prescription directly through our digital Rx Terminal. Once uploaded, our clinical team will review and verify it.'
            },
            {
              slug: 'automatic-refills',
              q: 'Can I set up automatic refills for my medication?',
              a: 'Yes. You can manage recurring refills directly through your secure patient portal, or speak to a clinical coordinator to automate the schedule.'
            },
            {
              slug: 'verification-cycle',
              q: 'What is the clinical verification cycle?',
              a: 'Each prescription undergoes a rigorous double-verification process by our licensed pharmacists, which typically takes between 15 to 30 minutes.'
            }
          ]
        },
        {
          id: 'compounding',
          idNum: '[03]',
          title: 'CUSTOM COMPOUNDING',
          tag: 'CUSTOM COMPOUNDING',
          questions: [
            {
              slug: 'compounding-capabilities',
              q: 'What compounding capabilities do you offer?',
              a: 'We specialize in tailored dosage formulations, allergen-free preparations, bioidentical hormone therapies, and custom pediatric compounding.'
            },
            {
              slug: 'safety-and-purity',
              q: 'How do you verify compound safety and purity?',
              a: 'We run quality testing assays, including high-performance liquid chromatography and sterility screens, to guarantee compound active agent potency.'
            }
          ]
        }
      ]
    }
  }
];

export const DEFAULT_FAQ_DETAILS = {
  'default': {
    category: 'PATIENT SUPPORT',
    shortTitle: 'Can Savincliff help with prescription ...',
    question: 'How does Savincliff verify and coordinate prescription safety?',
    summary: 'Yes—Savincliff coordinates with your prescribing physicians to double-check dosages, run drug-interaction scans, and maintain full cold-chain transit integrity.',
    fullText: 'Savincliff operates as a highly coordinated clinical support node. Our prescription review pipeline verifies compounds directly at the source. Utilizing state-of-the-art temperature monitoring alongside robust packaging protocols, we guarantee the safety and purity of your therapeutic formulations from compounding to final home delivery. Every prescription is strictly double-verified by a licensed pharmacist for complete security.',
    ctaBadge: 'CLINICAL HELP',
    ctaHeading: 'Our clinical support desk is available to assist you with prescriptions or orders.',
    ctaBenefits: [
      'Consult directly with licensed, board-certified clinical pharmacists',
      'Perform comprehensive drug-interaction reviews before compound preparation',
      'Set up secure, automated refill schedules tailored to your therapy'
    ],
    related: [
      {
        slug: 'prescription-refills',
        tag: 'CLINICAL PROTOCOLS',
        q: 'How do I request a refill for my compounded medication?',
        a: 'You can request refills through your portal or upload a new prescription directly to our Rx Terminal.'
      },
      {
        slug: 'delivery-logistics',
        tag: 'COLD-CHAIN SUPPORT',
        q: 'How is my medication shipped and delivered?',
        a: 'We dispatch all temperature-sensitive items in secure cold-chain packouts with continuous logging.'
      }
    ]
  },
  'licensing': {
    category: 'REGULATORY COMPLIANCE',
    shortTitle: 'Is Savincliff fully licensed?',
    question: 'Is Savincliff a fully licensed and compliant pharmacy?',
    summary: 'Yes, Savincliff is fully licensed under the Pharmacists Council of Nigeria (PCN) and all local pharmaceutical regulatory bodies.',
    fullText: 'Savincliff operates with absolute compliance to national and federal healthcare mandates. Every pharmacist on our clinical staff is licensed by the PCN. We follow strict regulatory compliance audits, workflow validation guidelines, and NDPR data privacy standards to protect patient identity and health information, ensuring absolute authenticity across all dispensing operations.',
    ctaBadge: 'COMPLIANCE',
    ctaHeading: 'We hold our clinical standards to the highest federal healthcare requirements.',
    ctaBenefits: [
      'PCN registered facility and licensed clinical personnel',
      'NAFDAC compliant sourcing for all products and preparations',
      'NDPR compliant secure patient records databases'
    ],
    related: [
      { slug: 'default', tag: 'PATIENT SUPPORT', q: 'How does Savincliff coordinate prescription safety?', a: 'We run drug-interaction scans and maintain cold-chain transit integrity.' }
    ]
  },
  'prescription-upload': {
    category: 'DIGITAL CARE ACCESS',
    shortTitle: 'How to upload prescriptions?',
    question: 'How do I submit my prescription to the Savincliff Rx Terminal?',
    summary: 'You can upload your prescription note as an image or PDF file directly using our online Rx Terminal portal.',
    fullText: 'Our Rx Terminal is a secure, user-friendly portal designed for seamless clinical access. Simply click "Upload Script" or visit the Rx Terminal page, drag and drop your file, and submit. Our clinical team of licensed pharmacists immediately reviews the details, verifies dosage metrics, runs cross-drug interaction checks, and calls or texts you to coordinate dispensing, payment, and delivery options.',
    ctaBadge: 'SUBMIT PRESCRIPTION',
    ctaHeading: 'Ready to submit your prescription note? Connect with our digital review node.',
    ctaBenefits: [
      'Simple upload supporting JPG, PNG, and PDF formats',
      'Pharmacist review starts automatically upon submission',
      'Secure end-to-end data encryption matching healthcare standards'
    ],
    related: [
      { slug: 'verification-cycle', tag: 'CLINICAL REVIEW', q: 'What is the clinical verification cycle?', a: 'Every prescription is verified in a double-check cycle taking 15 to 30 minutes.' }
    ]
  },
  'automatic-refills': {
    category: 'PATIENT PORTAL',
    shortTitle: 'Setting up automatic refills',
    question: 'Can I coordinate automated schedules for recurring medication refills?',
    summary: 'Yes, you can configure automatic refill intervals through your patient account or by coordinating with our support coordinators.',
    fullText: 'Savincliff provides chronic care coordination to make therapeutic compliance simple. Once your initial prescription is verified, you can choose to activate automatic refill alerts. We coordinate with your healthcare provider for validation when a renewal is needed, prepare the compounds, and schedule deliveries to ensure you never miss a dose. Patient compliance counseling is available standard.',
    ctaBadge: 'REFILL SUPPORT',
    ctaHeading: 'Configure your therapy schedule with our clinical coordination coordinators.',
    ctaBenefits: [
      'Automatic renewal coordination with prescribing physicians',
      'Flexible sync scheduling to group multiple medications together',
      'Potency-validated cold-chain delivery scheduled in advance'
    ],
    related: [
      { slug: 'default', tag: 'PATIENT SUPPORT', q: 'How does Savincliff coordinate prescription safety?', a: 'We run drug-interaction scans and maintain cold-chain transit integrity.' }
    ]
  },
  'verification-cycle': {
    category: 'CLINICAL PROTOCOLS',
    shortTitle: 'Clinical verification timelines',
    question: 'What happens during the clinical prescription verification cycle?',
    summary: 'Every prescription undergoes a double-verification safety review by licensed pharmacists, taking 15 to 30 minutes.',
    fullText: 'To ensure total safety, we never automate medication approval. Each uploaded order is checked by a primary pharmacist for compound authenticity, dosage accuracy, and allergy safety. A second clinical pharmacist then verifies the compound against patient history databases. Only once this double-verification loop is complete is the medicine released for dispatch or collection.',
    ctaBadge: 'CLINICAL REVIEW',
    ctaHeading: 'Our verification protocols protect against multi-drug adverse interactions.',
    ctaBenefits: [
      'Multi-pharmacist clinical review on all orders',
      '15-30 minute standard verification turn-around SLA',
      'Direct call validation for any dosing concerns or adjustments'
    ],
    related: [
      { slug: 'prescription-upload', tag: 'DIGITAL ACCESS', q: 'How do I upload my prescription?', a: 'Upload files directly to the secure Rx Terminal.' }
    ]
  },
  'compounding-capabilities': {
    category: 'CUSTOM FORMULATIONS',
    shortTitle: 'Custom Compounding Capabilities',
    question: 'What specific clinical compounding services are available at Savincliff?',
    summary: 'We compound bioidentical hormones, pediatric liquid suspensions, customized allergen-free doses, and veterinary preparations.',
    fullText: 'When commercially available formulations fail to fit your therapeutic targets, our cleanroom compound laboratory can help. We synthesize personalized medicines by customizing excipients (omitting gluten, dyes, or lactose), altering dosage strengths, and creating alternative formats (such as converting hard pills into flavored oral syrups or transdermal creams) under strict sterile compounding regulations.',
    ctaBadge: 'COMPOUNDING',
    ctaHeading: 'We customize formulations using chemical-grade active pharmaceutical ingredients.',
    ctaBenefits: [
      'Allergen-free and dye-free customized medication preparation',
      'Custom flavors and formats for pediatric and geriatric care',
      'Bioidentical hormone replacement therapy (BHRT) formulation'
    ],
    related: [
      { slug: 'safety-and-purity', tag: 'INTEGRITY TESTING', q: 'How do you verify compound safety and purity?', a: 'We run quality testing assays, potencies, and sterility screens.' }
    ]
  },
  'safety-and-purity': {
    category: 'QUALITY CONTROL',
    shortTitle: 'Safety and Purity Verification',
    question: 'How does Savincliff verify compounding safety, potency, and purity?',
    summary: 'We run potency testing, sterility screens, and high-performance liquid chromatography (HPLC) assays to ensure compound integrity.',
    fullText: 'Every compounded batch is prepared in positive-pressure sterile cleanrooms. We run potencies audits to verify the exact active agent concentration and conduct endotoxin, sterility, and particulate screens. All raw chemicals are sourced exclusively from NAFDAC-approved manufacturers, maintaining an unbroken chain of purity from procurement to final preparation.',
    ctaBadge: 'INTEGRITY',
    ctaHeading: 'Our compounding protocols are backed by rigorous quality assurance testing.',
    ctaBenefits: [
      'High-Performance Liquid Chromatography validation on compound batches',
      'Continuous temperature and particle monitoring in cleanroom labs',
      'Source-verified certificate of analysis for all raw components'
    ],
    related: [
      { slug: 'compounding-capabilities', tag: 'CUSTOM FORMULATIONS', q: 'What compounding capabilities do you offer?', a: 'Custom formulations, bioidenticals, and dosage adjustments.' }
    ]
  }
};

export const DEFAULT_PROTOCOLS_SECTIONS = [
  {
    id: 'hero',
    type: 'protocols_hero',
    data: {
      title: 'REGULATION',
      subtitle: 'CLINICAL COMPLIANCE NODES - AUDIT 2026'
    }
  },
  {
    id: 'intro',
    type: 'protocols_intro',
    data: {
      title: 'THE LEGAL\nFRAMEWORK',
      desc: 'Compliance is the structural foundation of Savincliff. We dismantle the ambiguity of healthcare regulation to build a platform of primary-source clinical certainty.',
      sideText: 'Savincliff operates under the full pharmaceutical regulatory framework of the Federal Republic of Nigeria — anchored by PCN and NAFDAC international standards.'
    }
  },
  {
    id: 'certifications',
    type: 'protocols_certifications',
    data: {
      label: 'Verification Systems',
      badges: [
        { id: 'PCN', title: 'PCN REGISTRY', body: 'Savincliff is duly registered with the Pharmacists Council of Nigeria. Every professional node holds a valid, current practicing license.' },
        { id: 'NDC', title: 'NAFDAC NODE', body: 'Total compliance with the National Agency for Food and Drug Administration. We source exclusively from verified, approved distributors.' },
        { id: 'GPP', title: 'GPP PROTOCOL', body: 'Absolute adherence to WHO and PCN Good Pharmacy Practice guidelines. Precision dispensing and ethical conduct are standard specifications.' },
        { id: 'SCI', title: 'CHAIN ARCH', body: 'Our supply chain is a project of traceability. Every pharmaceutical unit is recorded with documented clinical audit trails.' },
        { id: 'ADR', title: 'PVG TERMINAL', body: 'Integrated pharmacovigilance protocols for monitoring adverse reactions. Safety is an active clinical process, not a static metric.' }
      ]
    }
  },
  {
    id: 'pillars',
    type: 'protocols_pillars',
    data: {
      title: 'EIGHT PILLARS\nOF INTEGRITY',
      subtitle: 'Our operational protocol is a sequence of eight non-negotiable medical requirements.',
      commitments: [
        'PCN Clinical License Validation',
        'NAFDAC Product Specification Audits',
        'Thermal Logistics Monitoring',
        'Encrypted Secure Health Records',
        'Batch-Level Audit Recalls',
        'NDPA Data Privacy Compliance',
        'Mandatory Clinical Re-Training',
        'Counterfeit Detection Algorithms'
      ]
    }
  },
  {
    id: 'footer_strip',
    type: 'protocols_footer_strip',
    data: {
      nodes: ['PCN', 'NAFDAC', 'GPP', 'WHO', 'ISO', 'NDPA']
    }
  }
];

export const DEFAULT_CONTACT_SECTIONS = [
  {
    id: 'hero',
    type: 'contact_hero',
    data: {
      title: 'ESTABLISH\nSYNC',
      subtitle: 'Primary Communications Node - FCT Abuja'
    }
  },
  {
    id: 'grid',
    type: 'contact_grid',
    data: {
      nodes: [
        { label: 'Node 01 - Physical', title: 'CLINICAL HQ', value: 'Divib Plaza, 7th Avenue,\nGwarinpa, Abuja - FCT' },
        { label: 'Node 02 - Digital', title: 'DIRECT SYNC', value: 'node@savincliff.com\n+234 (0) 923 251 2064' },
        { label: 'Node 03 - Support', title: 'PATIENT DESK', value: 'Live Terminal Available\n09:00 — 18:00 WAT' }
      ],
      imageUrl: '/images/hq.png',
      formTitle: 'INQUIRY\nMANIFEST',
      formDesc: 'Submit your clinical requirements through the secured channel below. A licensed pharmacist will audit and synchronize within 60 minutes.'
    }
  },
  {
    id: 'marquee',
    type: 'marquee',
    data: {
      text: 'ESTABLISH SYNC - ABUJA NODE - FCT - GWARINPA - 09.04.12 - ',
      velocity: -0.25
    }
  }
];

export const DEFAULT_RX_TERMINAL_SECTIONS = [
  {
    id: 'hero',
    type: 'rx_hero',
    data: {
      title: 'VERIFICATION',
      subtitle: 'Clinical Rx Upload - Prescription Specification Protocol'
    }
  },
  {
    id: 'guide',
    type: 'rx_guide',
    data: {
      steps: [
        { id: '01', name: 'VISUAL CAPTURE', desc: 'Place prescription on a clinical-white surface. Ensure all medical identifiers (Hospital, MD, Dosage) are legible.' },
        { id: '02', name: 'NODE TRANSMIT', desc: 'Commit JPEG/PNG or PDF to the clinical portal. Our verification team receives an immediate audit notification.' },
        { id: '03', name: 'CLINICAL DISPATCH', desc: 'Upon validation, medication is synchronized for fast, thermal-controlled logistics to your biometric address.' }
      ]
    }
  },
  {
    id: 'uploader',
    type: 'rx_uploader',
    data: {
      title: 'COMMISSION\nUPLOAD',
      desc: 'Our uploader terminal utilizes end-to-end clinical encryption. Your medical data is processed through a high-fidelity verification node before dispatch.',
      videoUrl: '/animations/whatsapp_3.mp4',
      videoLabel: 'Node Activity Monitor'
    }
  },
  {
    id: 'policy',
    type: 'rx_policy',
    data: {
      title: 'CLINICAL\nSPEC',
      subtitle: 'Operational Protocols',
      audits: [
        { title: 'PHARMACIST AUDIT', text: 'Every document is subjected to a live clinical review by our licensed pharmacists within a 30-minute node cycle.' },
        { title: 'DATA INTEGRITY', text: 'Your medical specification is encrypted and handled only by verified clinical staff in accordance with NDPA standards.' }
      ],
      shieldLabel: 'Zero-Trust Verification Active',
      whatsappBtnText: 'Initiate WhatsApp Node',
      whatsappBtnLink: 'https://wa.me/923251206427'
    }
  }
];
