/**
 * Mathematical calculations and layout helpers for the 3D DriftWall component
 */

export interface DriftColumnConfig {
  columnIndex: number;
  direction: 'up' | 'down';
  speedMultiplier: number;
  initialOffset: number;
}

/**
 * Calculates continuous wrapping offset for a drifting column given elapsed time,
 * base speed, and total loop height.
 * 
 * @param elapsedTimeMs - Milliseconds elapsed
 * @param baseSpeed - Base pixels per second (e.g. 24)
 * @param speedMultiplier - Multiplier for this column (e.g. 0.9 to 1.2)
 * @param direction - 'up' or 'down'
 * @param totalHeight - Total height of single cycle before looping (e.g. 800)
 */
export function calculateDriftOffset(
  elapsedTimeMs: number,
  baseSpeed: number,
  speedMultiplier: number,
  direction: 'up' | 'down',
  totalHeight: number
): number {
  if (totalHeight <= 0) return 0;
  const pixelsMoved = (elapsedTimeMs / 1000) * baseSpeed * speedMultiplier;
  const sign = direction === 'up' ? -1 : 1;
  const rawOffset = sign * pixelsMoved;
  // Normalize into [-totalHeight, 0] or [0, totalHeight]
  const val = ((rawOffset % totalHeight) - totalHeight) % totalHeight;
  return val === 0 ? 0 : val;
}

/**
 * Calculates 3D parallax tilt based on normalized cursor position [-1, 1]
 * 
 * @param cursorX - Normalized X [-1, 1]
 * @param cursorY - Normalized Y [-1, 1]
 * @param maxTiltX - Max rotation around X axis (degrees)
 * @param maxTiltY - Max rotation around Y axis (degrees)
 */
export function calculateParallaxAngles(
  cursorX: number,
  cursorY: number,
  maxTiltX: number = 8,
  maxTiltY: number = 10
): { rotateX: number; rotateY: number } {
  const clampedX = Math.max(-1, Math.min(1, cursorX));
  const clampedY = Math.max(-1, Math.min(1, cursorY));

  const rx = Math.round(-clampedY * maxTiltX * 10) / 10;
  const ry = Math.round(clampedX * maxTiltY * 10) / 10;

  return {
    rotateX: rx === 0 ? 0 : rx,
    rotateY: ry === 0 ? 0 : ry
  };
}

