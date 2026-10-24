import { ThemeMode } from "../types/gamification";

export const THEME_STORAGE_KEY = "codexp_theme_mode";
export const BRIGHTNESS_STORAGE_KEY = "codexp_brightness";

export const THEME_MODES: ThemeMode[] = ["light", "dim", "dark", "night"];

export interface ThemeColors {
  bgApp: string;
  bgCard: string;
  bgCardSubtle: string;
  bgCardMuted: string;
  bgHeader: string;
  borderColor: string;
  borderSubtle: string;
  textMain: string;
  textMuted: string;
  textLight: string;
  accentPrimary: string;
  accentPrimaryText: string;
  accentGold: string;
  codeBg: string;
  codeBorder: string;
  codeText: string;
}

export const THEME_CONFIG: Record<ThemeMode, ThemeColors> = {
  light: {
    bgApp: "#f7f5ef",
    bgCard: "#ffffff",
    bgCardSubtle: "#f0f4ef",
    bgCardMuted: "#e6eae3",
    bgHeader: "rgba(255, 255, 255, 0.95)",
    borderColor: "#dedfd9",
    borderSubtle: "#eaebe5",
    textMain: "#20251f",
    textMuted: "#656a63",
    textLight: "#767b74",
    accentPrimary: "#20251f",
    accentPrimaryText: "#ffffff",
    accentGold: "#f4c84b",
    codeBg: "#181c18",
    codeBorder: "#3a4039",
    codeText: "#f1d475",
  },
  dim: {
    bgApp: "#181d24",
    bgCard: "#22272e",
    bgCardSubtle: "#2d333b",
    bgCardMuted: "#373e47",
    bgHeader: "rgba(34, 39, 46, 0.95)",
    borderColor: "#373e47",
    borderSubtle: "#2d333b",
    textMain: "#f0f6fc",
    textMuted: "#9da7b3",
    textLight: "#768390",
    accentPrimary: "#f4c84b",
    accentPrimaryText: "#161b22",
    accentGold: "#f4c84b",
    codeBg: "#161a20",
    codeBorder: "#2d333b",
    codeText: "#e6edf3",
  },
  dark: {
    bgApp: "#0d1117",
    bgCard: "#161b22",
    bgCardSubtle: "#21262d",
    bgCardMuted: "#30363d",
    bgHeader: "rgba(22, 27, 34, 0.95)",
    borderColor: "#30363d",
    borderSubtle: "#21262d",
    textMain: "#f0f6fc",
    textMuted: "#8b949e",
    textLight: "#6e7681",
    accentPrimary: "#f4c84b",
    accentPrimaryText: "#0d1117",
    accentGold: "#f4c84b",
    codeBg: "#090c10",
    codeBorder: "#21262d",
    codeText: "#f0f6fc",
  },
  night: {
    bgApp: "#1a140e",
    bgCard: "#251d15",
    bgCardSubtle: "#33271d",
    bgCardMuted: "#423326",
    bgHeader: "rgba(37, 29, 21, 0.95)",
    borderColor: "#4a3928",
    borderSubtle: "#3a2d1f",
    textMain: "#fde8cf",
    textMuted: "#cbb296",
    textLight: "#9d856d",
    accentPrimary: "#e6a74b",
    accentPrimaryText: "#1a140e",
    accentGold: "#e6a74b",
    codeBg: "#15100b",
    codeBorder: "#3d2e20",
    codeText: "#fed9a6",
  },
};

export function getStoredThemeMode(): ThemeMode {
  if (typeof window === "undefined") return "light";
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode;
    if (saved && THEME_MODES.includes(saved)) {
      return saved;
    }
  } catch (e) {
    console.warn("Unable to read stored theme:", e);
  }
  return "light";
}

export function getStoredBrightness(): number {
  if (typeof window === "undefined") return 100;
  try {
    const saved = localStorage.getItem(BRIGHTNESS_STORAGE_KEY);
    if (saved) {
      const val = Number(saved);
      if (!isNaN(val) && val >= 50 && val <= 100) {
        return val;
      }
    }
  } catch (e) {
    console.warn("Unable to read stored brightness:", e);
  }
  return 100;
}

/**
 * Synchronously applies document classes, data-theme attributes,
 * and CSS custom property tokens to document.documentElement and document.body.
 */
export function applyTheme(mode: ThemeMode, brightness: number): void {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  const body = document.body;

  // 1. Re-apply document classes to html and body
  THEME_MODES.forEach((m) => {
    root.classList.remove(`theme-${m}`);
    if (body) body.classList.remove(`theme-${m}`);
  });
  root.classList.add(`theme-${mode}`);
  if (body) body.classList.add(`theme-${mode}`);

  // 2. Data attributes for declarative theme query matching
  root.setAttribute("data-theme", mode);
  if (body) body.setAttribute("data-theme", mode);

  // 3. Re-apply CSS variables for theme tokens directly on documentElement
  const tokens = THEME_CONFIG[mode] || THEME_CONFIG.light;
  root.style.setProperty("--bg-app", tokens.bgApp);
  root.style.setProperty("--bg-card", tokens.bgCard);
  root.style.setProperty("--bg-card-subtle", tokens.bgCardSubtle);
  root.style.setProperty("--bg-card-muted", tokens.bgCardMuted);
  root.style.setProperty("--bg-header", tokens.bgHeader);
  root.style.setProperty("--border-color", tokens.borderColor);
  root.style.setProperty("--border-subtle", tokens.borderSubtle);
  root.style.setProperty("--text-main", tokens.textMain);
  root.style.setProperty("--text-muted", tokens.textMuted);
  root.style.setProperty("--text-light", tokens.textLight);
  root.style.setProperty("--accent-primary", tokens.accentPrimary);
  root.style.setProperty("--accent-primary-text", tokens.accentPrimaryText);
  root.style.setProperty("--accent-gold", tokens.accentGold);
  root.style.setProperty("--code-bg", tokens.codeBg);
  root.style.setProperty("--code-border", tokens.codeBorder);
  root.style.setProperty("--code-text", tokens.codeText);

  // 4. Re-apply CSS variables for screen brightness
  const clampedBrightness = Math.min(100, Math.max(50, brightness || 100));
  const dimOpacity = Math.max(0, (100 - clampedBrightness) * 0.009);

  root.style.setProperty("--screen-brightness", `${clampedBrightness}%`);
  root.style.setProperty("--screen-dim-opacity", `${dimOpacity}`);
  root.style.setProperty("--brightness-level", `${clampedBrightness / 100}`);

  // 5. Persist to localStorage
  try {
    localStorage.setItem(THEME_STORAGE_KEY, mode);
    localStorage.setItem(BRIGHTNESS_STORAGE_KEY, String(clampedBrightness));
  } catch (e) {
    console.warn("Unable to save theme to localStorage:", e);
  }
}
