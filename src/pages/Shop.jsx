import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ChevronDown, LayoutGrid } from 'lucide-react';
import PageHero from '@/components/shared/PageHero';
import ProductCard from '@/components/shop/ProductCard';
import ProductDetailModal from '@/components/shop/ProductDetailModal';
import { SORT_OPTIONS } from '@/lib/shopData';
import { useProducts, useCategories } from '@/hooks/useProducts';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlCategory = searchParams.get('category') || 'all';
  
  const [category, setCategory] = useState(urlCategory);
  const [sort, setSort] = useState('default');
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [catOpen, setCatOpen] = useState(false);
  const catRef = useRef(null);

  const { data: categoriesData = [] } = useCategories();
  const { data: productsData = [], isLoading, isError } = useProducts({
    category: category === 'all' ? undefined : category,
    search: search.trim() || undefined
  });

  const categories = useMemo(() => {
    return [
      { id: 'all', label: 'All Products' },
      ...categoriesData.map(c => ({ id: c.slug || c.id, label: c.name }))
    ];
  }, [categoriesData]);

  useEffect(() => {
    const handler = (e) => { if (catRef.current && !catRef.current.contains(e.target)) setCatOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filtered = useMemo(() => {
    let list = [...productsData];
    if (sort === 'price_asc') list.sort((a, b) => a.price - b.price);
    if (sort === 'price_desc') list.sort((a, b) => b.price - a.price);
    if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [productsData, sort]);

  return (
    <>
      <PageHero
        number="08"
        label="Shop"
        title="Browse our full range."
        subtitle="Genuine medications, wellness products, and medical supplies — all verified and ready to order."
      />

      {/* Filters Bar */}
      <section className="bg-[#FAFAFA] border-b border-black/8 sticky top-20 z-30">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/30" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search products, brands…"
                className="w-full pl-11 pr-10 py-3 border border-black/12 bg-white text-sm focus:outline-none focus:border-[#1B6E8C] transition-colors"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-black/30 hover:text-black transition-colors">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-3 flex-wrap w-full md:w-auto">
              {/* Category dropdown */}
              <div ref={catRef} className="relative">
                <button
                  onClick={() => setCatOpen(o => !o)}
                  className={`flex items-center gap-2 px-4 py-2.5 border text-[11px] tracking-[0.2em] uppercase transition-all duration-300 ${
                    category !== 'all'
                      ? 'bg-[#0A0A0A] text-white border-[#0A0A0A]'
                      : 'bg-white border-black/12 hover:border-black/30'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  {categories.find(c => c.id === category)?.label || 'All Products'}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${catOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {catOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.97 }}
                      transition={{ duration: 0.18 }}
                      className="absolute left-0 top-full mt-2 z-50 bg-white border border-black/10 shadow-xl min-w-[200px] py-1"
                    >
                      {categories.map(cat => (
                        <button
                          key={cat.id}
                          onClick={() => { 
                            setCategory(cat.id); 
                            setCatOpen(false);
                            setSearchParams({ category: cat.id });
                          }}
                          className={`w-full text-left flex items-center justify-between px-5 py-3 text-[11px] tracking-[0.15em] uppercase transition-colors ${
                            category === cat.id
                              ? 'bg-[#0A0A0A] text-white'
                              : 'hover:bg-black/4 text-black/70 hover:text-black'
                          }`}
                        >
                          {cat.label}
                          {category === cat.id && <span className="w-1.5 h-1.5 rounded-full bg-[#1B6E8C]" />}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Sort */}
              <div className="relative">
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                  className="appearance-none border border-black/12 bg-white px-4 pr-9 py-2.5 text-[11px] tracking-[0.15em] uppercase focus:outline-none focus:border-[#1B6E8C] transition-colors cursor-pointer"
                >
                  {SORT_OPTIONS.map(o => <option key={o.id} value={o.id}>{o.label}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none text-black/40" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="bg-[#FAFAFA] py-16 md:py-20 min-h-[60vh]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10">
          {/* Count */}
          <motion.div
            key={`${category}-${search}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-between mb-8"
          >
            <p className="text-sm text-black/40">
              Showing <span className="font-medium text-black">{filtered.length}</span> product{filtered.length !== 1 ? 's' : ''}
              {category !== 'all' && <span className="text-[#1B6E8C]"> · {categories.find(c => c.id === category)?.label}</span>}
            </p>
            {(search || category !== 'all') && (
              <button
                onClick={() => { 
                  setSearch(''); 
                  setCategory('all'); 
                  setSearchParams({});
                }}
                className="text-[10px] tracking-[0.2em] uppercase text-black/40 hover:text-[#1B6E8C] transition-colors flex items-center gap-1"
              >
                <X className="w-3 h-3" /> Clear filters
              </button>
            )}
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="aspect-[4/5] bg-black/5 animate-pulse rounded-lg" />
              ))}
            </div>
          ) : isError ? (
             <div className="text-center py-28">
              <p className="font-serif text-3xl font-light text-red-800/60">Communication failed.</p>
              <p className="text-sm text-black/35 mt-3">We couldn't reach the medical database. Please try again.</p>
            </div>
          ) : filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-28"
            >
              <p className="font-serif text-4xl font-light text-black/25">No products found.</p>
              <p className="text-sm text-black/35 mt-3">Try adjusting your filters or search query.</p>
              <button
                onClick={() => { setSearch(''); setCategory('all'); }}
                className="mt-6 text-[11px] tracking-[0.2em] uppercase border-b border-black/25 pb-1 hover:text-[#1B6E8C] hover:border-[#1B6E8C] transition-colors"
              >
                Show all products
              </button>
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <AnimatePresence>
                {filtered.map((product, i) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={i}
                    onView={setSelectedProduct}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetailModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}