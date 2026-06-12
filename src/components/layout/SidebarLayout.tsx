import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../lib/AuthContext';
import { 
  LayoutDashboard, 
  Files, 
  MessageSquare, 
  GraduationCap, 
  ShieldCheck, 
  Settings, 
  User, 
  LogOut,
  Search,
  Bell
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

const NAV_ITEMS = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/documents', label: 'Identity Vault', icon: Files },
  { path: '/chatbot', label: 'AI Assistant', icon: MessageSquare },
  { path: '/scholarships', label: 'Scholarships', icon: GraduationCap },
  { path: '/security', label: 'Security', icon: ShieldCheck },
];

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  const { logout, user } = useAuth();

  return (
    <div className="flex h-screen w-full bg-[#050816] font-sans text-slate-200 overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-[#1E293B] bg-[#050816]/50 flex flex-col pt-2 pb-0 shrink-0">
        <div className="p-6 flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]">SF</div>
          <span className="font-bold tracking-tight text-xl">SECUREFILL AI</span>
        </div>
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto pt-2">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors border border-transparent",
                isActive 
                  ? "bg-blue-600/10 text-blue-400 border-blue-600/20" 
                  : "text-slate-400 hover:bg-slate-800"
              )}
            >
              {({ isActive }) => (
                <>
                  <div className={cn("h-5 w-5 rounded flex items-center justify-center transition-colors shrink-0", isActive ? "bg-blue-400/20" : "bg-slate-700")}>
                    <item.icon size={12} />
                  </div>
                  <span className="text-sm font-medium">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
          
          <div className="my-4 border-t border-[#1E293B] mx-2"></div>
          
          <NavLink
            to="/profile"
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors border border-transparent",
              isActive ? "bg-blue-600/10 text-blue-400 border-blue-600/20" : "text-slate-400 hover:bg-slate-800"
            )}
          >
            {({ isActive }) => (
                <>
                  <div className={cn("h-5 w-5 rounded flex items-center justify-center transition-colors shrink-0", isActive ? "bg-blue-400/20" : "bg-slate-700")}>
                    <User size={12} />
                  </div>
                  <span className="text-sm font-medium">Profile</span>
                </>
              )}
          </NavLink>
          <NavLink
            to="/settings"
             className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors border border-transparent",
              isActive ? "bg-blue-600/10 text-blue-400 border-blue-600/20" : "text-slate-400 hover:bg-slate-800"
            )}
          >
            {({ isActive }) => (
                <>
                  <div className={cn("h-5 w-5 rounded flex items-center justify-center transition-colors shrink-0", isActive ? "bg-blue-400/20" : "bg-slate-700")}>
                    <Settings size={12} />
                  </div>
                  <span className="text-sm font-medium">Settings</span>
                </>
              )}
          </NavLink>
          <button
            onClick={logout}
            className="flex items-center gap-3 px-3 py-2 rounded-lg w-full text-left text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors border border-transparent"
          >
             <div className="h-5 w-5 rounded flex items-center justify-center bg-red-400/10 text-red-400 shrink-0">
               <LogOut size={12} />
             </div>
             <span className="text-sm font-medium">Logout</span>
          </button>
        </nav>
        
        <div className="p-4 mt-auto border-t border-[#1E293B]">
          <div className="bg-[#0F172A] rounded-xl p-4 border border-[#1E293B]">
            <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Identity Score</p>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold text-white">{user?.identityScore || 0}</span>
              <span className="text-green-400 text-xs font-medium mb-1">+12 pts</span>
            </div>
            <div className="w-full h-1 bg-slate-800 rounded-full mt-2 overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${Math.min(user?.identityScore || 0, 100)}%` }}
                 transition={{ duration: 1 }}
                 className="h-full bg-blue-500 rounded-full shadow-[0_0_8px_#3b82f6]"
               />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 shrink-0 border-b border-[#1E293B] flex items-center justify-between px-8 bg-[#050816]/80 backdrop-blur-md z-30">
          <div className="flex items-center gap-3 bg-[#0F172A] border border-[#1E293B] px-3 py-1.5 rounded-full w-96 transform transition-all focus-within:border-blue-500/50 focus-within:w-[420px]">
            <Search className="text-slate-500 w-4 h-4 shrink-0" />
            <input type="text" placeholder="Search your documents or ask AI..." className="bg-transparent border-none outline-none text-sm w-full text-slate-300 placeholder-slate-600 focus:ring-0" />
          </div>
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-slate-800 border border-[#1E293B] flex items-center justify-center text-slate-400 hover:text-white cursor-pointer transition-colors shrink-0">
               <Bell size={14} />
            </div>
            <div className="flex items-center gap-3 pl-4 border-l border-[#1E293B]">
              <div className="text-right">
                <p className="text-xs font-semibold text-white">{user?.name || "User"}</p>
                <p className="text-[10px] text-slate-500 uppercase">Pro Account</p>
              </div>
              <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 border-2 border-[#1E293B] flex items-center justify-center font-bold text-xs text-white shrink-0">
                {user?.name?.[0]?.toUpperCase() || "U"}
              </div>
            </div>
          </div>
        </header>

         {/* Scrollable Content */}
        <div className="flex-1 overflow-x-hidden overflow-y-auto z-10 w-full h-full flex flex-col bg-[#050816]">
          {children}
        </div>

         {/* Status Bar */}
         <footer className="h-10 shrink-0 border-t border-[#1E293B] bg-[#050816] flex items-center justify-between px-8 text-[10px] text-slate-500 uppercase tracking-widest font-medium z-20">
          <div className="flex gap-6 items-center">
            <span className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></div> AES-256 Encrypted</span>
            <span>Server: Mumbai-S1</span>
          </div>
          <div className="flex gap-6">
            <span>Auto-fill: Ready</span>
            <span className="text-blue-500 font-bold">SecureFill AI v2.1.0</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
