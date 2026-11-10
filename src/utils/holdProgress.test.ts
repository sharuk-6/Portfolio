import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateHoldProgress, calculateCircleDashOffset } from './holdProgress';

test('calculateHoldProgress starts at 0 and caps at 1', () => {
  assert.deepEqual(calculateHoldProgress(0, 1000), { progress: 0, isComplete: false });
  assert.deepEqual(calculateHoldProgress(500, 1000), { progress: 0.5, isComplete: false });
  assert.deepEqual(calculateHoldProgress(1000, 1000), { progress: 1, isComplete: true });
  assert.deepEqual(calculateHoldProgress(1500, 1000), { progress: 1, isComplete: true });
});

test('calculateCircleDashOffset decreases from circumference to 0 as progress goes to 1', () => {
  const r = 20;
  const circumference = 2 * Math.PI * r;

  assert.ok(Math.abs(calculateCircleDashOffset(0, r) - circumference) < 0.001);
  assert.ok(Math.abs(calculateCircleDashOffset(0.5, r) - circumference * 0.5) < 0.001);
  assert.ok(Math.abs(calculateCircleDashOffset(1, r) - 0) < 0.001);
});
