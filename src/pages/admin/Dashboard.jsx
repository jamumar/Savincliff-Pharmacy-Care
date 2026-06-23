import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '@/lib/firebase';
import { 
  ShieldCheck, LogOut, Save, RefreshCw, Plus, Trash2, ArrowUp, ArrowDown, 
  Upload, Check, AlertCircle, Layers, Settings, FileText, Globe, FileCode, CheckSquare,
  Mail, FileUp
} from 'lucide-react';
import { 
  DEFAULT_HOME_SECTIONS, 
  DEFAULT_ABOUT_SECTIONS, 
  DEFAULT_SERVICES_SECTIONS, 
  DEFAULT_WELLNESS_SECTIONS,
  DEFAULT_NAVBAR_SETTINGS,
  DEFAULT_FOOTER_SETTINGS,
  DEFAULT_FAQS_SECTIONS,
  DEFAULT_FAQ_DETAILS,
  DEFAULT_PROTOCOLS_SECTIONS,
  DEFAULT_CONTACT_SECTIONS,
  DEFAULT_RX_TERMINAL_SECTIONS
} from '@/lib/cmsDefaults';
import { PRODUCTS } from '@/lib/shopData';

// ─── Preset templates for new sections that can be added dynamically ───
const SECTION_TEMPLATES = {
  marquee: {
    type: 'marquee',
    data: { text: 'NEW RUNNING MARQUEE TEXT - ', velocity: -0.5 }
  },
  cta: {
    type: 'cta',
    data: { 
      label: 'Get in Touch', 
      title1: 'WANT TO COLABORATE?', 
      title2: 'something', 
      title3: 'AMAZING', 
      primaryBtnText: 'Contact Node', 
      primaryBtnLink: '/contact' 
    }
  },
  home_manifesto: {
    type: 'home_manifesto',
    data: {
      label: 'Clinical Philosophy',
      title: 'Our Standards',
      text: 'Write your manifesto details here.',
      interactiveWords: ['Verification', 'prescription'],
      columns: [{ text: 'Dynamic info block 1' }]
    }
  },
  about_story: {
    type: 'about_story',
    data: {
      title1: 'DYNAMIC',
      title2: 'STORY',
      subtitle: 'Story subtitle text',
      body: 'Story body paragraph here.',
      videoUrl: '/animations/whatsapp_2.mp4'
    }
  },
  services_logistics: {
    type: 'services_logistics',
    data: {
      title: 'LOGISTICS NODE',
      desc: 'Logistics details here.',
      imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80'
    }
  },
  services_capabilities: {
    type: 'services_capabilities',
    data: {
      capabilities: [
        {
          id: '[01]',
          title: 'NEW CLINICAL SERVICE',
          desc: 'Description of clinical service capability.',
          list: ['Capability list item 1', 'Capability list item 2'],
          visualType: 'grid'
        }
      ]
    }
  },
  wellness_categories: {
    type: 'wellness_categories',
    data: {
      label: '[ WELLNESS CORE ]',
      title: 'WELLNESS CATEGORIES',
      categories: [
        { title: 'New Category', text: 'Category description text.', tag: 'Tag' }
      ]
    }
  },
  about_split_sticky: {
    type: 'about_split_sticky',
    data: {
      label: '[OUR DIFFERENCE]',
      title: 'WHY SAVINCLIFF',
      panels: [
        {
          title: 'New Panel',
          bgColor: 'bg-brand-teal',
          textColor: 'text-white',
          items: [
            { label: 'VERIFIED DETAIL', text: 'Detail description text.' }
          ]
        }
      ]
    }
  },
  about_dispensing_care: {
    type: 'about_dispensing_care',
    data: {
      label: '[ DISPENSING ENVIRONMENT ]',
      title: 'BUILT FOR THE FUTURE',
      images: [
        { url: '/images/pharmacy_interior.png', label: 'INTERIOR RENDER', number: '01' }
      ]
    }
  },
  about_showcase: {
    type: 'about_showcase',
    data: {
      label: '[CLINICAL SYSTEMS]',
      title: 'DESIGNED FOR CLINICAL PRECISION',
      stories: [
        {
          id: 'AUTHENTICATION',
          label: 'AUTHENTICATION',
          headline: 'STORY BLOCK DETAILED TEXT HERE.',
          cta: 'READ CLINICAL REPORT',
          stats: [
            { value: 'VERIFIED', label: 'DETAIL LABEL' }
          ]
        }
      ]
    }
  },
  wellness_quality: {
    type: 'wellness_quality',
    data: {
      label: '[ SOURCE COMPLIANCE ]',
      title: 'VERIFIED WELLNESS PRODUCTS',
      copy: 'Every wellness product we stock is selected with quality.',
      detailTitle: 'AUDITED & SEALED',
      detailText: 'Detail text here.'
    }
  },
  protocols_hero: {
    type: 'protocols_hero',
    data: {
      title: 'TRUST BUILT INTO EVERY PROCESS',
      subtitle: 'Savincliff Protocols define how we verify medications, protect patient information, manage prescriptions, and maintain pharmaceutical standards across every point of care.',
      btn1Text: 'Upload Script',
      btn1Link: '/rx-terminal',
      btn2Text: 'Explore Services',
      btn2Link: '/services'
    }
  },
  protocols_intro: {
    type: 'protocols_intro',
    data: {
      title: 'The Savincliff Standard',
      desc: 'Every pharmacy interaction depends on trust. Our protocols are designed to support medication safety, sourcing integrity, dispensing accuracy, patient privacy, and consistent pharmaceutical care.'
    }
  },
  protocols_certifications: {
    type: 'protocols_certifications',
    data: { label: 'Verification Systems', badges: [{ id: 'PCN', title: 'PCN REGISTRY', body: 'Detail here.' }] }
  },
  protocols_pillars: {
    type: 'protocols_pillars',
    data: {
      title: 'Core Protocol Pillars',
      subtitle: 'Our operational standards ensure safety and security at every level.',
      pillars: [
        {
          title: 'Verified Sourcing',
          body: 'Medications and wellness products are selected through trusted pharmaceutical supply channels to support authenticity and quality.'
        }
      ]
    }
  },
  protocols_visual_systems: {
    type: 'protocols_visual_systems',
    data: {
      title: 'Clinical Infrastructure, Digitally Supported',
      desc: 'Savincliff combines physical pharmacy workflows with digital tools for prescription intake, payment, patient records, refill tracking, and internal inventory control.',
      blocks: [
        { name: 'RX Upload' }
      ]
    }
  },
  protocols_compliance: {
    type: 'protocols_compliance',
    data: {
      title: 'Regulatory Alignment',
      desc: 'Our operations are structured to align with applicable pharmacy, product safety, data protection, and professional practice expectations in Nigeria.',
      items: [
        'PCN-aligned pharmacy operations'
      ]
    }
  },
  protocols_portal_security: {
    type: 'protocols_portal_security',
    data: {
      title: 'Protected Patient Access',
      desc: 'The Savincliff patient portal is designed to give patients secure access to prescription history, refill activity, order updates, and selected pharmacy records.',
      items: [
        'Secure login'
      ]
    }
  },
  protocols_timeline: {
    type: 'protocols_timeline',
    data: {
      title: 'From Script to Dispensing',
      steps: [
        {
          number: '01',
          title: 'Patient uploads prescription',
          desc: 'Patient submits prescription files through the secure digital portal.',
          bgColor: 'bg-gradient-to-br from-[#400e0e] to-[#1a0505]',
          textColor: 'text-white'
        }
      ]
    }
  },
  protocols_cta: {
    type: 'protocols_cta',
    data: {
      title: 'Precision. Verification. Care.',
      subtitle: 'Our protocols exist to make modern pharmacy care safer, clearer, and more reliable for every patient.',
      btn1Text: 'Upload Script',
      btn1Link: '/rx-terminal',
      btn2Text: 'Access Patient Portal',
      btn2Link: '/rx-terminal'
    }
  },
  protocols_footer_strip: {
    type: 'protocols_footer_strip',
    data: { nodes: ['PCN', 'NAFDAC'] }
  },
  contact_hero: {
    type: 'contact_hero',
    data: { title: 'CONTACT', subtitle: 'Abuja Node' }
  },
  contact_grid: {
    type: 'contact_grid',
    data: {
      nodes: [{ label: 'Physical', title: 'CLINICAL HQ', value: 'Abuja' }],
      imageUrl: '/images/hq.png',
      formTitle: 'INQUIRY FORM',
      formDesc: 'Submit message.'
    }
  },
  rx_hero: {
    type: 'rx_hero',
    data: { title: 'VERIFICATION', subtitle: 'Rx Upload Protocol' }
  },
  rx_guide: {
    type: 'rx_guide',
    data: { steps: [{ id: '01', name: 'VISUAL CAPTURE', desc: 'Instructions here.' }] }
  },
  rx_uploader: {
    type: 'rx_uploader',
    data: { title: 'UPLOAD', desc: 'Uploader instructions.', videoUrl: '/animations/whatsapp_3.mp4', videoLabel: 'Monitor' }
  },
  rx_policy: {
    type: 'rx_policy',
    data: {
      title: 'CLINICAL SPEC',
      subtitle: 'Operational Protocols',
      audits: [{ title: 'PHARMACIST AUDIT', text: 'Details here.' }],
      shieldLabel: 'Zero-Trust Active',
      whatsappBtnText: 'Initiate WhatsApp Node',
      whatsappBtnLink: 'https://wa.me/923251206427'
    }
  }
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('home'); // home, about, services, wellness, faqs, faq_details, globals
  const [sections, setSections] = useState([]);
  const [globalNavbar, setGlobalNavbar] = useState(DEFAULT_NAVBAR_SETTINGS);
  const [globalFooter, setGlobalFooter] = useState(DEFAULT_FOOTER_SETTINGS);
  const [faqDetails, setFaqDetails] = useState(DEFAULT_FAQ_DETAILS);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [selectedSectionIdx, setSelectedSectionIdx] = useState(null);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // Watch Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate('/admin/login');
      } else {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // Load configuration based on active tab
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setMessage({ text: '', type: '' });
      setSelectedSectionIdx(null);
      
      try {
        if (activeTab === 'globals') {
          // Load Navbar and Footer configs
          const navSnap = await getDoc(doc(db, 'settings', 'navbar'));
          const footerSnap = await getDoc(doc(db, 'settings', 'footer'));
          
          setGlobalNavbar(navSnap.exists() ? navSnap.data() : DEFAULT_NAVBAR_SETTINGS);
          setGlobalFooter(footerSnap.exists() ? footerSnap.data() : DEFAULT_FOOTER_SETTINGS);
        } else if (activeTab === 'faq_details') {
          const detailsSnap = await getDoc(doc(db, 'settings', 'faq_details'));
          setFaqDetails(detailsSnap.exists() ? detailsSnap.data() : DEFAULT_FAQ_DETAILS);
        } else {
          // Load Page layout configs
          const pageSnap = await getDoc(doc(db, 'pages', activeTab));
          if (pageSnap.exists() && pageSnap.data().sections) {
            const merged = pageSnap.data().sections.map(sec => {
              const template = SECTION_TEMPLATES[sec.type];
              if (template && template.data) {
                return {
                  ...sec,
                  data: {
                    ...JSON.parse(JSON.stringify(template.data)),
                    ...sec.data
                  }
                };
              }
              return sec;
            });
            setSections(merged);
          } else {
            // Uninitialized page -> load local default settings cloned to prevent mutation
            let defaults = [];
            if (activeTab === 'home') defaults = DEFAULT_HOME_SECTIONS;
            else if (activeTab === 'about') defaults = DEFAULT_ABOUT_SECTIONS;
            else if (activeTab === 'services') defaults = DEFAULT_SERVICES_SECTIONS;
            else if (activeTab === 'wellness') defaults = DEFAULT_WELLNESS_SECTIONS;
            else if (activeTab === 'faqs') defaults = DEFAULT_FAQS_SECTIONS;
            else if (activeTab === 'protocols') defaults = DEFAULT_PROTOCOLS_SECTIONS;
            else if (activeTab === 'contact') defaults = DEFAULT_CONTACT_SECTIONS;
            else if (activeTab === 'rx_terminal') defaults = DEFAULT_RX_TERMINAL_SECTIONS;
            setSections(JSON.parse(JSON.stringify(defaults)));
          }
        }
      } catch (err) {
        console.error(err);
        showMsg('Error loading page configurations.', 'error');
      } finally {
        setLoading(false);
      }
    }
    if (user) loadData();
  }, [activeTab, user]);

  const showMsg = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 5000);
  };

  // ─── Layout Initializer (writes static defaults to Firestore) ───
  const handleInitializeDefault = async () => {
    setSaving(true);
    try {
      if (activeTab === 'globals') {
        await setDoc(doc(db, 'settings', 'navbar'), DEFAULT_NAVBAR_SETTINGS);
        await setDoc(doc(db, 'settings', 'footer'), DEFAULT_FOOTER_SETTINGS);
        setGlobalNavbar(DEFAULT_NAVBAR_SETTINGS);
        setGlobalFooter(DEFAULT_FOOTER_SETTINGS);
      } else if (activeTab === 'faq_details') {
        await setDoc(doc(db, 'settings', 'faq_details'), DEFAULT_FAQ_DETAILS);
        setFaqDetails(DEFAULT_FAQ_DETAILS);
      } else {
        let defaults = [];
        if (activeTab === 'home') defaults = DEFAULT_HOME_SECTIONS;
        else if (activeTab === 'about') defaults = DEFAULT_ABOUT_SECTIONS;
        else if (activeTab === 'services') defaults = DEFAULT_SERVICES_SECTIONS;
        else if (activeTab === 'wellness') defaults = DEFAULT_WELLNESS_SECTIONS;
        else if (activeTab === 'faqs') defaults = DEFAULT_FAQS_SECTIONS;
        else if (activeTab === 'protocols') defaults = DEFAULT_PROTOCOLS_SECTIONS;
        else if (activeTab === 'contact') defaults = DEFAULT_CONTACT_SECTIONS;
        else if (activeTab === 'rx_terminal') defaults = DEFAULT_RX_TERMINAL_SECTIONS;

        await setDoc(doc(db, 'pages', activeTab), { sections: defaults });
        setSections(defaults);
      }
      showMsg('Layout initialized successfully with static content defaults.');
    } catch (err) {
      console.error(err);
      showMsg('Failed to initialize page layout.', 'error');
    } finally {
      setSaving(false);
    }
  };

  // ─── Save Changes back to Firestore ───
  const handleSaveChanges = async () => {
    setSaving(true);
    try {
      if (activeTab === 'globals') {
        await setDoc(doc(db, 'settings', 'navbar'), globalNavbar);
        await setDoc(doc(db, 'settings', 'footer'), globalFooter);
      } else if (activeTab === 'faq_details') {
        await setDoc(doc(db, 'settings', 'faq_details'), faqDetails);
      } else {
        await setDoc(doc(db, 'pages', activeTab), { sections });
      }
      showMsg('Configuration changes synchronized successfully!');
    } catch (err) {
      console.error(err);
      showMsg('Failed to sync configs.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = () => {
    signOut(auth).then(() => navigate('/admin/login'));
  };

  // ─── Sections Array Helpers (Reorder, Add, Delete) ───
  const moveSection = (index, direction) => {
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= sections.length) return;
    
    // Constraint check: Hero Section on Home must stay at top index 0
    if (activeTab === 'home') {
      if (index === 0 || targetIdx === 0) return;
    }

    const updated = [...sections];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    
    setSections(updated);
    if (selectedSectionIdx === index) setSelectedSectionIdx(targetIdx);
    else if (selectedSectionIdx === targetIdx) setSelectedSectionIdx(index);
  };

  const deleteSection = (index) => {
    // Constraint check: Hero section cannot be deleted
    if (sections[index].type === 'home_hero' || sections[index].type === 'about_hero' || sections[index].type === 'services_hero' || sections[index].type === 'wellness_hero') {
      alert('The Hero section is a core structural layout element and cannot be deleted.');
      return;
    }
    const updated = sections.filter((_, i) => i !== index);
    setSections(updated);
    setSelectedSectionIdx(null);
  };

  const addSection = (templateKey) => {
    const template = SECTION_TEMPLATES[templateKey];
    if (!template) return;

    const newSec = {
      id: 'section_' + Date.now(),
      type: template.type,
      data: JSON.parse(JSON.stringify(template.data))
    };
    
    setSections([...sections, newSec]);
    setSelectedSectionIdx(sections.length);
  };

  // ─── Inline Media Upload Field ───
  function MediaUploadField({ label, value, onChange }) {
    const [progress, setProgress] = useState(0);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      setUploading(true);
      setProgress(0);

      const fileRef = ref(storage, `cms/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(fileRef, file);

      uploadTask.on('state_changed',
        (snapshot) => {
          const pct = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(Math.round(pct));
        },
        (err) => {
          console.error(err);
          alert('Upload failed: ' + err.message);
          setUploading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          onChange(downloadURL);
          setUploading(false);
        }
      );
    };

    return (
      <div className="space-y-2 border border-white/5 bg-white/[0.01] p-6 rounded-sm">
        <label className="text-3xs font-black tracking-widest uppercase opacity-40">{label}</label>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 bg-transparent border-b border-white/10 py-2 text-xs focus:outline-none focus:border-brand-teal"
            placeholder="URL path (e.g. /images/asset.png or upload below)"
          />
          <div className="relative">
            <input
              type="file"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              accept="image/*,video/*"
            />
            <button
              type="button"
              className="flex items-center justify-center gap-2 border border-white/20 hover:border-brand-teal hover:text-brand-teal px-5 py-2.5 text-2xs font-black uppercase tracking-widest transition-all"
            >
              <Upload className="w-3.5 h-3.5" />
              {uploading ? `${progress}%` : 'Upload File'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen flex flex-col font-sans selection:bg-brand-teal selection:text-white">
      
      {/* ─── Top Navbar ─── */}
      <header className="border-b border-white/10 bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-brand-teal" />
            <span className="text-sm font-black tracking-[0.3em] uppercase">SAVINCLIFF CMS</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-3xs font-black tracking-widest text-white/30 uppercase hidden md:inline">
              OPERATOR: {user?.email}
            </span>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 border border-white/15 px-4 py-2 text-3xs font-black uppercase tracking-widest hover:border-red-500 hover:text-red-500 transition-all"
            >
              <LogOut className="w-3 h-3" />
              Exit Session
            </button>
          </div>
        </div>
      </header>

      {/* ─── Main Columns Layout ─── */}
      <div className="flex-1 max-w-[1800px] mx-auto w-full px-6 md:px-12 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ── Column Left: Navigation Tabs / Sidebar (Cols 3) ── */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="border border-white/15 p-6 rounded-sm bg-white/[0.01] space-y-4">
            <p className="text-3xs font-black tracking-widest text-white/30 uppercase mb-4">[ ACCESS DIRECTORY ]</p>
            
            {[
              { id: 'home', label: 'Home Page', icon: Layers },
              { id: 'about', label: 'About Page', icon: FileText },
              { id: 'services', label: 'Services Page', icon: FileCode },
              { id: 'wellness', label: 'Wellness Page', icon: Globe },
              { id: 'faqs', label: 'FAQ / Inquiries Page', icon: AlertCircle },
              { id: 'faq_details', label: 'FAQ Detail Pages', icon: FileText },
              { id: 'protocols', label: 'Protocols Page', icon: ShieldCheck },
              { id: 'contact', label: 'Contact Page', icon: Mail },
              { id: 'rx_terminal', label: 'Rx Terminal Page', icon: FileUp },
              { id: 'globals', label: 'Global Layouts', icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 w-full px-5 py-4 border text-2xs font-black uppercase tracking-widest text-left transition-all ${
                    activeTab === tab.id
                      ? 'bg-brand-teal text-white border-brand-teal'
                      : 'border-white/5 hover:border-white/20 bg-transparent text-white/60 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Action buttons */}
          <div className="border border-white/15 p-6 rounded-sm bg-white/[0.01] space-y-4">
            <button
              disabled={saving || loading}
              onClick={handleSaveChanges}
              className="flex items-center justify-center gap-2 w-full bg-white text-black px-6 py-4 text-2xs font-black uppercase tracking-widest hover:bg-brand-teal hover:text-white transition-all duration-500 disabled:opacity-30"
            >
              <Save className="w-4 h-4" />
              Sync Changes
            </button>

            <button
              disabled={saving}
              onClick={handleInitializeDefault}
              className="flex items-center justify-center gap-2 w-full border border-white/10 hover:border-brand-teal hover:text-brand-teal px-6 py-4 text-2xs font-black uppercase tracking-widest transition-all disabled:opacity-30"
            >
              <RefreshCw className="w-4 h-4" />
              Initialize Layout
            </button>
          </div>
        </aside>

        {/* ── Column Right: Settings Form Workspaces (Cols 9) ── */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* Status Message Display */}
          {message.text && (
            <div className={`p-6 border rounded-sm flex items-center gap-4 text-xs font-bold uppercase tracking-wider ${
              message.type === 'error'
                ? 'bg-red-500/10 border-red-500/20 text-red-500'
                : 'bg-brand-teal/10 border-brand-teal/20 text-brand-teal'
            }`}>
              <AlertCircle className="w-5 h-5 shrink-0" />
              {message.text}
            </div>
          )}

          {loading ? (
            <div className="border border-white/10 p-24 text-center rounded-sm bg-white/[0.01]">
              <div className="w-8 h-8 border-4 border-white/10 border-t-brand-teal rounded-full animate-spin mx-auto mb-4" />
              <p className="text-2xs font-black tracking-[0.2em] text-white/30 uppercase">Syncing Firestore Data Node...</p>
            </div>
          ) : activeTab === 'globals' ? (
            /* ─────────────────────────────────────────────────────────────
               WORKSPACE: GLOBALS (Navbar & Footer Editors)
               ───────────────────────────────────────────────────────────── */
            <div className="space-y-8">
              
              {/* NAVBAR EDIT SECTION */}
              <div className="border border-white/10 p-8 rounded-sm bg-white/[0.01] space-y-6 text-left">
                <h2 className="text-xl font-black uppercase tracking-tighter border-b border-white/5 pb-4">
                  Navbar Specifications
                </h2>
                
                {/* Mobile Marquee text */}
                <div className="space-y-2">
                  <label className="text-3xs font-black tracking-widest uppercase opacity-40">Mobile Drawer Tape Marquee</label>
                  <input
                    type="text"
                    value={globalNavbar.marqueeText || ''}
                    onChange={(e) => setGlobalNavbar({ ...globalNavbar, marqueeText: e.target.value })}
                    className="w-full bg-transparent border-b border-white/10 py-3 text-sm font-semibold focus:outline-none focus:border-brand-teal"
                  />
                </div>

                {/* Navbar Links List */}
                <div className="space-y-4">
                  <label className="text-3xs font-black tracking-widest uppercase opacity-40">Navigation Menu Links</label>
                  <div className="space-y-3">
                    {globalNavbar.navItems.map((item, idx) => (
                      <div key={idx} className="flex gap-4 items-center">
                        <input
                          type="text"
                          value={item.label}
                          onChange={(e) => {
                            const updated = [...globalNavbar.navItems];
                            updated[idx].label = e.target.value;
                            setGlobalNavbar({ ...globalNavbar, navItems: updated });
                          }}
                          className="flex-1 bg-transparent border border-white/10 p-3 text-xs focus:outline-none focus:border-brand-teal"
                          placeholder="Label (e.g. WELLNESS)"
                        />
                        <input
                          type="text"
                          value={item.path}
                          onChange={(e) => {
                            const updated = [...globalNavbar.navItems];
                            updated[idx].path = e.target.value;
                            setGlobalNavbar({ ...globalNavbar, navItems: updated });
                          }}
                          className="flex-1 bg-transparent border border-white/10 p-3 text-xs focus:outline-none focus:border-brand-teal"
                          placeholder="Path (e.g. /products)"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = globalNavbar.navItems.filter((_, i) => i !== idx);
                            setGlobalNavbar({ ...globalNavbar, navItems: updated });
                          }}
                          className="p-3 border border-white/10 text-red-500 hover:bg-red-500/10 hover:border-red-500/20 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        setGlobalNavbar({
                          ...globalNavbar,
                          navItems: [...globalNavbar.navItems, { label: 'NEW LINK', path: '/' }]
                        });
                      }}
                      className="flex items-center gap-2 border border-dashed border-white/20 hover:border-brand-teal hover:text-brand-teal p-3 text-3xs font-black uppercase tracking-widest w-full justify-center transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Navbar Item
                    </button>
                  </div>
                </div>
              </div>

              {/* FOOTER EDIT SECTION */}
              <div className="border border-white/10 p-8 rounded-sm bg-white/[0.01] space-y-6 text-left">
                <h2 className="text-xl font-black uppercase tracking-tighter border-b border-white/5 pb-4">
                  Footer Specifications
                </h2>
                
                {/* Text fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-3xs font-black tracking-widest uppercase opacity-40">Copyright Label</label>
                    <input
                      type="text"
                      value={globalFooter.copyright || ''}
                      onChange={(e) => setGlobalFooter({ ...globalFooter, copyright: e.target.value })}
                      className="w-full bg-transparent border-b border-white/10 py-3 text-sm focus:outline-none focus:border-brand-teal font-semibold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-3xs font-black tracking-widest uppercase opacity-40">Compliance Statement</label>
                    <input
                      type="text"
                      value={globalFooter.compliance || ''}
                      onChange={(e) => setGlobalFooter({ ...globalFooter, compliance: e.target.value })}
                      className="w-full bg-transparent border-b border-white/10 py-3 text-sm focus:outline-none focus:border-brand-teal font-semibold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-3xs font-black tracking-widest uppercase opacity-40">WhatsApp Number Link</label>
                    <input
                      type="text"
                      value={globalFooter.whatsappLink || ''}
                      onChange={(e) => setGlobalFooter({ ...globalFooter, whatsappLink: e.target.value })}
                      className="w-full bg-transparent border-b border-white/10 py-3 text-sm focus:outline-none focus:border-brand-teal font-semibold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-3xs font-black tracking-widest uppercase opacity-40">Giant Faint Watermark</label>
                    <input
                      type="text"
                      value={globalFooter.giantWatermark || ''}
                      onChange={(e) => setGlobalFooter({ ...globalFooter, giantWatermark: e.target.value })}
                      className="w-full bg-transparent border-b border-white/10 py-3 text-sm focus:outline-none focus:border-brand-teal font-semibold"
                    />
                  </div>
                </div>

                {/* Media upload for WhatsApp FAB */}
                <MediaUploadField
                  label="WhatsApp Video Asset (.mp4)"
                  value={globalFooter.whatsappVideo}
                  onChange={(url) => setGlobalFooter({ ...globalFooter, whatsappVideo: url })}
                />

                {/* Footer Page Mappings headings editor */}
                <div className="space-y-4 border-t border-white/5 pt-6">
                  <label className="text-3xs font-black tracking-widest uppercase opacity-40">Page-Specific Footer Headings</label>
                  <div className="space-y-6">
                    {Object.keys(globalFooter.pageFooters).map((pathKey) => {
                      const pf = globalFooter.pageFooters[pathKey];
                      return (
                        <div key={pathKey} className="border border-white/5 p-6 rounded-sm space-y-4 bg-white/[0.005]">
                          <span className="text-3xs font-black tracking-widest text-brand-teal uppercase">Path Node: {pathKey}</span>
                          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                            <input
                              type="text"
                              value={pf.topText || ''}
                              onChange={(e) => {
                                const updated = { ...globalFooter.pageFooters };
                                updated[pathKey].topText = e.target.value;
                                setGlobalFooter({ ...globalFooter, pageFooters: updated });
                              }}
                              placeholder="Top label (e.g. MODERN)"
                              className="bg-transparent border-b border-white/10 p-2 text-xs focus:outline-none focus:border-brand-teal font-medium"
                            />
                            <input
                              type="text"
                              value={pf.line1 || ''}
                              onChange={(e) => {
                                const updated = { ...globalFooter.pageFooters };
                                updated[pathKey].line1 = e.target.value;
                                setGlobalFooter({ ...globalFooter, pageFooters: updated });
                              }}
                              placeholder="Line 1 heading"
                              className="bg-transparent border-b border-white/10 p-2 text-xs focus:outline-none focus:border-brand-teal font-medium"
                            />
                            <input
                              type="text"
                              value={pf.middleText || ''}
                              onChange={(e) => {
                                const updated = { ...globalFooter.pageFooters };
                                updated[pathKey].middleText = e.target.value;
                                setGlobalFooter({ ...globalFooter, pageFooters: updated });
                              }}
                              placeholder="Middle connective (e.g. OF)"
                              className="bg-transparent border-b border-white/10 p-2 text-xs focus:outline-none focus:border-brand-teal font-medium"
                            />
                            <input
                              type="text"
                              value={pf.line2 || ''}
                              onChange={(e) => {
                                const updated = { ...globalFooter.pageFooters };
                                updated[pathKey].line2 = e.target.value;
                                setGlobalFooter({ ...globalFooter, pageFooters: updated });
                              }}
                              placeholder="Line 2 heading"
                              className="bg-transparent border-b border-white/10 p-2 text-xs focus:outline-none focus:border-brand-teal font-medium"
                            />
                            <input
                              type="text"
                              value={pf.ctaText || ''}
                              onChange={(e) => {
                                const updated = { ...globalFooter.pageFooters };
                                updated[pathKey].ctaText = e.target.value;
                                setGlobalFooter({ ...globalFooter, pageFooters: updated });
                              }}
                              placeholder="CTA button text"
                              className="bg-transparent border-b border-white/10 p-2 text-xs focus:outline-none focus:border-brand-teal font-medium"
                            />
                            <input
                              type="text"
                              value={pf.ctaPath || ''}
                              onChange={(e) => {
                                const updated = { ...globalFooter.pageFooters };
                                updated[pathKey].ctaPath = e.target.value;
                                setGlobalFooter({ ...globalFooter, pageFooters: updated });
                              }}
                              placeholder="CTA redirect path"
                              className="bg-transparent border-b border-white/10 p-2 text-xs focus:outline-none focus:border-brand-teal font-medium"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 3D Models Config lists */}
                <div className="space-y-4 border-t border-white/5 pt-6">
                  <label className="text-3xs font-black tracking-widest uppercase opacity-40">Active 3D Models Index</label>
                  <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2">
                    {globalFooter.models.map((model, idx) => (
                      <div key={idx} className="flex gap-4 items-center">
                        <span className="text-3xs font-black text-brand-teal shrink-0">0{idx + 1}</span>
                        <input
                          type="text"
                          value={model.label}
                          onChange={(e) => {
                            const updated = [...globalFooter.models];
                            updated[idx].label = e.target.value;
                            setGlobalFooter({ ...globalFooter, models: updated });
                          }}
                          className="flex-1 bg-transparent border border-white/10 p-2 text-2xs focus:outline-none"
                          placeholder="Label"
                        />
                        <input
                          type="text"
                          value={model.url}
                          onChange={(e) => {
                            const updated = [...globalFooter.models];
                            updated[idx].url = e.target.value;
                            setGlobalFooter({ ...globalFooter, models: updated });
                          }}
                          className="flex-2 bg-transparent border border-white/10 p-2 text-2xs focus:outline-none"
                          placeholder="Model GLTF URL (.glb)"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Social Links Editor */}
                <div className="space-y-4 border-t border-white/5 pt-6">
                  <label className="text-3xs font-black tracking-widest uppercase opacity-40">Social Links (Footer)</label>
                  <div className="space-y-3">
                    {(globalFooter.socialLinks || []).map((social, idx) => (
                      <div key={idx} className="flex gap-4 items-center">
                        <input
                          type="text"
                          value={social.name}
                          onChange={(e) => {
                            const updated = [...globalFooter.socialLinks];
                            updated[idx].name = e.target.value;
                            setGlobalFooter({ ...globalFooter, socialLinks: updated });
                          }}
                          className="flex-1 bg-transparent border border-white/10 p-2.5 text-xs focus:outline-none"
                          placeholder="Name"
                        />
                        <input
                          type="text"
                          value={social.path}
                          onChange={(e) => {
                            const updated = [...globalFooter.socialLinks];
                            updated[idx].path = e.target.value;
                            setGlobalFooter({ ...globalFooter, socialLinks: updated });
                          }}
                          className="flex-1 bg-transparent border border-white/10 p-2.5 text-xs focus:outline-none"
                          placeholder="Path/URL"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = globalFooter.socialLinks.filter((_, i) => i !== idx);
                            setGlobalFooter({ ...globalFooter, socialLinks: updated });
                          }}
                          className="p-2 border border-white/10 text-red-500 hover:bg-red-500/10 hover:border-red-500/20 transition-all"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        setGlobalFooter({
                          ...globalFooter,
                          socialLinks: [...(globalFooter.socialLinks || []), { name: 'NEW SOCIAL', path: '#' }]
                        });
                      }}
                      className="flex items-center gap-2 border border-dashed border-white/20 hover:border-brand-teal hover:text-brand-teal p-3 text-3xs font-black uppercase tracking-widest w-full justify-center transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Social Link
                    </button>
                  </div>
                </div>

                {/* Footer Links Column Editor */}
                <div className="space-y-4 border-t border-white/5 pt-6">
                  <label className="text-3xs font-black tracking-widest uppercase opacity-40">Footer Links Column Directory</label>
                  <div className="space-y-6">
                    {(globalFooter.footerLinks || []).map((group, groupIdx) => (
                      <div key={groupIdx} className="border border-white/5 p-6 rounded-sm bg-white/[0.005] space-y-4">
                        <div className="flex justify-between items-center">
                          <input
                            type="text"
                            value={group.title}
                            onChange={(e) => {
                              const updated = [...globalFooter.footerLinks];
                              updated[groupIdx].title = e.target.value;
                              setGlobalFooter({ ...globalFooter, footerLinks: updated });
                            }}
                            className="bg-transparent border-b border-brand-teal py-1 text-xs font-black tracking-widest uppercase focus:outline-none text-brand-teal w-2/3"
                            placeholder="Column Title (e.g. COMPANY)"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updated = globalFooter.footerLinks.filter((_, i) => i !== groupIdx);
                              setGlobalFooter({ ...globalFooter, footerLinks: updated });
                            }}
                            className="text-red-500 hover:text-red-400 p-1 border border-white/5"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Column Links List */}
                        <div className="space-y-2 pl-4">
                          {(group.links || []).map((link, linkIdx) => (
                            <div key={linkIdx} className="flex gap-4 items-center">
                              <input
                                type="text"
                                value={link.name}
                                onChange={(e) => {
                                  const updated = [...globalFooter.footerLinks];
                                  updated[groupIdx].links[linkIdx].name = e.target.value;
                                  setGlobalFooter({ ...globalFooter, footerLinks: updated });
                                }}
                                className="flex-1 bg-transparent border border-white/10 p-2 text-2xs focus:outline-none"
                                placeholder="Link Name"
                              />
                              <input
                                type="text"
                                value={link.path}
                                onChange={(e) => {
                                  const updated = [...globalFooter.footerLinks];
                                  updated[groupIdx].links[linkIdx].path = e.target.value;
                                  setGlobalFooter({ ...globalFooter, footerLinks: updated });
                                }}
                                className="flex-1 bg-transparent border border-white/10 p-2 text-2xs focus:outline-none"
                                placeholder="Link Path"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = [...globalFooter.footerLinks];
                                  updated[groupIdx].links = group.links.filter((_, i) => i !== linkIdx);
                                  setGlobalFooter({ ...globalFooter, footerLinks: updated });
                                }}
                                className="text-red-500 hover:text-red-400"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...globalFooter.footerLinks];
                              updated[groupIdx].links = [...(group.links || []), { name: 'NEW LINK', path: '/' }];
                              setGlobalFooter({ ...globalFooter, footerLinks: updated });
                            }}
                            className="border border-dashed border-white/20 hover:border-brand-teal hover:text-brand-teal px-3 py-1.5 text-4xs font-black uppercase tracking-widest"
                          >
                            + Add Link Item
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        setGlobalFooter({
                          ...globalFooter,
                          footerLinks: [...(globalFooter.footerLinks || []), { title: 'NEW COLUMN', links: [] }]
                        });
                      }}
                      className="flex items-center gap-2 border border-dashed border-white/20 hover:border-brand-teal hover:text-brand-teal p-3 text-3xs font-black uppercase tracking-widest w-full justify-center transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Footer Column
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : activeTab === 'faq_details' ? (
            /* ─────────────────────────────────────────────────────────────
               WORKSPACE: FAQ DETAILS (Q&A detail sub-pages map)
               ───────────────────────────────────────────────────────────── */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Slugs list (cols 5) */}
              <div className="lg:col-span-5 border border-white/10 p-6 rounded-sm bg-white/[0.01] space-y-6 text-left">
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <h2 className="text-base font-black uppercase tracking-widest">FAQ Slugs</h2>
                  <button 
                    onClick={() => {
                      const newSlug = prompt("Enter new slug ID (lowercase, hyphenated, e.g. shipping-times):");
                      if (newSlug) {
                        const cleanSlug = newSlug.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                        if (faqDetails[cleanSlug]) {
                          alert("Slug already exists!");
                          return;
                        }
                        const updated = { ...faqDetails };
                        updated[cleanSlug] = {
                          category: 'PATIENT SUPPORT',
                          shortTitle: 'New FAQ Detail Title',
                          question: 'What is the question?',
                          summary: 'Enter a short summary.',
                          fullText: 'Enter complete detail body here.',
                          ctaBadge: 'HELP',
                          ctaHeading: 'CTA Heading details here.',
                          ctaBenefits: ['Benefit bullet point 1'],
                          related: []
                        };
                        setFaqDetails(updated);
                        setSelectedSectionIdx(cleanSlug);
                      }
                    }}
                    className="flex items-center gap-1.5 border border-brand-teal text-brand-teal px-3 py-1.5 text-3xs font-black uppercase tracking-widest hover:bg-brand-teal hover:text-white transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Slug
                  </button>
                </div>

                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                  {Object.keys(faqDetails).map((slugKey) => (
                    <div
                      key={slugKey}
                      onClick={() => setSelectedSectionIdx(slugKey)}
                      className={`p-4 border cursor-pointer rounded-sm flex justify-between items-center transition-all ${
                        selectedSectionIdx === slugKey
                          ? 'border-brand-teal bg-brand-teal/5 text-white'
                          : 'border-white/5 hover:border-white/10 bg-transparent text-white/60 hover:text-white'
                      }`}
                    >
                      <div className="space-y-1">
                        <span className="text-3xs font-black text-white/30 uppercase mr-2">[slug]</span>
                        <span className="text-2xs font-black uppercase tracking-widest">{slugKey}</span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (slugKey === 'default') {
                            alert("The default slug cannot be deleted.");
                            return;
                          }
                          if (confirm(`Delete slug "${slugKey}"?`)) {
                            const updated = { ...faqDetails };
                            delete updated[slugKey];
                            setFaqDetails(updated);
                            setSelectedSectionIdx(null);
                          }
                        }}
                        className="p-1.5 border border-white/5 hover:border-red-500 text-white/30 hover:text-red-500 transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Slug editor fields (cols 7) */}
              <div className="lg:col-span-7 border border-white/10 p-8 rounded-sm bg-white/[0.01] text-left space-y-6">
                <h2 className="text-base font-black uppercase tracking-widest border-b border-white/5 pb-4">
                  FAQ Slug Detail Fields
                </h2>

                {(!selectedSectionIdx || !faqDetails[selectedSectionIdx]) ? (
                  <div className="text-center py-20 text-white/30 border border-dashed border-white/10 p-6">
                    <p className="text-xs font-semibold uppercase">Select an FAQ slug from the list to edit its details</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-white/[0.02] p-4 border border-white/5 rounded-sm">
                      <p className="text-3xs font-black uppercase tracking-widest text-brand-teal">ACTIVE SLUG KEY</p>
                      <p className="text-xs font-black uppercase tracking-widest">{selectedSectionIdx}</p>
                    </div>

                    <div className="space-y-4">
                      {/* Slug key modification */}
                      {selectedSectionIdx !== 'default' && (
                        <div className="space-y-2">
                          <label className="text-3xs font-black tracking-widest uppercase opacity-40">Change Slug ID</label>
                          <input
                            type="text"
                            value={selectedSectionIdx}
                            onChange={(e) => {
                              const newKey = e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                              if (newKey && newKey !== selectedSectionIdx) {
                                const updated = { ...faqDetails };
                                updated[newKey] = updated[selectedSectionIdx];
                                delete updated[selectedSectionIdx];
                                setFaqDetails(updated);
                                setSelectedSectionIdx(newKey);
                              }
                            }}
                            className="w-full bg-transparent border-b border-white/10 py-3 text-xs focus:outline-none focus:border-brand-teal font-semibold"
                          />
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-3xs font-black tracking-widest uppercase opacity-40">Category Eyebrow</label>
                          <input
                            type="text"
                            value={faqDetails[selectedSectionIdx].category || ''}
                            onChange={(e) => {
                              const updated = { ...faqDetails };
                              updated[selectedSectionIdx].category = e.target.value;
                              setFaqDetails(updated);
                            }}
                            className="w-full bg-transparent border-b border-white/10 py-2 text-xs focus:outline-none font-semibold"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-3xs font-black tracking-widest uppercase opacity-40">Breadcrumb Short Title</label>
                          <input
                            type="text"
                            value={faqDetails[selectedSectionIdx].shortTitle || ''}
                            onChange={(e) => {
                              const updated = { ...faqDetails };
                              updated[selectedSectionIdx].shortTitle = e.target.value;
                              setFaqDetails(updated);
                            }}
                            className="w-full bg-transparent border-b border-white/10 py-2 text-xs focus:outline-none font-semibold"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-3xs font-black tracking-widest uppercase opacity-40">Main Question Title</label>
                        <input
                          type="text"
                          value={faqDetails[selectedSectionIdx].question || ''}
                          onChange={(e) => {
                            const updated = { ...faqDetails };
                            updated[selectedSectionIdx].question = e.target.value;
                            setFaqDetails(updated);
                          }}
                          className="w-full bg-transparent border-b border-white/10 py-2 text-xs focus:outline-none font-semibold"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-3xs font-black tracking-widest uppercase opacity-40">Highlighted Summary</label>
                        <textarea
                          rows={3}
                          value={faqDetails[selectedSectionIdx].summary || ''}
                          onChange={(e) => {
                            const updated = { ...faqDetails };
                            updated[selectedSectionIdx].summary = e.target.value;
                            setFaqDetails(updated);
                          }}
                          className="w-full bg-white/[0.02] border border-white/10 p-3 text-xs focus:outline-none font-semibold leading-relaxed"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-3xs font-black tracking-widest uppercase opacity-40">Full Expanded Details Content</label>
                        <textarea
                          rows={6}
                          value={faqDetails[selectedSectionIdx].fullText || ''}
                          onChange={(e) => {
                            const updated = { ...faqDetails };
                            updated[selectedSectionIdx].fullText = e.target.value;
                            setFaqDetails(updated);
                          }}
                          className="w-full bg-white/[0.02] border border-white/10 p-3 text-xs focus:outline-none font-semibold leading-relaxed"
                        />
                      </div>

                      {/* CTA Panel elements */}
                      <div className="border border-white/10 p-4 rounded-sm bg-white/[0.005] space-y-4">
                        <span className="text-3xs font-black tracking-widest text-brand-teal uppercase">[ Teal CTA Block Details ]</span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-3xs font-black tracking-widest uppercase opacity-40">CTA Badge Text</label>
                            <input
                              type="text"
                              value={faqDetails[selectedSectionIdx].ctaBadge || ''}
                              onChange={(e) => {
                                const updated = { ...faqDetails };
                                updated[selectedSectionIdx].ctaBadge = e.target.value;
                                setFaqDetails(updated);
                              }}
                              className="w-full bg-transparent border-b border-white/10 py-1 text-xs focus:outline-none font-semibold"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-3xs font-black tracking-widest uppercase opacity-40">CTA Main Heading</label>
                            <input
                              type="text"
                              value={faqDetails[selectedSectionIdx].ctaHeading || ''}
                              onChange={(e) => {
                                const updated = { ...faqDetails };
                                updated[selectedSectionIdx].ctaHeading = e.target.value;
                                setFaqDetails(updated);
                              }}
                              className="w-full bg-transparent border-b border-white/10 py-1 text-xs focus:outline-none font-semibold"
                            />
                          </div>
                        </div>

                        {/* Benefits list */}
                        <div className="space-y-2">
                          <label className="text-3xs font-black tracking-widest uppercase opacity-40">CTA Benefits list</label>
                          <div className="space-y-2">
                            {(faqDetails[selectedSectionIdx].ctaBenefits || []).map((benefit, bIdx) => (
                              <div key={bIdx} className="flex gap-2">
                                <input
                                  type="text"
                                  value={benefit}
                                  onChange={(e) => {
                                    const updated = { ...faqDetails };
                                    updated[selectedSectionIdx].ctaBenefits[bIdx] = e.target.value;
                                    setFaqDetails(updated);
                                  }}
                                  className="flex-1 bg-transparent border-b border-white/10 py-1 text-xs focus:outline-none font-semibold"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updated = { ...faqDetails };
                                    updated[selectedSectionIdx].ctaBenefits = updated[selectedSectionIdx].ctaBenefits.filter((_, i) => i !== bIdx);
                                    setFaqDetails(updated);
                                  }}
                                  className="text-red-500 hover:text-red-400"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))}
                            <button
                              type="button"
                              onClick={() => {
                                const updated = { ...faqDetails };
                                updated[selectedSectionIdx].ctaBenefits = [...(updated[selectedSectionIdx].ctaBenefits || []), 'New Benefit Point'];
                                setFaqDetails(updated);
                              }}
                              className="border border-dashed border-white/20 hover:border-brand-teal hover:text-brand-teal px-3 py-1 text-4xs font-black uppercase tracking-widest font-semibold"
                            >
                              + Add Benefit Point
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Related Links list */}
                      <div className="border border-white/10 p-4 rounded-sm bg-white/[0.005] space-y-4">
                        <span className="text-3xs font-black tracking-widest text-brand-teal uppercase">[ Related Q&A Recommendations ]</span>
                        <div className="space-y-4">
                          {(faqDetails[selectedSectionIdx].related || []).map((item, rIdx) => (
                            <div key={rIdx} className="border border-white/5 p-4 rounded-sm space-y-3 bg-white/[0.005]">
                              <div className="flex justify-between items-center">
                                <span className="text-3xs font-black opacity-30">Link #{rIdx + 1}</span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updated = { ...faqDetails };
                                    updated[selectedSectionIdx].related = updated[selectedSectionIdx].related.filter((_, i) => i !== rIdx);
                                    setFaqDetails(updated);
                                  }}
                                  className="text-red-500 hover:text-red-400 p-1 border border-white/5"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                  <label className="text-3xs font-black tracking-widest uppercase opacity-40">Slug Redirect</label>
                                  <input
                                    type="text"
                                    value={item.slug}
                                    onChange={(e) => {
                                      const updated = { ...faqDetails };
                                      updated[selectedSectionIdx].related[rIdx].slug = e.target.value;
                                      setFaqDetails(updated);
                                    }}
                                    className="w-full bg-transparent border-b border-white/10 py-1 text-xs focus:outline-none font-semibold"
                                    placeholder="e.g. licensing"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-3xs font-black tracking-widest uppercase opacity-40">Tag Label</label>
                                  <input
                                    type="text"
                                    value={item.tag}
                                    onChange={(e) => {
                                      const updated = { ...faqDetails };
                                      updated[selectedSectionIdx].related[rIdx].tag = e.target.value;
                                      setFaqDetails(updated);
                                    }}
                                    className="w-full bg-transparent border-b border-white/10 py-1 text-xs focus:outline-none font-semibold"
                                    placeholder="e.g. CLINICAL"
                                  />
                                </div>
                              </div>
                              <div className="space-y-1">
                                <label className="text-3xs font-black tracking-widest uppercase opacity-40">Related Question</label>
                                <input
                                  type="text"
                                  value={item.q}
                                  onChange={(e) => {
                                    const updated = { ...faqDetails };
                                    updated[selectedSectionIdx].related[rIdx].q = e.target.value;
                                    setFaqDetails(updated);
                                  }}
                                  className="w-full bg-transparent border-b border-white/10 py-1 text-xs focus:outline-none font-semibold"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-3xs font-black tracking-widest uppercase opacity-40">Related Answer Summary</label>
                                <input
                                  type="text"
                                  value={item.a}
                                  onChange={(e) => {
                                    const updated = { ...faqDetails };
                                    updated[selectedSectionIdx].related[rIdx].a = e.target.value;
                                    setFaqDetails(updated);
                                  }}
                                  className="w-full bg-transparent border-b border-white/10 py-1 text-xs focus:outline-none font-semibold"
                                />
                              </div>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => {
                              const updated = { ...faqDetails };
                              const newItem = { slug: 'default', tag: 'SUPPORT', q: 'Question?', a: 'Short answer description.' };
                              updated[selectedSectionIdx].related = [...(updated[selectedSectionIdx].related || []), newItem];
                              setFaqDetails(updated);
                            }}
                            className="border border-dashed border-white/20 hover:border-brand-teal hover:text-brand-teal px-3 py-1.5 text-4xs font-black uppercase tracking-widest w-full justify-center font-semibold"
                          >
                            + Add Related Recommendation
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                )}
              </div>

            </div>
          ) : (
            /* ─────────────────────────────────────────────────────────────
               WORKSPACE: DYNAMIC PAGES (Home, About, Services, Wellness)
               ───────────────────────────────────────────────────────────── */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Page Section list panel (cols 5) */}
              <div className="lg:col-span-5 border border-white/10 p-6 rounded-sm bg-white/[0.01] space-y-6 text-left">
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <h2 className="text-base font-black uppercase tracking-widest">Active Sections</h2>
                  
                  {/* Append options drop-down */}
                  <div className="relative group/add">
                    <button className="flex items-center gap-1.5 border border-brand-teal text-brand-teal px-3 py-1.5 text-3xs font-black uppercase tracking-widest hover:bg-brand-teal hover:text-white transition-all">
                      <Plus className="w-3.5 h-3.5" /> Add Section
                    </button>
                    <div className="hidden group-hover/add:block absolute right-0 top-[100%] bg-zinc-950 border border-white/15 w-[200px] z-30 shadow-2xl py-2">
                      <p className="text-3xs font-black tracking-widest text-white/30 uppercase px-4 py-2 border-b border-white/5">Templates</p>
                      
                      {Object.keys(SECTION_TEMPLATES).map((key) => {
                        const template = SECTION_TEMPLATES[key];
                        // Filter templates based on active page tab scope
                        if (activeTab === 'home' && !['marquee', 'cta', 'home_manifesto'].includes(key)) return null;
                        if (activeTab === 'about' && !['marquee', 'cta', 'about_story', 'about_split_sticky', 'about_dispensing_care', 'about_showcase'].includes(key)) return null;
                        if (activeTab === 'services' && !['marquee', 'services_logistics', 'services_capabilities'].includes(key)) return null;
                        if (activeTab === 'wellness' && !['marquee', 'cta', 'wellness_categories', 'wellness_quality'].includes(key)) return null;
                        if (activeTab === 'protocols' && !['protocols_hero', 'protocols_intro', 'protocols_certifications', 'protocols_pillars', 'protocols_visual_systems', 'protocols_compliance', 'protocols_portal_security', 'protocols_timeline', 'protocols_cta', 'protocols_footer_strip'].includes(key)) return null;
                        if (activeTab === 'contact' && !['contact_hero', 'contact_grid', 'marquee'].includes(key)) return null;
                        if (activeTab === 'rx_terminal' && !['rx_hero', 'rx_guide', 'rx_uploader', 'rx_policy'].includes(key)) return null;

                        return (
                          <button
                            key={key}
                            onClick={() => addSection(key)}
                            className="w-full text-left px-4 py-3 text-3xs font-black uppercase tracking-widest hover:bg-brand-teal hover:text-white transition-colors"
                          >
                            + {template.type}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {sections.length === 0 ? (
                  <div className="text-center py-10 border border-dashed border-white/10 p-6">
                    <p className="text-xs text-white/40 uppercase font-semibold">No Layout Sync Initialized</p>
                    <p className="text-3xs text-white/25 uppercase mt-2">Click "Initialize Layout" to begin customizing page fields.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {sections.map((sec, idx) => (
                      <div
                        key={sec.id}
                        onClick={() => setSelectedSectionIdx(idx)}
                        className={`p-4 border cursor-pointer rounded-sm flex justify-between items-center transition-all ${
                          selectedSectionIdx === idx
                            ? 'border-brand-teal bg-brand-teal/5 text-white'
                            : 'border-white/5 hover:border-white/10 bg-transparent text-white/60 hover:text-white'
                        }`}
                      >
                        <div className="space-y-1">
                          <span className="text-3xs font-black text-white/30 uppercase mr-2">[0{idx + 1}]</span>
                          <span className="text-2xs font-black uppercase tracking-widest">
                            {sec.type}
                          </span>
                        </div>

                        {/* Reorder and Delete Toolbar */}
                        <div className="flex gap-2 items-center" onClick={(e) => e.stopPropagation()}>
                          <button
                            disabled={idx === 0 || (activeTab === 'home' && idx === 1)}
                            onClick={() => moveSection(idx, -1)}
                            className="p-1.5 border border-white/5 hover:border-brand-teal text-white/30 hover:text-brand-teal transition-all disabled:opacity-10"
                            title="Move Up"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            disabled={idx === sections.length - 1}
                            onClick={() => moveSection(idx, 1)}
                            className="p-1.5 border border-white/5 hover:border-brand-teal text-white/30 hover:text-brand-teal transition-all disabled:opacity-10"
                            title="Move Down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteSection(idx)}
                            className="p-1.5 border border-white/5 hover:border-red-500 text-white/30 hover:text-red-500 transition-all"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Page Section forms editor (cols 7) */}
              <div className="lg:col-span-7 border border-white/10 p-8 rounded-sm bg-white/[0.01] text-left space-y-6">
                <h2 className="text-base font-black uppercase tracking-widest border-b border-white/5 pb-4">
                  Section Field Editor
                </h2>

                {selectedSectionIdx === null ? (
                  <div className="text-center py-20 text-white/30 border border-dashed border-white/10 p-6">
                    <p className="text-xs font-semibold uppercase">Select a section item from list to edit details</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-white/[0.02] p-4 border border-white/5 rounded-sm flex justify-between items-center">
                      <div>
                        <p className="text-3xs font-black uppercase tracking-widest text-brand-teal">ACTIVE EDITOR TYPE</p>
                        <p className="text-xs font-black uppercase tracking-widest">{sections[selectedSectionIdx].type}</p>
                      </div>
                      <span className="text-3xs font-black border border-white/20 px-3 py-1 uppercase text-white/50">
                        Index: 0{selectedSectionIdx + 1}
                      </span>
                    </div>

                    {/* Rendering dynamic fields depending on selected section type */}
                    <div className="space-y-6">
                      {Object.keys(sections[selectedSectionIdx].data).map((fieldKey) => {
                        const val = sections[selectedSectionIdx].data[fieldKey];

                        // Skip rendering complex arrays unless we handle them specifically
                        if (Array.isArray(val)) {
                          if (fieldKey === 'lines') {
                            // lines array for about hero lines
                            return (
                              <div key={fieldKey} className="space-y-3">
                                <label className="text-3xs font-black tracking-widest uppercase opacity-40">Glide Lines List</label>
                                {val.map((lineText, lineIdx) => (
                                  <input
                                    key={lineIdx}
                                    type="text"
                                    value={lineText}
                                    onChange={(e) => {
                                      const updated = [...sections];
                                      updated[selectedSectionIdx].data[fieldKey][lineIdx] = e.target.value;
                                      setSections(updated);
                                    }}
                                    className="w-full bg-transparent border-b border-white/10 py-2.5 text-xs focus:outline-none focus:border-brand-teal"
                                  />
                                ))}
                              </div>
                            );
                          }
                          if (fieldKey === 'interactiveWords') {
                            // interactive hover words for paragraphs
                            return (
                              <div key={fieldKey} className="space-y-3">
                                <label className="text-3xs font-black tracking-widest uppercase opacity-40">Teal Hover Interactive Spans</label>
                                <div className="flex flex-wrap gap-3">
                                  {val.map((word, wordIdx) => (
                                    <div key={wordIdx} className="flex items-center gap-2 border border-white/10 p-2 rounded-sm bg-white/[0.01]">
                                      <input
                                        type="text"
                                        value={word.text || word}
                                        onChange={(e) => {
                                          const updated = [...sections];
                                          if (typeof word === 'object') {
                                            updated[selectedSectionIdx].data[fieldKey][wordIdx].text = e.target.value;
                                          } else {
                                            updated[selectedSectionIdx].data[fieldKey][wordIdx] = e.target.value;
                                          }
                                          setSections(updated);
                                        }}
                                        className="bg-transparent border-none text-2xs focus:outline-none w-[100px]"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const updated = [...sections];
                                          updated[selectedSectionIdx].data[fieldKey] = val.filter((_, i) => i !== wordIdx);
                                          setSections(updated);
                                        }}
                                        className="text-red-500 hover:text-red-400"
                                      >
                                        <Trash2 className="w-3 h-3" />
                                      </button>
                                    </div>
                                  ))}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const updated = [...sections];
                                      updated[selectedSectionIdx].data[fieldKey] = [...val, 'NEW WORD'];
                                      setSections(updated);
                                    }}
                                    className="border border-dashed border-white/20 hover:border-brand-teal hover:text-brand-teal px-3 py-1.5 text-3xs font-black uppercase"
                                  >
                                    + Add Span
                                  </button>
                                </div>
                              </div>
                            );
                          }
                          // Render nested arrays dynamically
                          return (
                            <div key={fieldKey} className="space-y-4 border border-white/10 p-6 bg-white/[0.01] rounded-sm col-span-2 text-left">
                              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                <label className="text-3xs font-black tracking-widest uppercase text-brand-teal">{fieldKey} (List)</label>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updated = [...sections];
                                    const template = val[0] ? JSON.parse(JSON.stringify(val[0])) : {};
                                    // Clear text values in template
                                    Object.keys(template).forEach(k => {
                                      if (typeof template[k] === 'string') template[k] = '';
                                      else if (Array.isArray(template[k])) template[k] = [];
                                      else if (typeof template[k] === 'number') template[k] = 0;
                                    });
                                    updated[selectedSectionIdx].data[fieldKey] = [...val, template];
                                    setSections(updated);
                                  }}
                                  className="flex items-center gap-1 border border-brand-teal/50 text-brand-teal px-2 py-1 text-4xs font-black uppercase tracking-widest hover:bg-brand-teal hover:text-white transition-all"
                                >
                                  <Plus className="w-3 h-3" /> Add Item
                                </button>
                              </div>

                              <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
                                {val.map((item, itemIdx) => (
                                  <div key={itemIdx} className="border border-white/5 bg-white/[0.005] p-4 rounded-sm space-y-4 relative">
<div className="flex justify-between items-center">
                                      <span className="text-3xs font-black opacity-30">Item #{itemIdx + 1}</span>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const updated = [...sections];
                                          updated[selectedSectionIdx].data[fieldKey] = val.filter((_, idx) => idx !== itemIdx);
                                          setSections(updated);
                                        }}
                                        className="text-red-500 hover:text-red-400 p-1 border border-white/5"
                                      >
                                        <Trash2 className="w-3 h-3" />
                                      </button>
                                    </div>

                                    {/* Loop through keys of item object if it is an object */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      {fieldKey === 'products' && (
                                        <div className="col-span-2 space-y-1">
                                          <label className="text-3xs font-black tracking-widest uppercase opacity-40">Choose from Shop Inventory</label>
                                          <select
                                            onChange={(e) => {
                                              const selectedId = parseInt(e.target.value);
                                              const prod = PRODUCTS.find(p => p.id === selectedId);
                                              if (prod) {
                                                const updated = [...sections];
                                                updated[selectedSectionIdx].data[fieldKey][itemIdx] = {
                                                  id: prod.id,
                                                  name: prod.name,
                                                  brand: prod.brand,
                                                  price: prod.price,
                                                  img: prod.img,
                                                  unit: prod.unit
                                                };
                                                setSections(updated);
                                              }
                                            }}
                                            className="w-full bg-zinc-950 border border-white/10 rounded-sm py-2 px-3 text-xs focus:outline-none focus:border-brand-teal text-white font-semibold"
                                            defaultValue=""
                                          >
                                            <option value="" disabled>-- Select Product --</option>
                                            {PRODUCTS.map(p => (
                                              <option key={p.id} value={p.id}>{p.name} ({p.brand}) - ₦{p.price}</option>
                                            ))}
                                          </select>
                                        </div>
                                      )}
                                      {typeof item === 'object' && item !== null ? (
                                        Object.keys(item).map((itemKey) => {
                                          const itemVal = item[itemKey];

                                          if (itemKey === 'visualType') {
                                            return (
                                              <div key={itemKey} className="space-y-1">
                                                <label className="text-3xs font-black tracking-widest uppercase opacity-40">visualType (Animation)</label>
                                                <select
                                                  value={itemVal || 'grid'}
                                                  onChange={(e) => {
                                                    const updated = [...sections];
                                                    updated[selectedSectionIdx].data[fieldKey][itemIdx][itemKey] = e.target.value;
                                                    setSections(updated);
                                                  }}
                                                  className="w-full bg-zinc-950 border border-white/10 rounded-sm py-2 px-3 text-xs focus:outline-none focus:border-brand-teal text-white"
                                                >
                                                  <option value="bars">Bars Floating</option>
                                                  <option value="morph">Shape Morphing</option>
                                                  <option value="orbit">Electron Orbiting</option>
                                                  <option value="spin">Double Spin</option>
                                                  <option value="triangle">Bouncing Triangle</option>
                                                  <option value="potency">Pulsing Potency</option>
                                                  <option value="grid">Grid Pulsing</option>
                                                </select>
                                              </div>
                                            );
                                          }

                                          if (itemKey === 'bgColor') {
                                            return (
                                              <div key={itemKey} className="space-y-1">
                                                <label className="text-3xs font-black tracking-widest uppercase opacity-40">Background Color</label>
                                                <select
                                                  value={itemVal || 'bg-brand-teal'}
                                                  onChange={(e) => {
                                                    const updated = [...sections];
                                                    updated[selectedSectionIdx].data[fieldKey][itemIdx][itemKey] = e.target.value;
                                                    setSections(updated);
                                                  }}
                                                  className="w-full bg-zinc-950 border border-white/10 rounded-sm py-2 px-3 text-xs focus:outline-none focus:border-brand-teal text-white"
                                                >
                                                  <option value="bg-brand-teal">Brand Teal</option>
                                                  <option value="bg-white">White</option>
                                                  <option value="bg-black">Black</option>
                                                  <option value="bg-gradient-to-br from-[#400e0e] to-[#1a0505]">Burgundy Red Gradient</option>
                                                  <option value="bg-gradient-to-br from-[#0c2e3a] to-[#041217]">Clinical Teal Gradient</option>
                                                  <option value="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]">Charcoal Dark Gradient</option>
                                                  <option value="bg-gradient-to-br from-[#0f1f38] to-[#060c17]">Navy Midnight Gradient</option>
                                                </select>
                                              </div>
                                            );
                                          }

                                          if (itemKey === 'textColor') {
                                            return (
                                              <div key={itemKey} className="space-y-1">
                                                <label className="text-3xs font-black tracking-widest uppercase opacity-40">Text Color</label>
                                                <select
                                                  value={itemVal || 'text-white'}
                                                  onChange={(e) => {
                                                    const updated = [...sections];
                                                    updated[selectedSectionIdx].data[fieldKey][itemIdx][itemKey] = e.target.value;
                                                    setSections(updated);
                                                  }}
                                                  className="w-full bg-zinc-950 border border-white/10 rounded-sm py-2 px-3 text-xs focus:outline-none focus:border-brand-teal text-white"
                                                >
                                                  <option value="text-white">White</option>
                                                  <option value="text-black">Black</option>
                                                  <option value="text-brand-teal">Brand Teal</option>
                                                </select>
                                              </div>
                                            );
                                          }

                                          if (Array.isArray(itemVal)) {
                                            return (
                                              <div key={itemKey} className="col-span-2 space-y-2 border border-white/5 p-3 bg-white/[0.005]">
                                                <label className="text-3xs font-black tracking-widest uppercase opacity-40">{itemKey} (List)</label>
                                                <div className="space-y-2">
                                                  {itemVal.map((subItem, subIdx) => (
                                                    <div key={subIdx} className="flex gap-2">
                                                      <input
                                                        type="text"
                                                        value={typeof subItem === 'object' ? (subItem.text || '') : subItem}
                                                        onChange={(e) => {
                                                          const updated = [...sections];
                                                          if (typeof subItem === 'object') {
                                                            updated[selectedSectionIdx].data[fieldKey][itemIdx][itemKey][subIdx].text = e.target.value;
                                                          } else {
                                                            updated[selectedSectionIdx].data[fieldKey][itemIdx][itemKey][subIdx] = e.target.value;
                                                          }
                                                          setSections(updated);
                                                        }}
                                                        className="flex-1 bg-transparent border-b border-white/10 py-1 text-xs focus:outline-none focus:border-brand-teal"
                                                      />
                                                      <button
                                                        type="button"
                                                        onClick={() => {
                                                          const updated = [...sections];
                                                          updated[selectedSectionIdx].data[fieldKey][itemIdx][itemKey] = itemVal.filter((_, idx) => idx !== subIdx);
                                                          setSections(updated);
                                                        }}
                                                        className="text-red-500 hover:text-red-400"
                                                      >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                      </button>
                                                    </div>
                                                  ))}
                                                  <button
                                                    type="button"
                                                    onClick={() => {
                                                      const updated = [...sections];
                                                      const templateItem = typeof itemVal[0] === 'object' ? { text: 'New Item' } : 'New Item';
                                                      updated[selectedSectionIdx].data[fieldKey][itemIdx][itemKey] = [...itemVal, templateItem];
                                                      setSections(updated);
                                                    }}
                                                    className="border border-dashed border-white/20 hover:border-brand-teal hover:text-brand-teal px-3 py-1 text-4xs font-black uppercase tracking-widest"
                                                  >
                                                    + Add Item
                                                  </button>
                                                </div>
                                              </div>
                                            );
                                          }

                                          if (itemKey.toLowerCase().includes('url') || itemKey.toLowerCase().includes('bg') || itemKey === 'img' || itemKey === 'image') {
                                            return (
                                              <div key={itemKey} className="col-span-2">
                                                <MediaUploadField
                                                  label={itemKey}
                                                  value={itemVal}
                                                  onChange={(url) => {
                                                    const updated = [...sections];
                                                    updated[selectedSectionIdx].data[fieldKey][itemIdx][itemKey] = url;
                                                    setSections(updated);
                                                  }}
                                                />
                                              </div>
                                            );
                                          }

                                          return (
                                            <div key={itemKey} className="space-y-1">
                                              <label className="text-3xs font-black tracking-widest uppercase opacity-40">{itemKey}</label>
                                              <input
                                                type="text"
                                                value={itemVal || ''}
                                                onChange={(e) => {
                                                  const updated = [...sections];
                                                  updated[selectedSectionIdx].data[fieldKey][itemIdx][itemKey] = e.target.value;
                                                  setSections(updated);
                                                }}
                                                className="w-full bg-transparent border-b border-white/10 py-1.5 text-xs focus:outline-none focus:border-brand-teal"
                                              />
                                            </div>
                                          );
                                        })
                                      ) : (
                                        <input
                                          type="text"
                                          value={item}
                                          onChange={(e) => {
                                            const updated = [...sections];
                                            updated[selectedSectionIdx].data[fieldKey][itemIdx] = e.target.value;
                                            setSections(updated);
                                          }}
                                          className="w-full bg-transparent border-b border-white/10 py-1.5 text-xs focus:outline-none focus:border-brand-teal"
                                        />
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        }

                        // Textarea mapping for longer texts
                        if (typeof val === 'string' && (val.length > 50 || fieldKey === 'text' || fieldKey === 'desc' || fieldKey === 'copy' || fieldKey === 'body')) {
                          return (
                            <div key={fieldKey} className="space-y-2">
                              <label className="text-3xs font-black tracking-widest uppercase opacity-40">{fieldKey}</label>
                              <textarea
                                rows={5}
                                value={val}
                                onChange={(e) => {
                                  const updated = [...sections];
                                  updated[selectedSectionIdx].data[fieldKey] = e.target.value;
                                  setSections(updated);
                                }}
                                className="w-full bg-white/[0.02] border border-white/10 p-4 text-xs focus:outline-none focus:border-brand-teal resize-none font-semibold leading-relaxed"
                              />
                            </div>
                          );
                        }

                        // Media upload hooks
                        if (fieldKey.toLowerCase().includes('url') || fieldKey.toLowerCase().includes('bg') || fieldKey === 'img' || fieldKey === 'image') {
                          return (
                            <MediaUploadField
                              key={fieldKey}
                              label={fieldKey}
                              value={val}
                              onChange={(url) => {
                                const updated = [...sections];
                                updated[selectedSectionIdx].data[fieldKey] = url;
                                setSections(updated);
                              }}
                            />
                          );
                        }

                        // Standard Text Inputs
                        return (
                          <div key={fieldKey} className="space-y-2">
                            <label className="text-3xs font-black tracking-widest uppercase opacity-40">{fieldKey}</label>
                            <input
                              type="text"
                              value={val}
                              onChange={(e) => {
                                const updated = [...sections];
                                updated[selectedSectionIdx].data[fieldKey] = e.target.value;
                                setSections(updated);
                              }}
                              className="w-full bg-transparent border-b border-white/10 py-3 text-xs focus:outline-none focus:border-brand-teal font-semibold"
                            />
                          </div>
                        );
                      })}
                    </div>

                    {/* Styling Overrides Panel */}
                    <div className="border-t border-white/10 pt-6 mt-8 space-y-6">
                      <p className="text-3xs font-black tracking-widest uppercase text-brand-teal">[ STYLE OVERRIDES ]</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-3xs font-black tracking-widest uppercase opacity-40">Text Color Override</label>
                          <input
                            type="text"
                            placeholder="e.g. #1B6E8C or rgb(27,110,140)"
                            value={sections[selectedSectionIdx].data.customTextColor || ''}
                            onChange={(e) => {
                              const updated = [...sections];
                              updated[selectedSectionIdx].data.customTextColor = e.target.value;
                              setSections(updated);
                            }}
                            className="w-full bg-transparent border-b border-white/10 py-3 text-xs focus:outline-none focus:border-brand-teal font-semibold"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-3xs font-black tracking-widest uppercase opacity-40">Font Family Override</label>
                          <select
                            value={sections[selectedSectionIdx].data.customFontFamily || ''}
                            onChange={(e) => {
                              const updated = [...sections];
                              updated[selectedSectionIdx].data.customFontFamily = e.target.value;
                              setSections(updated);
                            }}
                            className="w-full bg-zinc-950 border border-white/10 rounded-sm py-2 px-3 text-xs focus:outline-none focus:border-brand-teal font-semibold text-white mt-1.5"
                          >
                            <option value="">Default Theme Font</option>
                            <option value="'Gotham', sans-serif">Gotham (Modern Sans)</option>
                            <option value="'Fraunces', serif">Fraunces (Premium Serif)</option>
                            <option value="'Inter', sans-serif">Inter (Clean Sans)</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-3xs font-black tracking-widest uppercase opacity-40">Font Weight Override</label>
                          <input
                            type="text"
                            placeholder="e.g. 300, 400, 700, 900"
                            value={sections[selectedSectionIdx].data.customFontWeight || ''}
                            onChange={(e) => {
                              const updated = [...sections];
                              updated[selectedSectionIdx].data.customFontWeight = e.target.value;
                              setSections(updated);
                            }}
                            className="w-full bg-transparent border-b border-white/10 py-3 text-xs focus:outline-none focus:border-brand-teal font-semibold"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-3xs font-black tracking-widest uppercase opacity-40">Font Size Override</label>
                          <input
                            type="text"
                            placeholder="e.g. 1.5rem, 24px, 3.5vw"
                            value={sections[selectedSectionIdx].data.customFontSize || ''}
                            onChange={(e) => {
                              const updated = [...sections];
                              updated[selectedSectionIdx].data.customFontSize = e.target.value;
                              setSections(updated);
                            }}
                            className="w-full bg-transparent border-b border-white/10 py-3 text-xs focus:outline-none focus:border-brand-teal font-semibold"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </div>
          )}

        </main>
      </div>

    </div>
  );
}
