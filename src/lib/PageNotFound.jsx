import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, AlertCircle } from 'lucide-react';

export default function PageNotFound() {
    const location = useLocation();
    const pageName = location.pathname.substring(1).toUpperCase();

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-white relative overflow-hidden">
            
            {/* Massive Background 404 */}
            <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 display-svz text-black/5 select-none pointer-events-none scale-150">
                404
            </h1>

            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-2xl w-full text-center relative z-10 space-y-12"
            >
                <div>
                   <p className="text-[10px] font-black tracking-[0.4em] uppercase text-svz-red mb-4 flex items-center justify-center gap-2">
                       <AlertCircle className="w-4 h-4" /> NODE ERROR / 404
                   </p>
                   <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                      NULL<br />LOCATION
                   </h2>
                </div>
                
                <div className="space-y-6">
                    <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-black">
                        The requested specification <span className="text-svz-red">"/{pageName}"</span> could not be synchronized with the clinical manifest.
                    </p>
                    <p className="text-[11px] font-bold uppercase tracking-widest leading-relaxed text-black/40 max-w-sm mx-auto">
                        The node was either never committed to the repository or has been archived during a clinical update cycle.
                    </p>
                </div>

                <div className="pt-8">
                    <Link 
                        to="/" 
                        className="inline-flex items-center gap-8 bg-black text-white px-20 py-8 text-[12px] font-black uppercase tracking-[0.3em] hover:bg-svz-red transition-all duration-700"
                    >
                        <ArrowLeft className="w-4 h-4" /> Root Restart
                    </Link>
                </div>

                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-black/20">
                   Audit Ref: LOG-ERR-NODE-000404
                </p>
            </motion.div>

            {/* Decoration */}
            <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-svz-red/5 blur-[150px] rounded-full" />
        </div>
    );
}