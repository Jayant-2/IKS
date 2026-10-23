export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'Vedic Scholar' | 'IKS Student' | 'Civil Services Aspirant' | 'Research Fellow';
  institution?: string;
  avatarSeed?: string;
  joinedDate: string;
  studyStreakDays: number;
  quizzesCompleted: number;
  testsCompleted: number;
  averageScore: number;
  bookmarks: string[];
  preferredScript: 'Devanagari' | 'IAST' | 'English';
}

export interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
