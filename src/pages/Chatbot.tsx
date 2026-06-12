import React, { useState, useRef, useEffect } from 'react';
import { useAuth, callApi } from '../lib/AuthContext';
import { motion } from 'motion/react';
import { ChatMessage } from '../types';
import { Bot } from 'lucide-react';

export default function Chatbot() {
  const { token, user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); };
  useEffect(() => { scrollToBottom(); }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(), userId: 'temp', role: 'user', text: input, timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const data = await callApi('/api/chat', 'POST', { message: userMsg.text }, token);
      const botMsg: ChatMessage = {
        id: Math.random().toString(), userId: 'temp', role: 'model', text: data.reply, timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: Math.random().toString(), userId: 'temp', role: 'model', text: 'Error interacting with AI.', timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally { setLoading(false); }
  };

  return (
    <div className="p-8 w-full h-full flex flex-col text-slate-200">
      <header className="mb-6 shrink-0">
        <h1 className="text-2xl font-bold text-white mb-2">AI Assistant</h1>
        <p className="text-slate-400 text-sm">Ask questions to extract info from your secure documents.</p>
      </header>

      <div className="flex-1 bg-[#0F172A] border border-[#1E293B] rounded-2xl flex flex-col shadow-[0_10px_40px_rgba(0,0,0,0.2)] overflow-hidden relative">
        <div className="p-4 border-b border-[#1E293B] flex items-center gap-3 shrink-0 bg-[#050816]/50">
          <div className="h-2.5 w-2.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-300">SecureChat Engine</h3>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-2xl flex items-center justify-center mb-6">
                <Bot size={32} />
              </div>
              <p className="text-slate-400 text-sm max-w-sm">Try asking: "What's my Aadhaar number?" or "What scholarships am I eligible for?"</p>
            </div>
          )}

          {messages.map((msg) => (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center font-bold text-white text-xs ${msg.role === 'user' ? 'bg-gradient-to-tr from-blue-500 to-indigo-600 border border-[#1E293B]' : 'bg-[#1E293B] border border-slate-700'}`}>
                {msg.role === 'user' ? (user?.name?.[0] || 'U') : 'AI'}
              </div>
              <div className={`p-4 rounded-xl text-sm leading-relaxed max-w-[85%] ${msg.role === 'user' ? 'bg-blue-600 border border-blue-500/50 text-white rounded-tr-sm shadow-md' : 'bg-slate-800/40 border border-[#1E293B] text-slate-300 rounded-tl-sm shadow-sm'}`}>
                <p className="whitespace-pre-wrap">{msg.text}</p>
              </div>
            </motion.div>
          ))}
          {loading && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
                <div className="w-8 h-8 rounded-lg shrink-0 flex flex-col items-center justify-center bg-[#1E293B] border border-slate-700 font-bold text-white text-xs hidden sm:flex">AI</div>
                <div className="p-4 rounded-xl max-w-[85%] bg-slate-800/40 border border-[#1E293B] rounded-tl-sm flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-slate-500 animate-bounce delay-75"></div>
                  <div className="h-1.5 w-1.5 rounded-full bg-slate-500 animate-bounce delay-150"></div>
                  <div className="h-1.5 w-1.5 rounded-full bg-slate-500 animate-bounce delay-300"></div>
                </div>
             </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 bg-[#050816]/50 border-t border-[#1E293B] shrink-0">
          <form onSubmit={handleSend} className="bg-[#050816] border border-[#1E293B] rounded-xl flex items-center px-4 py-2 hover:border-slate-700 focus-within:border-blue-500/50 transition-colors shadow-inner">
            <input 
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask anything about your identity data..."
              className="bg-transparent border-none outline-none text-sm w-full text-slate-300 py-2.5 focus:ring-0 placeholder-slate-600"
              disabled={loading}
            />
            <button 
              type="submit" 
              disabled={loading || !input.trim()}
              className="text-white bg-blue-600 hover:bg-blue-500 h-8 w-8 rounded-lg flex items-center justify-center font-bold px-2 disabled:opacity-50 transition shadow-lg shrink-0 ml-2 border border-blue-500/50"
            >
              →
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
