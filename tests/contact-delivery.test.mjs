import assert from 'node:assert/strict';
import test from 'node:test';
import { submitContact } from '../app/components/contactDelivery.ts';

const endpoint = 'https://formspree.io/f/testform';
const signal = new AbortController().signal;
function message(overrides = {}) {
  const data = new FormData();
  for (const [name, value] of Object.entries({
    name: ' Test Visitor ', email: 'visitor@example.com', category: 'Research',
    subject: ' A research question ', message: ' Hello from the portfolio. ', _gotcha: '', ...overrides,
  })) data.set(name, value);
  return data;
}

test('submits reply address, category and subject without mutating the form data', async () => {
  const data = message();
  const original = [...data];
  const result = await submitContact(data, signal, endpoint, async (url, options) => {
    assert.equal(url, endpoint);
    assert.equal(options.signal, signal);
    assert.equal(options.credentials, 'omit');
    assert.equal(options.referrerPolicy, 'strict-origin-when-cross-origin');
    assert.deepEqual(JSON.parse(options.body), {
      name: 'Test Visitor', email: 'visitor@example.com', category: 'Research',
      subject: '[Website][Research] A research question', message: 'Hello from the portfolio.', _gotcha: '',
    });
    return Response.json({ next: '/thanks' });
  });
  assert.equal(result, 'success');
  assert.deepEqual([...data], original);
});

test('missing or invalid public endpoint never sends visitor data', async () => {
  const neverSend = async () => assert.fail('Unconfigured form must not make a request');
  for (const url of ['', 'https://example.com/f/test', 'https://formspree.io.evil.example/f/test', `${endpoint}?to=other`]) {
    assert.equal(await submitContact(message(), signal, url, neverSend), 'unconfigured');
  }
});

test('rejects bot fields, invalid emails, empty fields and oversized content before submission', async () => {
  const neverSend = async () => assert.fail('Invalid fields must not make a request');
  for (const fields of [{ _gotcha: 'spam' }, { email: 'not-an-email' }, { email: 'a@b.com\r\nBcc: other@example.com' },
    { name: ' ' }, { category: 'unknown' }, { subject: 'x'.repeat(161) }, { message: 'x'.repeat(10001) }]) {
    assert.equal(await submitContact(message(fields), signal, endpoint, neverSend), 'invalid');
  }
});

test('HTTP errors and unexpected success bodies never become false success', async () => {
  for (const response of [
    Response.json({ errors: [{ code: 'INACTIVE', message: 'Not verified' }] }, { status: 403 }),
    Response.json({ next: '/thanks', errors: [{ message: 'Rejected' }] }),
    Response.json({ next: '/thanks' }, { status: 500 }),
    Response.json({ error: 'Rejected' }), Response.json({ ok: true }), Response.json(null),
    new Response('<html>Service unavailable</html>', { status: 503 }),
  ]) {
    assert.equal(await submitContact(message(), signal, endpoint, async () => response), 'error');
  }
});

test('rate limits and ambiguous timeouts do not trigger automatic retries', async () => {
  assert.equal(await submitContact(message(), signal, endpoint, async () => new Response('', { status: 429 })), 'rate-limited');
  let attempts = 0;
  const data = message();
  const result = await submitContact(data, signal, endpoint, async () => {
    attempts += 1;
    throw new DOMException('Request timed out', 'AbortError');
  });
  assert.equal(result, 'error');
  assert.equal(attempts, 1);
  assert.equal(data.get('message'), ' Hello from the portfolio. ');
});
