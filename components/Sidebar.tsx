
import React, { useState } from 'react';
import { LayoutDashboard, MessageCircle, Pill, Activity, ShieldAlert, FileText, Menu, X, HeartPulse, ChevronRight } from 'lucide-react';
import { ViewType } from '../types';

interface SidebarProps {
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'chatbot', icon: MessageCircle, label: 'Health AI Chat' },
    { id: 'medications', icon: Pill, label: 'Medications' },
    { id: 'vitals', icon: Activity, label: 'Vital Signs' },
    { id: 'allergies', icon: ShieldAlert, label: 'Allergies' },
    { id: 'reports', icon: FileText, label: 'Health Reports' },
  ];

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-[100] p-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20"
      >
        {isOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
      </button>

      <aside className={`
        fixed inset-y-0 left-0 z-[90] w-64 bg-black/40 backdrop-blur-2xl border-r border-white/10 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          <div className="p-8">
            <div className="flex items-center gap-3 text-cyan-400 mb-12">
              <div className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center text-black shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                <HeartPulse className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">HealthAI</span>
            </div>

            <nav className="space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveView(item.id as ViewType);
                    setIsOpen(false);
                  }}
                  className={`w-full group flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-200 ${
                    activeView === item.id 
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={`w-5 h-5 ${activeView === item.id ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                    {item.label}
                  </div>
                  {activeView === item.id && <ChevronRight className="w-4 h-4" />}
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-auto p-6 border-t border-white/5 bg-black/20">
            <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-2xl">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">JD</div>
              <div>
                <p className="text-xs font-bold text-white">John Doe</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Premium AI</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;