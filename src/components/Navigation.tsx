import React, { useState, useEffect } from 'react';
import { AppRoute } from '../types/iks';
import { 
  Sparkles, 
  Menu, 
  X, 
  BookOpen, 
  Clock, 
  Compass, 
  Video, 
  Languages, 
  Volume2, 
  VolumeX, 
  User, 
  LogIn 
} from 'lucide-react';
import { vedicSoundscape } from '../services/vedicSoundscape';
import { authService } from '../services/authService';
import { getStudyData } from '../services/storage';
import { UserProfile } from '../types/auth';
import { AuthModal } from './AuthModal';

interface NavigationProps {
  currentRoute: AppRoute;
  onNavigate: (route: AppRoute) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentRoute, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(authService.getCurrentUser());
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [moduleProgress, setModuleProgress] = useState({ completed: 8, total: 12, percentage: 67 });

  useEffect(() => {
    const updateProgress = () => {
      const studyData = getStudyData();
      const currentUser = authService.getCurrentUser();

      const completedSet = new Set<string>();
      studyData.completedTopics?.forEach((t) => completedSet.add(t));
      studyData.sessions?.forEach((s) => completedSet.add(s.subject));
      studyData.quizResults?.forEach((q) => completedSet.add(q.subject));
      studyData.mockTestResults?.forEach((m) => completedSet.add(m.subject));

      const totalModules = 12;
      const baseCompleted = currentUser 
        ? Math.min(8, Math.floor((currentUser.quizzesCompleted + currentUser.testsCompleted) / 3)) 
        : 0;
      const totalCompleted = Math.min(totalModules, Math.max(baseCompleted, completedSet.size));
      const percentage = Math.min(100, Math.round((totalCompleted / totalModules) * 100));

      setModuleProgress({
        completed: totalCompleted,
        total: totalModules,
        percentage,
      });
    };

    updateProgress();
    const unsubAudio = vedicSoundscape.subscribe((playing) => setIsAudioPlaying(playing));
    const unsubAuth = authService.subscribe((state) => {
      setUser(state.user);
      updateProgress();
    });

    window.addEventListener('storage', updateProgress);
    return () => {
      unsubAudio();
      unsubAuth();
      window.removeEventListener('storage', updateProgress);
    };
  }, []);

  const handleToggleSound = () => {
    vedicSoundscape.toggle();
  };

  const handleRouteClick = (route: AppRoute) => {
    onNavigate(route);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#171717]/95 backdrop-blur-xl border-b border-white/[0.08] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Zone */}
        <button
          onClick={() => handleRouteClick('/')}
          className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#21F1A8] rounded-lg py-1 px-1 -ml-1 cursor-pointer"
          aria-label="IKS Explorer AI Home"
        >
          <span className="w-8 h-8 rounded-lg bg-[#242424] border border-white/10 flex items-center justify-center text-[#21F1A8] font-bold text-sm shadow-sm group-hover:border-[#21F1A8]/40 transition-colors">
            ॐ
          </span>
          <span className="font-heading font-bold text-base sm:text-lg tracking-tight text-white group-hover:text-[#21F1A8] transition-colors whitespace-nowrap">
            IKS Explorer <span className="text-xs font-mono font-medium text-[#21F1A8] uppercase tracking-wider ml-1">AI</span>
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-6 text-sm font-medium">
          <button
            onClick={() => handleRouteClick('/')}
            className={`transition-colors whitespace-nowrap py-1 cursor-pointer ${
              currentRoute === '/' 
                ? 'text-[#21F1A8] font-semibold border-b-2 border-[#21F1A8]' 
                : 'text-[#B0B0B0] hover:text-white'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleRouteClick('/explore')}
            className={`transition-colors whitespace-nowrap py-1 cursor-pointer ${
              currentRoute === '/explore' 
                ? 'text-[#21F1A8] font-semibold border-b-2 border-[#21F1A8]' 
                : 'text-[#B0B0B0] hover:text-white'
            }`}
          >
            Explore
          </button>
          <button
            onClick={() => handleRouteClick('/quizzes')}
            className={`transition-colors whitespace-nowrap py-1 cursor-pointer ${
              currentRoute === '/quizzes' 
                ? 'text-[#21F1A8] font-semibold border-b-2 border-[#21F1A8]' 
                : 'text-[#B0B0B0] hover:text-white'
            }`}
          >
            Quizzes
          </button>
          <button
            onClick={() => handleRouteClick('/mock-tests')}
            className={`transition-colors whitespace-nowrap py-1 cursor-pointer ${
              currentRoute === '/mock-tests' 
                ? 'text-[#21F1A8] font-semibold border-b-2 border-[#21F1A8]' 
                : 'text-[#B0B0B0] hover:text-white'
            }`}
          >
            Mock Tests
          </button>
          <button
            onClick={() => handleRouteClick('/study-tracker')}
            className={`transition-colors whitespace-nowrap py-1 cursor-pointer ${
              currentRoute === '/study-tracker' 
                ? 'text-[#21F1A8] font-semibold border-b-2 border-[#21F1A8]' 
                : 'text-[#B0B0B0] hover:text-white'
            }`}
          >
            Study Tracker
          </button>
          <button
            onClick={() => handleRouteClick('/sanskrit')}
            className={`transition-colors whitespace-nowrap py-1 cursor-pointer ${
              currentRoute === '/sanskrit' 
                ? 'text-[#21F1A8] font-semibold border-b-2 border-[#21F1A8]' 
                : 'text-[#B0B0B0] hover:text-white'
            }`}
          >
            Sanskrit
          </button>
          <button
            onClick={() => handleRouteClick('/video-learning')}
            className={`transition-colors whitespace-nowrap py-1 cursor-pointer ${
              currentRoute === '/video-learning' 
                ? 'text-[#21F1A8] font-semibold border-b-2 border-[#21F1A8]' 
                : 'text-[#B0B0B0] hover:text-white'
            }`}
          >
            Video Learning
          </button>
        </nav>

        {/* Action Button & Mobile Hamburger */}
        <div className="flex items-center gap-2.5">
          {/* User Profile Icon with Visual IKS Module Progress Ring */}
          <button
            type="button"
            onClick={() => setAuthModalOpen(true)}
            className="relative group p-1 flex items-center justify-center rounded-full hover:scale-105 active:scale-95 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#21F1A8] min-h-[44px] min-w-[44px]"
            aria-label={`User Profile: ${moduleProgress.percentage}% of IKS modules completed (${moduleProgress.completed}/${moduleProgress.total})`}
            title={`${user ? user.name : 'Scholar Profile'}: ${moduleProgress.percentage}% completed (${moduleProgress.completed}/${moduleProgress.total} IKS modules)`}
          >
            {/* Circular SVG Progress Ring */}
            <svg 
              className="w-10 h-10 -rotate-90 transform" 
              viewBox="0 0 44 44"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="navProgressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#21F1A8" />
                  <stop offset="100%" stopColor="#00D2FF" />
                </linearGradient>
              </defs>
              {/* Background Track Ring */}
              <circle
                cx="22"
                cy="22"
                r="18"
                className="stroke-white/15"
                strokeWidth="2.5"
                fill="none"
              />
              {/* Active Module Progress Stroke */}
              <circle
                cx="22"
                cy="22"
                r="18"
                stroke="url(#navProgressGrad)"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
                style={{
                  strokeDasharray: 2 * Math.PI * 18,
                  strokeDashoffset: (2 * Math.PI * 18) * (1 - moduleProgress.percentage / 100),
                  transition: 'stroke-dashoffset 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              />
            </svg>

            {/* User Profile Center Avatar */}
            <div className="absolute inset-0 m-auto w-7 h-7 rounded-full bg-[#202020] border border-white/10 flex items-center justify-center text-xs font-mono font-bold text-[#21F1A8] group-hover:bg-[#282828] group-hover:border-[#21F1A8]/50 transition-colors shadow-inner">
              {user?.avatarSeed ? (
                <span>{user.avatarSeed}</span>
              ) : (
                <User className="w-3.5 h-3.5 text-white/90 group-hover:text-[#21F1A8] transition-colors" />
              )}
            </div>

            {/* Percentage Mini-Badge */}
            <span className="absolute -bottom-0.5 -right-0.5 text-[9px] font-mono font-bold bg-[#171717] text-[#21F1A8] border border-[#21F1A8]/50 px-1 py-0.2 rounded-full shadow-md leading-none">
              {moduleProgress.percentage}%
            </span>
          </button>

          <button
            onClick={() => handleRouteClick('/ai-tutor')}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all min-h-[44px] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#21F1A8] ${
              currentRoute === '/ai-tutor'
                ? 'bg-[#21F1A8] text-[#171717] shadow-lg shadow-[#21F1A8]/20'
                : 'bg-[#21F1A8] hover:bg-[#21F1A8]/90 text-[#171717] active:scale-95'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Tutor</span>
          </button>

          {/* Accessible Mobile Menu Toggle button >= 44x44px */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex items-center justify-center w-11 h-11 rounded-lg bg-[#242424] text-white border border-white/10 hover:border-white/20 active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#21F1A8]"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#21F1A8]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#171717] border-b border-white/10 px-4 pt-3 pb-6 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-1.5 text-sm">
            <button
              onClick={() => handleRouteClick('/')}
              className={`flex items-center gap-3 px-3.5 py-3 rounded-lg text-left min-h-[44px] transition-colors cursor-pointer ${
                currentRoute === '/' 
                  ? 'bg-[#242424] text-[#21F1A8] font-semibold border-l-2 border-[#21F1A8]' 
                  : 'text-[#CCCCCC] hover:bg-[#1f1f1f] hover:text-white'
              }`}
            >
              <span>Home</span>
            </button>
            <button
              onClick={() => handleRouteClick('/explore')}
              className={`flex items-center gap-3 px-3.5 py-3 rounded-lg text-left min-h-[44px] transition-colors cursor-pointer ${
                currentRoute === '/explore' 
                  ? 'bg-[#242424] text-[#21F1A8] font-semibold border-l-2 border-[#21F1A8]' 
                  : 'text-[#CCCCCC] hover:bg-[#1f1f1f] hover:text-white'
              }`}
            >
              <Compass className="w-4 h-4 text-[#21F1A8]" />
              <span>Explore (Timeline & Map)</span>
            </button>
            <button
              onClick={() => handleRouteClick('/quizzes')}
              className={`flex items-center gap-3 px-3.5 py-3 rounded-lg text-left min-h-[44px] transition-colors cursor-pointer ${
                currentRoute === '/quizzes' 
                  ? 'bg-[#242424] text-[#21F1A8] font-semibold border-l-2 border-[#21F1A8]' 
                  : 'text-[#CCCCCC] hover:bg-[#1f1f1f] hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4 text-[#21F1A8]" />
              <span>Quiz Center</span>
            </button>
            <button
              onClick={() => handleRouteClick('/mock-tests')}
              className={`flex items-center gap-3 px-3.5 py-3 rounded-lg text-left min-h-[44px] transition-colors cursor-pointer ${
                currentRoute === '/mock-tests' 
                  ? 'bg-[#242424] text-[#21F1A8] font-semibold border-l-2 border-[#21F1A8]' 
                  : 'text-[#CCCCCC] hover:bg-[#1f1f1f] hover:text-white'
              }`}
            >
              <Clock className="w-4 h-4 text-[#21F1A8]" />
              <span>Mock Test Center</span>
            </button>
            <button
              onClick={() => handleRouteClick('/study-tracker')}
              className={`flex items-center gap-3 px-3.5 py-3 rounded-lg text-left min-h-[44px] transition-colors cursor-pointer ${
                currentRoute === '/study-tracker' 
                  ? 'bg-[#242424] text-[#21F1A8] font-semibold border-l-2 border-[#21F1A8]' 
                  : 'text-[#CCCCCC] hover:bg-[#1f1f1f] hover:text-white'
              }`}
            >
              <Clock className="w-4 h-4 text-[#21F1A8]" />
              <span>Study Tracker</span>
            </button>
            <button
              onClick={() => handleRouteClick('/sanskrit')}
              className={`flex items-center gap-3 px-3.5 py-3 rounded-lg text-left min-h-[44px] transition-colors cursor-pointer ${
                currentRoute === '/sanskrit' 
                  ? 'bg-[#242424] text-[#21F1A8] font-semibold border-l-2 border-[#21F1A8]' 
                  : 'text-[#CCCCCC] hover:bg-[#1f1f1f] hover:text-white'
              }`}
            >
              <Languages className="w-4 h-4 text-[#21F1A8]" />
              <span>Learn Sanskrit</span>
            </button>
            <button
              onClick={() => handleRouteClick('/video-learning')}
              className={`flex items-center gap-3 px-3.5 py-3 rounded-lg text-left min-h-[44px] transition-colors cursor-pointer ${
                currentRoute === '/video-learning' 
                  ? 'bg-[#242424] text-[#21F1A8] font-semibold border-l-2 border-[#21F1A8]' 
                  : 'text-[#CCCCCC] hover:bg-[#1f1f1f] hover:text-white'
              }`}
            >
              <Video className="w-4 h-4 text-[#21F1A8]" />
              <span>Video Learning</span>
            </button>
            <button
              onClick={() => handleRouteClick('/ai-tutor')}
              className={`flex items-center gap-3 px-3.5 py-3 rounded-lg text-left min-h-[44px] transition-colors cursor-pointer ${
                currentRoute === '/ai-tutor' 
                  ? 'bg-[#242424] text-[#21F1A8] font-semibold border-l-2 border-[#21F1A8]' 
                  : 'text-[#CCCCCC] hover:bg-[#1f1f1f] hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4 text-[#21F1A8]" />
              <span>Dedicated AI Tutor</span>
            </button>
          </nav>
        </div>
      )}

      {/* User Authentication & Profile Modal */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        currentUser={user} 
      />
    </header>
  );
};
