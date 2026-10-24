export function getLocalDateString(d: Date = new Date()): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getYesterdayDateString(): string {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return getLocalDateString(yesterday);
}

export interface StreakStatus {
  currentStreak: number;
  isCompletedToday: boolean;
  isAtRisk: boolean;
  lastActiveDate?: string;
  activeDates: string[];
}

export function evaluateStreak(
  savedStreak: number = 0,
  lastActiveDate?: string,
  activeDates: string[] = []
): StreakStatus {
  if (!lastActiveDate) {
    return {
      currentStreak: 0,
      isCompletedToday: false,
      isAtRisk: false,
      lastActiveDate: undefined,
      activeDates,
    };
  }

  const today = getLocalDateString();
  const yesterday = getYesterdayDateString();

  if (lastActiveDate === today) {
    return {
      currentStreak: Math.max(1, savedStreak),
      isCompletedToday: true,
      isAtRisk: false,
      lastActiveDate,
      activeDates,
    };
  }

  if (lastActiveDate === yesterday) {
    return {
      currentStreak: Math.max(1, savedStreak),
      isCompletedToday: false,
      isAtRisk: true,
      lastActiveDate,
      activeDates,
    };
  }

  // Last active date was more than 1 day ago -> Streak has reset
  return {
    currentStreak: 0,
    isCompletedToday: false,
    isAtRisk: false,
    lastActiveDate,
    activeDates,
  };
}

export function recordLessonCompletionStreak(
  savedStreak: number = 0,
  lastActiveDate?: string,
  activeDates: string[] = []
): {
  newStreak: number;
  newLastActiveDate: string;
  updatedActiveDates: string[];
  streakIncreased: boolean;
} {
  const today = getLocalDateString();
  const yesterday = getYesterdayDateString();

  if (lastActiveDate === today) {
    // Already finished a lesson today; streak holds
    return {
      newStreak: Math.max(1, savedStreak),
      newLastActiveDate: today,
      updatedActiveDates: activeDates.includes(today) ? activeDates : [...activeDates, today],
      streakIncreased: false,
    };
  }

  if (lastActiveDate === yesterday) {
    // Consecutive day completion!
    const newStreak = Math.max(1, savedStreak) + 1;
    return {
      newStreak,
      newLastActiveDate: today,
      updatedActiveDates: activeDates.includes(today) ? activeDates : [...activeDates, today],
      streakIncreased: true,
    };
  }

  // First day or streak lapsed
  return {
    newStreak: 1,
    newLastActiveDate: today,
    updatedActiveDates: activeDates.includes(today) ? activeDates : [...activeDates, today],
    streakIncreased: true,
  };
}

export function getLast7DaysStatus(activeDates: string[] = []): { dayLabel: string; dateStr: string; completed: boolean }[] {
  const result = [];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = getLocalDateString(d);
    const dayLabel = i === 0 ? "Today" : dayNames[d.getDay()];
    result.push({
      dayLabel,
      dateStr,
      completed: activeDates.includes(dateStr),
    });
  }

  return result;
}
