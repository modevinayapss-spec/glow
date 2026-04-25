import React, { useState, useEffect } from "react";
import { User, Settings, Package, Heart, History, LogOut, ChevronRight, Shield, ShoppingBag, CreditCard, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/src/lib/utils";
import { MOCK_PRODUCTS } from "@/src/services/productService";
import { db, auth } from "../lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { signOut } from "firebase/auth";

interface UserProfile {
  skinProfile?: {
    skinType: string;
    concerns: string[];
    confidence: number;
  };
  lastAnalysisDate?: string;
}

export default function Profile() {
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

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/welcome");
  };

  const stats = [
    { label: "Total Orders", value: "0", icon: ShoppingBag, color: "bg-rose-500" },
    { label: "Active Orders", value: "0", icon: Package, color: "bg-amber-500" },
    { label: "Total Spent", value: "$0", icon: CreditCard, color: "bg-indigo-500" },
    { label: "Skin Score", value: profile?.skinProfile ? "92" : "--", icon: Sparkles, color: "bg-emerald-500" },
  ];

  const recommendations = MOCK_PRODUCTS.slice(0, 4);
  const userName = auth.currentUser?.displayName || "Glow Seeker";

  return (
    <div className="space-y-12 pb-32 animate-in fade-in fill-mode-both duration-1000">
      {/* Welcome Banner */}
      <motion.section 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-gradient-to-r from-rose-500 to-rose-400 rounded-[40px] p-12 overflow-hidden shadow-2xl shadow-rose-200"
      >
        <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="relative z-10 space-y-2">
           <h2 className="text-4xl font-serif text-white italic">Welcome back, <span className="not-italic font-light">{userName}! ✨</span></h2>
           <p className="text-white/70 text-xs font-bold uppercase tracking-[0.2em]">Your skin journey continues here</p>
        </div>
      </motion.section>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <motion.div 
            key={stat.label}
            whileHover={{ y: -5 }}
            className="bg-white/40 backdrop-blur-xl rounded-3xl p-6 border border-white/60 shadow-sm flex flex-col gap-4"
          >
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white", stat.color)}>
              <stat.icon size={20} />
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-black text-ink italic leading-none">{stat.value}</p>
              <p className="text-[9px] font-bold text-ink/30 uppercase tracking-widest">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-10">
           {/* Recent Orders */}
           <section className="bg-white rounded-[40px] p-10 border border-black/5 shadow-xl space-y-8">
              <div className="flex items-center justify-between">
                 <h3 className="font-serif text-xl italic text-ink leading-none">Recent Orders</h3>
                 <button className="text-[10px] font-black uppercase tracking-widest text-rose-500 flex items-center gap-1">View All <ChevronRight size={14} /></button>
              </div>
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-6">
                 <div className="w-20 h-20 bg-muted-tan/30 rounded-full flex items-center justify-center text-ink/10">
                    <Package size={32} />
                 </div>
                 <div className="space-y-1">
                    <p className="text-xs font-bold text-ink/30 uppercase tracking-widest">No orders yet</p>
                    <button onClick={() => navigate("/products")} className="text-rose-500 text-[10px] font-black uppercase tracking-widest hover:underline">Start Shopping</button>
                 </div>
              </div>
           </section>

           {/* Profile Details */}
           <section className="bg-white/40 backdrop-blur-xl rounded-[40px] p-10 border border-white/60 shadow-sm space-y-10">
              <h3 className="font-serif text-xl italic text-ink leading-none px-2">Profile</h3>
              <div className="grid grid-cols-2 gap-12">
                 <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-ink/30">Name</span>
                    <p className="text-sm font-black text-ink">{userName}</p>
                 </div>
                 <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-ink/30">Email</span>
                    <p className="text-sm font-black text-ink">{auth.currentUser?.email}</p>
                 </div>
                 <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-ink/30">Skin Type</span>
                    <p className="text-sm font-black text-ink italic leading-tight">{profile?.skinProfile?.skinType || "Not Set"}</p>
                 </div>
                 <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-ink/30">Concerns</span>
                    <p className="text-sm font-black text-ink/40">{profile?.skinProfile?.concerns.join(", ") || "Not set"}</p>
                 </div>
              </div>
              <button 
                onClick={() => navigate("/analysis/camera")}
                className="flex items-center gap-2 bg-rose-50 text-rose-500 px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-rose-100 transition-all active:scale-95"
              >
                <Sparkles size={14} /> {profile?.skinProfile ? "Retake Analysis" : "Start Now"}
              </button>
           </section>
        </div>

        {/* Recommended for You */}
        <div className="lg:col-span-1">
           <section className="bg-white rounded-[40px] p-10 border border-black/5 shadow-xl space-y-8 h-full">
              <div className="flex items-center gap-3">
                 <Sparkles size={18} className="text-rose-500" />
                 <h3 className="font-serif text-xl italic text-ink leading-none">Recommended for You</h3>
              </div>
              <div className="space-y-6">
                 {recommendations.map(prod => (
                   <div key={prod.id} className="flex gap-4 group cursor-pointer" onClick={() => navigate(`/product/${prod.id}`)}>
                      <div className="w-16 h-16 bg-muted-tan rounded-2xl overflow-hidden shadow-inner flex-shrink-0">
                         <img src={prod.image} alt={prod.name} className="w-full h-full object-cover mix-blend-multiply transition-transform group-hover:scale-110" />
                      </div>
                      <div className="flex flex-col justify-center">
                         <h4 className="text-[11px] font-black text-ink uppercase leading-tight group-hover:text-rose-500 transition-colors">{prod.name}</h4>
                         <p className="text-[9px] font-bold text-ink/20 uppercase tracking-widest mt-0.5">{prod.category}s</p>
                         <p className="text-[11px] font-bold text-rose-500 mt-1">${prod.price}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </section>
        </div>
      </div>
      
      <div className="pt-8 flex justify-center">
         <button 
          onClick={handleSignOut}
          className="flex items-center gap-3 text-ink/30 hover:text-ink transition-colors font-bold uppercase tracking-[0.3em] text-[10px]"
         >
           <LogOut size={16} /> Sign Out Of Dashboard
         </button>
      </div>
    </div>
  );
}
