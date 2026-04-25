import React, { useState } from "react";
import { Search, SlidersHorizontal, Plus, Star, Heart, ChevronDown } from "lucide-react";
import { MOCK_PRODUCTS, Product } from "@/src/services/productService";
import { cn } from "@/src/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState(100);

  const filterCategories = [
    { title: "CATEGORY", items: ["All", "Serums", "Moisturizers", "Cleansers", "Exfoliants", "Sunscreens", "Masks", "Eye Care", "Toners"] },
    { title: "SKIN TYPE", items: ["All", "Oily", "Dry", "Combination", "Sensitive"] },
    { title: "CONCERN", items: ["All", "Acne", "Aging", "Pigmentation", "Dryness", "Sensitivity", "Dullness", "Pores"] }
  ];

  return (
    <div className="animate-in fade-in fill-mode-both duration-1000">
      {/* Search and Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-serif text-ink italic leading-tight">
            All <span className="not-italic font-light">Products</span>
          </h2>
          <p className="text-ink/40 text-[10px] font-bold uppercase tracking-[0.3em]">{MOCK_PRODUCTS.length} products found</p>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
             <input type="text" placeholder="Search curated curation..." className="w-full bg-white border border-black/5 rounded-full py-3.5 pl-12 pr-6 text-xs font-medium focus:ring-2 focus:ring-tan/20 shadow-sm transition-all" />
             <Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-ink/20" />
          </div>
          <button className="h-12 w-12 bg-white border border-black/5 rounded-full flex items-center justify-center text-ink/40 hover:text-tan transition-all shadow-sm">
            <SlidersHorizontal size={18} />
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Advanced Filter Sidebar */}
        <aside className="lg:w-64 flex-shrink-0 space-y-10">
          <div className="bg-white/40 backdrop-blur-xl rounded-[40px] p-8 border border-white/60 shadow-sm space-y-10">
            <div className="flex items-center gap-3 border-b border-black/[0.03] pb-6">
               <SlidersHorizontal size={16} className="text-tan" />
               <h3 className="font-serif text-lg italic text-ink">Filters</h3>
            </div>

            {filterCategories.map((group) => (
              <div key={group.title} className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-ink/30 px-1">{group.title}</h4>
                <div className="flex flex-wrap gap-2">
                  {group.items.map(item => (
                    <button 
                      key={item}
                      className={cn(
                        "px-4 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest border transition-all",
                        item === "All" || item === "Serums" && group.title === "CATEGORY"
                          ? "bg-rose-500 text-white border-rose-400 shadow-md"
                          : "bg-white/50 text-ink/40 border-black/5 hover:border-tan/20"
                      )}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <div className="space-y-6">
               <div className="flex justify-between items-center px-1">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-ink/30">PRICE RANGE</h4>
                  <span className="text-[10px] font-bold text-tan">$0 - ${priceRange}</span>
               </div>
               <input 
                type="range" 
                min="0" 
                max="200" 
                value={priceRange} 
                onChange={(e) => setPriceRange(parseInt(e.target.value))}
                className="w-full accent-rose-500 h-1 rounded-full appearance-none bg-black/5"
               />
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1 space-y-12">
          <div className="flex items-center justify-between pb-6 border-b border-black/[0.03]">
             <div className="flex items-center gap-2 text-xs font-bold text-ink/40 uppercase tracking-widest">
                Sort by: 
                <button className="flex items-center gap-1 text-ink group">
                   Featured <ChevronDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
                </button>
             </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
            {MOCK_PRODUCTS.map((product, idx) => (
              <EnhancedProductCard key={product.id} product={product} delay={idx * 0.05} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function EnhancedProductCard({ product, delay }: { product: Product; delay: number; key?: string }) {
  const navigate = useNavigate();
  const idNum = parseInt(product.id) || 0;
  // Mocking some extended data
  const hasDiscount = idNum % 3 === 0;
  const isNew = idNum % 4 === 0;
  const isBestseller = idNum % 5 === 0;
  const reviewsCount = Math.floor(Math.random() * 500) + 100;
  const stars = Math.floor(Math.random() * 2) + 4; // 4-5 stars

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="flex flex-col group cursor-pointer"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="aspect-[4/5] bg-muted-tan rounded-[40px] mb-6 relative overflow-hidden shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-tan/10">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0 mix-blend-multiply" 
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-ink/5 group-hover:bg-transparent transition-colors" />
        
        {/* Tags */}
        <div className="absolute top-5 left-5 flex flex-col gap-2">
           {isBestseller && <span className="bg-rose-500 text-white text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-lg">Bestseller</span>}
           {isNew && <span className="bg-ink text-white text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-lg">New</span>}
           {product.price > 50 && <span className="bg-indigo-500 text-white text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-lg">Premium</span>}
        </div>

        {/* Favorite Button */}
        <button className="absolute top-5 right-5 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-ink/20 hover:text-rose-500 transition-all opacity-0 group-hover:opacity-100 translate-y-[-10px] group-hover:translate-y-0 duration-300">
           <Heart size={18} />
        </button>

        {/* Quick Add Button */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[85%] translate-y-[100px] group-hover:translate-y-0 transition-transform duration-500">
          <button className="w-full bg-ink text-white py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest shadow-2xl flex items-center justify-center gap-2">
            <Plus size={16} /> Quick View
          </button>
        </div>
      </div>

      <div className="space-y-3 px-2">
        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-tan">{product.brand}</span>
        <h4 className="font-serif text-xl text-ink italic leading-tight group-hover:text-rose-500 transition-colors">{product.name}</h4>
        
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5 text-yellow-500">
             {[...Array(5)].map((_, i) => <Star key={i} size={10} fill={i < stars ? "currentColor" : "none"} />)}
          </div>
          <span className="text-[9px] font-bold text-ink/20 uppercase tracking-widest">({reviewsCount})</span>
        </div>

        <div className="flex items-baseline gap-3">
          <span className="text-lg font-black text-ink italic leading-none">${product.price.toFixed(2)}</span>
          {hasDiscount && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-ink/20 line-through">${(product.price * 1.3).toFixed(2)}</span>
              <span className="text-[10px] font-bold text-emerald-500 uppercase">23% off</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
