import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateSpiralPoint, normalizeAngle } from './spiralMath';

test('calculateSpiralPoint returns valid 3D coordinates within radius bounds', () => {
  const radius = 250;
  const heightSpan = 300;
  const point = calculateSpiralPoint(0, 6, 0, radius, heightSpan);

  assert.ok(typeof point.x === 'number');
  assert.ok(typeof point.y === 'number');
  assert.ok(typeof point.z === 'number');
  assert.ok(point.scale >= 0.65 && point.scale <= 1.1);
  assert.ok(point.opacity >= 0.35 && point.opacity <= 1.0);
  assert.ok(point.zIndex > 0);
});

test('front items have higher scale and zIndex than back items', () => {
  // Angle 0: cos(0) = 1 (front facing camera)
  const frontPoint = calculateSpiralPoint(0, 4, 0, 200, 200);
  
  // Angle PI: cos(PI) = -1 (back of spiral)
  const backPoint = calculateSpiralPoint(0, 4, Math.PI, 200, 200);

  assert.ok(frontPoint.z > backPoint.z, 'Front item should have greater Z depth');
  assert.ok(frontPoint.scale > backPoint.scale, 'Front item scale should exceed back item scale');
  assert.ok(frontPoint.zIndex > backPoint.zIndex, 'Front item zIndex should exceed back item zIndex');
});

test('normalizeAngle handles positive and negative wraps properly', () => {
  assert.equal(normalizeAngle(0), 0);
  assert.ok(Math.abs(normalizeAngle(Math.PI * 2) - 0) < 0.0001);
  assert.ok(Math.abs(normalizeAngle(-Math.PI / 2) - (1.5 * Math.PI)) < 0.0001);
});
