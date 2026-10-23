/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { SubjectDetailPage } from './pages/SubjectDetailPage';
import { StudyTrackerPage } from './pages/StudyTrackerPage';
import { VideoLearningPage } from './pages/VideoLearningPage';
import { AITutorPage } from './pages/AITutorPage';
import { QuizCenterPage } from './pages/QuizCenterPage';
import { MockTestCenterPage } from './pages/MockTestCenterPage';
import { SanskritLearningPage } from './pages/SanskritLearningPage';
import { AppRoute, IksCategory } from './types/iks';
import { Sparkles } from 'lucide-react';

export default function App() {
  const getInitialRoute = (): AppRoute => {
    if (typeof window === 'undefined') return '/';
    const path = window.location.pathname;
    const hash = window.location.hash.replace('#', '');
    
    const validRoutes: AppRoute[] = [
      '/',
      '/explore',
      '/mathematics',
      '/astronomy',
      '/philosophy',
      '/ayurveda',
      '/literature',
      '/sanskrit',
      '/study-tracker',
      '/video-learning',
      '/ai-tutor',
      '/quizzes',
      '/mock-tests',
    ];

    if (validRoutes.includes(path as AppRoute)) return path as AppRoute;
    if (validRoutes.includes(hash as AppRoute)) return hash as AppRoute;
    return '/';
  };

  const [currentRoute, setCurrentRoute] = useState<AppRoute>(getInitialRoute);
  const [tutorPrompt, setTutorPrompt] = useState<string | undefined>(undefined);

  // Sync route with browser history (popstate for back/forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const validRoutes: AppRoute[] = [
        '/',
        '/explore',
        '/mathematics',
        '/astronomy',
        '/philosophy',
        '/ayurveda',
        '/literature',
        '/sanskrit',
        '/study-tracker',
        '/video-learning',
        '/ai-tutor',
        '/quizzes',
        '/mock-tests',
      ];
      if (validRoutes.includes(path as AppRoute)) {
        setCurrentRoute(path as AppRoute);
      } else {
        setCurrentRoute('/');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (route: AppRoute, prompt?: string) => {
    setCurrentRoute(route);
    if (prompt) {
      setTutorPrompt(prompt);
    }
    if (typeof window !== 'undefined') {
      try {
        window.history.pushState({}, '', route);
      } catch (e) {
        // Fallback for sandboxed frames if pushState is restricted
        window.location.hash = route;
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenTutorWithPrompt = (prompt: string) => {
    navigateTo('/ai-tutor', prompt);
  };

  return (
    <div className="min-h-screen bg-[#171717] text-[#EDEDED] flex flex-col font-body selection:bg-[#21F1A8]/20 selection:text-[#21F1A8]">
      
      {/* Minimal Navigation */}
      <Navigation 
        currentRoute={currentRoute} 
        onNavigate={(route) => navigateTo(route)} 
      />

      {/* Main Page Area */}
      <main className="flex-1 w-full">
        {currentRoute === '/' && (
          <HomePage onNavigate={navigateTo} />
        )}

        {currentRoute === '/explore' && (
          <ExplorePage 
            onNavigate={navigateTo} 
            onOpenTutorWithPrompt={handleOpenTutorWithPrompt} 
          />
        )}

        {currentRoute === '/mathematics' && (
          <SubjectDetailPage 
            categoryId="mathematics" 
            onNavigate={navigateTo} 
            onOpenTutorWithPrompt={handleOpenTutorWithPrompt} 
          />
        )}

        {currentRoute === '/astronomy' && (
          <SubjectDetailPage 
            categoryId="astronomy" 
            onNavigate={navigateTo} 
            onOpenTutorWithPrompt={handleOpenTutorWithPrompt} 
          />
        )}

        {currentRoute === '/philosophy' && (
          <SubjectDetailPage 
            categoryId="philosophy" 
            onNavigate={navigateTo} 
            onOpenTutorWithPrompt={handleOpenTutorWithPrompt} 
          />
        )}

        {currentRoute === '/ayurveda' && (
          <SubjectDetailPage 
            categoryId="ayurveda" 
            onNavigate={navigateTo} 
            onOpenTutorWithPrompt={handleOpenTutorWithPrompt} 
          />
        )}

        {currentRoute === '/literature' && (
          <SubjectDetailPage 
            categoryId="literature" 
            onNavigate={navigateTo} 
            onOpenTutorWithPrompt={handleOpenTutorWithPrompt} 
          />
        )}

        {currentRoute === '/sanskrit' && (
          <SanskritLearningPage 
            onNavigate={navigateTo} 
            onOpenTutorWithPrompt={handleOpenTutorWithPrompt} 
          />
        )}

        {currentRoute === '/study-tracker' && (
          <StudyTrackerPage onNavigate={navigateTo} />
        )}

        {currentRoute === '/video-learning' && (
          <VideoLearningPage 
            onNavigate={navigateTo} 
            onOpenTutorWithPrompt={handleOpenTutorWithPrompt} 
          />
        )}

        {currentRoute === '/ai-tutor' && (
          <AITutorPage 
            onNavigate={navigateTo} 
            initialPrompt={tutorPrompt} 
          />
        )}

        {currentRoute === '/quizzes' && (
          <QuizCenterPage onNavigate={navigateTo} />
        )}

        {currentRoute === '/mock-tests' && (
          <MockTestCenterPage onNavigate={navigateTo} />
        )}
      </main>

      {/* Institutional Minimal Footer — rendered on all dedicated subpages; homepage is a single-screen Spatial Dashboard */}
      {currentRoute !== '/' && (
        <Footer onNavigate={navigateTo} />
      )}

      {/* Compact Floating AI Tutor shortcut when not on AI Tutor page */}
      {currentRoute !== '/ai-tutor' && (
        <button
          onClick={() => navigateTo('/ai-tutor')}
          aria-label="Open AI Tutor"
          className="fixed bottom-5 right-5 z-30 flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#242424] hover:bg-[#2b2b2b] border border-white/10 hover:border-[#21F1A8]/50 text-white shadow-xl shadow-black/50 transition-all hover:scale-105 active:scale-95 cursor-pointer min-h-[44px]"
        >
          <span className="w-6 h-6 rounded-full bg-[#21F1A8] text-[#171717] flex items-center justify-center font-bold text-xs">
            <Sparkles className="w-3.5 h-3.5" />
          </span>
          <span className="text-xs font-heading font-semibold text-white pr-1">
            AI Tutor
          </span>
        </button>
      )}

    </div>
  );
}
