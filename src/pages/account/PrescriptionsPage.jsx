import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import apiClient from '@/api/apiClient';
import { FileText, CheckCircle, Clock, AlertCircle, Eye, Download } from 'lucide-react';

export default function PrescriptionsPage() {
  const { data: prescriptions, isLoading, error } = useQuery({
    queryKey: ['prescriptions'],
    queryFn: async () => {
      const res = await apiClient.get('prescriptions/');
      return res.data;
    }
  });

  if (isLoading) return <div className="space-y-4">
    {[1,2].map(i => <div key={i} className="h-32 bg-black/5 animate-pulse" />)}
  </div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between underline-offset-8">
        <h1 className="font-serif text-3xl font-light">Prescriptions</h1>
        <span className="text-[10px] tracking-widest uppercase text-black/40">{prescriptions?.length || 0} Clinical Documents</span>
      </div>

      <div className="grid gap-4">
        {prescriptions?.length === 0 ? (
          <div className="bg-white border border-dashed border-black/10 py-16 text-center">
             <FileText className="w-10 h-10 text-black/10 mx-auto mb-4" />
             <p className="text-black/40 tracking-wide uppercase text-[10px]">No prescriptions uploaded yet</p>
          </div>
        ) : (
          prescriptions.map((rx) => (
            <motion.div
              key={rx.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-black/5 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
            >
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-[#1B6E8C]/5 flex items-center justify-center border border-[#1B6E8C]/10">
                   <FileText className="w-5 h-5 text-[#1B6E8C]" />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-sm font-bold uppercase tracking-tight">Prescription ID {rx.id}</h3>
                    <span className={`text-[8px] tracking-[0.2em] uppercase px-2 py-0.5 border ${
                      rx.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                      rx.status === 'PENDING' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                      'bg-red-50 text-red-700 border-red-100'
                    }`}>
                      {rx.status}
                    </span>
                  </div>
                  <p className="text-black/40 text-[11px] mt-1 uppercase tracking-widest">Uploaded on {new Date(rx.uploaded_at).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
                  <a 
                    href={rx.image} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 text-[10px] items-center tracking-[0.2em] uppercase font-bold border border-black/10 hover:bg-black/5 transition-colors"
                  >
                    <Eye className="w-3 h-3" /> View Rx
                  </a>
                  {rx.pharmacist_note && (
                    <div className="relative group">
                       <button className="p-2 border border-black/10 hover:bg-[#1B6E8C]/5 transition-colors">
                          <AlertCircle className="w-4 h-4 text-[#1B6E8C]" />
                       </button>
                       <div className="absolute bottom-full right-0 mb-2 w-64 bg-[#0A0A0A] text-white p-4 text-[11px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-2xl z-20">
                          <p className="uppercase tracking-widest text-[#1B6E8C] mb-2 font-bold">Pharmacist Note</p>
                          <p className="leading-relaxed text-white/70 italic">"{rx.pharmacist_note}"</p>
                       </div>
                    </div>
                  )}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
