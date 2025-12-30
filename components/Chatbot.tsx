import { useState, useRef, useEffect } from "react";
import { sendChat } from "../services/chatService";
import { Send, Bot, User, Sparkles, Loader2 } from "lucide-react";

export default function Chatbot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  async function handleSend() {
    if (!input.trim()) return;

    const newMessages = [
      ...messages,
      { role: "user", parts: [{ text: input }] },
    ];

    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const text = await sendChat(newMessages);
      setMessages([...newMessages, { role: "model", parts: [{ text }] }]);
    } catch (error) {
      setMessages([
        ...newMessages,
        { role: "model", parts: [{ text: "Sorry, I had trouble connecting. Please try again." }] }
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-[600px] w-full max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-[2.5rem] backdrop-blur-xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="p-6 border-b border-white/5 bg-white/5 flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Vitality AI</h2>
          <p className="text-sm text-slate-400">Your personal health assistant</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {messages.length === 0 && (
          <div className="text-center text-slate-500 mt-20">
            <Bot className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>Ask me anything about your medications or health!</p>
          </div>
        )}

        {messages.map((msg, idx) => {
          const isUser = msg.role === "user";
          return (
            <div key={idx} className={`flex gap-4 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isUser ? "bg-slate-700" : "bg-cyan-900/50 border border-cyan-500/30"
                }`}>
                {isUser ? <User className="w-5 h-5 text-slate-300" /> : <Bot className="w-5 h-5 text-cyan-400" />}
              </div>

              <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${isUser
                  ? "bg-slate-700/50 text-white rounded-tr-none"
                  : "bg-gradient-to-br from-cyan-950/30 to-blue-950/20 border border-white/10 text-slate-200 rounded-tl-none shadow-sm"
                }`}>
                {msg.parts[0].text}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-cyan-900/50 border border-cyan-500/30 flex items-center justify-center shrink-0">
              <Bot className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none flex items-center gap-2">
              <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
              <span className="text-xs text-slate-400">Thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-black/20 border-t border-white/5">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your health question..."
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 transition-all"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="w-14 h-14 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:hover:bg-cyan-500 rounded-xl flex items-center justify-center transition-all text-black shadow-[0_0_20px_rgba(6,182,212,0.3)]"
          >
            {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </div>
  );
}
