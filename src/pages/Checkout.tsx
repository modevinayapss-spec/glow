import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, Smartphone, Banknote, ShieldCheck, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { useCart } from "../contexts/CartContext";
import { cn } from "@/src/lib/utils";

export default function Checkout() {
  const navigate = useNavigate();
  const { items, total } = useCart();
  const tax = total * 0.08;
  const shipping = 0;
  const grandTotal = total + tax + shipping;

  const handlePlaceOrder = () => {
    // Generate mock order ID
    const orderId = "GS-" + Math.random().toString(36).substring(2, 10).toUpperCase();
    navigate("/order-tracking", { state: { orderId, total: grandTotal } });
  };

  return (
    <div className="space-y-12 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="w-10 h-10 border border-black/5 rounded-full flex items-center justify-center text-ink/40">
          <ArrowLeft size={18} />
        </button>
        <h2 className="text-2xl font-serif text-ink italic leading-tight">Checkout</h2>
        <div className="w-10" />
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-10">
          {/* Delivery Address */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-tan/10 flex items-center justify-center text-tan">1</div>
              <h3 className="font-serif text-xl italic text-ink">Delivery Address</h3>
            </div>
            <div className="bg-white/40 backdrop-blur-xl rounded-[32px] p-8 border border-white/60 shadow-sm transition-all focus-within:border-tan/20">
              <textarea 
                placeholder="Enter your full delivery address including city, state, and zip code..."
                className="w-full bg-transparent border-none focus:ring-0 text-sm font-medium text-ink placeholder:text-ink/20 min-h-[100px] resize-none"
              />
            </div>
          </section>

          {/* Payment Method */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-tan/10 flex items-center justify-center text-tan">2</div>
              <h3 className="font-serif text-xl italic text-ink">Payment Method</h3>
            </div>
            <div className="grid gap-4">
              <PaymentOption 
                active 
                icon={CreditCard} 
                title="Credit / Debit Card" 
                subtitle="Visa, Mastercard, Amex" 
              />
              <PaymentOption 
                icon={Smartphone} 
                title="UPI Payment" 
                subtitle="Google Pay, PhonePe, Paytm" 
              />
              <PaymentOption 
                icon={Banknote} 
                title="Cash on Delivery" 
                subtitle="Pay when you receive" 
              />
            </div>
            
            <div className="bg-white/40 backdrop-blur-xl rounded-[32px] p-8 border border-white/60 shadow-sm space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-ink/30 px-1">Card Number</label>
                <input type="text" placeholder="XXXX XXXX XXXX XXXX" className="w-full bg-muted-tan/20 border-none rounded-xl py-4 px-6 text-sm font-bold tracking-widest" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-ink/30 px-1">MM/YY</label>
                  <input type="text" placeholder="12/26" className="w-full bg-muted-tan/20 border-none rounded-xl py-4 px-6 text-sm font-bold tracking-widest" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-ink/30 px-1">CVV</label>
                  <input type="password" placeholder="***" className="w-full bg-muted-tan/20 border-none rounded-xl py-4 px-6 text-sm font-bold tracking-widest" />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <div className="bg-white rounded-[40px] p-8 border border-black/5 shadow-xl space-y-8">
              <h3 className="font-serif text-2xl italic text-ink">Order Summary</h3>
              
              <div className="space-y-6 max-h-[300px] overflow-y-auto no-scrollbar">
                {items.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 bg-muted-tan rounded-xl overflow-hidden shadow-inner">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="text-[11px] font-bold text-ink leading-tight line-clamp-1">{item.name}</h4>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-ink/30 mt-1">Qty: {item.quantity}</p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-[11px] font-black text-ink">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-6 border-t border-black/5">
                <div className="flex justify-between items-center text-xs font-bold text-ink/40 uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest">
                  <span className="text-ink/40">Shipping</span>
                  <span className="text-emerald-500">Free</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold text-ink/40 uppercase tracking-widest">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-black/5">
                  <span className="text-lg font-serif text-ink italic leading-none">Total</span>
                  <span className="text-2xl font-serif italic text-rose-500 leading-none">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={handlePlaceOrder}
                className="w-full bg-rose-500 text-white py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] shadow-2xl hover:bg-rose-600 transition-all active:scale-95 flex items-center justify-center gap-3"
              >
                Place Order
              </button>
              
              <div className="flex items-center justify-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-ink/30">
                <ShieldCheck size={14} className="text-emerald-500" />
                Secure and Encrypted
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PaymentOption({ icon: Icon, title, subtitle, active }: any) {
  return (
    <div className={cn(
      "p-6 rounded-[32px] border transition-all flex items-center gap-6 cursor-pointer",
      active ? "bg-rose-50 border-rose-200" : "bg-white border-black/5 hover:border-tan/20"
    )}>
      <div className={cn(
        "w-12 h-12 rounded-2xl flex items-center justify-center transition-colors",
        active ? "bg-rose-500 text-white" : "bg-muted-tan text-ink/40"
      )}>
        <Icon size={24} />
      </div>
      <div className="flex-1">
        <h4 className="text-[11px] font-black uppercase tracking-widest text-ink">{title}</h4>
        <p className="text-[9px] font-bold text-ink/40 uppercase mt-1">{subtitle}</p>
      </div>
      <div className={cn(
        "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
        active ? "border-rose-500" : "border-black/5"
      )}>
        {active && <div className="w-2.5 h-2.5 bg-rose-500 rounded-full" />}
      </div>
    </div>
  );
}
