
import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Activity, 
  ShieldCheck, 
  MessageCircle, 
  Pill, 
  Activity as VitalIcon, 
  AlertTriangle,
  HeartPulse,
  BrainCircuit,
  Zap,
  Globe
} from 'lucide-react';
import { SplineScene } from './ui/spline';
import { Spotlight } from './ui/spotlight';
import { Card } from './ui/card';

interface Props {
  onStart: () => void;
}

const LandingPage: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="relative min-h-screen w-full bg-[#030712] overflow-x-hidden flex flex-col font-sans text-slate-50 selection:bg-cyan-500/30">
      {/* Background Gradients & Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full"></div>
      </div>

      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

      {/* Header */}
      <header className="relative z-50 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center text-black shadow-[0_0_20px_rgba(6,182,212,0.5)]">
            <HeartPulse className="w-6 h-6" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white">HealthAI</span>
        </div>

        <nav className="hidden lg:flex items-center gap-1 bg-white/5 backdrop-blur-md px-2 py-1.5 rounded-2xl border border-white/10">
          {['Home', 'Dashboard', 'AI Chat', 'Medicines', 'Emergency'].map((item, i) => (
            <button key={i} className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${i === 0 ? 'bg-cyan-500/10 text-cyan-400' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
              {item}
            </button>
          ))}
        </nav>

        <button 
          onClick={onStart}
          className="relative group flex items-center gap-2 bg-cyan-500 text-black px-6 py-2.5 rounded-xl font-bold hover:scale-105 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] overflow-hidden"
        >
          <Zap className="w-4 h-4 fill-current" />
          <span className="text-sm">Get Started</span>
          <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
        </button>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex flex-col px-6 pt-12 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[10px] uppercase font-bold text-cyan-400 tracking-[0.2em] mb-6"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              AI-Powered Healthcare
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="text-6xl md:text-8xl font-bold text-white leading-[1.05] tracking-tight mb-8"
            >
              Your Health, <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Reimagined</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-slate-400 max-w-lg mb-10 leading-relaxed"
            >
              AI-powered health management with real-time vital tracking, smart medicine reminders, and emergency SOS — all in one intelligent platform.
            </motion.p>

            <div className="flex flex-wrap gap-4">
              <button 
                onClick={onStart}
                className="flex items-center gap-3 bg-cyan-500 text-black px-8 py-4 rounded-2xl hover:bg-cyan-400 transition-all group font-bold"
              >
                <Zap className="w-5 h-5 fill-current" />
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-bold hover:bg-white/10 transition-all">
                Learn More
              </button>
            </div>

            <div className="mt-16 grid grid-cols-2 gap-6 max-w-md">
              <QuickFeature icon={<MessageCircle className="w-5 h-5 text-cyan-400" />} title="AI Chatbot" desc="Instant health guidance" />
              <QuickFeature icon={<Pill className="w-5 h-5 text-emerald-400" />} title="Medicine Reminders" desc="Never miss a dose" />
              <QuickFeature icon={<VitalIcon className="w-5 h-5 text-blue-400" />} title="Vital Tracking" desc="Real-time monitoring" />
              <QuickFeature icon={<AlertTriangle className="w-5 h-5 text-rose-400" />} title="Emergency SOS" desc="One-tap alerts" />
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative h-[600px] lg:h-[800px] w-full"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/20 to-transparent blur-[120px] rounded-full"></div>
            <SplineScene 
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full scale-110"
            />
          </motion.div>
        </div>

        {/* Feature Grid Section */}
        <section className="py-32 relative">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[10px] uppercase font-bold text-cyan-400 tracking-[0.2em] mb-4">
              <Globe className="w-3.5 h-3.5" />
              Core Features
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Everything You Need for <br/><span className="text-cyan-400">Complete Health Management</span></h2>
            <p className="text-slate-400 max-w-2xl mx-auto">From daily wellness tracking to emergency situations, our AI-powered platform has you covered.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-8 group hover:border-cyan-500/50 transition-all">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BrainCircuit className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">AI Symptom Checker</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">Describe your symptoms and get AI-powered analysis with risk assessment and guidance.</p>
              <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full w-2/3 bg-cyan-500"></div>
              </div>
            </Card>

            <Card className="p-8 group hover:border-rose-500/50 transition-all">
              <div className="w-12 h-12 bg-rose-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <AlertTriangle className="w-6 h-6 text-rose-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-rose-400">Emergency SOS</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">One-tap emergency alerts sent to your contacts with live GPS location via WhatsApp.</p>
              <button className="text-xs font-bold text-rose-400 uppercase tracking-widest hover:underline">Learn how it works →</button>
            </Card>

            <Card className="p-8 group hover:border-emerald-500/50 transition-all">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Pill className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Smart Meds</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">Intelligent reminders, drug interaction warnings, and dosage tracking tailored to you.</p>
              <div className="flex -space-x-2">
                {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800"></div>)}
                <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-emerald-500/20 text-[10px] flex items-center justify-center text-emerald-400 font-bold">+12k</div>
              </div>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 mb-20">
          <Card className="relative overflow-hidden bg-gradient-to-br from-cyan-500/20 to-blue-600/10 border-cyan-500/20 p-12 text-center">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <HeartPulse className="w-64 h-64" />
            </div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Take Control of Your <br/><span className="text-cyan-400">Health Today</span></h2>
              <p className="text-slate-300 mb-10 text-lg">Join thousands of users who trust our AI-powered platform for their daily health management and emergency preparedness.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={onStart}
                  className="bg-cyan-500 text-black px-10 py-4 rounded-2xl font-bold hover:bg-cyan-400 transition-all flex items-center justify-center gap-2 shadow-2xl shadow-cyan-500/20"
                >
                  Start Free Trial <ArrowRight className="w-5 h-5" />
                </button>
                <button className="bg-white/10 backdrop-blur-md px-10 py-4 rounded-2xl font-bold hover:bg-white/20 transition-all border border-white/10">
                  View Demo
                </button>
              </div>
              <div className="mt-8 flex justify-center gap-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                <span>No credit card required</span>
                <span>•</span>
                <span>HIPAA Compliant</span>
                <span>•</span>
                <span>24/7 Support</span>
              </div>
            </div>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <HeartPulse className="w-6 h-6 text-cyan-500" />
            <span className="font-bold text-lg text-white">HealthAI</span>
          </div>
          <div className="flex gap-8 text-xs font-bold text-slate-500 uppercase tracking-widest">
            <a href="#" className="hover:text-cyan-400 transition-colors">Features</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Pricing</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Terms</a>
          </div>
          <p className="text-xs text-slate-600">© 2024 VitalPulse. Powered by Gemini AI.</p>
        </div>
      </footer>
    </div>
  );
};

const QuickFeature = ({ icon, title, desc }: any) => (
  <div className="flex gap-4 p-4 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm group hover:border-cyan-500/30 transition-all">
    <div className="shrink-0 p-2 bg-slate-900 rounded-xl">{icon}</div>
    <div>
      <h4 className="text-sm font-bold text-white mb-0.5">{title}</h4>
      <p className="text-[10px] text-slate-500 font-medium">{desc}</p>
    </div>
  </div>
);

export default LandingPage;
