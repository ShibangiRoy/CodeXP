import { useState } from "react";
import {
  CheckCircle2,
  Lock,
  Play,
  Flame,
  Award,
  Crown,
  Sparkles,
  RotateCcw,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { TopicCurriculum, Difficulty } from "../types/gamification";
import { getAllTopics } from "../data/gamifiedCurriculum";
import { Language } from "../types";

interface SkillMapProps {
  language: Language;
  completedTopics: string[]; // array of topic keys completed
  topicMastery: Record<string, number>; // topicKey -> 0 to 100
  topicDifficulty: Record<string, Difficulty>; // topicKey -> difficulty
  onStartLesson: (topic: TopicCurriculum) => void;
  onStartWarmUp: (previousTopic: TopicCurriculum) => void;
  wrongAnswerCounts: Record<string, number>;
}

export function SkillMap({
  language,
  completedTopics,
  topicMastery,
  topicDifficulty,
  onStartLesson,
  onStartWarmUp,
  wrongAnswerCounts,
}: SkillMapProps) {
  const topics = getAllTopics(language);

  // Determine current active topic (first uncompleted topic, or last if all completed)
  const currentTopicIndex = topics.findIndex((t) => !completedTopics.includes(t.key));
  const activeIndex = currentTopicIndex === -1 ? topics.length - 1 : currentTopicIndex;
  const activeTopic = topics[activeIndex] || topics[0];

  // Check if warm-up is available (if starting topic 2 or later, and previous topic exists)
  const previousTopic = activeIndex > 0 ? topics[activeIndex - 1] : null;

  const getDifficultyBadge = (diff: Difficulty = "easy") => {
    switch (diff) {
      case "easy":
        return { label: "Easy", color: "bg-emerald-100 text-emerald-800 border-emerald-300" };
      case "moderate":
        return { label: "Moderate", color: "bg-amber-100 text-amber-800 border-amber-300" };
      case "intermediate":
        return { label: "Intermediate", color: "bg-orange-100 text-orange-800 border-orange-300" };
      case "advanced":
        return { label: "Advanced", color: "bg-rose-100 text-rose-800 border-rose-300" };
    }
  };

  return (
    <div className="space-y-8">
      {/* Warm-Up Before Your Next Lesson Banner */}
      {previousTopic && (
        <div className="rounded-3xl border border-[#9CAFEF] bg-gradient-to-r from-[#EEF2FF] to-[#F5F3FF] p-6 text-[#1E3A8A] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white shadow-sm text-[#4338CA] flex-none">
              <RotateCcw className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#4338CA] bg-white px-2.5 py-0.5 rounded-full border border-indigo-200">
                  Recommended Warm-Up
                </span>
                <span className="text-xs font-semibold text-indigo-700">
                  Spaced Repetition
                </span>
              </div>
              <h3 className="mt-1 text-lg font-bold text-[#1E1B4B]">
                Quick 3-Question Warm-Up: {previousTopic.name}
              </h3>
              <p className="mt-0.5 text-xs text-[#3730A3] leading-relaxed max-w-xl">
                Warm up your memory on {previousTopic.name} before starting{" "}
                {activeTopic.name}. Strengthen retention and earn bonus XP!
              </p>
            </div>
          </div>
          <button
            onClick={() => onStartWarmUp(previousTopic)}
            className="flex-none px-5 py-3 rounded-2xl text-xs font-bold bg-[#4338CA] text-white hover:bg-[#3730A3] transition shadow-md flex items-center gap-2"
          >
            <span>Start Quick Warm-Up</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Main Winding Path Container */}
      <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 sm:p-10 shadow-sm relative overflow-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-[var(--border-subtle)] gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#3D7A55]">
                Sequential Skill Map
              </span>
              <span className="text-xs text-[var(--text-light)]">·</span>
              <span className="text-xs font-bold text-[var(--text-muted)]">
                {language} Mastery Path
              </span>
            </div>
            <h2 className="mt-1 text-2xl font-bold tracking-tight">
              Your Winding Learning Path
            </h2>
            <p className="mt-1 text-xs text-[var(--text-muted)]">
              Master each foundational concept step-by-step. The next node unlocks only after completing the previous one.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card-subtle)] text-xs font-bold text-[var(--text-muted)]">
              {completedTopics.length} / {topics.length + 1} Unlocked
            </div>
          </div>
        </div>

        {/* Winding Nodes Layout */}
        <div className="relative mt-10 max-w-2xl mx-auto py-4">
          {/* Connecting Curved Center Guide Line */}
          <div className="absolute left-1/2 top-4 bottom-4 w-1 -translate-x-1/2 bg-[var(--border-subtle)] rounded-full -z-0 hidden md:block" />

          <div className="space-y-12 relative z-10">
            {topics.map((topic, index) => {
              const isCompleted = completedTopics.includes(topic.key);
              const isCurrent = index === activeIndex;
              const isLocked = !isCompleted && !isCurrent;
              const mastery = topicMastery[topic.key] || (isCompleted ? 100 : 0);
              const currentDiff = topicDifficulty[topic.key] || "easy";
              const diffBadge = getDifficultyBadge(currentDiff);
              const wrongCount = wrongAnswerCounts[topic.key] || 0;

              // Alternating position for winding effect
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={topic.key}
                  className={`flex items-center ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  } justify-center gap-6 group`}
                >
                  {/* Topic Node Card */}
                  <div
                    className={`w-full md:w-80 rounded-2xl border p-5 transition-all ${
                      isCompleted
                        ? "border-emerald-300 bg-white shadow-sm hover:shadow-md"
                        : isCurrent
                        ? "border-[#F4C84B] ring-4 ring-[#F4C84B]/20 bg-white shadow-lg scale-105"
                        : "border-[var(--border-color)] bg-[var(--bg-card-subtle)] opacity-75"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`grid h-10 w-10 place-items-center rounded-2xl font-bold text-sm shadow-sm ${
                            isCompleted
                              ? "bg-emerald-500 text-white"
                              : isCurrent
                              ? "bg-[#20251F] text-[#F4C84B] ring-2 ring-[#F4C84B]"
                              : "bg-[var(--border-color)] text-[var(--text-light)]"
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="h-5 w-5" />
                          ) : isLocked ? (
                            <Lock className="h-4 w-4" />
                          ) : (
                            <span>{topic.order}</span>
                          )}
                        </div>

                        <div>
                          <p className="text-[10px] font-extrabold uppercase tracking-wider text-[var(--text-light)]">
                            Node {topic.order} · {topic.key}
                          </p>
                          <h4 className="text-base font-bold text-[var(--text-main)]">
                            {topic.name}
                          </h4>
                        </div>
                      </div>

                      {/* Difficulty Tag */}
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${diffBadge.color}`}
                      >
                        {diffBadge.label}
                      </span>
                    </div>

                    <p className="mt-2 text-xs text-[var(--text-muted)] leading-relaxed">
                      {topic.tagline}
                    </p>

                    {/* Mastery Meter Bar */}
                    <div className="mt-4 pt-3 border-t border-[var(--border-subtle)]">
                      <div className="flex items-center justify-between text-[11px] font-bold mb-1.5">
                        <span className="text-[var(--text-light)]">Mastery Meter</span>
                        <span className={mastery >= 80 ? "text-emerald-700" : "text-[#D97706]"}>
                          {mastery}%
                        </span>
                      </div>
                      <div className="h-2 w-full bg-[var(--border-subtle)] rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            mastery >= 80 ? "bg-emerald-500" : "bg-[#D97706]"
                          }`}
                          style={{ width: `${mastery}%` }}
                        />
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="mt-4">
                      {isCompleted ? (
                        <button
                          onClick={() => onStartLesson(topic)}
                          className="w-full py-2.5 px-4 rounded-xl text-xs font-bold border border-emerald-300 text-emerald-800 bg-emerald-50 hover:bg-emerald-100 transition flex items-center justify-center gap-1.5"
                        >
                          <RotateCcw className="h-3.5 w-3.5" />
                          <span>Practice Again (Review)</span>
                        </button>
                      ) : isCurrent ? (
                        <button
                          onClick={() => onStartLesson(topic)}
                          className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-[#20251F] text-white hover:bg-[#344036] transition shadow-md flex items-center justify-center gap-1.5"
                        >
                          <Play className="h-3.5 w-3.5 fill-current" />
                          <span>Start Lesson</span>
                        </button>
                      ) : (
                        <div className="w-full py-2 px-3 rounded-xl text-[11px] font-semibold text-center text-[var(--text-light)] bg-[var(--bg-card)] border border-[var(--border-subtle)] flex items-center justify-center gap-1">
                          <Lock className="h-3 w-3" />
                          <span>Complete previous topic to unlock</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Boss Level Gauntlet Node */}
            <div className="flex justify-center pt-4">
              <div
                className={`w-full md:w-96 rounded-3xl border-2 p-6 transition-all text-center ${
                  completedTopics.length >= topics.length
                    ? "border-[#F4C84B] bg-gradient-to-b from-[#FFFDF5] to-[#FFF9E6] shadow-xl"
                    : "border-[var(--border-color)] bg-[var(--bg-card-subtle)] opacity-70"
                }`}
              >
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#FFF0C7] text-[#9B6C09] shadow-md mb-3">
                  <Crown className="h-7 w-7 text-[#D97706]" />
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#B45309] bg-[#FDE68A] px-3 py-1 rounded-full">
                  Chapter Finale
                </span>
                <h3 className="mt-2 text-xl font-extrabold text-[var(--text-main)]">
                  The Boss Level Challenge
                </h3>
                <p className="mt-1 text-xs text-[var(--text-muted)] max-w-xs mx-auto leading-relaxed">
                  Put all concepts together: variables, conditionals, loops, and functions. Winning unlocks the exclusive Boss Gauntlet Trophy!
                </p>

                <div className="mt-5">
                  {completedTopics.length >= topics.length ? (
                    <button
                      onClick={() => {
                        const bossTopic = topics[topics.length - 1];
                        if (bossTopic) onStartLesson(bossTopic);
                      }}
                      className="w-full py-3.5 px-6 rounded-2xl text-xs font-extrabold bg-[#20251F] text-[#F4C84B] hover:bg-[#344036] transition shadow-lg flex items-center justify-center gap-2"
                    >
                      <Sparkles className="h-4 w-4" />
                      <span>Enter the Boss Gauntlet</span>
                    </button>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-light)]">
                      <Lock className="h-3.5 w-3.5" />
                      <span>Unlocks after finishing all 5 core topics</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
