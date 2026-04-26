import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useCategories } from '@/hooks/useProducts';
import { decorateCategories } from '@/utils/category-utils';
import { useNavigate } from 'react-router-dom';


export default function ProductCategoryCarousel() {
  const [active, setActive] = useState(0);
  const trackRef = useRef(null);
  const navigate = useNavigate();
  const { data: rawCategories = [] } = useCategories();
  const categories = decorateCategories(rawCategories);

  const scrollTo = (i) => {
    const next = Math.max(0, Math.min(categories.length - 1, i));
    if (categories.length === 0) return;
    setActive(next);
    const el = trackRef.current?.children[next];
    if (el) el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  };

  return (
    <section className="bg-[#FAFAFA] py-24 md:py-32">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-4 text-[10px] tracking-[0.35em] uppercase text-[#0A0A0A]/45">
            <span className="w-8 h-px bg-[#0A0A0A]/25" />
            <span>Carousel of Care</span>
          </div>
          <h2 className="font-serif display-md mt-5 font-light">
            Shop by <em className="not-italic text-[#1B6E8C]">need</em>.
          </h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => scrollTo(active - 1)}
            disabled={active === 0}
            className="w-12 h-12 border border-[#0A0A0A]/20 hover:bg-[#0A0A0A] hover:text-white disabled:opacity-25 transition-colors flex items-center justify-center"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scrollTo(active + 1)}
            disabled={active === categories.length - 1}
            className="w-12 h-12 border border-[#0A0A0A]/20 hover:bg-[#0A0A0A] hover:text-white disabled:opacity-25 transition-colors flex items-center justify-center"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex gap-5 overflow-x-auto scrollbar-hide pl-6 md:pl-10 pr-6 snap-x snap-mandatory pb-4"
      >
        {categories.map((cat, i) => (
          <motion.div
            key={cat.id}
            onClick={() => {
               setActive(i);
               navigate(`/shop?category=${cat.id}`);
            }}
            onMouseEnter={() => setActive(i)}
            animate={{ opacity: active === i ? 1 : 0.5 }}
            className="relative flex-shrink-0 w-[80vw] sm:w-[55vw] md:w-[40vw] lg:w-[30vw] aspect-[4/5] snap-center overflow-hidden cursor-pointer bg-[#0A0A0A]"
          >
            <motion.div
              animate={{ opacity: active === i ? 0.5 : 0.1 }}
              className="absolute inset-0"
              style={{ background: 'radial-gradient(circle at 30% 30%, #1B6E8C, #0A0A0A)' }}
            />
            <div className="relative h-full flex flex-col justify-between p-8 text-white">
              <div className="flex justify-between items-start">
                <span className="text-[10px] tracking-[0.3em] uppercase text-white/40">0{i + 1} / 0{categories.length}</span>
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#1B6E8C]">{cat.tagline}</span>
              </div>
              <div>
                <p className="font-serif text-6xl font-light text-white/8">{cat.count}</p>
                <h3 className="font-serif text-3xl md:text-4xl font-light leading-tight mt-3">{cat.title}</h3>
                <p className="text-sm text-white/50 mt-4 leading-relaxed">{cat.desc}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {cat.products.map((p) => (
                    <span key={p} className="text-[9px] tracking-wider uppercase border border-white/15 px-3 py-1.5">
                      {p}
                    </span>
                  ))}
                </div>
                <div className="mt-7 inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-white/60 border-b border-white/20 pb-1">
                  Browse category <ArrowUpRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 mt-6 flex gap-1">
        {categories.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className="h-px flex-1 transition-colors"
            style={{ backgroundColor: active === i ? '#0A0A0A' : 'rgba(10,10,10,0.1)' }}
          />
        ))}
      </div>
    </section>
  );
}