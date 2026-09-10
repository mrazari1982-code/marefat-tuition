const jsonHeaders = {
  'content-type': 'application/json; charset=utf-8',
};

export default async function transactionsManual(request) {
  if (request.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...jsonHeaders, allow: 'POST' } },
    );
  }

  await request.json();

  return new Response(
    JSON.stringify({
      success: true,
      message: 'پرداخت با موفقیت ثبت و رسید صادر شد.',
      receiptNumber: `REC-${Math.floor(100000 + Math.random() * 900000)}`,
    }),
    { status: 201, headers: jsonHeaders },
  );
}

export const config = {
  path: '/api/transactions/manual',
  method: 'POST',
};
