import React, { useState } from 'react';
import { TIMELINE_MILESTONES } from '../data/iksData';
import { TimelineMilestone, IksCategory } from '../types/iks';
import { Landmark, Calendar, BookOpen, Compass, ChevronRight, Award } from 'lucide-react';

export const Timeline3D: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<IksCategory | 'all'>('all');
  const [activeMilestoneIndex, setActiveMilestoneIndex] = useState(0);

  const filteredMilestones = selectedCategory === 'all' 
    ? TIMELINE_MILESTONES 
    : TIMELINE_MILESTONES.filter(m => m.category === selectedCategory);

  const activeMilestone = filteredMilestones[activeMilestoneIndex] || filteredMilestones[0];

  return (
    <section 
      id="timeline" 
      className="relative py-28 px-6 bg-gradient-to-b from-[#030712] via-[#060b19] to-[#040816] overflow-hidden"
    >
      {/* Background glow accents */}
      <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-white/[0.08] pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-2">
              <span>Historical Chronology</span>
              <span aria-hidden="true">·</span>
              <span>1500 BCE to 1450 CE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-medium text-white tracking-tight">
              3D Timeline of Indian Discoveries
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-xl mt-3 leading-relaxed">
              Trace the unbroken lineage of mathematical proofs, astronomical observatories, surgical treatises, and the university centers of Nalanda and Takshashila.
            </p>
          </div>

          {/* Interactive Category Segmented Control */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white/[0.04] border border-white/10 rounded-xl backdrop-blur-md">
            {[
              { id: 'all', label: 'All Milestones' },
              { id: 'mathematics', label: 'Mathematics' },
              { id: 'astronomy', label: 'Astronomy' },
              { id: 'ayurveda', label: 'Medicine & Surgery' },
              { id: 'literature', label: 'Linguistics' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setSelectedCategory(tab.id as any);
                  setActiveMilestoneIndex(0);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  selectedCategory === tab.id 
                    ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40 shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Spatial Spotlight 2-Column Split: Active Milestone Highlight + Interactive Rail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Active Highlight Spotlight (Spatial Glass Card) */}
          <div className="lg:col-span-7 spatial-glass rounded-3xl p-8 sm:p-10 border border-amber-400/30 flex flex-col justify-between relative overflow-hidden shadow-2xl shadow-amber-950/20">
            {/* Soft backdrop glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-amber-500/15 via-transparent to-transparent pointer-events-none" />

            <div>
              {/* Year & Period Header */}
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-3xl sm:text-4xl font-display font-bold text-amber-400">
                    {activeMilestone.year}
                  </span>
                  <div className="h-6 w-px bg-white/20" />
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-300">
                    {activeMilestone.period}
                  </span>
                </div>

                {activeMilestone.sanskritName && (
                  <span className="text-sm font-serif text-amber-200/90 hidden sm:inline px-3 py-1 bg-amber-500/10 rounded-lg border border-amber-500/20">
                    {activeMilestone.sanskritName}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl font-display font-medium text-white mb-4">
                {activeMilestone.title}
              </h3>

              {/* Scholar & Institution Metadata (Zero-Pill discipline) */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-6">
                {activeMilestone.scholar && (
                  <>
                    <span className="text-slate-500">Scholar:</span>
                    <span className="text-amber-200 font-medium">{activeMilestone.scholar}</span>
                    <span aria-hidden="true">·</span>
                  </>
                )}
                {activeMilestone.institution && (
                  <>
                    <span className="text-slate-500">Centre:</span>
                    <span className="text-slate-200">{activeMilestone.institution}</span>
                    <span aria-hidden="true">·</span>
                  </>
                )}
                <span className="text-slate-500">Primary Text:</span>
                <span className="text-slate-300 italic">{activeMilestone.sourceText}</span>
              </div>

              {/* Discovery Description */}
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed mb-6 font-sans">
                {activeMilestone.description}
              </p>

              {/* Modern Impact Box */}
              <div className="p-4 rounded-xl bg-amber-500/[0.07] border border-amber-400/20 text-xs sm:text-sm text-amber-100 flex items-start gap-3">
                <Award className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-300 font-semibold block mb-0.5">Global Scientific Impact:</strong>
                  {activeMilestone.impact}
                </div>
              </div>
            </div>

            {/* Step navigation indicator */}
            <div className="flex items-center justify-between pt-8 mt-6 border-t border-white/[0.08] text-xs text-slate-400">
              <span>Milestone {activeMilestoneIndex + 1} of {filteredMilestones.length}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveMilestoneIndex(prev => Math.max(0, prev - 1))}
                  disabled={activeMilestoneIndex === 0}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] disabled:opacity-40 border border-white/10 text-white transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={() => setActiveMilestoneIndex(prev => Math.min(filteredMilestones.length - 1, prev + 1))}
                  disabled={activeMilestoneIndex === filteredMilestones.length - 1}
                  className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold transition-colors"
                >
                  Next Era
                </button>
              </div>
            </div>

          </div>

          {/* Interactive Milestone Rail (Scrollable 3D timeline list) */}
          <div className="lg:col-span-5 flex flex-col gap-3 max-h-[580px] overflow-y-auto pr-2">
            {filteredMilestones.map((milestone, idx) => {
              const isActive = idx === activeMilestoneIndex;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveMilestoneIndex(idx)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all duration-200 border ${
                    isActive 
                      ? 'spatial-glass-glow border-amber-400/60 shadow-lg shadow-amber-950/40 translate-x-1' 
                      : 'spatial-glass-subtle border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-xs font-mono font-bold ${isActive ? 'text-amber-300' : 'text-slate-400'}`}>
                      {milestone.year}
                    </span>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500">
                      {milestone.category}
                    </span>
                  </div>

                  <h4 className={`text-sm font-display font-medium ${isActive ? 'text-white' : 'text-slate-300'}`}>
                    {milestone.title}
                  </h4>

                  <div className="flex items-center justify-between text-xs text-slate-400 mt-2">
                    <span className="truncate max-w-[200px]">
                      {milestone.scholar || milestone.institution}
                    </span>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'translate-x-1 text-amber-400' : 'text-slate-600'}`} />
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Ancient Learning Centers Showcase (Nalanda & Takshashila) */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-7 rounded-2xl spatial-glass border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <Landmark className="w-5 h-5 text-amber-400" />
              <h4 className="text-lg font-display text-white">Takshashila University (c. 600 BCE)</h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
              World's earliest center of higher learning located in the Gandhara region. Over 68 subjects were taught including statecraft (Chanakya/Kautilya), medicine (Charaka), grammar (Panini), surgery, and metallurgy without state dogmatic control.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
              <span>Alumni: Chanakya · Panini · Jivaka</span>
              <span aria-hidden="true">·</span>
              <span>16+ Disciplines</span>
            </div>
          </div>

          <div className="p-7 rounded-2xl spatial-glass border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <Landmark className="w-5 h-5 text-amber-400" />
              <h4 className="text-lg font-display text-white">Nalanda Mahavihara (c. 427–1197 CE)</h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
              Premier international residential university in Magadha hosting 10,000 students and 2,000 teachers from China, Korea, Japan, Tibet, and Persia. The Dharma Ganj library comprised 3 multi-story towers (Ratnasagara, Ratnodadhi, and Ratnaranjaka).
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
              <span>Rector: Shilabhadra</span>
              <span aria-hidden="true">·</span>
              <span>Scholars: Xuanzang · Aryabhata lineage</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
