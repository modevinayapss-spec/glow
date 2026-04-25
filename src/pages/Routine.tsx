import React, { useState, useEffect } from "react";
import { Sun, Moon, CheckCircle, Clock, ChevronRight } from "lucide-react";
import { generateRoutine, RoutineStep } from "@/src/services/routineService";
import { cn } from "@/src/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { db, auth } from "../lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";

interface UserProfile {
  skinProfile?: {
    skinType: string;
    concerns: string[];
  };
}

export default function Routine() {
  const [tab, setTab] = useState<"morning" | "evening">("morning");
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

  const routine = generateRoutine(
    profile?.skinProfile?.skinType || "normal", 
    profile?.skinProfile?.concerns || []
  );

  const steps = tab === "morning" ? routine.morning : routine.evening;

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-4">
        <h2 className="text-4xl font-serif text-ink italic leading-tight">
          Personalized <span className="not-italic font-light">Regimen</span>
        </h2>
        <p className="text-ink/40 text-[10px] font-bold uppercase tracking-[0.3em]">
          Tailored for {profile?.skinProfile?.skinType || "Normal"} Skin
        </p>
      </div>

      <div className="flex border-b border-black/[0.03]">
        <button
          onClick={() => setTab("morning")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-4 text-[10px] font-bold uppercase tracking-widest transition-all relative",
            tab === "morning" ? "text-ink" : "text-ink/20 hover:text-ink/40"
          )}
        >
          Morning
          {tab === "morning" && <motion.div layoutId="tab-active" className="absolute bottom-0 left-0 right-0 h-0.5 bg-tan" />}
        </button>
        <button
          onClick={() => setTab("evening")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-4 text-[10px] font-bold uppercase tracking-widest transition-all relative",
            tab === "evening" ? "text-ink" : "text-ink/20 hover:text-ink/40"
          )}
        >
          Evening
          {tab === "evening" && <motion.div layoutId="tab-active" className="absolute bottom-0 left-0 right-0 h-0.5 bg-tan" />}
        </button>
      </div>

      <div className="space-y-8">
        <AnimatePresence mode="wait">
          <motion.div 
            key={tab}
            initial={{ opacity: 0, x: tab === "morning" ? -10 : 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: tab === "morning" ? 10 : -10 }}
            className="space-y-8"
          >
            {steps.map((step, idx) => (
              <RoutineStepCard key={idx} step={step} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="bg-ink rounded-[40px] p-10 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-[-20%] right-[-10%] w-[150px] height-[150px] bg-tan/20 rounded-full blur-[50px] pointer-events-none" />
        <div className="relative z-10 space-y-6">
          <h4 className="text-2xl font-serif italic text-white leading-tight">Smart Routine <span className="not-italic font-light">Engine</span></h4>
          <p className="text-white/40 text-xs leading-relaxed font-medium italic">
            "Your region is currently experiencing high humidity. We've adjusted your moisture seal to prevent pore congestion."
          </p>
          <button className="w-full bg-white text-ink py-4 rounded-xl font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-tan hover:text-white transition-all active:scale-95">
            Sync Humidity Levels
          </button>
        </div>
      </div>
    </div>
  );
}

function RoutineStepCard({ step }: { step: RoutineStep; key?: number }) {
  const [completed, setCompleted] = useState(false);

  return (
    <div className={cn(
      "flex gap-6 transition-all",
      completed ? "opacity-40 grayscale" : "opacity-100"
    )}>
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border border-black/5 flex items-center justify-center font-serif italic text-sm text-tan">
          {step.order}
        </div>
        <div className="w-[1px] flex-1 bg-black/5" />
      </div>

      <div className="flex-1 pb-8 group">
        <div className="flex items-start justify-between mb-4">
          <div className="space-y-1">
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-tan">{step.type}</span>
            <h4 className="font-serif text-xl italic text-ink">{step.product.name}</h4>
          </div>
          <button 
            onClick={() => setCompleted(!completed)}
            className={cn(
              "p-3 rounded-full transition-all border",
              completed ? "bg-tan border-tan text-white" : "border-black/5 text-ink/20 hover:text-ink/40"
            )}
          >
            <CheckCircle size={18} />
          </button>
        </div>

        <div className="bg-white/40 backdrop-blur-sm p-6 rounded-[32px] border border-white/60 shadow-sm flex gap-6">
           <div className="w-20 h-24 bg-muted-tan rounded-xl overflow-hidden shadow-inner">
             <img 
               src={step.product.image} 
               alt={step.product.name} 
               className="w-full h-full object-cover grayscale-[0.2] mix-blend-multiply"
               referrerPolicy="no-referrer"
             />
           </div>
           <div className="flex-1 py-1">
             <span className="text-[8px] font-bold uppercase tracking-widest text-ink/30 block mb-2">Instructions</span>
             <p className="text-xs text-ink/60 font-medium leading-relaxed italic line-clamp-3">
               {step.instructions}
             </p>
           </div>
        </div>
      </div>
    </div>
  );
}
