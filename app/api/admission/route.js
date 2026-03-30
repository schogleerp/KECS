/**
 * API Proxy Route: /api/admission (POST)
 * 
 * Forwards school admission inquiries to Google Apps Script.
 * Bypasses direct-fetch CORS and allows structured JSON reporting.
 */

const ADMISSION_GAS_URL = 'https://script.google.com/macros/s/AKfycbx1yzngWA2NlVxpVjjCplV9j_PLlmTpRwoxiRmL6fGszBKghSBOKYCg003C23h2FPDK3Q/exec';

export async function POST(request) {
  try {
    const body = await request.json();

    const res = await fetch(ADMISSION_GAS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    let result;
    try {
      result = await res.json();
    } catch {
      result = { result: 'unknown' };
    }

    if (result.result === 'error') {
      console.error('[/api/admission] Apps Script error:', result.error);
      return Response.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    return Response.json({ success: true, data: result });
  } catch (err) {
    console.error('[/api/admission] Proxy error:', err.message);
    return Response.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
