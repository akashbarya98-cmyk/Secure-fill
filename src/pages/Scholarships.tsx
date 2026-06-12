import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Scholarship } from '../types';

export default function Scholarships() {
  const [loading, setLoading] = useState(true);

  // Hardcoded for demo purposes
  const DEMO_SCHOLARSHIPS: Scholarship[] = [
    {
      id: '1', name: 'National Merit Scholarship 2024', matchPercentage: 98, deadline: '2024-08-15', 
      eligibilityReason: 'Matched 10th and 12th Marks > 90%', sourceLink: '#'
    },
    {
      id: '2', name: 'State Tech Grant', matchPercentage: 85, deadline: '2024-07-20', 
      eligibilityReason: 'Category match from Aadhaar & domicile', sourceLink: '#'
    },
    {
      id: '3', name: 'Global Tech Leaders Grant', matchPercentage: 82, deadline: '2024-09-01', 
      eligibilityReason: 'Computer Science & Merit matched', sourceLink: '#'
    }
  ];

  useEffect(() => { setTimeout(() => setLoading(false), 500); }, []);

  return (
    <div className="p-8 w-full h-full flex flex-col text-slate-200">
      <header className="mb-8 shrink-0">
        <h1 className="text-2xl font-bold text-white mb-2">Scholarships</h1>
        <p className="text-slate-400 text-sm max-w-xl">AI-recommended grants and scholarships matched accurately via your stored identity data.</p>
      </header>

      {loading ? (
        <div className="text-slate-400 text-sm">Validating matches...</div>
      ) : (
        <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6">
           <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-6">High-Confidence Matches</h3>
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {DEMO_SCHOLARSHIPS.map((scholarship, i) => (
                <motion.div 
                  key={scholarship.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-4 bg-slate-800/30 rounded-xl border border-[#1E293B] hover:bg-[#050816]/40 hover:border-slate-700 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm font-bold text-white leading-tight mb-1 group-hover:text-blue-400 transition-colors">{scholarship.name}</p>
                      <p className="text-xs text-slate-500 font-medium">{scholarship.eligibilityReason}</p>
                    </div>
                    <div className="flex flex-col items-end shrink-0 ml-4">
                       <span className="text-[11px] font-bold text-blue-400 mb-1.5">{scholarship.matchPercentage}% Match</span>
                       <span className="text-[9px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded border border-green-500/30 font-semibold uppercase tracking-widest">AI Verified</span>
                    </div>
                  </div>
                  
                  <div className="mt-2 pt-4 border-t border-[#1E293B]/50 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-slate-500"></div>
                      <span className="text-xs text-slate-400 italic">Deadline: {new Date(scholarship.deadline).toLocaleDateString()}</span>
                    </div>
                    <button className="text-[10px] uppercase font-bold tracking-widest text-[#1E293B] group-hover:text-blue-500 transition-colors bg-transparent border-none p-0">Apply →</button>
                  </div>
                </motion.div>
              ))}
           </div>
        </div>
      )}
    </div>
  );
}
