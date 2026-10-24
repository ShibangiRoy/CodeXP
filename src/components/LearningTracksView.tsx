import { useState } from "react";
import { Language, Lesson } from "../types";
import { languageTracksData } from "../data/learningTracks";
import { CheckCircle2, Play, Clock, Sparkles, BookOpen, Layers } from "lucide-react";

interface LearningTracksViewProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  availableLanguages: Language[];
  onStartLesson: (lesson: Lesson) => void;
  completedLessonIds: string[];
}

export function LearningTracksView({
  language,
  onLanguageChange,
  availableLanguages,
  onStartLesson,
  completedLessonIds,
}: LearningTracksViewProps) {
  const tracks = languageTracksData[language] || [];
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [expandedLessonId, setExpandedLessonId] = useState<string | null>(null);

  const activeTrack = tracks.find((t) => t.level === selectedLevel) || tracks[0];

  const totalLessons = tracks.reduce((acc, t) => acc + t.lessons.length, 0);
  const completedInLanguage = tracks.flatMap((t) => t.lessons).filter((l) => completedLessonIds.includes(l.id)).length;
  const progressPercent = Math.round((completedInLanguage / (totalLessons || 1)) * 100);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <section className="rounded-[28px] border border-[#DDE0D9] bg-white p-7 sm:p-10 shadow-[0_2px_0_rgba(32,37,31,.04)]">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[#4B7A5C]">
              <Layers className="h-4 w-4" />
              <span>Structured Curriculum</span>
            </div>
            <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl text-[#20251F]">
              {language} Learning Tracks
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#656A63]">
              A step-by-step masterclass engineered to take you from foundational syntax to building production-ready projects in {language}.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-[#F5F6F2] p-4 rounded-2xl border border-[#E5E7E2]">
            <div>
              <p className="text-xs font-bold text-[#71766F] uppercase tracking-wider">Overall Progress</p>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-[#20251F]">{progressPercent}%</span>
                <span className="text-xs text-[#71766F]">({completedInLanguage} of {totalLessons} lessons)</span>
              </div>
            </div>
            <div className="h-2 w-32 overflow-hidden rounded-full bg-[#DCE0D9]">
              <div
                className="h-full bg-[#3D7A55] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Language selector chips if user enrolled in multiple */}
        {availableLanguages.length > 1 && (
          <div className="mt-8 pt-6 border-t border-[#EAECE6] flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#797F77] mr-2">Track Language:</span>
            {availableLanguages.map((lang) => (
              <button
                key={lang}
                onClick={() => onLanguageChange(lang)}
                className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                  language === lang
                    ? "bg-[#20251F] text-white shadow-sm"
                    : "bg-[#F0F2ED] text-[#555A53] hover:bg-[#E3E6DF]"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Level Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {tracks.map((track) => {
          const isSelected = track.level === selectedLevel;
          const levelCompleted = track.lessons.filter((l) => completedLessonIds.includes(l.id)).length;
          return (
            <button
              key={track.level}
              onClick={() => setSelectedLevel(track.level)}
              className={`rounded-[22px] p-5 text-left transition-all border ${
                isSelected
                  ? "bg-[#20251F] text-white border-[#20251F] shadow-md transform -translate-y-0.5"
                  : "bg-white text-[#20251F] border-[#DDE0D9] hover:border-[#B5B9B0]"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold tracking-[0.14em] ${isSelected ? "text-[#F4C84B]" : track.accent}`}>
                  {track.levelLabel}
                </span>
                <span className={`text-xs font-semibold ${isSelected ? "text-[#B9C0B6]" : "text-[#71766F]"}`}>
                  {levelCompleted} / {track.lessons.length} complete
                </span>
              </div>
              <h3 className="mt-2 text-lg font-bold tracking-tight">{track.title}</h3>
              <p className={`mt-1 text-xs line-clamp-2 ${isSelected ? "text-[#D0D6CC]" : "text-[#666B64]"}`}>
                {track.copy}
              </p>
            </button>
          );
        })}
      </div>

      {/* Selected Track Detail & Lessons */}
      {activeTrack && (
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-[#20251F]">
                {activeTrack.title} Modules
              </h2>
              <p className="text-xs text-[#6F746D] mt-0.5">
                Click any lesson to review notes, explore code, and start interactive practice.
              </p>
            </div>
            <span className="text-xs font-bold text-[#3D7A55] bg-[#E2ECE4] px-3 py-1 rounded-full">
              {activeTrack.lessons.length} Lessons Available
            </span>
          </div>

          <div className="grid gap-3.5">
            {activeTrack.lessons.map((lesson) => {
              const isCompleted = completedLessonIds.includes(lesson.id);
              const isExpanded = expandedLessonId === lesson.id;

              return (
                <article
                  key={lesson.id}
                  className={`overflow-hidden rounded-[20px] border transition-all ${
                    isExpanded
                      ? "border-[#20251F] bg-white shadow-sm"
                      : "border-[#DDE0D9] bg-white hover:border-[#B0B4AB]"
                  }`}
                >
                  <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <span className={`grid h-10 w-10 flex-none place-items-center rounded-xl font-bold text-sm ${
                        isCompleted ? "bg-[#DDEDE3] text-[#2F6B45]" : "bg-[#F3F4EE] text-[#474D45]"
                      }`}>
                        {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : lesson.number}
                      </span>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-base font-bold text-[#20251F]">
                            {lesson.title}
                          </h3>
                          {lesson.tags.map((tag) => (
                            <span key={tag} className="rounded-md bg-[#F2F4EE] px-2 py-0.5 text-[11px] font-semibold text-[#5B6358]">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <p className="mt-1 text-xs sm:text-sm text-[#666B64] line-clamp-2">
                          {lesson.intro}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 sm:self-center self-end">
                      <span className="flex items-center gap-1 text-xs text-[#7B8178] font-medium mr-1">
                        <Clock className="h-3.5 w-3.5" />
                        {lesson.duration}
                      </span>
                      <button
                        type="button"
                        onClick={() => setExpandedLessonId(isExpanded ? null : lesson.id)}
                        className="rounded-xl border border-[#D9DCD5] px-3.5 py-2 text-xs font-bold text-[#3B4239] hover:bg-[#F6F7F3]"
                      >
                        {isExpanded ? "Hide Code" : "Preview"}
                      </button>
                      <button
                        type="button"
                        onClick={() => onStartLesson(lesson)}
                        className="flex items-center gap-1.5 rounded-xl bg-[#20251F] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#344036]"
                      >
                        <Play className="h-3 w-3 fill-white" />
                        <span>Start</span>
                      </button>
                    </div>
                  </div>

                  {/* Expanded Code & Details Accordion */}
                  {isExpanded && (
                    <div className="border-t border-[#ECEEE9] bg-[#F9FAF7] p-5 sm:p-6 space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-[#697066]">
                            Interactive Starter Code:
                          </span>
                          <span className="text-xs text-[#4E7A5E] font-medium">
                            {language}
                          </span>
                        </div>
                        <pre className="overflow-x-auto rounded-xl bg-[#1C201C] p-4 font-mono text-xs text-[#F1D475] leading-relaxed">
                          <code>{lesson.code}</code>
                        </pre>
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
                        <div className="flex items-center gap-2 text-xs text-[#526357]">
                          <Sparkles className="h-4 w-4 text-[#D39D16]" />
                          <span><b>Challenge:</b> {lesson.hint}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => onStartLesson(lesson)}
                          className="primary-button !py-2.5 !px-5 !text-xs self-end sm:self-auto"
                        >
                          Start Practice <span>→</span>
                        </button>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
