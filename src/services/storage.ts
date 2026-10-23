import { StudyTrackerData, StudySession, StudyGoal, IksCategory, QuizResult, MockTestResult } from '../types/iks';

const STORAGE_KEY = 'iks_explorer_study_data_v1';

const DEFAULT_GOALS: StudyGoal = {
  dailyMinutes: 30,
  weeklyHours: 3.5,
};

export const getStudyData = (): StudyTrackerData => {
  if (typeof window === 'undefined') {
    return { sessions: [], goals: DEFAULT_GOALS, completedTopics: [], quizResults: [], mockTestResults: [] };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { sessions: [], goals: DEFAULT_GOALS, completedTopics: [], quizResults: [], mockTestResults: [] };
    }
    const parsed = JSON.parse(raw);
    return {
      sessions: Array.isArray(parsed.sessions) ? parsed.sessions : [],
      goals: parsed.goals || DEFAULT_GOALS,
      completedTopics: Array.isArray(parsed.completedTopics) ? parsed.completedTopics : [],
      quizResults: Array.isArray(parsed.quizResults) ? parsed.quizResults : [],
      mockTestResults: Array.isArray(parsed.mockTestResults) ? parsed.mockTestResults : [],
    };
  } catch (e) {
    console.error('Failed to parse local study tracker data', e);
    return { sessions: [], goals: DEFAULT_GOALS, completedTopics: [], quizResults: [], mockTestResults: [] };
  }
};

export const saveStudyData = (data: StudyTrackerData): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save study tracker data', e);
  }
};

export const addStudySession = (
  subject: IksCategory,
  durationSeconds: number,
  topic?: string
): StudySession => {
  const current = getStudyData();
  const newSession: StudySession = {
    id: 'session_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
    subject,
    durationSeconds,
    timestamp: new Date().toISOString(),
    topic,
  };
  const updated: StudyTrackerData = {
    ...current,
    sessions: [newSession, ...current.sessions],
  };
  saveStudyData(updated);
  return newSession;
};

export const updateStudyGoals = (goals: Partial<StudyGoal>): StudyGoal => {
  const current = getStudyData();
  const updatedGoals: StudyGoal = {
    ...current.goals,
    ...goals,
  };
  saveStudyData({
    ...current,
    goals: updatedGoals,
  });
  return updatedGoals;
};

export const toggleCompletedTopic = (topicId: string): string[] => {
  const current = getStudyData();
  const exists = current.completedTopics.includes(topicId);
  const updatedTopics = exists
    ? current.completedTopics.filter((t) => t !== topicId)
    : [...current.completedTopics, topicId];

  saveStudyData({
    ...current,
    completedTopics: updatedTopics,
  });
  return updatedTopics;
};

export const formatDuration = (totalSeconds: number): string => {
  if (totalSeconds < 60) return `${totalSeconds}s`;
  const minutes = Math.floor(totalSeconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const remainingMins = minutes % 60;
  return remainingMins > 0 ? `${hours}h ${remainingMins}m` : `${hours}h`;
};

export const getTodaySeconds = (sessions: StudySession[]): number => {
  const today = new Date().toISOString().slice(0, 10);
  return sessions
    .filter((s) => s.timestamp.slice(0, 10) === today)
    .reduce((acc, curr) => acc + curr.durationSeconds, 0);
};

export const getWeeklySeconds = (sessions: StudySession[]): number => {
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  return sessions
    .filter((s) => new Date(s.timestamp) >= sevenDaysAgo)
    .reduce((acc, curr) => acc + curr.durationSeconds, 0);
};

export const addQuizResult = (result: Omit<QuizResult, 'id' | 'timestamp'>): QuizResult => {
  const current = getStudyData();
  const newResult: QuizResult = {
    ...result,
    id: 'quiz_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
    timestamp: new Date().toISOString(),
  };
  const updatedResults = [newResult, ...(current.quizResults || [])];
  saveStudyData({
    ...current,
    quizResults: updatedResults,
  });
  return newResult;
};

export const addMockTestResult = (result: Omit<MockTestResult, 'id' | 'timestamp'>): MockTestResult => {
  const current = getStudyData();
  const newResult: MockTestResult = {
    ...result,
    id: 'test_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
    timestamp: new Date().toISOString(),
  };
  const updatedTests = [newResult, ...(current.mockTestResults || [])];
  saveStudyData({
    ...current,
    mockTestResults: updatedTests,
  });
  return newResult;
};

