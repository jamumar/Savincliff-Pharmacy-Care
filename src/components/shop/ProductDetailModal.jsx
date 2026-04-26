import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Plus, Minus, AlertCircle, CheckCircle, Tag } from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import apiClient from '@/api/apiClient';
import { toast } from '@/components/ui/use-toast';

export default function ProductDetailModal({ product, onClose }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [rxUploaded, setRxUploaded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    add(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleRxUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    // Note: In a real flow, we might want to link this to a temporary order ID or just a user's record
    
    try {
      await apiClient.post('prescriptions/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setRxUploaded(true);
      toast({
        title: "Prescription Uploaded",
        description: "Our staff will verify it shortly with your order.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: "Could not upload prescription. Please try again.",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto relative shadow-2xl"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-black/5 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="aspect-square md:aspect-auto bg-black/4 overflow-hidden"
            >
              <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="p-8 md:p-10 flex flex-col"
            >
              {product.badge && (
                <span className="self-start text-[9px] tracking-[0.25em] uppercase bg-[#1B6E8C]/10 text-[#1B6E8C] px-2.5 py-1.5 mb-4">
                  {product.badge}
                </span>
              )}
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#1B6E8C]">{product.brand}</p>
              <h2 className="font-serif text-3xl md:text-4xl font-light mt-2 leading-tight">{product.name}</h2>
              <p className="text-sm text-black/40 mt-1">{product.unit}</p>

              <p className="text-base text-black/60 leading-relaxed mt-6">{product.desc}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {product.tags.map(t => (
                  <span key={t} className="flex items-center gap-1 text-[10px] tracking-wide uppercase border border-black/12 px-2.5 py-1.5 text-black/50">
                    <Tag className="w-2.5 h-2.5" /> {t}
                  </span>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-black/8">
                <span className="font-serif text-4xl font-light">₦{product.price.toLocaleString()}</span>
                <p className="text-[11px] text-black/35 mt-1">per {product.unit}</p>
              </div>

              {product.isRxRequired ? (
                <div className="mt-6 bg-amber-50 border border-amber-200 p-5">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-amber-800">Prescription Required</p>
                      <p className="text-xs text-amber-600 mt-1 leading-relaxed">
                        This is a regulated medication. Nigeria law requires a valid prescription for purchase.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-5">
                    {rxUploaded ? (
                      <div className="flex items-center gap-2 text-emerald-600 text-xs font-medium bg-emerald-50 p-3 rounded border border-emerald-100">
                        <CheckCircle className="w-4 h-4" /> Prescription verified for this session
                      </div>
                    ) : (
                      <div className="relative">
                        <input 
                          type="file" 
                          id="rx-upload" 
                          className="hidden" 
                          accept="image/*"
                          onChange={handleRxUpload}
                          disabled={uploading}
                        />
                        <label 
                          htmlFor="rx-upload"
                          className="w-full flex items-center justify-center gap-3 py-3 border-2 border-dashed border-amber-200 text-amber-700 text-[10px] tracking-widest uppercase hover:bg-amber-100/50 transition-all cursor-pointer disabled:opacity-50"
                        >
                          {uploading ? "Uploading..." : "Upload Prescription"}
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              ) : null}

              {product.inStock ? (
                <div className="mt-6 space-y-4">
                  {/* Qty */}
                  <div className="flex items-center gap-4">
                    <span className="text-[11px] tracking-[0.2em] uppercase text-black/40">Quantity</span>
                    <div className="flex items-center gap-0 border border-black/15">
                      <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-9 h-9 flex items-center justify-center hover:bg-black/5 transition-colors">
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-10 text-center text-sm font-medium">{qty}</span>
                      <button onClick={() => setQty(q => q + 1)} className="w-9 h-9 flex items-center justify-center hover:bg-black/5 transition-colors">
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handleAdd}
                    className={`w-full flex items-center justify-center gap-3 py-4 text-[11px] tracking-[0.2em] uppercase transition-all duration-500 ${
                      added ? 'bg-emerald-600 text-white' : 'bg-[#0A0A0A] text-white hover:bg-[#1B6E8C]'
                    }`}
                  >
                    {added ? (
                      <><CheckCircle className="w-4 h-4" /> Added to Cart</>
                    ) : (
                      <><ShoppingCart className="w-4 h-4" /> Add to Cart — ₦{(product.price * qty).toLocaleString()}</>
                    )}
                  </motion.button>
                </div>
              ) : (
                <div className="mt-6 py-4 border border-black/10 text-center text-sm text-black/40">Out of Stock</div>
              )}

              <div className="mt-6 flex items-center gap-2 text-[11px] text-black/35">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> PCN verified · Genuine medication
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}