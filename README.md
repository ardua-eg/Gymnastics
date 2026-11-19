# Gymnastics wear in Egy

Static website: landing page (`index.html`), shop (`shop.html`) and a CRM dashboard prototype (`crm.html`). Plain HTML, CSS and JavaScript, no build step.

Shop products and CRM data are sample placeholders.

## Staff password for the CRM

`middleware.js` protects `/crm.html` with a browser login prompt. In Vercel, open Project Settings, then Environment Variables, and add:

- `STAFF_PASSWORD`: the password (required; without it the dashboard stays locked)
- `STAFF_USER`: the username (optional, defaults to `staff`)

Redeploy after adding them.

## Real orders (shop form and dashboard)

The shop's "Request order" button saves orders through `api/orders.js`, and the CRM dashboard reads them from there. Orders are stored in Upstash Redis.

Setup in Vercel:
1. Open your project, then Storage (or the Marketplace), and add **Upstash Redis**. Connect it to this project; this sets `KV_REST_API_URL` and `KV_REST_API_TOKEN` automatically.
2. Add `STAFF_PASSWORD` (and optionally `STAFF_USER`) under Environment Variables.
3. Redeploy.

Orders are requests only (name, phone, product, notes). There is no online payment, and prices are not stored.
