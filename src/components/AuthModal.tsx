import React, { useState } from 'react';
import { UserProfile } from '../types/auth';
import { authService } from '../services/authService';
import { 
  X, 
  User, 
  LogIn, 
  Sparkles, 
  LogOut, 
  GraduationCap, 
  Flame, 
  CheckCircle2, 
  BookMarked,
  ShieldCheck,
  Mail,
  Lock
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, currentUser }) => {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup' | 'demo'>('demo');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [selectedRole, setSelectedRole] = useState<'Vedic Scholar' | 'IKS Student' | 'Civil Services Aspirant'>('IKS Student');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide your email and password');
      return;
    }
    setError(null);
    authService.loginWithCredentials(email, password, name);
    onClose();
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !name) {
      setError('Please fill in all registration fields');
      return;
    }
    setError(null);
    authService.loginWithCredentials(email, password, name);
    authService.updateProfile({ role: selectedRole });
    onClose();
  };

  const handleDemoLogin = (role: 'Vedic Scholar' | 'IKS Student' | 'Civil Services Aspirant') => {
    authService.loginWithDemoRole(role);
    onClose();
  };

  const handleSignOut = () => {
    authService.logout();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-[#191919]/95 border border-[#21F1A8]/30 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_35px_rgba(33,241,168,0.15)] overflow-hidden text-white font-body"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#1f1f1f]/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#21F1A8]/15 border border-[#21F1A8]/30 flex items-center justify-center text-[#21F1A8]">
              {currentUser ? <User className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
            </div>
            <div>
              <h2 id="auth-modal-title" className="text-base font-heading font-bold text-white">
                {currentUser ? 'Scholar Account & Progress' : 'Sign In to IKS Explorer AI'}
              </h2>
              <p className="text-xs text-[#A0A0A0]">
                {currentUser ? 'Your authenticated Vedic learning profile' : 'Track your quizzes, mock tests, and streak'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {currentUser ? (
            /* Logged-In User Profile View */
            <div className="space-y-5">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-[#222222] border border-white/10">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#21F1A8]/30 via-[#21F1A8]/10 to-[#171717] border-2 border-[#21F1A8] flex items-center justify-center text-[#21F1A8] font-heading font-bold text-xl shadow-[0_0_15px_rgba(33,241,168,0.25)]">
                  {currentUser.avatarSeed || 'IK'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-heading font-bold text-white truncate">
                      {currentUser.name}
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#21F1A8]/15 text-[#21F1A8] border border-[#21F1A8]/30 font-semibold shrink-0">
                      {currentUser.role}
                    </span>
                  </div>
                  <p className="text-xs text-[#999999] truncate mt-0.5">{currentUser.email}</p>
                  {currentUser.institution && (
                    <p className="text-[11px] text-[#A0A0A0] truncate mt-0.5">{currentUser.institution}</p>
                  )}
                </div>
              </div>

              {/* Progress & Stats Cards */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-[#222222] border border-white/5 text-center">
                  <div className="flex items-center justify-center gap-1 text-[#21F1A8] text-xs font-mono mb-1">
                    <Flame className="w-3.5 h-3.5 text-orange-400" />
                    <span>Streak</span>
                  </div>
                  <div className="text-lg font-heading font-bold text-white">
                    {currentUser.studyStreakDays} <span className="text-xs font-normal text-[#888888]">days</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#222222] border border-white/5 text-center">
                  <div className="flex items-center justify-center gap-1 text-[#21F1A8] text-xs font-mono mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Quizzes</span>
                  </div>
                  <div className="text-lg font-heading font-bold text-white">
                    {currentUser.quizzesCompleted}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#222222] border border-white/5 text-center">
                  <div className="flex items-center justify-center gap-1 text-[#21F1A8] text-xs font-mono mb-1">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Avg Score</span>
                  </div>
                  <div className="text-lg font-heading font-bold text-[#21F1A8]">
                    {currentUser.averageScore}%
                  </div>
                </div>
              </div>

              {/* Bookmarks */}
              <div className="p-3.5 rounded-xl bg-[#222222] border border-white/5">
                <div className="text-xs font-mono text-[#CCCCCC] flex items-center gap-1.5 mb-2">
                  <BookMarked className="w-3.5 h-3.5 text-[#21F1A8]" />
                  <span>Saved Research Portals</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {currentUser.bookmarks.map((bm) => (
                    <span 
                      key={bm}
                      className="px-2.5 py-1 text-xs rounded-md bg-[#181818] border border-white/10 text-white/90"
                    >
                      {bm}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-white/[0.08]">
                <div className="flex items-center gap-1.5 text-xs text-[#21F1A8]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Session Active & Persistent</span>
                </div>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          ) : (
            /* Logged-Out Tabs */
            <div>
              {/* Tab Selector */}
              <div className="flex p-1 rounded-xl bg-[#202020] border border-white/10 mb-5">
                <button
                  type="button"
                  onClick={() => { setActiveTab('demo'); setError(null); }}
                  className={`flex-1 py-1.5 text-xs font-mono font-medium rounded-lg transition-all cursor-pointer ${
                    activeTab === 'demo'
                      ? 'bg-[#21F1A8] text-[#171717] font-bold shadow-sm'
                      : 'text-[#A0A0A0] hover:text-white'
                  }`}
                >
                  Instant Scholar Access
                </button>
                <button
                  type="button"
                  onClick={() => { setActiveTab('signin'); setError(null); }}
                  className={`flex-1 py-1.5 text-xs font-mono font-medium rounded-lg transition-all cursor-pointer ${
                    activeTab === 'signin'
                      ? 'bg-[#21F1A8] text-[#171717] font-bold shadow-sm'
                      : 'text-[#A0A0A0] hover:text-white'
                  }`}
                >
                  Email Sign In
                </button>
                <button
                  type="button"
                  onClick={() => { setActiveTab('signup'); setError(null); }}
                  className={`flex-1 py-1.5 text-xs font-mono font-medium rounded-lg transition-all cursor-pointer ${
                    activeTab === 'signup'
                      ? 'bg-[#21F1A8] text-[#171717] font-bold shadow-sm'
                      : 'text-[#A0A0A0] hover:text-white'
                  }`}
                >
                  Register
                </button>
              </div>

              {error && (
                <div className="mb-4 p-2.5 rounded-lg bg-red-500/15 border border-red-500/30 text-red-300 text-xs">
                  {error}
                </div>
              )}

              {/* Tab 1: Instant Curated Scholar Demo Roles */}
              {activeTab === 'demo' && (
                <div className="space-y-3">
                  <p className="text-xs text-[#A0A0A0]">
                    Select a curated scholar profile for instant 1-click access with simulated progress, streaks, and bookmarks:
                  </p>

                  <button
                    type="button"
                    onClick={() => handleDemoLogin('Vedic Scholar')}
                    className="w-full p-3.5 rounded-xl bg-[#222222] hover:bg-[#282828] border border-white/10 hover:border-[#21F1A8]/50 flex items-center justify-between text-left transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#21F1A8]/10 border border-[#21F1A8]/30 flex items-center justify-center text-[#21F1A8] font-bold font-mono">
                        VS
                      </div>
                      <div>
                        <div className="text-sm font-heading font-bold text-white group-hover:text-[#21F1A8] transition-colors">
                          Dr. Aryaman Sharma
                        </div>
                        <div className="text-xs text-[#A0A0A0]">Vedic Scholar · 14-day streak · 92% avg</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-[#21F1A8] opacity-0 group-hover:opacity-100 transition-opacity">
                      Enter ↗
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDemoLogin('Civil Services Aspirant')}
                    className="w-full p-3.5 rounded-xl bg-[#222222] hover:bg-[#282828] border border-white/10 hover:border-[#21F1A8]/50 flex items-center justify-between text-left transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 font-bold font-mono">
                        CS
                      </div>
                      <div>
                        <div className="text-sm font-heading font-bold text-white group-hover:text-amber-300 transition-colors">
                          Priyanka Sen
                        </div>
                        <div className="text-xs text-[#A0A0A0]">UPSC GS-1 Aspirant · 28-day streak · 42 quizzes</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      Enter ↗
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDemoLogin('IKS Student')}
                    className="w-full p-3.5 rounded-xl bg-[#222222] hover:bg-[#282828] border border-white/10 hover:border-[#21F1A8]/50 flex items-center justify-between text-left transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-sky-400/10 border border-sky-400/30 flex items-center justify-center text-sky-400 font-bold font-mono">
                        IS
                      </div>
                      <div>
                        <div className="text-sm font-heading font-bold text-white group-hover:text-sky-300 transition-colors">
                          Devavrat Mishra
                        </div>
                        <div className="text-xs text-[#A0A0A0]">IIT Indic Studies Student · 7-day streak</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-sky-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      Enter ↗
                    </span>
                  </button>
                </div>
              )}

              {/* Tab 2: Standard Email Sign In */}
              {activeTab === 'signin' && (
                <form onSubmit={handleSignIn} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-mono text-[#CCCCCC] mb-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="scholar@iks.org"
                        className="w-full pl-9 pr-3 py-2 bg-[#202020] border border-white/10 rounded-lg text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#21F1A8]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#CCCCCC] mb-1">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-9 pr-3 py-2 bg-[#202020] border border-white/10 rounded-lg text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#21F1A8]"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-lg bg-[#21F1A8] hover:bg-[#21F1A8]/90 text-[#171717] font-semibold text-sm transition-all cursor-pointer shadow-lg shadow-[#21F1A8]/20 mt-2"
                  >
                    Sign In
                  </button>
                </form>
              )}

              {/* Tab 3: Registration */}
              {activeTab === 'signup' && (
                <form onSubmit={handleSignUp} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-mono text-[#CCCCCC] mb-1">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Anandita Joshi"
                      className="w-full px-3 py-2 bg-[#202020] border border-white/10 rounded-lg text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#21F1A8]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#CCCCCC] mb-1">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="anandita@university.edu"
                      className="w-full px-3 py-2 bg-[#202020] border border-white/10 rounded-lg text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#21F1A8]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#CCCCCC] mb-1">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create secure password"
                      className="w-full px-3 py-2 bg-[#202020] border border-white/10 rounded-lg text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#21F1A8]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#CCCCCC] mb-1">Academic Role</label>
                    <select
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value as any)}
                      className="w-full px-3 py-2 bg-[#202020] border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-[#21F1A8]"
                    >
                      <option value="IKS Student">IKS Student</option>
                      <option value="Vedic Scholar">Vedic Scholar</option>
                      <option value="Civil Services Aspirant">Civil Services Aspirant</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-lg bg-[#21F1A8] hover:bg-[#21F1A8]/90 text-[#171717] font-semibold text-sm transition-all cursor-pointer shadow-lg shadow-[#21F1A8]/20 mt-2"
                  >
                    Create Account
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
