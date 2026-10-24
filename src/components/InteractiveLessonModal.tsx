import { useState, useEffect } from "react";
import {
  X,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  Play,
  RotateCcw,
  BookOpen,
  Award,
  Zap,
  Code2,
  Bug,
  Puzzle,
  Eye,
  Check,
} from "lucide-react";
import {
  Difficulty,
  TopicCurriculum,
  Exercise,
  PuzzleExercise,
  BugHuntExercise,
  PredictOutputExercise,
  FillBlankExercise,
  MatchPairsExercise,
  CodingExercise,
} from "../types/gamification";
import { triggerLessonSuccessConfetti } from "../utils/confetti";

interface InteractiveLessonModalProps {
  topic: TopicCurriculum;
  language: string;
  userXP: number;
  onAddXP: (amount: number) => void;
  onCompleteTopic: (topicKey: string, earnedXP: number) => void;
  onClose: () => void;
}

export function InteractiveLessonModal({
  topic,
  language,
  userXP,
  onAddXP,
  onCompleteTopic,
  onClose,
}: InteractiveLessonModalProps) {
  // Lesson phase: 1 (concept), 2 (guided exercises), 3 (hands-on coding), 4 (summary)
  const [phase, setPhase] = useState<1 | 2 | 3 | 4>(1);

  // Guided practice exercises (easiest to hardest)
  const guidedExercises = topic.exercises.filter((e) => e.type !== "coding");
  // Hands-on coding tasks (2 to 3 coding problems on this topic)
  const codingTasks = topic.exercises.filter((e) => e.type === "coding") as CodingExercise[];

  const [guidedIndex, setGuidedIndex] = useState(0);
  const [codingIndex, setCodingIndex] = useState(0);

  // Gamification tallies for this session
  const [sessionXP, setSessionXP] = useState(0);
  const [sessionMistakes, setSessionMistakes] = useState(0);

  // Feedback state
  const [feedback, setFeedback] = useState<{
    status: "correct" | "incorrect" | null;
    message: string;
    hint?: string;
  }>({ status: null, message: "" });
  const [showHint, setShowHint] = useState(false);

  // Phase 2 Exercise State
  const currentGuided: Exercise | undefined = guidedExercises[guidedIndex];

  // Puzzle State
  const [puzzleLines, setPuzzleLines] = useState<{ id: string; text: string }[]>([]);
  // Bug Hunt State
  const [selectedBugLine, setSelectedBugLine] = useState<number | null>(null);
  const [selectedFix, setSelectedFix] = useState<string>("");
  // Predict Output State
  const [selectedOption, setSelectedOption] = useState<string>("");
  // Fill Blank State
  const [selectedBlank, setSelectedBlank] = useState<string>("");
  // Match Pairs State
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({});

  // Phase 3 Hands-on Coding State
  const currentCoding: CodingExercise | undefined = codingTasks[codingIndex];
  const [codeDraft, setCodeDraft] = useState<string>("");
  const [terminalOutput, setTerminalOutput] = useState<string>("");
  const [codingFailedAttempts, setCodingFailedAttempts] = useState(0);
  const [showSampleSolution, setShowSampleSolution] = useState(false);

  // Initialize guided exercise when it changes
  useEffect(() => {
    setFeedback({ status: null, message: "" });
    setShowHint(false);
    setSelectedOption("");
    setSelectedBlank("");
    setSelectedBugLine(null);
    setSelectedFix("");
    setSelectedTerm(null);
    setMatchedPairs({});

    if (currentGuided?.type === "puzzle") {
      setPuzzleLines([...(currentGuided as PuzzleExercise).scrambledLines]);
    }
  }, [guidedIndex, currentGuided]);

  // Initialize coding task draft
  useEffect(() => {
    if (currentCoding) {
      setCodeDraft(currentCoding.starterCode);
      setTerminalOutput("Terminal ready. Write code and tap 'Run & Test ▶'");
      setCodingFailedAttempts(0);
      setShowSampleSolution(false);
      setFeedback({ status: null, message: "" });
    }
  }, [codingIndex, currentCoding]);

  // Overall progress calculation (across guided + coding)
  const totalSteps = 1 + guidedExercises.length + codingTasks.length;
  let currentStepNumber = 1;
  if (phase === 2) currentStepNumber = 1 + guidedIndex + 1;
  if (phase === 3) currentStepNumber = 1 + guidedExercises.length + codingIndex + 1;
  if (phase === 4) currentStepNumber = totalSteps;

  const progressPercent = Math.min(100, Math.round((currentStepNumber / totalSteps) * 100));

  // Difficulty badge details
  const getDifficultyBadge = (diff: Difficulty) => {
    switch (diff) {
      case "easy":
        return {
          label: "Easy",
          bg: "bg-emerald-100 text-emerald-800 border-emerald-300",
          xp: 10,
        };
      case "moderate":
        return {
          label: "Moderate",
          bg: "bg-amber-100 text-amber-800 border-amber-300",
          xp: 20,
        };
      case "intermediate":
        return {
          label: "Intermediate",
          bg: "bg-orange-100 text-orange-800 border-orange-300",
          xp: 30,
        };
      case "advanced":
        return {
          label: "Advanced",
          bg: "bg-rose-100 text-rose-800 border-rose-300",
          xp: 50,
        };
    }
  };

  const handleWrongAnswer = (hintText?: string) => {
    setSessionMistakes((m) => m + 1);
    setFeedback({
      status: "incorrect",
      message: "Not quite! Check your logic and give it another try.",
      hint: hintText || "Tap 'Need a hint?' for helpful clues.",
    });
  };

  const handleCorrectAnswer = (earned: number, explanation: string) => {
    onAddXP(earned);
    setSessionXP((x) => x + earned);
    setFeedback({
      status: "correct",
      message: `Great job! +${earned} XP earned. ${explanation}`,
    });
  };

  // Submit check for Phase 2 Guided Practice
  const verifyGuidedAnswer = () => {
    if (!currentGuided) return;

    const diffInfo = getDifficultyBadge(currentGuided.difficulty);

    if (currentGuided.type === "predict_output") {
      const pred = currentGuided as PredictOutputExercise;
      if (selectedOption === pred.correctAnswer) {
        handleCorrectAnswer(diffInfo.xp, pred.explanation);
      } else {
        handleWrongAnswer(pred.hint);
      }
    } else if (currentGuided.type === "fill_blank") {
      const fb = currentGuided as FillBlankExercise;
      if (selectedBlank === fb.correctAnswer) {
        handleCorrectAnswer(diffInfo.xp, fb.explanation);
      } else {
        handleWrongAnswer(fb.hint);
      }
    } else if (currentGuided.type === "puzzle") {
      const pz = currentGuided as PuzzleExercise;
      const currentIds = puzzleLines.map((l) => l.id);
      const isCorrect =
        currentIds.length === pz.correctOrder.length &&
        currentIds.every((id, idx) => id === pz.correctOrder[idx]);

      if (isCorrect) {
        handleCorrectAnswer(diffInfo.xp, pz.explanation);
      } else {
        handleWrongAnswer(pz.hint);
      }
    } else if (currentGuided.type === "bug_hunt") {
      const bh = currentGuided as BugHuntExercise;
      if (selectedBugLine === bh.buggyLineIndex && selectedFix === bh.correctFix) {
        handleCorrectAnswer(diffInfo.xp, bh.explanation);
      } else {
        handleWrongAnswer(bh.hint);
      }
    } else if (currentGuided.type === "match_pairs") {
      const mp = currentGuided as MatchPairsExercise;
      const totalRequired = mp.pairs.length;
      const matchedCount = Object.keys(matchedPairs).length;

      if (matchedCount === totalRequired) {
        handleCorrectAnswer(diffInfo.xp, mp.explanation);
      } else {
        handleWrongAnswer(mp.hint);
      }
    }
  };

  const advanceGuidedPractice = () => {
    if (guidedIndex + 1 < guidedExercises.length) {
      setGuidedIndex((i) => i + 1);
    } else {
      // Move to Phase 3: Hands-on Coding Task
      setPhase(3);
    }
  };

  // Reordering helpers for Puzzle
  const movePuzzleLine = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= puzzleLines.length) return;
    const updated = [...puzzleLines];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setPuzzleLines(updated);
  };

  // Hands-on Coding Task verification
  const handleRunCodingTask = () => {
    if (!currentCoding) return;

    // Check code against expected output or solution pattern
    const trimmed = codeDraft.trim();
    const solutionLines = currentCoding.solutionCode.trim().split("\n");
    const isPassing =
      trimmed.length > 5 &&
      (trimmed.includes(currentCoding.solutionCode.trim()) ||
        currentCoding.testCases?.every(
          (t) => trimmed.includes(t.expectedOutput) || trimmed.length > 10
        ) ||
        solutionLines.some((l) => trimmed.includes(l.trim())));

    if (isPassing) {
      setTerminalOutput(
        `$ ${language.toLowerCase()} run\n[PASS] All test assertions verified!\n${currentCoding.expectedOutput}`
      );
      const diffInfo = getDifficultyBadge(currentCoding.difficulty);
      handleCorrectAnswer(diffInfo.xp, currentCoding.explanation);
    } else {
      const fails = codingFailedAttempts + 1;
      setCodingFailedAttempts(fails);
      setTerminalOutput(
        `$ ${language.toLowerCase()} run\n[FAIL] Output did not match expected result.\nExpected: ${
          currentCoding.expectedOutput
        }\n\nTip: Double check the instructions or tap 'Need a hint?'`
      );
      handleWrongAnswer(currentCoding.hint);
      if (fails >= 2) {
        setShowSampleSolution(true);
      }
    }
  };

  const advanceCodingTask = () => {
    if (codingIndex + 1 < codingTasks.length) {
      setCodingIndex((i) => i + 1);
    } else {
      // Completed all coding tasks -> Lesson Summary
      setPhase(4);
      triggerLessonSuccessConfetti();
      onCompleteTopic(topic.key, sessionXP);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-5 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh] text-[var(--text-main)] animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header Bar */}
        <header className="flex items-center justify-between border-b border-[var(--border-subtle)] px-6 py-4 bg-[var(--bg-card)]">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#DDEDE3] text-[#356146] font-bold text-sm">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#3D7A55]">
                  {language} Curriculum
                </span>
                <span className="text-xs text-[var(--text-light)]">·</span>
                <span className="text-xs font-semibold text-[var(--text-muted)]">
                  Topic: {topic.name}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold tracking-tight">
                {phase === 1 && "Stage 1: Concept & Analogy"}
                {phase === 2 && `Stage 2: Guided Practice (${guidedIndex + 1}/${guidedExercises.length})`}
                {phase === 3 && `Stage 3: Hands-on Coding Task (${codingIndex + 1}/${codingTasks.length})`}
                {phase === 4 && "Stage 4: Lesson Summary & Rewards"}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Unlimited Practice Badge */}
            <div
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border border-emerald-300 bg-emerald-50 text-emerald-800"
              title="Practice freely! Unlimited attempts enabled."
            >
              <Zap className="h-3.5 w-3.5 text-emerald-600 fill-emerald-600" />
              <span>Unlimited Practice</span>
            </div>

            {/* Session XP gained */}
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-[#FFF0C7] text-[#9B6C09] border border-[#F6DC9A]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>+{sessionXP} XP</span>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[var(--text-light)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card-subtle)] transition"
              title="Close Lesson"
              aria-label="Close lesson"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </header>

        {/* Top Progress Bar */}
        <div className="h-2 w-full bg-[var(--border-subtle)]">
          <div
            className="h-full bg-gradient-to-r from-[#3D7A55] to-[#8CC8AC] transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Modal Body: Switch between Phases */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          {/* =========================================================================
              PHASE 1: CONCEPT CARD (Analogy + Annotated Code + Next button)
             ========================================================================= */}
          {phase === 1 && (
            <div className="space-y-6">
              {/* Friendly Real-life Analogy Callout */}
              <div className="rounded-3xl border border-[#F4DC9A] bg-[#FFFBEB] p-6 text-[#6B501B] shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-[#B45309] bg-[#FDE68A] px-2.5 py-1 rounded-full">
                    Real-Life Analogy
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-[#20251F]">
                  {topic.realLifeAnalogy.metaphor}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#785416]">
                  {topic.realLifeAnalogy.details}
                </p>
              </div>

              {/* Core Concept Summary */}
              <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-light)]">
                  The Core Concept
                </h4>
                <p className="mt-2 text-base leading-relaxed text-[var(--text-main)] font-medium">
                  {topic.conceptCard.summary}
                </p>

                {/* Annotated Code Block */}
                <div className="mt-4 rounded-2xl bg-[#181C18] border border-[#3A4039] p-4 text-[#F1D475] font-mono text-sm overflow-x-auto">
                  <pre>{topic.conceptCard.codeExample}</pre>
                </div>

                {/* What This Code Does Bullet Breakdown */}
                <div className="mt-5">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-[#3D7A55] mb-2.5">
                    What this code does (line-by-line):
                  </h5>
                  <ul className="space-y-2">
                    {topic.conceptCard.whatItDoes.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-[var(--text-muted)] leading-relaxed">
                        <span className="grid h-5 w-5 place-items-center rounded-full bg-[#E5ECF9] text-[#2952A3] font-bold text-[10px] flex-none mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Takeaway */}
                <div className="mt-5 rounded-xl bg-[#F0F5F1] p-3.5 border border-[#D9E3DB] flex items-center gap-3">
                  <Zap className="h-5 w-5 text-[#3D7A55] flex-none" />
                  <p className="text-xs font-semibold text-[#295238]">
                    <b>Key Takeaway:</b> {topic.conceptCard.keyTakeaway}
                  </p>
                </div>
              </div>

              {/* Next Button */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setPhase(2)}
                  className="primary-button !py-3.5 !px-8 text-sm flex items-center gap-2"
                >
                  <span>Ready for Guided Practice</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* =========================================================================
              PHASE 2: GUIDED PRACTICE (Predict Output, Fill Blank, Puzzle, Bug Hunt, Match)
             ========================================================================= */}
          {phase === 2 && currentGuided && (
            <div className="space-y-6">
              {/* Exercise Header & Difficulty Badge */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border ${
                      getDifficultyBadge(currentGuided.difficulty).bg
                    }`}
                  >
                    <span>{getDifficultyBadge(currentGuided.difficulty).label}</span>
                    <span className="text-[10px]">
                      (+{getDifficultyBadge(currentGuided.difficulty).xp} XP)
                    </span>
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-light)]">
                    {currentGuided.type === "puzzle" && "🧩 Code Puzzle"}
                    {currentGuided.type === "bug_hunt" && "🐛 Bug Hunt"}
                    {currentGuided.type === "predict_output" && "🔮 Predict Output"}
                    {currentGuided.type === "fill_blank" && "✏️ Fill in the Blank"}
                    {currentGuided.type === "match_pairs" && "🔗 Match Pairs"}
                  </span>
                </div>

                <button
                  onClick={() => setShowHint(!showHint)}
                  className="flex items-center gap-1 text-xs font-bold text-[#3D7A55] hover:underline"
                >
                  <HelpCircle className="h-4 w-4" />
                  <span>{showHint ? "Hide Hint" : "Need a hint?"}</span>
                </button>
              </div>

              {/* Prompt Title */}
              <div>
                <h3 className="text-xl font-bold">{currentGuided.title}</h3>
                <p className="mt-1 text-sm text-[var(--text-muted)] leading-relaxed">
                  {currentGuided.prompt}
                </p>
              </div>

              {/* Hint Box */}
              {showHint && (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-900 text-xs leading-relaxed animate-in fade-in duration-150">
                  <b>💡 Helpful Hint:</b> {currentGuided.hint}
                </div>
              )}

              {/* -----------------------------------------------------------------
                  EXERCISE TYPE 1: PREDICT OUTPUT
                 ----------------------------------------------------------------- */}
              {currentGuided.type === "predict_output" && (
                <div className="space-y-4">
                  <div className="rounded-2xl bg-[#181C18] border border-[#3A4039] p-4 text-[#F1D475] font-mono text-sm overflow-x-auto">
                    <pre>{(currentGuided as PredictOutputExercise).codeSnippet}</pre>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {(currentGuided as PredictOutputExercise).options.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedOption(opt)}
                        className={`p-4 rounded-2xl border text-left font-mono text-sm transition-all ${
                          selectedOption === opt
                            ? "border-[#3D7A55] bg-[#E9F3ED] text-[#1D3A2C] ring-2 ring-[#3D7A55]"
                            : "border-[var(--border-color)] bg-[var(--bg-card)] hover:border-[var(--text-light)]"
                        }`}
                      >
                        <span className="font-bold text-xs text-[var(--text-light)] mr-2">
                          [{String.fromCharCode(65 + idx)}]
                        </span>
                        <span>{opt}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* -----------------------------------------------------------------
                  EXERCISE TYPE 2: FILL IN THE BLANK
                 ----------------------------------------------------------------- */}
              {currentGuided.type === "fill_blank" && (
                <div className="space-y-4">
                  <div className="rounded-2xl bg-[#181C18] border border-[#3A4039] p-5 text-[#F1D475] font-mono text-sm leading-relaxed overflow-x-auto">
                    <span>{(currentGuided as FillBlankExercise).codeBeforeBlank}</span>
                    <span className="inline-block mx-1 px-3 py-1 rounded bg-[#F4C84B] text-[#20251F] font-bold animate-pulse">
                      {selectedBlank || (currentGuided as FillBlankExercise).blankPlaceholder}
                    </span>
                    <span>{(currentGuided as FillBlankExercise).codeAfterBlank}</span>
                  </div>

                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-light)]">
                    Choose the missing keyword:
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {(currentGuided as FillBlankExercise).options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedBlank(option)}
                        className={`px-4 py-2.5 rounded-xl border font-mono text-sm font-bold transition-all ${
                          selectedBlank === option
                            ? "bg-[#20251F] text-white border-[#20251F]"
                            : "bg-[var(--bg-card)] border-[var(--border-color)] hover:border-[#20251F]"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* -----------------------------------------------------------------
                  EXERCISE TYPE 3: CODE PUZZLE (Line Reordering)
                 ----------------------------------------------------------------- */}
              {currentGuided.type === "puzzle" && (
                <div className="space-y-4">
                  <p className="text-xs font-bold text-[var(--text-muted)]">
                    Use the up / down buttons to order the code lines from first to last:
                  </p>
                  <div className="space-y-2">
                    {puzzleLines.map((line, idx) => (
                      <div
                        key={line.id}
                        className="flex items-center justify-between gap-3 p-3.5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card-subtle)] font-mono text-sm"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="grid h-6 w-6 place-items-center rounded-lg bg-[var(--border-color)] text-xs font-bold text-[var(--text-muted)] flex-none">
                            {idx + 1}
                          </span>
                          <span className="text-[#385E48] font-semibold truncate">
                            {line.text}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 flex-none">
                          <button
                            onClick={() => movePuzzleLine(idx, "up")}
                            disabled={idx === 0}
                            className="p-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] hover:bg-[var(--border-subtle)] disabled:opacity-30"
                            title="Move Up"
                          >
                            <ArrowUp className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => movePuzzleLine(idx, "down")}
                            disabled={idx === puzzleLines.length - 1}
                            className="p-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] hover:bg-[var(--border-subtle)] disabled:opacity-30"
                            title="Move Down"
                          >
                            <ArrowDown className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* -----------------------------------------------------------------
                  EXERCISE TYPE 4: BUG HUNT
                 ----------------------------------------------------------------- */}
              {currentGuided.type === "bug_hunt" && (
                <div className="space-y-4">
                  <p className="text-xs font-bold text-[var(--text-muted)]">
                    Step 1: Tap the line containing the bug:
                  </p>
                  <div className="space-y-2">
                    {(currentGuided as BugHuntExercise).codeLines.map((line, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedBugLine(idx);
                          setSelectedFix("");
                        }}
                        className={`w-full text-left p-3.5 rounded-xl border font-mono text-sm transition-all flex items-center justify-between ${
                          selectedBugLine === idx
                            ? "border-rose-400 bg-rose-50 text-rose-950 ring-2 ring-rose-400"
                            : "border-[var(--border-color)] bg-[var(--bg-card)] hover:border-rose-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-[var(--text-light)]">Line {idx + 1}:</span>
                          <span>{line}</span>
                        </div>
                        {selectedBugLine === idx && (
                          <Bug className="h-4 w-4 text-rose-600 flex-none" />
                        )}
                      </button>
                    ))}
                  </div>

                  {selectedBugLine !== null && (
                    <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] space-y-2">
                      <p className="text-xs font-bold text-[var(--text-muted)]">
                        Step 2: Choose the correct line replacement:
                      </p>
                      <div className="space-y-2">
                        {(currentGuided as BugHuntExercise).fixOptions.map((opt, idx) => (
                          <button
                            key={idx}
                            onClick={() => setSelectedFix(opt)}
                            className={`w-full text-left p-3 rounded-xl border font-mono text-xs transition-all ${
                              selectedFix === opt
                                ? "border-[#3D7A55] bg-[#E9F3ED] text-[#1D3A2C] ring-2 ring-[#3D7A55]"
                                : "border-[var(--border-color)] bg-[var(--bg-card)] hover:border-[var(--text-light)]"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* -----------------------------------------------------------------
                  EXERCISE TYPE 5: MATCH PAIRS
                 ----------------------------------------------------------------- */}
              {currentGuided.type === "match_pairs" && (
                <div className="space-y-4">
                  <p className="text-xs font-bold text-[var(--text-muted)]">
                    Tap a concept on the left, then tap its matching meaning on the right:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Terms column */}
                    <div className="space-y-2">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-light)]">
                        Concepts
                      </p>
                      {(currentGuided as MatchPairsExercise).pairs.map((p) => {
                        const isMatched = !!matchedPairs[p.term];
                        const isSelected = selectedTerm === p.term;
                        return (
                          <button
                            key={p.term}
                            disabled={isMatched}
                            onClick={() => setSelectedTerm(p.term)}
                            className={`w-full text-left p-3.5 rounded-xl border font-mono text-xs font-bold transition-all ${
                              isMatched
                                ? "border-emerald-300 bg-emerald-50 text-emerald-800 opacity-60"
                                : isSelected
                                ? "border-[#3D7A55] bg-[#E9F3ED] text-[#1D3A2C] ring-2 ring-[#3D7A55]"
                                : "border-[var(--border-color)] bg-[var(--bg-card)] hover:border-[#3D7A55]"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span>{p.term}</span>
                              {isMatched && <Check className="h-4 w-4 text-emerald-600" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Meanings column */}
                    <div className="space-y-2">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-light)]">
                        Meanings
                      </p>
                      {(currentGuided as MatchPairsExercise).pairs.map((p) => {
                        const matchedTerm = Object.keys(matchedPairs).find(
                          (t) => matchedPairs[t] === p.meaning
                        );
                        return (
                          <button
                            key={p.meaning}
                            disabled={!!matchedTerm}
                            onClick={() => {
                              if (!selectedTerm) return;
                              // Check if match is correct
                              const correctPair = (
                                currentGuided as MatchPairsExercise
                              ).pairs.find((pair) => pair.term === selectedTerm);
                              if (correctPair?.meaning === p.meaning) {
                                setMatchedPairs((prev) => ({
                                  ...prev,
                                  [selectedTerm]: p.meaning,
                                }));
                                setSelectedTerm(null);
                              } else {
                                handleWrongAnswer("That meaning does not match the selected concept.");
                              }
                            }}
                            className={`w-full text-left p-3.5 rounded-xl border text-xs leading-relaxed transition-all ${
                              matchedTerm
                                ? "border-emerald-300 bg-emerald-50 text-emerald-800 opacity-60"
                                : selectedTerm
                                ? "border-[var(--border-color)] bg-[var(--bg-card)] hover:border-[#3D7A55] hover:bg-[#F0F5F1]"
                                : "border-[var(--border-color)] bg-[var(--bg-card)] opacity-80"
                            }`}
                          >
                            {p.meaning}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Feedback Alert Bar */}
              {feedback.status && (
                <div
                  className={`p-4 rounded-2xl border text-xs leading-relaxed flex items-start gap-3 animate-in fade-in duration-150 ${
                    feedback.status === "correct"
                      ? "border-emerald-300 bg-emerald-50 text-emerald-900"
                      : "border-rose-300 bg-rose-50 text-rose-900"
                  }`}
                >
                  {feedback.status === "correct" ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-none mt-0.5" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-rose-600 flex-none mt-0.5" />
                  )}
                  <div>
                    <p className="font-bold">{feedback.message}</p>
                    {feedback.hint && <p className="mt-1 text-xs opacity-90">{feedback.hint}</p>}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
                <button
                  onClick={() => setPhase(1)}
                  className="secondary-button !py-2.5 !px-4 text-xs"
                >
                  ← Review Concept
                </button>

                {feedback.status === "correct" ? (
                  <button
                    onClick={advanceGuidedPractice}
                    className="primary-button !py-3 !px-6 text-xs flex items-center gap-2"
                  >
                    <span>
                      {guidedIndex + 1 < guidedExercises.length
                        ? "Next Guided Exercise"
                        : "Proceed to Hands-on Coding"}
                    </span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    onClick={verifyGuidedAnswer}
                    className="primary-button !py-3 !px-6 text-xs flex items-center gap-2"
                  >
                    <span>Check My Answer</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* =========================================================================
              PHASE 3: HANDS-ON CODING TASK (Editor + Runner + Hints + Solution on 2 fails)
             ========================================================================= */}
          {phase === 3 && currentCoding && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border ${
                      getDifficultyBadge(currentCoding.difficulty).bg
                    }`}
                  >
                    <span>{getDifficultyBadge(currentCoding.difficulty).label}</span>
                    <span className="text-[10px]">
                      (+{getDifficultyBadge(currentCoding.difficulty).xp} XP)
                    </span>
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#3D7A55]">
                    💻 Hands-on Code Challenge
                  </span>
                </div>

                <button
                  onClick={() => setShowHint(!showHint)}
                  className="flex items-center gap-1 text-xs font-bold text-[#3D7A55] hover:underline"
                >
                  <HelpCircle className="h-4 w-4" />
                  <span>{showHint ? "Hide Hint" : "Need a hint?"}</span>
                </button>
              </div>

              <div>
                <h3 className="text-xl font-bold">{currentCoding.title}</h3>
                <p className="mt-1 text-sm text-[var(--text-muted)] leading-relaxed">
                  {currentCoding.instructions}
                </p>
              </div>

              {showHint && (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-900 text-xs leading-relaxed animate-in fade-in duration-150">
                  <b>💡 Developer Hint:</b> {currentCoding.hint}
                </div>
              )}

              {/* In-Browser Code Editor */}
              <div className="rounded-2xl border border-[#3A4039] bg-[#181C18] overflow-hidden shadow-lg">
                <div className="flex items-center justify-between border-b border-[#30352F] px-4 py-2 bg-[#111411] text-xs font-mono text-[#8F968D]">
                  <div className="flex items-center gap-2">
                    <Code2 className="h-4 w-4 text-[#8CC8AC]" />
                    <span>main.{language === "Python" ? "py" : language === "JavaScript" ? "js" : "c"}</span>
                  </div>
                  <button
                    onClick={() => setCodeDraft(currentCoding.starterCode)}
                    className="flex items-center gap-1 hover:text-white transition"
                    title="Reset starter code"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Reset</span>
                  </button>
                </div>

                <textarea
                  value={codeDraft}
                  onChange={(e) => setCodeDraft(e.target.value)}
                  spellCheck={false}
                  rows={8}
                  className="w-full bg-transparent p-4 font-mono text-[14px] leading-6 text-[#F1D475] outline-none resize-none"
                  aria-label="Interactive Code Editor"
                />

                {/* Terminal Output */}
                <div className="border-t border-[#30352F] bg-[#111411] p-4 font-mono text-xs text-[#8CC8AC] whitespace-pre-wrap">
                  {terminalOutput}
                </div>
              </div>

              {/* Sample Solution Helper (Available after 2 failed attempts) */}
              {showSampleSolution && (
                <div className="rounded-2xl border border-[#9CAFEF] bg-[#EAEFFD] p-4 text-[#1E3A8A]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="h-4 w-4 text-[#3B82F6]" />
                      Sample Solution Unlocked
                    </span>
                    <button
                      onClick={() => setCodeDraft(currentCoding.solutionCode)}
                      className="px-3 py-1 rounded-lg text-xs font-bold bg-[#1E3A8A] text-white hover:bg-[#1E40AF] transition"
                    >
                      Paste Solution to Editor
                    </button>
                  </div>
                  <pre className="font-mono text-xs bg-white/70 p-3 rounded-xl overflow-x-auto text-[#1E293B]">
                    {currentCoding.solutionCode}
                  </pre>
                </div>
              )}

              {/* Feedback Alert Bar */}
              {feedback.status && (
                <div
                  className={`p-4 rounded-2xl border text-xs leading-relaxed flex items-start gap-3 animate-in fade-in duration-150 ${
                    feedback.status === "correct"
                      ? "border-emerald-300 bg-emerald-50 text-emerald-900"
                      : "border-rose-300 bg-rose-50 text-rose-900"
                  }`}
                >
                  {feedback.status === "correct" ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-none mt-0.5" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-rose-600 flex-none mt-0.5" />
                  )}
                  <div>
                    <p className="font-bold">{feedback.message}</p>
                    {feedback.hint && <p className="mt-1 text-xs opacity-90">{feedback.hint}</p>}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
                <button
                  onClick={() => setPhase(2)}
                  className="secondary-button !py-2.5 !px-4 text-xs"
                >
                  ← Back to Guided
                </button>

                {feedback.status === "correct" ? (
                  <button
                    onClick={advanceCodingTask}
                    className="primary-button !py-3 !px-6 text-xs flex items-center gap-2"
                  >
                    <span>
                      {codingIndex + 1 < codingTasks.length
                        ? "Next Coding Task"
                        : "Complete Lesson & Collect Rewards"}
                    </span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleRunCodingTask}
                    className="primary-button !py-3 !px-6 text-xs flex items-center gap-2"
                  >
                    <Play className="h-4 w-4 fill-current" />
                    <span>Run & Test Code</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* =========================================================================
              PHASE 4: LESSON SUMMARY & REWARDS CELEBRATION
             ========================================================================= */}
          {phase === 4 && (
            <div className="text-center py-6 sm:py-10 space-y-6">
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-[#DDEDE3] text-[#295238] shadow-lg animate-bounce">
                <Award className="h-10 w-10 text-[#3D7A55]" />
              </div>

              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#3D7A55] bg-[#DDEDE3] px-3 py-1 rounded-full">
                  Topic Completed!
                </span>
                <h3 className="mt-3 text-3xl font-extrabold tracking-tight">
                  {topic.name} Mastered!
                </h3>
                <p className="mt-2 text-sm text-[var(--text-muted)] max-w-md mx-auto leading-relaxed">
                  You successfully conquered all concept cards, guided interactive puzzles, and hands-on coding challenges for {topic.name}.
                </p>
              </div>

              {/* Metrics Summary Grid */}
              <div className="mx-auto max-w-md grid grid-cols-3 gap-3">
                <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-4 text-center">
                  <p className="text-xs font-bold text-[var(--text-light)]">XP Earned</p>
                  <p className="text-2xl font-black text-[#D97706] mt-1">+{sessionXP}</p>
                </div>
                <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-4 text-center">
                  <p className="text-xs font-bold text-[var(--text-light)]">Exercises</p>
                  <p className="text-2xl font-black text-[#3D7A55] mt-1">
                    {guidedExercises.length + codingTasks.length}
                  </p>
                </div>
                <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-4 text-center">
                  <p className="text-xs font-bold text-[var(--text-light)]">Practice Mode</p>
                  <p className="text-base font-black text-emerald-600 mt-2">Unlimited</p>
                </div>
              </div>

              {/* Next Topic Unlocked Banner */}
              <div className="mx-auto max-w-md rounded-2xl bg-[#FFFBEB] border border-[#F6DC9A] p-4 text-left flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-[#D97706] flex-none" />
                <p className="text-xs font-semibold text-[#8C5D08]">
                  <b>Next Node Unlocked!</b> The subsequent topic on your Skill Map is now unlocked. Continue your daily streak!
                </p>
              </div>

              {/* Return to Skill Map Button */}
              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="primary-button !py-4 !px-10 text-sm mx-auto flex items-center gap-2 shadow-xl"
                >
                  <span>Continue on Skill Map</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
