import React from 'react';
import { useAuth } from '../lib/AuthContext';
import { User as UserIcon, Mail } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="p-8 w-full h-full flex flex-col text-slate-200">
      <header className="mb-8 shrink-0">
        <h1 className="text-2xl font-bold text-white mb-2">Profile</h1>
        <p className="text-slate-400 text-sm">Your identity overview.</p>
      </header>

      <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-8 max-w-2xl flex flex-col items-center sm:flex-row gap-8 shadow-sm">
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center border-2 border-[#1E293B] shadow-lg">
          <UserIcon size={40} className="text-white opacity-80" />
        </div>
        <div className="space-y-4 flex-1 text-center sm:text-left">
          <div>
             <h2 className="text-2xl font-bold text-white">{user?.name}</h2>
             <div className="flex sm:justify-start justify-center mt-2">
               <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-blue-600/10 text-blue-400 text-xs font-bold border border-blue-600/20 tracking-wide">
                 PRO ACCOUNT
               </span>
               <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-green-500/10 text-green-400 text-xs font-bold border border-green-500/20 tracking-wide ml-2">
                 Score: {user?.identityScore}
               </span>
             </div>
          </div>
          
          <div className="flex items-center sm:justify-start justify-center gap-3 text-slate-400 text-sm pt-2">
            <Mail size={16} />
            <span className="font-mono">{user?.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
