// Order requests API.
// POST  /api/orders  (public)  -> saves a new order request from the shop form
// GET   /api/orders  (staff)   -> lists all orders for the dashboard
// PATCH /api/orders  (staff)   -> moves an order to another stage
// Storage: Upstash Redis (add it from the Vercel Marketplace; it sets the env vars below).

const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const STAGES = ['lead', 'quoted', 'ordered', 'delivered'];
const TYPES = ['Club', 'Coach', 'Athlete', 'Retailer', 'Parent'];

async function redis(cmd) {
  const r = await fetch(URL_, {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + TOKEN, 'Content-Type': 'application/json' },
    body: JSON.stringify(cmd),
  });
  const j = await r.json();
  if (j.error) throw new Error(j.error);
  return j.result;
}

function isStaff(req) {
  const user = process.env.STAFF_USER || 'staff';
  const pass = process.env.STAFF_PASSWORD;
  if (!pass) return false;
  const h = req.headers.authorization || '';
  if (!h.startsWith('Basic ')) return false;
  const d = Buffer.from(h.slice(6), 'base64').toString('utf8');
  const i = d.indexOf(':');
  return i > -1 && d.slice(0, i) === user && d.slice(i + 1) === pass;
}

const clip = (v, n) => String(v == null ? '' : v).trim().slice(0, n);

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (!URL_ || !TOKEN) {
    return res.status(503).json({ error: 'Storage is not set up yet.' });
  }
  try {
    if (req.method === 'POST') {
      const b = req.body || {};
      if (b.website) return res.status(200).json({ ok: true }); // honeypot: bots fill this
      const name = clip(b.name, 80);
      const phone = clip(b.phone, 30);
      if (name.length < 2 || phone.replace(/\D/g, '').length < 8) {
        return res.status(400).json({ error: 'Please enter your name and a valid phone number.' });
      }
      const order = {
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
        createdAt: new Date().toISOString(),
        name,
        phone,
        city: clip(b.city, 60),
        type: TYPES.includes(b.type) ? b.type : 'Athlete',
        product: clip(b.product, 120),
        note: clip(b.note, 600),
        stage: 'lead',
      };
      await redis(['HSET', 'orders', order.id, JSON.stringify(order)]);
      return res.status(201).json({ ok: true, id: order.id });
    }

    if (!isStaff(req)) {
      res.setHeader('WWW-Authenticate', 'Basic realm="Staff area"');
      return res.status(401).json({ error: 'Staff login required' });
    }

    if (req.method === 'GET') {
      const flat = (await redis(['HGETALL', 'orders'])) || [];
      const orders = [];
      for (let i = 1; i < flat.length; i += 2) orders.push(JSON.parse(flat[i]));
      orders.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
      return res.status(200).json({ orders });
    }

    if (req.method === 'PATCH') {
      const { id, stage } = req.body || {};
      if (!STAGES.includes(stage)) return res.status(400).json({ error: 'Bad stage' });
      const cur = await redis(['HGET', 'orders', String(id)]);
      if (!cur) return res.status(404).json({ error: 'Not found' });
      const o = JSON.parse(cur);
      o.stage = stage;
      await redis(['HSET', 'orders', o.id, JSON.stringify(o)]);
      return res.status(200).json({ ok: true });
    }

    res.setHeader('Allow', 'GET, POST, PATCH');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (e) {
    return res.status(500).json({ error: 'Server error' });
  }
}
