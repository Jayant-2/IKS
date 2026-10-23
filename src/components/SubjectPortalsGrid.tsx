import React from 'react';
import { IKS_SUBJECTS } from '../data/iksData';
import { AppRoute, IksCategory } from '../types/iks';
import { 
  Calculator, 
  Compass, 
  BookOpen, 
  Leaf, 
  Scroll, 
  ArrowRight 
} from 'lucide-react';

interface SubjectPortalsGridProps {
  onNavigate: (route: AppRoute) => void;
}

export const SubjectPortalsGrid: React.FC<SubjectPortalsGridProps> = ({ onNavigate }) => {
  const getSubjectIcon = (id: IksCategory) => {
    switch (id) {
      case 'mathematics': 
        return <Calculator className="w-5 h-5 text-[#21F1A8]" />;
      case 'astronomy': 
        return <Compass className="w-5 h-5 text-[#21F1A8]" />;
      case 'philosophy': 
        return <BookOpen className="w-5 h-5 text-[#21F1A8]" />;
      case 'ayurveda': 
        return <Leaf className="w-5 h-5 text-[#21F1A8]" />;
      case 'literature': 
        return <Scroll className="w-5 h-5 text-[#21F1A8]" />;
    }
  };

  const getRouteForSubject = (id: IksCategory): AppRoute => {
    switch (id) {
      case 'mathematics': return '/mathematics';
      case 'astronomy': return '/astronomy';
      case 'philosophy': return '/philosophy';
      case 'ayurveda': return '/ayurveda';
      case 'literature': return '/literature';
    }
  };

  return (
    <section className="w-full bg-[#171717] py-14 px-4 sm:px-6 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-mono font-medium uppercase tracking-wider text-[#21F1A8] mb-1.5">
              Knowledge Portals
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">
              Five Foundational Disciplines
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#999999] max-w-md">
            Select a discipline to enter its dedicated learning area with primary treatises, historical scholars, and interactive simulators.
          </p>
        </div>

        {/* Five Subject Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {IKS_SUBJECTS.map((subject, idx) => {
            const route = getRouteForSubject(subject.id);

            return (
              <div
                key={subject.id}
                onClick={() => onNavigate(route)}
                tabIndex={0}
                role="button"
                aria-label={`Open ${subject.title} learning area`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onNavigate(route);
                  }
                }}
                className="group relative bg-[#1f1f1f] hover:bg-[#242424] border border-white/[0.08] hover:border-[#21F1A8]/40 rounded-2xl p-6 transition-all duration-200 cursor-pointer flex flex-col justify-between shadow-lg shadow-black/20 hover:shadow-black/40 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#21F1A8]"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#171717] border border-white/10 flex items-center justify-center group-hover:border-[#21F1A8]/40 transition-colors">
                      {getSubjectIcon(subject.id)}
                    </div>
                    <span className="text-xs font-mono font-medium text-[#777777]">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Sanskrit name */}
                  <div className="text-xs font-mono text-[#21F1A8] mb-1">
                    {subject.sanskritTitle}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-heading font-bold text-white group-hover:text-[#21F1A8] transition-colors mb-2">
                    {subject.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-[#A0A0A0] leading-relaxed line-clamp-3 mb-6 font-body">
                    {subject.summary}
                  </p>
                </div>

                {/* Card Action */}
                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-medium text-[#21F1A8]">
                  <span>Explore Subject</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
