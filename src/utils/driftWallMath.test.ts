import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateDriftOffset, calculateParallaxAngles } from './driftWallMath';

test('calculateDriftOffset wraps cleanly within cycle bounds', () => {
  const totalHeight = 600;
  const offset0 = calculateDriftOffset(0, 30, 1, 'up', totalHeight);
  assert.equal(offset0, 0);

  const offset10s = calculateDriftOffset(10000, 30, 1, 'up', totalHeight);
  assert.ok(offset10s <= 0 && offset10s >= -totalHeight);

  // After exact multiple of cycle height, it returns to 0
  // 600px / 30px/sec = 20 seconds = 20000ms
  const offsetCycle = calculateDriftOffset(20000, 30, 1, 'up', totalHeight);
  assert.ok(Math.abs(offsetCycle) < 0.001 || Math.abs(offsetCycle + totalHeight) < 0.001);
});

test('calculateParallaxAngles clamps within tilt limits', () => {
  const center = calculateParallaxAngles(0, 0, 10, 15);
  assert.deepEqual(center, { rotateX: 0, rotateY: 0 });

  const corner = calculateParallaxAngles(1, 1, 10, 15);
  assert.deepEqual(corner, { rotateX: -10, rotateY: 15 });

  const overBound = calculateParallaxAngles(2, -3, 10, 15);
  assert.deepEqual(overBound, { rotateX: 10, rotateY: 15 });
});
