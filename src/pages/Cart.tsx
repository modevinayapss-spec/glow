import React from "react";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from "lucide-react";
import { useCart } from "@/src/contexts/CartContext";
import { cn } from "@/src/lib/utils";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { items, total, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-8 animate-in fade-in zoom-in-95">
        <div className="w-24 h-24 bg-muted-tan rounded-full flex items-center justify-center text-tan/40">
          <ShoppingBag size={48} />
        </div>
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-serif italic text-ink">Boutique <span className="not-italic font-light">Empty</span></h2>
          <p className="text-ink/40 text-[10px] font-bold uppercase tracking-widest max-w-[200px]">Your curated selection will appear here once discovered.</p>
        </div>
        <button 
          onClick={() => navigate("/products")}
          className="bg-ink text-white px-10 py-4 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] shadow-2xl active:scale-95 transition-all"
        >
          Explore Curation
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-48">
      <div className="space-y-4">
        <h2 className="text-4xl font-serif text-ink italic leading-tight">
          Shopping <span className="not-italic font-light">Bag</span>
        </h2>
        <p className="text-ink/40 text-[10px] font-bold uppercase tracking-[0.3em]">{items.length} Curated items for scan results</p>
      </div>

      <div className="space-y-8">
        {items.map((item) => (
          <div key={item.id} className="flex gap-6 border-b border-black/[0.03] pb-8">
            <div className="w-24 h-28 bg-muted-tan rounded-2xl overflow-hidden shadow-inner">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover grayscale-[0.2] mix-blend-multiply"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-1 flex flex-col justify-between py-1">
              <div className="space-y-1">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[8px] font-bold uppercase tracking-widest text-tan">{item.brand}</span>
                    <h4 className="font-serif text-lg italic text-ink leading-tight">{item.name}</h4>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-ink/20 hover:text-tan transition-colors p-1"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-ink">${item.price}</p>
                <div className="flex items-center gap-4 bg-muted-tan/30 rounded-full px-3 py-1.5 border border-black/[0.03]">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="text-ink/40 hover:text-ink transition-colors"
                  >
                    <Minus size={12} strokeWidth={3} />
                  </button>
                  <span className="text-[10px] font-bold min-w-[12px] text-center text-ink">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="text-ink/40 hover:text-ink transition-colors"
                  >
                    <Plus size={12} strokeWidth={3} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-20 left-0 right-0 p-8 bg-paper/95 backdrop-blur-xl border-t border-black/[0.03] max-w-lg mx-auto z-40">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-ink/30">Total Value</span>
            <p className="text-2xl font-serif italic text-ink">${total.toFixed(2)}</p>
          </div>
          
          <button 
            onClick={() => navigate("/checkout")}
            className="w-full bg-ink text-white py-5 rounded-xl font-bold uppercase tracking-[0.2em] text-[11px] shadow-2xl flex items-center justify-center gap-3 group active:scale-95 transition-all"
          >
            Secure Checkout
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform opacity-40" />
          </button>
        </div>
      </div>
    </div>
  );
}
