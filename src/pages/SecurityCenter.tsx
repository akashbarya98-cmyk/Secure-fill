import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Smartphone, Key, History } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';

export default function SecurityCenter() {
  const { user } = useAuth();

  return (
    <div className="p-8 w-full h-full flex flex-col text-slate-200">
      <header className="mb-8 shrink-0">
        <h1 className="text-2xl font-bold text-white mb-2">Security Center</h1>
        <p className="text-slate-400 text-sm">Manage your identity protection and active connections.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6">
          <div className="w-12 h-12 bg-green-500/10 text-green-400 rounded-xl flex items-center justify-center mb-6 border border-green-500/20">
            <ShieldCheck size={24} />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Security Score</h2>
          <p className="text-slate-400 text-sm mb-6 max-w-sm">Your account security is excellent. Enabling 2FA will maximize the score.</p>
          <div className="text-4xl font-bold text-green-400 font-mono tracking-tighter">95<span className="text-xl text-slate-600">/100</span></div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6">
           <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-6">Security Checklist</h3>
           <div className="space-y-2">
             <div className="flex items-center justify-between p-3 bg-[#050816]/50 rounded-lg border border-[#1E293B]">
               <div className="flex items-center gap-3">
                 <Key className="text-slate-500" size={16} />
                 <div><p className="text-sm font-bold text-white">Password Health</p><span className="text-[10px] uppercase font-bold text-green-400">Strong</span></div>
               </div>
               <button className="text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-blue-400 transition-colors">Change</button>
             </div>
             <div className="flex items-center justify-between p-3 bg-[#050816]/50 rounded-lg border border-[#1E293B]">
               <div className="flex items-center gap-3">
                 <Smartphone className="text-slate-500" size={16} />
                 <div><p className="text-sm font-bold text-white">Two-Factor Auth</p><span className="text-[10px] uppercase font-bold text-slate-500">Not enabled</span></div>
               </div>
               <button className="text-[10px] font-bold uppercase tracking-widest text-blue-500 hover:text-blue-400 transition-colors">Enable</button>
             </div>
             <div className="flex items-center justify-between p-3 bg-[#050816]/50 rounded-lg border border-[#1E293B]">
               <div className="flex items-center gap-3">
                 <History className="text-slate-500" size={16} />
                 <div><p className="text-sm font-bold text-white">Verification History</p><span className="text-[10px] uppercase font-bold tracking-tight text-green-400">No suspicious logins</span></div>
               </div>
               <button className="text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-blue-400 transition-colors">Review Logs</button>
             </div>
           </div>
        </motion.div>
      </div>
    </div>
  );
}
