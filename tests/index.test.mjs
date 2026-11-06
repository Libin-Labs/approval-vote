import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('overlapping approvals', () => {
  assert.deepEqual(
    api.approval(['a', 'b', 'c'], [['a', 'b'], ['b'], ['a', 'c']]).map((x) => x.score),
    [2, 2, 1],
  );
});
test('empty abstentions', () => {
  assert.deepEqual(
    api.approval(['a', 'b'], [[]]).map((x) => x.score),
    [0, 0],
  );
});
test('all approved', () => {
  assert.deepEqual(
    api.approval(['a', 'b'], [['a', 'b']]).map((x) => x.score),
    [1, 1],
  );
});
test('duplicates', () => {
  assert.throws(() => api.approval(['a', 'b'], [['a', 'a']]));
});
test('unknown and empty election', () => {
  assert.throws(() => api.approval(['a', 'b'], [['c']]));
  assert.throws(() => api.approval(['a', 'b'], []));
});
test('per-candidate indicator oracle', () => {
  const ballots = [[], ['a'], ['b', 'c'], ['a', 'b', 'c']],
    r = api.approval(['a', 'b', 'c'], ballots);
  for (const x of r) assert.equal(x.score, ballots.filter((b) => b.includes(x.candidate)).length);
});
