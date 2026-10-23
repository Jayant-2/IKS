import React, { useState, useEffect } from 'react';
import { getStudyData, formatDuration, getTodaySeconds, getWeeklySeconds } from '../services/storage';
import { StudyTrackerData } from '../types/iks';
import { Clock, Target, Calendar, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

interface StudyTrackerPreviewProps {
  onOpenTracker: () => void;
}

export const StudyTrackerPreview: React.FC<StudyTrackerPreviewProps> = ({ onOpenTracker }) => {
  const [data, setData] = useState<StudyTrackerData>({
    sessions: [],
    goals: { dailyMinutes: 30, weeklyHours: 3.5 },
    completedTopics: []
  });

  useEffect(() => {
    setData(getStudyData());
  }, []);

  const todaySecs = getTodaySeconds(data.sessions);
  const weeklySecs = getWeeklySeconds(data.sessions);
  const dailyGoalSecs = data.goals.dailyMinutes * 60;
  const weeklyGoalSecs = data.goals.weeklyHours * 3600;

  const dailyProgressPct = Math.min(100, Math.round((todaySecs / Math.max(1, dailyGoalSecs)) * 100));
  const weeklyProgressPct = Math.min(100, Math.round((weeklySecs / Math.max(1, weeklyGoalSecs)) * 100));

  return (
    <section className="w-full bg-[#171717] py-14 px-4 sm:px-6 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        
        {/* Compact Card Container */}
        <div className="bg-[#1f1f1f] border border-white/[0.08] rounded-2xl p-6 sm:p-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/[0.08]">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-medium text-[#21F1A8] uppercase tracking-wider mb-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>Personal Learning Ledger</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight">
                Study Tracker Preview
              </h2>
            </div>

            <button
              onClick={onOpenTracker}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#171717] bg-[#21F1A8] hover:bg-[#21F1A8]/90 active:scale-95 rounded-xl transition-all self-start md:self-auto min-h-[44px] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#21F1A8]"
            >
              <span>Open Study Tracker</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 4 Metric Columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6">
            
            {/* Metric 1: Today's study time */}
            <div className="bg-[#242424] p-4 rounded-xl border border-white/[0.06]">
              <span className="text-xs font-medium text-[#888888] block mb-1">
                Today's Study Time
              </span>
              <div className="text-xl sm:text-2xl font-heading font-bold text-white">
                {formatDuration(todaySecs)}
              </div>
              <span className="text-[11px] text-[#A0A0A0] mt-1 block">
                {todaySecs === 0 ? 'No session started yet' : `${dailyProgressPct}% of daily goal`}
              </span>
            </div>

            {/* Metric 2: Daily Goal */}
            <div className="bg-[#242424] p-4 rounded-xl border border-white/[0.06]">
              <span className="text-xs font-medium text-[#888888] block mb-1">
                Daily Goal
              </span>
              <div className="text-xl sm:text-2xl font-heading font-bold text-white">
                {data.goals.dailyMinutes}m
              </div>
              <div className="w-full bg-[#171717] h-1.5 rounded-full overflow-hidden mt-2">
                <div 
                  className="bg-[#21F1A8] h-full rounded-full transition-all duration-300"
                  style={{ width: `${dailyProgressPct}%` }}
                />
              </div>
            </div>

            {/* Metric 3: Weekly Progress */}
            <div className="bg-[#242424] p-4 rounded-xl border border-white/[0.06]">
              <span className="text-xs font-medium text-[#888888] block mb-1">
                Weekly Learning
              </span>
              <div className="text-xl sm:text-2xl font-heading font-bold text-white">
                {formatDuration(weeklySecs)} <span className="text-xs font-normal text-[#888888]">/ {data.goals.weeklyHours}h</span>
              </div>
              <div className="w-full bg-[#171717] h-1.5 rounded-full overflow-hidden mt-2">
                <div 
                  className="bg-[#21F1A8] h-full rounded-full transition-all duration-300"
                  style={{ width: `${weeklyProgressPct}%` }}
                />
              </div>
            </div>

            {/* Metric 4: Topics Completed */}
            <div className="bg-[#242424] p-4 rounded-xl border border-white/[0.06]">
              <span className="text-xs font-medium text-[#888888] block mb-1">
                Topics Completed
              </span>
              <div className="text-xl sm:text-2xl font-heading font-bold text-[#21F1A8]">
                {data.completedTopics.length}
              </div>
              <span className="text-[11px] text-[#A0A0A0] mt-1 block">
                {data.completedTopics.length === 0 ? 'Start exploring subjects' : 'Verified masteries'}
              </span>
            </div>

          </div>

          {/* Privacy & Storage Notice */}
          <div className="flex items-center gap-2 pt-4 border-t border-white/[0.06] text-xs text-[#888888] font-body">
            <ShieldCheck className="w-4 h-4 text-[#21F1A8] shrink-0" />
            <span>Progress is stored on the current device until account synchronization is implemented.</span>
          </div>

        </div>

      </div>
    </section>
  );
};
