import { Language } from "../types";

export type ThemeMode = "light" | "dim" | "dark" | "night";

export type Difficulty = "easy" | "moderate" | "intermediate" | "advanced";

export type ExerciseType =
  | "puzzle"
  | "bug_hunt"
  | "predict_output"
  | "fill_blank"
  | "match_pairs"
  | "coding";

export interface PuzzleExercise {
  id: string;
  topicKey: string;
  language: Language;
  difficulty: Difficulty;
  type: "puzzle";
  title: string;
  prompt: string;
  hint: string;
  explanation: string;
  scrambledLines: { id: string; text: string }[];
  correctOrder: string[]; // array of IDs in correct order
}

export interface BugHuntExercise {
  id: string;
  topicKey: string;
  language: Language;
  difficulty: Difficulty;
  type: "bug_hunt";
  title: string;
  prompt: string;
  codeLines: string[];
  buggyLineIndex: number;
  fixOptions: string[];
  correctFix: string;
  hint: string;
  explanation: string;
}

export interface PredictOutputExercise {
  id: string;
  topicKey: string;
  language: Language;
  difficulty: Difficulty;
  type: "predict_output";
  title: string;
  prompt: string;
  codeSnippet: string;
  options: string[];
  correctAnswer: string;
  hint: string;
  explanation: string;
}

export interface FillBlankExercise {
  id: string;
  topicKey: string;
  language: Language;
  difficulty: Difficulty;
  type: "fill_blank";
  title: string;
  prompt: string;
  codeBeforeBlank: string;
  blankPlaceholder: string;
  codeAfterBlank: string;
  options: string[];
  correctAnswer: string;
  hint: string;
  explanation: string;
}

export interface MatchPairsExercise {
  id: string;
  topicKey: string;
  language: Language;
  difficulty: Difficulty;
  type: "match_pairs";
  title: string;
  prompt: string;
  pairs: { term: string; meaning: string }[];
  hint: string;
  explanation: string;
}

export interface CodingExercise {
  id: string;
  topicKey: string;
  language: Language;
  difficulty: Difficulty;
  type: "coding";
  title: string;
  prompt: string;
  instructions: string;
  starterCode: string;
  expectedOutput: string;
  solutionCode: string;
  hint: string;
  explanation: string;
  testCases?: { input?: string; expectedOutput: string }[];
}

export type Exercise =
  | PuzzleExercise
  | BugHuntExercise
  | PredictOutputExercise
  | FillBlankExercise
  | MatchPairsExercise
  | CodingExercise;

export interface TopicCurriculum {
  key: string;
  name: string;
  tagline: string;
  iconName: string;
  order: number;
  realLifeAnalogy: {
    metaphor: string;
    details: string;
  };
  conceptCard: {
    summary: string;
    codeExample: string;
    whatItDoes: string[];
    keyTakeaway: string;
  };
  exercises: Exercise[];
  bossChallenge?: CodingExercise;
}

export interface GamifiedState {
  selectedLanguage: Language;
  xp: number;
  level: number;
  hearts: number;
  lastHeartRefillDate: string;
  streak: number;
  streakFreezes: number;
  lastStreakDate?: string;
  activeDates: string[];
  dailyGoalMinutes: 5 | 10 | 15;
  minutesSpentToday: number;
  lastActiveDayDate: string;
  completedTopics: Record<string, string[]>; // language -> topicKey[]
  topicMastery: Record<string, Record<string, number>>; // language -> topicKey -> 0-100
  topicDifficulty: Record<string, Record<string, Difficulty>>; // language -> topicKey -> Difficulty
  wrongAnswerCounts: Record<string, number>; // topicKey -> wrong counts
  spacedRepetitionSchedule: Record<string, string>; // topicKey -> next review ISO string
  unlockedBadges: string[];
  dailyChallengeCompletedDates: string[];
  themeMode: ThemeMode;
  brightness: number; // 50-100
}
