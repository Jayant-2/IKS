import React, { useState } from 'react';
import { IKS_SUBJECTS } from '../data/iksData';
import { SubjectPortal, IksCategory } from '../types/iks';
import { 
  Calculator, 
  Compass, 
  BookOpen, 
  Leaf, 
  Scroll, 
  Landmark, 
  ArrowRight, 
  Sparkles,
  Layers
} from 'lucide-react';

interface SubjectPortals3DProps {
  onSelectSubject: (subject: SubjectPortal) => void;
}

export const SubjectPortals3D: React.FC<SubjectPortals3DProps> = ({ onSelectSubject }) => {
  const [activePortalId, setActivePortalId] = useState<IksCategory | null>(null);
  const [spatialMode, setSpatialMode] = useState<'3d-carousel' | 'bento-grid'>('3d-carousel');

  const getIcon = (id: IksCategory) => {
    switch (id) {
      case 'mathematics': return <Calculator className="w-6 h-6 text-amber-400" />;
      case 'astronomy': return <Compass className="w-6 h-6 text-amber-300" />;
      case 'philosophy': return <BookOpen className="w-6 h-6 text-amber-400" />;
      case 'ayurveda': return <Leaf className="w-6 h-6 text-emerald-400" />;
      case 'literature': return <Scroll className="w-6 h-6 text-amber-300" />;
    }
  };

  const getCategoryThemeColor = (id: IksCategory) => {
    switch (id) {
      case 'mathematics': return 'from-amber-500/20 to-orange-600/10 border-amber-500/30 text-amber-300';
      case 'astronomy': return 'from-indigo-600/20 to-sky-600/10 border-indigo-500/30 text-sky-300';
      case 'philosophy': return 'from-yellow-600/20 to-amber-700/10 border-yellow-500/30 text-yellow-200';
      case 'ayurveda': return 'from-emerald-600/20 to-teal-700/10 border-emerald-500/30 text-emerald-300';
      case 'literature': return 'from-purple-600/20 to-amber-700/10 border-purple-500/30 text-purple-200';
    }
  };

  return (
    <section 
      id="portals" 
      className="relative py-28 px-6 bg-gradient-to-b from-[#040817] via-[#050a1c] to-[#030712] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-indigo-600/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-white/[0.08] pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-2">
              <span>Spatial Architecture</span>
              <span aria-hidden="true">·</span>
              <span>Vision Pro Depth UI</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-medium text-white tracking-tight">
              Knowledge Portals in 3D Space
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-xl mt-3 leading-relaxed">
              Hover over a portal to bring it forward into spatial focus. Click any portal to access foundational treatises, primary source folios, and interactive simulators.
            </p>
          </div>

          {/* Spatial View Toggle */}
          <div className="flex items-center gap-1.5 p-1 bg-white/[0.05] border border-white/10 rounded-xl backdrop-blur-md self-start md:self-end">
            <button
              onClick={() => setSpatialMode('3d-carousel')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                spatialMode === '3d-carousel' 
                  ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40 shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Spatial 3D Depth</span>
            </button>
            <button
              onClick={() => setSpatialMode('bento-grid')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                spatialMode === 'bento-grid' 
                  ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40 shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>Gallery Grid</span>
            </button>
          </div>
        </div>

        {/* 3D Spatial Carousel View */}
        {spatialMode === '3d-carousel' ? (
          <div className="perspective-universe min-h-[580px] flex items-center justify-center py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full preserve-3d">
              {IKS_SUBJECTS.map((subject, index) => {
                const isHovered = activePortalId === subject.id;
                const isOtherHovered = activePortalId !== null && !isHovered;

                return (
                  <div
                    key={subject.id}
                    onMouseEnter={() => setActivePortalId(subject.id)}
                    onMouseLeave={() => setActivePortalId(null)}
                    onClick={() => onSelectSubject(subject)}
                    tabIndex={0}
                    role="button"
                    aria-label={`Open ${subject.title} portal`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onSelectSubject(subject);
                      }
                    }}
                    style={{
                      transform: isHovered 
                        ? 'translateZ(50px) translateY(-10px) scale(1.03)' 
                        : isOtherHovered 
                        ? 'translateZ(-30px) scale(0.96) opacity(0.7)' 
                        : 'translateZ(0px) translateY(0px) scale(1)',
                      transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                    className={`group relative rounded-2xl p-6 sm:p-7 spatial-glass cursor-pointer preserve-3d border transition-all duration-300 ${
                      isHovered 
                        ? 'border-amber-400/50 shadow-[0_25px_60px_rgba(245,158,11,0.25)] ring-1 ring-amber-400/40' 
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    {/* Top Accent Gradient Pill */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                          {getIcon(subject.id)}
                        </div>
                        <div>
                          <div className="text-[11px] font-serif text-amber-300 tracking-wider">
                            {subject.sanskritTitle}
                          </div>
                          <h3 className="text-xl font-display font-medium text-white group-hover:text-amber-200 transition-colors">
                            {subject.title}
                          </h3>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-slate-500">
                        0{index + 1}
                      </span>
                    </div>

                    {/* Tagline */}
                    <p className="text-xs font-mono text-amber-400/90 mb-3">
                      {subject.tagline}
                    </p>

                    {/* Summary */}
                    <p className="text-sm text-slate-300 leading-relaxed mb-6 line-clamp-3">
                      {subject.summary}
                    </p>

                    {/* Key Scholars Preview */}
                    <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <span className="text-slate-500">Scholars:</span>
                        <span className="text-slate-200 font-medium">
                          {subject.keyScholars.slice(0, 2).map(s => s.name).join(', ')}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform">
                        <span>Explore</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Dynamic reflection shine overlay */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/[0.03] to-amber-400/[0.06] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Bento Gallery Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {IKS_SUBJECTS.map((subject, idx) => (
              <div
                key={subject.id}
                onClick={() => onSelectSubject(subject)}
                tabIndex={0}
                role="button"
                aria-label={`Open ${subject.title} portal`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectSubject(subject);
                  }
                }}
                className="group relative rounded-2xl p-6 spatial-glass border border-white/10 hover:border-amber-400/40 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-950/30 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-400/20 flex items-center justify-center text-amber-300">
                    {getIcon(subject.id)}
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">Vol. 0{idx + 1}</span>
                </div>

                <div className="text-xs font-serif text-amber-400/80 mb-1">{subject.sanskritTitle}</div>
                <h3 className="text-lg font-display font-medium text-white mb-2 group-hover:text-amber-200 transition-colors">
                  {subject.title}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2 mb-4 leading-relaxed">
                  {subject.summary}
                </p>

                <div className="flex items-center justify-between text-xs text-amber-400 font-semibold pt-3 border-t border-white/[0.06]">
                  <span>View Primary Treatises</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Featured Quote Banner inspired by Taittiriya & Aryabhatiya */}
        <div className="mt-16 p-8 rounded-2xl spatial-glass-subtle border border-amber-400/20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-2">
              Foundational Epistemology · Taittiriya Upanishad
            </div>
            <p className="font-editorial italic text-xl sm:text-2xl text-slate-100 leading-snug">
              "सत्यं ज्ञानमनन्तं ब्रह्म — Reality is Truth, Knowledge, and the Infinite. The pursuit of science and the exploration of consciousness are one continuous journey."
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onSelectSubject(IKS_SUBJECTS[0])}
              className="px-5 py-2.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md shadow-amber-500/20"
            >
              Start with Mathematics
            </button>
            <button
              onClick={() => onSelectSubject(IKS_SUBJECTS[3])}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 rounded-xl transition-all"
            >
              Explore Ayurveda
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
