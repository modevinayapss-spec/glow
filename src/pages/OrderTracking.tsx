import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Package, Truck, CheckCircle2, ChevronRight, ArrowLeft, Home, Copy, Clock } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";

export default function OrderTracking() {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state || { orderId: "GS-MOCKX7D9O", total: 91.78 };

  const steps = [
    { label: "Ordered", icon: Package, status: "completed", time: "24/4/2026 6:32 pm" },
    { label: "Packed", icon: Package, status: "pending", time: "" },
    { label: "Shipped", icon: Truck, status: "pending", time: "" },
    { label: "Delivered", icon: CheckCircle2, status: "pending", time: "" },
  ];

  return (
    <div className="space-y-12 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex items-center justify-between">
        <button onClick={() => navigate("/home")} className="w-10 h-10 border border-black/5 rounded-full flex items-center justify-center text-ink/40 hover:bg-paper transition-all">
          <Home size={18} />
        </button>
        <h2 className="text-2xl font-serif text-ink italic leading-tight">Order Progress</h2>
        <div className="w-10" />
      </header>

      {/* Progress Stepper */}
      <section className="bg-white/40 backdrop-blur-xl rounded-[40px] p-10 border border-white/60 shadow-xl overflow-hidden relative">
        <div className="relative flex justify-between items-center z-10">
          {steps.map((step, i) => (
            <React.Fragment key={step.label}>
              <div className="flex flex-col items-center gap-4 relative z-10">
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500",
                  step.status === "completed" 
                    ? "bg-rose-500 text-white shadow-lg shadow-rose-200" 
                    : "bg-muted-tan text-ink/20"
                )}>
                  <step.icon size={24} />
                </div>
                <span className={cn(
                  "text-[10px] font-black uppercase tracking-widest transition-colors",
                  step.status === "completed" ? "text-ink" : "text-ink/20"
                )}>
                  {step.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className="flex-1 h-[2px] bg-black/[0.05] mx-4 -mt-10">
                  <div className={cn(
                    "h-full bg-rose-500 transition-all duration-1000",
                    steps[i].status === "completed" ? "w-full" : "w-0"
                  )} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* Order Details Card */}
      <section className="bg-white rounded-[40px] border border-black/5 shadow-2xl p-10 space-y-10">
        <div className="flex items-start justify-between border-b border-black/[0.03] pb-10">
          <div>
            <h3 className="text-2xl font-serif italic text-ink">Order Details</h3>
            <div className="mt-4 flex items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-ink/30">Order ID:</span>
              <code className="text-sm font-black text-ink tracking-tight">{orderData.orderId}</code>
              <button className="text-tan hover:text-tan/80"><Copy size={12} /></button>
            </div>
          </div>
          <div className="text-right">
             <span className="text-[10px] font-bold uppercase tracking-widest text-ink/30">Date</span>
             <p className="text-sm font-black text-ink mt-1">24/4/2026</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-12 border-b border-black/[0.03] pb-10">
           <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-ink/30">Payment</span>
              <p className="text-sm font-black text-ink mt-1">CREDIT CARD</p>
           </div>
           <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-ink/30">Total</span>
              <p className="text-2xl font-serif italic text-rose-500 mt-1">${orderData.total.toFixed(2)}</p>
           </div>
        </div>

        {/* Mock Items List from Cart (simplified for tracking view) */}
        <div className="space-y-6">
           <span className="text-[10px] font-bold uppercase tracking-widest text-ink/30">Curated Curation Items</span>
           <div className="flex items-center justify-between group cursor-pointer hover:bg-paper/50 p-2 -mx-2 rounded-2xl transition-all">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-muted-tan rounded-xl overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1556227702-d1e4e7b5c232?auto=format&fit=crop&q=80&w=200" alt="Item" className="w-full h-full object-cover mix-blend-multiply" />
                 </div>
                 <div>
                    <h5 className="text-[11px] font-black text-ink uppercase">Radiance Glow Serum</h5>
                    <p className="text-[9px] font-bold text-ink/30 uppercase mt-0.5">Qty: 1</p>
                 </div>
              </div>
              <ChevronRight size={16} className="text-ink/10 group-hover:text-tan transition-colors" />
           </div>
        </div>
      </section>

      {/* Tracking History */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <Clock size={18} className="text-tan" />
          <h3 className="font-serif text-xl italic text-ink">Tracking History</h3>
        </div>
        <div className="bg-white/40 backdrop-blur-xl rounded-[40px] p-8 border border-white/60 shadow-sm space-y-8">
           {steps.filter(s => s.status === "completed").map(step => (
             <div key={step.label} className="flex gap-6 relative">
                <div className="w-3 h-3 rounded-full bg-rose-500 mt-1 relative z-10 shadow-lg shadow-rose-200" />
                <div className="flex-1 flex items-center justify-between -mt-1">
                   <div>
                      <h6 className="text-[11px] font-black text-ink uppercase tracking-widest">{step.label}</h6>
                      <p className="text-[9px] font-bold text-ink/30 uppercase mt-0.5">Your curation has been confirmed</p>
                   </div>
                   <span className="text-[10px] font-bold text-ink/30 tracking-tight">{step.time}</span>
                </div>
             </div>
           ))}
        </div>
      </section>

      <div className="pt-8">
        <button 
          onClick={() => navigate("/products")}
          className="w-full py-5 border border-black/5 bg-paper/50 hover:bg-paper rounded-2xl text-[10px] font-bold uppercase tracking-widest text-ink transition-all active:scale-95 flex items-center justify-center gap-3"
        >
          <ArrowLeft size={14} /> Continue Shopping
        </button>
      </div>
    </div>
  );
}
