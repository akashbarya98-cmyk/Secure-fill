import React, { useEffect, useState, useRef } from 'react';
import { useAuth, callApi } from '../lib/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, Clock } from 'lucide-react';
import { StoredDocument } from '../types';

export default function Vault() {
  const { token } = useAuth();
  const [documents, setDocuments] = useState<StoredDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchDocs = async () => {
     try {
       const data = await callApi('/api/documents', 'GET', null, token);
       setDocuments(data);
     } catch (e) {
       console.error(e);
     } finally {
       setLoading(false);
     }
  };

  useEffect(() => {
    if (token) fetchDocs();
  }, [token]);

  const handleUploadClick = () => { fileInputRef.current?.click(); };
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    try {
      await callApi('/api/documents', 'POST', formData, token);
      await fetchDocs();
    } catch (err) {
      alert('Upload failed: ' + err);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div className="p-8 w-full h-full flex flex-col text-slate-200">
      <header className="flex justify-between items-end mb-8 relative z-10 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Identity Vault</h1>
          <p className="text-slate-400 text-sm">Secure storage with smart OCR data extraction.</p>
        </div>
        <button 
          onClick={handleUploadClick}
          disabled={uploading}
          className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-lg shadow-blue-900/40 transition-all flex items-center gap-2 border border-blue-500/50 disabled:opacity-50"
        >
          {uploading ? <Clock className="animate-spin" size={14} /> : <Upload size={14} />}
          {uploading ? 'Analyzing via AI...' : 'Upload Document'}
        </button>
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
          accept="image/*,application/pdf"
        />
      </header>

      {/* Filter/Search */}
      <div className="flex items-center gap-4 bg-[#0F172A] border border-[#1E293B] px-4 py-2.5 rounded-xl w-full max-w-lg mb-8 shrink-0 focus-within:border-blue-500/50 transition-colors">
        <span className="text-slate-500 text-sm">🔍</span>
        <input 
          type="text" 
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Filter documents by name or type..." 
          className="bg-transparent border-none outline-none text-sm w-full text-slate-300 placeholder-slate-600 focus:ring-0" 
        />
      </div>

      {loading ? (
        <div className="text-slate-400 text-sm">Loading your vault...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence>
            {documents.filter(d => d.originalName.toLowerCase().includes(search.toLowerCase()) || d.type.includes(search.toLowerCase())).map((doc) => (
               <motion.div 
                 key={doc.id}
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.95 }}
                 className="bg-[#0F172A] border border-[#1E293B] p-4 rounded-xl flex flex-col gap-4 hover:border-slate-700 transition-colors group cursor-pointer"
               >
                 <div className="flex items-start gap-4 mb-2">
                   <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-lg shrink-0 border border-blue-500/20">
                     <span role="img" aria-label="Doc">📄</span>
                   </div>
                   <div className="flex-1 overflow-hidden">
                     <div className="flex items-center gap-2 mb-1">
                       <p className="text-sm font-bold text-white truncate" title={doc.originalName}>{doc.originalName}</p>
                     </div>
                     <span className="inline-block text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded border border-green-500/30 font-medium">Verified</span>
                   </div>
                 </div>

                 {/* Extracted Data Preview */}
                 <div className="bg-[#050816]/50 border border-[#1E293B] rounded-lg p-3 flex-1 flex flex-col justify-end space-y-1.5 min-h-[70px]">
                    {Object.keys(doc.extractedData).length > 0 ? (
                      Object.entries(doc.extractedData).slice(0, 2).map(([k, v]) => (
                        <div key={k} className="flex justify-between items-center gap-2">
                          <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold truncate">{k.replace(/_/g, ' ')}</span>
                          <span className="text-[11px] text-slate-300 font-mono truncate max-w-[120px]" title={String(v)}>{String(v)}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-[10px] text-slate-600 italic mt-auto">Processing metadata...</p>
                    )}
                 </div>

                 <div className="border-t border-[#1E293B] pt-3 flex justify-between items-center mt-auto">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">{doc.type}</p>
                    <p className="text-[10px] text-slate-600 leading-none">Updated: {new Date(doc.updatedAt).toLocaleDateString()}</p>
                 </div>
               </motion.div>
            ))}

             {/* Upload Card */}
             <motion.div 
               whileHover={{ scale: 1.01 }}
               onClick={handleUploadClick}
               className="border border-dashed border-slate-700 bg-transparent p-4 flex flex-col items-center justify-center gap-2 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all outline-none rounded-xl cursor-pointer min-h-[190px]"
             >
               <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 text-xl font-light mb-2">+</div>
               <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Add Document</p>
             </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
