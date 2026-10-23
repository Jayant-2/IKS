import { UserProfile, AuthState } from '../types/auth';

const STORAGE_KEY = 'iks_user_auth_session';

const DEFAULT_SCHOLAR_USER: UserProfile = {
  id: 'usr_vedic_01',
  name: 'Aryaman Sharma',
  email: 'aryaman.sharma@iks.ac.in',
  role: 'Vedic Scholar',
  institution: 'National Council for Indian Knowledge Systems',
  avatarSeed: 'AS',
  joinedDate: 'October 2026',
  studyStreakDays: 14,
  quizzesCompleted: 18,
  testsCompleted: 6,
  averageScore: 92,
  bookmarks: ['Sulba Sutras', 'Surya Siddhanta', 'Panini Shiva Sutras'],
  preferredScript: 'Devanagari',
};

class AuthService {
  private currentUser: UserProfile | null = null;
  private listeners: Set<(state: AuthState) => void> = new Set();

  constructor() {
    this.loadSession();
  }

  private loadSession() {
    if (typeof window === 'undefined') return;
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        this.currentUser = JSON.parse(data);
      }
    } catch (e) {
      console.warn('Could not load auth session from localStorage:', e);
    }
  }

  private saveSession() {
    if (typeof window === 'undefined') return;
    try {
      if (this.currentUser) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.currentUser));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      console.warn('Could not save auth session:', e);
    }
    this.notify();
  }

  public subscribe(listener: (state: AuthState) => void): () => void {
    this.listeners.add(listener);
    listener(this.getState());
    return () => this.listeners.delete(listener);
  }

  private notify() {
    const state = this.getState();
    this.listeners.forEach((fn) => fn(state));
  }

  public getState(): AuthState {
    return {
      user: this.currentUser,
      isAuthenticated: Boolean(this.currentUser),
      isLoading: false,
    };
  }

  public getCurrentUser(): UserProfile | null {
    return this.currentUser;
  }

  public loginWithCredentials(email: string, _password?: string, name?: string): UserProfile {
    // Generate or retrieve user profile
    const initials = (name || email.split('@')[0])
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    const user: UserProfile = {
      id: `usr_${Date.now()}`,
      name: name || email.split('@')[0],
      email: email,
      role: 'IKS Student',
      institution: 'Independent Scholar',
      avatarSeed: initials || 'IK',
      joinedDate: 'October 2026',
      studyStreakDays: 3,
      quizzesCompleted: 4,
      testsCompleted: 1,
      averageScore: 85,
      bookmarks: ['Sulba Sutras', 'Ayurveda Tridosha'],
      preferredScript: 'English',
    };

    this.currentUser = user;
    this.saveSession();
    return user;
  }

  public loginWithDemoRole(role: 'Vedic Scholar' | 'IKS Student' | 'Civil Services Aspirant'): UserProfile {
    let user: UserProfile;

    if (role === 'Vedic Scholar') {
      user = { ...DEFAULT_SCHOLAR_USER };
    } else if (role === 'Civil Services Aspirant') {
      user = {
        id: 'usr_aspirant_02',
        name: 'Priyanka Sen',
        email: 'priyanka.sen@upsc-aspirant.org',
        role: 'Civil Services Aspirant',
        institution: 'UPSC GS-1 Indic Studies Academy',
        avatarSeed: 'PS',
        joinedDate: 'September 2026',
        studyStreakDays: 28,
        quizzesCompleted: 42,
        testsCompleted: 12,
        averageScore: 88,
        bookmarks: ['Arthashastra', 'Charaka Samhita', 'Surya Siddhanta'],
        preferredScript: 'English',
      };
    } else {
      user = {
        id: 'usr_student_03',
        name: 'Devavrat Mishra',
        email: 'devavrat.mishra@vidya.edu.in',
        role: 'IKS Student',
        institution: 'Indian Institute of Technology, Indic Studies',
        avatarSeed: 'DM',
        joinedDate: 'October 2026',
        studyStreakDays: 7,
        quizzesCompleted: 14,
        testsCompleted: 3,
        averageScore: 91,
        bookmarks: ['Kerala School Calculus', 'Panini Grammar'],
        preferredScript: 'Devanagari',
      };
    }

    this.currentUser = user;
    this.saveSession();
    return user;
  }

  public logout() {
    this.currentUser = null;
    this.saveSession();
  }

  public updateProfile(updates: Partial<UserProfile>) {
    if (!this.currentUser) return;
    this.currentUser = { ...this.currentUser, ...updates };
    this.saveSession();
  }
}

export const authService = new AuthService();
