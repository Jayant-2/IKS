import React, { useState, useEffect, useRef } from 'react';
import { 
  getStudyData, 
  addStudySession, 
  updateStudyGoals, 
  formatDuration, 
  getTodaySeconds, 
  getWeeklySeconds, 
  saveStudyData 
} from '../services/storage';
import { StudyTrackerData, IksCategory, AppRoute } from '../types/iks';
import { 
  Play, 
  Pause, 
  Square, 
  Clock, 
  Calendar, 
  Target, 
  CheckCircle2, 
  Trash2, 
  ArrowLeft, 
  ShieldCheck, 
  BookOpen, 
  RotateCcw,
  Award 
} from 'lucide-react';

interface StudyTrackerPageProps {
  onNavigate: (route: AppRoute) => void;
}

export const StudyTrackerPage: React.FC<StudyTrackerPageProps> = ({ onNavigate }) => {
  const [data, setData] = useState<StudyTrackerData>({
    sessions: [],
    goals: { dailyMinutes: 30, weeklyHours: 3.5 },
    completedTopics: []
  });

  // Timer states
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerPaused, setTimerPaused] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [selectedSubject, setSelectedSubject] = useState<IksCategory>('mathematics');
  const [sessionNotes, setSessionNotes] = useState('');
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Load study tracker data
  useEffect(() => {
    setData(getStudyData());
  }, []);

  // Timer tick
  useEffect(() => {
    if (timerRunning && !timerPaused) {
      timerIntervalRef.current = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [timerRunning, timerPaused]);

  const handleStartTimer = () => {
    setTimerRunning(true);
    setTimerPaused(false);
  };

  const handlePauseTimer = () => {
    setTimerPaused(true);
  };

  const handleResumeTimer = () => {
    setTimerPaused(false);
  };

  const handleStopAndSave = () => {
    if (secondsElapsed > 0) {
      addStudySession(selectedSubject, secondsElapsed, sessionNotes.trim() || undefined);
      setData(getStudyData());
    }
    setTimerRunning(false);
    setTimerPaused(false);
    setSecondsElapsed(0);
    setSessionNotes('');
  };

  const handleResetTimer = () => {
    setTimerRunning(false);
    setTimerPaused(false);
    setSecondsElapsed(0);
  };

  const handleGoalChange = (dailyMinutes: number) => {
    const updated = updateStudyGoals({
      dailyMinutes,
      weeklyHours: Number((dailyMinutes * 7 / 60).toFixed(1)),
    });
    setData((prev) => ({ ...prev, goals: updated }));
  };

  const handleClearSessions = () => {
    if (confirm('Clear all local study sessions from this device?')) {
      const resetData: StudyTrackerData = {
        sessions: [],
        goals: data.goals,
        completedTopics: data.completedTopics,
      };
      saveStudyData(resetData);
      setData(resetData);
    }
  };

  const todaySecs = getTodaySeconds(data.sessions);
  const weeklySecs = getWeeklySeconds(data.sessions);
  const dailyGoalSecs = data.goals.dailyMinutes * 60;
  const weeklyGoalSecs = data.goals.weeklyHours * 3600;

  const dailyPct = Math.min(100, Math.round((todaySecs / Math.max(1, dailyGoalSecs)) * 100));
  const weeklyPct = Math.min(100, Math.round((weeklySecs / Math.max(1, weeklyGoalSecs)) * 100));

  // Format timer display MM:SS or HH:MM:SS
  const formatTimerDisplay = (totalSecs: number) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    if (hrs > 0) {
      return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="w-full bg-[#171717] min-h-screen py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <button
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-2 text-xs font-mono font-medium text-[#B0B0B0] hover:text-[#21F1A8] transition-colors py-2 px-1 cursor-pointer min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Homepage</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-[#888888] font-mono">
            <ShieldCheck className="w-4 h-4 text-[#21F1A8]" />
            <span className="hidden sm:inline">Persisted locally on device</span>
          </div>
        </div>

        {/* Page Title */}
        <div>
          <div className="text-xs font-mono font-medium uppercase tracking-wider text-[#21F1A8] mb-1.5">
            Personal IKS Learning Ledger
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">
            Study Tracker & Goals
          </h1>
          <p className="text-xs sm:text-sm text-[#A0A0A0] mt-1 font-body">
            Track dedicated study time across Indian Mathematics, Astronomy, Philosophy, Ayurveda, and Literature.
          </p>
        </div>

        {/* Interactive Session Timer (The Core Functional Tool) */}
        <div className="bg-[#1f1f1f] border border-white/[0.08] rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
            <div>
              <span className="text-xs font-mono text-[#21F1A8] uppercase tracking-wider">
                Live Session Timer
              </span>
              <h2 className="text-xl font-heading font-bold text-white mt-0.5">
                Focus Session Stopwatch
              </h2>
            </div>

            {/* Subject Selector Dropdown */}
            <div className="flex items-center gap-2">
              <label htmlFor="subject-select" className="text-xs font-mono text-[#888888]">
                Subject:
              </label>
              <select
                id="subject-select"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value as IksCategory)}
                disabled={timerRunning}
                className="bg-[#242424] border border-white/10 text-white rounded-lg px-3 py-2 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-[#21F1A8] disabled:opacity-50"
              >
                <option value="mathematics">Mathematics (गणित)</option>
                <option value="astronomy">Astronomy (खगोल)</option>
                <option value="philosophy">Philosophy (दर्शन)</option>
                <option value="ayurveda">Ayurveda (आयुर्वेद)</option>
                <option value="literature">Literature (साहित्य)</option>
              </select>
            </div>
          </div>

          {/* Big Digital Stopwatch Display */}
          <div className="py-8 text-center flex flex-col items-center">
            <div className="font-mono text-5xl sm:text-7xl font-bold tracking-tight text-white mb-2">
              {formatTimerDisplay(secondsElapsed)}
            </div>
            <div className="text-xs font-mono text-[#888888] uppercase tracking-widest">
              {timerRunning 
                ? timerPaused ? 'Session Paused' : 'Session In Progress' 
                : 'Ready to Begin'}
            </div>

            {/* Optional Topic / Note Input */}
            <input
              type="text"
              value={sessionNotes}
              onChange={(e) => setSessionNotes(e.target.value)}
              placeholder="Session focus (e.g. Baudhayana theorem, Sushruta surgery)..."
              className="mt-6 max-w-md w-full px-4 py-2.5 bg-[#242424] border border-white/10 rounded-xl text-xs text-white placeholder:text-[#666666] focus:outline-none focus:border-[#21F1A8]/50 text-center"
            />
          </div>

          {/* Timer Controls (min 44x44px touch targets) */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-white/[0.08]">
            {!timerRunning ? (
              <button
                onClick={handleStartTimer}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[#171717] bg-[#21F1A8] hover:bg-[#21F1A8]/90 active:scale-95 rounded-xl shadow-lg shadow-[#21F1A8]/20 transition-all min-h-[44px] cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Start Session</span>
              </button>
            ) : (
              <>
                {timerPaused ? (
                  <button
                    onClick={handleResumeTimer}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#171717] bg-[#21F1A8] hover:bg-[#21F1A8]/90 active:scale-95 rounded-xl transition-all min-h-[44px] cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Resume</span>
                  </button>
                ) : (
                  <button
                    onClick={handlePauseTimer}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#242424] hover:bg-[#2c2c2c] border border-white/10 rounded-xl transition-all min-h-[44px] cursor-pointer"
                  >
                    <Pause className="w-4 h-4 fill-current" />
                    <span>Pause</span>
                  </button>
                )}

                <button
                  onClick={handleStopAndSave}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-600 rounded-xl transition-all min-h-[44px] cursor-pointer"
                >
                  <Square className="w-4 h-4 fill-current" />
                  <span>Stop & Save Session</span>
                </button>

                <button
                  onClick={handleResetTimer}
                  className="inline-flex items-center gap-1.5 px-3 py-2.5 text-xs font-mono text-[#888888] hover:text-white rounded-xl transition-colors min-h-[44px] cursor-pointer"
                  title="Discard timer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Goals & Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Daily Goal Card */}
          <div className="bg-[#1f1f1f] border border-white/[0.08] rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-[#888888] mb-2">
                <span>Today's Goal</span>
                <span className="text-[#21F1A8] font-bold">{dailyPct}%</span>
              </div>
              <div className="text-3xl font-heading font-bold text-white mb-1">
                {formatDuration(todaySecs)}
              </div>
              <div className="text-xs text-[#888888] font-mono">
                Target: {data.goals.dailyMinutes} minutes / day
              </div>

              <div className="w-full bg-[#242424] h-2 rounded-full overflow-hidden mt-4">
                <div 
                  className="bg-[#21F1A8] h-full rounded-full transition-all duration-300"
                  style={{ width: `${dailyPct}%` }}
                />
              </div>
            </div>

            {/* Goal Preset Selector */}
            <div className="pt-4 mt-6 border-t border-white/[0.06] flex items-center justify-between gap-1 text-[11px] font-mono">
              <span className="text-[#888888]">Adjust:</span>
              {[15, 30, 45, 60].map((mins) => (
                <button
                  key={mins}
                  onClick={() => handleGoalChange(mins)}
                  className={`px-2 py-1 rounded transition-colors ${
                    data.goals.dailyMinutes === mins
                      ? 'bg-[#21F1A8] text-[#171717] font-bold'
                      : 'bg-[#242424] text-[#A0A0A0] hover:text-white'
                  }`}
                >
                  {mins}m
                </button>
              ))}
            </div>
          </div>

          {/* Weekly Goal Card */}
          <div className="bg-[#1f1f1f] border border-white/[0.08] rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-[#888888] mb-2">
                <span>Weekly Cumulative</span>
                <span className="text-[#21F1A8] font-bold">{weeklyPct}%</span>
              </div>
              <div className="text-3xl font-heading font-bold text-white mb-1">
                {formatDuration(weeklySecs)}
              </div>
              <div className="text-xs text-[#888888] font-mono">
                Target: {data.goals.weeklyHours} hours / week
              </div>

              <div className="w-full bg-[#242424] h-2 rounded-full overflow-hidden mt-4">
                <div 
                  className="bg-[#21F1A8] h-full rounded-full transition-all duration-300"
                  style={{ width: `${weeklyPct}%` }}
                />
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-white/[0.06] text-xs text-[#888888] font-body">
              Calculated across the rolling 7-day learning window.
            </div>
          </div>

          {/* Activity Streak / History Summary */}
          <div className="bg-[#1f1f1f] border border-white/[0.08] rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-[#888888] mb-2">
                Total Sessions Logged
              </div>
              <div className="text-3xl font-heading font-bold text-[#21F1A8] mb-1">
                {data.sessions.length}
              </div>
              <div className="text-xs text-[#888888] font-mono">
                Lifetime focus: {formatDuration(data.sessions.reduce((a, b) => a + b.durationSeconds, 0))}
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-white/[0.06] flex items-center justify-between">
              <span className="text-xs text-[#888888]">Mastered Topics</span>
              <span className="text-xs font-mono font-bold text-white bg-[#242424] px-2 py-0.5 rounded">
                {data.completedTopics.length} completed
              </span>
            </div>
          </div>

        </div>

        {/* Completed Sessions Log (Empty State if none) */}
        <div className="bg-[#1f1f1f] border border-white/[0.08] rounded-2xl p-6 sm:p-8">
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
            <h3 className="text-lg font-heading font-bold text-white">
              Session History
            </h3>
            {data.sessions.length > 0 && (
              <button
                onClick={handleClearSessions}
                className="text-xs font-mono text-[#888888] hover:text-red-400 flex items-center gap-1 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear History</span>
              </button>
            )}
          </div>

          {data.sessions.length === 0 ? (
            /* Helpful empty state for new users - NO fabricated data */
            <div className="py-12 text-center max-w-sm mx-auto">
              <Clock className="w-10 h-10 text-[#555555] mx-auto mb-3" />
              <h4 className="text-base font-heading font-bold text-white mb-1">
                No Study Sessions Logged Yet
              </h4>
              <p className="text-xs text-[#888888] leading-relaxed mb-4 font-body">
                Start your first study session with the stopwatch above or explore the subject pages to build your learning record.
              </p>
              <button
                onClick={handleStartTimer}
                className="px-4 py-2 text-xs font-semibold text-[#171717] bg-[#21F1A8] hover:bg-[#21F1A8]/90 rounded-lg transition-all"
              >
                Begin 25-Minute Session
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {data.sessions.map((sess) => (
                <div
                  key={sess.id}
                  className="bg-[#242424] border border-white/[0.06] rounded-xl p-4 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-[#171717] text-[#21F1A8] flex items-center justify-center font-bold uppercase text-[10px] font-mono">
                      {sess.subject.slice(0, 3)}
                    </span>
                    <div>
                      <div className="font-heading font-bold text-white capitalize">
                        {sess.subject} {sess.topic ? `— ${sess.topic}` : ''}
                      </div>
                      <div className="text-[11px] font-mono text-[#888888]">
                        {new Date(sess.timestamp).toLocaleDateString([], {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="font-mono text-sm font-bold text-[#21F1A8]">
                    {formatDuration(sess.durationSeconds)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Assessment & Examination Ledger */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Quizzes Record */}
          <div className="bg-[#1f1f1f] border border-white/[0.08] rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#21F1A8]" />
                <h3 className="text-base font-heading font-bold text-white">
                  Completed Quizzes ({data.quizResults?.length || 0})
                </h3>
              </div>
              <button
                onClick={() => onNavigate('/quizzes')}
                className="text-xs font-mono text-[#21F1A8] hover:underline cursor-pointer"
              >
                + New Quiz
              </button>
            </div>

            {(!data.quizResults || data.quizResults.length === 0) ? (
              <div className="py-8 text-center text-xs text-white/50 space-y-2">
                <p>No quiz attempts logged yet.</p>
                <button
                  onClick={() => onNavigate('/quizzes')}
                  className="px-3 py-1.5 rounded-lg bg-[#242424] hover:bg-[#2e2e2e] text-[#21F1A8] border border-white/5 font-semibold transition-all cursor-pointer"
                >
                  Take Your First Quiz
                </button>
              </div>
            ) : (
              <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                {data.quizResults.map((qr) => (
                  <div
                    key={qr.id}
                    className="p-3 rounded-xl bg-[#242424] border border-white/5 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-semibold text-white line-clamp-1">{qr.topicTitle}</div>
                      <div className="text-[10px] font-mono text-white/50 capitalize">
                        {qr.subject} • {new Date(qr.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                    <div className="text-right shrink-0 ml-3">
                      <div className="font-mono font-bold text-[#21F1A8]">{qr.percentage}%</div>
                      <div className="text-[10px] font-mono text-white/40">{qr.score}/{qr.total}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Mock Tests Record */}
          <div className="bg-[#1f1f1f] border border-white/[0.08] rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#21F1A8]" />
                <h3 className="text-base font-heading font-bold text-white">
                  Mock Test Records ({data.mockTestResults?.length || 0})
                </h3>
              </div>
              <button
                onClick={() => onNavigate('/mock-tests')}
                className="text-xs font-mono text-[#21F1A8] hover:underline cursor-pointer"
              >
                + New Test
              </button>
            </div>

            {(!data.mockTestResults || data.mockTestResults.length === 0) ? (
              <div className="py-8 text-center text-xs text-white/50 space-y-2">
                <p>No mock test simulations recorded yet.</p>
                <button
                  onClick={() => onNavigate('/mock-tests')}
                  className="px-3 py-1.5 rounded-lg bg-[#242424] hover:bg-[#2e2e2e] text-[#21F1A8] border border-white/5 font-semibold transition-all cursor-pointer"
                >
                  Start a Mock Test
                </button>
              </div>
            ) : (
              <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                {data.mockTestResults.map((tr) => (
                  <div
                    key={tr.id}
                    className="p-3 rounded-xl bg-[#242424] border border-white/5 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-semibold text-white capitalize">
                        {tr.subject === 'mixed' ? 'Mixed Disciplines Test' : `${tr.subject} Test`}
                      </div>
                      <div className="text-[10px] font-mono text-white/50">
                        {Math.floor(tr.timeTakenSeconds / 60)}m {tr.timeTakenSeconds % 60}s • {new Date(tr.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                    <div className="text-right shrink-0 ml-3">
                      <div className="font-mono font-bold text-[#21F1A8]">{tr.percentage}%</div>
                      <div className="text-[10px] font-mono text-white/40">{tr.correctCount}/{tr.totalQuestions}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
