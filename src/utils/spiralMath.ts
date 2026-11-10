/**
 * Pure 3D spiral & helix calculations for InfiniteSpiral component
 */

export interface SpiralItemData {
  id: string;
  name: string;
  category: string;
  experience: string;
  description: string;
  accentColor: string;
  glowColor: string;
  badge: string;
  highlights: string[];
}

export interface SpiralPoint3D {
  x: number;
  y: number;
  z: number;
  scale: number;
  opacity: number;
  zIndex: number;
  angle: number;
}

/**
 * Calculates 3D cylindrical/conical spiral coordinates for a given item index along a spiral.
 * 
 * @param index - Index of the item
 * @param total - Total items in the spiral
 * @param currentRotation - Global rotation angle in radians
 * @param radius - Base radius in pixels
 * @param heightSpan - Total vertical span in pixels
 * @param coils - Number of spiral turns (coils)
 */
export function calculateSpiralPoint(
  index: number,
  total: number,
  currentRotation: number,
  radius: number = 260,
  heightSpan: number = 360,
  coils: number = 1.6
): SpiralPoint3D {
  if (total <= 0) {
    return { x: 0, y: 0, z: 0, scale: 1, opacity: 1, zIndex: 1, angle: 0 };
  }

  // Normalized position along the spiral path [0, 1]
  const progress = index / total;

  // Angular position with global continuous rotation
  const angle = currentRotation + progress * (coils * 2 * Math.PI);

  // Vertical position centered around 0
  const y = (progress - 0.5) * heightSpan;

  // Slight conical variation: slightly wider at the center
  const radiusMultiplier = 0.85 + 0.3 * Math.sin(progress * Math.PI);
  const effectiveRadius = radius * radiusMultiplier;

  // 3D coordinates (X across, Z depth towards/away from camera)
  const x = Math.sin(angle) * effectiveRadius;
  const z = Math.cos(angle) * effectiveRadius; // [-radius, +radius]

  // Depth-based scale: items in front (z > 0) are larger, items in back (z < 0) are smaller
  // Normalized depth factor [-1, 1] -> [0.65, 1.1]
  const depthFactor = z / radius;
  const scale = Math.max(0.65, Math.min(1.1, 0.85 + depthFactor * 0.25));

  // Depth-based opacity: items in front are fully opaque, back items fade slightly
  const opacity = Math.max(0.35, Math.min(1, 0.7 + depthFactor * 0.3));

  // Integer z-index so closer items render cleanly above farther items
  const zIndex = Math.round((depthFactor + 1) * 100);

  return {
    x: Math.round(x * 10) / 10,
    y: Math.round(y * 10) / 10,
    z: Math.round(z * 10) / 10,
    scale: Math.round(scale * 1000) / 1000,
    opacity: Math.round(opacity * 100) / 100,
    zIndex,
    angle
  };
}

/**
 * Normalizes an angle into the [0, 2*PI) range
 */
export function normalizeAngle(angle: number): number {
  const twoPi = Math.PI * 2;
  return ((angle % twoPi) + twoPi) % twoPi;
}
