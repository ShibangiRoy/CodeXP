import { useState, useRef, useEffect } from "react";
import { Sun, Moon, CloudMoon, Flame, Sliders, Check } from "lucide-react";
import { ThemeMode } from "../types/gamification";

interface ThemeControllerProps {
  mode: ThemeMode;
  brightness: number;
  onModeChange: (mode: ThemeMode) => void;
  onBrightnessChange: (brightness: number) => void;
}

export function ThemeController({
  mode,
  brightness,
  onModeChange,
  onBrightnessChange,
}: ThemeControllerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

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
      sublabel: "Deep obsidian for night work",
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

  const CurrentIcon =
    mode === "light"
      ? Sun
      : mode === "dim"
      ? CloudMoon
      : mode === "dark"
      ? Moon
      : Flame;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-main)] hover:bg-[var(--bg-card-subtle)] transition shadow-sm"
        title="Brightness & Theme Modes (Light, Dim, Dark, Night)"
        aria-label="Toggle Brightness & Theme Modes"
      >
        <CurrentIcon className="h-4 w-4 text-[#F4C84B]" />
        <span className="hidden sm:inline text-xs font-bold capitalize">{mode}</span>
        <span className="text-[11px] font-semibold text-[var(--text-light)]">
          {brightness}%
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-4 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
            <div className="flex items-center gap-2">
              <CurrentIcon className="h-4 w-4 text-[#F4C84B]" />
              <span className="text-sm font-bold text-[var(--text-main)]">
                Display & Themes
              </span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-light)]">
              Real-time
            </span>
          </div>

          {/* Theme selection buttons */}
          <div className="mt-3 grid grid-cols-2 gap-2">
            {themes.map((t) => {
              const Icon = t.icon;
              const isSelected = mode === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => onModeChange(t.id)}
                  className={`flex flex-col p-2.5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? "border-[#F4C84B] ring-2 ring-[#F4C84B]/30 bg-[var(--bg-card-subtle)]"
                      : "border-[var(--border-color)] hover:border-[var(--text-light)] bg-[var(--bg-card)]"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-1.5">
                      <div
                        className={`h-4 w-4 rounded-full border ${t.previewBg} ${t.previewBorder} flex items-center justify-center`}
                      >
                        <Icon className="h-2.5 w-2.5 text-[#F4C84B]" />
                      </div>
                      <span className="text-xs font-bold text-[var(--text-main)]">
                        {t.label}
                      </span>
                    </div>
                    {isSelected && <Check className="h-3.5 w-3.5 text-[#3D7A55]" />}
                  </div>
                  <span className="mt-1 text-[10px] leading-tight text-[var(--text-muted)]">
                    {t.sublabel}
                  </span>
                  {t.tag && (
                    <span className="mt-1.5 inline-block w-fit text-[9px] font-extrabold uppercase tracking-wider bg-[#F4C84B]/20 text-[#D97706] px-1.5 py-0.5 rounded">
                      {t.tag}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Brightness Slider */}
          <div className="mt-4 pt-3 border-t border-[var(--border-subtle)]">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--text-main)]">
                <Sliders className="h-3.5 w-3.5 text-[#657067]" />
                <span>Fine-tune Brightness</span>
              </div>
              <span className="text-xs font-mono font-bold text-[#D97706] bg-[#FFF0C7] px-2 py-0.5 rounded-full">
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
              aria-label="Fine-tune Brightness slider"
              className="w-full h-2 bg-[#DDE0D9] rounded-lg appearance-none cursor-pointer accent-[#D97706]"
            />
            <div className="flex justify-between text-[10px] text-[var(--text-light)] mt-1 font-mono">
              <span>50% (Comfort)</span>
              <span>75%</span>
              <span>100% (Full)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
