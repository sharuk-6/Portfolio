/**
 * Pure calculation logic for ReactBits Slide Commit micro-interaction
 */

export interface SlideState {
  ratio: number;       // 0 to 1
  isCommitted: boolean;
  isDragging: boolean;
}

/**
 * Calculates current slide ratio [0, 1] given drag distance and maximum allowable travel distance.
 * 
 * @param currentX - Current pointer position in pixels
 * @param startX - Starting pointer position when drag began
 * @param maxTravelDistance - Total width of the track minus handle width
 */
export function calculateSlideRatio(
  currentX: number,
  startX: number,
  maxTravelDistance: number
): number {
  if (maxTravelDistance <= 0) return 1;
  const deltaX = currentX - startX;
  const clamped = Math.max(0, Math.min(deltaX, maxTravelDistance));
  return Math.round((clamped / maxTravelDistance) * 1000) / 1000;
}

/**
 * Determines whether the slide has crossed the confirmation threshold.
 * 
 * @param ratio - Current slide ratio [0, 1]
 * @param threshold - Required percentage to commit (default 0.82)
 */
export function checkCommitThreshold(
  ratio: number,
  threshold: number = 0.82
): boolean {
  return ratio >= threshold;
}

/**
 * Computes handle translation in pixels.
 */
export function calculateHandlePosition(
  ratio: number,
  maxTravelDistance: number
): number {
  if (maxTravelDistance <= 0) return 0;
  return Math.round(ratio * maxTravelDistance * 10) / 10;
}
