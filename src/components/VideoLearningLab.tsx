import React, { useState } from 'react';
import { VIDEO_LESSONS } from '../data/iksData';
import { VideoLesson } from '../types/iks';
import { 
  Play, 
  Pause, 
  Sparkles, 
  Sliders, 
  Volume2, 
  Maximize2, 
  BookmarkCheck, 
  CheckCircle, 
  ListOrdered, 
  GraduationCap 
} from 'lucide-react';
import { 
  BaudhayanaSimulator, 
  TridoshaSimulator, 
  MeruPrastaraSimulator 
} from './InteractiveSimulators';

interface VideoLearningLabProps {
  onOpenTutorWithPrompt?: (prompt: string) => void;
}

export const VideoLearningLab: React.FC<VideoLearningLabProps> = ({ onOpenTutorWithPrompt }) => {
  const [selectedLesson, setSelectedLesson] = useState<VideoLesson>(VIDEO_LESSONS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'video' | 'simulation'>('video');
  const [activeSim, setActiveSim] = useState<'baudhayana' | 'tridosha' | 'meru'>('baudhayana');

  return (
    <section 
      id="learning" 
      className="relative py-28 px-6 bg-gradient-to-b from-[#040816] via-[#050a1b] to-[#030712] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/[0.08] pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-2">
              <span>Classroom of the Ancients</span>
              <span aria-hidden="true">·</span>
              <span>Vision Pro Spatial Lab</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-medium text-white tracking-tight">
              Immersive Video Learning & Concept Labs
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-xl mt-3 leading-relaxed">
              Step into cinematic, chaptered masterclasses grounded in primary manuscripts, paired with live mathematical and Ayurvedic interactive simulators.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-white/[0.04] border border-white/10 rounded-xl backdrop-blur-md self-start md:self-end">
            <button
              onClick={() => setActiveTab('video')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-all ${
                activeTab === 'video' 
                  ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40 shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              <span>Video Masterclasses</span>
            </button>
            <button
              onClick={() => setActiveTab('simulation')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-all ${
                activeTab === 'simulation' 
                  ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40 shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Interactive Simulators</span>
            </button>
          </div>
        </div>

        {activeTab === 'video' ? (
          /* Video Learning Experience */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Main Video Cinema Screen */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              
              {/* Cinema Player Container */}
              <div className="relative rounded-3xl overflow-hidden spatial-glass border border-white/15 aspect-video flex flex-col justify-between group shadow-2xl shadow-amber-950/30">
                {/* Background image & gradient overlay */}
                <div className="absolute inset-0 bg-[#030712] overflow-hidden">
                  <img 
                    src="/assets/aistudio/WhatsApp_Image_2026-10-23_at_2.52.15_PM_97def166.jpeg"
                    alt={selectedLesson.title}
                    className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? 'scale-105 opacity-40' : 'opacity-60 group-hover:scale-102'}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/50 to-transparent" />
                </div>

                {/* Top Overlay Badge */}
                <div className="relative z-10 p-6 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs font-mono">
                    <span className="px-2.5 py-1 rounded bg-black/60 border border-white/10 text-amber-300">
                      {selectedLesson.level}
                    </span>
                    <span className="text-slate-300">{selectedLesson.duration}</span>
                  </div>

                  <button 
                    onClick={() => {
                      if (onOpenTutorWithPrompt) {
                        onOpenTutorWithPrompt(`Explain chapter: ${selectedLesson.chapters[currentChapterIndex]} from ${selectedLesson.title}`);
                      }
                    }}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/20 border border-amber-400/30 text-amber-200 text-xs font-medium hover:bg-amber-500/30 transition-colors"
                  >
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>Ask Tutor About This</span>
                  </button>
                </div>

                {/* Center Play Button */}
                <div className="relative z-10 flex flex-col items-center justify-center">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                    className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 text-slate-950 flex items-center justify-center shadow-2xl shadow-amber-500/40 hover:scale-110 active:scale-95 transition-all group-hover:ring-4 group-hover:ring-amber-400/30"
                  >
                    {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
                  </button>
                  <span className="text-xs font-mono text-slate-200 mt-3 drop-shadow bg-black/40 px-3 py-0.5 rounded-full">
                    {isPlaying ? 'Streaming Session Preview' : 'Click to Play Lesson'}
                  </span>
                </div>

                {/* Bottom Scrub Bar & Controls */}
                <div className="relative z-10 p-6 bg-gradient-to-t from-[#030712] to-transparent">
                  <div className="flex items-center justify-between text-xs text-slate-300 mb-2">
                    <span className="font-mono text-amber-300">
                      Chapter {currentChapterIndex + 1}: {selectedLesson.chapters[currentChapterIndex]}
                    </span>
                    <span className="font-mono">14:12 / {selectedLesson.duration}</span>
                  </div>

                  {/* Scrubber track */}
                  <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden cursor-pointer relative">
                    <div className="h-full bg-gradient-to-r from-amber-400 to-amber-300 w-3/5 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Lesson Overview & Pedagogy Card */}
              <div className="p-8 rounded-3xl spatial-glass border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
                    Primary Source Reference: {selectedLesson.sourceReference}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Instructor: {selectedLesson.instructor}
                  </span>
                </div>

                <h3 className="text-2xl font-display font-medium text-white mb-3">
                  {selectedLesson.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6 font-sans">
                  {selectedLesson.description}
                </p>

                {/* Chapter List */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                    <ListOrdered className="w-4 h-4 text-amber-400" />
                    <span>Lesson Syllabus & Chapters</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedLesson.chapters.map((chap, cIdx) => (
                      <button
                        key={cIdx}
                        onClick={() => setCurrentChapterIndex(cIdx)}
                        className={`text-left p-3 rounded-xl border text-xs flex items-center justify-between transition-all ${
                          currentChapterIndex === cIdx 
                            ? 'bg-amber-400/15 border-amber-400/40 text-amber-200 font-semibold shadow-sm' 
                            : 'bg-white/[0.02] border-white/5 text-slate-300 hover:bg-white/[0.05]'
                        }`}
                      >
                        <span className="truncate pr-2">{cIdx + 1}. {chap}</span>
                        {currentChapterIndex === cIdx && <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Playlist Sidebar */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              <div className="flex items-center justify-between pb-2 text-xs font-mono text-slate-400 uppercase tracking-wider">
                <span>Select Course (5 Masterclasses)</span>
              </div>

              {VIDEO_LESSONS.map((lesson) => {
                const isCurrent = lesson.id === selectedLesson.id;
                return (
                  <div
                    key={lesson.id}
                    onClick={() => {
                      setSelectedLesson(lesson);
                      setCurrentChapterIndex(0);
                      setIsPlaying(false);
                    }}
                    className={`p-5 rounded-2xl cursor-pointer border transition-all duration-200 ${
                      isCurrent 
                        ? 'spatial-glass-glow border-amber-400/50 shadow-lg shadow-amber-950/30' 
                        : 'spatial-glass-subtle border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5 text-xs">
                      <span className="font-mono text-amber-400 uppercase text-[10px] tracking-wider">
                        {lesson.category}
                      </span>
                      <span className="font-mono text-slate-400">{lesson.duration}</span>
                    </div>

                    <h4 className={`text-sm font-display font-medium line-clamp-2 ${isCurrent ? 'text-white' : 'text-slate-200'}`}>
                      {lesson.title}
                    </h4>

                    <div className="text-[11px] text-slate-400 mt-2 truncate">
                      {lesson.instructor}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        ) : (
          /* Interactive Simulation Lab View */
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveSim('baudhayana')}
                className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all ${
                  activeSim === 'baudhayana' 
                    ? 'bg-amber-400 text-slate-950 border-amber-300' 
                    : 'bg-white/[0.04] text-slate-300 border-white/10 hover:bg-white/[0.08]'
                }`}
              >
                Baudhayana Altar Geometry
              </button>
              <button
                onClick={() => setActiveSim('tridosha')}
                className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all ${
                  activeSim === 'tridosha' 
                    ? 'bg-emerald-400 text-slate-950 border-emerald-300' 
                    : 'bg-white/[0.04] text-slate-300 border-white/10 hover:bg-white/[0.08]'
                }`}
              >
                Tridosha Balance Matrix
              </button>
              <button
                onClick={() => setActiveSim('meru')}
                className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all ${
                  activeSim === 'meru' 
                    ? 'bg-amber-400 text-slate-950 border-amber-300' 
                    : 'bg-white/[0.04] text-slate-300 border-white/10 hover:bg-white/[0.08]'
                }`}
              >
                Meru Prastara (Pingala Combinatorics)
              </button>
            </div>

            {activeSim === 'baudhayana' && <BaudhayanaSimulator />}
            {activeSim === 'tridosha' && <TridoshaSimulator />}
            {activeSim === 'meru' && <MeruPrastaraSimulator />}
          </div>
        )}

      </div>
    </section>
  );
};
