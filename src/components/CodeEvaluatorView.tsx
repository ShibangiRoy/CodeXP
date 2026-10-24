import { useState, useRef, ChangeEvent, DragEvent } from "react";
import { DuckAvatar } from "./DuckAvatar";
import { CodeEvaluationResult, Lesson } from "../types";
import {
  Upload,
  FileCode,
  Copy,
  Check,
  Play,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  AlertOctagon,
  Info,
  CheckCircle2,
  Trash2,
  HelpCircle,
  FileText,
  Lightbulb,
} from "lucide-react";

interface CodeEvaluatorViewProps {
  onOpenInPlayground?: (lesson: Lesson) => void;
  onEvaluated?: () => void;
}

const SAMPLE_CODES: Record<string, { label: string; lang: string; filename: string; code: string }> = {
  python: {
    label: "Python (Buggy Loop & Scope)",
    lang: "Python",
    filename: "user_tracker.py",
    code: `def calculate_rewards(users, threshold=100):
    rewards = []
    # Bug 1: mutable default or dangerous accumulator
    for user in users:
        points = user.get("score")
        if points > threshold:
            bonus = points * 0.15
            # Potential TypeError if points is None
            rewards.append({"name": user["name"], "bonus": bonus})
        else:
            rewards.append({"name": user["name"], "bonus": 0})
    return rewards

# Test data with an unhandled edge case
team = [{"name": "Maya", "score": 140}, {"name": "Liam", "score": None}]
print(calculate_rewards(team))`,
  },
  javascript: {
    label: "JavaScript (Async & Memory Leak)",
    lang: "JavaScript",
    filename: "fetchAnalytics.js",
    code: `var cachedTokens = {}; // Bug: global var leak

function fetchUserStats(userId) {
  var url = "https://api.example.com/users/" + userId;
  
  // Bug: Missing error handling and unhandled promise rejection
  fetch(url).then(res => {
    var data = res.json();
    cachedTokens[userId] = data;
    console.log("Stats loaded: " + data);
    return data;
  });
}

// Running multiple calls synchronously without await
fetchUserStats("usr_42");
fetchUserStats("usr_99");`,
  },
  cpp: {
    label: "C++ (Dangling Pointer & Memory Leak)",
    lang: "C++",
    filename: "game_entity.cpp",
    code: `#include <iostream>

int* createScoreBuffer(int initialScore) {
    int score = initialScore * 2;
    // Bug: Returning pointer to local stack variable!
    return &score;
}

int main() {
    int* badPtr = createScoreBuffer(50);
    std::cout << "Score value: " << *badPtr << std::endl;
    
    // Bug: Raw dynamic allocation without delete
    int* leakyArray = new int[100];
    leakyArray[0] = 42;
    
    return 0;
}`,
  },
  linux: {
    label: "Linux / Bash (Unquoted Paths & Error Escapes)",
    lang: "Linux",
    filename: "backup_deploy.sh",
    code: `#!/bin/bash
# Bug: Missing set -e, unquoted variables leading to word splitting
DEST_DIR=/var/backups/$1

mkdir -p $DEST_DIR
# Dangerous rm if DEST_DIR is unset!
rm -rf $DEST_DIR/*

cp -r /app/logs $DEST_DIR
echo "Backup to $DEST_DIR completed!"`,
  },
  c: {
    label: "C (Buffer Overflow & Unchecked Pointer)",
    lang: "C",
    filename: "string_buffer.c",
    code: `#include <stdio.h>
#include <string.h>

void unsafe_copy(char *input) {
    char small_buffer[8];
    // Bug: strcpy lacks bounds checking, classic buffer overflow vulnerability!
    strcpy(small_buffer, input);
    printf("Buffer holds: %s\\n", small_buffer);
}

int main(void) {
    unsafe_copy("A very long unauthorized payload string");
    return 0;
}`,
  },
  html: {
    label: "HTML (Missing Alt & Inaccessible Form)",
    lang: "HTML",
    filename: "checkout.html",
    code: `<div>
  <!-- Bug: Non-semantic div soup and inaccessible image -->
  <img src="banner.jpg">
  
  <!-- Bug: input without associated label or aria-label -->
  <input type="text" placeholder="Card number">
  <div onclick="submitCard()">Pay Now</div>
</div>`,
  },
  css: {
    label: "CSS (Over-Specific Selectors & Pixel Fixed Width)",
    lang: "CSS",
    filename: "styles.css",
    code: `/* Bug: Excessive specificity and hardcoded non-responsive pixel widths */
body div#app .main-container .card-list .card {
  width: 900px; /* Breaks on mobile viewports! */
  float: left;  /* Outdated layout mode */
  font-size: 14px;
  !important;
}`,
  },
  mysql: {
    label: "MySQL (Missing Indexes & Injection Risk)",
    lang: "MySQL",
    filename: "query_orders.sql",
    code: `-- Bug: Full table scan with leading wildcard LIKE, no indexing
SELECT * 
FROM customer_orders 
WHERE notes LIKE '%urgent%'
  AND YEAR(order_date) = 2026; -- Function call on column disables index!`,
  },
};

export function CodeEvaluatorView({ onOpenInPlayground, onEvaluated }: CodeEvaluatorViewProps) {
  const [code, setCode] = useState(SAMPLE_CODES.python.code);
  const [language, setLanguage] = useState("Python");
  const [filename, setFilename] = useState("user_tracker.py");
  const [inputMode, setInputMode] = useState<"write" | "file">("write");
  const [evaluating, setEvaluating] = useState(false);
  const [result, setResult] = useState<CodeEvaluationResult | null>(null);
  const [copiedImproved, setCopiedImproved] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: number; content: string }[]>([]);
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEvaluate = async () => {
    if (!code.trim()) {
      setErrorMessage("Please enter or upload some code before asking the Duck for evaluation!");
      return;
    }

    setErrorMessage(null);
    setEvaluating(true);

    try {
      const response = await fetch("/api/evaluate-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          language,
          filename,
        }),
      });

      if (!response.ok) {
        throw new Error(`Evaluation failed with status ${response.status}`);
      }

      const data: CodeEvaluationResult = await response.json();
      setResult(data);
      onEvaluated?.();
    } catch (err: any) {
      console.error("Evaluation error:", err);
      setErrorMessage("The Duck encountered an issue evaluating your code. Please check your connection and try again.");
    } finally {
      setEvaluating(false);
    }
  };

  const handleFileDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(Array.from(e.target.files));
    }
  };

  const processFiles = (files: File[]) => {
    const validFiles: { name: string; size: number; content: string }[] = [];
    let processed = 0;

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (typeof text === "string") {
          validFiles.push({
            name: file.name,
            size: file.size,
            content: text,
          });
        }
        processed++;
        if (processed === files.length) {
          setUploadedFiles(validFiles);
          if (validFiles.length > 0) {
            setCode(validFiles[0].content);
            setFilename(validFiles[0].name);
            detectLanguageFromFilename(validFiles[0].name);
            setActiveFileIndex(0);
          }
        }
      };
      reader.readAsText(file);
    });
  };

  const detectLanguageFromFilename = (fname: string) => {
    const ext = fname.split(".").pop()?.toLowerCase();
    if (ext === "py") setLanguage("Python");
    else if (ext === "js" || ext === "jsx" || ext === "mjs") setLanguage("JavaScript");
    else if (ext === "ts" || ext === "tsx") setLanguage("JavaScript");
    else if (ext === "java") setLanguage("Java");
    else if (ext === "cpp" || ext === "cc" || ext === "cxx" || ext === "hpp") setLanguage("C++");
    else if (ext === "c" || ext === "h") setLanguage("C");
    else if (ext === "sh" || ext === "bash" || ext === "zsh") setLanguage("Linux");
    else if (ext === "html" || ext === "htm") setLanguage("HTML");
    else if (ext === "css") setLanguage("CSS");
    else if (ext === "sql") setLanguage("MySQL");
  };

  const handleSelectUploadedFile = (idx: number) => {
    setActiveFileIndex(idx);
    const f = uploadedFiles[idx];
    if (f) {
      setCode(f.content);
      setFilename(f.name);
      detectLanguageFromFilename(f.name);
    }
  };

  const handleCopyImprovedCode = () => {
    if (!result?.improvedCode) return;
    navigator.clipboard.writeText(result.improvedCode);
    setCopiedImproved(true);
    setTimeout(() => setCopiedImproved(false), 2000);
  };

  const handleLaunchInPlayground = () => {
    if (!result?.improvedCode || !onOpenInPlayground) return;
    const virtualLesson: Lesson = {
      id: "evaluator-refactored",
      number: "DUCK",
      level: 1,
      duration: "5 min",
      title: `Duck Refactored ${filename}`,
      intro: result.summary,
      code: result.improvedCode,
      hint: result.duckWisdom,
      expectedOutput: "Code refactored and evaluated by Professor Quackers.",
      tags: ["Refactored", language],
    };
    onOpenInPlayground(virtualLesson);
  };

  const loadSample = (key: keyof typeof SAMPLE_CODES) => {
    const s = SAMPLE_CODES[key];
    setCode(s.code);
    setLanguage(s.lang);
    setFilename(s.filename);
    setResult(null);
  };

  return (
    <div className="space-y-8 text-[var(--text-main)]">
      {/* Header Banner with Duck Mascot */}
      <section className="rounded-[28px] border border-[var(--border-color)] bg-[var(--bg-card)] p-7 sm:p-9 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-5">
            <DuckAvatar
              size="lg"
              state={evaluating ? "thinking" : result ? "speaking" : "idle"}
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="eyebrow text-[#D97706] flex items-center gap-1.5 font-bold">
                  <Sparkles className="h-3.5 w-3.5" />
                  Code Evaluator
                </span>
                <span className="rounded-full bg-[#F4C84B]/20 border border-[#F4C84B]/40 px-2.5 py-0.5 text-[11px] font-bold text-[#D97706]">
                  Professor Quackers
                </span>
              </div>
              <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-main)]">
                Rubber Duck Code Evaluator
              </h1>
              <p className="mt-1.5 max-w-2xl text-xs sm:text-sm leading-relaxed text-[var(--text-muted)]">
                Write, paste, or drop your code files. The Rubber Duck will thoroughly examine your code, give you honest, candid feedback, and teach you how to improve it.
              </p>
            </div>
          </div>

          {/* Quick preset buttons */}
          <div className="flex flex-wrap items-center gap-1.5 sm:self-center max-w-md">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-light)] mr-1">
              Try Sample:
            </span>
            <button
              onClick={() => loadSample("python")}
              className="rounded-full border border-[var(--border-color)] bg-[var(--bg-card-subtle)] hover:bg-[var(--bg-card-muted)] px-2.5 py-1 text-xs font-semibold text-[var(--text-main)] transition"
            >
              Python
            </button>
            <button
              onClick={() => loadSample("javascript")}
              className="rounded-full border border-[var(--border-color)] bg-[var(--bg-card-subtle)] hover:bg-[var(--bg-card-muted)] px-2.5 py-1 text-xs font-semibold text-[var(--text-main)] transition"
            >
              JavaScript
            </button>
            <button
              onClick={() => loadSample("cpp")}
              className="rounded-full border border-[var(--border-color)] bg-[var(--bg-card-subtle)] hover:bg-[var(--bg-card-muted)] px-2.5 py-1 text-xs font-semibold text-[var(--text-main)] transition"
            >
              C++
            </button>
            <button
              onClick={() => loadSample("linux")}
              className="rounded-full border border-[var(--border-color)] bg-[var(--bg-card-subtle)] hover:bg-[var(--bg-card-muted)] px-2.5 py-1 text-xs font-semibold text-[var(--text-main)] transition"
            >
              Linux
            </button>
            <button
              onClick={() => loadSample("c")}
              className="rounded-full border border-[var(--border-color)] bg-[var(--bg-card-subtle)] hover:bg-[var(--bg-card-muted)] px-2.5 py-1 text-xs font-semibold text-[var(--text-main)] transition"
            >
              C
            </button>
            <button
              onClick={() => loadSample("html")}
              className="rounded-full border border-[var(--border-color)] bg-[var(--bg-card-subtle)] hover:bg-[var(--bg-card-muted)] px-2.5 py-1 text-xs font-semibold text-[var(--text-main)] transition"
            >
              HTML
            </button>
            <button
              onClick={() => loadSample("css")}
              className="rounded-full border border-[var(--border-color)] bg-[var(--bg-card-subtle)] hover:bg-[var(--bg-card-muted)] px-2.5 py-1 text-xs font-semibold text-[var(--text-main)] transition"
            >
              CSS
            </button>
            <button
              onClick={() => loadSample("mysql")}
              className="rounded-full border border-[var(--border-color)] bg-[var(--bg-card-subtle)] hover:bg-[var(--bg-card-muted)] px-2.5 py-1 text-xs font-semibold text-[var(--text-main)] transition"
            >
              MySQL
            </button>
          </div>
        </div>
      </section>

      {/* Editor & File Upload Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-12 rounded-[24px] border border-[var(--border-color)] bg-[var(--bg-card)] p-6 shadow-sm">
          {/* Top Controls: Mode, Language & Filename */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-[var(--border-subtle)]">
            {/* Input Mode Toggle */}
            <div className="grid grid-cols-2 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] p-1 text-xs font-bold">
              <button
                type="button"
                onClick={() => setInputMode("write")}
                className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 transition ${
                  inputMode === "write"
                    ? "bg-[var(--bg-card)] text-[var(--text-main)] border border-[var(--border-color)] shadow-xs"
                    : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                }`}
              >
                <FileCode className="h-3.5 w-3.5" />
                <span>Write / Paste Code</span>
              </button>
              <button
                type="button"
                onClick={() => setInputMode("file")}
                className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 transition ${
                  inputMode === "file"
                    ? "bg-[var(--bg-card)] text-[var(--text-main)] border border-[var(--border-color)] shadow-xs"
                    : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                }`}
              >
                <Upload className="h-3.5 w-3.5" />
                <span>Upload Files</span>
              </button>
            </div>

            {/* Language & Filename selectors */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[var(--text-muted)]">Language:</span>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] px-3 py-1.5 text-xs font-bold text-[var(--text-main)] outline-none"
                >
                  <option value="Python">Python</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="Java">Java</option>
                  <option value="C++">C++</option>
                  <option value="Linux">Linux</option>
                  <option value="C">C</option>
                  <option value="HTML">HTML</option>
                  <option value="CSS">CSS</option>
                  <option value="MySQL">MySQL</option>
                </select>
              </div>

              <div className="flex items-center gap-2 flex-1 sm:flex-initial">
                <span className="text-xs font-bold text-[#6B7168]">File:</span>
                <input
                  type="text"
                  value={filename}
                  onChange={(e) => setFilename(e.target.value)}
                  placeholder="filename.ext"
                  className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] px-3 py-1.5 text-xs font-mono text-[var(--text-main)] outline-none w-32"
                />
              </div>
            </div>
          </div>

          {/* Mode 1: Write / Paste Code Editor */}
          {inputMode === "write" ? (
            <div className="mt-5">
              <div className="flex min-h-[340px] overflow-hidden rounded-2xl border border-[var(--code-border)] bg-[var(--code-bg)]">
                {/* Monospace Code Editor */}
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  spellCheck={false}
                  placeholder={`// Paste or write your ${language} code here for honest Duck evaluation...\nfunction example() {\n  return "Quack!";\n}`}
                  className="w-full resize-y bg-transparent p-5 font-mono text-[14px] leading-relaxed text-[var(--code-text)] outline-none min-h-[340px]"
                />
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-[var(--text-light)]">
                <span>{code.split("\n").length} lines · {code.length} characters</span>
                <button
                  type="button"
                  onClick={() => setCode("")}
                  className="text-xs text-[var(--text-muted)] hover:text-rose-500 transition"
                >
                  Clear Editor
                </button>
              </div>
            </div>
          ) : (
            /* Mode 2: File Upload / Dropzone */
            <div className="mt-5 space-y-4">
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleFileDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-all ${
                  dragActive
                    ? "border-[var(--accent-gold)] bg-[var(--bg-card-subtle)]"
                    : "border-[var(--border-color)] bg-[var(--bg-card-subtle)] hover:border-[var(--accent-gold)]"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFileInputChange}
                  className="hidden"
                  accept=".py,.js,.jsx,.ts,.tsx,.java,.cpp,.c,.h,.hpp,.go,.rs,.html,.css,.json,.sql,.txt"
                />
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--bg-card)] text-[#3D7A55] border border-[var(--border-color)] mb-3">
                  <Upload className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold text-[var(--text-main)]">
                  Drop code files here or click to browse
                </h3>
                <p className="mt-1 text-xs text-[var(--text-muted)]">
                  Accepts Python (.py), JavaScript (.js), TypeScript (.ts), Java (.java), C++ (.cpp), and other standard source code files.
                </p>
              </div>

              {/* Uploaded File Tabs */}
              {uploadedFiles.length > 0 && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                    Uploaded Files ({uploadedFiles.length}):
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {uploadedFiles.map((file, idx) => (
                      <button
                        key={file.name + idx}
                        type="button"
                        onClick={() => handleSelectUploadedFile(idx)}
                        className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-mono transition ${
                          activeFileIndex === idx
                            ? "bg-[var(--accent-primary)] text-[var(--accent-primary-text)] shadow-sm"
                            : "bg-[var(--bg-card-subtle)] text-[var(--text-main)] border border-[var(--border-color)] hover:bg-[var(--bg-card-muted)]"
                        }`}
                      >
                        <FileText className="h-3.5 w-3.5" />
                        <span>{file.name}</span>
                        <span className="text-[10px] opacity-70">({Math.round(file.size / 1024 * 10) / 10}KB)</span>
                      </button>
                    ))}
                  </div>

                  {/* Active file preview box */}
                  <div className="mt-4 overflow-hidden rounded-2xl border border-[var(--code-border)] bg-[var(--code-bg)] p-4 font-mono text-xs text-[var(--code-text)] max-h-60 overflow-y-auto">
                    <pre><code>{code}</code></pre>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Error notification if any */}
          {errorMessage && (
            <div className="mt-4 rounded-xl bg-rose-950/40 border border-rose-800/80 p-3 text-xs text-rose-300">
              {errorMessage}
            </div>
          )}

          {/* Action Bar */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-5 border-t border-[var(--border-subtle)]">
            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
              <DuckAvatar size="sm" state="idle" />
              <span>The Duck will check correctness, performance, safety, and readability.</span>
            </div>

            <button
              type="button"
              onClick={handleEvaluate}
              disabled={evaluating}
              className="primary-button w-full sm:w-auto !py-3 !px-7 font-bold flex items-center justify-center gap-2.5 disabled:opacity-50"
            >
              <DuckAvatar size="sm" state={evaluating ? "thinking" : "idle"} />
              <span>{evaluating ? "Duck is Evaluating..." : "Evaluate with Duck 🦆"}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Evaluation Results Card */}
      {result && (
        <section className="space-y-6 animate-fadeIn">
          {/* Duck's Honest Verdict Hero */}
          <div className="rounded-[28px] border border-[var(--border-color)] bg-[var(--bg-card)] p-7 sm:p-9 shadow-sm">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-[var(--border-subtle)]">
              <div className="flex items-start gap-4">
                <DuckAvatar size="lg" state="speaking" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#D97706]">
                      Duck's Honest Verdict
                    </span>
                    <span className="rounded-full bg-[#F4C84B]/20 border border-[#F4C84B]/50 px-2.5 py-0.5 text-xs font-bold text-[#D97706]">
                      {result.overallRating}
                    </span>
                  </div>
                  <h2 className="mt-1 text-2xl font-bold text-[var(--text-main)]">
                    {result.duckGreeting}
                  </h2>
                  <p className="mt-2 text-sm text-[var(--text-muted)] leading-relaxed">
                    {result.summary}
                  </p>
                </div>
              </div>

              {/* Score Badge */}
              <div className="evaluator-score-card flex items-center gap-4 bg-[var(--bg-card-subtle)] px-6 py-4 rounded-2xl border border-[var(--border-color)] flex-none shadow-xs">
                <div className="text-right">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] block">
                    Code Health Score
                  </span>
                  <div className="flex items-baseline justify-end gap-1.5 mt-0.5">
                    <span className="evaluator-score-number text-3xl sm:text-4xl font-black text-[var(--text-main)]">
                      {result.score}
                    </span>
                    <span className="text-sm font-bold text-[var(--text-muted)]">/ 100</span>
                  </div>
                </div>
                <div
                  className={`evaluator-grade-badge h-12 w-12 rounded-2xl flex items-center justify-center font-black text-xl border shadow-xs ${
                    result.score >= 85
                      ? "grade-badge-high bg-emerald-50 text-emerald-800 border-emerald-300"
                      : result.score >= 70
                      ? "grade-badge-mid bg-amber-50 text-amber-800 border-amber-300"
                      : "grade-badge-low bg-rose-50 text-rose-800 border-rose-300"
                  }`}
                >
                  {result.score >= 90 ? "A" : result.score >= 80 ? "B" : result.score >= 70 ? "C" : "D"}
                </div>
              </div>
            </div>

            {/* Strengths & Critical Feedback Grid */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Strengths */}
              <div className="evaluator-strengths-card rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5">
                <h3 className="text-sm font-bold text-emerald-800 flex items-center gap-2 mb-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>What Works Well</span>
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-emerald-900">
                  {result.strengths.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="font-bold text-emerald-700">✓</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actionable Improvements */}
              <div className="evaluator-improvements-card rounded-2xl border border-amber-200 bg-amber-50/70 p-5">
                <h3 className="text-sm font-bold text-amber-800 flex items-center gap-2 mb-3">
                  <Lightbulb className="h-4 w-4 text-amber-600" />
                  <span>How to Improve This Code</span>
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-amber-900">
                  {result.improvements.map((imp, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="font-bold text-amber-700">•</span>
                      <span>{imp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Line-by-Line Issues & Warnings */}
            {result.issues && result.issues.length > 0 && (
              <div className="mt-8 space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  Specific Issues & Code Smells Detected ({result.issues.length}):
                </h3>
                <div className="grid gap-3">
                  {result.issues.map((issue, idx) => (
                    <div
                      key={idx}
                      className={`evaluator-issue-card rounded-2xl border p-4.5 flex flex-col sm:flex-row sm:items-start justify-between gap-3 ${
                        issue.severity === "critical"
                          ? "evaluator-issue-critical bg-rose-50/70 border-rose-200 text-rose-950"
                          : issue.severity === "warning"
                          ? "evaluator-issue-warning bg-amber-50/70 border-amber-200 text-amber-950"
                          : "evaluator-issue-suggestion bg-blue-50/70 border-blue-200 text-blue-950"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {issue.severity === "critical" ? (
                          <AlertOctagon className="h-5 w-5 flex-none text-rose-600 mt-0.5" />
                        ) : issue.severity === "warning" ? (
                          <AlertTriangle className="h-5 w-5 flex-none text-amber-600 mt-0.5" />
                        ) : (
                          <Info className="h-5 w-5 flex-none text-blue-600 mt-0.5" />
                        )}
                        <div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                                issue.severity === "critical"
                                  ? "badge-critical bg-rose-100 text-rose-800 border-rose-300"
                                  : issue.severity === "warning"
                                  ? "badge-warning bg-amber-100 text-amber-800 border-amber-300"
                                  : "badge-suggestion bg-blue-100 text-blue-800 border-blue-300"
                              }`}
                            >
                              {issue.severity}
                            </span>
                            {issue.line && (
                              <span className="text-xs font-mono opacity-75">
                                Line: {issue.line}
                              </span>
                            )}
                          </div>
                          <p className="mt-1.5 text-sm font-bold issue-description">
                            {issue.description}
                          </p>
                          <p className="mt-1 text-xs opacity-90 issue-recommendation">
                            <b>Recommendation:</b> {issue.recommendation}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Refactored & Improved Code Block */}
            <div className="mt-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-[var(--text-main)]">
                    Refactored Version by Professor Quackers:
                  </span>
                  <span className="text-xs text-[var(--text-muted)]">
                    (Optimized, idiomatic & safer)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyImprovedCode}
                    className="flex items-center gap-1.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] px-3.5 py-1.5 text-xs font-bold text-[var(--text-main)] hover:bg-[var(--bg-card-subtle)] transition"
                  >
                    {copiedImproved ? <Check className="h-3.5 w-3.5 text-[#3D7A55]" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copiedImproved ? "Copied!" : "Copy Improved Code"}</span>
                  </button>

                  {onOpenInPlayground && (
                    <button
                      type="button"
                      onClick={handleLaunchInPlayground}
                      className="primary-button !py-1.5 !px-4 text-xs font-bold flex items-center gap-1.5"
                    >
                      <Play className="h-3 w-3 fill-current" />
                      <span>Run in Practice</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-[var(--code-border)] bg-[var(--code-bg)]">
                <div className="flex items-center justify-between border-b border-[#2C332B] px-4 py-2 bg-[#121512] text-xs font-mono text-[#8C9387]">
                  <span>refactored_{filename}</span>
                  <span className="text-[11px] text-[#F4C84B]">Duck Approved ✓</span>
                </div>
                <pre className="overflow-x-auto p-5 font-mono text-xs sm:text-[13px] leading-relaxed text-[var(--code-text)]">
                  <code>{result.improvedCode}</code>
                </pre>
              </div>
            </div>

            {/* Duck Wisdom Footer Box */}
            <div className="evaluator-wisdom-card mt-8 rounded-2xl border border-amber-300 bg-amber-50/80 p-5 flex items-start gap-4">
              <DuckAvatar size="sm" state="speaking" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-amber-800">
                  Duck Wisdom of the Day
                </p>
                <p className="mt-1 text-sm font-medium italic text-amber-950">
                  “{result.duckWisdom}”
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
