import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Clock,
  Pause,
  Play,
  CheckCircle2,
  XCircle,
  HelpCircle,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Award,
  BookOpen,
  Filter,
  Layers,
  ChevronRight,
  Sparkles,
  BarChart3,
  Bookmark,
  Check,
  Eye,
  AlertCircle
} from 'lucide-react';
import { AppRoute, IksCategory, QuizDifficulty, QuizQuestion, MockTestResult, MockTestConfig } from '../types/iks';
import { IKS_QUIZ_QUESTIONS } from '../data/quizQuestions';
import { addMockTestResult, getStudyData } from '../services/storage';

interface MockTestCenterPageProps {
  onNavigate: (route: AppRoute) => void;
  initialSubject?: IksCategory | 'mixed';
}

type TestPhase = 'setup' | 'active' | 'paused' | 'submitted';

export const MockTestCenterPage: React.FC<MockTestCenterPageProps> = ({
  onNavigate,
  initialSubject = 'mixed'
}) => {
  // Test Configuration State
  const [configSubject, setConfigSubject] = useState<IksCategory | 'mixed'>(initialSubject);
  const [configDifficulty, setConfigDifficulty] = useState<'all' | QuizDifficulty>('all');
  const [configLength, setConfigLength] = useState<number>(10);
  
  // Phase & Active Test State
  const [phase, setPhase] = useState<TestPhase>('setup');
  const [testQuestions, setTestQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Timer State
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState(0);
  const [totalTimeSeconds, setTotalTimeSeconds] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Result state
  const [testResult, setTestResult] = useState<MockTestResult | null>(null);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'incorrect' | 'correct' | 'unanswered'>('all');

  // Calculate available question pool based on filters
  const availableQuestions = useMemo(() => {
    return IKS_QUIZ_QUESTIONS.filter((q) => {
      const matchSubject = configSubject === 'mixed' || q.subject === configSubject;
      const matchDifficulty = configDifficulty === 'all' || q.difficulty === configDifficulty;
      return matchSubject && matchDifficulty;
    });
  }, [configSubject, configDifficulty]);

  // Max selectable length
  const maxSelectableLength = Math.min(25, availableQuestions.length);

  // Auto adjust length if available pool is smaller
  useEffect(() => {
    if (configLength > availableQuestions.length && availableQuestions.length > 0) {
      setConfigLength(availableQuestions.length);
    }
  }, [availableQuestions.length, configLength]);

  // Timer effect
  useEffect(() => {
    if (phase === 'active') {
      timerRef.current = setInterval(() => {
        setTimeRemainingSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleFinalSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase]);

  // Start Test
  const handleStartTest = () => {
    if (availableQuestions.length === 0) return;

    // Shuffle available questions
    const shuffled = [...availableQuestions].sort(() => Math.random() - 0.5);
    const chosen = shuffled.slice(0, Math.min(configLength, availableQuestions.length));

    // Calculate time: 1.5 minutes per question
    const durationSeconds = Math.max(5, chosen.length * 90);

    setTestQuestions(chosen);
    setCurrentIndex(0);
    setUserAnswers({});
    setMarkedForReview({});
    setTimeRemainingSeconds(durationSeconds);
    setTotalTimeSeconds(durationSeconds);
    setShowSubmitModal(false);
    setPhase('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle selection
  const handleOptionSelect = (optionIndex: number) => {
    const q = testQuestions[currentIndex];
    if (!q) return;

    // If clicking same, allow toggling off or keep
    setUserAnswers((prev) => ({
      ...prev,
      [q.id]: optionIndex
    }));
  };

  const handleClearResponse = () => {
    const q = testQuestions[currentIndex];
    if (!q) return;
    setUserAnswers((prev) => {
      const copy = { ...prev };
      delete copy[q.id];
      return copy;
    });
  };

  const handleToggleMark = () => {
    const q = testQuestions[currentIndex];
    if (!q) return;
    setMarkedForReview((prev) => ({
      ...prev,
      [q.id]: !prev[q.id]
    }));
  };

  // Submission
  const handleFinalSubmit = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setShowSubmitModal(false);

    let correctCount = 0;
    let incorrectCount = 0;
    let unansweredCount = 0;
    const topicBreakdown: Record<string, { correct: number; total: number }> = {};

    testQuestions.forEach((q) => {
      const sub = q.subject;
      if (!topicBreakdown[sub]) {
        topicBreakdown[sub] = { correct: 0, total: 0 };
      }
      topicBreakdown[sub].total += 1;

      const userPick = userAnswers[q.id];
      if (userPick === undefined) {
        unansweredCount += 1;
      } else if (userPick === q.correctIndex) {
        correctCount += 1;
        topicBreakdown[sub].correct += 1;
      } else {
        incorrectCount += 1;
      }
    });

    const total = testQuestions.length;
    const answeredCount = total - unansweredCount;
    const score = correctCount;
    const percentage = Math.round((correctCount / total) * 100);
    const timeTakenSeconds = totalTimeSeconds - timeRemainingSeconds;

    const savedResult = addMockTestResult({
      subject: configSubject,
      totalQuestions: total,
      answeredCount,
      correctCount,
      incorrectCount,
      unansweredCount,
      score,
      percentage,
      timeTakenSeconds,
      topicBreakdown,
      questions: testQuestions,
      userAnswers,
    });

    setTestResult(savedResult);
    setPhase('submitted');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentQ = testQuestions[currentIndex];
  const answeredCountTotal = Object.keys(userAnswers).length;
  const unansweredCountTotal = testQuestions.length - answeredCountTotal;

  return (
    <div className="min-h-screen bg-[#171717] text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">

        {/* =========================================================================
            PHASE 1: TEST CONFIGURATION & INSTRUCTIONS
           ========================================================================= */}
        {phase === 'setup' && (
          <div className="space-y-10">
            {/* Top Navigation Back to Dashboard */}
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <button
                onClick={() => onNavigate('/')}
                className="inline-flex items-center gap-2 text-xs font-mono font-medium text-[#B0B0B0] hover:text-[#21F1A8] transition-colors py-2 px-1 cursor-pointer min-h-[44px]"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>← Back to Spatial Dashboard</span>
              </button>
              <button
                onClick={() => onNavigate('/quizzes')}
                className="text-xs font-mono text-[#21F1A8] hover:underline"
              >
                Quiz Center →
              </button>
            </div>

            {/* Header */}
            <div className="border-b border-white/10 pb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#21F1A8]/10 border border-[#21F1A8]/20 text-[#21F1A8] text-xs font-mono font-medium tracking-wider uppercase mb-4">
                <Clock className="w-3.5 h-3.5" />
                <span>Exam Simulator</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
                Mock Test Center
              </h1>
              <p className="text-white/70 max-w-2xl text-base sm:text-lg leading-relaxed">
                Experience realistic, exam-style practice across Indian Knowledge Systems. Timed tests, questions navigator, review tags, and in-depth performance analytics.
              </p>
            </div>

            {/* Config Box */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#1f1f1f] border border-white/10 space-y-8">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#21F1A8]" />
                <span>Configure Your Test</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 1. Subject */}
                <div className="space-y-3">
                  <label className="text-xs font-mono uppercase tracking-wider text-white/60 block">
                    1. Subject Domain
                  </label>
                  <div className="space-y-2">
                    {([
                      { id: 'mixed', label: 'Mixed (All Disciplines)' },
                      { id: 'mathematics', label: 'Mathematics' },
                      { id: 'astronomy', label: 'Astronomy' },
                      { id: 'philosophy', label: 'Philosophy' },
                      { id: 'ayurveda', label: 'Ayurveda (Educational)' },
                      { id: 'literature', label: 'Literature & Linguistics' },
                    ] as const).map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => setConfigSubject(sub.id)}
                        className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer min-h-[44px] flex items-center justify-between ${
                          configSubject === sub.id
                            ? 'bg-[#21F1A8]/10 border-[#21F1A8] text-white'
                            : 'bg-[#171717] border-white/5 text-white/70 hover:border-white/20'
                        }`}
                      >
                        <span>{sub.label}</span>
                        {configSubject === sub.id && (
                          <Check className="w-4 h-4 text-[#21F1A8]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Question Count */}
                <div className="space-y-3">
                  <label className="text-xs font-mono uppercase tracking-wider text-white/60 block">
                    2. Question Length
                  </label>
                  <div className="space-y-2">
                    {[5, 10, 15, 20].map((count) => {
                      const isDisabled = count > availableQuestions.length;
                      return (
                        <button
                          key={count}
                          disabled={isDisabled}
                          onClick={() => setConfigLength(count)}
                          className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all min-h-[44px] flex items-center justify-between ${
                            isDisabled
                              ? 'opacity-40 cursor-not-allowed bg-[#171717]/40 border-white/5 text-white/30'
                              : configLength === count
                              ? 'bg-[#21F1A8]/10 border-[#21F1A8] text-white cursor-pointer'
                              : 'bg-[#171717] border-white/5 text-white/70 hover:border-white/20 cursor-pointer'
                          }`}
                        >
                          <div>
                            <div className="font-semibold text-white">{count} Questions</div>
                            <div className="text-[11px] text-white/50 font-mono">
                              ≈ {Math.round((count * 90) / 60)} minutes
                            </div>
                          </div>
                          {configLength === count && (
                            <Check className="w-4 h-4 text-[#21F1A8]" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                  <div className="text-[11px] font-mono text-white/50 pt-1">
                    Available in selected pool: {availableQuestions.length} questions
                  </div>
                </div>

                {/* 3. Difficulty */}
                <div className="space-y-3">
                  <label className="text-xs font-mono uppercase tracking-wider text-white/60 block">
                    3. Target Difficulty
                  </label>
                  <div className="space-y-2">
                    {([
                      { id: 'all', label: 'All Levels (Standard Mix)' },
                      { id: 'beginner', label: 'Beginner (Foundations)' },
                      { id: 'intermediate', label: 'Intermediate (Classical)' },
                      { id: 'advanced', label: 'Advanced (Mathematical/Deep)' },
                    ] as const).map((diff) => (
                      <button
                        key={diff.id}
                        onClick={() => setConfigDifficulty(diff.id)}
                        className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer min-h-[44px] flex items-center justify-between ${
                          configDifficulty === diff.id
                            ? 'bg-[#21F1A8]/10 border-[#21F1A8] text-white'
                            : 'bg-[#171717] border-white/5 text-white/70 hover:border-white/20'
                        }`}
                      >
                        <span>{diff.label}</span>
                        {configDifficulty === diff.id && (
                          <Check className="w-4 h-4 text-[#21F1A8]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Ayurveda Disclaimer if Ayurveda selected */}
              {configSubject === 'ayurveda' && (
                <div className="p-4 rounded-xl bg-[#171717] border border-white/10 flex items-start gap-3 text-xs text-white/70">
                  <AlertCircle className="w-4 h-4 text-[#21F1A8] shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-white">Educational Disclaimer:</strong> Ayurveda mock test questions reflect ancient classical texts (Charaka & Sushruta) for academic study only.
                  </p>
                </div>
              )}

              {/* Instructions Box */}
              <div className="p-5 rounded-xl bg-[#171717] border border-white/5 space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#21F1A8] font-bold">
                  Test Instructions & Rules
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="text-[#21F1A8]">•</span>
                    <span><strong>Exam Integrity:</strong> Answers and explanations are hidden until final submission.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#21F1A8]">•</span>
                    <span><strong>Navigation:</strong> Move freely between questions using the question palette.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#21F1A8]">•</span>
                    <span><strong>Flexibility:</strong> Change answers or clear responses anytime before submitting.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#21F1A8]">•</span>
                    <span><strong>Timer & Pause:</strong> The timer auto-submits at 00:00. Pausing temporarily masks the questions.</span>
                  </li>
                </ul>
              </div>

              {/* Action */}
              <div className="pt-2">
                <button
                  onClick={handleStartTest}
                  disabled={availableQuestions.length === 0}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#21F1A8] hover:bg-[#1ee09b] text-[#171717] font-bold text-base transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-[0.99] min-h-[48px]"
                >
                  <Play className="w-5 h-5 fill-current" />
                  <span>Start Mock Test ({Math.min(configLength, availableQuestions.length)} Questions)</span>
                </button>
              </div>
            </div>

            {/* Quick Link to Quizzes */}
            <div className="p-6 rounded-2xl bg-[#1f1f1f] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="text-base font-bold text-white">Prefer learning one question at a time with instant answers?</h4>
                <p className="text-xs text-white/60">Try our topic-wise Quiz Center with immediate feedback and citations.</p>
              </div>
              <button
                onClick={() => onNavigate('/quizzes')}
                className="px-5 py-2.5 rounded-xl bg-transparent hover:bg-white/5 border border-white/20 hover:border-[#21F1A8] text-[#21F1A8] text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap min-h-[44px]"
              >
                Go to Quiz Center →
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            PHASE 2 & 3: ACTIVE & PAUSED TEST PLAYER
           ========================================================================= */}
        {(phase === 'active' || phase === 'paused') && currentQ && (
          <div className="space-y-6">
            
            {/* Top Control Bar */}
            <div className="p-4 rounded-2xl bg-[#1f1f1f] border border-white/10 flex flex-wrap items-center justify-between gap-4 sticky top-20 z-20 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono uppercase tracking-wider text-white/50 hidden sm:inline">
                  Subject:
                </span>
                <span className="px-2.5 py-1 rounded-md text-xs font-mono uppercase tracking-wide bg-white/5 text-[#21F1A8] border border-[#21F1A8]/20">
                  {configSubject === 'mixed' ? 'Mixed Disciplines' : configSubject}
                </span>
              </div>

              {/* Timer & Controls */}
              <div className="flex items-center gap-4">
                {/* Countdown display */}
                <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-mono text-sm sm:text-base font-bold border transition-colors ${
                  timeRemainingSeconds < 180
                    ? 'bg-rose-950/40 text-rose-300 border-rose-500/50 animate-pulse'
                    : 'bg-[#171717] text-[#21F1A8] border-[#21F1A8]/30'
                }`}>
                  <Clock className="w-4 h-4" />
                  <span>{formatTime(timeRemainingSeconds)}</span>
                </div>

                {/* Pause Button */}
                <button
                  onClick={() => setPhase(phase === 'active' ? 'paused' : 'active')}
                  className="p-2.5 rounded-xl bg-[#171717] hover:bg-[#282828] border border-white/10 text-white/80 hover:text-white transition-all cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
                  title={phase === 'active' ? 'Pause Test' : 'Resume Test'}
                >
                  {phase === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current text-[#21F1A8]" />}
                </button>

                {/* Finish / Submit */}
                <button
                  onClick={() => setShowSubmitModal(true)}
                  className="px-4 py-2 rounded-xl bg-[#21F1A8] hover:bg-[#1ee09b] text-[#171717] font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-sm active:scale-95 min-h-[40px]"
                >
                  Submit Test
                </button>
              </div>
            </div>

            {/* If Paused, overlay banner */}
            {phase === 'paused' ? (
              <div className="p-12 rounded-3xl bg-[#1f1f1f] border border-white/10 text-center space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
                  <Pause className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white">Test is Paused</h3>
                  <p className="text-sm text-white/60 max-w-md mx-auto">
                    The timer is stopped and questions are masked to maintain examination integrity. Click resume when you are ready to continue.
                  </p>
                </div>
                <button
                  onClick={() => setPhase('active')}
                  className="px-6 py-3 rounded-xl bg-[#21F1A8] hover:bg-[#1ee09b] text-[#171717] font-bold text-sm transition-all inline-flex items-center gap-2 cursor-pointer min-h-[44px]"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Resume Test</span>
                </button>
              </div>
            ) : (
              /* Active Test View */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Main Question Panel (8 cols) */}
                <div className="lg:col-span-8 space-y-6">
                  <div className="p-6 sm:p-8 rounded-2xl bg-[#1f1f1f] border border-white/10 shadow-lg space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono uppercase tracking-wider text-white/50">
                          Question {currentIndex + 1} of {testQuestions.length}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wide bg-white/5 text-[#21F1A8] border border-[#21F1A8]/20">
                          {currentQ.subject}
                        </span>
                      </div>

                      {/* Bookmark / Mark for Review */}
                      <button
                        onClick={handleToggleMark}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer min-h-[32px] ${
                          markedForReview[currentQ.id]
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : 'bg-white/5 text-white/60 hover:text-white border border-transparent'
                        }`}
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                        <span>{markedForReview[currentQ.id] ? 'Marked for Review' : 'Mark for Review'}</span>
                      </button>
                    </div>

                    {/* Question text */}
                    <h2 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
                      {currentQ.question}
                    </h2>

                    {/* Options list */}
                    <div className="space-y-3 pt-2">
                      {currentQ.options.map((option, idx) => {
                        const isSelected = userAnswers[currentQ.id] === idx;

                        return (
                          <button
                            key={idx}
                            onClick={() => handleOptionSelect(idx)}
                            className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-start gap-3 min-h-[48px] cursor-pointer ${
                              isSelected
                                ? 'bg-[#21F1A8]/10 border-[#21F1A8] text-white'
                                : 'bg-[#171717] border-white/10 hover:border-white/20 text-white/80 hover:bg-[#222222]'
                            }`}
                          >
                            <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5 ${
                              isSelected
                                ? 'bg-[#21F1A8] text-[#171717]'
                                : 'bg-white/5 text-white/70'
                            }`}>
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span className="text-sm sm:text-base leading-snug flex-1 pt-1">
                              {option}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Clear selection button */}
                    {userAnswers[currentQ.id] !== undefined && (
                      <div className="pt-2 text-right">
                        <button
                          onClick={handleClearResponse}
                          className="text-xs font-mono text-white/40 hover:text-rose-400 transition-colors cursor-pointer"
                        >
                          Clear Response
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Navigation Controls */}
                  <div className="flex items-center justify-between gap-4">
                    <button
                      onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                      disabled={currentIndex === 0}
                      className={`px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all flex items-center gap-2 min-h-[44px] ${
                        currentIndex === 0
                          ? 'opacity-40 cursor-not-allowed border-white/5 text-white/40'
                          : 'border-white/10 hover:border-white/20 text-white cursor-pointer bg-[#1f1f1f]'
                      }`}
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Previous</span>
                    </button>

                    <button
                      onClick={() => {
                        if (currentIndex < testQuestions.length - 1) {
                          setCurrentIndex((prev) => prev + 1);
                        } else {
                          setShowSubmitModal(true);
                        }
                      }}
                      className="px-6 py-2.5 rounded-xl bg-[#21F1A8] hover:bg-[#1ee09b] text-[#171717] font-bold text-sm transition-all flex items-center gap-2 cursor-pointer shadow-sm min-h-[44px]"
                    >
                      <span>{currentIndex === testQuestions.length - 1 ? 'Review & Submit' : 'Next Question'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Right Question Navigator Palette (4 cols) */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="p-6 rounded-2xl bg-[#1f1f1f] border border-white/10 space-y-5">
                    <div className="flex items-center justify-between border-b border-white/5 pb-3">
                      <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                        Question Palette
                      </h4>
                      <span className="text-xs font-mono text-[#21F1A8]">
                        {answeredCountTotal}/{testQuestions.length} Done
                      </span>
                    </div>

                    {/* Palette Grid */}
                    <div className="grid grid-cols-5 gap-2">
                      {testQuestions.map((q, idx) => {
                        const isCurrent = currentIndex === idx;
                        const isAnswered = userAnswers[q.id] !== undefined;
                        const isMarked = markedForReview[q.id];

                        let btnStyles = 'bg-[#171717] border-white/10 text-white/60';
                        if (isCurrent) {
                          btnStyles = 'border-[#21F1A8] text-white ring-2 ring-[#21F1A8]/30 font-bold bg-[#282828]';
                        } else if (isAnswered) {
                          btnStyles = 'bg-[#21F1A8]/20 border-[#21F1A8]/60 text-[#21F1A8] font-semibold';
                        } else if (isMarked) {
                          btnStyles = 'bg-amber-500/20 border-amber-500/50 text-amber-300';
                        }

                        return (
                          <button
                            key={q.id}
                            onClick={() => setCurrentIndex(idx)}
                            className={`h-10 rounded-lg border text-xs font-mono transition-all flex items-center justify-center cursor-pointer relative ${btnStyles}`}
                          >
                            <span>{idx + 1}</span>
                            {isMarked && (
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 absolute top-1 right-1" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Legend */}
                    <div className="pt-3 border-t border-white/5 space-y-2 text-[11px] font-mono text-white/60">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded bg-[#21F1A8]/20 border border-[#21F1A8]/60 inline-block" />
                        <span>Answered ({answeredCountTotal})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded bg-[#171717] border border-white/10 inline-block" />
                        <span>Unanswered ({unansweredCountTotal})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded bg-amber-500/20 border border-amber-500/50 inline-block" />
                        <span>Marked for Review ({Object.values(markedForReview).filter(Boolean).length})</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            CONFIRM SUBMISSION MODAL
           ========================================================================= */}
        {showSubmitModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-md p-6 rounded-2xl bg-[#1f1f1f] border border-white/10 space-y-5">
              <div className="w-12 h-12 rounded-xl bg-[#21F1A8]/10 border border-[#21F1A8]/30 text-[#21F1A8] flex items-center justify-center">
                <HelpCircle className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-1">
                  Ready to submit your test?
                </h3>
                <p className="text-xs text-white/60">
                  Once submitted, your responses will be scored and you will receive a comprehensive breakdown.
                </p>
              </div>

              {/* Status summary */}
              <div className="p-4 rounded-xl bg-[#171717] border border-white/5 space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between text-white/80">
                  <span>Total Questions:</span>
                  <span className="font-bold text-white">{testQuestions.length}</span>
                </div>
                <div className="flex items-center justify-between text-[#21F1A8]">
                  <span>Answered:</span>
                  <span className="font-bold">{answeredCountTotal}</span>
                </div>
                <div className="flex items-center justify-between text-amber-300">
                  <span>Unanswered:</span>
                  <span className="font-bold">{unansweredCountTotal}</span>
                </div>
                <div className="flex items-center justify-between text-white/60">
                  <span>Time Remaining:</span>
                  <span className="font-bold">{formatTime(timeRemainingSeconds)}</span>
                </div>
              </div>

              {unansweredCountTotal > 0 && (
                <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-500/30 text-amber-200 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
                  <span>You still have {unansweredCountTotal} unanswered questions.</span>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setShowSubmitModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-white/10 hover:border-white/20 text-white text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer min-h-[44px]"
                >
                  Continue Test
                </button>
                <button
                  onClick={handleFinalSubmit}
                  className="flex-1 py-2.5 rounded-xl bg-[#21F1A8] hover:bg-[#1ee09b] text-[#171717] font-bold text-xs font-mono uppercase tracking-wider transition-all cursor-pointer min-h-[44px]"
                >
                  Confirm & Submit
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            PHASE 4: SUBMITTED TEST SCORE REPORT & IN-DEPTH REVIEW
           ========================================================================= */}
        {phase === 'submitted' && testResult && (
          <div className="space-y-10">
            {/* Scorecard Hero */}
            <div className="p-8 sm:p-10 rounded-3xl bg-[#1f1f1f] border border-white/10 text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-[#21F1A8]/10 border border-[#21F1A8]/30 text-[#21F1A8] flex items-center justify-center mx-auto">
                <Award className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#21F1A8] block mb-1">
                  Mock Examination Complete
                </span>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-2">
                  {testResult.percentage}%
                </h2>
                <p className="text-sm text-white/60">
                  {testResult.percentage >= 80 
                    ? 'Outstanding Mastery! Exceptional proficiency in Indian Knowledge Systems.' 
                    : testResult.percentage >= 60 
                    ? 'Commendable Performance! Solid conceptual grasp of the core treatises.' 
                    : 'Good Effort! Review the canonical citations below to reinforce your understanding.'}
                </p>
              </div>

              {/* High-level metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto pt-2">
                <div className="p-4 rounded-xl bg-[#171717] border border-white/5">
                  <div className="text-2xl font-bold text-white font-mono">
                    {testResult.score}/{testResult.totalQuestions}
                  </div>
                  <div className="text-xs text-white/50 font-mono mt-1 uppercase">Final Score</div>
                </div>

                <div className="p-4 rounded-xl bg-[#171717] border border-white/5">
                  <div className="text-2xl font-bold text-emerald-400 font-mono">
                    {testResult.correctCount}
                  </div>
                  <div className="text-xs text-white/50 font-mono mt-1 uppercase">Correct</div>
                </div>

                <div className="p-4 rounded-xl bg-[#171717] border border-white/5">
                  <div className="text-2xl font-bold text-rose-400 font-mono">
                    {testResult.incorrectCount}
                  </div>
                  <div className="text-xs text-white/50 font-mono mt-1 uppercase">Incorrect</div>
                </div>

                <div className="p-4 rounded-xl bg-[#171717] border border-white/5">
                  <div className="text-2xl font-bold text-white/60 font-mono">
                    {Math.floor(testResult.timeTakenSeconds / 60)}m {testResult.timeTakenSeconds % 60}s
                  </div>
                  <div className="text-xs text-white/50 font-mono mt-1 uppercase">Time Taken</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                <button
                  onClick={() => setPhase('setup')}
                  className="px-6 py-3 rounded-xl bg-[#21F1A8] hover:bg-[#1ee09b] text-[#171717] font-bold text-sm transition-all flex items-center gap-2 cursor-pointer min-h-[44px]"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Configure Another Test</span>
                </button>
                <button
                  onClick={() => onNavigate('/study-tracker')}
                  className="px-6 py-3 rounded-xl bg-[#282828] hover:bg-[#333333] text-white font-semibold text-sm transition-all border border-white/10 cursor-pointer min-h-[44px]"
                >
                  View in Study Tracker
                </button>
                <button
                  onClick={() => onNavigate('/quizzes')}
                  className="px-6 py-3 rounded-xl bg-transparent hover:bg-white/5 text-[#21F1A8] border border-[#21F1A8]/40 text-sm font-semibold transition-all cursor-pointer min-h-[44px]"
                >
                  Topic-wise Quizzes →
                </button>
              </div>
            </div>

            {/* Subject/Topic Performance Breakdown */}
            {Object.keys(testResult.topicBreakdown).length > 0 && (
              <div className="p-6 rounded-2xl bg-[#1f1f1f] border border-white/10 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#21F1A8]" />
                  <span>Subject Domain Performance</span>
                </h3>

                <div className="space-y-3">
                  {Object.entries(testResult.topicBreakdown).map(([sub, stats]) => {
                    const pct = Math.round((stats.correct / stats.total) * 100);
                    return (
                      <div key={sub} className="p-4 rounded-xl bg-[#171717] border border-white/5 space-y-2">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="capitalize text-white font-semibold">{sub}</span>
                          <span className="text-[#21F1A8] font-bold">
                            {stats.correct}/{stats.total} ({pct}%)
                          </span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-[#252525] overflow-hidden">
                          <div 
                            className="h-full bg-[#21F1A8] rounded-full transition-all duration-300"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* In-depth Review with Filter */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#21F1A8]" />
                  <span>Complete Answer Analysis & Explanations</span>
                </h3>

                {/* Filter pills */}
                <div className="flex items-center gap-2">
                  {(['all', 'incorrect', 'correct', 'unanswered'] as const).map((flt) => (
                    <button
                      key={flt}
                      onClick={() => setReviewFilter(flt)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono uppercase transition-colors cursor-pointer min-h-[32px] ${
                        reviewFilter === flt
                          ? 'bg-[#21F1A8] text-[#171717] font-bold'
                          : 'bg-[#1f1f1f] text-white/60 hover:text-white border border-white/5'
                      }`}
                    >
                      {flt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Review Question Cards */}
              <div className="space-y-4">
                {testResult.questions
                  .filter((q) => {
                    const userPick = testResult.userAnswers[q.id];
                    if (reviewFilter === 'correct') return userPick === q.correctIndex;
                    if (reviewFilter === 'incorrect') return userPick !== undefined && userPick !== q.correctIndex;
                    if (reviewFilter === 'unanswered') return userPick === undefined;
                    return true;
                  })
                  .map((q, idx) => {
                    const userPick = testResult.userAnswers[q.id];
                    const isCorrect = userPick === q.correctIndex;
                    const isUnanswered = userPick === undefined;

                    return (
                      <div 
                        key={q.id}
                        className={`p-6 rounded-2xl border transition-all ${
                          isCorrect
                            ? 'bg-[#1f1f1f] border-emerald-900/30'
                            : isUnanswered
                            ? 'bg-[#1f1f1f] border-white/10'
                            : 'bg-[#1f1f1f] border-rose-900/30'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <span className="text-xs font-mono text-white/50">
                            Question {idx + 1} • <span className="capitalize">{q.subject}</span>
                          </span>
                          <span className={`px-2 py-0.5 rounded text-xs font-mono font-medium flex items-center gap-1.5 ${
                            isCorrect 
                              ? 'text-[#21F1A8] bg-[#21F1A8]/10' 
                              : isUnanswered
                              ? 'text-white/50 bg-white/5'
                              : 'text-rose-400 bg-rose-950/40'
                          }`}>
                            {isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : isUnanswered ? <HelpCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                            {isCorrect ? 'Correct' : isUnanswered ? 'Unanswered' : 'Incorrect'}
                          </span>
                        </div>

                        <h4 className="text-base font-semibold text-white mb-4">
                          {q.question}
                        </h4>

                        {/* Options */}
                        <div className="space-y-2 mb-4">
                          {q.options.map((opt, oIdx) => {
                            const isUserChoice = userPick === oIdx;
                            const isCorrectAns = q.correctIndex === oIdx;

                            let bg = 'bg-[#171717]/60 text-white/60 border-transparent';
                            if (isCorrectAns) {
                              bg = 'bg-emerald-950/40 text-[#21F1A8] border-[#21F1A8]/50';
                            } else if (isUserChoice && !isCorrectAns) {
                              bg = 'bg-rose-950/30 text-rose-300 border-rose-500/50';
                            }

                            return (
                              <div 
                                key={oIdx}
                                className={`p-3 rounded-lg border text-xs sm:text-sm flex items-center justify-between gap-3 ${bg}`}
                              >
                                <div className="flex items-center gap-2">
                                  <span className="font-mono font-bold opacity-60">
                                    {String.fromCharCode(65 + oIdx)}.
                                  </span>
                                  <span>{opt}</span>
                                </div>
                                {isCorrectAns && (
                                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#21F1A8] font-bold shrink-0">
                                    Correct Answer
                                  </span>
                                )}
                                {isUserChoice && !isCorrectAns && (
                                  <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400 font-bold shrink-0">
                                    Your Choice
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {/* Explanation */}
                        <div className="p-4 rounded-xl bg-[#171717] border border-white/5 space-y-2 text-xs">
                          <p className="text-white/80 leading-relaxed">
                            <strong className="text-white">Explanation:</strong> {q.explanation}
                          </p>
                          <p className="text-white/40 font-mono">
                            Primary Source: {q.sourceText}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
