import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShieldCheck, Sparkles, FileText, Bot } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#050816] text-slate-200 overflow-hidden relative font-sans flex flex-col">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />

      <header className="container mx-auto px-6 py-6 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]">
            SF
          </div>
          <span className="font-bold text-xl tracking-tight text-white">SECUREFILL AI</span>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/login" className="text-slate-400 hover:text-white transition-colors text-sm font-bold tracking-wide uppercase">Log in</Link>
          <Link to="/signup" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-all shadow-lg shadow-blue-900/40 border border-blue-500/50 text-sm tracking-wide">
            Get Started
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 pt-20 pb-32 text-center relative z-10 flex-1 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-600/10 mb-8 text-[11px] text-blue-400 font-bold uppercase tracking-widest shadow-sm">
            <Sparkles size={12} className="text-blue-500" />
            Introducing next-gen identity verification
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-tight text-white">
            Your Identity. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              Understood by AI.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
            Store, retrieve, and automatically autofill complex forms with your personal documents. An intelligent vault powered by AI.
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <Link to="/signup" className="px-8 py-3.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition-all shadow-[0_0_25px_rgba(59,130,246,0.5)] border border-blue-500/50">
              Create your Vault
            </Link>
            <a href="#features" className="px-8 py-3.5 bg-[#0F172A] border border-[#1E293B] text-slate-300 font-bold rounded-xl hover:bg-slate-800 transition-all shadow-sm">
              View Tour
            </a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-28 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left" id="features"
        >
          <div className="p-6 rounded-2xl bg-[#0F172A] border border-[#1E293B] shadow-lg">
            <div className="w-10 h-10 bg-blue-500/10 text-blue-400 rounded-lg flex items-center justify-center mb-5 border border-blue-500/20">
              <ShieldCheck size={20} />
            </div>
            <h3 className="text-lg font-bold mb-2 text-white">Military-Grade Security</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Your documents are encrypted and only accessible to you. You maintain full control over who sees your data.</p>
          </div>
          
          <div className="p-6 rounded-2xl bg-[#0F172A] border border-[#1E293B] shadow-lg">
            <div className="w-10 h-10 bg-indigo-500/10 text-indigo-400 rounded-lg flex items-center justify-center mb-5 border border-indigo-500/20">
              <FileText size={20} />
            </div>
            <h3 className="text-lg font-bold mb-2 text-white">Smart OCR Data</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Upload Aadhaar, PAN, and marksheets. Our AI engine instantly extracts perfectly structured metadata.</p>
          </div>
          
          <div className="p-6 rounded-2xl bg-[#0F172A] border border-[#1E293B] shadow-lg">
            <div className="w-10 h-10 bg-green-500/10 text-green-400 rounded-lg flex items-center justify-center mb-5 border border-green-500/20">
              <Bot size={20} />
            </div>
            <h3 className="text-lg font-bold mb-2 text-white">Magic Autofill</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Match extracted data directly into complex government or job application forms with one click securely.</p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
