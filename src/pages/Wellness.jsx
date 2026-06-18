import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, ShoppingCart, Plus } from 'lucide-react';
import ScrollMarquee from '@/components/ui/ScrollMarquee';
import { useCart } from '@/lib/CartContext';
import useCmsPage from '@/hooks/useCmsPage';
import { DEFAULT_WELLNESS_SECTIONS } from '@/lib/cmsDefaults';

const ease = [0.16, 1, 0.3, 1];

const SHOWCASE_PRODUCTS = [
  {
    id: 101,
    name: 'Magnesium Complex',
    brand: 'Sleep & Recovery',
    price: 8500,
    img: 'https://images.unsplash.com/photo-1616671285420-569d6c70eb37?w=600&q=80',
    unit: '60 CAPS',
    category: 'WELLNESS'
  },
  {
    id: 102,
    name: 'Clinical Vit C + Zinc',
    brand: 'Immune Support',
    price: 6200,
    img: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=600&q=80',
    unit: '30 TABS',
    category: 'WELLNESS'
  },
  {
    id: 103,
    name: 'Hydration Electrolytes',
    brand: 'Sports Nutrition',
    price: 12000,
    img: 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=600&q=80',
    unit: '250 G',
    category: 'WELLNESS'
  },
  {
    id: 104,
    name: 'Dermal Ceramide Barrier',
    brand: 'Clinical Skincare',
    price: 18500,
    img: 'https://images.unsplash.com/photo-1608248597481-496100c80836?w=600&q=80',
    unit: '50 ML',
    category: 'WELLNESS'
  }
];

function ProductCarouselSection({ data }) {
  const { add, items } = useCart();
  const isAdded = (id) => items.some(item => item.id === id);

  const { title, linkText, products } = data;
  const listToUse = products && products.length > 0 ? products : SHOWCASE_PRODUCTS;
  const carouselItems = [...listToUse, ...listToUse, ...listToUse];

  return (
    <section className="bg-white py-20 overflow-hidden select-none text-black">
      <div className="mb-12 px-5 md:px-12 flex justify-between items-end max-w-[1800px] mx-auto">
         <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-black leading-none">
            {title}
         </h2>
         <Link to="/shop" className="text-2xs md:text-sm font-black tracking-[0.3em] uppercase text-black/40 hover:text-brand-teal transition-colors flex items-center gap-2">
            {linkText} <ArrowUpRight className="w-3.5 h-3.5" />
         </Link>
      </div>

      <div className="relative w-full flex">
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />

        <motion.div 
          className="flex gap-0 w-max"
          animate={{ x: ["0%", "-33.333%"] }}
          transition={{ ease: "linear", duration: 45, repeat: Infinity }}
        >
          {carouselItems.map((p, i) => (
            <div
                key={`${p.id}-${i}`}
                className="group relative w-[80vw] sm:w-[45vw] md:w-[30vw] lg:w-[25vw] flex-shrink-0 border-r border-y border-black/10 cursor-pointer overflow-hidden flex flex-col justify-between h-[45vh] sm:h-[50vh] bg-white first:border-l text-black"
            >
                <div className="absolute inset-0 z-0 bg-[#FAFAFA] svz-image-reveal">
                    <img 
                        src={p.img} 
                        alt={p.name} 
                        className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105" 
                        draggable={false}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-700" />
                </div>

                <div className="relative z-10 w-full p-6 md:p-8 flex flex-col justify-between h-full pointer-events-none">
                    <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <p className="text-2xs md:text-sm font-black tracking-[0.3em] uppercase text-black/30 group-hover:text-brand-teal transition-all duration-500">Node {p.id}</p>
                          <h3 className="text-lg md:text-xl font-black uppercase tracking-tighter leading-none group-hover:translate-x-2 transition-all duration-700">{p.name}</h3>
                        </div>
                    </div>

                    <div className="flex justify-between items-end pointer-events-auto">
                        <div className="space-y-1">
                            <p className="text-2xs md:text-sm font-black tracking-[0.3em] uppercase text-black/40">{p.brand}</p>
                            <p className="text-xl font-black tracking-tighter transition-all duration-700 group-hover:text-brand-teal">₦{p.price.toLocaleString()}</p>
                        </div>
                        
                        <button 
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); add(p); }}
                            className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition-all duration-700 ${
                              isAdded(p.id) ? 'bg-brand-teal text-white' : 'bg-black text-white group-hover:bg-brand-teal'
                            }`}
                        >
                            {isAdded(p.id) ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </button>
                    </div>
                </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default function Wellness() {
  const { sections } = useCmsPage('wellness', DEFAULT_WELLNESS_SECTIONS);

  const getCustomStyles = (data) => {
    const styles = {};
    if (data?.customTextColor) styles.color = data.customTextColor;
    if (data?.customFontFamily) styles.fontFamily = data.customFontFamily;
    if (data?.customFontWeight) styles.fontWeight = data.customFontWeight;
    if (data?.customFontSize) styles.fontSize = data.customFontSize;
    return styles;
  };

  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-brand-teal selection:text-white">
      {sections.map((sec) => {
        const customStyles = getCustomStyles(sec.data);

        return (
          <div key={sec.id} style={customStyles}>
            {(() => {
              switch (sec.type) {
                case 'wellness_hero':
                  return (
                    <section className="relative min-h-screen bg-black overflow-hidden flex flex-col justify-between px-6 md:px-12">
                      <div className="max-w-[1800px] mx-auto w-full z-10 flex flex-col justify-between flex-1 pt-[25vh] pb-12">
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, ease }}
                          className="text-2xs font-black tracking-[0.4em] uppercase text-brand-teal mb-4 text-left"
                        >
                          {sec.data.topLabel}
                        </motion.div>

                        <div className="my-auto max-w-5xl text-left">
                          <h1 className="display-giant leading-[0.85] text-white">
                            {sec.data.title}<br />
                            {sec.data.italicWord && (
                              <span className="font-serif-italic font-light lowercase tracking-normal text-brand-teal italic">
                                {sec.data.italicWord}
                              </span>
                            )}
                          </h1>
                          <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 1, ease }}
                            className="text-base md:text-xl text-white/60 font-medium tracking-normal mt-10 max-w-xl leading-relaxed"
                          >
                            {sec.data.subtext}
                          </motion.p>

                          <motion.div
                            initial={{ opacity: 0, y: 25 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 1, ease }}
                            className="flex flex-wrap gap-5 mt-12"
                          >
                            {sec.data.primaryBtnText && (
                              <Link
                                to={sec.data.primaryBtnLink || '/shop'}
                                className="bg-white text-black px-12 py-5 text-2xs md:text-sm font-black uppercase tracking-[0.25em] hover:bg-brand-teal hover:text-white transition-all duration-500"
                              >
                                {sec.data.primaryBtnText}
                              </Link>
                            )}
                            {sec.data.secondaryBtnText && (
                              <Link
                                to={sec.data.secondaryBtnLink || '/rx-terminal'}
                                className="border border-white/20 px-12 py-5 text-2xs md:text-sm font-black uppercase tracking-[0.25em] hover:bg-white hover:text-black transition-all duration-500 flex items-center gap-3"
                              >
                                {sec.data.secondaryBtnText} <ArrowUpRight className="w-4 h-4" />
                              </Link>
                            )}
                          </motion.div>
                        </div>

                        <div className="flex justify-end items-center text-3xs font-black tracking-[0.3em] text-white/30 uppercase mt-12">
                          <span>SCROLL TO DISCOVER</span>
                        </div>
                      </div>
                      <div className="absolute right-[-10vw] top-[10vh] w-[50vw] h-[50vw] bg-brand-teal/5 blur-[200px] rounded-full pointer-events-none" />
                    </section>
                  );

                case 'wellness_philosophy':
                  return (
                    <section className="bg-white text-black py-32 px-6 md:px-12 border-t border-black/10">
                      <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                        <div className="lg:col-span-5 text-left">
                          <p className="text-2xs font-black tracking-[0.4em] uppercase text-brand-teal mb-6">{sec.data.label}</p>
                          <h2 className="display-lg leading-[0.95] text-black">
                            {sec.data.title && sec.data.title.split(' ').slice(0, 2).join(' ')}<br />
                            {sec.data.title && sec.data.title.split(' ').slice(2).join(' ')}
                          </h2>
                        </div>
                        <div className="lg:col-span-7 text-left">
                          <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease }}
                            className="text-xl md:text-3xl font-medium tracking-tight leading-relaxed text-black/80 text-justify-inter"
                          >
                            {sec.data.copy}
                          </motion.p>
                        </div>
                      </div>
                    </section>
                  );

                case 'wellness_categories':
                  return (
                    <section className="bg-[#FAFAFA] text-black py-24 px-6 md:px-12 border-t border-black/5">
                      <div className="max-w-[1800px] mx-auto text-left">
                        <div className="mb-16">
                          <p className="text-2xs font-black tracking-[0.4em] uppercase text-brand-teal mb-4">{sec.data.label}</p>
                          <h2 className="display-md text-black">{sec.data.title}</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-black/10">
                          {sec.data.categories.map((cat, idx) => (
                            <motion.div
                              key={cat.title}
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: idx * 0.05, duration: 0.8 }}
                              className="p-12 md:p-16 border-b border-r border-black/10 hover:bg-black hover:text-white transition-all duration-700 group flex flex-col justify-between min-h-[350px]"
                            >
                              <div>
                                <div className="flex justify-between items-center mb-8">
                                  <span className="text-2xs font-black tracking-[0.3em] uppercase text-black/30 group-hover:text-white/20">0{idx + 1} // CATEGORY</span>
                                  <span className="text-3xs font-black tracking-[0.2em] border border-black/20 group-hover:border-white/20 px-2 py-0.5 uppercase text-black/50 group-hover:text-white/60 rounded-sm">
                                    {cat.tag}
                                  </span>
                                </div>
                                <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 transition-all duration-500 group-hover:text-brand-teal">
                                  {cat.title}
                                </h3>
                                <p className="text-xs font-semibold text-black/50 group-hover:text-white/60 tracking-normal leading-relaxed">
                                  {cat.text}
                                </p>
                              </div>
                              <div className="mt-8 flex justify-end">
                                <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-brand-teal" />
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </section>
                  );

                case 'wellness_gym':
                  return (
                    <section className="bg-black text-white py-32 px-6 md:px-12 relative overflow-hidden">
                      <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10 text-left">
                        <div className="lg:col-span-6 space-y-8">
                          <p className="text-2xs font-black tracking-[0.4em] uppercase text-brand-teal">{sec.data.label}</p>
                          <h2 className="display-lg leading-[0.95] text-white">
                            {sec.data.title && sec.data.title.split(' ').slice(0, 1).join(' ')}<br />
                            {sec.data.title && sec.data.title.split(' ').slice(1).join(' ')}
                          </h2>
                          <p className="text-lg md:text-xl text-white/60 font-medium tracking-normal leading-relaxed max-w-xl">
                            {sec.data.copy}
                          </p>
                          
                          <div className="flex flex-wrap gap-3 pt-4">
                            {sec.data.tags.map((tag) => (
                              <span key={tag} className="text-2xs font-black tracking-widest uppercase border border-white/25 px-4 py-2 hover:border-brand-teal hover:text-brand-teal transition-colors">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="lg:col-span-6">
                          {sec.data.imageUrl && (
                            <div className="relative aspect-video max-w-2xl mx-auto overflow-hidden bg-white/5 border border-white/10 shadow-2xl rounded-sm">
                              <img 
                                src={sec.data.imageUrl} 
                                alt={sec.data.title} 
                                className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity duration-1000"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="absolute left-[-10vw] bottom-[-10vh] w-[45vw] h-[45vw] bg-brand-teal/5 blur-[180px] rounded-full pointer-events-none" />
                    </section>
                  );

                case 'wellness_family':
                  return (
                    <section className="bg-white text-black py-32 px-6 md:px-12 border-t border-black/10">
                      <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start text-left">
                        <div className="lg:col-span-5">
                          <p className="text-2xs font-black tracking-[0.4em] uppercase text-brand-teal mb-6">{sec.data.label}</p>
                          <h2 className="display-lg leading-[0.95] text-black">
                            {sec.data.title && sec.data.title.split(' ').slice(0, 2).join(' ')}<br />
                            {sec.data.title && sec.data.title.split(' ').slice(2).join(' ')}
                          </h2>
                        </div>
                        <div className="lg:col-span-7">
                          <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease }}
                            className="text-lg md:text-2xl font-medium tracking-normal leading-relaxed text-black/80"
                          >
                            {sec.data.copy}
                          </motion.p>
                        </div>
                      </div>
                    </section>
                  );

                case 'wellness_quality':
                  return (
                    <section className="bg-[#0A0A0A] text-white py-32 px-6 md:px-12 relative overflow-hidden">
                      <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10 text-left">
                        <div className="lg:col-span-5">
                          <p className="text-2xs font-black tracking-[0.4em] uppercase text-brand-teal mb-6">{sec.data.label}</p>
                          <h2 className="display-lg leading-[0.95] text-white">
                            {sec.data.title && sec.data.title.split(' ').slice(0, 1).join(' ')}<br />
                            {sec.data.title && sec.data.title.split(' ').slice(1, 2).join(' ')}<br />
                            {sec.data.title && sec.data.title.split(' ').slice(2).join(' ')}
                          </h2>
                        </div>
                        <div className="lg:col-span-7">
                          <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease }}
                            className="space-y-8 max-w-xl"
                          >
                            <p className="text-lg md:text-xl text-white/80 font-medium leading-relaxed tracking-normal">
                              {sec.data.copy}
                            </p>
                            <div className="border-l-4 border-brand-teal pl-6 space-y-2">
                              <p className="text-xs font-black tracking-widest text-brand-teal uppercase">{sec.data.detailTitle}</p>
                              <p className="text-xs font-medium text-white/50 leading-relaxed">
                                {sec.data.detailText}
                              </p>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                      <div className="absolute right-[-5vw] bottom-[-5vh] w-[35vw] h-[35vw] bg-brand-teal/5 blur-[150px] rounded-full pointer-events-none" />
                    </section>
                  );

                case 'marquee':
                  return (
                    <section className="py-16 bg-white overflow-hidden border-y border-black/5">
                      <ScrollMarquee baseVelocity={sec.data.velocity || -0.35}>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span
                            key={i}
                            className="display-giant font-black uppercase tracking-[-0.04em] text-black/[0.04] whitespace-nowrap"
                          >
                            {sec.data.text}&nbsp;
                          </span>
                        ))}
                      </ScrollMarquee>
                    </section>
                  );

                case 'product_carousel':
                  return <ProductCarouselSection data={sec.data} />;

                case 'wellness_cta':
                  return (
                    <section className="bg-black text-white py-40 px-6 md:px-12 relative overflow-hidden text-center border-t border-white/5">
                      <div className="max-w-[1200px] mx-auto space-y-12 relative z-10">
                        <p className="text-2xs font-black tracking-[0.5em] uppercase text-brand-teal">{sec.data.label}</p>
                        <h2 className="text-[6vw] md:text-[5vw] font-black uppercase tracking-[-0.04em] leading-[0.9] text-white">
                          {sec.data.title && sec.data.title.split(' ').slice(0, 3).join(' ')}<br />
                          {sec.data.title && sec.data.title.split(' ').slice(3, 4).join(' ') && (
                            <span className="font-serif-italic font-light lowercase tracking-normal text-brand-teal italic">
                              {sec.data.title.split(' ').slice(3, 4).join(' ')}
                            </span>
                          )}{' '}
                          {sec.data.title && sec.data.title.split(' ').slice(4).join(' ')}
                        </h2>
                        <p className="text-base md:text-xl text-white/50 max-w-xl mx-auto leading-relaxed font-medium">
                          {sec.data.subtext}
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-6 pt-6">
                          {sec.data.primaryBtnText && (
                            <Link
                              to={sec.data.primaryBtnLink || '/shop'}
                              className="bg-white text-black px-16 py-6 text-2xs md:text-sm font-black uppercase tracking-[0.3em] hover:bg-brand-teal hover:text-white transition-all duration-700"
                            >
                              {sec.data.primaryBtnText}
                            </Link>
                          )}
                          {sec.data.secondaryBtnText && (
                            <Link
                              to={sec.data.secondaryBtnLink || '/contact'}
                              className="border border-white/20 px-16 py-6 text-2xs md:text-sm font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-700 flex items-center justify-center gap-4 animate-none"
                            >
                              {sec.data.secondaryBtnText} <ArrowUpRight className="w-4 h-4" />
                            </Link>
                          )}
                        </div>
                      </div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-brand-teal/5 blur-[250px] rounded-full pointer-events-none" />
                    </section>
                  );

                default:
                  return null;
              }
            })()}
          </div>
        );
      })}
    </div>
  );
}
