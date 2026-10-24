import { useState } from "react";
import { Achievement, Language } from "../types";
import { getAchievementsList } from "../utils/achievements";
import { DuckAvatar } from "./DuckAvatar";
import { triggerLessonSuccessConfetti } from "../utils/confetti";
import {
  Rocket,
  Flame,
  Zap,
  Crown,
  Sparkles,
  Award,
  Globe,
  Lock,
  CheckCircle2,
  Trophy,
  Filter,
} from "lucide-react";

interface AchievementsViewProps {
  completedLessonIds: string[];
  streakCount: number;
  selectedLanguages: Language[];
  duckEvaluated?: boolean;
  onClose?: () => void;
}

export function AchievementsView({
  completedLessonIds,
  streakCount,
  selectedLanguages,
  duckEvaluated = false,
  onClose,
}: AchievementsViewProps) {
  const [activeFilter, setActiveFilter] = useState<"All" | "Unlocked" | "Locked">("All");

  const achievements = getAchievementsList({
    completedLessonIds,
    streakCount,
    selectedLanguages,
    duckEvaluated,
  });

  const unlockedCount = achievements.filter((a) => a.isUnlocked).length;
  const overallPercent = Math.round((unlockedCount / achievements.length) * 100);

  const filteredAchievements = achievements.filter((a) => {
    if (activeFilter === "Unlocked") return a.isUnlocked;
    if (activeFilter === "Locked") return !a.isUnlocked;
    return true;
  });

  const renderBadgeIcon = (icon: string, isUnlocked: boolean) => {
    const iconClass = `h-6 w-6 ${isUnlocked ? "text-current" : "text-[#8E948A]"}`;
    switch (icon) {
      case "rocket":
        return <Rocket className={iconClass} />;
      case "flame":
        return <Flame className={`${iconClass} fill-current`} />;
      case "zap":
        return <Zap className={`${iconClass} fill-current`} />;
      case "crown":
        return <Crown className={iconClass} />;
      case "sparkles":
        return <Sparkles className={iconClass} />;
      case "award":
        return <Award className={iconClass} />;
      case "globe":
        return <Globe className={iconClass} />;
      case "duck":
        return <DuckAvatar size="sm" state={isUnlocked ? "speaking" : "idle"} />;
      default:
        return <Trophy className={iconClass} />;
    }
  };

  const handleBadgeClick = (achievement: Achievement) => {
    if (achievement.isUnlocked) {
      triggerLessonSuccessConfetti();
    }
  };

  return (
    <section className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-[28px] border border-[#DDE0D9] bg-white p-7 sm:p-9 shadow-[0_2px_0_rgba(32,37,31,.04)]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-[#EAECE6]">
          <div>
            <div className="flex items-center gap-2">
              <span className="eyebrow text-[#7C3AED] flex items-center gap-1.5 font-bold">
                <Trophy className="h-4 w-4" />
                Badges & Milestones
              </span>
              <span className="rounded-full bg-[#F3E8FF] px-2.5 py-0.5 text-[11px] font-bold text-[#6D28D9]">
                CodeXP Hall of Fame
              </span>
            </div>
            <h2 className="mt-1.5 text-2xl sm:text-3xl font-bold tracking-tight text-[#20251F]">
              Learner Achievements
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#666B64] max-w-xl">
              Unlock badges as you complete lessons, build streaks, and master coding languages. Click any unlocked badge to celebrate!
            </p>
          </div>

          {/* Overall Progress Widget */}
          <div className="flex items-center gap-4 bg-[#F8F9F5] px-6 py-4 rounded-2xl border border-[#E3E6DF] flex-none">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#797F77] block">
                Total Unlocked
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-3xl font-extrabold text-[#20251F]">{unlockedCount}</span>
                <span className="text-sm font-semibold text-[#797F77]">/ {achievements.length}</span>
              </div>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-[#EDE9FE] flex items-center justify-center font-bold text-[#6D28D9]">
              <Trophy className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-3.5 w-3.5 text-[#797F77] mr-1" />
            {(["All", "Unlocked", "Locked"] as const).map((filter) => {
              const count =
                filter === "All"
                  ? achievements.length
                  : filter === "Unlocked"
                  ? unlockedCount
                  : achievements.length - unlockedCount;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-xl px-4 py-1.5 text-xs font-bold transition ${
                    activeFilter === filter
                      ? "bg-[#20251F] text-white shadow-sm"
                      : "bg-[#F0F2ED] text-[#555A53] hover:bg-[#E3E6DF]"
                  }`}
                >
                  {filter} ({count})
                </button>
              );
            })}
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="text-xs font-bold text-[#63685F] hover:text-[#20251F]"
            >
              Close gallery ✕
            </button>
          )}
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredAchievements.map((badge) => {
          return (
            <article
              key={badge.id}
              onClick={() => handleBadgeClick(badge)}
              className={`rounded-[24px] border p-5 sm:p-6 transition-all flex flex-col justify-between relative overflow-hidden ${
                badge.isUnlocked
                  ? "bg-white border-[#DDE0D9] shadow-sm hover:border-[#F4C84B] hover:shadow-md cursor-pointer group"
                  : "bg-[#F9FAF7] border-[#E3E6DF] opacity-80"
              }`}
              title={badge.isUnlocked ? "Click to celebrate with confetti!" : badge.description}
            >
              {/* Top Row: Icon Badge & Status Pill */}
              <div>
                <div className="flex items-start justify-between mb-4">
                  {/* Badge Shield Emblem */}
                  <div
                    className={`h-14 w-14 rounded-2xl flex items-center justify-center p-3 relative shadow-inner transition-transform group-hover:scale-105 ${
                      badge.isUnlocked
                        ? `bg-gradient-to-br ${badge.bgGradient} ring-2 ring-white ring-offset-2`
                        : "bg-[#E6E8E2]"
                    }`}
                    style={{ color: badge.isUnlocked ? badge.accentColor : undefined }}
                  >
                    {renderBadgeIcon(badge.icon, badge.isUnlocked)}

                    {badge.isUnlocked ? (
                      <span className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-[#3D7A55] text-white flex items-center justify-center text-[10px] shadow">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      </span>
                    ) : (
                      <span className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-[#6A7067] text-white flex items-center justify-center text-[10px] shadow">
                        <Lock className="h-2.5 w-2.5" />
                      </span>
                    )}
                  </div>

                  {/* Status Pill */}
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                      badge.isUnlocked
                        ? "bg-[#DCF0E2] text-[#246A3D]"
                        : "bg-[#E7E9E3] text-[#696F65]"
                    }`}
                  >
                    {badge.isUnlocked ? "Unlocked" : "Locked"}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#20251F] tracking-tight">
                  {badge.title}
                </h3>
                <p className="mt-1 text-xs text-[#666B64] leading-relaxed">
                  {badge.description}
                </p>
              </div>

              {/* Bottom Progress Bar */}
              <div className="mt-5 pt-3 border-t border-[#EEF0EC]">
                <div className="flex items-center justify-between text-[11px] mb-1.5">
                  <span className="font-semibold text-[#767C73]">
                    {badge.isUnlocked ? "Milestone achieved" : "Progress"}
                  </span>
                  <span className="font-mono font-bold text-[#20251F]">
                    {badge.progressLabel}
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-[#E5E8E2] overflow-hidden">
                  <div
                    className="h-full transition-all duration-500 rounded-full"
                    style={{
                      width: `${badge.progress}%`,
                      backgroundColor: badge.isUnlocked ? badge.accentColor : "#9BA196",
                    }}
                  />
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
