import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User, Eye, EyeOff, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      navigate("/home");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center p-8 relative overflow-hidden">
      <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-soft-tan rounded-full blur-[100px] opacity-40" />
      <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-rose-100 rounded-full blur-[100px] opacity-40" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/40 backdrop-blur-xl rounded-[40px] p-10 border border-white/60 shadow-2xl relative z-10 space-y-10"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-rose-500 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-rose-200">
            <Sparkles size={32} />
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-serif italic text-ink">Create <span className="not-italic font-light text-rose-500">Account</span></h2>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-ink/30">Start your skin journey with Glow Sense AI</p>
          </div>
        </div>

        <form onSubmit={handleSignUp} className="space-y-6">
          {error && <p className="text-red-500 text-xs text-center font-bold uppercase tracking-widest">{error}</p>}
          <div className="space-y-4">
            <div className="relative group">
              <User size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-ink/20 group-focus-within:text-rose-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Full Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white border border-black/5 rounded-2xl py-4 pl-14 pr-6 text-sm font-medium focus:ring-2 focus:ring-rose-500/20 shadow-sm transition-all outline-none"
              />
            </div>
            <div className="relative group">
              <Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-ink/20 group-focus-within:text-rose-500 transition-colors" />
              <input 
                type="email" 
                placeholder="Email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-black/5 rounded-2xl py-4 pl-14 pr-6 text-sm font-medium focus:ring-2 focus:ring-rose-500/20 shadow-sm transition-all outline-none"
              />
            </div>
            <div className="relative group">
              <Lock size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-ink/20 group-focus-within:text-rose-500 transition-colors" />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-black/5 rounded-2xl py-4 pl-14 pr-14 text-sm font-medium focus:ring-2 focus:ring-rose-500/20 shadow-sm transition-all outline-none"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-ink/20 hover:text-ink/40 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-rose-500 text-white py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] shadow-2xl hover:bg-rose-600 transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          <p className="text-center text-[10px] font-bold uppercase tracking-widest text-ink/30">
            Already have an account? <button type="button" onClick={() => navigate("/signin")} className="text-rose-500 hover:underline">Sign In</button>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
