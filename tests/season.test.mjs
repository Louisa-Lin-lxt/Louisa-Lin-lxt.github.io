import assert from 'node:assert/strict';
import test from 'node:test';
import { seasonForDate } from '../app/components/season.ts';

test('Christmas returns each year and wraps across New Year', () => {
  for (const year of [2026, 2027, 2028]) {
    assert.equal(seasonForDate(new Date(year, 10, 21, 23, 59)), null);
    assert.equal(seasonForDate(new Date(year, 10, 22)), 'christmas');
    assert.equal(seasonForDate(new Date(year, 11, 25)), 'christmas');
    assert.equal(seasonForDate(new Date(year + 1, 0, 1)), 'christmas');
    assert.equal(seasonForDate(new Date(year + 1, 0, 6, 23, 59)), 'christmas');
    assert.equal(seasonForDate(new Date(year + 1, 0, 7)), null);
    assert.equal(seasonForDate(new Date(year, 6, 1)), null);
  }
});
