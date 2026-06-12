import React, { useEffect, useState } from 'react';
import { useAuth, callApi } from '../lib/AuthContext';
import { FileText, Award, Layers } from 'lucide-react';

export default function Dashboard() {
  const { user, token } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      callApi('/api/dashboard', 'GET', null, token)
        .then(setData)
        .finally(() => setLoading(false));
    }
  }, [token]);

  if (loading || !data) return <div className="text-slate-400 p-8">Loading dashboard...</div>;

  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 text-slate-200">
      {/* Left: Core Stats and Vault */}
      <div className="col-span-1 md:col-span-2 space-y-6">
        {/* Hero Card */}
        <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Identity Intelligence</h2>
                <p className="text-slate-400 text-sm max-w-md">SecureFill has analyzed your profile. You are eligible for {data.scholarshipsAvailable} new scholarships based on your validated documents.</p>
              </div>
              <button className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-lg shadow-lg shadow-blue-900/40 transition-all border border-blue-500/50">
                View Insights
              </button>
            </div>
          </div>
          <div className="absolute -right-12 -top-12 h-48 w-48 bg-blue-500/10 rounded-full blur-[60px]"></div>
          <div className="absolute -left-12 -bottom-12 h-48 w-48 bg-indigo-500/10 rounded-full blur-[60px]"></div>
        </div>

        {/* Core Stats overview */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-[#0F172A] border border-[#1E293B] rounded-xl p-4 flex flex-col justify-between hover:border-slate-700 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className="h-8 w-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                 <FileText size={16} />
              </div>
              <span className="text-[10px] uppercase font-bold text-slate-500">Stored</span>
            </div>
            <div>
               <p className="text-2xl font-bold text-white leading-none mb-1">{data.documentsStored}</p>
               <p className="text-xs text-slate-500 font-medium tracking-tight">Valid Documents</p>
            </div>
          </div>
          <div className="bg-[#0F172A] border border-[#1E293B] rounded-xl p-4 flex flex-col justify-between hover:border-slate-700 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className="h-8 w-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
                 <Award size={16} />
              </div>
              <span className="text-[10px] uppercase font-bold text-slate-500">Matches</span>
            </div>
            <div>
               <p className="text-2xl font-bold text-white leading-none mb-1">{data.scholarshipsAvailable}</p>
               <p className="text-xs text-slate-500 font-medium tracking-tight">Scholarships found</p>
            </div>
          </div>
          <div className="bg-[#0F172A] border border-[#1E293B] rounded-xl p-4 flex flex-col justify-between hover:border-slate-700 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                 <Layers size={16} />
              </div>
              <span className="text-[10px] uppercase font-bold text-slate-500">Usage</span>
            </div>
            <div>
               <p className="text-2xl font-bold text-white leading-none mb-1">{data.formsAutofilled}</p>
               <p className="text-xs text-slate-500 font-medium tracking-tight">Forms auto-filled</p>
            </div>
          </div>
        </div>

        {/* Document Grid (Preview) */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Secure Vault</h3>
            <button className="text-blue-400 text-xs font-medium hover:underline">View All Documents</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#0F172A] border border-[#1E293B] p-4 rounded-xl flex items-start gap-4 hover:border-slate-700 transition-colors group cursor-pointer">
              <div className="h-12 w-12 rounded-lg bg-red-500/10 flex items-center justify-center text-xl shrink-0">
               <span role="img" aria-label="ID">🆔</span>
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="flex justify-between items-center gap-2 mb-1">
                  <p className="text-sm font-bold text-white truncate">Aadhaar Card</p>
                  <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded border border-green-500/30 whitespace-nowrap leading-none">Verified</span>
                </div>
                <p className="text-[11px] text-slate-500 font-mono truncate tracking-widest">XXXX XXXX 1234</p>
                <p className="text-[10px] text-slate-600 mt-2">Updated: 12 Oct 2023</p>
              </div>
            </div>
            
            <div className="bg-[#0F172A] border border-[#1E293B] p-4 rounded-xl flex items-start gap-4 hover:border-slate-700 transition-colors cursor-pointer group">
              <div className="h-12 w-12 rounded-lg bg-orange-500/10 flex items-center justify-center text-xl shrink-0">
                <span role="img" aria-label="Card">💳</span>
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="flex justify-between items-center gap-2 mb-1">
                  <p className="text-sm font-bold text-white truncate">PAN Card</p>
                  <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded border border-green-500/30 whitespace-nowrap leading-none">Verified</span>
                </div>
                <p className="text-[11px] text-slate-500 font-mono truncate tracking-widest">ABCDE1234F</p>
                <p className="text-[10px] text-slate-600 mt-2">Updated: 05 Jan 2024</p>
              </div>
            </div>

            <div className="border border-dashed border-slate-700 bg-transparent p-4 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all cursor-pointer h-full min-h-[90px]">
              <span className="text-2xl text-slate-500 mb-[-4px] leading-none">+</span>
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest">Add Document</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Mini AI Assistant & Scholarships */}
      <div className="space-y-6">
        {/* AI Chat Mini */}
        <div className="bg-[#0F172A] border border-blue-500/30 rounded-2xl flex flex-col h-[300px] shadow-[0_10px_40px_rgba(0,0,0,0.4)]">
          <div className="p-4 border-b border-[#1E293B] flex items-center gap-3 shrink-0">
            <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-300">AI Assistant</h3>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-4 flex flex-col">
            <div className="bg-slate-800/50 rounded-lg p-3 text-xs text-slate-300 border border-[#1E293B] self-start max-w-[85%] leading-relaxed">
              Hello {user?.name.split(' ')[0]}! I've indexed your latest documents. Would you like to see scholarships you qualify for?
            </div>
            <div className="bg-blue-600 text-white rounded-lg p-3 text-xs self-end max-w-[85%] ml-auto shadow-md">
              Yes, show me high-match recommendations.
            </div>
          </div>
          <div className="p-3 shrink-0">
            <div className="bg-[#050816] border border-[#1E293B] rounded-xl flex items-center px-3 py-2 cursor-pointer hover:border-slate-700 transition">
              <input type="text" placeholder="Ask about your documents..." className="bg-transparent border-none outline-none text-[11px] w-full text-slate-400 cursor-pointer" readOnly />
              <button className="text-blue-500 font-bold ml-2">→</button>
            </div>
          </div>
        </div>

        {/* Scholarships Sidebar */}
        <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">Recommended</h3>
          <div className="space-y-3">
            <div className="p-3 bg-slate-800/30 rounded-xl border border-[#1E293B] hover:bg-slate-800 transition-colors cursor-pointer">
              <div className="flex justify-between items-start mb-2">
                <p className="text-xs font-bold text-white leading-tight">STEM Merit Scholarship '24</p>
                <span className="text-[10px] font-bold text-blue-400 shrink-0 ml-2">98% Match</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-500 italic">Deadline: 15 Mar</span>
                <span className="h-1 w-1 rounded-full bg-slate-700"></span>
                <span className="text-[10px] text-green-400 font-medium">AI Verified</span>
              </div>
            </div>
            <div className="p-3 bg-slate-800/30 rounded-xl border border-[#1E293B] hover:bg-slate-800 transition-colors cursor-pointer">
              <div className="flex justify-between items-start mb-2">
                <p className="text-xs font-bold text-white leading-tight">Global Tech Leaders Grant</p>
                <span className="text-[10px] font-bold text-blue-400 shrink-0 ml-2">82% Match</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-500 italic">Deadline: 30 Apr</span>
                <span className="h-1 w-1 rounded-full bg-slate-700"></span>
                <span className="text-[10px] text-blue-400 font-medium">Open</span>
              </div>
            </div>
          </div>
          <button className="w-full mt-4 py-2 border border-slate-700 rounded-lg text-xs font-semibold text-slate-400 hover:text-white hover:border-slate-500 transition-all bg-slate-800/20">
            Browse All Schemes
          </button>
        </div>
      </div>
    </div>
  );
}
