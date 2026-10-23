export type IksCategory = 
  | 'mathematics' 
  | 'astronomy' 
  | 'philosophy' 
  | 'ayurveda' 
  | 'literature';

export type AppRoute = 
  | '/' 
  | '/explore' 
  | '/mathematics' 
  | '/astronomy' 
  | '/philosophy' 
  | '/ayurveda' 
  | '/literature' 
  | '/sanskrit'
  | '/study-tracker' 
  | '/video-learning' 
  | '/ai-tutor'
  | '/quizzes'
  | '/mock-tests';

export type VideoSubjectCategory = 
  | 'Uncategorized'
  | 'Mathematics'
  | 'Astronomy'
  | 'Philosophy'
  | 'Ayurveda'
  | 'Literature';

export interface YouTubeVideoItem {
  id: string;
  url: string;
  title: string;
  category: VideoSubjectCategory;
  addedAt: string;
}

export type QuizDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface QuizQuestion {
  id: string;
  subject: IksCategory;
  topic: string;
  difficulty: QuizDifficulty;
  question: string;
  options: [string, string, string, string];
  correctIndex: number; // 0, 1, 2, or 3
  explanation: string;
  sourceText: string;
}

export interface QuizTopic {
  id: string;
  title: string;
  subject: IksCategory;
  difficulty: QuizDifficulty;
  questionCount: number;
  description: string;
}

export interface QuizResult {
  id: string;
  topicId: string;
  topicTitle: string;
  subject: IksCategory;
  score: number;
  total: number;
  percentage: number;
  timestamp: string;
  userAnswers: Record<string, number>; // questionId -> optionIndex
}

export interface MockTestConfig {
  subject: IksCategory | 'mixed';
  questionCount: number;
  difficulty: 'all' | QuizDifficulty;
  durationMinutes: number;
}

export interface MockTestResult {
  id: string;
  timestamp: string;
  subject: IksCategory | 'mixed';
  totalQuestions: number;
  answeredCount: number;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  score: number;
  percentage: number;
  timeTakenSeconds: number;
  topicBreakdown: Record<string, { correct: number; total: number }>;
  questions: QuizQuestion[];
  userAnswers: Record<string, number>;
}

export interface StudySession {
  id: string;
  subject: IksCategory;
  durationSeconds: number;
  timestamp: string; // ISO date string
  topic?: string;
}

export interface StudyGoal {
  dailyMinutes: number;
  weeklyHours: number;
}

export interface StudyTrackerData {
  sessions: StudySession[];
  goals: StudyGoal;
  completedTopics: string[];
  quizResults?: QuizResult[];
  mockTestResults?: MockTestResult[];
}

export interface Scholar {
  name: string;
  sanskritName: string;
  era: string;
  location: string;
  works: string[];
  contribution: string;
}

export interface SubjectPortal {
  id: IksCategory;
  title: string;
  sanskritTitle: string;
  tagline: string;
  summary: string;
  iconName: string;
  verse: {
    sanskrit: string;
    transliteration: string;
    english: string;
    source: string;
  };
  keyScholars: Scholar[];
  coreDiscoveries: {
    title: string;
    era: string;
    description: string;
    modernRelevance: string;
  }[];
  manuscripts: string[];
  interactiveSimId: 'baudhayana' | 'armillary' | 'darshana' | 'tridosha' | 'panini';
}

export interface TimelineMilestone {
  year: string;
  period: string;
  numericSortYear: number;
  title: string;
  sanskritName?: string;
  category: IksCategory;
  scholar?: string;
  institution?: string;
  description: string;
  impact: string;
  sourceText: string;
}

export interface VideoLesson {
  id: string;
  title: string;
  category: IksCategory;
  duration: string;
  instructor: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  chapters: string[];
  sourceReference: string;
}

export interface SearchableTopic {
  id: string;
  title: string;
  sanskritTitle?: string;
  category: IksCategory;
  era: string;
  summary: string;
  tags: string[];
  readingTime: string;
}
