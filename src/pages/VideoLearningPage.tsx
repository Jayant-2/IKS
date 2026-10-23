import React, { useState } from 'react';
import { VIDEO_LESSONS } from '../data/iksData';
import { VideoLesson, AppRoute } from '../types/iks';
import { VideoLearningHub } from '../components/VideoLearningHub';
import { 
  Play, 
  Pause, 
  ArrowLeft, 
  BookOpen, 
  CheckCircle, 
  Clock, 
  Sparkles, 
  GraduationCap 
} from 'lucide-react';

interface VideoLearningPageProps {
  onNavigate: (route: AppRoute) => void;
  onOpenTutorWithPrompt: (prompt: string) => void;
}

export const VideoLearningPage: React.FC<VideoLearningPageProps> = ({ 
  onNavigate, 
  onOpenTutorWithPrompt 
}) => {
  const [selectedLesson, setSelectedLesson] = useState<VideoLesson>(VIDEO_LESSONS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  return (
    <div className="w-full bg-[#171717] min-h-screen py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Breadcrumb */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <button
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-2 text-xs font-mono font-medium text-[#B0B0B0] hover:text-[#21F1A8] transition-colors py-2 px-1 cursor-pointer min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Homepage</span>
          </button>

          <span className="text-xs font-mono text-[#888888]">
            YouTube Learning Hub & Indic Masterclasses
          </span>
        </div>

        {/* Dedicated YouTube Video Learning Hub Section */}
        <VideoLearningHub standalone={true} />

        {/* Preserved Section: Indic University Masterclasses */}
        <div className="pt-8 border-t border-white/[0.08]">
          <div className="text-xs font-mono font-medium uppercase tracking-wider text-[#21F1A8] mb-1.5">
            Scholarly Video Archive
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight mb-2">
            IKS Curriculum Masterclasses
          </h2>
          <p className="text-xs sm:text-sm text-[#A0A0A0] mb-8 font-body">
            In-depth academic lectures on Panini's linguistics, the Kerala calculus school, and Sushruta's surgical treatises.
          </p>
        </div>

        {/* Player & Syllabus Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Video Screen */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Video Viewport Container */}
            <div className="relative rounded-2xl overflow-hidden bg-[#1f1f1f] border border-white/[0.08] aspect-video flex flex-col justify-between shadow-2xl">
              {/* Top metadata overlay */}
              <div className="p-4 sm:p-6 flex items-center justify-between z-10">
                <span className="text-xs font-mono bg-[#171717] px-2.5 py-1 rounded text-[#21F1A8] border border-white/10">
                  {selectedLesson.level} · {selectedLesson.category.toUpperCase()}
                </span>
                <span className="text-xs font-mono text-[#CCCCCC]">
                  {selectedLesson.duration}
                </span>
              </div>

              {/* Play / Pause Center Trigger */}
              <div className="flex flex-col items-center justify-center z-10">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  aria-label={isPlaying ? 'Pause video' : 'Play video'}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#21F1A8] text-[#171717] flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 sm:w-8 sm:h-8 fill-current" />
                  ) : (
                    <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-current ml-1" />
                  )}
                </button>
                <div className="text-xs font-mono text-white mt-3 bg-black/60 px-3 py-1 rounded-full">
                  {isPlaying ? 'Playing Lesson Stream' : 'Click to Play'}
                </div>
              </div>

              {/* Bottom Scrubber */}
              <div className="p-4 sm:p-6 bg-gradient-to-t from-[#171717] to-transparent z-10">
                <div className="flex items-center justify-between text-xs font-mono text-[#CCCCCC] mb-2">
                  <span className="text-[#21F1A8] truncate max-w-[280px]">
                    Chapter {activeChapterIndex + 1}: {selectedLesson.chapters[activeChapterIndex]}
                  </span>
                  <span>12:45 / {selectedLesson.duration}</span>
                </div>
                <div className="h-1.5 w-full bg-[#242424] rounded-full overflow-hidden">
                  <div className="h-full bg-[#21F1A8] w-2/5 rounded-full" />
                </div>
              </div>
            </div>

            {/* Lesson Details */}
            <div className="bg-[#1f1f1f] border border-white/[0.08] rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#888888] font-mono">
                <span>Faculty: <strong className="text-white font-medium">{selectedLesson.instructor}</strong></span>
                <span>Source: <em className="text-[#CCCCCC]">{selectedLesson.sourceReference}</em></span>
              </div>

              <h2 className="text-xl sm:text-2xl font-heading font-bold text-white">
                {selectedLesson.title}
              </h2>

              <p className="text-xs sm:text-sm text-[#A0A0A0] leading-relaxed font-body">
                {selectedLesson.description}
              </p>

              {/* Chapter Scrub Buttons */}
              <div className="pt-4 border-t border-white/[0.08]">
                <h4 className="text-xs font-mono text-[#888888] uppercase tracking-wider mb-3">
                  Syllabus Chapters
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedLesson.chapters.map((chap, cIdx) => (
                    <button
                      key={cIdx}
                      onClick={() => setActiveChapterIndex(cIdx)}
                      className={`text-left p-3 rounded-xl border text-xs flex items-center justify-between transition-colors cursor-pointer ${
                        activeChapterIndex === cIdx
                          ? 'bg-[#242424] text-[#21F1A8] border-[#21F1A8]/40 font-semibold'
                          : 'bg-[#171717] text-[#A0A0A0] border-white/[0.06] hover:text-white'
                      }`}
                    >
                      <span className="truncate pr-2">{cIdx + 1}. {chap}</span>
                      {activeChapterIndex === cIdx && <CheckCircle className="w-3.5 h-3.5 text-[#21F1A8] shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={() => onOpenTutorWithPrompt(`Explain chapter "${selectedLesson.chapters[activeChapterIndex]}" from ${selectedLesson.title}`)}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#21F1A8] hover:underline"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ask AI Tutor About This Chapter</span>
                </button>
              </div>
            </div>

          </div>

          {/* Playlist Sidebar */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#888888] mb-2">
              All Courses
            </h3>

            {VIDEO_LESSONS.map((lesson) => {
              const isSelected = lesson.id === selectedLesson.id;
              return (
                <div
                  key={lesson.id}
                  onClick={() => {
                    setSelectedLesson(lesson);
                    setActiveChapterIndex(0);
                    setIsPlaying(false);
                  }}
                  className={`p-4 rounded-xl cursor-pointer border transition-all ${
                    isSelected
                      ? 'bg-[#1f1f1f] border-[#21F1A8]/50 shadow-md'
                      : 'bg-[#171717] border-white/[0.06] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-mono text-[#21F1A8] uppercase text-[10px]">
                      {lesson.category}
                    </span>
                    <span className="font-mono text-[#777777] text-[11px]">{lesson.duration}</span>
                  </div>

                  <h4 className={`text-sm font-heading font-bold mb-1.5 ${isSelected ? 'text-white' : 'text-[#CCCCCC]'}`}>
                    {lesson.title}
                  </h4>

                  <div className="text-[11px] text-[#888888] font-body truncate">
                    {lesson.instructor}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
};
