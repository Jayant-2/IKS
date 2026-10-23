import React, { useState } from 'react';
import { TIMELINE_MILESTONES, SEARCHABLE_TOPICS, IKS_SUBJECTS } from '../data/iksData';
import { AppRoute, IksCategory, TimelineMilestone, SearchableTopic } from '../types/iks';
import { 
  ArrowLeft, 
  Search, 
  Calendar, 
  Landmark, 
  ChevronRight, 
  Award, 
  Clock, 
  Orbit, 
  BookOpen, 
  Sparkles 
} from 'lucide-react';

interface ExplorePageProps {
  onNavigate: (route: AppRoute) => void;
  onOpenTutorWithPrompt: (prompt: string) => void;
}

export const ExplorePage: React.FC<ExplorePageProps> = ({ onNavigate, onOpenTutorWithPrompt }) => {
  const [selectedCategory, setSelectedCategory] = useState<IksCategory | 'all'>('all');
  const [activeMilestoneIndex, setActiveMilestoneIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'timeline' | 'archive'>('timeline');

  const filteredMilestones = selectedCategory === 'all'
    ? TIMELINE_MILESTONES
    : TIMELINE_MILESTONES.filter((m) => m.category === selectedCategory);

  const activeMilestone = filteredMilestones[activeMilestoneIndex] || filteredMilestones[0];

  const filteredTopics = SEARCHABLE_TOPICS.filter((t) => {
    const matchesCat = selectedCategory === 'all' || t.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery = !q || 
      t.title.toLowerCase().includes(q) || 
      (t.sanskritTitle && t.sanskritTitle.toLowerCase().includes(q)) || 
      t.summary.toLowerCase().includes(q) || 
      t.tags.some(tag => tag.toLowerCase().includes(q));
    return matchesCat && matchesQuery;
  });

  return (
    <div className="w-full bg-[#171717] min-h-screen py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <button
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-2 text-xs font-mono font-medium text-[#B0B0B0] hover:text-[#21F1A8] transition-colors py-2 px-1 cursor-pointer min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Homepage</span>
          </button>

          <button
            onClick={() => onOpenTutorWithPrompt('What is the chronological progression of Indian mathematics from Baudhayana to the Kerala School?')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#171717] bg-[#21F1A8] hover:bg-[#21F1A8]/90 rounded-lg transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ask Sage About Timeline</span>
          </button>
        </div>

        {/* Page Header */}
        <div>
          <div className="text-xs font-mono font-medium uppercase tracking-wider text-[#21F1A8] mb-1.5">
            Discovery Map & Chronology
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-bold text-white tracking-tight">
            Explore 3,000 Years of Indian Thought
          </h1>
          <p className="text-sm sm:text-base text-[#A0A0A0] mt-2 max-w-2xl font-body leading-relaxed">
            Trace the chronological discoveries from 1500 BCE Vedanga astronomy to the infinite series calculus of the 14th-century Kerala School.
          </p>
        </div>

        {/* View Switcher & Category Filter */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-2 bg-[#1f1f1f] border border-white/[0.08] rounded-xl">
          <div className="flex items-center gap-1 bg-[#242424] p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('timeline')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                activeTab === 'timeline'
                  ? 'bg-[#21F1A8] text-[#171717] font-bold'
                  : 'text-[#A0A0A0] hover:text-white'
              }`}
            >
              Historical Timeline
            </button>
            <button
              onClick={() => setActiveTab('archive')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                activeTab === 'archive'
                  ? 'bg-[#21F1A8] text-[#171717] font-bold'
                  : 'text-[#A0A0A0] hover:text-white'
              }`}
            >
              Topic Archive Search ({SEARCHABLE_TOPICS.length})
            </button>
          </div>

          {/* Discipline Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: 'All' },
              { id: 'mathematics', label: 'Math' },
              { id: 'astronomy', label: 'Astronomy' },
              { id: 'philosophy', label: 'Philosophy' },
              { id: 'ayurveda', label: 'Ayurveda' },
              { id: 'literature', label: 'Literature' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id as any);
                  setActiveMilestoneIndex(0);
                }}
                className={`px-2.5 py-1 text-xs font-mono rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-white/10 text-[#21F1A8] border border-[#21F1A8]/40'
                    : 'text-[#888888] hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'timeline' ? (
          /* Timeline Mode */
          <div className="space-y-8">
            {/* 2-Column Spotlight Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Active Milestone Highlight Card */}
              <div className="lg:col-span-7 bg-[#1f1f1f] border border-white/[0.08] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="text-2xl sm:text-3xl font-heading font-bold text-[#21F1A8]">
                      {activeMilestone.year}
                    </span>
                    <span className="text-xs font-mono uppercase tracking-wider text-[#A0A0A0]">
                      {activeMilestone.period}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mb-2">
                    {activeMilestone.title}
                  </h3>

                  {activeMilestone.sanskritName && (
                    <div className="text-xs font-mono text-[#21F1A8] mb-4">
                      {activeMilestone.sanskritName}
                    </div>
                  )}

                  {/* Metadata */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#888888] font-mono mb-4">
                    {activeMilestone.scholar && (
                      <>
                        <span>Scholar: <strong className="text-white font-medium">{activeMilestone.scholar}</strong></span>
                        <span aria-hidden="true">·</span>
                      </>
                    )}
                    {activeMilestone.institution && (
                      <>
                        <span>Academy: <strong className="text-white font-medium">{activeMilestone.institution}</strong></span>
                        <span aria-hidden="true">·</span>
                      </>
                    )}
                    <span>Source: <em className="text-[#CCCCCC]">{activeMilestone.sourceText}</em></span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#CCCCCC] leading-relaxed mb-6 font-body">
                    {activeMilestone.description}
                  </p>

                  <div className="p-4 rounded-xl bg-[#242424] border border-white/[0.06] text-xs text-[#E0E0E0] flex items-start gap-3">
                    <Award className="w-4 h-4 text-[#21F1A8] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#21F1A8] block mb-0.5">Scientific Impact:</strong>
                      {activeMilestone.impact}
                    </div>
                  </div>
                </div>

                {/* Stepper Buttons */}
                <div className="flex items-center justify-between pt-6 mt-6 border-t border-white/[0.08] text-xs text-[#888888]">
                  <span>Milestone {activeMilestoneIndex + 1} of {filteredMilestones.length}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveMilestoneIndex((prev) => Math.max(0, prev - 1))}
                      disabled={activeMilestoneIndex === 0}
                      className="px-3 py-1.5 rounded-lg bg-[#242424] hover:bg-[#2e2e2e] disabled:opacity-40 text-white transition-colors"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setActiveMilestoneIndex((prev) => Math.min(filteredMilestones.length - 1, prev + 1))}
                      disabled={activeMilestoneIndex === filteredMilestones.length - 1}
                      className="px-3 py-1.5 rounded-lg bg-[#21F1A8] hover:bg-[#21F1A8]/90 disabled:opacity-40 text-[#171717] font-bold transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>

              {/* Milestones Rail */}
              <div className="lg:col-span-5 flex flex-col gap-2.5 max-h-[560px] overflow-y-auto pr-1">
                {filteredMilestones.map((m, idx) => {
                  const isActive = idx === activeMilestoneIndex;
                  return (
                    <div
                      key={idx}
                      onClick={() => setActiveMilestoneIndex(idx)}
                      className={`p-4 rounded-xl cursor-pointer border transition-all ${
                        isActive
                          ? 'bg-[#242424] border-[#21F1A8]/60 shadow-md'
                          : 'bg-[#1f1f1f] border-white/[0.06] hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className={`font-mono font-bold ${isActive ? 'text-[#21F1A8]' : 'text-[#888888]'}`}>
                          {m.year}
                        </span>
                        <span className="text-[10px] uppercase font-mono text-[#666666]">
                          {m.category}
                        </span>
                      </div>
                      <h4 className={`text-sm font-heading font-bold ${isActive ? 'text-white' : 'text-[#CCCCCC]'}`}>
                        {m.title}
                      </h4>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* University Spotlight Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              <div className="bg-[#1f1f1f] border border-white/[0.08] rounded-2xl p-6">
                <div className="flex items-center gap-2 text-xs font-mono text-[#21F1A8] mb-1">
                  <Landmark className="w-4 h-4" />
                  <span>c. 600 BCE · Gandhara</span>
                </div>
                <h4 className="text-lg font-heading font-bold text-white mb-2">
                  Takshashila University
                </h4>
                <p className="text-xs sm:text-sm text-[#A0A0A0] leading-relaxed font-body">
                  Earliest global center of higher learning. 68 specialized disciplines including statecraft (Chanakya), surgery (Charaka lineage), grammar (Panini), and metallurgy.
                </p>
              </div>

              <div className="bg-[#1f1f1f] border border-white/[0.08] rounded-2xl p-6">
                <div className="flex items-center gap-2 text-xs font-mono text-[#21F1A8] mb-1">
                  <Landmark className="w-4 h-4" />
                  <span>c. 427–1197 CE · Magadha</span>
                </div>
                <h4 className="text-lg font-heading font-bold text-white mb-2">
                  Nalanda Mahavihara
                </h4>
                <p className="text-xs sm:text-sm text-[#A0A0A0] leading-relaxed font-body">
                  Premier international residential university hosting 10,000 scholars and 2,000 faculty. Famed for the 9-story Dharma Ganj repository containing thousands of scientific codices.
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Topic Archive Search Mode */
          <div className="space-y-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#21F1A8]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search across treatises, theorems, scholars (e.g. Baudhayana, Aryabhata, Zero, Tridosha)..."
                className="w-full pl-11 pr-4 py-3 bg-[#1f1f1f] border border-white/10 rounded-xl text-sm text-white placeholder:text-[#666666] focus:outline-none focus:border-[#21F1A8]/50"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTopics.map((topic) => (
                <div
                  key={topic.id}
                  className="bg-[#1f1f1f] border border-white/[0.08] rounded-xl p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-mono text-[#21F1A8] uppercase text-[10px]">
                        {topic.category}
                      </span>
                      <span className="text-[11px] text-[#777777] font-mono">
                        {topic.readingTime}
                      </span>
                    </div>

                    <h4 className="text-base font-heading font-bold text-white mb-1">
                      {topic.title}
                    </h4>

                    {topic.sanskritTitle && (
                      <div className="text-xs font-mono text-[#21F1A8] mb-2">
                        {topic.sanskritTitle}
                      </div>
                    )}

                    <p className="text-xs text-[#A0A0A0] leading-relaxed line-clamp-3 mb-4 font-body">
                      {topic.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                    <button
                      onClick={() => {
                        const route: AppRoute = `/${topic.category}` as AppRoute;
                        onNavigate(route);
                      }}
                      className="text-[#21F1A8] hover:underline font-mono"
                    >
                      Open {topic.category} →
                    </button>
                    <button
                      onClick={() => onOpenTutorWithPrompt(`Explain ${topic.title} in Indian Knowledge Systems with primary source evidence.`)}
                      className="text-[#888888] hover:text-white"
                    >
                      Ask AI Tutor
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
