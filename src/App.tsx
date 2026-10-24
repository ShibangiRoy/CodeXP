import { useState, useEffect, useLayoutEffect } from "react";
import { DashboardTab, Language, Lesson, Screen } from "./types";
import { languageTracksData } from "./data/learningTracks";
import { LearningTracksView } from "./components/LearningTracksView";
import { CodeLibraryView } from "./components/CodeLibraryView";
import { CodeEvaluatorView } from "./components/CodeEvaluatorView";
import { DuckAvatar } from "./components/DuckAvatar";
import { AuthView } from "./components/AuthView";
import { EmailVerificationView } from "./components/EmailVerificationView";
import { auth, db } from "./firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { CheckCircle2, LogOut, Terminal as TerminalIcon, Flame, Sparkles, Trophy, Eye, Code2, Shield, Settings } from "lucide-react";
import { evaluateStreak, recordLessonCompletionStreak, getLast7DaysStatus } from "./utils/streak";
import { triggerLessonSuccessConfetti, triggerStreakMilestoneConfetti } from "./utils/confetti";
import { AchievementsView } from "./components/AchievementsView";
import { getAchievementsList } from "./utils/achievements";
import { ThemeMode, Difficulty, TopicCurriculum } from "./types/gamification";
import { getAllTopics, getTopicCurriculum } from "./data/gamifiedCurriculum";
import { ThemeController } from "./components/ThemeController";
import { InteractiveLessonModal } from "./components/InteractiveLessonModal";
import { SkillMap } from "./components/SkillMap";
import { DailyPracticeCard } from "./components/DailyPracticeCard";
import { SettingsModal } from "./components/SettingsModal";
import { applyTheme, getStoredThemeMode, getStoredBrightness } from "./utils/theme";

const languages: { name: Language; mark: string; color: string; desc: string }[] = [
  { name: "Python", mark: "Py", color: "bg-[#8CC8AC] text-[#1D3A2C]", desc: "Automation, data & AI" },
  { name: "JavaScript", mark: "JS", color: "bg-[#F4C84B] text-[#3A2D00]", desc: "Websites & apps" },
  { name: "Java", mark: "Jv", color: "bg-[#F19B78] text-[#4A1E0D]", desc: "Apps & backend systems" },
  { name: "C++", mark: "C+", color: "bg-[#9CAFEF] text-[#122459]", desc: "Games & performance" },
  { name: "Linux", mark: "Lx", color: "bg-[#FCC624] text-[#222722]", desc: "Terminal, bash & DevOps" },
  { name: "C", mark: "C", color: "bg-[#7986CB] text-white", desc: "Systems, OS & embedded" },
  { name: "HTML", mark: "</>", color: "bg-[#E44D26] text-white", desc: "Web structure & markup" },
  { name: "CSS", mark: "{ }", color: "bg-[#264DE4] text-white", desc: "Styles, layout & responsive" },
  { name: "MySQL", mark: "SQL", color: "bg-[#00758F] text-white", desc: "Relational data & queries" },
];

function Logo({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`logo-mark ${light ? "bg-[#F4C84B] text-[#1F251F]" : "bg-[#1F251F] text-[#F4C84B]"}`}>
        <span>&lt;</span><i /><span>/&gt;</span>
      </div>
      <span className={`text-2xl font-bold tracking-[-0.06em] ${light ? "text-white" : ""}`}>CodeXP</span>
    </div>
  );
}

function Onboarding({
  onChoose,
  themeMode,
  brightness,
  onModeChange,
  onBrightnessChange,
}: {
  onChoose: (languages: Language[]) => void;
  themeMode: ThemeMode;
  brightness: number;
  onModeChange: (mode: ThemeMode) => void;
  onBrightnessChange: (brightness: number) => void;
}) {
  const [level, setLevel] = useState("beginner");
  const [mode, setMode] = useState<"choose" | "recommend">("choose");
  const [selected, setSelected] = useState<Language[]>(["Python"]);
  const toggleLanguage = (language: Language) => {
    setSelected((current) =>
      current.includes(language)
        ? current.length > 1 ? current.filter((item) => item !== language) : current
        : [...current, language],
    );
  };

  return (
    <main className="min-h-screen bg-[#F7F5EF]">
      <header className="flex items-center justify-between border-b border-[#E1E0D9] px-[6vw] py-6 bg-white/95 backdrop-blur">
        <Logo />
        <div className="flex items-center gap-4">
          <span className="hidden text-sm text-[#747870] sm:block">Step 1 of 1 · Personalize your path</span>
          <ThemeController
            mode={themeMode}
            brightness={brightness}
            onModeChange={onModeChange}
            onBrightnessChange={onBrightnessChange}
          />
        </div>
      </header>
      <div className="mx-auto grid max-w-[1360px] gap-12 px-[6vw] py-12 lg:grid-cols-[38.2fr_61.8fr] lg:py-20">
        <section>
          <p className="eyebrow text-[#657067]">Your starting point</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.05em] sm:text-5xl">
            Let’s build a path that fits you.
          </h1>
          <p className="mt-5 max-w-md leading-relaxed text-[#6F746C]">
            No pressure and no wrong answers. We’ll adapt lessons to your experience and goals.
          </p>
          <div className="mt-10 rounded-[28px] bg-[#E5ECF9] p-6">
            <div className="mb-3 text-3xl">“</div>
            <p className="font-medium leading-relaxed">
              The best language to learn is the one that helps you make something you care about.
            </p>
          </div>
        </section>
        <section>
          <div className="mb-10">
            <p className="question-number">01</p>
            <h2 className="question-title">How much coding have you done?</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                ["beginner", "Just starting", "I’m completely new"],
                ["some", "A little", "I know the basics"],
                ["experienced", "Quite a bit", "I’ve built projects"],
              ].map(([id, title, desc]) => (
                <button
                  key={id}
                  onClick={() => setLevel(id)}
                  className={`choice-card ${level === id ? "choice-active" : ""}`}
                >
                  <span className="font-bold">{title}</span>
                  <span className="mt-1 text-xs text-[#777A73]">{desc}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="mb-10 border-t border-[#DDDDD6] pt-9">
            <p className="question-number">02</p>
            <h2 className="question-title">How do you want to continue?</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <button
                onClick={() => setMode("choose")}
                className={`choice-card ${mode === "choose" ? "choice-active" : ""}`}
              >
                <span className="font-bold">I have a language in mind</span>
                <span className="mt-1 text-xs text-[#777A73]">Choose your own direction</span>
              </button>
              <button
                onClick={() => setMode("recommend")}
                className={`choice-card ${mode === "recommend" ? "choice-active" : ""}`}
              >
                <span className="font-bold">Recommend one for me</span>
                <span className="mt-1 text-xs text-[#777A73]">Based on your goals</span>
              </button>
            </div>
          </div>
          <div className="border-t border-[#DDDDD6] pt-9">
            <div className="flex items-end justify-between">
              <div>
                <p className="question-number">03</p>
                <h2 className="question-title">
                  {mode === "recommend" ? "Our best match for you" : "What do you want to learn?"}
                </h2>
              </div>
              {mode === "recommend" && (
                <span className="rounded-full bg-[#DDEDE3] px-3 py-1 text-xs font-bold text-[#356146]">
                  Recommended
                </span>
              )}
            </div>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {languages.map((language, index) => (
                <button
                  key={language.name}
                  onClick={() => mode === "choose" && toggleLanguage(language.name)}
                  className={`language-card ${
                    selected.includes(language.name) || (mode === "recommend" && index < 2)
                      ? "choice-active"
                      : ""
                  }`}
                >
                  <span className={`grid h-10 w-10 place-items-center rounded-xl text-sm font-bold ${language.color}`}>
                    {language.mark}
                  </span>
                  <span className="flex-1">
                    <b>{language.name}</b>
                    <small>{language.desc}</small>
                  </span>
                  {(selected.includes(language.name) || (mode === "recommend" && index < 2)) && (
                    <b className="text-[#3D7A55]">✓</b>
                  )}
                </button>
              ))}
            </div>
            <p className="mt-4 text-xs text-[#747870]">
              {mode === "choose"
                ? `${selected.length} language${selected.length > 1 ? "s" : ""} selected · choose as many as you like`
                : "Python and JavaScript are recommended for a versatile start"}
            </p>
            <button
              onClick={() => onChoose(mode === "recommend" ? ["Python", "JavaScript"] : selected)}
              className="primary-button mt-6 w-full sm:w-auto"
            >
              Build my learning paths <span>→</span>
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

function Dashboard({
  selectedLanguages,
  language,
  onLanguageChange,
  onStartLesson,
  onBack,
  completedLessonIds,
  activeTab,
  onTabChange,
  currentUser,
  onSignOut,
  streakCount,
  lastActiveDate,
  activeDates,
  duckEvaluated = false,
  onDuckEvaluated,
  themeMode,
  brightness,
  onModeChange,
  onBrightnessChange,
  streakFreezes,
  onBuyFreeze,
  userXP,
  onAddXP,
  completedTopics,
  onCompleteTopic,
  topicMastery,
  topicDifficulty,
  wrongAnswerCounts,
  dailyGoalMinutes,
  minutesSpentToday,
  onSetDailyGoal,
  onStartInteractiveLesson,
  onStartWarmUp,
}: {
  selectedLanguages: Language[];
  language: Language;
  onLanguageChange: (language: Language) => void;
  onStartLesson: (lesson: Lesson) => void;
  onBack: () => void;
  completedLessonIds: string[];
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
  currentUser: User | null;
  onSignOut: () => void;
  streakCount: number;
  lastActiveDate?: string;
  activeDates: string[];
  duckEvaluated?: boolean;
  onDuckEvaluated?: () => void;
  themeMode: ThemeMode;
  brightness: number;
  onModeChange: (mode: ThemeMode) => void;
  onBrightnessChange: (brightness: number) => void;
  streakFreezes: number;
  onBuyFreeze: () => void;
  userXP: number;
  onAddXP: (amt: number) => void;
  completedTopics: string[];
  onCompleteTopic: (topicKey: string, earnedXP: number) => void;
  topicMastery: Record<string, number>;
  topicDifficulty: Record<string, Difficulty>;
  wrongAnswerCounts: Record<string, number>;
  dailyGoalMinutes: 5 | 10 | 15;
  minutesSpentToday: number;
  onSetDailyGoal: (mins: 5 | 10 | 15) => void;
  onStartInteractiveLesson: (topic: TopicCurriculum) => void;
  onStartWarmUp: (topic: TopicCurriculum) => void;
}) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const currentLanguageTracks = languageTracksData[language] || [];
  const allLanguageLessons = currentLanguageTracks.flatMap((t) => t.lessons);
  const firstLesson = allLanguageLessons[0];

  const completedCount = allLanguageLessons.filter((l) => completedLessonIds.includes(l.id)).length;
  const progressPercent = Math.round((completedCount / (allLanguageLessons.length || 1)) * 100);

  const achievements = getAchievementsList({
    completedLessonIds,
    streakCount,
    selectedLanguages,
    duckEvaluated,
  });
  const unlockedCount = achievements.filter((a) => a.isUnlocked).length;

  const nextLesson = allLanguageLessons.find((l) => !completedLessonIds.includes(l.id)) || firstLesson;

  // Streak evaluation
  const streakStatus = evaluateStreak(streakCount, lastActiveDate, activeDates);
  const last7Days = getLast7DaysStatus(activeDates);

  // Curriculum topics for current language
  const currentLanguageTopics = getAllTopics(language);
  const activeTopic = currentLanguageTopics.find((t) => !completedTopics.includes(t.key)) || currentLanguageTopics[0];

  return (
    <main className="min-h-screen bg-[#F5F6F3]">
      <header className="sticky top-0 z-20 border-b border-[#DEDFD9] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1480px] items-center justify-between px-5 py-4 sm:px-8">
          <Logo />
          <nav className="hidden items-center gap-7 text-sm font-semibold md:flex" aria-label="Dashboard navigation">
            <button
              onClick={() => onTabChange("overview")}
              className={`transition-colors ${activeTab === "overview" ? "text-[#3D7A55]" : "text-[#20251F] hover:text-[#3D7A55]"}`}
            >
              Dashboard
            </button>
            <button
              onClick={() => onTabChange("tracks")}
              className={`transition-colors ${activeTab === "tracks" ? "text-[#3D7A55]" : "text-[#20251F] hover:text-[#3D7A55]"}`}
            >
              Learning tracks
            </button>
            <button
              onClick={() => onTabChange("library")}
              className={`transition-colors ${activeTab === "library" ? "text-[#3D7A55]" : "text-[#20251F] hover:text-[#3D7A55]"}`}
            >
              Code library
            </button>
            <button
              onClick={() => onTabChange("evaluator")}
              className={`flex items-center gap-1.5 transition-colors ${
                activeTab === "evaluator" ? "text-[#3D7A55]" : "text-[#20251F] hover:text-[#3D7A55]"
              }`}
            >
              <DuckAvatar size="sm" state={activeTab === "evaluator" ? "speaking" : "idle"} />
              <span>Code Evaluator</span>
            </button>
            <button
              onClick={() => onTabChange("achievements")}
              className={`flex items-center gap-1.5 transition-colors ${
                activeTab === "achievements" ? "text-[#3D7A55]" : "text-[#20251F] hover:text-[#3D7A55]"
              }`}
            >
              <Trophy className="h-4 w-4 text-[#7C3AED]" />
              <span>Achievements</span>
            </button>
          </nav>
          <div className="flex items-center gap-2">
            {/* Live Streak Indicator in Header */}
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                streakStatus.isCompletedToday
                  ? "bg-[#FFF0C7] text-[#9B6C09] border border-[#F6DC9A]"
                  : streakStatus.isAtRisk
                  ? "bg-[#FDF0E9] text-[#C05621] border border-[#F8D2BD]"
                  : "bg-[#F0F2ED] text-[#63685F]"
              }`}
              title={
                streakStatus.isCompletedToday
                  ? `Daily Streak: ${streakStatus.currentStreak} days (Completed today)`
                  : streakStatus.isAtRisk
                  ? `Daily Streak: ${streakStatus.currentStreak} days (Complete a lesson today to maintain!)`
                  : "Complete a lesson to start your streak!"
              }
            >
              <Flame className={`h-4 w-4 ${streakStatus.currentStreak > 0 ? "fill-current text-[#D97706]" : "text-[#878D82]"}`} />
              <span>{streakStatus.currentStreak} {streakStatus.currentStreak === 1 ? "day" : "days"}</span>
            </div>

            {/* Streak Freezes Pill */}
            <div
              onClick={onBuyFreeze}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-bold border border-blue-200 bg-blue-50 text-blue-700 cursor-pointer hover:bg-blue-100 transition"
              title={`${streakFreezes} Streak Freeze(s). Protects streak for 1 missed day. Tap to buy another with 100 XP.`}
            >
              <Shield className="h-3.5 w-3.5 text-blue-600" />
              <span>{streakFreezes}</span>
            </div>

            {/* XP Pill */}
            <div
              className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-bold border border-[#F6DC9A] bg-[#FFF0C7] text-[#9B6C09]"
              title={`Total Experience Points: ${userXP} XP`}
            >
              <Sparkles className="h-3.5 w-3.5 text-[#D97706]" />
              <span>{userXP} XP</span>
            </div>

            {/* Practice Action */}
            <button
              onClick={() => onStartInteractiveLesson(activeTopic)}
              className="hidden rounded-xl bg-[#20251F] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#344036] sm:block"
            >
              Practice
            </button>

            {/* Unified Settings Button: Themes, Change Path, Login Info & Log Out */}
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="flex items-center gap-1.5 rounded-xl border border-[#D7DAD3] bg-white px-3.5 py-2 text-sm font-semibold text-[#20251F] hover:bg-[#F2F4EF] hover:border-[#3D7A55] transition shadow-xs"
              title="Settings (Themes, Learning Path, Account Info & Log Out)"
              aria-label="Open Settings"
            >
              <Settings className="h-4 w-4 text-[#D97706]" />
              <span className="font-semibold">Settings</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="flex md:hidden border-t border-[#EAEBE5] bg-white px-4 py-2 gap-2 overflow-x-auto">
          <button
            onClick={() => onTabChange("overview")}
            className={`rounded-full px-3 py-1 text-xs font-bold transition-all ${
              activeTab === "overview" ? "bg-[#20251F] text-white" : "text-[#555A53] hover:bg-[#F0F2ED]"
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => onTabChange("tracks")}
            className={`rounded-full px-3 py-1 text-xs font-bold transition-all ${
              activeTab === "tracks" ? "bg-[#20251F] text-white" : "text-[#555A53] hover:bg-[#F0F2ED]"
            }`}
          >
            Tracks
          </button>
          <button
            onClick={() => onTabChange("library")}
            className={`rounded-full px-3 py-1 text-xs font-bold transition-all ${
              activeTab === "library" ? "bg-[#20251F] text-white" : "text-[#555A53] hover:bg-[#F0F2ED]"
            }`}
          >
            Library
          </button>
          <button
            onClick={() => onTabChange("evaluator")}
            className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold transition-all ${
              activeTab === "evaluator" ? "bg-[#20251F] text-white" : "text-[#555A53] hover:bg-[#F0F2ED]"
            }`}
          >
            <DuckAvatar size="sm" />
            <span>Evaluator</span>
          </button>
          <button
            onClick={() => onTabChange("achievements")}
            className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold transition-all ${
              activeTab === "achievements" ? "bg-[#20251F] text-white" : "text-[#555A53] hover:bg-[#F0F2ED]"
            }`}
          >
            <Trophy className="h-3 w-3 text-[#7C3AED]" />
            <span>Badges</span>
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-[1480px] px-5 py-7 sm:px-8 sm:py-10">
        {activeTab === "tracks" ? (
          <LearningTracksView
            language={language}
            onLanguageChange={onLanguageChange}
            availableLanguages={selectedLanguages}
            onStartLesson={onStartLesson}
            completedLessonIds={completedLessonIds}
          />
        ) : activeTab === "library" ? (
          <CodeLibraryView
            language={language}
            onLanguageChange={onLanguageChange}
            availableLanguages={selectedLanguages}
            onOpenInPlayground={onStartLesson}
          />
        ) : activeTab === "evaluator" ? (
          <CodeEvaluatorView onOpenInPlayground={onStartLesson} onEvaluated={onDuckEvaluated} />
        ) : activeTab === "achievements" ? (
          <AchievementsView
            completedLessonIds={completedLessonIds}
            streakCount={streakCount}
            selectedLanguages={selectedLanguages}
            duckEvaluated={duckEvaluated}
          />
        ) : (
          <>
            <section className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <p className="eyebrow text-[#6A7068]">Active learning paths</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedLanguages.map((item) => {
                    const details = languages.find((entry) => entry.name === item)!;
                    return (
                      <button
                        key={item}
                        onClick={() => onLanguageChange(item)}
                        className={`flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-bold transition ${
                          language === item
                            ? "border-[#20251F] bg-[#20251F] text-white"
                            : "border-[#D9DCD5] bg-white text-[#20251F]"
                        }`}
                      >
                        <span className={`grid h-6 w-6 place-items-center rounded-full text-[10px] text-[#20251F] ${details.color}`}>
                          {details.mark}
                        </span>
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>
              <button onClick={onBack} className="text-left text-sm font-bold text-[#3D7A55] sm:text-right hover:underline">
                + Add another language
              </button>
            </section>

            <section className="grid overflow-hidden rounded-[28px] border border-[#DDE0D9] bg-white shadow-[0_2px_0_rgba(32,37,31,.04)] lg:grid-cols-[61.8fr_38.2fr]">
              <div className="p-7 sm:p-10">
                <p className="eyebrow text-[#4B7A5C]">Your personalized {language} path</p>
                <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">Welcome to your CodeXP.</h1>
                <p className="mt-4 max-w-2xl leading-relaxed text-[#656A63]">
                  Learn {language} through focused lessons, hands-on coding, and projects that turn concepts into real skills.
                </p>
              </div>
              <div className="flex items-center gap-3 border-t border-[#E4E5E0] bg-[#F0F5F1] p-7 lg:justify-center lg:border-l lg:border-t-0">
                <button onClick={() => onStartInteractiveLesson(activeTopic)} className="primary-button">
                  Start Lesson: {activeTopic.name} <span>→</span>
                </button>
              </div>
            </section>

            {/* Dashboard Metric Cards with Rich Daily Streak Counter */}
            <section className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {/* Card 1: Course Progress */}
              <article className="rounded-[22px] border border-[#DDE0D9] bg-white p-5 sm:p-6 shadow-[0_2px_0_rgba(32,37,31,.04)] flex flex-col justify-between">
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#666C64]">Course progress</p>
                    <span className="grid h-7 w-7 place-items-center rounded-full text-xs font-bold bg-[#DDEDE3] text-[#39704E]">
                      1
                    </span>
                  </div>
                  <p className="text-3xl font-bold tracking-[-0.04em] text-[#20251F]">{progressPercent}%</p>
                  <p className="mt-2 text-xs text-[#767B74]">{completedCount} of {allLanguageLessons.length} lessons</p>
                </div>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#EAECE6]">
                  <div className="h-full bg-[#3D7A55] transition-all" style={{ width: `${progressPercent}%` }} />
                </div>
              </article>

              {/* Card 2: Daily Streak */}
              <article
                onClick={() => triggerStreakMilestoneConfetti(streakStatus.currentStreak)}
                className="rounded-[22px] border border-[#DDE0D9] bg-white p-5 sm:p-6 shadow-[0_2px_0_rgba(32,37,31,.04)] flex flex-col justify-between cursor-pointer hover:border-[#F4C84B] transition-all group"
                title="Click to celebrate your streak!"
              >
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#666C64]">Daily streak</p>
                    <span
                      className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
                        streakStatus.isCompletedToday
                          ? "bg-[#FFF0C7] text-[#9B6C09]"
                          : streakStatus.isAtRisk
                          ? "bg-[#FDF0E9] text-[#C05621]"
                          : "bg-[#F0F2ED] text-[#63685F]"
                      }`}
                    >
                      <Flame className={`h-3.5 w-3.5 ${streakStatus.currentStreak > 0 ? "fill-current text-[#D97706]" : "text-[#7D8478]"}`} />
                      <span>{streakStatus.currentStreak > 0 ? `${streakStatus.currentStreak}d` : "0d"}</span>
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-bold tracking-[-0.04em] text-[#20251F]">
                      {streakStatus.currentStreak}
                    </p>
                    <span className="text-base font-semibold text-[#666B64]">
                      {streakStatus.currentStreak === 1 ? "day" : "days"}
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-[#767B74]">
                    {streakStatus.isCompletedToday
                      ? "Completed today 🔥"
                      : streakStatus.isAtRisk
                      ? "Complete a lesson to keep streak! ⏳"
                      : "Complete a lesson to start streak"}
                  </p>
                </div>

                {/* 7-Day Streak History Bar */}
                <div className="mt-3.5 pt-2.5 border-t border-[#F0F2ED]">
                  <div className="flex items-center justify-between">
                    {last7Days.map((d, i) => (
                      <div
                        key={d.dateStr}
                        className="flex flex-col items-center gap-1"
                        title={`${d.dateStr}: ${d.completed ? "Lesson completed (+1 streak)" : "No lesson completed"}`}
                      >
                        <span className="text-[10px] font-bold text-[#868C83]">{d.dayLabel.slice(0, 1)}</span>
                        <span
                          className={`h-2.5 w-2.5 rounded-full transition-all ${
                            d.completed
                              ? "bg-[#3D7A55] ring-2 ring-[#DCEDE1]"
                              : i === 6
                              ? "border-2 border-[#E2B93B] bg-white animate-pulse"
                              : "bg-[#E3E6DF]"
                          }`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </article>

              {/* Card 3: Tasks Completed */}
              <article className="rounded-[22px] border border-[#DDE0D9] bg-white p-5 sm:p-6 shadow-[0_2px_0_rgba(32,37,31,.04)] flex flex-col justify-between">
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#666C64]">Tasks completed</p>
                    <span className="grid h-7 w-7 place-items-center rounded-full text-xs font-bold bg-[#E1E8FA] text-[#4B68A5]">
                      3
                    </span>
                  </div>
                  <p className="text-3xl font-bold tracking-[-0.04em] text-[#20251F]">
                    {completedCount} / {allLanguageLessons.length}
                  </p>
                  <p className="mt-2 text-xs text-[#767B74]">Practice tasks passed</p>
                </div>
                <div className="mt-4 flex items-center gap-1 text-[11px] font-semibold text-[#4F68A5]">
                  <span>{allLanguageLessons.length - completedCount} tasks remaining</span>
                </div>
              </article>

              {/* Card 4: Achievements */}
              <article
                onClick={() => {
                  const elem = document.getElementById("achievements-section");
                  if (elem) {
                    elem.scrollIntoView({ behavior: "smooth" });
                  } else {
                    onTabChange("achievements");
                  }
                }}
                className="rounded-[22px] border border-[#DDE0D9] bg-white p-5 sm:p-6 shadow-[0_2px_0_rgba(32,37,31,.04)] flex flex-col justify-between cursor-pointer hover:border-[#7C3AED] hover:shadow-md transition-all group"
                title="Click to view all visual achievement badges!"
              >
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#666C64]">Achievements</p>
                    <span className="grid h-7 w-7 place-items-center rounded-full text-xs font-bold bg-[#F1DFF3] text-[#875193] group-hover:scale-110 transition-transform">
                      <Trophy className="h-3.5 w-3.5 text-[#875193]" />
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-bold tracking-[-0.04em] text-[#20251F]">
                      {unlockedCount} / {achievements.length}
                    </p>
                    <span className="text-xs font-bold text-[#875193] bg-[#F7EEFB] px-2 py-0.5 rounded-full">
                      {Math.round((unlockedCount / achievements.length) * 100)}%
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-[#767B74]">Milestone badges unlocked</p>
                </div>
                <div className="mt-3.5 pt-2.5 border-t border-[#F0F2ED] flex items-center justify-between text-[11px] font-semibold text-[#7C3AED]">
                  <span>{unlockedCount >= 1 ? `🎉 ${unlockedCount} earned` : "Unlock your 1st badge"}</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">View badges →</span>
                </div>
              </article>
            </section>

            {/* Daily Practice & Habit Tracker Section */}
            <section className="mt-8">
              <DailyPracticeCard
                language={language}
                streakCount={streakStatus.currentStreak}
                streakFreezes={streakFreezes}
                activeDates={activeDates}
                isCompletedToday={streakStatus.isCompletedToday}
                dailyGoalMinutes={dailyGoalMinutes}
                minutesSpentToday={minutesSpentToday}
                currentTopicKey={activeTopic.key}
                completedTopicKeys={completedTopics}
                userXP={userXP}
                wrongAnswerCounts={wrongAnswerCounts}
                onSetDailyGoal={onSetDailyGoal}
                onBuyFreeze={onBuyFreeze}
                onLaunchPractice={onStartInteractiveLesson}
              />
            </section>

            {/* Winding Sequential Skill Map Section */}
            <section className="mt-8">
              <SkillMap
                language={language}
                completedTopics={completedTopics}
                topicMastery={topicMastery}
                topicDifficulty={topicDifficulty}
                onStartLesson={onStartInteractiveLesson}
                onStartWarmUp={onStartWarmUp}
                wrongAnswerCounts={wrongAnswerCounts}
              />
            </section>

            {/* Meet the Duck Code Evaluator Feature Card */}
            <section className="mt-6 flex flex-col md:flex-row items-center justify-between gap-6 rounded-[24px] border border-[#F4DC9A] bg-[#FFFBEB] p-6 sm:p-7 shadow-[0_2px_0_rgba(32,37,31,.04)]">
              <div className="flex items-center gap-4">
                <DuckAvatar size="lg" state="idle" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#9C650A] flex items-center gap-1">
                      <Sparkles className="h-3.5 w-3.5" />
                      Duck Code Evaluator
                    </span>
                    <span className="rounded-full bg-[#F4C84B]/30 px-2 py-0.5 text-[10px] font-bold text-[#8C5D08]">
                      Professor Quackers
                    </span>
                  </div>
                  <h3 className="mt-1 text-xl font-bold text-[#20251F]">
                    Need honest feedback on your code?
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-[#665223] max-w-2xl leading-relaxed">
                    Write, paste, or drop your files to get honest diagnosis, bug detection, performance tips, and improved refactored code from the Duck mascot!
                  </p>
                </div>
              </div>
              <button
                onClick={() => onTabChange("evaluator")}
                className="primary-button !py-2.5 !px-5 text-xs flex-none flex items-center gap-2"
              >
                <span>Launch Code Evaluator</span>
                <span>→</span>
              </button>
            </section>

            <section className="mt-10">
              <div className="mb-5 flex items-end justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-[-0.035em]">Your learning tracks</h2>
                  <p className="mt-1 text-sm text-[#6B7069]">A three-tier path from first principles to independent projects.</p>
                </div>
                <button
                  onClick={() => onTabChange("tracks")}
                  className="hidden text-sm font-bold text-[#3D7A55] sm:block hover:underline"
                >
                  View all 14 lessons →
                </button>
              </div>
              <div className="grid gap-4 lg:grid-cols-3">
                {currentLanguageTracks.map((track, index) => {
                  const trackCompleted = track.lessons.filter((l) => completedLessonIds.includes(l.id)).length;
                  const trackPercent = Math.round((trackCompleted / track.lessons.length) * 100);
                  return (
                    <article key={track.level} className="flex min-h-[290px] flex-col rounded-[24px] border border-[#DDE0D9] bg-white p-6 shadow-[0_2px_0_rgba(32,37,31,.04)]">
                      <div className="flex items-center justify-between">
                        <p className={`text-xs font-bold tracking-[0.12em] ${track.accent}`}>{track.levelLabel}</p>
                        <p className="text-xs font-semibold text-[#71766F]">{trackCompleted} / {track.lessons.length} complete</p>
                      </div>
                      <h3 className="mt-6 text-xl font-bold tracking-[-0.025em]">{track.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-[#666B64]">{track.copy}</p>
                      <div className="mt-auto pt-6">
                        <div className="mb-5 h-1.5 overflow-hidden rounded-full bg-[#ECEEEA]">
                          <div className="h-full bg-[#5C966E] transition-all" style={{ width: `${trackPercent}%` }} />
                        </div>
                        <button
                          onClick={() => {
                            if (index === 0) {
                              onStartLesson(nextLesson);
                            } else {
                              onTabChange("tracks");
                            }
                          }}
                          className={`w-full rounded-xl px-4 py-3 text-sm font-bold transition ${
                            index === 0 ? "bg-[#20251F] text-white hover:bg-[#344036]" : "bg-[#F0F1EE] text-[#555A54] hover:bg-[#E3E5E0]"
                          }`}
                        >
                          {index === 0 ? "Start level 1" : "Explore track"} <span className="ml-2">→</span>
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>

            <section className="mt-6 grid items-center gap-6 rounded-[24px] border border-[#DDE0D9] bg-white p-6 sm:p-8 shadow-[0_2px_0_rgba(32,37,31,.04)] lg:grid-cols-[61.8fr_38.2fr]">
              <div>
                <p className="eyebrow text-[#4B7A5C]">Recommended next lesson</p>
                <h2 className="mt-3 text-xl font-bold tracking-[-0.025em]">
                  {nextLesson.number}. {nextLesson.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#666B64]">{nextLesson.intro}</p>
              </div>
              <button onClick={() => onStartInteractiveLesson(activeTopic)} className="primary-button lg:ml-auto">
                Start lesson: {activeTopic.name} <span>→</span>
              </button>
            </section>

            {/* Achievements Badges Section */}
            <div id="achievements-section" className="mt-10">
              <AchievementsView
                completedLessonIds={completedLessonIds}
                streakCount={streakCount}
                selectedLanguages={selectedLanguages}
                duckEvaluated={duckEvaluated}
              />
            </div>
          </>
        )}
      </div>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        currentUser={currentUser}
        onSignOut={onSignOut}
        onChangePath={onBack}
        selectedLanguages={selectedLanguages}
        activeLanguage={language}
        themeMode={themeMode}
        brightness={brightness}
        onModeChange={onModeChange}
        onBrightnessChange={onBrightnessChange}
      />
    </main>
  );
}

function Learning({
  language,
  lesson,
  onExit,
  onComplete,
  streakCount,
  themeMode,
  brightness,
  onModeChange,
  onBrightnessChange,
  currentUser,
  onSignOut,
  selectedLanguages,
}: {
  language: Language;
  lesson: Lesson;
  onExit: () => void;
  onComplete: (lessonId: string) => void;
  streakCount: number;
  themeMode: ThemeMode;
  brightness: number;
  onModeChange: (mode: ThemeMode) => void;
  onBrightnessChange: (brightness: number) => void;
  currentUser?: User | null;
  onSignOut?: () => void;
  selectedLanguages?: Language[];
}) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [code, setCode] = useState(lesson.code);
  const [output, setOutput] = useState("Ready when you are. Click 'Run code ▶' to test.");
  const [hasPassed, setHasPassed] = useState(false);
  const [activeOutputTab, setActiveOutputTab] = useState<"terminal" | "preview">(
    language === "HTML" || language === "CSS" ? "preview" : "terminal"
  );

  const run = () => {
    let simulatedOut = lesson.expectedOutput || "Program executed successfully.";
    if (language === "Linux") {
      const firstCmd = code.trim().split("\n")[0] || "bash script.sh";
      simulatedOut = `codexp@cloud-box:~$ ${firstCmd}\n${lesson.expectedOutput || "Command completed with status 0."}`;
    } else if (language === "C") {
      simulatedOut = `$ gcc -O2 -Wall main.c -o main\n$ ./main\n${lesson.expectedOutput || "Process returned 0 (0x0)."}`;
    } else if (language === "MySQL") {
      const firstQuery = code.trim().split("\n")[0] || "SELECT * FROM db;";
      simulatedOut = `mysql> ${firstQuery}\n${lesson.expectedOutput || "Query OK, 0 rows affected (0.001 sec)"}`;
    } else if (language === "HTML") {
      simulatedOut = `[HTML5 DOM Parser] Validated semantic tags and elements.\n${lesson.expectedOutput || "Document tree rendered successfully."}`;
    } else if (language === "CSS") {
      simulatedOut = `[CSS3 Style Engine] Computed cascade rules and visual tokens.\n${lesson.expectedOutput || "Stylesheet applied to active document viewport."}`;
    } else {
      const match = code.match(/["'](.+?)["']/);
      simulatedOut = match?.[1] || lesson.expectedOutput || "Nice work — your code ran successfully.";
    }

    setOutput(simulatedOut);
    setHasPassed(true);
    onComplete(lesson.id);
  };

  const lineCount = Math.max(code.split("\n").length, 8);

  return (
    <main className="flex min-h-screen flex-col bg-[#F7F5EF]">
      <header className="flex h-20 items-center justify-between border-b border-[#DEDDD6] bg-white px-5 sm:px-8">
        <Logo />
        <div className="hidden items-center gap-3 sm:flex">
          <span className="text-sm font-semibold">{language} practice</span>
          <span className="rounded-full bg-[#E6E9E3] px-3 py-1.5 text-xs font-bold text-[#355E45]">
            Lesson {lesson.number} · {lesson.title}
          </span>
          {streakCount > 0 && (
            <span className="flex items-center gap-1 rounded-full bg-[#FFF0C7] px-2.5 py-1 text-xs font-bold text-[#9B6C09]">
              <Flame className="h-3.5 w-3.5 fill-current text-[#D97706]" />
              <span>{streakCount}d streak</span>
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="flex items-center gap-1.5 rounded-xl border border-[#D7DAD3] bg-white px-3 py-2 text-xs font-semibold text-[#20251F] hover:bg-[#F2F4EF] hover:border-[#3D7A55] transition shadow-xs"
            title="Settings (Themes, Learning Path & Account)"
            aria-label="Open Settings"
          >
            <Settings className="h-3.5 w-3.5 text-[#D97706]" />
            <span className="font-semibold">Settings</span>
          </button>
          <button onClick={onExit} className="secondary-button !px-4 !py-2 text-sm">
            Exit lesson
          </button>
        </div>
      </header>

      <div className="h-1.5 bg-[#E4E2DA]">
        <div className="h-full w-[14%] bg-[#68A983]" />
      </div>

      <div className="grid flex-1 lg:grid-cols-[61.8fr_38.2fr]">
        <section className="flex min-h-[560px] flex-col bg-[#20251F] p-5 text-white sm:p-8">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="eyebrow text-[#99A097]">Practice space</p>
              <h1 className="mt-2 text-xl font-semibold">Try it yourself</h1>
            </div>
            <button
              onClick={() => {
                setCode(lesson.code);
                setHasPassed(false);
                setOutput("Ready when you are. Click 'Run code ▶' to test.");
              }}
              className="text-xs font-semibold text-[#B7BDB4] hover:text-white"
            >
              Reset code
            </button>
          </div>

          <div className="flex min-h-[320px] flex-1 overflow-hidden rounded-t-2xl border border-[#3A4039] bg-[#181C18]">
            <div className="w-12 border-r border-[#30352F] pt-5 text-center font-mono text-sm leading-7 text-[#697068] select-none">
              {Array.from({ length: lineCount }).map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            <textarea
              value={code}
              onChange={(event) => setCode(event.target.value)}
              spellCheck={false}
              aria-label="Code editor"
              className="min-h-full flex-1 resize-none bg-transparent p-5 font-mono text-[15px] leading-7 text-[#F1D475] outline-none"
            />
          </div>

          <div className="rounded-b-2xl border border-t-0 border-[#3A4039] bg-[#111411]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#30352F] px-4 py-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveOutputTab("terminal")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition ${
                    activeOutputTab === "terminal" ? "bg-[#30352F] text-white" : "text-[#8F968D] hover:text-white"
                  }`}
                >
                  <TerminalIcon className="h-3.5 w-3.5 text-[#8CC8AC]" />
                  <span>Terminal</span>
                </button>
                {(language === "HTML" || language === "CSS") && (
                  <button
                    type="button"
                    onClick={() => setActiveOutputTab("preview")}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition ${
                      activeOutputTab === "preview" ? "bg-[#3D7A55] text-white" : "text-[#8F968D] hover:text-white"
                    }`}
                  >
                    <Eye className="h-3.5 w-3.5" />
                    <span>Live {language} Preview</span>
                  </button>
                )}
              </div>
              <button onClick={run} className="rounded-lg bg-[#F4C84B] px-5 py-2 text-sm font-bold text-[#20251F] transition hover:bg-[#FAD968]">
                Run code ▶
              </button>
            </div>

            {activeOutputTab === "preview" && language === "HTML" ? (
              <div className="p-4 bg-white text-[#20251F] min-h-32 rounded-b-2xl overflow-auto text-sm">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#797F77] pb-2 border-b border-gray-100 mb-3 flex items-center gap-1">
                  <Eye className="h-3 w-3 text-[#3D7A55]" />
                  <span>Rendered HTML Output</span>
                </div>
                <div dangerouslySetInnerHTML={{ __html: code }} />
              </div>
            ) : activeOutputTab === "preview" && language === "CSS" ? (
              <div className="p-4 bg-[#F8F9F5] text-[#20251F] min-h-32 rounded-b-2xl overflow-auto text-sm">
                <style>{code}</style>
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#797F77] pb-2 border-b border-gray-200 mb-3 flex items-center gap-1">
                  <Eye className="h-3 w-3 text-[#264DE4]" />
                  <span>Live Styled Preview Sandbox</span>
                </div>
                <div className="space-y-4">
                  <div className="headline hero-heading text-xl font-bold">Preview Typography</div>
                  <div className="container-card product-card card p-4 rounded-xl border border-gray-200 bg-white shadow-sm max-w-sm">
                    <span className="badge status-badge inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#DDEDE3] text-[#356146] mb-2">Live Element</span>
                    <p className="text-xs text-[#52574F] leading-relaxed">This showcase component dynamically adopts your CSS styling rules.</p>
                    <button type="button" className="cta-button interactive-btn mt-3 px-3.5 py-1.5 rounded-lg bg-[#20251F] text-white text-xs font-bold">Action Button</button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="min-h-24 p-4 font-mono text-sm text-[#93CCA9] whitespace-pre-line">
                <span className="mr-3 text-[#687067]">$</span>
                {output}
              </div>
            )}
          </div>
        </section>

        <aside className="overflow-y-auto border-l border-[#DEDDD6] bg-white p-7 sm:p-10 lg:p-12">
          <div className="flex items-center justify-between">
            <p className="eyebrow text-[#617067]">
              Lesson {lesson.number} · {language}
            </p>
            {hasPassed && (
              <span className="flex items-center gap-1.5 text-xs font-bold text-[#2E7A4A] bg-[#DCF0E2] px-2.5 py-1 rounded-full">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Completed! Daily streak updated 🔥
              </span>
            )}
          </div>
          <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.045em] text-[#20251F]">{lesson.title}</h2>
          <p className="mt-5 leading-7 text-[#656A63]">{lesson.intro}</p>

          <div className="my-6 rounded-2xl bg-[#F1F0EB] p-5 font-mono text-sm text-[#385E48] overflow-x-auto">
            {lesson.code}
          </div>

          <h3 className="font-bold text-[#20251F]">How it works</h3>
          <ul className="mt-4 space-y-4 text-sm leading-6 text-[#656A63]">
            <li className="flex gap-3">
              <b className="step-dot">1</b>
              <span>Review the code structure and key keywords for {language}.</span>
            </li>
            <li className="flex gap-3">
              <b className="step-dot">2</b>
              <span>Modify the arguments or parameters in the interactive editor and run.</span>
            </li>
          </ul>

          <div className="mt-8 rounded-2xl border border-[#D9E3DB] bg-[#F0F6F2] p-5">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#4A745B]">Your challenge</p>
            <p className="mt-2 text-sm leading-6 text-[#516057]">{lesson.hint}</p>
          </div>

          <div className="mt-8 flex flex-col gap-3">
            <button onClick={run} className="primary-button w-full">
              Check my code <span>→</span>
            </button>
            <button onClick={onExit} className="secondary-button w-full text-xs">
              Return to Dashboard
            </button>
          </div>
        </aside>
      </div>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        currentUser={currentUser || null}
        onSignOut={onSignOut || (() => {})}
        onChangePath={onExit}
        selectedLanguages={selectedLanguages || [language]}
        activeLanguage={language}
        themeMode={themeMode}
        brightness={brightness}
        onModeChange={onModeChange}
        onBrightnessChange={onBrightnessChange}
      />
    </main>
  );
}

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [verificationCode, setVerificationCode] = useState<string>("748291");
  const [screen, setScreen] = useState<Screen>("login");
  const [language, setLanguage] = useState<Language>("Python");
  const [selectedLanguages, setSelectedLanguages] = useState<Language[]>(["Python"]);
  const [dashboardTab, setDashboardTab] = useState<DashboardTab>("overview");
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  const [streakCount, setStreakCount] = useState<number>(0);
  const [lastActiveDate, setLastActiveDate] = useState<string | undefined>(undefined);
  const [activeDates, setActiveDates] = useState<string[]>([]);
  const [duckEvaluated, setDuckEvaluated] = useState<boolean>(false);
  const [loadingInitialAuth, setLoadingInitialAuth] = useState(true);

  // Feature 2: Brightness Modes & fine-tune slider (saved in localStorage)
  const [themeMode, setThemeMode] = useState<ThemeMode>(getStoredThemeMode);
  const [brightness, setBrightness] = useState<number>(getStoredBrightness);

  // Feature 1: Gamified Learning State (XP, Freezes, Topics, Mastery, Difficulty)
  const [userXP, setUserXP] = useState<number>(() => {
    const saved = localStorage.getItem("codexp_user_xp");
    return saved !== null ? Number(saved) : 120;
  });
  const [streakFreezes, setStreakFreezes] = useState<number>(() => {
    const saved = localStorage.getItem("codexp_streak_freezes");
    return saved !== null ? Number(saved) : 1;
  });
  const [completedTopics, setCompletedTopics] = useState<Record<string, string[]>>(() => {
    try {
      const saved = localStorage.getItem("codexp_completed_topics");
      return saved ? JSON.parse(saved) : { Python: ["basics"] };
    } catch {
      return { Python: ["basics"] };
    }
  });
  const [topicMastery, setTopicMastery] = useState<Record<string, Record<string, number>>>(() => {
    try {
      const saved = localStorage.getItem("codexp_topic_mastery");
      return saved ? JSON.parse(saved) : { Python: { basics: 100 } };
    } catch {
      return { Python: { basics: 100 } };
    }
  });
  const [topicDifficulty, setTopicDifficulty] = useState<Record<string, Record<string, Difficulty>>>(() => {
    try {
      const saved = localStorage.getItem("codexp_topic_difficulty");
      return saved ? JSON.parse(saved) : { Python: { basics: "easy", variables: "moderate" } };
    } catch {
      return { Python: { basics: "easy", variables: "moderate" } };
    }
  });
  const [wrongAnswerCounts, setWrongAnswerCounts] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem("codexp_wrong_answers");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [dailyGoalMinutes, setDailyGoalMinutes] = useState<5 | 10 | 15>(() => {
    const saved = localStorage.getItem("codexp_daily_goal");
    return saved ? (Number(saved) as 5 | 10 | 15) : 10;
  });
  const [minutesSpentToday, setMinutesSpentToday] = useState<number>(() => {
    const saved = localStorage.getItem("codexp_minutes_today");
    return saved ? Number(saved) : 0;
  });

  // Active Interactive Lesson modal state
  const [activeInteractiveTopic, setActiveInteractiveTopic] = useState<TopicCurriculum | null>(null);

  // Synchronously re-apply document classes and CSS custom variables during initial app mount and state changes
  useLayoutEffect(() => {
    applyTheme(themeMode, brightness);
  }, [themeMode, brightness]);

  useEffect(() => {
    applyTheme(themeMode, brightness);
  }, [themeMode, brightness]);

  useEffect(() => {
    localStorage.setItem("codexp_user_xp", String(userXP));
  }, [userXP]);

  useEffect(() => {
    localStorage.setItem("codexp_streak_freezes", String(streakFreezes));
  }, [streakFreezes]);

  useEffect(() => {
    localStorage.setItem("codexp_completed_topics", JSON.stringify(completedTopics));
  }, [completedTopics]);

  useEffect(() => {
    localStorage.setItem("codexp_topic_mastery", JSON.stringify(topicMastery));
  }, [topicMastery]);

  useEffect(() => {
    localStorage.setItem("codexp_topic_difficulty", JSON.stringify(topicDifficulty));
  }, [topicDifficulty]);

  useEffect(() => {
    localStorage.setItem("codexp_wrong_answers", JSON.stringify(wrongAnswerCounts));
  }, [wrongAnswerCounts]);

  useEffect(() => {
    localStorage.setItem("codexp_daily_goal", String(dailyGoalMinutes));
  }, [dailyGoalMinutes]);

  // Monitor auth state changes & load user profile
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        if (!user.emailVerified) {
          setScreen("verify-email");
        } else {
          // Check Firestore user preferences
          try {
            const userRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
              const data = userDoc.data();
              if (data.selectedLanguages?.length) {
                setSelectedLanguages(data.selectedLanguages);
                setLanguage(data.selectedLanguages[0]);
              }
              if (data.completedLessons?.length) {
                setCompletedLessonIds(data.completedLessons);
              }
              if (data.duckEvaluated) {
                setDuckEvaluated(true);
              }

              // Evaluate and load persistent streak
              if (data.streakCount !== undefined || data.lastActiveDate) {
                const evaluated = evaluateStreak(
                  data.streakCount || 0,
                  data.lastActiveDate,
                  data.activeDates || []
                );
                setStreakCount(evaluated.currentStreak);
                setLastActiveDate(evaluated.lastActiveDate);
                setActiveDates(evaluated.activeDates);
              }

              if (data.onboardingCompleted) {
                setScreen("dashboard");
              } else {
                setScreen("onboarding");
              }
            } else {
              setScreen("onboarding");
            }
          } catch (e) {
            console.warn("Firestore profile fetch note:", e);
            setScreen("onboarding");
          }
        }
      } else {
        setScreen("login");
      }
      setLoadingInitialAuth(false);
    });

    return () => unsubscribe();
  }, []);

  // Default active lesson
  const defaultLesson: Lesson = languageTracksData[language]?.[0]?.lessons?.[0] || {
    id: "default",
    number: "01",
    level: 1,
    duration: "5 min",
    title: "Meet the print() function",
    intro: "The print() function displays information on the screen. Text values go inside quotation marks.",
    code: 'print("Hello, CodeXP!")',
    hint: "Try changing the message inside the quotes.",
    expectedOutput: "Hello, CodeXP!",
    tags: ["Basics"],
  };

  const [activeLesson, setActiveLesson] = useState<Lesson>(defaultLesson);

  const handleAuthSuccess = (user: User, code: string) => {
    setCurrentUser(user);
    setVerificationCode(code);
    if (!user.emailVerified) {
      setScreen("verify-email");
    } else {
      setScreen("onboarding");
    }
  };

  const handleVerified = () => {
    setScreen("onboarding");
  };

  const handleSignOut = async () => {
    await signOut(auth);
    setCurrentUser(null);
    setScreen("login");
  };

  const handleStartLesson = (lesson: Lesson) => {
    setActiveLesson(lesson);
    setScreen("learn");
  };

  // Called when user finishes/tests a lesson
  const handleCompleteLesson = async (lessonId: string) => {
    const updatedLessons = completedLessonIds.includes(lessonId)
      ? completedLessonIds
      : [...completedLessonIds, lessonId];
    setCompletedLessonIds(updatedLessons);

    // Compute consecutive daily streak
    const streakResult = recordLessonCompletionStreak(streakCount, lastActiveDate, activeDates);
    const streakIncreased = streakResult.streakIncreased;
    setStreakCount(streakResult.newStreak);
    setLastActiveDate(streakResult.newLastActiveDate);
    setActiveDates(streakResult.updatedActiveDates);

    // Trigger canvas-confetti celebration
    if (streakIncreased) {
      triggerStreakMilestoneConfetti(streakResult.newStreak);
    } else {
      triggerLessonSuccessConfetti();
    }

    if (currentUser) {
      try {
        await updateDoc(doc(db, "users", currentUser.uid), {
          completedLessons: updatedLessons,
          streakCount: streakResult.newStreak,
          lastActiveDate: streakResult.newLastActiveDate,
          activeDates: streakResult.updatedActiveDates,
          updatedAt: new Date().toISOString(),
        });
      } catch (e) {
        console.warn("Firestore progress sync note:", e);
      }
    }
  };

  const handleOnboardingChoices = async (choices: Language[]) => {
    setSelectedLanguages(choices);
    setLanguage(choices[0]);
    if (currentUser) {
      try {
        await updateDoc(doc(db, "users", currentUser.uid), {
          selectedLanguages: choices,
          onboardingCompleted: true,
          updatedAt: new Date().toISOString(),
        });
      } catch (e) {
        console.warn("Firestore onboarding sync note:", e);
      }
    }
    setScreen("dashboard");
  };

  const handleBuyFreeze = () => {
    if (userXP >= 100) {
      setUserXP((x) => x - 100);
      setStreakFreezes((f) => f + 1);
    }
  };

  const handleAddXP = (amt: number) => {
    setUserXP((x) => x + amt);
  };

  const handleCompleteTopic = (topicKey: string, earnedXP: number) => {
    const currentLangTopics = completedTopics[language] || [];
    if (!currentLangTopics.includes(topicKey)) {
      setCompletedTopics((prev) => ({
        ...prev,
        [language]: [...(prev[language] || []), topicKey],
      }));
    }

    setTopicMastery((prev) => ({
      ...prev,
      [language]: {
        ...(prev[language] || {}),
        [topicKey]: 100,
      },
    }));

    const streakResult = recordLessonCompletionStreak(streakCount, lastActiveDate, activeDates);
    const streakIncreased = streakResult.streakIncreased;
    setStreakCount(streakResult.newStreak);
    setLastActiveDate(streakResult.newLastActiveDate);
    setActiveDates(streakResult.updatedActiveDates);

    if (streakIncreased) {
      triggerStreakMilestoneConfetti(streakResult.newStreak);
    } else {
      triggerLessonSuccessConfetti();
    }
  };

  const handleStartInteractiveLesson = (topic: TopicCurriculum) => {
    setActiveInteractiveTopic(topic);
  };

  const handleStartWarmUp = (topic: TopicCurriculum) => {
    setActiveInteractiveTopic(topic);
  };

  const handleDuckEvaluated = () => {
    setDuckEvaluated(true);
    if (currentUser) {
      updateDoc(doc(db, "users", currentUser.uid), {
        duckEvaluated: true,
        updatedAt: new Date().toISOString(),
      }).catch((e) => console.warn("Firestore duck eval note:", e));
    }
  };

  const renderScreen = () => {
    if (loadingInitialAuth) {
      return (
        <main className="min-h-screen bg-[var(--bg-app)] text-[var(--text-main)] flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Logo light={themeMode !== "light"} />
            <div className="h-1.5 w-32 overflow-hidden rounded-full bg-[var(--border-subtle)]">
              <div className="h-full w-1/2 bg-[#3D7A55] animate-pulse" />
            </div>
          </div>
        </main>
      );
    }

    if (screen === "login") {
      return <AuthView onAuthSuccess={handleAuthSuccess} />;
    }

    if (screen === "verify-email") {
      return (
        <EmailVerificationView
          email={currentUser?.email || "your address"}
          verificationCode={verificationCode}
          onVerified={handleVerified}
          onSignOut={handleSignOut}
        />
      );
    }

    if (screen === "onboarding") {
      return (
        <Onboarding
          onChoose={handleOnboardingChoices}
          themeMode={themeMode}
          brightness={brightness}
          onModeChange={setThemeMode}
          onBrightnessChange={setBrightness}
        />
      );
    }

    if (screen === "dashboard") {
      return (
        <>
          <Dashboard
            selectedLanguages={selectedLanguages}
            language={language}
            onLanguageChange={(lang) => {
              setLanguage(lang);
            }}
            onStartLesson={handleStartLesson}
            onBack={() => setScreen("onboarding")}
            completedLessonIds={completedLessonIds}
            activeTab={dashboardTab}
            onTabChange={setDashboardTab}
            currentUser={currentUser}
            onSignOut={handleSignOut}
            streakCount={streakCount}
            lastActiveDate={lastActiveDate}
            activeDates={activeDates}
            duckEvaluated={duckEvaluated}
            onDuckEvaluated={handleDuckEvaluated}
            themeMode={themeMode}
            brightness={brightness}
            onModeChange={setThemeMode}
            onBrightnessChange={setBrightness}
            streakFreezes={streakFreezes}
            onBuyFreeze={handleBuyFreeze}
            userXP={userXP}
            onAddXP={handleAddXP}
            completedTopics={completedTopics[language] || []}
            onCompleteTopic={handleCompleteTopic}
            topicMastery={topicMastery[language] || {}}
            topicDifficulty={topicDifficulty[language] || {}}
            wrongAnswerCounts={wrongAnswerCounts}
            dailyGoalMinutes={dailyGoalMinutes}
            minutesSpentToday={minutesSpentToday}
            onSetDailyGoal={setDailyGoalMinutes}
            onStartInteractiveLesson={handleStartInteractiveLesson}
            onStartWarmUp={handleStartWarmUp}
          />
          {activeInteractiveTopic && (
            <InteractiveLessonModal
              topic={activeInteractiveTopic}
              language={language}
              userXP={userXP}
              onAddXP={handleAddXP}
              onCompleteTopic={handleCompleteTopic}
              onClose={() => setActiveInteractiveTopic(null)}
            />
          )}
        </>
      );
    }

    return (
      <Learning
        language={language}
        lesson={activeLesson}
        onExit={() => setScreen("dashboard")}
        onComplete={handleCompleteLesson}
        streakCount={streakCount}
        themeMode={themeMode}
        brightness={brightness}
        onModeChange={setThemeMode}
        onBrightnessChange={setBrightness}
        currentUser={currentUser}
        onSignOut={handleSignOut}
        selectedLanguages={selectedLanguages}
      />
    );
  };

  return (
    <div className={`theme-${themeMode} min-h-screen relative`}>
      {renderScreen()}

      {/* Global Screen Brightness Dimmer Overlay (50% - 100%) */}
      <div
        id="codexp-screen-dimmer"
        className="fixed inset-0 pointer-events-none z-[999999] transition-opacity duration-150"
        style={{
          backgroundColor: "#000000",
          opacity: `var(--screen-dim-opacity, ${Math.max(0, (100 - brightness) * 0.009)})`,
        }}
        aria-hidden="true"
      />

      {/* Global Night Mode Warm Amber Comfort Filter (2700K Low Blue Light) */}
      {themeMode === "night" && (
        <div
          id="codexp-night-comfort-veil"
          className="fixed inset-0 pointer-events-none z-[999998] transition-opacity duration-300"
          style={{
            backgroundColor: "rgba(255, 140, 20, 0.08)",
            mixBlendMode: "multiply",
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
