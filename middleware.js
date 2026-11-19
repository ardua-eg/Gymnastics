import { next } from '@vercel/functions';

// Password-protects the CRM dashboard. Set STAFF_PASSWORD (and optionally STAFF_USER) in Vercel.
export const config = {
  matcher: ['/crm.html', '/crm'],
};

export default function middleware(request) {
  const user = process.env.STAFF_USER || 'staff';
  const pass = process.env.STAFF_PASSWORD;

  if (!pass) {
    return new Response('Dashboard is locked: STAFF_PASSWORD is not set.', { status: 503 });
  }

  const header = request.headers.get('authorization') || '';
  if (header.startsWith('Basic ')) {
    const decoded = atob(header.slice(6));
    const i = decoded.indexOf(':');
    if (i > -1 && decoded.slice(0, i) === user && decoded.slice(i + 1) === pass) {
      return next();
    }
  }

  return new Response('Staff login required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Staff area", charset="UTF-8"' },
  });
}
