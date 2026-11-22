import assert from 'node:assert/strict';
import test from 'node:test';
import { createVisitCounter, counterStartDate, productionHost } from '../app/components/visitCounter.ts';

test('production records one visit per document even when mounted repeatedly', async () => {
  const requests = [];
  const readCount = createVisitCounter(async (url, options) => {
    requests.push({ url: new URL(url), options });
    return Response.json({ value: 42 });
  });
  assert.deepEqual(await Promise.all([readCount(productionHost), readCount(productionHost)]), [42, 42]);
  assert.equal(await readCount(productionHost), 42);
  assert.equal(requests.length, 1);
  assert.equal(requests[0].url.searchParams.get('unique'), 'false');
  assert.equal(requests[0].url.searchParams.get('readOnly'), 'false');
  assert.ok(requests[0].url.pathname.endsWith(`/portfolio-${counterStartDate}`));
  assert.equal(requests[0].options.credentials, 'omit');
});

test('localhost and non-production previews only read the shared total', async () => {
  for (const hostname of ['localhost', '127.0.0.1', 'preview.example.com']) {
    const readCount = createVisitCounter(async url => {
      assert.equal(new URL(url).searchParams.get('readOnly'), 'true');
      return Response.json({ value: 0 });
    });
    assert.equal(await readCount(hostname), 0);
  }
});

test('failures stay unavailable and are not retried or replaced by fake counts', async () => {
  let attempts = 0;
  const readCount = createVisitCounter(async () => {
    attempts += 1;
    throw new Error('Network unavailable');
  });
  await assert.rejects(readCount(productionHost), /Network unavailable/);
  await assert.rejects(readCount(productionHost), /Network unavailable/);
  assert.equal(attempts, 1);
  for (const value of [-1, 1.5, '42', null]) {
    const invalidCount = createVisitCounter(async () => Response.json({ value }));
    await assert.rejects(invalidCount('localhost'), /Invalid visit count/);
  }
});
