
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// Added MessageCircle and FileText to imports from lucide-react
import { Activity, Pill, ShieldAlert, Heart, Thermometer, Droplets, History, MapPin, ChevronRight, TrendingUp, TrendingDown, Bell, MessageCircle, FileText } from 'lucide-react';
import { VitalRecord, Medication, Allergy, ViewType, SOSEvent } from '../types';
import { GlowingEffect } from './ui/glowing-effect';
import { motion } from 'motion/react';
import { Card } from './ui/card';

interface DashboardProps {
  vitals: VitalRecord[];
  meds: Medication[];
  allergies: Allergy[];
  sosHistory: SOSEvent[];
  onNavigate: (view: ViewType) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ vitals, meds, allergies, sosHistory, onNavigate }) => {
  const latestVitals = vitals[vitals.length - 1];

  const vitalsGrid = [
    { label: 'Blood Pressure', value: latestVitals?.bp || '0/0', unit: 'mmHg', icon: Activity, trend: 'stable', color: 'text-cyan-400' },
    { label: 'Heart Rate', value: latestVitals?.pulse || '0', unit: 'bpm', icon: Heart, trend: 'up', color: 'text-emerald-400' },
    { label: 'Blood Sugar', value: latestVitals?.sugar || '0', unit: 'mg/dL', icon: Droplets, trend: 'down', color: 'text-orange-400' },
    { label: 'Weight', value: latestVitals?.weight || '0', unit: 'kg', icon: Thermometer, trend: 'stable', color: 'text-blue-400' },
  ];

  return (
    <div className="space-y-8 pb-10">
      <section>
        <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
          <Activity className="w-5 h-5 text-cyan-400" /> Today's Vitals
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {vitalsGrid.map((v, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="relative group p-6 bg-black/40 backdrop-blur-md rounded-3xl border border-white/5 hover:border-white/20 transition-all cursor-default overflow-hidden"
            >
              <div className="relative z-10 flex justify-between items-start mb-6">
                <div className={`p-3 bg-white/5 rounded-2xl ${v.color}`}>
                  <v.icon className="w-6 h-6" />
                </div>
                {v.trend === 'up' && <TrendingUp className="w-4 h-4 text-emerald-500" />}
                {v.trend === 'down' && <TrendingDown className="w-4 h-4 text-orange-500" />}
                {v.trend === 'stable' && <div className="w-4 h-0.5 bg-slate-600 rounded-full mt-2"></div>}
              </div>
              <div className="relative z-10">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold tracking-tight text-white">{v.value}</span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">{v.unit}</span>
                </div>
                <p className="text-xs font-semibold text-slate-400 mt-2">{v.label}</p>
              </div>
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <v.icon className="w-24 h-24 rotate-12" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <section>
            <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ActionCard 
                icon={<MessageCircle className="w-6 h-6 text-cyan-400" />} 
                title="AI Chat" 
                desc="Talk to your health assistant" 
                onClick={() => onNavigate('chatbot')}
              />
              <ActionCard 
                icon={<Pill className="w-6 h-6 text-emerald-400" />} 
                title="Medicine Reminder" 
                desc="Manage your medications" 
                onClick={() => onNavigate('medications')}
              />
              <ActionCard 
                icon={<AlertTriangleIcon className="w-6 h-6 text-rose-400" />} 
                title="Emergency SOS" 
                desc="Quick emergency alert" 
                onClick={() => onNavigate('dashboard')} // Usually stays or goes to emergency settings
                danger
              />
              <ActionCard 
                icon={<FileText className="w-6 h-6 text-blue-400" />} 
                title="Health Reports" 
                desc="View & export reports" 
                onClick={() => onNavigate('reports')}
              />
            </div>
          </section>

          <section>
            <Card className="p-8 relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-10">
                  <h3 className="font-bold text-lg">Health Trend</h3>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 text-[10px] font-bold rounded-full uppercase">Weekly</span>
                  </div>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={vitals}>
                      <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                      <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 10}} />
                      <YAxis hide domain={['auto', 'auto']} />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '16px', color: '#f8fafc' }} />
                      <Area type="monotone" dataKey="bp" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#chartGradient)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>
          </section>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Upcoming Meds</h2>
              <button onClick={() => onNavigate('medications')} className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest hover:underline">View All</button>
            </div>
            <div className="space-y-4">
              {meds.slice(0, 3).map(med => (
                <div key={med.id} className="p-5 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-between group hover:border-cyan-500/30 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-cyan-500/10 rounded-2xl">
                      <Pill className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{med.name}</h4>
                      <p className="text-[10px] font-bold text-slate-500 uppercase mt-0.5">{med.time} AM</p>
                    </div>
                  </div>
                  <Bell className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                </div>
              ))}
            </div>
          </section>

          <section>
             <Card className="p-8 bg-gradient-to-br from-cyan-900/20 to-black/40 border-cyan-500/20">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-10 text-center">Overall Health Score</h3>
                <div className="relative w-40 h-40 mx-auto mb-8">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#1e293b" strokeWidth="8" />
                    <circle 
                      cx="50" cy="50" r="45" fill="none" stroke="#06b6d4" strokeWidth="8" 
                      strokeDasharray="283" strokeDashoffset="42" strokeLinecap="round" 
                      className="drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-white">85</span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase">/ 100</span>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-emerald-400 font-bold text-sm">Great! Keep it up 🚀</p>
                </div>
             </Card>
          </section>
        </div>
      </div>
    </div>
  );
};

const ActionCard = ({ icon, title, desc, onClick, danger }: any) => (
  <button 
    onClick={onClick}
    className={`flex items-center justify-between p-6 rounded-3xl border transition-all text-left group ${
      danger 
        ? 'bg-rose-500/5 border-rose-500/20 hover:border-rose-500/50' 
        : 'bg-white/5 border-white/10 hover:border-cyan-500/50'
    }`}
  >
    <div className="flex gap-4">
      <div className={`p-3 rounded-2xl ${danger ? 'bg-rose-500/10' : 'bg-white/5'}`}>{icon}</div>
      <div>
        <h4 className={`text-sm font-bold ${danger ? 'text-rose-400' : 'text-white'}`}>{title}</h4>
        <p className="text-[10px] font-medium text-slate-500 mt-1">{desc}</p>
      </div>
    </div>
    <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${danger ? 'text-rose-900' : 'text-slate-700'}`} />
  </button>
);

const AlertTriangleIcon = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
);

export default Dashboard;
