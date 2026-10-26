// Cases taken from the production suite (tests/unit/tut18.test.js).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { wrongFacts, factHint } from '../src/fact-guard.js';

test('the wrong "cold air sinks at the subtropical high" statement is caught, the right one is not', () => {
  assert.deepEqual(wrongFacts({ n: 'At 30° north, cold air sinks and makes the subtropical high.' }), ['cold-air-sinks-subtropical']);
  assert.deepEqual(wrongFacts(['The subtropical high forms where cold air descends.']), ['cold-air-sinks-subtropical']);
  assert.deepEqual(wrongFacts('At the subtropical high, sinking air that rose at the equator comes down.'), []);
  assert.deepEqual(wrongFacts('Cold air sinks in a fridge.'), []);
});

test('the retry hint names the right explanation', () => {
  assert.match(factHint(['cold-air-sinks-subtropical']), /sinking, descending air/);
  assert.equal(factHint([]), '');
});
