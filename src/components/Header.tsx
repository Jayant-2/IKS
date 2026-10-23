import React from 'react';
import { Sparkles, Compass, Search } from 'lucide-react';

interface HeaderProps {
  onOpenTutor: () => void;
  onOpenSearch: () => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ onOpenTutor, onOpenSearch, activeSection }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 border-b border-white/[0.08] bg-[#030712]/80 backdrop-blur-2xl transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Single text wordmark */}
        <a 
          href="#hero" 
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg px-1"
        >
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 via-amber-600 to-amber-700 flex items-center justify-center text-slate-950 font-serif font-black shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
            ॐ
          </span>
          <span className="font-display tracking-wider text-amber-100 flex items-center gap-1.5">
            IKS Explorer
            <span className="text-xs font-mono font-normal text-amber-400/80 uppercase tracking-widest ml-1 hidden sm:inline">
              Spatial AI
            </span>
          </span>
        </a>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a 
            href="#hero" 
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-amber-300 ${activeSection === 'hero' ? 'text-amber-400 font-semibold' : 'text-slate-300'}`}
          >
            Home
          </a>
          <a 
            href="#portals" 
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-amber-300 ${activeSection === 'portals' ? 'text-amber-400 font-semibold' : 'text-slate-300'}`}
          >
            Knowledge Portals
          </a>
          <a 
            href="#timeline" 
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-amber-300 ${activeSection === 'timeline' ? 'text-amber-400 font-semibold' : 'text-slate-300'}`}
          >
            Historical Timeline
          </a>
          <a 
            href="#learning" 
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-amber-300 ${activeSection === 'learning' ? 'text-amber-400 font-semibold' : 'text-slate-300'}`}
          >
            Video Learning & Labs
          </a>
          <a 
            href="#explorer" 
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-amber-300 ${activeSection === 'explorer' ? 'text-amber-400 font-semibold' : 'text-slate-300'}`}
          >
            Topics Archive
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 rounded-lg transition-colors whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            title="Search topics"
            aria-label="Search topics"
          >
            <Search className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Search IKS</span>
            <kbd className="hidden lg:inline text-[10px] text-slate-400 bg-white/10 px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
          </button>

          <button
            onClick={onOpenTutor}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 rounded-lg shadow-lg shadow-amber-500/20 transition-all hover:shadow-amber-500/30 active:scale-95 whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Tutor</span>
          </button>
        </div>
      </div>
    </header>
  );
};
