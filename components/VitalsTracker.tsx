
import React, { useState } from 'react';
import { Activity, Plus, TrendingUp, Loader2 } from 'lucide-react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { VitalRecord } from '../types';
import { GlowingEffect } from './ui/glowing-effect';

interface Props {
  records: VitalRecord[];
  setRecords: React.Dispatch<React.SetStateAction<VitalRecord[]>>;
  onSaved: () => void;
}

const VitalsTracker: React.FC<Props> = ({ records, setRecords, onSaved }) => {
  const [newRecord, setNewRecord] = useState({ bp: '', weight: '', sugar: '', pulse: '' });
  const [isSaving, setIsSaving] = useState(false);

  const addRecord = async () => {
    if (!newRecord.bp || !newRecord.weight) {
      alert("BP and Weight are mandatory for a record.");
      return;
    }

    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    const record: VitalRecord = {
      date: new Date().toISOString().split('T')[0],
      bp: parseInt(newRecord.bp),
      weight: parseFloat(newRecord.weight),
      sugar: parseInt(newRecord.sugar) || 0,
      pulse: parseInt(newRecord.pulse) || 0,
    };

    setRecords(prev => [...prev, record]);
    setNewRecord({ bp: '', weight: '', sugar: '', pulse: '' });
    setIsSaving(false);
    onSaved();
  };

  return (
    <div className="space-y-6">
      <div className="relative group bg-white p-6 rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={2}
        />
        <div className="relative z-10">
          <h3 className="font-bold text-lg text-slate-800 mb-6">Log Vital Signs</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">BP (mmHg)</label>
              <input
                type="number"
                value={newRecord.bp}
                onChange={e => setNewRecord({...newRecord, bp: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 placeholder:text-slate-400"
                placeholder="120"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Weight (kg)</label>
              <input
                type="number"
                value={newRecord.weight}
                onChange={e => setNewRecord({...newRecord, weight: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 placeholder:text-slate-400"
                placeholder="70.5"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Sugar (mg/dL)</label>
              <input
                type="number"
                value={newRecord.sugar}
                onChange={e => setNewRecord({...newRecord, sugar: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 placeholder:text-slate-400"
                placeholder="95"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Pulse (bpm)</label>
              <input
                type="number"
                value={newRecord.pulse}
                onChange={e => setNewRecord({...newRecord, pulse: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 placeholder:text-slate-400"
                placeholder="72"
              />
            </div>
          </div>
          <button 
            onClick={addRecord}
            disabled={isSaving}
            className="mt-6 w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-70 shadow-lg shadow-blue-200"
          >
            {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
            {isSaving ? 'Syncing...' : 'Save Record'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative group bg-white p-6 rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <GlowingEffect
            spread={50}
            glow={true}
            borderWidth={2}
          />
          <div className="relative z-10">
            <h3 className="font-bold text-lg text-slate-800 mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" /> Blood Pressure Trend
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={records}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="date" hide />
                  <YAxis hide domain={['auto', 'auto']} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="bp" stroke="#3b82f6" fill="#eff6ff" strokeWidth={3} fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="relative group bg-white p-6 rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <GlowingEffect
            spread={50}
            glow={true}
            borderWidth={2}
          />
          <div className="relative z-10">
            <h3 className="font-bold text-lg text-slate-800 mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-600" /> Blood Sugar Trend
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={records}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="date" hide />
                  <YAxis hide domain={['auto', 'auto']} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="sugar" stroke="#10b981" fill="#ecfdf5" strokeWidth={3} fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VitalsTracker;
