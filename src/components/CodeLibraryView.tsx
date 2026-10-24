import { useState, useMemo } from "react";
import { CodeSnippet, Language, Lesson } from "../types";
import { codeLibraryData } from "../data/codeLibrary";
import { Search, Copy, Check, Play, BookOpen, Terminal, Sparkles, Filter } from "lucide-react";

interface CodeLibraryViewProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  availableLanguages: Language[];
  onOpenInPlayground: (lesson: Lesson) => void;
}

const CATEGORIES = ["All", "Basics & I/O", "Data Structures", "Control Flow", "Functions", "Algorithms"] as const;

export function CodeLibraryView({
  language,
  onLanguageChange,
  availableLanguages,
  onOpenInPlayground,
}: CodeLibraryViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const snippets = codeLibraryData[language] || [];

  const filteredSnippets = useMemo(() => {
    return snippets.filter((s) => {
      const matchesCategory = selectedCategory === "All" || s.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;
      const matchesText =
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.code.toLowerCase().includes(q) ||
        s.tags.some((tag) => tag.toLowerCase().includes(q));
      return matchesCategory && matchesText;
    });
  }, [snippets, searchQuery, selectedCategory]);

  const handleCopy = (snippet: CodeSnippet) => {
    navigator.clipboard.writeText(snippet.code);
    setCopiedId(snippet.id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const handleLaunchSnippet = (snippet: CodeSnippet) => {
    const virtualLesson: Lesson = {
      id: snippet.id,
      number: "LIB",
      level: 1,
      duration: "5 min",
      title: snippet.title,
      intro: snippet.description,
      code: snippet.code,
      hint: `Try tweaking this ${language} snippet and run it in the terminal.`,
      expectedOutput: snippet.outputPreview,
      tags: snippet.tags,
    };
    onOpenInPlayground(virtualLesson);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <section className="rounded-[28px] border border-[#DDE0D9] bg-white p-7 sm:p-10 shadow-[0_2px_0_rgba(32,37,31,.04)]">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[#4B7A5C]">
              <BookOpen className="h-4 w-4" />
              <span>Reference & Cheatsheet</span>
            </div>
            <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl text-[#20251F]">
              {language} Code Library
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#656A63]">
              Instant access to core patterns, idiomatic syntax, data structures, and algorithms. Copy directly or launch into interactive practice.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-[#F5F6F2] px-5 py-3.5 rounded-2xl border border-[#E5E7E2]">
            <Sparkles className="h-5 w-5 text-[#C48F14]" />
            <div>
              <p className="text-xs font-bold text-[#71766F] uppercase tracking-wider">Snippets Available</p>
              <p className="text-xl font-bold text-[#20251F]">{snippets.length} Tested Recipes</p>
            </div>
          </div>
        </div>

        {/* Language selector chips if user enrolled in multiple */}
        {availableLanguages.length > 1 && (
          <div className="mt-8 pt-6 border-t border-[#EAECE6] flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#797F77] mr-2">Language:</span>
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

      {/* Search & Category Filter Controls */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8C9388]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${language} snippets, methods, patterns, or tags...`}
              className="w-full rounded-2xl border border-[#D9DCD5] bg-white py-3.5 pl-11 pr-4 text-sm text-[#20251F] shadow-sm outline-none transition focus:border-[#20251F] focus:ring-1 focus:ring-[#20251F]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#7E857B] hover:text-[#20251F]"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <Filter className="h-3.5 w-3.5 text-[#797F77] flex-none mr-1" />
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex-none rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
                  isSelected
                    ? "bg-[#20251F] text-white shadow-sm"
                    : "bg-white text-[#5B6258] border border-[#DEE1DA] hover:bg-[#F2F4EF]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* Snippet Grid */}
      <section>
        {filteredSnippets.length === 0 ? (
          <div className="rounded-[24px] border border-dashed border-[#D5D8D0] bg-white p-12 text-center">
            <BookOpen className="mx-auto h-8 w-8 text-[#A0A79C]" />
            <h3 className="mt-3 text-lg font-bold text-[#20251F]">No snippets matched your query</h3>
            <p className="mt-1 text-sm text-[#72786F]">Try searching another keyword or resetting the category filter.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="secondary-button mt-4 !py-2 !px-4 text-xs"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5">
            {filteredSnippets.map((snippet) => {
              const isCopied = copiedId === snippet.id;
              return (
                <article
                  key={snippet.id}
                  className="rounded-[24px] border border-[#DDE0D9] bg-white p-6 shadow-[0_2px_0_rgba(32,37,31,.04)] transition-all hover:border-[#B5B9B0]"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="rounded-lg bg-[#EAEFEA] px-2.5 py-1 text-[11px] font-bold text-[#2F6542]">
                          {snippet.category}
                        </span>
                        <span className="text-xs text-[#82887E]">· {snippet.language}</span>
                      </div>
                      <h3 className="mt-2 text-lg font-bold text-[#20251F] tracking-tight">
                        {snippet.title}
                      </h3>
                      <p className="mt-1 text-xs sm:text-sm text-[#666B64]">
                        {snippet.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto flex-none">
                      <button
                        type="button"
                        onClick={() => handleCopy(snippet)}
                        className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-bold transition-all ${
                          isCopied
                            ? "border-[#3D7A55] bg-[#E9F3ED] text-[#2C6340]"
                            : "border-[#D7DAD3] bg-white text-[#3B4239] hover:bg-[#F5F6F2]"
                        }`}
                        title="Copy code to clipboard"
                      >
                        {isCopied ? <Check className="h-3.5 w-3.5 text-[#3D7A55]" /> : <Copy className="h-3.5 w-3.5" />}
                        <span>{isCopied ? "Copied!" : "Copy Code"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleLaunchSnippet(snippet)}
                        className="flex items-center gap-1.5 rounded-xl bg-[#20251F] px-3.5 py-2 text-xs font-bold text-white transition hover:bg-[#344036]"
                        title="Open and run in Playground"
                      >
                        <Play className="h-3 w-3 fill-white" />
                        <span>Run Snippet</span>
                      </button>
                    </div>
                  </div>

                  {/* Code Box */}
                  <div className="relative overflow-hidden rounded-xl border border-[#343B33] bg-[#191D19]">
                    <div className="flex items-center justify-between border-b border-[#2A3129] px-4 py-2 bg-[#141714]">
                      <span className="font-mono text-[11px] text-[#868F83]">{snippet.language.toLowerCase()}-snippet</span>
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-[#3D453C]" />
                        <span className="h-2 w-2 rounded-full bg-[#3D453C]" />
                        <span className="h-2 w-2 rounded-full bg-[#3D453C]" />
                      </div>
                    </div>
                    <pre className="overflow-x-auto p-4 font-mono text-xs sm:text-[13px] text-[#F1D475] leading-relaxed">
                      <code>{snippet.code}</code>
                    </pre>
                  </div>

                  {/* Output Preview & Tags */}
                  <div className="mt-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                    <div className="flex items-center gap-2 font-mono text-xs text-[#526658] bg-[#F1F6F2] px-3 py-1.5 rounded-lg border border-[#E0ECE2] overflow-x-auto">
                      <Terminal className="h-3.5 w-3.5 text-[#427A56] flex-none" />
                      <span className="text-[#849488] font-bold">$</span>
                      <span className="whitespace-pre">{snippet.outputPreview}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5">
                      {snippet.tags.map((t) => (
                        <span key={t} className="rounded-md bg-[#F4F5F1] px-2 py-0.5 text-[10px] font-semibold text-[#666C63]">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
