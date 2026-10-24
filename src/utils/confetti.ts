import confetti from "canvas-confetti";

// CodeXP Brand Palette
const BRAND_COLORS = ["#F4C84B", "#3D7A55", "#8CC8AC", "#F19B78", "#9CAFEF", "#20251F"];
const STREAK_FLAME_COLORS = ["#F4C84B", "#D97706", "#FF8533", "#FF4500", "#FFD700"];

/**
 * Triggers a joyful confetti blast when a user successfully passes a lesson.
 */
export function triggerLessonSuccessConfetti() {
  // Center blast
  confetti({
    particleCount: 65,
    spread: 70,
    origin: { y: 0.62 },
    colors: BRAND_COLORS,
    disableForReducedMotion: true,
  });

  // Staggered side fireworks
  setTimeout(() => {
    confetti({
      particleCount: 35,
      angle: 60,
      spread: 55,
      origin: { x: 0.05, y: 0.7 },
      colors: BRAND_COLORS,
      disableForReducedMotion: true,
    });
    confetti({
      particleCount: 35,
      angle: 120,
      spread: 55,
      origin: { x: 0.95, y: 0.7 },
      colors: BRAND_COLORS,
      disableForReducedMotion: true,
    });
  }, 120);
}

/**
 * Triggers a spectacular multi-burst firework show when a user achieves a daily streak or milestone.
 */
export function triggerStreakMilestoneConfetti(streakCount: number) {
  // Huge center pop
  confetti({
    particleCount: 100,
    spread: 100,
    origin: { y: 0.5 },
    colors: STREAK_FLAME_COLORS,
    disableForReducedMotion: true,
  });

  // Sustained celebration for 1.2 seconds
  const duration = 1200;
  const animationEnd = Date.now() + duration;

  const interval: any = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 25 * (timeLeft / duration);

    confetti({
      particleCount,
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      origin: {
        x: Math.random() * 0.6 + 0.2,
        y: Math.random() * 0.4 + 0.2,
      },
      colors: STREAK_FLAME_COLORS,
      disableForReducedMotion: true,
    });
  }, 200);
}
