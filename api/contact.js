// Vercel Serverless Function — forwards blog "reply" form submissions to email via Resend.
// Endpoint: POST /api/contact
//
// Env vars (set these in Vercel -> Project -> Settings -> Environment Variables):
//   RESEND_API_KEY  (required) — create at https://resend.com/api-keys
//   CONTACT_TO      (optional) — recipient email, defaults to binli@byteli.com
//   RESEND_FROM     (optional) — verified sender, e.g. "Byteli Blog <no-reply@byteli.com>"
//
// See .env.example in the repo root for a local reference.

const DEFAULT_TO = 'binli@byteli.com';
const DEFAULT_FROM = 'Byteli Blog <no-reply@byteli.com>';

// Read the raw request body (works whether the platform pre-parses or not).
function readStream(req) {
  return new Promise((resolve) => {
    let data = '';
    req.setEncoding('utf8');
    req.on('data', (chunk) => { data += chunk; });
    req.on('end', () => resolve(data));
    req.on('error', () => resolve(''));
  });
}

async function parseBody(req) {
  const ct = String(req.headers['content-type'] || '');
  // Platform already parsed it into an object
  if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
    return req.body;
  }
  // Platform already gave us a string / buffer
  let raw = '';
  if (typeof req.body === 'string' || Buffer.isBuffer(req.body)) {
    raw = Buffer.isBuffer(req.body) ? req.body.toString('utf8') : req.body;
  } else {
    raw = await readStream(req);
  }
  if (!raw) return {};
  if (ct.includes('application/json')) {
    try { return JSON.parse(raw); } catch { return {}; }
  }
  // application/x-www-form-urlencoded (no-JS fallback submits this way)
  const out = {};
  try { for (const [k, v] of new URLSearchParams(raw)) out[k] = v; } catch { /* ignore */ }
  return out;
}

// Best-effort in-memory rate limiter (per function instance).
function checkRateLimit(ip) {
  const MAX = 5;          // submissions
  const WINDOW_MS = 10 * 60 * 1000; // per 10 minutes
  const key = ip || 'unknown';
  const now = Date.now();
  const hits = (globalThis.__replyLimits ||= new Map());
  const rec = hits.get(key);
  if (!rec || now - rec.start > WINDOW_MS) {
    hits.set(key, { start: now, count: 1 });
    return true;
  }
  rec.count += 1;
  if (rec.count > MAX) return false;
  hits.set(key, rec);
  return true;
}

function json(res, status, payload) {
  res.status(status);
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(payload));
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    json(res, 405, { ok: false, error: 'method_not_allowed' });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY is not configured');
    json(res, 500, { ok: false, error: 'not_configured' });
    return;
  }

  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket?.remoteAddress;
  if (!checkRateLimit(ip)) {
    json(res, 429, { ok: false, error: 'rate_limited' });
    return;
  }

  const body = await parseBody(req);
  const email = String(body.email || '').trim().slice(0, 200);
  const message = String(body.message || '').trim();
  const website = String(body.website || '').trim(); // honeypot: real users never fill it
  const title = String(body.title || '').trim().slice(0, 300);
  const url = String(body.url || '').trim().slice(0, 500);

  // Honeypot hit → silently pretend success (don't waste a send, don't leak).
  if (website) {
    json(res, 200, { ok: true });
    return;
  }

  if (!message) {
    json(res, 400, { ok: false, error: 'empty_message' });
    return;
  }
  if (message.length > 5000) {
    json(res, 400, { ok: false, error: 'message_too_long' });
    return;
  }
  if (!email) {
    json(res, 400, { ok: false, error: 'missing_email' });
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    json(res, 400, { ok: false, error: 'invalid_email' });
    return;
  }

  const subject = `Blog reply: ${title || 'your blog post'}`;

  const text = [
    `A reader replied to your post "${title}".`,
    `URL: ${url}`,
    `From: ${email}`,
    '',
    '---',
    '',
    message,
    '---',
  ].join('\n');

  try {
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || DEFAULT_FROM,
        to: [process.env.CONTACT_TO || DEFAULT_TO],
        reply_to: email ? [email] : undefined,
        subject,
        text,
      }),
    });

    if (!resendRes.ok) {
      const detail = await resendRes.text().catch(() => '');
      console.error('Resend error', resendRes.status, detail);
      json(res, 502, { ok: false, error: 'send_failed' });
      return;
    }

    json(res, 200, { ok: true });
  } catch (err) {
    console.error('Contact handler error:', err);
    json(res, 500, { ok: false, error: 'send_failed' });
  }
}
