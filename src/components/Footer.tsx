import React from 'react';
import { AppRoute } from '../types/iks';
import { Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate: (route: AppRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-white/[0.08] bg-[#171717] py-12 px-4 sm:px-6 text-[#888888]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        
        {/* Brand column */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-[#242424] text-[#21F1A8] font-bold text-xs flex items-center justify-center border border-white/10">
              ॐ
            </span>
            <span className="font-heading font-bold text-white tracking-tight text-sm">
              IKS Explorer AI
            </span>
          </div>
          <p className="text-xs text-[#888888] max-w-sm leading-relaxed font-body">
            A spatial digital learning environment dedicated to Indian Knowledge Systems through verified treatises and interactive computing models.
          </p>
        </div>

        {/* Links with routing */}
        <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-[#B0B0B0]">
          <button 
            onClick={() => onNavigate('/')} 
            className="hover:text-[#21F1A8] transition-colors cursor-pointer py-1"
          >
            Home
          </button>
          <button 
            onClick={() => onNavigate('/explore')} 
            className="hover:text-[#21F1A8] transition-colors cursor-pointer py-1"
          >
            Explore & Timeline
          </button>
          <button 
            onClick={() => onNavigate('/study-tracker')} 
            className="hover:text-[#21F1A8] transition-colors cursor-pointer py-1"
          >
            Study Tracker
          </button>
          <button 
            onClick={() => onNavigate('/sanskrit')} 
            className="hover:text-[#21F1A8] transition-colors cursor-pointer py-1"
          >
            Sanskrit
          </button>
          <button 
            onClick={() => onNavigate('/quizzes')} 
            className="hover:text-[#21F1A8] transition-colors cursor-pointer py-1"
          >
            Quizzes
          </button>
          <button 
            onClick={() => onNavigate('/mock-tests')} 
            className="hover:text-[#21F1A8] transition-colors cursor-pointer py-1"
          >
            Mock Tests
          </button>
          <button 
            onClick={() => onNavigate('/video-learning')} 
            className="hover:text-[#21F1A8] transition-colors cursor-pointer py-1"
          >
            Video Learning
          </button>
          <button 
            onClick={() => onNavigate('/ai-tutor')} 
            className="hover:text-[#21F1A8] transition-colors cursor-pointer py-1"
          >
            AI Tutor
          </button>
        </div>

        {/* Right side attribution */}
        <div className="text-left md:text-right text-xs text-[#666666] font-mono space-y-1">
          <div>Primary sources: Aryabhatiya · Sulba Sutras · Charaka Samhita</div>
          <div>Academic chronological calibrations.</div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#666666] gap-4">
        <div>
          © {new Date().getFullYear()} Indian Knowledge Systems Explorer. Educational Open Resource.
        </div>
        <div className="flex items-center gap-4">
          <span>Charcoal & Mint Spatial UI</span>
          <span aria-hidden="true">·</span>
          <button 
            onClick={() => onNavigate('/ai-tutor')} 
            className="text-[#21F1A8] hover:underline transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3 h-3" />
            <span>Launch AI Manuscript Sage</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
