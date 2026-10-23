import React from 'react';
import { AppRoute } from '../types/iks';
import { 
  BookOpen, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Award, 
  Layers,
  Sparkles 
} from 'lucide-react';

interface TestYourKnowledgeSectionProps {
  onNavigate: (route: AppRoute) => void;
}

export const TestYourKnowledgeSection: React.FC<TestYourKnowledgeSectionProps> = ({ onNavigate }) => {
  return (
    <section className="w-full bg-[#171717] py-20 px-4 sm:px-6 lg:px-8 border-t border-white/[0.08]">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#21F1A8]/10 border border-[#21F1A8]/20 text-[#21F1A8] text-xs font-mono font-medium tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Assessment</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-heading">
            Test Your Knowledge
          </h2>
          <p className="text-sm sm:text-base text-white/70 leading-relaxed">
            Validate and deepen your understanding of ancient Indian sciences, logic, mathematics, and philosophy through structured quizzes and exam simulations.
          </p>
        </div>

        {/* 2 Main Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Card 1: Quiz Center */}
          <div className="p-8 rounded-3xl bg-[#1f1f1f] border border-white/10 hover:border-[#21F1A8]/40 transition-all duration-300 flex flex-col justify-between group shadow-lg">
            <div className="space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-[#21F1A8]/10 border border-[#21F1A8]/30 text-[#21F1A8] flex items-center justify-center group-hover:scale-105 transition-transform">
                <BookOpen className="w-7 h-7" />
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#21F1A8] font-semibold block mb-1">
                  Topic-Wise Learning
                </span>
                <h3 className="text-2xl font-bold text-white group-hover:text-[#21F1A8] transition-colors mb-2">
                  Interactive Quiz Center
                </h3>
                <p className="text-sm text-white/65 leading-relaxed">
                  Practice questions one at a time with instantaneous feedback. Explore verified citations from canonical treatises like Baudhayana Sulba Sutras, Aryabhatiya, and Charaka Samhita.
                </p>
              </div>

              {/* Feature list */}
              <ul className="space-y-2.5 text-xs text-white/75 font-mono pt-2 border-t border-white/5">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#21F1A8] shrink-0" />
                  <span>Immediate answer verification & explanations</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#21F1A8] shrink-0" />
                  <span>Beginner, Intermediate & Advanced levels</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#21F1A8] shrink-0" />
                  <span>Filtered across all 5 core IKS disciplines</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <button
                onClick={() => onNavigate('/quizzes')}
                className="w-full py-3.5 px-6 rounded-xl bg-[#21F1A8] hover:bg-[#1ee09b] text-[#171717] font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-[0.98] min-h-[48px]"
              >
                <span>Take a Quiz</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 2: Mock Test Center */}
          <div className="p-8 rounded-3xl bg-[#1f1f1f] border border-white/10 hover:border-[#21F1A8]/40 transition-all duration-300 flex flex-col justify-between group shadow-lg">
            <div className="space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 text-[#21F1A8] flex items-center justify-center group-hover:scale-105 transition-transform">
                <Clock className="w-7 h-7" />
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#21F1A8] font-semibold block mb-1">
                  Timed Exam Simulator
                </span>
                <h3 className="text-2xl font-bold text-white group-hover:text-[#21F1A8] transition-colors mb-2">
                  Mock Test Center
                </h3>
                <p className="text-sm text-white/65 leading-relaxed">
                  Simulate real competitive exam conditions. Test your multidisciplinary recall under time limits with a full question palette, pause control, and post-exam analytics.
                </p>
              </div>

              {/* Feature list */}
              <ul className="space-y-2.5 text-xs text-white/75 font-mono pt-2 border-t border-white/5">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#21F1A8] shrink-0" />
                  <span>Interactive question palette & review tagging</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#21F1A8] shrink-0" />
                  <span>Customizable test lengths (5 to 20 questions)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#21F1A8] shrink-0" />
                  <span>In-depth subject-wise accuracy scorecard</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <button
                onClick={() => onNavigate('/mock-tests')}
                className="w-full py-3.5 px-6 rounded-xl bg-[#242424] hover:bg-[#2c2c2c] text-white border border-[#21F1A8]/40 hover:border-[#21F1A8] font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-[0.98] min-h-[48px]"
              >
                <span>Start a Mock Test</span>
                <ArrowRight className="w-4 h-4 text-[#21F1A8]" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
