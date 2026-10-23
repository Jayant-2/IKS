import React, { useState } from 'react';
import { SubjectPortal } from '../types/iks';
import { 
  X, 
  Sparkles, 
  BookOpen, 
  Award, 
  FileText, 
  UserCheck, 
  Compass, 
  ExternalLink,
  Sliders
} from 'lucide-react';
import { 
  BaudhayanaSimulator, 
  TridoshaSimulator, 
  MeruPrastaraSimulator 
} from './InteractiveSimulators';

interface SubjectDetailModalProps {
  subject: SubjectPortal | null;
  onClose: () => void;
  onOpenTutorWithPrompt: (prompt: string) => void;
}

export const SubjectDetailModal: React.FC<SubjectDetailModalProps> = ({ 
  subject, 
  onClose,
  onOpenTutorWithPrompt 
}) => {
  if (!subject) return null;

  const [activeTab, setActiveTab] = useState<'overview' | 'scholars' | 'simulator' | 'manuscripts'>('overview');

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-2xl animate-in fade-in overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="spatial-glass-glow rounded-3xl max-w-4xl w-full border border-amber-400/40 shadow-2xl relative my-auto max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="p-6 sm:p-8 border-b border-white/10 flex items-start justify-between gap-4 bg-[#030712]/60">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-1">
              <span>Verified IKS Archive</span>
              <span aria-hidden="true">·</span>
              <span className="font-serif">{subject.sanskritTitle}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-medium text-white">
              {subject.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 font-mono">
              {subject.tagline}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center text-sm font-mono shrink-0 transition-colors"
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 sm:px-8 py-3 bg-white/[0.02] border-b border-white/[0.08] overflow-x-auto">
          {[
            { id: 'overview', label: 'Treatise Overview' },
            { id: 'scholars', label: `Key Scholars (${subject.keyScholars.length})` },
            { id: 'simulator', label: 'Interactive Lab' },
            { id: 'manuscripts', label: 'Archival Manuscripts' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Primary Verse / Shloka */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-950/20 to-transparent border border-amber-400/30">
                <div className="flex items-center justify-between text-xs font-mono uppercase text-amber-400 mb-2">
                  <span>Foundational Shloka</span>
                  <span className="italic">{subject.verse.source}</span>
                </div>
                <div className="font-serif text-lg sm:text-xl text-amber-100 font-semibold mb-2 leading-relaxed">
                  {subject.verse.sanskrit}
                </div>
                <div className="font-mono text-xs text-amber-300/80 italic mb-3">
                  {subject.verse.transliteration}
                </div>
                <div className="font-editorial text-sm sm:text-base text-slate-200 leading-relaxed border-t border-white/10 pt-3">
                  "{subject.verse.english}"
                </div>
              </div>

              {/* Summary */}
              <div>
                <h3 className="text-lg font-display text-white mb-2">Core Philosophical & Technical Foundation</h3>
                <p className="text-sm text-slate-300 leading-relaxed font-sans">
                  {subject.summary}
                </p>
              </div>

              {/* Core Discoveries */}
              <div>
                <h3 className="text-lg font-display text-white mb-4">Milestones & Global Scientific Impact</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {subject.coreDiscoveries.map((disc, dIdx) => (
                    <div 
                      key={dIdx} 
                      className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between"
                    >
                      <div>
                        <div className="text-[11px] font-mono text-amber-400 mb-1">
                          {disc.era}
                        </div>
                        <h4 className="text-sm font-display font-medium text-white mb-2">
                          {disc.title}
                        </h4>
                        <p className="text-xs text-slate-300 leading-relaxed mb-3">
                          {disc.description}
                        </p>
                      </div>
                      <div className="pt-2 border-t border-white/5 text-[11px] text-amber-200/90 font-mono">
                        <strong className="text-slate-400">Relevance:</strong> {disc.modernRelevance}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'scholars' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-400 font-mono">
                Historical masters who formulated treatises in this field:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {subject.keyScholars.map((scholar, sIdx) => (
                  <div 
                    key={sIdx}
                    className="p-5 rounded-2xl spatial-glass-subtle border border-white/10 space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-xs font-serif text-amber-400">
                          {scholar.sanskritName}
                        </div>
                        <h4 className="text-base font-display font-medium text-white">
                          {scholar.name}
                        </h4>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded">
                        {scholar.era}
                      </span>
                    </div>

                    <div className="text-xs text-slate-400 font-mono">
                      <span>Location:</span> <span className="text-slate-200">{scholar.location}</span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {scholar.contribution}
                    </p>

                    <div className="pt-2 border-t border-white/5 text-[11px] text-amber-300/80 font-mono truncate">
                      Works: {scholar.works.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'simulator' && (
            <div className="space-y-4">
              {subject.id === 'mathematics' && <BaudhayanaSimulator />}
              {subject.id === 'ayurveda' && <TridoshaSimulator />}
              {subject.id !== 'mathematics' && subject.id !== 'ayurveda' && (
                <div className="space-y-6">
                  <MeruPrastaraSimulator />
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-400/20 text-xs text-slate-300">
                    <strong className="text-amber-300 block mb-1">Notice:</strong>
                    Specialized 3D Celestial Astrolabe (Khagola Gola Yantra) and Ashtadhyayi rule-engines are available on the home canvas and via the AI Manuscript Sage.
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'manuscripts' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-400 font-mono">
                Primary palm-leaf and birch bark archives cataloged in global repositories:
              </div>
              <div className="grid grid-cols-1 gap-3">
                {subject.manuscripts.map((ms, mIdx) => (
                  <div 
                    key={mIdx}
                    className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-amber-400 shrink-0" />
                      <div>
                        <div className="text-sm font-medium text-slate-200">{ms}</div>
                        <div className="text-[11px] text-slate-500 font-mono">Verified Primary Text Record</div>
                      </div>
                    </div>
                    <span className="text-xs text-amber-400 font-mono">Archived Folio</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 bg-[#030712]/80">
          <button
            onClick={() => {
              const prompt = `Explain the most groundbreaking aspects of ${subject.title} (${subject.sanskritTitle}) to a student. What are its most impactful treatises and mathematical/scientific contributions?`;
              onClose();
              onOpenTutorWithPrompt(prompt);
            }}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-amber-200 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/30 rounded-xl transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Consult AI Tutor on {subject.title}</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md"
          >
            Done Exploring
          </button>
        </div>

      </div>
    </div>
  );
};
