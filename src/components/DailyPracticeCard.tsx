import { useState } from "react";
import {
  Flame,
  Shield,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  Zap,
  Play,
  RotateCcw,
  ChevronRight,
  Target,
} from "lucide-react";
import { Language } from "../types";
import { TopicCurriculum, Exercise } from "../types/gamification";
import { getAllTopics } from "../data/gamifiedCurriculum";

interface DailyPracticeCardProps {
  language: Language;
  streakCount: number;
  streakFreezes: number;
  activeDates: string[];
  isCompletedToday: boolean;
  dailyGoalMinutes: 5 | 10 | 15;
  minutesSpentToday: number;
  currentTopicKey: string;
  completedTopicKeys: string[];
  userXP: number;
  wrongAnswerCounts: Record<string, number>;
  onSetDailyGoal: (minutes: 5 | 10 | 15) => void;
  onBuyFreeze: () => void;
  onLaunchPractice: (topic: TopicCurriculum) => void;
}

export function DailyPracticeCard({
  language,
  streakCount,
  streakFreezes,
  activeDates,
  isCompletedToday,
  dailyGoalMinutes,
  minutesSpentToday,
  currentTopicKey,
  completedTopicKeys,
  userXP,
  wrongAnswerCounts,
  onSetDailyGoal,
  onBuyFreeze,
  onLaunchPractice,
}: DailyPracticeCardProps) {
  const topics = getAllTopics(language);
  const currentTopic = topics.find((t) => t.key === currentTopicKey) || topics[0];

  // Pick topics that have wrong answers for spaced revision
  const needsRevisionTopics = topics.filter(
    (t) => completedTopicKeys.includes(t.key) && (wrongAnswerCounts[t.key] || 0) > 0
  );

  // Generate Mon-Sun 7 days calendar
  const today = new Date();
  const currentDayIndex = (today.getDay() + 6) % 7; // Monday = 0, Sunday = 6
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Goal calculation
  const goalCompleted = minutesSpentToday >= dailyGoalMinutes || isCompletedToday;

  return (
    <div className="space-y-6">
      {/* Daily Goal Reminder Banner (if not yet done today) */}
      {!goalCompleted && (
        <div className="rounded-2xl border border-amber-300 bg-[#FFFBEB] p-4 text-amber-900 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in duration-200">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-200 text-amber-800 flex-none">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="font-bold text-sm text-[#92400E]">
                Today's Daily Goal Pending ({minutesSpentToday}/{dailyGoalMinutes} min)
              </p>
              <p className="text-xs text-[#B45309]">
                Complete your {dailyGoalMinutes}-minute session or today's practice problem to keep your {streakCount}-day streak burning!
              </p>
            </div>
          </div>
          <button
            onClick={() => onLaunchPractice(currentTopic)}
            className="flex-none px-4 py-2 rounded-xl text-xs font-bold bg-[#D97706] text-white hover:bg-[#B45309] transition flex items-center gap-1.5 shadow"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            <span>Practice Now</span>
          </button>
        </div>
      )}

      {/* Grid of Daily Challenge + Streak Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-[61.8fr_38.2fr] gap-6">
        {/* Card 1: Topic-Based Daily Challenge */}
        <article className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 sm:p-8 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#B45309] bg-[#FDE68A] px-2.5 py-1 rounded-full">
                  Today's Challenge
                </span>
                <span className="text-xs font-bold text-[var(--text-light)]">
                  Topic: {currentTopic.name}
                </span>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#DDEDE3] text-[#356146]">
                <Sparkles className="h-3.5 w-3.5" />
                <span>+40 Bonus XP</span>
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-main)]">
              Daily Practice: {currentTopic.name}
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
              Curated daily problems targeting your active topic ({currentTopic.name}).
              {needsRevisionTopics.length > 0 &&
                ` Includes spaced review questions from ${needsRevisionTopics.map((t) => t.name).join(", ")}.`}
            </p>

            {/* Problem breakdown badges */}
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--text-main)]">
                3 Current Topic Problems
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--text-main)]">
                1-2 Revision Problems
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-[#FFF0C7] text-[#9B6C09] border border-[#F6DC9A]">
                Streak Protection 🔥
              </span>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-[var(--text-light)]">
              <Target className="h-4 w-4 text-[#3D7A55]" />
              <span>Target: 3 to 5 minutes · Adaptive difficulty</span>
            </div>
            <button
              onClick={() => onLaunchPractice(currentTopic)}
              className="w-full sm:w-auto primary-button !py-3 !px-6 text-xs flex items-center justify-center gap-2"
            >
              <span>{isCompletedToday ? "Practice Again" : "Start Today's Challenge"}</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </article>

        {/* Card 2: Streak & Weekly Calendar & Freezes */}
        <article className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 sm:p-7 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-light)]">
                Streak & Habits
              </span>
              <span className="flex items-center gap-1 text-xs font-bold bg-[#FFF0C7] text-[#9B6C09] px-2.5 py-1 rounded-full">
                <Flame className="h-3.5 w-3.5 fill-current text-[#D97706]" />
                <span>{streakCount} {streakCount === 1 ? "day" : "days"}</span>
              </span>
            </div>

            {/* Weekly Mon-Sun calendar */}
            <div className="mt-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)] p-3.5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-light)] mb-2.5">
                Weekly Active Days (Mon–Sun)
              </p>
              <div className="grid grid-cols-7 gap-1 text-center">
                {weekDays.map((day, idx) => {
                  const isDayDone = isCompletedToday && idx === currentDayIndex;
                  const isPast = idx < currentDayIndex;
                  const isToday = idx === currentDayIndex;

                  return (
                    <div key={day} className="flex flex-col items-center gap-1">
                      <span className="text-[10px] font-bold text-[var(--text-light)]">{day}</span>
                      <div
                        className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          isDayDone
                            ? "bg-[#3D7A55] text-white ring-2 ring-[#DCEDE1]"
                            : isToday
                            ? "border-2 border-[#E2B93B] bg-white text-[#D97706] animate-pulse"
                            : isPast
                            ? "bg-[#E6E8E2] text-[#60655D]"
                            : "bg-[var(--border-subtle)] text-[var(--text-light)] opacity-60"
                        }`}
                      >
                        {isDayDone ? <CheckCircle2 className="h-4 w-4" /> : day[0]}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Daily Goal Picker */}
            <div className="mt-4 pt-3 border-t border-[var(--border-subtle)]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[var(--text-main)]">Daily Goal</span>
                <span className="text-xs text-[var(--text-light)] font-mono">{dailyGoalMinutes} min/day</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {([5, 10, 15] as const).map((mins) => (
                  <button
                    key={mins}
                    onClick={() => onSetDailyGoal(mins)}
                    className={`py-1.5 rounded-xl text-xs font-bold border transition-all ${
                      dailyGoalMinutes === mins
                        ? "border-[#20251F] bg-[#20251F] text-white shadow-sm"
                        : "border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-muted)] hover:border-[#20251F]"
                    }`}
                  >
                    {mins} min
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Streak Freeze & Hearts Power-Up Footer */}
          <div className="mt-5 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-[#3B82F6]" />
              <span className="text-xs font-bold text-[var(--text-main)]">
                {streakFreezes} {streakFreezes === 1 ? "Freeze" : "Freezes"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onBuyFreeze}
                disabled={userXP < 100}
                className="px-3 py-1.5 rounded-lg text-xs font-bold border border-blue-300 text-blue-700 bg-blue-50 hover:bg-blue-100 transition disabled:opacity-40"
                title="100 XP protects streak for 1 missed day"
              >
                +1 Freeze (100 XP)
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
