import React, { useState } from 'react';
import { IKS_SUBJECTS } from '../data/iksData';
import { AppRoute, IksCategory } from '../types/iks';
import { 
  ArrowLeft, 
  Sparkles, 
  BookOpen, 
  FileText, 
  ChevronRight, 
  Compass, 
  CheckCircle2, 
  Award,
  Layers
} from 'lucide-react';
import { 
  BaudhayanaSimulator, 
  TridoshaSimulator, 
  MeruPrastaraSimulator 
} from '../components/InteractiveSimulators';

interface SubjectDetailPageProps {
  categoryId: IksCategory;
  onNavigate: (route: AppRoute) => void;
  onOpenTutorWithPrompt: (prompt: string) => void;
}

export const SubjectDetailPage: React.FC<SubjectDetailPageProps> = ({
  categoryId,
  onNavigate,
  onOpenTutorWithPrompt,
}) => {
  const subject = IKS_SUBJECTS.find((s) => s.id === categoryId) || IKS_SUBJECTS[0];
  const [activeTab, setActiveTab] = useState<'overview' | 'scholars' | 'simulator' | 'manuscripts'>('overview');

  return (
    <div className="w-full bg-[#171717] min-h-screen py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Navigation Breadcrumb / Back Action */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.08]">
          <button
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-2 text-xs font-mono font-medium text-[#B0B0B0] hover:text-[#21F1A8] transition-colors py-2 px-1 cursor-pointer min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Knowledge Portals</span>
          </button>

          <button
            onClick={() => {
              const prompt = `Can you provide a deep-dive scholarly tutorial on ${subject.title} (${subject.sanskritTitle}) in Indian Knowledge Systems? Please highlight foundational treatises, key scholars, and modern scientific relevance.`;
              onOpenTutorWithPrompt(prompt);
            }}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#171717] bg-[#21F1A8] hover:bg-[#21F1A8]/90 rounded-xl transition-all cursor-pointer shadow-md shadow-[#21F1A8]/20"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Consult AI Tutor</span>
          </button>
        </div>

        {/* Hero Banner for Subject */}
        <div className="bg-[#1f1f1f] border border-white/[0.08] rounded-2xl p-6 sm:p-10 mb-8 relative overflow-hidden shadow-xl">
          <div className="flex items-center gap-2 text-xs font-mono text-[#21F1A8] mb-2 uppercase tracking-wider">
            <span>Primary Shastra</span>
            <span aria-hidden="true">·</span>
            <span>{subject.sanskritTitle}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-heading font-bold text-white tracking-tight mb-3">
            {subject.title}
          </h1>

          <p className="text-sm sm:text-base text-[#B0B0B0] max-w-2xl mb-6 font-body leading-relaxed">
            {subject.tagline}. {subject.summary}
          </p>

          {/* Primary Sanskrit Shloka Box */}
          <div className="bg-[#242424] border border-white/[0.08] rounded-xl p-5 text-left">
            <div className="flex items-center justify-between text-xs font-mono text-[#21F1A8] mb-2">
              <span>Foundational Verse</span>
              <span className="text-[#888888]">{subject.verse.source}</span>
            </div>
            <p className="font-heading font-semibold text-white text-base sm:text-lg mb-2 leading-relaxed">
              {subject.verse.sanskrit}
            </p>
            <p className="text-xs font-mono text-[#A0A0A0] italic mb-3">
              {subject.verse.transliteration}
            </p>
            <div className="pt-3 border-t border-white/[0.08] text-xs sm:text-sm text-[#CCCCCC] font-body leading-relaxed">
              "{subject.verse.english}"
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 p-1.5 bg-[#1f1f1f] border border-white/[0.08] rounded-xl mb-8 overflow-x-auto">
          {[
            { id: 'overview', label: 'Core Discoveries' },
            { id: 'scholars', label: `Historical Scholars (${subject.keyScholars.length})` },
            { id: 'simulator', label: 'Interactive Lab & Simulator' },
            { id: 'manuscripts', label: 'Archival Manuscripts' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-all cursor-pointer min-h-[44px] ${
                activeTab === tab.id
                  ? 'bg-[#242424] text-[#21F1A8] font-semibold border border-white/10 shadow-sm'
                  : 'text-[#888888] hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content 1: Core Discoveries */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <h2 className="text-xl font-heading font-bold text-white mb-4">
              Breakthrough Contributions to World Science
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subject.coreDiscoveries.map((disc, idx) => (
                <div
                  key={idx}
                  className="bg-[#1f1f1f] border border-white/[0.08] rounded-xl p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="text-[11px] font-mono text-[#21F1A8] mb-1">
                      {disc.era}
                    </div>
                    <h3 className="text-base font-heading font-bold text-white mb-2">
                      {disc.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#A0A0A0] leading-relaxed mb-4 font-body">
                      {disc.description}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-white/[0.06] text-xs text-[#888888] font-mono">
                    <span className="text-[#21F1A8]">Global Relevance:</span> {disc.modernRelevance}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content 2: Scholars */}
        {activeTab === 'scholars' && (
          <div className="space-y-4">
            <h2 className="text-xl font-heading font-bold text-white mb-4">
              Renowned Indic Scholars & Masters
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subject.keyScholars.map((scholar, idx) => (
                <div
                  key={idx}
                  className="bg-[#1f1f1f] border border-white/[0.08] rounded-xl p-5 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-xs font-mono text-[#21F1A8]">
                        {scholar.sanskritName}
                      </div>
                      <h3 className="text-lg font-heading font-bold text-white">
                        {scholar.name}
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono text-[#A0A0A0] bg-[#242424] px-2 py-0.5 rounded border border-white/[0.06]">
                      {scholar.era}
                    </span>
                  </div>

                  <div className="text-xs text-[#888888] font-mono">
                    <span>Academy:</span> <span className="text-white">{scholar.location}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#B0B0B0] leading-relaxed font-body">
                    {scholar.contribution}
                  </p>

                  <div className="pt-2 border-t border-white/[0.06] text-[11px] font-mono text-[#21F1A8]">
                    Treatises: {scholar.works.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content 3: Simulators */}
        {activeTab === 'simulator' && (
          <div className="space-y-6">
            {subject.id === 'mathematics' && (
              <>
                <BaudhayanaSimulator />
                <MeruPrastaraSimulator />
              </>
            )}

            {subject.id === 'ayurveda' && (
              <TridoshaSimulator />
            )}

            {subject.id === 'astronomy' && (
              <div className="bg-[#1f1f1f] rounded-2xl p-6 sm:p-8 border border-white/[0.08] space-y-6">
                <div>
                  <span className="text-xs font-mono font-medium text-[#21F1A8] uppercase tracking-wider">
                    Goladhyaya & Khagola Shastra
                  </span>
                  <h3 className="text-xl font-heading font-bold text-white mt-1">
                    Celestial Mechanics & Gola Yantra Parameters
                  </h3>
                  <p className="text-xs sm:text-sm text-[#A0A0A0] mt-2 leading-relaxed">
                    Ancient Indian astronomers modeled planetary orbits and lunar mansions (27 Nakshatras) using precision brass armillary spheres (Gola Yantras) and trigonometry.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-[#242424] p-4 rounded-xl border border-white/[0.06]">
                    <div className="text-xs text-[#888888] font-mono">Sidereal Year</div>
                    <div className="text-lg font-heading font-bold text-[#21F1A8] mt-1">365.25636 d</div>
                    <div className="text-[11px] text-[#A0A0A0] mt-1">Surya Siddhanta (differs by 1.4 min from modern atomic clocks)</div>
                  </div>

                  <div className="bg-[#242424] p-4 rounded-xl border border-white/[0.06]">
                    <div className="text-xs text-[#888888] font-mono">Diurnal Rotation</div>
                    <div className="text-lg font-heading font-bold text-[#21F1A8] mt-1">Earth's Axis</div>
                    <div className="text-[11px] text-[#A0A0A0] mt-1">Aryabhata 499 CE: boat on river metaphor</div>
                  </div>

                  <div className="bg-[#242424] p-4 rounded-xl border border-white/[0.06]">
                    <div className="text-xs text-[#888888] font-mono">Lunar Mansions</div>
                    <div className="text-lg font-heading font-bold text-[#21F1A8] mt-1">27 Nakshatras</div>
                    <div className="text-[11px] text-[#A0A0A0] mt-1">13°20' arc segments along the ecliptic</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#242424] border border-white/[0.06] text-xs text-[#CCCCCC] leading-relaxed">
                  <strong className="text-white block mb-1">Observational Apparatus:</strong>
                  The Samrat Yantra and Gola Yantra instruments recorded shadow coordinates down to 2 seconds precision at the historic Jantar Mantar observatories.
                </div>
              </div>
            )}

            {subject.id === 'philosophy' && (
              <div className="bg-[#1f1f1f] rounded-2xl p-6 sm:p-8 border border-white/[0.08] space-y-6">
                <div>
                  <span className="text-xs font-mono font-medium text-[#21F1A8] uppercase tracking-wider">
                    Shad-Darshana Epistemology
                  </span>
                  <h3 className="text-xl font-heading font-bold text-white mt-1">
                    The Six Classical Systems of Valid Knowledge (Pramana)
                  </h3>
                  <p className="text-xs sm:text-sm text-[#A0A0A0] mt-2 leading-relaxed">
                    Compare how each Astika philosophical school establishes epistemology, physical ontology, and consciousness.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: 'Nyaya', focus: 'Formal Logic & Epistemology', pramana: '4 Pramanas (Perception, Inference, Analogy, Testimony)' },
                    { name: 'Vaisheshika', focus: 'Atomic Physics & Categorization', pramana: 'Indivisible Paramanu particles & 9 physical substances' },
                    { name: 'Samkhya', focus: 'Cosmology & Consciousness', pramana: 'Purusha (Awareness) & Prakriti (24 Tattvas of nature)' },
                    { name: 'Yoga', focus: 'Psychology & Mental Control', pramana: 'Ashtanga 8 limbs; Chitta-vritti-nirodha mastery' },
                    { name: 'Mimamsa', focus: 'Linguistic Hermeneutics', pramana: 'Semantics, ethical dharma, and ritual analysis' },
                    { name: 'Vedanta', focus: 'Non-Dual Metaphysics', pramana: 'Brahman-Atman unity & Upanishadic truth' },
                  ].map((darshana, dIdx) => (
                    <div key={dIdx} className="bg-[#242424] p-4 rounded-xl border border-white/[0.06]">
                      <div className="text-sm font-heading font-bold text-[#21F1A8]">{darshana.name}</div>
                      <div className="text-xs text-white font-medium mt-1">{darshana.focus}</div>
                      <div className="text-[11px] text-[#A0A0A0] mt-2 leading-relaxed">{darshana.pramana}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {subject.id === 'literature' && (
              <div className="bg-[#1f1f1f] rounded-2xl p-6 sm:p-8 border border-white/[0.08] space-y-6">
                <div>
                  <span className="text-xs font-mono font-medium text-[#21F1A8] uppercase tracking-wider">
                    Linguistic Algorithms
                  </span>
                  <h3 className="text-xl font-heading font-bold text-white mt-1">
                    Panini's 3,959 Sutras: The World's First Rule Engine
                  </h3>
                  <p className="text-xs sm:text-sm text-[#A0A0A0] mt-2 leading-relaxed">
                    In the 5th century BCE, Panini formalized Sanskrit phonetics and morphology with context-free production rules, variable binding, and recursion that anticipate Backus-Naur Form (BNF).
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#242424] p-4 rounded-xl border border-white/[0.06]">
                    <div className="text-xs font-mono text-[#21F1A8]">Algorithm Architecture</div>
                    <div className="text-sm font-heading font-bold text-white mt-1">Shiva Sutras & Pratyahara</div>
                    <div className="text-xs text-[#A0A0A0] mt-2 leading-relaxed">
                      14 aphorisms organizing sounds phonetically into compressed abbreviation intervals, identical to modern character class regexes.
                    </div>
                  </div>

                  <div className="bg-[#242424] p-4 rounded-xl border border-white/[0.06]">
                    <div className="text-xs font-mono text-[#21F1A8]">Aesthetics Theory</div>
                    <div className="text-sm font-heading font-bold text-white mt-1">Natyashastra (9 Rasas)</div>
                    <div className="text-xs text-[#A0A0A0] mt-2 leading-relaxed">
                      Bharata Muni's systematic psychology of aesthetic delight, classifying universal emotional responses evoked by drama and poetry.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab Content 4: Manuscripts */}
        {activeTab === 'manuscripts' && (
          <div className="space-y-4">
            <h2 className="text-xl font-heading font-bold text-white mb-2">
              Primary Archival Manuscripts
            </h2>
            <p className="text-xs sm:text-sm text-[#A0A0A0] mb-4">
              Physical birch-bark and palm-leaf codices preserved in national and international research repositories:
            </p>
            <div className="space-y-3">
              {subject.manuscripts.map((ms, idx) => (
                <div
                  key={idx}
                  className="bg-[#1f1f1f] border border-white/[0.08] rounded-xl p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-[#21F1A8] shrink-0" />
                    <div>
                      <div className="text-sm font-medium text-white">{ms}</div>
                      <div className="text-[11px] font-mono text-[#777777]">Authenticated Historical Witness</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-[#21F1A8]">Archived</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Test Your Knowledge in this Subject */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-[#1f1f1f] border border-white/10 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#21F1A8]">
                Knowledge Assessment
              </span>
              <h3 className="text-lg sm:text-xl font-heading font-bold text-white mt-1">
                Test Your Mastery of {subject.title}
              </h3>
              <p className="text-xs sm:text-sm text-white/60 mt-1 max-w-xl">
                Ready to evaluate your grasp on {subject.title} treatises, core scholars, and canonical discoveries?
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('/quizzes')}
                className="px-4 py-2.5 rounded-xl bg-[#21F1A8] hover:bg-[#1ee09b] text-[#171717] font-semibold text-xs sm:text-sm transition-all cursor-pointer min-h-[44px] flex items-center gap-2"
              >
                <span>Take {subject.title} Quiz</span>
                <span>→</span>
              </button>
              <button
                onClick={() => onNavigate('/mock-tests')}
                className="px-4 py-2.5 rounded-xl bg-[#282828] hover:bg-[#303030] border border-white/10 text-white font-semibold text-xs sm:text-sm transition-all cursor-pointer min-h-[44px]"
              >
                Timed Mock Test
              </button>
            </div>
          </div>
        </div>

        {/* Next Subject Footer Navigation */}
        <div className="mt-8 pt-6 border-t border-white/[0.08] flex items-center justify-between">
          <button
            onClick={() => onNavigate('/')}
            className="text-xs font-mono text-[#B0B0B0] hover:text-white transition-colors cursor-pointer min-h-[40px] px-2 flex items-center"
          >
            ← Return to Homepage
          </button>
          <button
            onClick={() => onNavigate('/study-tracker')}
            className="text-xs font-mono text-[#21F1A8] hover:underline cursor-pointer min-h-[40px] px-2 flex items-center"
          >
            Log Study Session in Tracker →
          </button>
        </div>

      </div>
    </div>
  );
};
