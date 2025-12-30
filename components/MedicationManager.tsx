
import React, { useState } from 'react';
import { Plus, Clock, Trash2, HelpCircle, Info, Pill, Loader2, Bell, CheckCircle2 } from 'lucide-react';
import { Medication } from '../types';
import { explainMedication } from '../services/chatService';

interface Props {
  meds: Medication[];
  setMeds: React.Dispatch<React.SetStateAction<Medication[]>>;
  onSaved: () => void;
}

const MedicationManager: React.FC<Props> = ({ meds, setMeds, onSaved }) => {
  const [newName, setNewName] = useState('');
  const [newDosage, setNewDosage] = useState('');
  const [newTime, setNewTime] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [loadingExplanation, setLoadingExplanation] = useState<string | null>(null);

  const addMed = async () => {
    if (!newName || !newDosage || !newTime) return;
    setIsSaving(true);
    const newMed: Medication = { id: Date.now().toString(), name: newName, dosage: newDosage, time: newTime, reminderSent: false };
    setMeds(prev => [...prev, newMed]);
    setNewName(''); setNewDosage(''); setNewTime('');
    setIsSaving(false);
    onSaved();
  };

  const deleteMed = (id: string) => setMeds(prev => prev.filter(m => m.id !== id));

  const handleExplain = async (id: string, name: string) => {
    setLoadingExplanation(id);
    try {
      const explanation = await explainMedication(name);
      setMeds(prev => prev.map(m => m.id === id ? { ...m, purpose: explanation } : m));
    } finally {
      setLoadingExplanation(null);
    }
  };

  const takenCount = meds.filter(m => m.reminderSent).length;

  return (
    <div className="space-y-10 max-w-4xl mx-auto w-full pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <Pill className="w-8 h-8 text-cyan-400" /> Medicine Tracker
          </h2>
          <p className="text-slate-500 text-sm mt-1">Never miss a dose with smart reminders</p>
        </div>
        <button onClick={() => (document.getElementById('add-med-form') as HTMLElement).scrollIntoView({ behavior: 'smooth' })} className="hidden md:flex items-center gap-2 bg-cyan-500 text-black px-6 py-2.5 rounded-2xl font-bold text-sm shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:scale-105 transition-all">
          <Plus className="w-5 h-5" /> Add Medicine
        </button>
      </div>

      <div className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] backdrop-blur-xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest">Today's Progress</h3>
          <span className="text-xs font-bold text-cyan-400">{takenCount}/{meds.length} taken</span>
        </div>
        <div className="h-4 w-full bg-slate-800/50 rounded-full overflow-hidden p-1 border border-white/5">
          <div
            className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
            style={{ width: `${meds.length ? (takenCount / meds.length) * 100 : 0}%` }}
          />
        </div>
      </div>

      <div className="space-y-4">
        {meds.map(med => (
          <div key={med.id} className="group p-6 bg-white/5 border border-white/10 hover:border-cyan-500/50 rounded-[2rem] transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center border transition-all ${med.reminderSent ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' : 'bg-white/5 border-white/10 text-slate-600'
                }`}>
                {med.reminderSent ? <CheckCircle2 className="w-6 h-6" /> : <Pill className="w-6 h-6" />}
              </div>
              <div>
                <h4 className={`text-xl font-bold transition-all ${med.reminderSent ? 'text-slate-500 line-through' : 'text-white'}`}>{med.name}</h4>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">{med.dosage} • Daily</p>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3 text-slate-400">
                <Clock className="w-5 h-5" />
                <span className="text-lg font-bold">{med.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleExplain(med.id, med.name)}
                  className="p-3 bg-white/5 text-slate-400 hover:text-cyan-400 hover:bg-white/10 rounded-2xl transition-all"
                  title="AI Insight"
                >
                  {loadingExplanation === med.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <HelpCircle className="w-5 h-5" />}
                </button>
                <button
                  onClick={() => deleteMed(med.id)}
                  className="p-3 bg-white/5 text-slate-400 hover:text-rose-500 hover:bg-white/10 rounded-2xl transition-all"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div id="add-med-form" className="p-10 bg-gradient-to-br from-black/40 to-cyan-900/10 border border-white/5 rounded-[3rem] backdrop-blur-xl">
        <h3 className="text-2xl font-bold text-white mb-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center border border-cyan-500/20"><Plus className="w-5 h-5 text-cyan-400" /></div>
          Add New Medicine
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormInput label="Medicine Name" placeholder="e.g. Vitamin D3" value={newName} onChange={setNewName} />
          <FormInput label="Dosage / Unit" placeholder="e.g. 1000 IU" value={newDosage} onChange={setNewDosage} />
          <div className="md:col-span-2">
            <FormInput label="Reminder Time" type="time" value={newTime} onChange={setNewTime} />
          </div>
        </div>
        <button
          onClick={addMed}
          disabled={isSaving}
          className="mt-12 w-full bg-cyan-500 text-black py-5 rounded-2xl font-bold text-lg hover:bg-cyan-400 transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(6,182,212,0.2)]"
        >
          {isSaving ? <Loader2 className="w-6 h-6 animate-spin" /> : <CheckCircle2 className="w-6 h-6" />}
          {isSaving ? 'Syncing...' : 'Add Medicine'}
        </button>
      </div>
    </div>
  );
};

const FormInput = ({ label, value, onChange, placeholder, type = 'text' }: any) => (
  <div>
    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-slate-700"
    />
  </div>
);

export default MedicationManager;