import React, { useState } from "react";
import { MessageSquare, X, Send, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/src/lib/utils";

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      role: 'ai', 
      content: "Hi there! 👋 I'm your Glow Sense AI assistant. I can help you with product recommendations, skincare advice, order tracking, and more! How can I help you today?" 
    }
  ]);
  const [input, setInput] = useState("");

  const quickActions = [
    "Best for oily skin",
    "Anti-aging routine",
    "Track my order",
    "Acne solutions"
  ];

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', content: input }]);
    setInput("");
    
    // Simple mock response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        content: "That's a great question! Based on your concern, I'd recommend looking at our 'Luminance' collection. Would you like me to show you those products?" 
      }]);
    }, 1000);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-rose-500 text-white rounded-full flex items-center justify-center shadow-2xl z-50 hover:bg-rose-600 transition-all active:scale-95"
      >
        <MessageSquare size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-[380px] h-[600px] bg-white rounded-[2rem] shadow-2xl z-50 flex flex-col overflow-hidden border border-black/5"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-rose-500 to-rose-400 p-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Glow Sense AI</h3>
                  <p className="text-[10px] text-white/70 font-medium">Skincare Assistant</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
              {messages.map((msg, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "flex flex-col max-w-[85%] space-y-1",
                    msg.role === 'user' ? "ml-auto items-end" : "mr-auto items-start"
                  )}
                >
                  <div className={cn(
                    "p-4 rounded-2xl text-xs font-medium leading-relaxed shadow-sm",
                    msg.role === 'user' 
                      ? "bg-rose-500 text-white rounded-tr-none" 
                      : "bg-rose-50 text-rose-900 rounded-tl-none border border-rose-100"
                  )}>
                    {msg.content}
                  </div>
                  <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest px-1">
                    04:20 pm
                  </span>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="px-6 pb-2">
              <div className="flex flex-wrap gap-2">
                {quickActions.map(action => (
                  <button 
                    key={action}
                    className="px-3 py-2 bg-rose-50 text-rose-600 rounded-full text-[10px] font-bold border border-rose-100 hover:bg-rose-100 transition-colors"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-6 border-t border-black/5 bg-gray-50/50">
              <div className="relative">
                <input 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  type="text" 
                  placeholder="Ask about skincare..."
                  className="w-full bg-white border border-black/5 rounded-2xl py-4 pl-4 pr-16 focus:outline-none focus:ring-2 focus:ring-rose-500/20 text-xs font-medium shadow-sm transition-all"
                />
                <button 
                  onClick={handleSend}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-rose-500 text-white rounded-xl shadow-lg shadow-rose-200 hover:bg-rose-600 active:scale-95 transition-all"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
