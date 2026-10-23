import React, { useState, useMemo } from 'react';
import { SEARCHABLE_TOPICS, IKS_SUBJECTS } from '../data/iksData';
import { SearchableTopic, IksCategory, SubjectPortal } from '../types/iks';
import { Search, Filter, BookOpen, Clock, ArrowRight, Sparkles, Check } from 'lucide-react';

interface TopicExplorerDashboardProps {
  onSelectSubjectById: (categoryId: IksCategory) => void;
  onOpenTutorWithPrompt: (prompt: string) => void;
}

export const TopicExplorerDashboard: React.FC<TopicExplorerDashboardProps> = ({ 
  onSelectSubjectById,
  onOpenTutorWithPrompt
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<IksCategory | 'all'>('all');
  const [selectedTopic, setSelectedTopic] = useState<SearchableTopic | null>(null);

  const filteredTopics = useMemo(() => {
    return SEARCHABLE_TOPICS.filter((topic) => {
      const matchesCategory = selectedCategory === 'all' || topic.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        topic.title.toLowerCase().includes(q) ||
        (topic.sanskritTitle && topic.sanskritTitle.toLowerCase().includes(q)) ||
        topic.summary.toLowerCase().includes(q) ||
        topic.tags.some(t => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <section 
      id="explorer" 
      className="relative py-28 px-6 bg-gradient-to-b from-[#030712] via-[#05091a] to-[#02050f] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-3 px-3 py-1 bg-amber-500/10 rounded-full border border-amber-400/20">
            <span>Knowledge Discovery Engine</span>
            <span aria-hidden="true">·</span>
            <span>Manuscript Database</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-medium text-white tracking-tight mb-4 text-balance">
            Explore India's Intellectual Archive
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans text-balance">
            Search across Vedic, Classical, and Medieval treatises. Filter by discipline, discovery era, and core technical contributions.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="max-w-4xl mx-auto mb-10 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search treatises, theorems, scholars (e.g. Baudhayana, Aryabhata, Tridosha, Panini, Zero)..."
              className="w-full pl-12 pr-4 py-3.5 bg-white/[0.04] hover:bg-white/[0.06] focus:bg-white/[0.08] border border-white/15 focus:border-amber-400/50 rounded-2xl text-slate-100 placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/20 backdrop-blur-xl transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs (Interactive buttons) */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'all', label: 'All Disciplines' },
              { id: 'mathematics', label: 'Mathematics' },
              { id: 'astronomy', label: 'Astronomy' },
              { id: 'ayurveda', label: 'Ayurveda' },
              { id: 'philosophy', label: 'Philosophy' },
              { id: 'literature', label: 'Linguistics & Epics' },
              { id: 'architecture', label: 'Architecture' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-xl transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40 shadow-sm'
                    : 'bg-white/[0.02] border border-white/5 text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Grid */}
        {filteredTopics.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTopics.map((topic) => (
              <div
                key={topic.id}
                onClick={() => setSelectedTopic(topic)}
                tabIndex={0}
                role="button"
                aria-label={`Inspect ${topic.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setSelectedTopic(topic);
                }}
                className="group p-6 rounded-2xl spatial-glass border border-white/10 hover:border-amber-400/40 transition-all duration-300 hover:shadow-xl hover:shadow-amber-950/30 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-mono text-amber-400 uppercase text-[10px] tracking-wider">
                      {topic.category}
                    </span>
                    <span className="flex items-center gap-1 text-slate-500 font-mono text-[11px]">
                      <Clock className="w-3 h-3" />
                      {topic.readingTime}
                    </span>
                  </div>

                  {topic.sanskritTitle && (
                    <div className="text-xs font-serif text-amber-300/80 mb-1">
                      {topic.sanskritTitle}
                    </div>
                  )}

                  <h3 className="text-lg font-display font-medium text-white group-hover:text-amber-200 transition-colors mb-2">
                    {topic.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-4">
                    {topic.summary}
                  </p>
                </div>

                <div>
                  {/* Clean unboxed tags with typographic separator */}
                  <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-400 mb-4 pt-3 border-t border-white/[0.06]">
                    {topic.tags.slice(0, 3).map((tag, tIdx) => (
                      <React.Fragment key={tag}>
                        <span>{tag}</span>
                        {tIdx < 2 && <span aria-hidden="true" className="text-slate-600">·</span>}
                      </React.Fragment>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-amber-400 font-semibold group-hover:translate-x-1 transition-transform">
                    <span>Inspect Treatise</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center spatial-glass rounded-2xl border border-white/10 max-w-md mx-auto">
            <BookOpen className="w-8 h-8 text-amber-400/60 mx-auto mb-3" />
            <h4 className="text-base font-display text-white mb-1">No matching topics found</h4>
            <p className="text-xs text-slate-400 mb-4">Try searching for "Zero", "Aryabhata", "Sulba", or "Tridosha".</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="px-4 py-2 text-xs font-medium bg-amber-400 text-slate-950 rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Selected Topic Quick Modal */}
        {selectedTopic && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in"
            onClick={() => setSelectedTopic(null)}
          >
            <div 
              className="spatial-glass-glow rounded-3xl p-8 max-w-xl w-full border border-amber-400/40 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-1">
                    {selectedTopic.category} · Era: {selectedTopic.era}
                  </div>
                  {selectedTopic.sanskritTitle && (
                    <div className="text-sm font-serif text-amber-200">
                      {selectedTopic.sanskritTitle}
                    </div>
                  )}
                  <h3 className="text-2xl font-display font-medium text-white">
                    {selectedTopic.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedTopic(null)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center text-sm font-mono"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>

              <p className="text-sm text-slate-200 leading-relaxed mb-6">
                {selectedTopic.summary}
              </p>

              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-slate-300 space-y-2 mb-6">
                <div className="font-semibold text-amber-300">Subject Portal Connection:</div>
                <p>
                  This topic forms part of the verified Indian Knowledge Systems curriculum. Access the complete subject portal to examine original Sanskrit shlokas, diagrams, and historical evidence.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-end gap-3">
                <button
                  onClick={() => {
                    const prompt = `Can you provide a deep-dive scholarly explanation of ${selectedTopic.title} (${selectedTopic.sanskritTitle || ''}) in Indian Knowledge Systems? Include key verses, scholar attributions, and modern relevance.`;
                    setSelectedTopic(null);
                    onOpenTutorWithPrompt(prompt);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-amber-300 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 rounded-xl transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ask AI Tutor</span>
                </button>
                <button
                  onClick={() => {
                    const catId = selectedTopic.category;
                    setSelectedTopic(null);
                    onSelectSubjectById(catId);
                  }}
                  className="px-5 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-md transition-all"
                >
                  Open Full Subject Portal
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Continue Exploring Final Action Banner */}
        <div className="mt-20 p-10 rounded-3xl spatial-glass border border-amber-400/30 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-display font-medium text-white mb-3">
              Deepen Your Journey into Indian Wisdom
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-6 font-sans">
              Connect directly with our AI Manuscript Sage or delve into the complete syllabus of foundational treatises.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => onOpenTutorWithPrompt('What are the foundational texts every student of Indian Knowledge Systems should study first?')}
                className="px-6 py-3 text-sm font-semibold text-slate-950 bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-200 hover:to-amber-400 rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Start AI Mentorship Session</span>
              </button>
              <a
                href="#portals"
                className="px-6 py-3 text-sm font-medium text-white bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 rounded-xl transition-all"
              >
                Return to 3D Portals
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
