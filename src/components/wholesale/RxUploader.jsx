import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, CheckCircle2, Lock } from 'lucide-react';

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

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#FAFAFA] border border-[#0A0A0A]/10 p-12 text-center"
      >
        <CheckCircle2 className="w-14 h-14 mx-auto mb-6" strokeWidth={1.25} style={{ color: '#1B6E8C' }} />
        <h3 className="font-serif text-3xl md:text-4xl font-light">Prescription received.</h3>
        <p className="text-[#0A0A0A]/55 mt-3 max-w-md mx-auto">
          Our pharmacists will review your prescription and contact you promptly on <strong>{form.phone}</strong>.
        </p>
        <button
          onClick={() => { setSubmitted(false); setFile(null); setForm({ name: '', phone: '', notes: '' }); }}
          className="mt-10 text-[11px] tracking-[0.2em] uppercase border-b border-[#0A0A0A]/30 pb-1 hover:border-[#1B6E8C] hover:text-[#1B6E8C] transition-colors"
        >
          Submit another
        </button>
      </motion.div>
    );
  }

  return (
    <div className="bg-[#FAFAFA] border border-[#0A0A0A]/10 p-8 md:p-12">
      <div className="flex items-center gap-2 text-[10px] tracking-[0.35em] uppercase mb-10" style={{ color: '#1B6E8C' }}>
        <Lock className="w-3 h-3" />
        <span>Secure Zone · Encrypted Upload</span>
      </div>

      <form onSubmit={submit} className="space-y-6">
        {/* Drop zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFile(e.dataTransfer.files?.[0]); }}
          onClick={() => inputRef.current?.click()}
          className="relative border-2 border-dashed p-10 md:p-16 text-center cursor-pointer transition-all"
          style={{
            borderColor: isDragging ? '#1B6E8C' : file ? '#1B6E8C' : 'rgba(10,10,10,0.2)',
            backgroundColor: isDragging ? 'rgba(27,110,140,0.04)' : 'transparent',
          }}
        >
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-5"
            style={{ backgroundColor: '#0A0A0A', animation: 'pulse-ring 2.5s ease-in-out infinite' }}
          >
            {file
              ? <CheckCircle2 className="w-6 h-6" style={{ color: '#1B6E8C' }} />
              : <Upload className="w-6 h-6 text-white" />
            }
          </div>
          <p className="font-serif text-2xl md:text-3xl font-light">
            {file ? file.name : 'Drop your prescription here'}
          </p>
          <p className="text-sm text-[#0A0A0A]/45 mt-2">or click to browse — PDF, JPG, PNG up to 10MB</p>
          <input
            ref={inputRef}
            type="file"
            accept="image/*,.pdf"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
        </div>

        {/* Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            required
            placeholder="Full name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full bg-transparent border-b border-[#0A0A0A]/20 py-3 px-0 focus:outline-none focus:border-[#0A0A0A] text-base"
          />
          <input
            required
            placeholder="Phone number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full bg-transparent border-b border-[#0A0A0A]/20 py-3 px-0 focus:outline-none focus:border-[#0A0A0A] text-base"
          />
        </div>
        <textarea
          rows={3}
          placeholder="Additional notes (optional)"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          className="w-full bg-transparent border-b border-[#0A0A0A]/20 py-3 px-0 focus:outline-none focus:border-[#0A0A0A] text-base resize-none"
        />

        <button
          type="submit"
          disabled={!file}
          className="w-full inline-flex items-center justify-center gap-3 py-5 text-[11px] tracking-[0.2em] uppercase text-white transition-colors duration-500 disabled:opacity-35 disabled:cursor-not-allowed"
          style={{ backgroundColor: '#0A0A0A' }}
          onMouseEnter={(e) => { if (file) e.currentTarget.style.backgroundColor = '#1B6E8C'; }}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0A0A0A'}
        >
          <FileText className="w-4 h-4" /> Submit for Pharmacist Review
        </button>
        <p className="text-xs text-[#0A0A0A]/40 text-center leading-relaxed">
          All patient information is handled with strict confidentiality and in accordance with healthcare data protection standards.
        </p>
      </form>
    </div>
  );
}