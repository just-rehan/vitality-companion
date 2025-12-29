
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Chatbot from './components/Chatbot';
import MedicationManager from './components/MedicationManager';
import VitalsTracker from './components/VitalsTracker';
import AllergyManager from './components/AllergyManager';
import ReportGenerator from './components/ReportGenerator';
import SOSButton from './components/SOSButton';
import AnimatedHelix from './components/AnimatedHelix';
import LandingPage from './components/LandingPage';
import { ViewType, Medication, VitalRecord, Allergy, SOSEvent } from './types';
import { Bell, CloudCheck, CheckCircle, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType | 'home'>('home');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const getInitialState = <T,>(key: string, defaultValue: T): T => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : defaultValue;
    } catch (e) {
      return defaultValue;
    }
  };

  const [medications, setMedications] = useState<Medication[]>(() => 
    getInitialState('vp_meds', [
      { id: '1', name: 'Metformin', dosage: '500mg', time: '08:00', reminderSent: false, purpose: 'Blood sugar control' },
      { id: '2', name: 'Lisinopril', dosage: '10mg', time: '20:00', reminderSent: false, purpose: 'Blood pressure' }
    ])
  );

  const [vitals, setVitals] = useState<VitalRecord[]>(() => 
    getInitialState('vp_vitals', [
      { date: '2024-05-01', bp: 120, weight: 70, sugar: 90, pulse: 72 },
      { date: '2024-05-02', bp: 125, weight: 71, sugar: 95, pulse: 75 },
    ])
  );

  const [allergies, setAllergies] = useState<Allergy[]>(() => 
    getInitialState('vp_allergies', [
      { id: '1', type: 'Medicine', name: 'Penicillin', severity: 'High' }
    ])
  );

  const [sosHistory, setSosHistory] = useState<SOSEvent[]>(() => 
    getInitialState('vp_sos_history', [])
  );

  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => localStorage.setItem('vp_meds', JSON.stringify(medications)), [medications]);
  useEffect(() => localStorage.setItem('vp_vitals', JSON.stringify(vitals)), [vitals]);
  useEffect(() => localStorage.setItem('vp_allergies', JSON.stringify(allergies)), [allergies]);
  useEffect(() => localStorage.setItem('vp_sos_history', JSON.stringify(sosHistory)), [sosHistory]);

  useEffect(() => {
    const checkAlarms = setInterval(() => {
      const now = new Date();
      const currentTimeStr = now.toTimeString().slice(0, 5);
      medications.forEach(med => {
        if (med.time === currentTimeStr && !med.reminderSent) {
          setNotification(`Time for ${med.name}!`);
          new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3').play().catch(() => {});
          setMedications(prev => prev.map(m => m.id === med.id ? { ...m, reminderSent: true } : m));
        }
      });
      if (currentTimeStr === "00:00") setMedications(prev => prev.map(m => ({ ...m, reminderSent: false })));
    }, 15000);
    return () => clearInterval(checkAlarms);
  }, [medications]);

  const showFeedback = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const onSOSDispatched = (event: SOSEvent) => {
    setSosHistory(prev => [event, ...prev]);
    showFeedback("SOS Alert logged.");
  };

  if (activeView === 'home') {
    return <LandingPage onStart={() => setActiveView('dashboard')} />;
  }

  const renderView = () => {
    switch (activeView) {
      case 'dashboard': return <Dashboard vitals={vitals} meds={medications} allergies={allergies} sosHistory={sosHistory} onNavigate={setActiveView as any} />;
      case 'chatbot': return <Chatbot />;
      case 'medications': return <MedicationManager meds={medications} setMeds={setMedications} onSaved={() => showFeedback("Medication added")} />;
      case 'vitals': return <VitalsTracker records={vitals} setRecords={setVitals} onSaved={() => showFeedback("Vitals recorded")} />;
      case 'allergies': return <AllergyManager allergies={allergies} setAllergies={setAllergies} onSaved={() => showFeedback("Allergy updated")} />;
      case 'reports': return <ReportGenerator vitals={vitals} meds={medications} allergies={allergies} />;
      default: return <Dashboard vitals={vitals} meds={medications} allergies={allergies} sosHistory={sosHistory} onNavigate={setActiveView as any} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] relative overflow-x-hidden flex w-full font-sans text-slate-50">
      <AnimatedHelix />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.05)_0%,transparent_70%)] pointer-events-none"></div>
      
      <Sidebar activeView={activeView as any} setActiveView={setActiveView as any} />
      
      <main className="flex-1 lg:ml-64 p-4 md:p-8 pt-20 lg:pt-8 transition-all relative z-10">
        <div className="fixed top-4 right-4 z-[300] flex flex-col gap-3 pointer-events-none">
          <AnimatePresence>
            {notification && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-cyan-500 text-black px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce pointer-events-auto">
                <Bell className="w-6 h-6" />
                <div>
                  <p className="font-bold text-sm">Medication Alert</p>
                  <p className="text-xs">{notification}</p>
                </div>
                <button onClick={() => setNotification(null)} className="ml-4 font-bold">✕</button>
              </motion.div>
            )}
            {successMessage && (
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-emerald-500 text-black px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 pointer-events-auto">
                <CheckCircle className="w-5 h-5" />
                <p className="font-bold text-sm">{successMessage}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="max-w-6xl mx-auto pb-20">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10 gap-6">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-white capitalize">{activeView === 'chatbot' ? 'AI Health Assistant' : activeView}</h1>
              <div className="flex items-center gap-2 text-cyan-400 mt-2">
                <CloudCheck className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Secure Cloud Sync Active</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => setActiveView('home')} className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-xs font-bold text-slate-400">
                <Zap className="w-3.5 h-3.5" /> Landing
              </button>
              <SOSButton allergies={allergies} userName="John Doe" onSOSDispatched={onSOSDispatched} />
            </div>
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div key={activeView} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default App;