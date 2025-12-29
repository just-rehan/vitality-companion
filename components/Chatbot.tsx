
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Info, Loader2, Stethoscope, Activity, Bot, Sparkles } from 'lucide-react';
import { getHealthAdvice, analyzeSymptoms } from '../services/geminiService';
import { ChatMessage } from '../types';

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hello! I'm your AI Health Assistant. I can help you with health questions, symptom analysis, and general wellness guidance. How can I assist you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showAnalyzer, setShowAnalyzer] = useState(false);
  const [symptomResult, setSymptomResult] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim() || isLoading) return;

    const newMessages: ChatMessage[] = [...messages, { role: 'user', text: messageText }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getHealthAdvice(messages, messageText);
      setMessages([...newMessages, { role: 'model', text: response }]);
    } catch (error) {
      setMessages([...newMessages, { role: 'model', text: "Sorry, I had trouble connecting. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const startVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitRecognition;
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      handleSend(transcript);
    };
    recognition.start();
  };

  const runSymptomAnalysis = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    try {
      const result = await analyzeSymptoms(input);
      setSymptomResult(result);
      setShowAnalyzer(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[75vh] max-w-4xl mx-auto w-full">
      {/* Header */}
      <div className="p-6 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-cyan-500/10 rounded-2xl flex items-center justify-center border border-cyan-500/20">
            <Bot className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              AI Health Assistant <Sparkles className="w-4 h-4 text-cyan-400" />
            </h3>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-0.5">Your personal health companion</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-black font-bold text-[10px] ${
              msg.role === 'user' ? 'bg-white' : 'bg-cyan-500'
            }`}>
              {msg.role === 'user' ? 'ME' : <Bot className="w-4 h-4" />}
            </div>
            <div className={`max-w-[80%] space-y-2`}>
              <div className={`px-5 py-4 rounded-3xl text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-cyan-500 text-black font-medium rounded-tr-none' 
                  : 'bg-white/5 text-slate-200 border border-white/10 rounded-tl-none'
              }`}>
                {msg.text}
                {msg.role === 'model' && i === 0 && (
                   <div className="mt-4 p-3 bg-orange-500/10 border border-orange-500/20 rounded-xl text-xs text-orange-400">
                    ⚠️ Remember: I provide informational guidance only and am not a substitute for professional medical advice.
                   </div>
                )}
              </div>
              <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest px-2">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start gap-4">
            <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-black"><Bot className="w-4 h-4" /></div>
            <div className="bg-white/5 px-5 py-4 rounded-3xl rounded-tl-none border border-white/10 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
              <span className="text-xs text-slate-400">Analyzing...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {!isLoading && messages.length < 3 && (
        <div className="px-6 pb-4">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Try asking:</p>
          <div className="flex flex-wrap gap-2">
            {[
              "I have a headache, what should I do?",
              "What are the symptoms of dehydration?",
              "How can I improve my sleep quality?"
            ].map((s, i) => (
              <button key={i} onClick={() => setInput(s)} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-slate-400 hover:text-white hover:border-cyan-500/50 transition-all">
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-6 border-t border-white/5">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your health question..."
            className="w-full pl-6 pr-32 py-4 bg-white/5 border border-white/10 rounded-3xl text-sm text-white focus:outline-none focus:border-cyan-500/50 placeholder:text-slate-600 transition-all"
          />
          <div className="absolute right-2 top-2 flex gap-2">
            <button 
              onClick={startVoiceInput}
              className={`p-2 rounded-2xl transition-all ${isListening ? 'bg-rose-500 text-white animate-pulse' : 'bg-white/5 text-slate-400 hover:text-white'}`}
            >
              <Mic className="w-5 h-5" />
            </button>
            <button 
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="p-2 bg-cyan-500 text-black rounded-2xl hover:bg-cyan-400 disabled:opacity-50 transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)]"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
        <p className="text-[10px] text-center text-slate-600 mt-4 font-bold uppercase tracking-widest">
          AI assistant for informational purposes only. Not medical advice.
        </p>
      </div>
    </div>
  );
};

export default Chatbot;