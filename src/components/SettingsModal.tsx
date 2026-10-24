import { useState, useRef, useEffect } from "react";
import {
  Settings,
  X,
  Sun,
  Moon,
  CloudMoon,
  Flame,
  Sliders,
  Check,
  LogOut,
  Compass,
  User,
  ShieldCheck,
  Mail,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { User as FirebaseUser } from "firebase/auth";
import { ThemeMode } from "../types/gamification";
import { Language } from "../types";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: FirebaseUser | null;
  onSignOut: () => void;
  onChangePath: () => void;
  selectedLanguages: Language[];
  activeLanguage: Language;
  themeMode: ThemeMode;
  brightness: number;
  onModeChange: (mode: ThemeMode) => void;
  onBrightnessChange: (brightness: number) => void;
}

export function SettingsModal({
  isOpen,
  onClose,
  currentUser,
  onSignOut,
  onChangePath,
  selectedLanguages,
  activeLanguage,
  themeMode,
  brightness,
  onModeChange,
  onBrightnessChange,
}: SettingsModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const themes: {
    id: ThemeMode;
    label: string;
    sublabel: string;
    icon: typeof Sun;
    previewBg: string;
    previewBorder: string;
    tag?: string;
  }[] = [
    {
      id: "light",
      label: "Light",
      sublabel: "Crisp paper & clean contrast",
      icon: Sun,
      previewBg: "bg-[#F7F5EF]",
      previewBorder: "border-[#DDE0D9]",
    },
    {
      id: "dim",
      label: "Dim",
      sublabel: "Muted slate for soft focus",
      icon: CloudMoon,
      previewBg: "bg-[#1E232A]",
      previewBorder: "border-[#3A4452]",
    },
    {
      id: "dark",
      label: "Dark",
      sublabel: "Deep obsidian for night focus",
      icon: Moon,
      previewBg: "bg-[#0F1115]",
      previewBorder: "border-[#28303E]",
    },
    {
      id: "night",
      label: "Night",
      sublabel: "Warm amber, zero blue-light",
      icon: Flame,
      previewBg: "bg-[#1D1812]",
      previewBorder: "border-[#4A3C2D]",
      tag: "Eye comfort",
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-modal-title"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-lg rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 sm:p-7 shadow-2xl text-[var(--text-main)] animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-5 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[var(--bg-card-subtle)] text-[#F4C84B] border border-[var(--border-color)]">
              <Settings className="h-5 w-5" />
            </div>
            <div>
              <h2 id="settings-modal-title" className="text-xl font-bold tracking-tight">
                Settings
              </h2>
              <p className="text-xs text-[var(--text-muted)]">
                Preferences, display themes & account
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[var(--text-light)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card-subtle)] transition"
            aria-label="Close settings"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 space-y-6 max-h-[75vh] overflow-y-auto pr-1">
          {/* SECTION 1: LOGIN INFO & ACCOUNT */}
          <section className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card-subtle)] p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-[var(--text-light)]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  Login & Account Info
                </span>
              </div>
              {currentUser?.emailVerified && (
                <span className="flex items-center gap-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 text-[10px] font-bold">
                  <ShieldCheck className="h-3 w-3 text-emerald-600" />
                  <span>Verified</span>
                </span>
              )}
            </div>

            {currentUser ? (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="grid h-11 w-11 flex-none place-items-center rounded-2xl bg-[#20251F] text-[#F4C84B] font-bold text-sm border border-[var(--border-color)]">
                    {currentUser.email ? currentUser.email.charAt(0).toUpperCase() : "U"}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-[var(--text-main)] truncate">
                      {currentUser.displayName || currentUser.email}
                    </p>
                    <p className="text-xs text-[var(--text-muted)] flex items-center gap-1 truncate">
                      <Mail className="h-3 w-3 flex-none" />
                      <span>{currentUser.email}</span>
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    onSignOut();
                  }}
                  className="flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border border-rose-300 bg-rose-50 text-rose-700 hover:bg-rose-100 transition flex-none"
                  title="Sign out of CodeXP"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Log Out</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold">Guest Learner</p>
                  <p className="text-xs text-[var(--text-muted)]">
                    Your streak, badges, and learning progress are stored in this browser.
                  </p>
                </div>
              </div>
            )}
          </section>

          {/* SECTION 2: THEMES & BRIGHTNESS MODES */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sun className="h-4 w-4 text-[#F4C84B]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  Themes & Brightness Modes
                </span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-light)]">
                Real-time
              </span>
            </div>

            {/* Theme 4-mode Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              {themes.map((t) => {
                const Icon = t.icon;
                const isSelected = themeMode === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => onModeChange(t.id)}
                    className={`flex flex-col p-3 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? "border-[#F4C84B] ring-2 ring-[#F4C84B]/30 bg-[var(--bg-card-subtle)] shadow-sm"
                        : "border-[var(--border-color)] hover:border-[var(--text-light)] bg-[var(--bg-card)]"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-5 w-5 rounded-full border ${t.previewBg} ${t.previewBorder} flex items-center justify-center`}
                        >
                          <Icon className="h-3 w-3 text-[#F4C84B]" />
                        </div>
                        <span className="text-xs font-bold text-[var(--text-main)]">
                          {t.label}
                        </span>
                      </div>
                      {isSelected && <Check className="h-3.5 w-3.5 text-[#3D7A55]" />}
                    </div>
                    <span className="mt-1.5 text-[11px] leading-tight text-[var(--text-muted)]">
                      {t.sublabel}
                    </span>
                    {t.tag && (
                      <span className="mt-2 inline-block w-fit text-[9px] font-extrabold uppercase tracking-wider bg-[#F4C84B]/20 text-[#D97706] px-1.5 py-0.5 rounded">
                        {t.tag}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Brightness Slider */}
            <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card-subtle)] p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-main)]">
                  <Sliders className="h-3.5 w-3.5 text-[var(--text-light)]" />
                  <span>Fine-tune Screen Brightness</span>
                </div>
                <span className="text-xs font-mono font-bold text-[#D97706] bg-[#FFF0C7] px-2.5 py-0.5 rounded-full border border-[#F6DC9A]">
                  {brightness}%
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="100"
                step="5"
                value={brightness}
                onChange={(e) => onBrightnessChange(Number(e.target.value))}
                aria-label="Fine-tune screen brightness slider"
                className="w-full h-2 bg-[var(--border-color)] rounded-lg appearance-none cursor-pointer accent-[#D97706]"
              />
              <div className="flex justify-between text-[10px] text-[var(--text-light)] mt-1.5 font-mono">
                <span>50% (Comfort)</span>
                <span>75%</span>
                <span>100% (Full)</span>
              </div>
            </div>
          </section>

          {/* SECTION 3: CHANGE LEARNING PATH */}
          <section className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card-subtle)] p-4 sm:p-5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Compass className="h-4 w-4 text-[#3D7A55]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  Learning Path
                </span>
              </div>
              <span className="text-xs font-bold text-[#3D7A55]">
                Active: {activeLanguage}
              </span>
            </div>

            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Want to switch to a different programming language or update your experience level?
            </p>

            <button
              onClick={() => {
                onClose();
                onChangePath();
              }}
              className="mt-3.5 w-full flex items-center justify-between px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-xs font-bold text-[var(--text-main)] hover:bg-[var(--bg-card-subtle)] hover:border-[#3D7A55] transition shadow-sm"
            >
              <div className="flex items-center gap-2">
                <span className="grid h-6 w-6 place-items-center rounded-lg bg-[#DDEDE3] text-[#356146] font-bold text-[10px]">
                  {activeLanguage.slice(0, 2)}
                </span>
                <span>Change Learning Path / Languages</span>
              </div>
              <ChevronRight className="h-4 w-4 text-[var(--text-light)]" />
            </button>
          </section>
        </div>

        {/* Modal Footer */}
        <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-end">
          <button
            onClick={onClose}
            className="primary-button !py-2.5 !px-6 text-xs font-bold"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
