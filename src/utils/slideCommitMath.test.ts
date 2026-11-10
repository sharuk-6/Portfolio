import test from 'node:test';
import assert from 'node:assert/strict';
import { 
  calculateSlideRatio, 
  checkCommitThreshold, 
  calculateHandlePosition 
} from './slideCommitMath';

test('calculateSlideRatio clamps properly between 0 and 1', () => {
  const max = 200;
  // Starting position 50
  assert.equal(calculateSlideRatio(50, 50, max), 0);
  assert.equal(calculateSlideRatio(150, 50, max), 0.5);
  assert.equal(calculateSlideRatio(250, 50, max), 1);

  // Leftward drag (negative) clamps to 0
  assert.equal(calculateSlideRatio(20, 50, max), 0);

  // Dragging past right boundary clamps to 1
  assert.equal(calculateSlideRatio(400, 50, max), 1);
});

test('checkCommitThreshold correctly validates commit threshold', () => {
  assert.equal(checkCommitThreshold(0.5, 0.82), false);
  assert.equal(checkCommitThreshold(0.81, 0.82), false);
  assert.equal(checkCommitThreshold(0.82, 0.82), true);
  assert.equal(checkCommitThreshold(1.0, 0.82), true);
});

test('calculateHandlePosition scales correctly with maxTravelDistance', () => {
  assert.equal(calculateHandlePosition(0, 150), 0);
  assert.equal(calculateHandlePosition(0.5, 150), 75);
  assert.equal(calculateHandlePosition(1, 150), 150);
});
