import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import basicAuth from 'express-basic-auth';
import compression from 'compression';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app  = express();
const PORT    = process.env.PORT    || 3000;
const NODE_ID = process.env.NODE_ID || 'latam';

// ── Supabase config (server-side only) ───────────────────────────────────────
const SUPA_URL  = 'https://xpjjolrznelyejflctvh.supabase.co';
const SUPA_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// ── Dashboard credentials (set via Railway env vars) ─────────────────────────
const DASH_USER = process.env.DASHBOARD_USER || 'ivan';
const DASH_PASS = process.env.DASHBOARD_PASS || 'va2026';

// ── Gzip compression ─────────────────────────────────────────────────────────
app.use(compression());

// ── Security headers ──────────────────────────────────────────────────────────
app.use(helmet({
  contentSecurityPolicy: false, // disabled — site uses inline styles/scripts
  crossOriginEmbedderPolicy: false,
}));

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), camera=(), microphone=()');
  next();
});

// ── Rate limiting ─────────────────────────────────────────────────────────────
// General: 120 req/min por IP
app.use(rateLimit({
  windowMs: 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Demasiadas solicitudes. Intenta en un minuto.' },
}));

// API endpoints: más estricto — 30 req/min
const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Límite de API alcanzado. Intenta en un minuto.' },
});

// ── Body parser para proxy ────────────────────────────────────────────────────
app.use(express.json({ limit: '16kb' }));

// ── Dashboard — Basic Auth ────────────────────────────────────────────────────
app.use('/dashboard.html', basicAuth({
  users: { [DASH_USER]: DASH_PASS },
  challenge: true,
  realm: 'Veterinario Alfa · Panel',
}));

// ── Proxy endpoint: programa_leads (service_role key stays server-side) ───────
app.get('/api/programa-leads', apiLimiter, async (req, res) => {
  // Validate dashboard bearer token
  const auth = req.headers.authorization || '';
  if (auth !== 'Bearer va-dashboard-2026') {
    return res.status(401).json({ error: 'No autorizado' });
  }

  if (!SUPA_ROLE) {
    return res.status(503).json({ error: 'SUPABASE_SERVICE_ROLE_KEY no configurada en Railway' });
  }

  try {
    const r = await fetch(
      `${SUPA_URL}/rest/v1/programa_leads?select=*&order=created_at.desc&limit=500`,
      {
        headers: {
          'apikey': SUPA_ROLE,
          'Authorization': `Bearer ${SUPA_ROLE}`,
        },
      }
    );
    const data = await r.json();
    res.status(r.status).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// PATCH programa_leads (actualizar estado CRM)
app.patch('/api/programa-leads/:id', apiLimiter, async (req, res) => {
  const auth = req.headers.authorization || '';
  if (auth !== 'Bearer va-dashboard-2026') {
    return res.status(401).json({ error: 'No autorizado' });
  }

  if (!SUPA_ROLE) {
    return res.status(503).json({ error: 'SUPABASE_SERVICE_ROLE_KEY no configurada' });
  }

  try {
    const r = await fetch(
      `${SUPA_URL}/rest/v1/programa_leads?id=eq.${req.params.id}`,
      {
        method: 'PATCH',
        headers: {
          'apikey': SUPA_ROLE,
          'Authorization': `Bearer ${SUPA_ROLE}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify(req.body),
      }
    );
    res.status(r.ok ? 200 : r.status).json({ ok: r.ok });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── Static files ──────────────────────────────────────────────────────────────
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '1h',
  etag: true,
}));

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Veterinario Alfa Latinoamérica [node:${NODE_ID}] → http://localhost:${PORT}`);
});
