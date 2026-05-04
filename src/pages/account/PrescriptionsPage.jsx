import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
// import apiClient from '@/api/apiClient'; // Backend disconnected for prototype
import { FileText, AlertCircle, ArrowUpRight } from 'lucide-react';

// Mock prescription data
const MOCK_PRESCRIPTIONS = [
  {
    id: 1,
    status: 'APPROVED',
    uploaded_at: '2026-04-18T08:30:00Z',
    image: '/images/product1.png',
    pharmacist_note: 'Dosage verified. Prescription valid for 30-day supply. No drug interactions detected.'
  },
  {
    id: 2,
    status: 'PENDING',
    uploaded_at: '2026-04-24T11:00:00Z',
    image: '/images/product2.png',
    pharmacist_note: null
  },
  {
    id: 3,
    status: 'APPROVED',
    uploaded_at: '2026-04-10T16:45:00Z',
    image: '/images/product3.png',
    pharmacist_note: 'Approved for renewal. Patient history reviewed; no contraindications.'
  },
];

export default function PrescriptionsPage() {
  const prescriptions = MOCK_PRESCRIPTIONS; // Using mock data

  return (
    <div className="space-y-10 md:space-y-20">
      
      {/* High-Impact Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-12 border-b border-black/5 pb-8 md:pb-12">
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none">CLINICAL<br />DOCUMENTS</h1>
        <p className="text-[9px] md:text-[10px] font-black tracking-[0.3em] md:tracking-[0.4em] uppercase text-black/30 underline underline-offset-8">Verified Prescription Archive / Ref: {prescriptions.length}</p>
      </div>

      <div className="grid gap-0 border border-black/5">
        {prescriptions.map((rx, i) => (
            <motion.div
              key={rx.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="p-6 md:p-12 border-b border-black/5 hover:bg-black hover:text-white transition-all duration-700 group flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-12"
            >
              <div className="flex items-center gap-8">
                <div className="w-16 h-16 border border-black/10 group-hover:border-white/20 flex items-center justify-center bg-[#FAFAFA] group-hover:bg-white/10 transition-colors">
                   <FileText className="w-6 h-6 opacity-30 group-hover:opacity-100 transition-all" strokeWidth={1} />
                </div>
                <div>
                   <div className="flex items-center gap-4 mb-2">
                      <span className="text-[10px] font-black tracking-[0.4em] uppercase text-brand-teal">NODE {rx.id}</span>
                      <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 border ${
                        rx.status === 'APPROVED' ? 'border-emerald-500/30 text-emerald-500' : 'border-black/10 text-black/40 group-hover:text-white/40'
                      }`}>
                        {rx.status}
                      </span>
                   </div>
                   <h3 className="text-lg md:text-2xl font-black uppercase tracking-tighter">CLINICAL SPECIFICATION 0{rx.id}</h3>
                   <p className="text-[11px] font-bold tracking-widest uppercase opacity-40 mt-2">COMMITTED {new Date(rx.uploaded_at).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex items-center gap-8 w-full md:w-auto">
                  <button 
                    className="flex-1 md:flex-none flex items-center justify-center gap-4 px-12 py-6 text-[11px] font-black uppercase tracking-[0.2em] border border-black group-hover:border-white hover:bg-white hover:text-black transition-all duration-700"
                  >
                    View Node <ArrowUpRight className="w-4 h-4" />
                  </button>
                  
                  {rx.pharmacist_note && (
                    <div className="relative group/note">
                       <button className="w-12 h-12 flex items-center justify-center border border-black/10 group-hover:border-white/20 hover:bg-brand-teal transition-all">
                          <AlertCircle className="w-5 h-5" />
                       </button>
                       <div className="absolute bottom-full right-0 mb-6 w-80 bg-black text-white p-8 opacity-0 group-hover/note:opacity-100 transition-all pointer-events-none shadow-2xl z-50 border border-white/10 translate-y-4 group-hover/note:translate-y-0 text-left">
                          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-brand-teal mb-4">Clinical Response</p>
                          <p className="text-[13px] font-bold uppercase tracking-widest leading-relaxed text-white/50">
                             "{rx.pharmacist_note}"
                          </p>
                       </div>
                    </div>
                  )}
              </div>
            </motion.div>
        ))}
      </div>

      {/* Upload Action Node */}
      <div className="bg-black text-white p-6 md:p-12 lg:p-20 relative overflow-hidden group">
         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div>
               <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">Add Document</h2>
               <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/40">Initiate new clinical verification sequence</p>
            </div>
            <Link to="/wholesale" className="bg-white text-black px-12 py-6 text-[12px] font-black uppercase tracking-[0.3em] hover:bg-brand-teal hover:text-white transition-all duration-700">
                Begin Upload
            </Link>
         </div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-teal/10 blur-[100px] rounded-full group-hover:bg-brand-teal/20 transition-all duration-1000" />
      </div>
    </div>
  );
}
