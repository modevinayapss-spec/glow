import React, { useState, useEffect } from "react";
import { Camera, ClipboardList, Sparkles, TrendingUp, Info, ChevronRight, Search, Bell, ShoppingBag, Grid } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/src/lib/utils";
import { MOCK_PRODUCTS } from "@/src/services/productService";
import { db, auth } from "../lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";

interface UserProfile {
  skinProfile?: {
    skinType: string;
    concerns: string[];
    confidence: number;
  };
  lastAnalysisDate?: string;
}

export default function Home() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  
  useEffect(() => {
    if (auth.currentUser) {
      const unsubscribe = onSnapshot(doc(db, "users", auth.currentUser.uid), (doc) => {
        if (doc.exists()) {
          setProfile(doc.data() as UserProfile);
        }
      });
      return unsubscribe;
    }
  }, []);
  
  const featuredProducts = MOCK_PRODUCTS.slice(0, 5);
  const categories = [
    { name: "Serums", icon: "✨" },
    { name: "Moisturizers", icon: "💧" },
    { name: "Cleansers", icon: "🫧" },
    { name: "Sunscreens", icon: "☀️" },
  ];

  const userName = auth.currentUser?.displayName?.split(" ")[0] || "there";

  return (
    <div className="space-y-12 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Top Bar with Personalized Greeting */}
      <header className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-rose-500 text-[10px] font-black uppercase tracking-[0.3em]">Welcome back</p>
          <h2 className="text-4xl font-serif text-ink italic leading-tight">
            Hi, <span className="not-italic font-light text-rose-500">{userName}</span>
          </h2>
        </div>
        <div className="flex gap-3">
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-ink/20 shadow-sm border border-black/5 hover:text-tan transition-all">
            <Search size={18} />
          </button>
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-ink/20 shadow-sm border border-black/5 hover:text-tan transition-all">
            <Bell size={18} />
          </button>
        </div>
      </header>

      {/* Analysis Results Card (Dashboard Style) */}
      <section className="bg-gradient-to-br from-rose-500 to-rose-400 rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl shadow-rose-200">
        <div className="absolute top-[-20px] right-[-20px] w-48 h-48 bg-white/10 rounded-full blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between gap-8">
           <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 rounded-full text-[9px] font-bold uppercase tracking-widest">
                 <Sparkles size={12} /> Analysis Results
              </div>
              <div>
                 <h3 className="text-2xl font-serif italic text-white leading-tight">
                    {profile?.skinProfile 
                      ? <>Your Skin Type is <span className="not-italic font-light uppercase">{profile.skinProfile.skinType}</span></>
                      : <>Complete your <span className="not-italic font-light">Skin Scan</span></>
                    }
                 </h3>
                 <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest mt-1">
                    {profile?.lastAnalysisDate 
                      ? `Last Update: ${new Date(profile.lastAnalysisDate).toLocaleDateString()}`
                      : "Analysis is ready for you"}
                 </p>
              </div>
              <button 
                onClick={() => navigate("/analysis/camera")}
                className="bg-white text-rose-500 px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-xl shadow-rose-900/20 active:scale-95 transition-all"
              >
                {profile?.skinProfile ? "Retake Analysis" : "Start Now"}
              </button>
           </div>
           
           <div className="flex gap-8 border-l border-white/10 pl-8 h-full items-center">
              <div className="text-center">
                 <p className="text-3xl font-serif italic">{profile?.skinProfile ? "92" : "--"}</p>
                 <p className="text-[8px] font-bold uppercase tracking-widest opacity-60">Skin Score</p>
              </div>
              <div className="text-center">
                 <p className="text-3xl font-serif italic">{profile?.skinProfile?.concerns.length || "--"}</p>
                 <p className="text-[8px] font-bold uppercase tracking-widest opacity-60">Concerns</p>
              </div>
           </div>
        </div>
      </section>

      {/* Featured Products Carousel */}
      <section className="space-y-6">
        <div className="flex items-center justify-between px-2">
           <h3 className="font-serif text-2xl italic text-ink">Featured <span className="not-italic font-light">Products</span></h3>
           <button onClick={() => navigate("/products")} className="text-[10px] font-bold uppercase tracking-widest text-tan hover:text-rose-500 transition-colors">View All</button>
        </div>
        <div className="flex gap-6 overflow-x-auto no-scrollbar -mx-6 px-6 pb-4">
          {featuredProducts.map((product) => (
            <motion.div 
              key={product.id}
              whileHover={{ y: -5 }}
              onClick={() => navigate(`/product/${product.id}`)}
              className="w-48 flex-shrink-0 space-y-4 group cursor-pointer"
            >
              <div className="aspect-[4/5] bg-muted-tan rounded-[32px] overflow-hidden relative shadow-sm border border-black/5 group-hover:shadow-xl group-hover:shadow-tan/10 transition-all">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 mix-blend-multiply transition-all duration-700" 
                />
                <div className="absolute inset-0 bg-ink/5 group-hover:bg-transparent transition-colors" />
                <button className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-ink shadow-lg opacity-0 group-hover:opacity-100 transition-all active:scale-90">
                  <ShoppingBag size={18} />
                </button>
              </div>
              <div className="px-1 space-y-1">
                 <span className="text-[9px] font-black uppercase tracking-widest text-tan">{product.brand}</span>
                 <h4 className="font-serif text-lg text-ink italic leading-tight truncate">{product.name}</h4>
                 <p className="text-sm font-black text-ink italic">${product.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Shop By Category */}
      <section className="space-y-6">
        <h3 className="font-serif text-2xl italic text-ink px-2">Shop By <span className="not-italic font-light">Category</span></h3>
        <div className="grid grid-cols-2 gap-6">
          {categories.map((cat) => (
            <div 
              key={cat.name}
              className="bg-white border border-black/5 rounded-[32px] p-6 flex flex-col items-center justify-center gap-4 group cursor-pointer hover:bg-rose-50 transition-all hover:border-rose-100"
            >
               <div className="w-16 h-16 bg-paper rounded-[24px] flex items-center justify-center text-3xl transition-transform group-hover:scale-110">
                  {cat.icon}
               </div>
               <div className="text-center">
                  <h4 className="font-serif lg text-ink italic leading-none">{cat.name}</h4>
                  <p className="text-[8px] font-bold text-ink/20 uppercase tracking-widest mt-1">Explore Range</p>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* Routine Quick Access */}
      <section 
        onClick={() => navigate("/routine")}
        className="bg-paper border-2 border-dashed border-tan/30 rounded-huge p-8 flex items-center justify-between group cursor-pointer hover:bg-tan/5 transition-all overflow-hidden relative"
      >
        <div className="absolute top-[-20px] left-[-20px] w-24 h-24 bg-tan opacity-5 rounded-full blur-2xl" />
        <div className="relative z-10 flex items-center gap-6">
           <div className="w-16 h-16 bg-tan text-white rounded-[24px] flex items-center justify-center shadow-xl shadow-tan/20 transition-transform group-hover:scale-110">
              <TrendingUp size={28} />
           </div>
           <div>
              <h4 className="font-serif text-2xl italic text-ink">Access Routine</h4>
              <p className="text-xs font-medium text-ink/40">Keep up your skincare streak</p>
           </div>
        </div>
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-tan/20 group-hover:text-tan group-hover:translate-x-2 transition-all">
           <ChevronRight size={24} />
        </div>
      </section>
    </div>
  );
}
