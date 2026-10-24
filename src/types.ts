export type Screen = "login" | "verify-email" | "onboarding" | "dashboard" | "learn";
export type Language = "Python" | "JavaScript" | "Java" | "C++" | "Linux" | "C" | "HTML" | "CSS" | "MySQL";
export type DashboardTab = "overview" | "tracks" | "library" | "evaluator" | "achievements";

export interface CodeEvaluationIssue {
  severity: "critical" | "warning" | "suggestion";
  line?: string;
  description: string;
  recommendation: string;
}

export interface CodeEvaluationResult {
  duckGreeting: string;
  overallRating: string;
  score: number;
  summary: string;
  strengths: string[];
  issues: CodeEvaluationIssue[];
  improvements: string[];
  improvedCode: string;
  duckWisdom: string;
}

export interface Achievement {
  id: string;
  title: string;
  category: "Lessons" | "Streak" | "Mastery" | "Special";
  description: string;
  icon: string;
  accentColor: string;
  bgGradient: string;
  isUnlocked: boolean;
  progress: number;
  progressLabel: string;
  unlockedAt?: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  emailVerified: boolean;
  onboardingCompleted?: boolean;
  selectedLanguages?: Language[];
  completedLessons?: string[];
  verificationCode?: string;
  createdAt?: string;
  streakCount?: number;
  lastActiveDate?: string;
  activeDates?: string[];
}

export interface Lesson {
  id: string;
  number: string;
  title: string;
  level: 1 | 2 | 3;
  duration: string;
  intro: string;
  code: string;
  hint: string;
  expectedOutput?: string;
  tags: string[];
}

export interface TrackLevel {
  level: number;
  levelLabel: string;
  title: string;
  accent: string;
  countLabel: string;
  copy: string;
  action: string;
  lessons: Lesson[];
}

export interface CodeSnippet {
  id: string;
  title: string;
  category: "Basics & I/O" | "Data Structures" | "Control Flow" | "Functions" | "Algorithms";
  language: Language;
  description: string;
  code: string;
  outputPreview: string;
  tags: string[];
}
