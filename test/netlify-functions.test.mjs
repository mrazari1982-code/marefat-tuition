import assert from 'node:assert/strict';
import test from 'node:test';

import studentSummary, {
  config as studentSummaryConfig,
} from '../netlify/functions/student-summary.mjs';
import transactionsManual, {
  config as transactionsManualConfig,
} from '../netlify/functions/transactions-manual.mjs';

test('student summary keeps the existing API contract', async () => {
  const response = await studentSummary(
    new Request('https://example.test/api/student/summary'),
  );

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8');
  assert.deepEqual(await response.json(), {
    schoolName: 'مجتمع آموزشی دخترانه معرفت',
    studentName: 'علی محمدی',
    baseFee: 30000000,
    discounts: 6000000,
    totalPaid: 15000000,
    remainingBalance: 9000000,
  });
  assert.deepEqual(studentSummaryConfig, {
    path: '/api/student/summary',
    method: 'GET',
  });
});

test('student summary rejects unsupported methods', async () => {
  const response = await studentSummary(
    new Request('https://example.test/api/student/summary', { method: 'POST' }),
  );

  assert.equal(response.status, 405);
  assert.equal(response.headers.get('allow'), 'GET');
});

test('manual transaction keeps the existing API contract', async () => {
  const response = await transactionsManual(
    new Request('https://example.test/api/transactions/manual', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        studentName: 'دانش‌آموز آزمایشی',
        amount: 1000000,
        method: 'cash',
      }),
    }),
  );

  const body = await response.json();
  assert.equal(response.status, 201);
  assert.equal(body.success, true);
  assert.equal(body.message, 'پرداخت با موفقیت ثبت و رسید صادر شد.');
  assert.match(body.receiptNumber, /^REC-\d{6}$/);
  assert.deepEqual(transactionsManualConfig, {
    path: '/api/transactions/manual',
    method: 'POST',
  });
});

test('manual transaction rejects unsupported methods', async () => {
  const response = await transactionsManual(
    new Request('https://example.test/api/transactions/manual'),
  );

  assert.equal(response.status, 405);
  assert.equal(response.headers.get('allow'), 'POST');
});
