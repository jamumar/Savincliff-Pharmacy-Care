import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, CheckCircle, Lock, ArrowRight } from 'lucide-react';

export default function RxUploader() {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', notes: '' });
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef(null);

  const handleFile = (f) => { if (f) setFile(f); };

  const submit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-white p-8 md:p-12 lg:p-20 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-brand-teal" />
      
      <div className="flex items-center gap-4 text-[10px] font-black tracking-[0.4em] uppercase mb-12 text-black">
        <Lock className="w-4 h-4 text-brand-teal" />
        <span>Secure Clinical Terminal / End-to-End Encryption</span>
      </div>

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-16 text-center space-y-12"
          >
            <div className="w-24 h-24 bg-brand-teal text-white flex items-center justify-center mx-auto">
                <CheckCircle className="w-12 h-12" strokeWidth={1} />
            </div>
            <div className="space-y-4">
                <h3 className="text-4xl font-black uppercase tracking-tighter">SPECIFICATION RECEIVED</h3>
                <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-black/40 max-w-sm mx-auto leading-relaxed">
                   Audit node finalized. Our clinical team will contact your identified node <b>{form.phone}</b> within a 30-minute window.
                </p>
            </div>
            <button
              onClick={() => { setSubmitted(false); setFile(null); setForm({ name: '', phone: '', notes: '' }); }}
              className="px-12 py-6 border border-black text-[11px] font-black uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all duration-700"
            >
              Initiate New Upload
            </button>
          </motion.div>
        ) : (
          <motion.form 
            key="form"
            onSubmit={submit} 
            className="space-y-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Drop zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFile(e.dataTransfer.files?.[0]); }}
              onClick={() => inputRef.current?.click()}
              className={`relative border-2 border-dashed p-16 md:p-24 text-center cursor-pointer transition-all duration-700 flex flex-col items-center justify-center space-y-8 ${
                isDragging ? 'bg-black text-white border-brand-teal' : file ? 'bg-black text-white border-white/20' : 'bg-transparent border-black/10 hover:border-black'
              }`}
            >
              <div className={`w-20 h-20 flex items-center justify-center transition-all ${file ? 'bg-brand-teal text-white' : 'bg-black text-white'}`}>
                {file ? <CheckCircle className="w-8 h-8" /> : <Upload className="w-8 h-8" />}
              </div>
              <div>
                 <p className="text-2xl font-black uppercase tracking-tighter">
                   {file ? file.name : 'COMMIT DOCUMENT'}
                 </p>
                 <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 mt-2">
                    {file ? 'Specification Attached' : 'Drop Rx or click to navigate Archive'}
                 </p>
              </div>
              <input
                ref={inputRef}
                type="file"
                accept="image/*,.pdf"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0])}
              />
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               <div className="space-y-4">
                  <label className="text-[10px] font-black tracking-[0.4em] uppercase text-black">Identity Handle</label>
                  <input
                    required
                    placeholder="FULL NAME SPEC"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-transparent border-b border-black/10 py-4 text-[12px] font-bold tracking-widest text-black focus:outline-none focus:border-black uppercase transition-colors"
                  />
               </div>
               <div className="space-y-4">
                  <label className="text-[10px] font-black tracking-[0.4em] uppercase text-black">Contact Node</label>
                  <input
                    required
                    placeholder="+234 XXX XXX XXXX"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-transparent border-b border-black/10 py-4 text-[12px] font-bold tracking-widest text-black focus:outline-none focus:border-black uppercase transition-colors"
                  />
               </div>
            </div>

            <div className="space-y-4">
                <label className="text-[10px] font-black tracking-[0.4em] uppercase text-black">Audit Notes (Optional)</label>
                <textarea
                  rows={3}
                  placeholder="ADDITIONAL CLINICAL REQUIREMENTS..."
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="w-full bg-transparent border-b border-black/10 py-4 text-[12px] font-bold tracking-widest text-black focus:outline-none focus:border-black uppercase transition-colors resize-none"
                />
            </div>

            <button
              type="submit"
              disabled={!file}
              className="w-full bg-black text-white py-8 text-[12px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-6 hover:bg-brand-teal transition-all duration-700 disabled:opacity-20"
            >
              Initiate Process Node <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-center text-black/30 max-w-xs mx-auto leading-relaxed">
              By initiating this upload, you consent to the clinical audit of your biometric and medical data per Savincliff Standards.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}