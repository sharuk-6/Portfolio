/**
 * Pure calculation logic for Hold Button progress and trigger thresholds
 */

export interface HoldState {
  progress: number;      // 0 to 1
  isHolding: boolean;
  isCompleted: boolean;
}

/**
 * Calculates updated hold progress based on elapsed time vs total required hold duration.
 * 
 * @param elapsedMs - Milliseconds held so far
 * @param requiredDurationMs - Total duration required for confirmation (e.g. 1200ms)
 */
export function calculateHoldProgress(
  elapsedMs: number,
  requiredDurationMs: number = 1200
): { progress: number; isComplete: boolean } {
  if (requiredDurationMs <= 0) {
    return { progress: 1, isComplete: true };
  }
  const ratio = Math.max(0, Math.min(1, elapsedMs / requiredDurationMs));
  return {
    progress: Math.round(ratio * 1000) / 1000,
    isComplete: ratio >= 1
  };
}

/**
 * Calculates SVG stroke dashoffset for a circular progress ring.
 * 
 * @param progress - 0 to 1
 * @param radius - circle radius in px
 */
export function calculateCircleDashOffset(progress: number, radius: number = 16): number {
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(1, progress));
  return circumference * (1 - clamped);
}
