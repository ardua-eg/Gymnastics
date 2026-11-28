// Order requests API.
// POST  /api/orders  (public)  -> saves a new order request from the shop form
// GET   /api/orders  (staff)   -> lists all orders for the dashboard
// PATCH /api/orders  (staff)   -> moves an order to another stage
// Storage: Upstash Redis (add it from the Vercel Marketplace; it sets the env vars below).

const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const STAGES = ['lead', 'ordered', 'delivered', 'cancelled'];
const MODES = ['stock', 'order', 'clearance'];
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

const dec = (v) => { try { return decodeURIComponent(v || ''); } catch (e) { return ''; } };
const clip = (v, n) => String(v == null ? '' : v).trim().slice(0, n);

function cleanItems(arr) {
  return (Array.isArray(arr) ? arr : []).slice(0, 30).map((i) => ({
    name: clip(i && i.name, 80),
    brand: clip(i && i.brand, 40),
    size: clip(i && i.size, 12),
    mode: MODES.includes(i && i.mode) ? i.mode : 'stock',
    qty: Math.max(1, Math.min(999, parseInt(i && i.qty, 10) || 1)),
    price: Number(i && i.price) > 0 ? Math.min(Number(i.price), 10000000) : null,
  })).filter((i) => i.name);
}
const summary = (items) =>
  items.map((i) => i.qty + '× ' + i.name + (i.size ? ' size ' + i.size : '') + ' (' + i.brand + ')' + (i.mode === 'order' ? ' [by order]' : i.mode === 'clearance' ? ' [clearance]' : '')).join('; ').slice(0, 400);

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
        address: clip(b.address, 200),
        // Approximate location from the visitor's network, added by Vercel (city and country only)
        geo: { city: dec(req.headers['x-vercel-ip-city']), country: dec(req.headers['x-vercel-ip-country']) },
        type: TYPES.includes(b.type) ? b.type : 'Athlete',
        product: clip(b.product, 400),
        items: cleanItems(b.items),
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
      const { id, stage, total, fields } = req.body || {};
      const hasStage = stage !== undefined;
      const hasTotal = total !== undefined;
      const hasFields = fields && typeof fields === 'object';
      if (!hasStage && !hasTotal && !hasFields) return res.status(400).json({ error: 'Nothing to update' });
      if (hasStage && !STAGES.includes(stage)) return res.status(400).json({ error: 'Bad stage' });
      if (hasTotal && !(Number(total) >= 0 && Number(total) <= 100000000)) return res.status(400).json({ error: 'Bad amount' });
      const cur = await redis(['HGET', 'orders', String(id)]);
      if (!cur) return res.status(404).json({ error: 'Not found' });
      const o = JSON.parse(cur);
      if (hasStage) o.stage = stage;
      if (hasTotal) o.total = Number(total);
      if (hasFields) {
        const name = clip(fields.name, 80);
        const phone = clip(fields.phone, 30);
        const items = cleanItems(fields.items);
        if (name.length < 2 || phone.replace(/\D/g, '').length < 8 || !items.length) {
          return res.status(400).json({ error: 'Name, phone and at least one item are required.' });
        }
        o.name = name;
        o.phone = phone;
        o.city = clip(fields.city, 60);
        o.address = clip(fields.address, 200);
        o.type = TYPES.includes(fields.type) ? fields.type : o.type;
        o.note = clip(fields.note, 600);
        o.items = items;
        o.product = summary(items);
        o.editedAt = new Date().toISOString();
      }
      await redis(['HSET', 'orders', o.id, JSON.stringify(o)]);
      return res.status(200).json({ ok: true });
    }

    res.setHeader('Allow', 'GET, POST, PATCH');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (e) {
    return res.status(500).json({ error: 'Server error' });
  }
}
