import React, { useState, useEffect } from 'react';
import { CURATED_TUTOR_PROMPTS } from '../data/iksData';
import { 
  Sparkles, 
  Send, 
  RotateCcw, 
  BookOpen, 
  CheckCircle2, 
  HelpCircle,
  X,
  Volume2,
  Bookmark
} from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  sourceText?: string;
  timestamp: string;
}

interface AITutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
}

export const AITutorModal: React.FC<AITutorModalProps> = ({ 
  isOpen, 
  onClose,
  initialPrompt 
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Namaste! I am your IKS Manuscript Sage and AI Tutor. I can guide your study through verified Indian Knowledge Systems: Aryabhata\'s astronomy, Baudhayana\'s geometry, Brahmagupta\'s algebra, Sushruta\'s surgery, Panini\'s generative linguistics, and classical Darshana philosophy. What would you like to explore today?',
      sourceText: 'Tattvajñāna Pradīpikā Archive',
      timestamp: 'Now'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (initialPrompt && isOpen) {
      handleUserAsk(initialPrompt);
    }
  }, [initialPrompt, isOpen]);

  if (!isOpen) return null;

  const handleUserAsk = (questionText: string) => {
    if (!questionText.trim()) return;

    const userMsg: Message = {
      role: 'user',
      content: questionText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Check if question matches one of our authentic curated responses
    const matched = CURATED_TUTOR_PROMPTS.find(p => 
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
        // High quality contextual synthesis based on keywords
        const q = questionText.toLowerCase();
        if (q.includes('zero') || q.includes('shunya') || q.includes('brahmagupta')) {
          botResponse = 'In 628 CE, Brahmagupta in the Brahmasphutasiddhanta established the operational mathematical rules of Zero (Shunya) as an algebraic entity. He defined addition (0+a=a), subtraction (0-a=-a), multiplication (a×0=0), and laid down the foundational treatment of positive quantities (Dhana) and negative quantities (Rina). Earlier records like the Bakhshali Manuscript (~3rd-4th century CE) show the dot notation for zero in decimal place value.';
          source = 'Brahmasphutasiddhanta, Chapter 18';
        } else if (q.includes('calculus') || q.includes('kerala') || q.includes('madhava')) {
          botResponse = 'The Kerala School of Astronomy and Mathematics, founded by Madhava of Sangamagrama (c. 1350–1425 CE), developed power series expansions for trigonometric functions (sine, cosine, and arctangent) and calculated π to 11 decimal places, nearly three centuries before Isaac Newton and James Gregory in Europe. Their methods were documented in Malayalam and Sanskrit treatises such as Yuktidipika and Tantrasangraha.';
          source = 'Yuktidipika of Shankara Variyar';
        } else if (q.includes('nalanda') || q.includes('university') || q.includes('takshashila')) {
          botResponse = 'Nalanda Mahavihara (founded 5th century CE in modern Bihar) was one of the world\'s greatest residential universities, housing 10,000 scholars and 2,000 instructors from across Asia. Its library, Dharma Ganj ("Treasury of Truth"), had three nine-story towers. Takshashila (~600 BCE in Gandhara) was famed for individualized mentorship in 68 disciplines including surgery, military arts, astronomy, and statecraft with faculty such as Chanakya and Panini.';
          source = 'Historical Travelogues of Xuanzang (630 CE)';
        } else {
          botResponse = `Regarding "${questionText}": In Indian Knowledge Systems, technical disciplines (Shastras) are grounded in valid epistemology (Pramana)—combining direct observation (Pratyaksha), deductive inference (Anumana), and authentic textual record (Shabda). Major classical treatises provide detailed mathematical, astronomical, or medical models for this inquiry. You can explore our dedicated Knowledge Portals to study specific manuscripts and interactive simulators.`;
          source = 'Nyaya Sutras & Indic Epistemology';
        }
      }

      const botMsg: Message = {
        role: 'assistant',
        content: botResponse,
        sourceText: source,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-2xl animate-in fade-in"
      onClick={onClose}
    >
      <div 
        className="spatial-glass-glow rounded-3xl max-w-2xl w-full border border-amber-400/50 shadow-2xl relative max-h-[88vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-[#030712]/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-serif font-black shadow-md shadow-amber-500/20">
              <Sparkles className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="text-lg font-display font-medium text-white flex items-center gap-2">
                <span>IKS AI Tutor & Manuscript Sage</span>
              </h3>
              <p className="text-xs text-amber-300/80 font-mono">
                Spatial Epistemology Assistant · Grounded in Verified Treatises
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setMessages([
                  {
                    role: 'assistant',
                    content: 'Workspace reset. Ask me anything about Indian Knowledge Systems or select a question below.',
                    sourceText: 'Tattvajñāna Archive',
                    timestamp: 'Now'
                  }
                ]);
              }}
              className="p-1.5 text-xs text-slate-400 hover:text-white rounded-lg hover:bg-white/10"
              title="Reset conversation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center text-sm font-mono transition-colors"
              aria-label="Close tutor"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Quick Prompt Pills (Interactive Questions) */}
        <div className="px-5 py-2.5 bg-white/[0.02] border-b border-white/[0.06] overflow-x-auto flex items-center gap-2">
          <span className="text-[11px] font-mono text-slate-400 whitespace-nowrap">Prompts:</span>
          {CURATED_TUTOR_PROMPTS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleUserAsk(p.question)}
              className="px-3 py-1 rounded-lg bg-white/[0.04] hover:bg-amber-400/20 hover:text-amber-200 border border-white/10 text-xs text-slate-300 whitespace-nowrap transition-colors"
            >
              {p.question.length > 32 ? p.question.slice(0, 32) + '...' : p.question}
            </button>
          ))}
        </div>

        {/* Message Thread */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {messages.map((msg, mIdx) => (
            <div
              key={mIdx}
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-amber-400 text-slate-950 font-medium rounded-tr-none shadow-md shadow-amber-500/15'
                    : 'spatial-glass border border-white/15 text-slate-100 rounded-tl-none shadow-lg'
                }`}
              >
                <p className="font-sans whitespace-pre-line">{msg.content}</p>

                {msg.sourceText && (
                  <div className="mt-2.5 pt-2 border-t border-white/10 text-[10px] font-mono text-amber-300/90 flex items-center gap-1.5">
                    <BookOpen className="w-3 h-3 text-amber-400" />
                    <span>Source: {msg.sourceText}</span>
                  </div>
                )}
              </div>
              <span className="text-[10px] font-mono text-slate-500 mt-1 px-1">
                {msg.timestamp}
              </span>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 p-3 rounded-2xl spatial-glass border border-white/10 w-fit text-xs text-amber-300">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span className="font-mono text-xs">Consulting primary Sanskrit folios...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 sm:p-5 border-t border-white/10 bg-[#030712]/80">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUserAsk(inputValue);
            }}
            className="flex items-center gap-3"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about Baudhayana, Aryabhata, Sushruta, Zero, Panini..."
              className="flex-1 px-4 py-3 bg-white/[0.05] focus:bg-white/[0.08] border border-white/15 focus:border-amber-400/50 rounded-xl text-slate-100 placeholder:text-slate-500 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="px-4 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-40 text-slate-950 font-semibold text-xs sm:text-sm transition-all shadow-md shadow-amber-500/20 flex items-center gap-1.5"
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
