
import React, { useState } from 'react';
import { Plus, Trash2, ShieldAlert } from 'lucide-react';
import { Allergy } from '../types';
import { GlowingEffect } from './ui/glowing-effect';

interface Props {
  allergies: Allergy[];
  setAllergies: React.Dispatch<React.SetStateAction<Allergy[]>>;
  onSaved: () => void;
}

const AllergyManager: React.FC<Props> = ({ allergies, setAllergies, onSaved }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState<Allergy['type']>('Food');
  const [severity, setSeverity] = useState<Allergy['severity']>('Low');

  const addAllergy = () => {
    if (!name) return;
    setAllergies(prev => [...prev, { id: Date.now().toString(), name, type, severity }]);
    setName('');
    onSaved();
  };

  const removeAllergy = (id: string) => {
    setAllergies(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative group overflow-hidden">
        <GlowingEffect
          spread={40}
          glow={true}
          borderWidth={2}
        />
        <div className="relative z-10">
          <h3 className="font-bold text-lg text-slate-800 mb-6">Record Allergy</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Allergy Type</label>
              <select 
                value={type} 
                onChange={e => setType(e.target.value as Allergy['type'])}
                className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-blue-500"
              >
                <option>Food</option>
                <option>Medicine</option>
                <option>Environment</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Trigger Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 placeholder:text-slate-400"
                placeholder="e.g., Peanuts, Penicillin"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Severity</label>
              <select 
                value={severity} 
                onChange={e => setSeverity(e.target.value as Allergy['severity'])}
                className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-blue-500"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
          </div>
          <button 
            onClick={addAllergy}
            className="mt-6 w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" /> Add Allergy
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {allergies.map(a => (
          <div key={a.id} className={`relative group p-5 rounded-2xl border flex justify-between items-start transition-all overflow-hidden ${
            a.severity === 'High' ? 'bg-rose-50 border-rose-100' : 'bg-white border-slate-100'
          }`}>
            <GlowingEffect
              spread={40}
              glow={true}
              borderWidth={2}
            />
            <div className="relative z-10 flex gap-4">
              <div className={`p-2 rounded-xl ${
                a.severity === 'High' ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-600'
              }`}>
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">{a.type}</p>
                <h4 className="font-bold text-slate-900">{a.name}</h4>
                <p className={`text-xs font-semibold mt-1 ${
                  a.severity === 'High' ? 'text-rose-600' : a.severity === 'Medium' ? 'text-amber-600' : 'text-emerald-600'
                }`}>
                  {a.severity} Severity
                </p>
              </div>
            </div>
            <button onClick={() => removeAllergy(a.id)} className="relative z-10 text-slate-400 hover:text-rose-600">
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllergyManager;
