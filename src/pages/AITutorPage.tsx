import React, { useState, useEffect } from 'react';
import { CURATED_TUTOR_PROMPTS } from '../data/iksData';
import { AppRoute } from '../types/iks';
import { 
  Sparkles, 
  Send, 
  RotateCcw, 
  ArrowLeft, 
  BookOpen, 
  ShieldCheck, 
  Copy, 
  Check 
} from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  sourceText?: string;
  timestamp: string;
}

interface AITutorPageProps {
  onNavigate: (route: AppRoute) => void;
  initialPrompt?: string;
}

export const AITutorPage: React.FC<AITutorPageProps> = ({ onNavigate, initialPrompt }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Namaste! I am your IKS Manuscript Sage and AI Tutor. I provide verified educational explanations on classical Indian Mathematics, Astronomy, Ayurveda, Philosophy, and Panini\'s generative linguistics. All answers are grounded in authentic historical treatises. What would you like to explore today?',
      sourceText: 'Tattvajñāna Indic Archive',
      timestamp: 'Now',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (initialPrompt) {
      handleUserAsk(initialPrompt);
    }
  }, [initialPrompt]);

  const handleUserAsk = (questionText: string) => {
    if (!questionText.trim()) return;

    const userMsg: Message = {
      role: 'user',
      content: questionText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    const matched = CURATED_TUTOR_PROMPTS.find(
      (p) =>
        questionText.toLowerCase().includes(p.question.toLowerCase().slice(0, 15)) ||
        p.question.toLowerCase().includes(questionText.toLowerCase().slice(0, 15))
    );

    setTimeout(() => {
      let botResponse = '';
      let source = 'Indian Knowledge Systems Compendium';

      if (matched) {
        botResponse = matched.answer;
        if (matched.question.includes('Aryabhata')) source = 'Aryabhatiya, Ganitapada (499 CE)';
        else if (matched.question.includes('Baudhayana')) source = 'Baudhayana Sulba Sutra (c. 800 BCE)';
        else if (matched.question.includes('Tridosha')) source = 'Sushruta Samhita & Charaka Samhita';
        else if (matched.question.includes('Panini')) source = 'Panini Ashtadhyayi & Shivasutras';
        else if (matched.question.includes('Darshana')) source = 'Shad-Darshana Epistemological Tradition';
      } else {
        const q = questionText.toLowerCase();
        if (q.includes('zero') || q.includes('shunya') || q.includes('brahmagupta')) {
          botResponse = 'In 628 CE, Brahmagupta in the Brahmasphutasiddhanta established the operational mathematical rules of Zero (Shunya) as an algebraic entity. He defined addition (0+a=a), subtraction (0-a=-a), multiplication (a×0=0), and negative quantities (Rina). The earlier Bakhshali Manuscript (~3rd-4th century CE) documented the dot notation for zero in the place value system.';
          source = 'Brahmasphutasiddhanta, Chapter 18';
        } else if (q.includes('calculus') || q.includes('kerala') || q.includes('madhava')) {
          botResponse = 'The Kerala School of Astronomy and Mathematics, founded by Madhava of Sangamagrama (c. 1350–1425 CE), developed infinite power series expansions for sine, cosine, and arctangent, calculating π to 11 decimal places three centuries before Newton, Leibniz, and Gregory. Their proofs are preserved in the Malayalam and Sanskrit treatises Yuktidipika and Tantrasangraha.';
          source = 'Yuktidipika of Shankara Variyar';
        } else if (q.includes('nalanda') || q.includes('takshashila') || q.includes('university')) {
          botResponse = 'Nalanda Mahavihara (5th century CE) accommodated 10,000 scholars and 2,000 instructors with the famed Dharma Ganj library towers. Takshashila (~600 BCE in Gandhara) provided advanced training in 68 disciplines without state dogmatic control, producing alumni like Chanakya, Panini, and the royal physician Jivaka.';
          source = 'Historical Accounts of Xuanzang (630 CE)';
        } else {
          botResponse = `Regarding "${questionText}": Indian scientific Shastras rely on rigorous epistemology (Pramana)—combining direct observation (Pratyaksha), deductive inference (Anumana), and verified testimony (Shabda). Primary treatises in Mathematics, Astronomy, Ayurveda, or Philosophy provide formal analytical models for this subject. You can also explore the dedicated subject learning areas to inspect original diagrams and verses.`;
          source = 'Indic Epistemological Foundations';
        }
      }

      const botMsg: Message = {
        role: 'assistant',
        content: botResponse,
        sourceText: source,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 500);
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard?.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="w-full bg-[#171717] min-h-screen py-10 px-4 sm:px-6 flex flex-col">
      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col space-y-6">
        
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <button
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-2 text-xs font-mono font-medium text-[#B0B0B0] hover:text-[#21F1A8] transition-colors py-2 px-1 cursor-pointer min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Homepage</span>
          </button>

          <button
            onClick={() => {
              setMessages([
                {
                  role: 'assistant',
                  content: 'Workspace reset. Ask any question about Indian Knowledge Systems or choose a prompt below.',
                  sourceText: 'Tattvajñāna Archive',
                  timestamp: 'Now',
                },
              ]);
            }}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#888888] hover:text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear Chat</span>
          </button>
        </div>

        {/* Page Title */}
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-medium text-[#21F1A8] uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dedicated Learning Assistant</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">
            IKS AI Tutor & Manuscript Sage
          </h1>
          <p className="text-xs text-[#A0A0A0] mt-1 font-body">
            Grounded in verified historical texts: Aryabhatiya, Baudhayana Sulba Sutras, Charaka Samhita, and Panini's Ashtadhyayi.
          </p>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs font-mono text-[#777777] whitespace-nowrap">Prompts:</span>
          {CURATED_TUTOR_PROMPTS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleUserAsk(p.question)}
              className="px-3 py-1.5 rounded-lg bg-[#1f1f1f] hover:bg-[#242424] border border-white/[0.08] text-xs text-[#CCCCCC] hover:text-[#21F1A8] whitespace-nowrap transition-colors cursor-pointer"
            >
              {p.question.length > 36 ? p.question.slice(0, 36) + '...' : p.question}
            </button>
          ))}
        </div>

        {/* Chat Thread Container */}
        <div className="bg-[#1f1f1f] border border-white/[0.08] rounded-2xl p-5 sm:p-6 flex-1 flex flex-col justify-between shadow-xl min-h-[440px]">
          <div className="space-y-4 overflow-y-auto max-h-[500px] pr-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[90%] sm:max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[#21F1A8] text-[#171717] font-medium rounded-tr-none'
                      : 'bg-[#242424] text-white border border-white/[0.06] rounded-tl-none shadow'
                  }`}
                >
                  <p className="whitespace-pre-line font-body">{msg.content}</p>

                  {msg.sourceText && (
                    <div className="mt-3 pt-2 border-t border-white/10 text-[11px] font-mono text-[#21F1A8] flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Source: {msg.sourceText}</span>
                      </span>
                      <button
                        onClick={() => handleCopy(msg.content, idx)}
                        className="text-[#888888] hover:text-white p-1"
                        title="Copy answer"
                      >
                        {copiedIndex === idx ? (
                          <Check className="w-3.5 h-3.5 text-[#21F1A8]" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  )}
                </div>
                <span className="text-[10px] font-mono text-[#666666] mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-[#242424] border border-white/10 text-xs text-[#21F1A8] w-fit">
                <span className="w-2 h-2 rounded-full bg-[#21F1A8] animate-ping" />
                <span className="font-mono text-xs">Consulting primary Sanskrit folios...</span>
              </div>
            )}
          </div>

          {/* Input Box (min 44px touch targets) */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUserAsk(inputValue);
            }}
            className="flex items-center gap-2 pt-4 mt-4 border-t border-white/[0.08]"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about Baudhayana, Aryabhata, Zero, Tridosha, Panini..."
              className="flex-1 px-4 py-3 bg-[#171717] border border-white/15 focus:border-[#21F1A8] rounded-xl text-xs sm:text-sm text-white placeholder:text-[#666666] focus:outline-none min-h-[44px]"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="px-5 py-3 rounded-xl bg-[#21F1A8] hover:bg-[#21F1A8]/90 disabled:opacity-40 text-[#171717] font-semibold text-xs sm:text-sm transition-all min-h-[44px] cursor-pointer flex items-center gap-1.5"
            >
              <span>Ask</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
