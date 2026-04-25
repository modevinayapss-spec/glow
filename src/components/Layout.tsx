import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Calendar, Grid, ShoppingBag, User } from "lucide-react";
import { cn } from "@/src/lib/utils";
import ChatAssistant from "./ChatAssistant";

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const navItems = [
    { label: "Home", path: "/home", icon: Home },
    { label: "Routine", path: "/routine", icon: Calendar },
    { label: "Products", path: "/products", icon: Grid },
    { label: "Cart", path: "/cart", icon: ShoppingBag },
    { label: "Profile", path: "/profile", icon: User },
  ];

  return (
    <div className="min-h-screen pb-24 bg-paper flex flex-col relative overflow-x-hidden">
      {/* Decorative Background */}
      <div className="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] bg-soft-tan rounded-full blur-[100px] -z-0 opacity-60 pointer-events-none" />

      <header className="fixed top-0 left-0 right-0 h-20 bg-paper/60 backdrop-blur-xl border-b border-black/[0.03] z-40 flex items-center justify-between px-8 max-w-lg mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-ink rounded-full flex items-center justify-center">
            <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
          </div>
          <h1 className="font-sans font-bold text-lg text-ink tracking-tighter">DERMA.AI</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 border border-black/5 rounded-full flex items-center justify-center text-ink/40">
            <User size={18} />
          </div>
        </div>
      </header>

      <main className="flex-1 mt-20 px-6 py-8 relative z-10 max-w-lg mx-auto w-full">
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-paper/90 backdrop-blur-md border-t border-black/[0.05] h-20 z-40 max-w-lg mx-auto">
        <ul className="flex items-center justify-between h-full px-8">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex flex-col items-center gap-1.5 transition-all",
                    isActive ? "text-tan scale-110" : "text-ink/30 hover:text-ink/60"
                  )}
                >
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em]">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <ChatAssistant />
    </div>
  );
}
