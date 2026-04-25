import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle2, TrendingUp, Sparkles, BookOpen, ChevronRight, ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { SkinAnalysisResult } from "@/src/services/aiService";
import { db, auth } from "../lib/firebase";
import { doc, updateDoc, arrayUnion, setDoc } from "firebase/firestore";

export default function AnalysisResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { result: SkinAnalysisResult; method: string } | null;

  useEffect(() => {
    const saveAnalysis = async () => {
      if (state && auth.currentUser) {
        const userRef = doc(db, "users", auth.currentUser.uid);
        try {
          await setDoc(userRef, {
            skinProfile: state.result,
            lastAnalysisDate: new Date().toISOString(),
            analysisHistory: arrayUnion({
              ...state.result,
              date: new Date().toISOString(),
              method: state.method
            })
          }, { merge: true });
          console.log("Analysis saved to profile");
        } catch (error) {
          console.error("Error saving analysis:", error);
        }
      }
    };
    saveAnalysis();
  }, [state]);

  if (!state) {
    return <div className="text-center py-20 px-8">
      <div className="font-serif text-3xl italic mb-4">No report found</div>
      <button onClick={() => navigate("/home")} className="text-[10px] font-bold uppercase tracking-widest text-tan">Return Home</button>
    </div>;
  }

  const { result } = state;
  const userName = auth.currentUser?.displayName || "Glow Seeker";

  return (
    <div className="space-y-12 pb-12 animate-in fade-in fill-mode-both duration-1000">
      <header className="flex items-center justify-between">
        <button onClick={() => navigate("/home")} className="w-10 h-10 border border-black/5 rounded-full flex items-center justify-center text-ink/40">
          <ArrowLeft size={18} />
        </button>
        <span className="text-[9px] font-bold uppercase tracking-widest-plus text-tan">Scan Complete — {new Date().toLocaleDateString()}</span>
      </header>

      <section className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-6xl font-serif leading-[1] text-ink italic">
            Hello, <span className="not-italic font-light">{userName}</span>
          </h2>
          <p className="text-lg text-ink/70 font-medium leading-tight max-w-sm">
            Our AI has identified <span className="text-ink font-bold">{result.skinType} skin</span> with a focus on <span className="text-tan italic">{result.concerns[0] || "vitality"}</span>.
          </p>
        </div>

        <div className="aspect-[3/4] bg-muted-tan rounded-[40px] overflow-hidden relative shadow-2xl shadow-tan/10 group">
          <img 
            src="https://images.unsplash.com/photo-1596755389378-7d0d244832bd?auto=format&fit=crop&q=80&w=800" 
            alt="Analysis Mapping" 
            className="w-full h-full object-cover grayscale-[0.4] group-hover:grayscale-0 transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-soft-tan/20 mix-blend-overlay" />
          
          <div className="absolute top-1/4 left-1/4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-bold tracking-widest text-ink/80 border border-black/5 shadow-sm uppercase">
            Confidence: {Math.round(result.confidence * 100)}%
          </div>
          <div className="absolute bottom-1/3 right-1/4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-bold tracking-widest text-ink/80 border border-black/5 shadow-sm">
            TYPE: {result.skinType.toUpperCase()}
          </div>
          
          <div className="absolute bottom-8 left-0 right-0 px-8">
             <button 
              onClick={() => navigate("/analysis/camera")}
              className="w-full bg-white text-ink text-[10px] font-bold py-5 rounded-full uppercase tracking-widest shadow-xl hover:bg-ink hover:text-white transition-colors"
             >
                Retake Analysis
             </button>
          </div>
        </div>
      </section>

      <section className="bg-white/40 backdrop-blur-xl rounded-[32px] p-8 border border-white/60 shadow-sm space-y-8">
        <div className="flex justify-between items-end">
          <h3 className="text-3xl font-serif italic text-ink">Expert <span className="not-italic font-light">Summary</span></h3>
        </div>
        
        <div className="space-y-4">
           <div className="flex flex-wrap gap-2">
            {result.concerns.map((concern, idx) => (
              <span key={idx} className="bg-muted-tan/50 text-tan px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest border border-black/[0.03]">
                {concern}
              </span>
            ))}
          </div>
          <p className="text-ink/60 text-sm leading-relaxed font-serif italic">
            "{result.description}"
          </p>
        </div>

        <div className="pt-4 space-y-4">
           <button 
            onClick={() => navigate("/routine")}
            className="w-full bg-ink text-white p-6 rounded-2xl flex items-center justify-between group active:scale-95 transition-all shadow-xl"
          >
            <div className="flex items-center gap-4 text-left">
              <div className="bg-white/10 p-3 rounded-xl group-hover:scale-110 transition-transform">
                <BookOpen size={20} className="text-tan" />
              </div>
              <div>
                <h4 className="font-serif text-lg italic">Build Regimen</h4>
                <p className="text-white/40 text-[9px] font-bold uppercase tracking-widest">Adjusted for context</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-white/20" />
          </button>
        </div>
      </section>
    </div>
  );
}

function InfoIcon({ size, className }: any) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}
