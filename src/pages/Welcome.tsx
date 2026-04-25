import React from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Camera, ArrowRight, ShieldCheck, Leaf, Truck, RotateCcw, Star } from "lucide-react";
import { motion } from "motion/react";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-paper flex flex-col items-center overflow-x-hidden">
      {/* Dynamic Background Blurs */}
      <div className="fixed top-[-100px] right-[-100px] w-[500px] h-[500px] bg-soft-tan rounded-full blur-[120px] opacity-60 -z-0 pointer-events-none" />
      <div className="fixed bottom-[-100px] left-[-100px] w-[500px] h-[500px] bg-rose-100/30 rounded-full blur-[120px] opacity-60 -z-0 pointer-events-none" />

      {/* Nav Placeholder (Landing style) */}
      <nav className="w-full max-w-6xl px-8 py-8 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center text-white shadow-lg shadow-rose-200">
             <Sparkles size={18} />
          </div>
          <span className="font-serif italic font-light text-2xl text-ink tracking-tight">Glow<span className="not-italic font-bold text-rose-500">Sense</span>AI</span>
        </div>
        <div className="hidden md:flex gap-10 text-[10px] font-bold uppercase tracking-widest text-ink/40">
           <button className="hover:text-ink transition-colors">Analysis</button>
           <button className="hover:text-ink transition-colors">Products</button>
           <button className="hover:text-ink transition-colors">Routines</button>
        </div>
        <button 
          onClick={() => navigate("/signin")}
          className="bg-rose-500 text-white px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-rose-600 transition-all shadow-lg active:scale-95"
        >
          Sign In
        </button>
      </nav>

      {/* Hero Section */}
      <main className="w-full max-w-6xl px-8 py-12 md:py-24 flex flex-col md:flex-row items-center gap-16 relative z-10">
        <div className="flex-1 space-y-12 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-rose-50 border border-rose-100 rounded-full text-[10px] font-bold uppercase tracking-widest text-rose-500"
          >
            <Sparkles size={14} />
            AI-Powered Skincare
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h1 className="text-6xl md:text-8xl font-serif text-ink leading-[0.9] italic">
              Your Skin, <br />
              <span className="not-italic font-light">Understood</span> <br />
              <span className="text-rose-500">by AI</span>
            </h1>
            <p className="text-ink/60 text-lg md:text-xl font-medium max-w-lg leading-relaxed mx-auto md:mx-0">
              Personalized skincare recommendations powered by artificial intelligence. Discover products that truly match your skin's unique needs.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start"
          >
            <button 
              onClick={() => navigate("/products")}
              className="w-full sm:w-auto px-10 py-5 bg-rose-500 text-white rounded-2xl font-bold uppercase tracking-widest text-[11px] shadow-2xl hover:bg-rose-600 transition-all active:scale-95"
            >
              Shop Now <ArrowRight className="inline-block ml-2" size={16} />
            </button>
            <button 
              onClick={() => navigate("/home")}
              className="w-full sm:w-auto px-10 py-5 bg-white border border-rose-100 text-rose-500 rounded-2xl font-bold uppercase tracking-widest text-[11px] hover:bg-rose-50 transition-all active:scale-95"
            >
              AI Analysis
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center md:justify-start gap-12 pt-8"
          >
            <div className="flex flex-col">
              <span className="text-2xl font-serif text-ink italic leading-none">50K+</span>
              <span className="text-[9px] font-bold uppercase tracking-widest text-ink/30">Happy Customers</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-serif text-ink italic leading-none">4.9</span>
              <span className="text-[9px] font-bold uppercase tracking-widest text-ink/30">Average Rating</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-serif text-ink italic leading-none">100%</span>
              <span className="text-[9px] font-bold uppercase tracking-widest text-ink/30">Clean Beauty</span>
            </div>
          </motion.div>
        </div>

        {/* Hero Image / Analysis Card Placeholder */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, x: 20 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          className="flex-1 relative w-full aspect-[4/5] md:aspect-square"
        >
          <div className="absolute inset-0 bg-muted-tan rounded-[60px] overflow-hidden shadow-2xl relative">
             <video 
              autoPlay 
              muted 
              loop 
              playsInline
              className="w-full h-full object-cover grayscale-[0.1] transition-transform duration-1000 hover:scale-105 sm:block"
             >
                <source src="https://assets.mixkit.co/videos/preview/mixkit-woman-applying-cream-on-her-face-34444-large.mp4" type="video/mp4" />
                Your browser does not support the video tag.
             </video>
             {/* Fallback Image */}
             <img 
               src="https://images.unsplash.com/photo-1590439471364-192aa70c0b53?auto=format&fit=crop&q=80&w=800" 
               alt="Skincare Routine" 
               className="w-full h-full object-cover absolute inset-0 -z-10"
             />
             <div className="absolute inset-0 bg-tan/5 transition-colors hover:bg-transparent" />
          </div>

          {/* Floating UI elements from screenshot */}
          <div className="absolute top-10 right-[-20px] bg-white/90 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-white/50 flex flex-col items-center gap-1">
             <div className="flex gap-0.5 text-yellow-500">
                {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
             </div>
             <span className="text-[8px] font-bold uppercase tracking-widest text-ink">Loved by 50K+ users</span>
          </div>

          <div className="absolute bottom-10 left-[-40px] bg-white/80 backdrop-blur-xl p-6 rounded-[32px] shadow-2xl border border-white/50 flex items-center gap-4">
             <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center text-rose-500">
                <Sparkles size={24} />
             </div>
             <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-ink">AI Match: 98%</h4>
                <p className="text-[8px] font-bold text-ink/40 uppercase">Based on your skin profile</p>
             </div>
          </div>
        </motion.div>
      </main>

      {/* Trust Badges */}
      <section className="w-full border-y border-black/[0.03] bg-white/30 backdrop-blur-sm relative z-10">
        <div className="max-w-6xl mx-auto px-8 py-10 flex flex-wrap justify-center md:justify-between gap-8 md:gap-16">
          <TrustBadge icon={ShieldCheck} title="Dermatologist Tested" subtitle="Clinically proven" />
          <TrustBadge icon={Leaf} title="Clean Ingredients" subtitle="No parabens or sulfates" />
          <TrustBadge icon={Truck} title="Free Shipping" subtitle="On orders over $50" />
          <TrustBadge icon={RotateCcw} title="30-Day Returns" subtitle="Hassle-free returns" />
        </div>
      </section>

      {/* Footer link */}
      <footer className="w-full py-12 px-8 flex justify-center items-center relative z-10">
        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-ink/20">Powered by DermaEngine 4.2</span>
      </footer>
    </div>
  );
}

function TrustBadge({ icon: Icon, title, subtitle }: { icon: any, title: string, subtitle: string }) {
  return (
    <div className="flex items-center gap-4 group">
      <div className="w-10 h-10 rounded-xl bg-muted-tan/50 flex items-center justify-center text-tan transition-all group-hover:scale-110 group-hover:bg-tan group-hover:text-white">
        <Icon size={20} />
      </div>
      <div>
        <h5 className="text-[10px] font-black uppercase tracking-widest text-ink">{title}</h5>
        <p className="text-[9px] font-bold text-ink/30 uppercase">{subtitle}</p>
      </div>
    </div>
  );
}
