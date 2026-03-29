/**
 * API Proxy Route: /api/gallery
 *
 * This Next.js server-side route fetches gallery data from Google Apps Script
 * on the SERVER, bypassing CORS restrictions that block browser-side calls.
 * The browser calls this safe, same-origin endpoint instead of Apps Script directly.
 */

const APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbyqN6kK3YXybHluKQa4gXqacpUmYMABUqAY8rEwD_F7a_naTTekISKYKrsYgtK9iU8U/exec';

export async function GET() {
  try {
    const res = await fetch(APPS_SCRIPT_URL, {
      method: 'GET',
      // Server-side fetches do not have CORS restrictions — no special mode needed.
      // Cache for 5 minutes to avoid hammering the Apps Script quota.
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      return Response.json(
        { error: `Apps Script responded with status ${res.status}` },
        { status: 502 }
      );
    }

    const data = await res.json();
    return Response.json(Array.isArray(data) ? data : []);
  } catch (err) {
    console.error('[/api/gallery] Fetch failed:', err.message);
    return Response.json([]);
  }
}
