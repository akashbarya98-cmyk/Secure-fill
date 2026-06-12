import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, callApi } from '../lib/AuthContext';
import { motion } from 'motion/react';
import { Lock, Mail } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await callApi('/api/auth/login', 'POST', { email, password });
      login(data.token, data.user);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#050816] font-sans text-slate-200 overflow-hidden items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-[#0F172A] border border-[#1E293B] rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.5)] relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
        
        <div className="text-center mb-8">
          <div className="h-12 w-12 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(59,130,246,0.5)] mx-auto mb-4 text-xl">
            SF
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-slate-400 text-sm">Log in to your intelligent identity vault</p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-widest font-bold text-slate-500 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full bg-[#050816]/50 border border-[#1E293B] rounded-xl py-2.5 pl-11 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 hover:border-slate-700 transition-colors text-sm"
                placeholder="you@example.com"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs uppercase tracking-widest font-bold text-slate-500 mb-2 mt-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full bg-[#050816]/50 border border-[#1E293B] rounded-xl py-2.5 pl-11 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 hover:border-slate-700 transition-colors text-sm font-mono tracking-widest"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full mt-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-900/40 disabled:opacity-50 text-sm border border-blue-500/50"
          >
            {loading ? 'Logging in...' : 'Access Vault'}
          </button>
        </form>

        <p className="text-center text-xs text-slate-500 mt-8 font-medium">
          Don't have an account? <Link to="/signup" className="text-blue-400 hover:text-blue-300 transition-colors font-bold">Sign up</Link>
        </p>
      </motion.div>
    </div>
  );
}
