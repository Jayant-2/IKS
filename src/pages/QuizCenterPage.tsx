import React, { useState, useMemo, useEffect } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  Award, 
  BookOpen, 
  HelpCircle, 
  Layers, 
  TrendingUp, 
  Filter, 
  Sparkles,
  Compass,
  AlertCircle
} from 'lucide-react';
import { AppRoute, IksCategory, QuizDifficulty, QuizQuestion, QuizTopic } from '../types/iks';
import { QUIZ_TOPICS, IKS_QUIZ_QUESTIONS } from '../data/quizQuestions';
import { addQuizResult, getStudyData } from '../services/storage';

interface QuizCenterPageProps {
  onNavigate: (route: AppRoute) => void;
  initialSubject?: IksCategory | 'all';
}

type QuizViewMode = 'catalog' | 'active' | 'summary';

export const QuizCenterPage: React.FC<QuizCenterPageProps> = ({ 
  onNavigate, 
  initialSubject = 'all' 
}) => {
  const [selectedSubject, setSelectedSubject] = useState<IksCategory | 'all'>(initialSubject);
  const [selectedDifficulty, setSelectedDifficulty] = useState<QuizDifficulty | 'all'>('all');
  const [viewMode, setViewMode] = useState<QuizViewMode>('catalog');
  
  // Active quiz state
  const [activeTopic, setActiveTopic] = useState<QuizTopic | null>(null);
  const [topicQuestions, setTopicQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const [completedQuizzesHistory, setCompletedQuizzesHistory] = useState(getStudyData().quizResults || []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [viewMode, currentIndex]);

  const refreshHistory = () => {
    setCompletedQuizzesHistory(getStudyData().quizResults || []);
  };

  // Filtered topics
  const filteredTopics = useMemo(() => {
    return QUIZ_TOPICS.filter((topic) => {
      const matchSubject = selectedSubject === 'all' || topic.subject === selectedSubject;
      const matchDifficulty = selectedDifficulty === 'all' || topic.difficulty === selectedDifficulty;
      return matchSubject && matchDifficulty;
    });
  }, [selectedSubject, selectedDifficulty]);

  // Start a quiz
  const handleStartQuiz = (topic: QuizTopic) => {
    const questions = IKS_QUIZ_QUESTIONS.filter((q) => q.topic === topic.title);
    // If not matching by exact title, fallback by subject
    const finalQuestions = questions.length > 0 
      ? questions 
      : IKS_QUIZ_QUESTIONS.filter((q) => q.subject === topic.subject).slice(0, topic.questionCount);

    setActiveTopic(topic);
    setTopicQuestions(finalQuestions);
    setCurrentIndex(0);
    setUserAnswers({});
    setRevealedAnswers({});
    setViewMode('active');
  };

  // Select an answer
  const handleSelectOption = (optionIndex: number) => {
    const currentQ = topicQuestions[currentIndex];
    if (!currentQ) return;
    
    // Once answered, do not allow switching for this question in immediate-feedback quiz mode
    if (revealedAnswers[currentQ.id]) return;

    const nextAnswers = { ...userAnswers, [currentQ.id]: optionIndex };
    const nextRevealed = { ...revealedAnswers, [currentQ.id]: true };
    setUserAnswers(nextAnswers);
    setRevealedAnswers(nextRevealed);
  };

  const handleNext = () => {
    if (currentIndex < topicQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      finishQuiz();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const finishQuiz = () => {
    if (!activeTopic) return;
    let correctCount = 0;
    topicQuestions.forEach((q) => {
      if (userAnswers[q.id] === q.correctIndex) {
        correctCount += 1;
      }
    });

    const total = topicQuestions.length;
    const percentage = Math.round((correctCount / total) * 100);

    // Persist to storage
    addQuizResult({
      topicId: activeTopic.id,
      topicTitle: activeTopic.title,
      subject: activeTopic.subject,
      score: correctCount,
      total,
      percentage,
      userAnswers,
    });

    refreshHistory();
    setViewMode('summary');
  };

  const handleRetry = () => {
    if (activeTopic) {
      handleStartQuiz(activeTopic);
    }
  };

  // Get best score for a topic
  const getTopicBestScore = (topicId: string) => {
    const attempts = completedQuizzesHistory.filter((r) => r.topicId === topicId);
    if (attempts.length === 0) return null;
    const best = Math.max(...attempts.map((a) => a.percentage));
    return best;
  };

  // Current question data
  const currentQuestion = topicQuestions[currentIndex];
  const isCurrentAnswered = currentQuestion ? revealedAnswers[currentQuestion.id] : false;
  const currentSelectedOption = currentQuestion ? userAnswers[currentQuestion.id] : undefined;

  // Final summary stats
  const summaryScore = useMemo(() => {
    if (!topicQuestions.length) return { correct: 0, incorrect: 0, unanswered: 0, percentage: 0 };
    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;

    topicQuestions.forEach((q) => {
      const ans = userAnswers[q.id];
      if (ans === undefined) {
        unanswered += 1;
      } else if (ans === q.correctIndex) {
        correct += 1;
      } else {
        incorrect += 1;
      }
    });

    const percentage = Math.round((correct / topicQuestions.length) * 100);
    return { correct, incorrect, unanswered, percentage };
  }, [topicQuestions, userAnswers]);

  return (
    <div className="min-h-screen bg-[#171717] text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* =========================================================================
            VIEW 1: TOPIC CATALOG
           ========================================================================= */}
        {viewMode === 'catalog' && (
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
                onClick={() => onNavigate('/mock-tests')}
                className="text-xs font-mono text-[#21F1A8] hover:underline"
              >
                Mock Test Center →
              </button>
            </div>

            {/* Header */}
            <div className="border-b border-white/10 pb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#21F1A8]/10 border border-[#21F1A8]/20 text-[#21F1A8] text-xs font-mono font-medium tracking-wider uppercase mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Verified IKS Question Bank</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
                Quiz Center
              </h1>
              <p className="text-white/70 max-w-2xl text-base sm:text-lg leading-relaxed">
                Test and deepen your knowledge of Indian Knowledge Systems. Practice topic-wise questions with instant feedback, canonical citations, and detailed explanations.
              </p>
            </div>

            {/* Filters */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                {/* Subject filter */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-white/50 mr-1 flex items-center gap-1.5">
                    <Filter className="w-3.5 h-3.5" /> Subject:
                  </span>
                  {(['all', 'mathematics', 'astronomy', 'philosophy', 'ayurveda', 'literature'] as const).map((sub) => (
                    <button
                      key={sub}
                      onClick={() => setSelectedSubject(sub)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer capitalize min-h-[36px] ${
                        selectedSubject === sub
                          ? 'bg-[#21F1A8] text-[#171717] font-semibold shadow-sm'
                          : 'bg-[#1f1f1f] text-white/80 hover:text-white hover:bg-[#282828] border border-white/5'
                      }`}
                    >
                      {sub === 'all' ? 'All Subjects' : sub}
                    </button>
                  ))}
                </div>

                {/* Difficulty filter */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-white/50 mr-1">
                    Level:
                  </span>
                  {(['all', 'beginner', 'intermediate', 'advanced'] as const).map((diff) => (
                    <button
                      key={diff}
                      onClick={() => setSelectedDifficulty(diff)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer capitalize min-h-[32px] ${
                        selectedDifficulty === diff
                          ? 'bg-[#21F1A8] text-[#171717] font-semibold'
                          : 'bg-[#1f1f1f] text-white/70 hover:text-white border border-white/5'
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ayurveda Disclaimer notice if filtered */}
              {selectedSubject === 'ayurveda' && (
                <div className="p-3.5 rounded-xl bg-[#1f1f1f] border border-white/10 flex items-start gap-3 text-xs text-white/70">
                  <AlertCircle className="w-4 h-4 text-[#21F1A8] shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-white">Educational Reference Notice:</strong> All Ayurveda quiz questions examine historical treatises (Charaka & Sushruta Samhitas) and classical theory. This is solely for educational and academic exploration, not medical advice.
                  </p>
                </div>
              )}
            </div>

            {/* Topic Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredTopics.map((topic) => {
                const bestScore = getTopicBestScore(topic.id);
                return (
                  <div
                    key={topic.id}
                    className="p-5 rounded-2xl bg-[#1f1f1f] border border-white/10 hover:border-[#21F1A8]/40 transition-all duration-200 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Top badges */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-mono uppercase tracking-wide bg-white/5 text-[#21F1A8] border border-[#21F1A8]/20">
                          {topic.subject}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[11px] font-mono uppercase font-medium ${
                          topic.difficulty === 'beginner' 
                            ? 'text-emerald-400 bg-emerald-950/40 border border-emerald-800/40' 
                            : topic.difficulty === 'intermediate' 
                            ? 'text-amber-300 bg-amber-950/40 border border-amber-800/40' 
                            : 'text-rose-400 bg-rose-950/40 border border-rose-800/40'
                        }`}>
                          {topic.difficulty}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-white group-hover:text-[#21F1A8] transition-colors mb-2 leading-snug">
                        {topic.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-white/65 leading-relaxed mb-4">
                        {topic.description}
                      </p>
                    </div>

                    {/* Bottom Metadata & Start Button */}
                    <div className="pt-4 border-t border-white/5 space-y-3">
                      <div className="flex items-center justify-between text-xs text-white/50 font-mono">
                        <span className="flex items-center gap-1.5">
                          <HelpCircle className="w-3.5 h-3.5 text-white/40" />
                          {topic.questionCount} Questions
                        </span>
                        {bestScore !== null && (
                          <span className="flex items-center gap-1 text-[#21F1A8]">
                            <Award className="w-3.5 h-3.5" /> Best: {bestScore}%
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => handleStartQuiz(topic)}
                        className="w-full py-2.5 px-4 rounded-xl bg-[#21F1A8] hover:bg-[#1ee09b] text-[#171717] font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-[0.98] min-h-[44px]"
                      >
                        <span>Start Quiz</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Link to Mock Test Simulator */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-[#1c1c1c] to-[#222222] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-5">
              <div className="space-y-1 text-center sm:text-left">
                <div className="text-xs font-mono uppercase tracking-wider text-[#21F1A8]">Exam Practice</div>
                <h4 className="text-lg font-bold text-white">Looking for a timed test simulation?</h4>
                <p className="text-xs text-white/60">Take an exam-style mock test with countdown timer and full score breakdown.</p>
              </div>
              <button
                onClick={() => onNavigate('/mock-tests')}
                className="px-5 py-3 rounded-xl bg-[#1f1f1f] hover:bg-[#282828] text-white border border-[#21F1A8]/30 hover:border-[#21F1A8] text-sm font-semibold transition-all cursor-pointer whitespace-nowrap min-h-[44px]"
              >
                Go to Mock Test Center →
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 2: ACTIVE QUIZ PLAYER
           ========================================================================= */}
        {viewMode === 'active' && activeTopic && currentQuestion && (
          <div className="space-y-6">
            {/* Top Bar with Exit and Breadcrumb */}
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
              <button
                onClick={() => setViewMode('catalog')}
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white/60 hover:text-white transition-colors cursor-pointer min-h-[40px] px-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Exit to Topics</span>
              </button>
              <div className="text-right">
                <span className="text-xs font-mono text-[#21F1A8] uppercase tracking-wider block">
                  {activeTopic.subject}
                </span>
                <span className="text-sm font-semibold text-white/80 line-clamp-1 max-w-[240px] sm:max-w-md">
                  {activeTopic.title}
                </span>
              </div>
            </div>

            {/* Progress Bar & Counter */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-white/60">
                <span>Question {currentIndex + 1} of {topicQuestions.length}</span>
                <span>{Math.round(((currentIndex + 1) / topicQuestions.length) * 100)}% Completed</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#1f1f1f] overflow-hidden border border-white/5">
                <div 
                  className="h-full bg-[#21F1A8] transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / topicQuestions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#1f1f1f] border border-white/10 shadow-lg space-y-6">
              {/* Question Text */}
              <div className="space-y-2">
                <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-mono uppercase tracking-wide bg-white/5 text-[#21F1A8] border border-[#21F1A8]/20">
                  {currentQuestion.difficulty}
                </span>
                <h2 className="text-lg sm:text-2xl font-bold text-white leading-relaxed">
                  {currentQuestion.question}
                </h2>
              </div>

              {/* Options */}
              <div className="space-y-3 pt-2">
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = currentSelectedOption === idx;
                  const isCorrect = currentQuestion.correctIndex === idx;
                  
                  let optionStyles = 'bg-[#171717] border-white/10 hover:border-white/20 text-white/90';

                  if (isCurrentAnswered) {
                    if (isCorrect) {
                      optionStyles = 'bg-emerald-950/40 border-[#21F1A8] text-white shadow-[0_0_15px_rgba(33,241,168,0.15)]';
                    } else if (isSelected && !isCorrect) {
                      optionStyles = 'bg-rose-950/30 border-rose-500/80 text-rose-200';
                    } else {
                      optionStyles = 'bg-[#171717]/60 border-white/5 text-white/40';
                    }
                  } else if (isSelected) {
                    optionStyles = 'bg-[#21F1A8]/10 border-[#21F1A8] text-white';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isCurrentAnswered}
                      className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-start gap-3 min-h-[48px] cursor-pointer ${optionStyles} ${
                        !isCurrentAnswered ? 'hover:bg-[#242424]' : ''
                      }`}
                    >
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5 ${
                        isCurrentAnswered && isCorrect
                          ? 'bg-[#21F1A8] text-[#171717]'
                          : isCurrentAnswered && isSelected && !isCorrect
                          ? 'bg-rose-500 text-white'
                          : isSelected
                          ? 'bg-[#21F1A8] text-[#171717]'
                          : 'bg-white/5 text-white/70'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-sm sm:text-base leading-snug flex-1 pt-1">
                        {option}
                      </span>
                      {isCurrentAnswered && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-[#21F1A8] shrink-0 mt-1" />
                      )}
                      {isCurrentAnswered && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-1" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Immediate Feedback Box */}
              {isCurrentAnswered && (
                <div className={`p-5 rounded-xl border transition-all duration-300 space-y-3 ${
                  currentSelectedOption === currentQuestion.correctIndex
                    ? 'bg-[#21F1A8]/5 border-[#21F1A8]/30'
                    : 'bg-rose-950/20 border-rose-500/30'
                }`}>
                  <div className="flex items-center gap-2">
                    {currentSelectedOption === currentQuestion.correctIndex ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-[#21F1A8]" />
                        <span className="text-sm font-bold text-[#21F1A8] font-mono uppercase tracking-wide">
                          Correct!
                        </span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-rose-400" />
                        <span className="text-sm font-bold text-rose-400 font-mono uppercase tracking-wide">
                          Incorrect
                        </span>
                      </>
                    )}
                  </div>

                  <p className="text-sm text-white/80 leading-relaxed">
                    {currentQuestion.explanation}
                  </p>

                  <div className="pt-2 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-white/50">
                    <BookOpen className="w-3.5 h-3.5 text-[#21F1A8]" />
                    <span>Source: {currentQuestion.sourceText}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Controls */}
            <div className="flex items-center justify-between gap-4 pt-2">
              <button
                onClick={handlePrev}
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
                onClick={handleNext}
                disabled={!isCurrentAnswered}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 min-h-[44px] ${
                  !isCurrentAnswered
                    ? 'opacity-50 cursor-not-allowed bg-white/10 text-white/50'
                    : 'bg-[#21F1A8] hover:bg-[#1ee09b] text-[#171717] cursor-pointer shadow-sm active:scale-95'
                }`}
              >
                <span>{currentIndex === topicQuestions.length - 1 ? 'View Final Results' : 'Next Question'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 3: QUIZ SCORE SUMMARY & REVIEW
           ========================================================================= */}
        {viewMode === 'summary' && activeTopic && (
          <div className="space-y-10">
            {/* Header Score Card */}
            <div className="p-8 rounded-3xl bg-[#1f1f1f] border border-white/10 text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-[#21F1A8]/10 border border-[#21F1A8]/30 text-[#21F1A8] flex items-center justify-center mx-auto">
                <Award className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#21F1A8] block mb-1">
                  Quiz Completed • {activeTopic.subject}
                </span>
                <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2">
                  {activeTopic.title}
                </h2>
                <p className="text-sm text-white/60">
                  Detailed performance report and answer analysis.
                </p>
              </div>

              {/* Big Score Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto pt-4">
                <div className="p-4 rounded-xl bg-[#171717] border border-white/5">
                  <div className="text-3xl font-extrabold text-[#21F1A8] font-mono">
                    {summaryScore.percentage}%
                  </div>
                  <div className="text-xs text-white/50 font-mono mt-1 uppercase">Accuracy</div>
                </div>

                <div className="p-4 rounded-xl bg-[#171717] border border-white/5">
                  <div className="text-3xl font-extrabold text-white font-mono">
                    {summaryScore.correct}/{topicQuestions.length}
                  </div>
                  <div className="text-xs text-white/50 font-mono mt-1 uppercase">Score</div>
                </div>

                <div className="p-4 rounded-xl bg-[#171717] border border-white/5">
                  <div className="text-3xl font-extrabold text-emerald-400 font-mono">
                    {summaryScore.correct}
                  </div>
                  <div className="text-xs text-white/50 font-mono mt-1 uppercase">Correct</div>
                </div>

                <div className="p-4 rounded-xl bg-[#171717] border border-white/5">
                  <div className="text-3xl font-extrabold text-rose-400 font-mono">
                    {summaryScore.incorrect}
                  </div>
                  <div className="text-xs text-white/50 font-mono mt-1 uppercase">Incorrect</div>
                </div>
              </div>

              {/* Primary Actions */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                <button
                  onClick={handleRetry}
                  className="px-6 py-3 rounded-xl bg-[#21F1A8] hover:bg-[#1ee09b] text-[#171717] font-bold text-sm transition-all flex items-center gap-2 cursor-pointer min-h-[44px]"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Retry Quiz</span>
                </button>
                <button
                  onClick={() => setViewMode('catalog')}
                  className="px-6 py-3 rounded-xl bg-[#282828] hover:bg-[#333333] text-white font-semibold text-sm transition-all border border-white/10 cursor-pointer min-h-[44px]"
                >
                  Choose Another Topic
                </button>
                <button
                  onClick={() => onNavigate('/mock-tests')}
                  className="px-6 py-3 rounded-xl bg-transparent hover:bg-white/5 text-[#21F1A8] border border-[#21F1A8]/40 text-sm font-semibold transition-all cursor-pointer min-h-[44px]"
                >
                  Take a Timed Mock Test →
                </button>
              </div>
            </div>

            {/* Comprehensive Question Review */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#21F1A8]" />
                  <span>Question Review & Explanations</span>
                </h3>
                <span className="text-xs font-mono text-white/50">
                  {topicQuestions.length} Questions Reviewed
                </span>
              </div>

              <div className="space-y-4">
                {topicQuestions.map((q, idx) => {
                  const userAnswer = userAnswers[q.id];
                  const isCorrect = userAnswer === q.correctIndex;

                  return (
                    <div 
                      key={q.id}
                      className={`p-6 rounded-2xl border transition-all ${
                        isCorrect
                          ? 'bg-[#1f1f1f] border-emerald-900/30'
                          : 'bg-[#1f1f1f] border-rose-900/30'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <span className="text-xs font-mono text-white/50">
                          Question {idx + 1}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-xs font-mono font-medium flex items-center gap-1.5 ${
                          isCorrect 
                            ? 'text-[#21F1A8] bg-[#21F1A8]/10' 
                            : 'text-rose-400 bg-rose-950/40'
                        }`}>
                          {isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                          {isCorrect ? 'Correct' : 'Incorrect'}
                        </span>
                      </div>

                      <h4 className="text-base font-semibold text-white mb-4">
                        {q.question}
                      </h4>

                      {/* Options breakdown */}
                      <div className="space-y-2 mb-4">
                        {q.options.map((opt, oIdx) => {
                          const isUserPick = userAnswer === oIdx;
                          const isAns = q.correctIndex === oIdx;

                          let bg = 'bg-[#171717]/60 text-white/60 border-transparent';
                          if (isAns) {
                            bg = 'bg-emerald-950/40 text-[#21F1A8] border-[#21F1A8]/50';
                          } else if (isUserPick && !isAns) {
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
                              {isAns && (
                                <span className="text-[10px] font-mono uppercase tracking-wider text-[#21F1A8] font-bold shrink-0">
                                  Correct Answer
                                </span>
                              )}
                              {isUserPick && !isAns && (
                                <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400 font-bold shrink-0">
                                  Your Choice
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Explanation & Source */}
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
