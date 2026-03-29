/**
 * API Proxy Route: /api/payment  (POST)
 *
 * Forwards payment data (including base64 screenshot) from the browser
 * to Google Apps Script server-side, bypassing CORS limits and allowing
 * real error reporting. Also handles large base64 payloads that would
 * silently fail with the browser's no-cors mode.
 */

const APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbwNXlLYGRXwnYiQ0B9s4Dk6XsLJFSDWM-AXL011U9Ae06qHSIsVOxcI8_d6w6qO_cJ4eg/exec';

export async function POST(request) {
  try {
    const body = await request.json();

    const res = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    // Apps Script always returns 200 even on script errors.
    // Try to parse the response to surface any internal errors.
    let result;
    try {
      result = await res.json();
    } catch {
      result = { result: 'unknown' };
    }

    if (result.result === 'error') {
      console.error('[/api/payment] Apps Script error:', result.error);
      return Response.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error('[/api/payment] Proxy error:', err.message);
    return Response.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
