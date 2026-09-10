const jsonHeaders = {
  'content-type': 'application/json; charset=utf-8',
};

export default async function studentSummary(request) {
  if (request.method !== 'GET') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...jsonHeaders, allow: 'GET' } },
    );
  }

  return new Response(
    JSON.stringify({
      schoolName: 'مجتمع آموزشی دخترانه معرفت',
      studentName: 'علی محمدی',
      baseFee: 30000000,
      discounts: 6000000,
      totalPaid: 15000000,
      remainingBalance: 9000000,
    }),
    { status: 200, headers: jsonHeaders },
  );
}

export const config = {
  path: '/api/student/summary',
  method: 'GET',
};
