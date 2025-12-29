
import React, { useState } from 'react';
import { ShieldAlert, Send, MapPin, Loader2, X } from 'lucide-react';
import { Allergy, SOSEvent } from '../types';

interface Props {
  allergies: Allergy[];
  userName: string;
  onSOSDispatched: (event: SOSEvent) => void;
}

const SOSButton: React.FC<Props> = ({ allergies, userName, onSOSDispatched }) => {
  const [isLocating, setIsLocating] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSOS = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const mapLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
          const allergyText = allergies.length > 0 ? allergies.map(a => `${a.name} (${a.severity})`).join(', ') : 'None';
          const message = `🚨 EMERGENCY ALERT 🚨\nUser: ${userName}\nI need immediate assistance!\n\nLocation: ${mapLink}\n\nCritical Medical Info:\nAllergies: ${allergyText}\n\nSent via HealthAI.`;
          const newEvent: SOSEvent = { id: Date.now().toString(), timestamp: new Date().toISOString(), location: { lat: latitude, lng: longitude }, status: 'Dispatched' };
          onSOSDispatched(newEvent);
          window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
          setIsLocating(false);
          setShowConfirm(false);
        },
        () => {
          setIsLocating(false);
          alert("Location access denied.");
        }
      );
    }
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setShowConfirm(true)}
        className="flex items-center gap-3 bg-rose-600 text-white px-8 py-3 rounded-2xl font-bold shadow-[0_0_20px_rgba(225,29,72,0.4)] hover:bg-rose-500 transition-all hover:scale-105 active:scale-95 group"
      >
        <ShieldAlert className="w-6 h-6 group-hover:animate-pulse" />
        <span className="hidden md:inline uppercase tracking-widest text-sm">Emergency SOS</span>
        <span className="md:hidden">SOS</span>
      </button>

      {showConfirm && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-slate-900 border border-rose-500/30 rounded-[3rem] p-10 max-w-md w-full shadow-[0_0_100px_rgba(225,29,72,0.1)] relative">
            <button onClick={() => setShowConfirm(false)} className="absolute top-6 right-6 p-2 text-slate-500 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
            <div className="w-24 h-24 bg-rose-500/10 text-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-[0_0_40px_rgba(225,29,72,0.2)] border border-rose-500/20">
              <ShieldAlert className="w-12 h-12 animate-pulse" />
            </div>
            <h3 className="text-3xl font-bold text-center text-white mb-4">Send SOS?</h3>
            <p className="text-center text-slate-400 text-sm mb-12 leading-relaxed">
              This will fetch your live GPS location and send an immediate alert with your medical data to all emergency contacts.
            </p>
            <div className="space-y-4">
              <button 
                onClick={handleSOS}
                disabled={isLocating}
                className="w-full bg-rose-600 text-white py-5 rounded-[1.5rem] font-bold text-lg flex items-center justify-center gap-3 hover:bg-rose-500 transition-all shadow-[0_0_30px_rgba(225,29,72,0.3)] disabled:opacity-50"
              >
                {isLocating ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Locating...
                  </>
                ) : (
                  <>
                    <Send className="w-6 h-6" /> Confirm SOS Alert
                  </>
                )}
              </button>
              <button 
                onClick={() => setShowConfirm(false)}
                className="w-full bg-white/5 text-slate-400 py-5 rounded-[1.5rem] font-bold hover:bg-white/10 transition-all"
              >
                Cancel Request
              </button>
            </div>
            <p className="text-[10px] text-center text-slate-600 uppercase tracking-widest mt-8 font-bold">
              Only for real medical emergencies
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SOSButton;