// Shared shopping cart: floating button + cart dialog that places orders.
(function () {
  var KEY = 'gwe_cart';
  var cart = [];
  try { cart = JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (e) { cart = []; }
  if (!Array.isArray(cart)) cart = [];
  function save() { try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch (e) {} }
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var TAG = { order: 'By order · 5 to 8 weeks', clearance: 'Clearance', stock: '' };

  var css = document.createElement('style');
  css.textContent =
    '#gweFab{position:fixed;right:20px;bottom:20px;z-index:50;border:0;cursor:pointer;background:#2A1440;color:#fff;font:600 16px Inter,sans-serif;padding:14px 22px;border-radius:999px;min-height:48px;box-shadow:0 6px 20px rgba(42,20,64,.35)}' +
    '#gweToast{position:fixed;left:50%;bottom:84px;transform:translateX(-50%);z-index:60;background:#2A7A1E;color:#fff;font:600 14px Inter,sans-serif;padding:10px 18px;border-radius:999px;opacity:0;pointer-events:none;transition:opacity .2s}' +
    '#gweToast.on{opacity:1}' +
    '#gweDlg{border:0;border-radius:20px;padding:24px;max-width:480px;width:calc(100% - 32px);max-height:90vh;font-family:Inter,sans-serif;color:#2A1440}' +
    '#gweDlg::backdrop{background:rgba(42,20,64,.55)}' +
    '#gweDlg h2{margin:0;font-family:Fredoka,sans-serif;font-size:24px}' +
    '.gwe-f{display:flex;flex-direction:column;gap:4px;font-size:14px;font-weight:600}' +
    '.gwe-f input,.gwe-f select,.gwe-f textarea{font:400 16px Inter,sans-serif;padding:10px 12px;border:2px solid #CDB8E3;border-radius:12px;color:#2A1440;background:#fff}' +
    '.gwe-row{display:flex;gap:10px;align-items:center;justify-content:space-between;border-top:1px solid #E6DAF1;padding:10px 0;font-size:14px}' +
    '.gwe-q{display:flex;gap:6px;align-items:center}' +
    '.gwe-q button{width:36px;height:36px;border:0;border-radius:50%;background:#EFE6F7;color:#2A1440;font:600 18px Inter,sans-serif;cursor:pointer}' +
    '.gwe-btn{border:0;cursor:pointer;font:600 16px Inter,sans-serif;padding:14px 24px;border-radius:999px;min-height:44px}';
  document.head.appendChild(css);

  var fab = document.createElement('button');
  fab.id = 'gweFab'; fab.type = 'button';
  var toast = document.createElement('div'); toast.id = 'gweToast'; toast.setAttribute('role', 'status');
  var dlg = document.createElement('dialog'); dlg.id = 'gweDlg';
  dlg.innerHTML =
    '<form id="gweForm" style="display:flex;flex-direction:column;gap:12px">' +
    '<h2>Your cart</h2><div id="gweList"></div>' +
    '<div id="gweNote" style="font-size:13px;color:#4A3860"></div>' +
    '<label class="gwe-f">Your name<input name="name" required maxlength="80" autocomplete="name"></label>' +
    '<label class="gwe-f">WhatsApp / phone<input name="phone" required maxlength="30" inputmode="tel" autocomplete="tel"></label>' +
    '<label class="gwe-f">City<input name="city" maxlength="60" autocomplete="address-level2"></label>' +
    '<label class="gwe-f">Address or area<input name="address" maxlength="200" autocomplete="street-address"></label>' +
    '<label class="gwe-f">Notes (optional)<textarea name="note" rows="3" maxlength="600"></textarea></label>' +
    '<input name="website" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px">' +
    '<div id="gweMsg" role="status" style="font-size:14px;min-height:20px"></div>' +
    '<div style="display:flex;gap:12px;flex-wrap:wrap"><button type="submit" id="gweSend" class="gwe-btn" style="background:#C71F66;color:#fff">Place order</button>' +
    '<button type="button" id="gweClose" class="gwe-btn" style="background:#fff;color:#2A1440;border:2px solid #2A1440;padding:12px 22px">Close</button></div></form>';
  document.body.appendChild(fab); document.body.appendChild(toast); document.body.appendChild(dlg);

  function count() { return cart.reduce(function (t, i) { return t + i.qty; }, 0); }
  function drawFab() { fab.textContent = 'Cart (' + count() + ')'; fab.style.display = count() || true ? 'block' : 'none'; }
  function draw() {
    drawFab();
    var list = document.getElementById('gweList');
    if (!cart.length) { list.innerHTML = '<div style="font-size:14px;color:#4A3860;padding:8px 0">Your cart is empty.</div>'; }
    else list.innerHTML = cart.map(function (it, i) {
      return '<div class="gwe-row"><div><div style="font-weight:600">' + esc(it.name) + (it.size ? ' · ' + (it.optLabel ? '' : 'size ') + esc(it.size) : '') + '</div><div style="color:#4A3860">' + esc(it.brand) + (TAG[it.mode] ? ' · ' + TAG[it.mode] : '') + '</div></div>' +
        '<div class="gwe-q"><button type="button" data-q="' + i + '" data-d="-1" aria-label="Less">−</button><span style="min-width:20px;text-align:center">' + it.qty + '</span><button type="button" data-q="' + i + '" data-d="1" aria-label="More">+</button></div></div>';
    }).join('');
    var hasOrder = cart.some(function (i) { return i.mode === 'order'; });
    document.getElementById('gweNote').textContent = hasOrder ? 'Items marked "By order" are ordered for you and arrive in 5 to 8 weeks.' : '';
    var sb = document.getElementById('gweSend'); sb.disabled = !cart.length; sb.textContent = hasOrder ? 'Request order' : 'Place order';
  }
  function flash(t) { toast.textContent = t; toast.classList.add('on'); clearTimeout(flash.t); flash.t = setTimeout(function () { toast.classList.remove('on'); }, 1400); }

  window.Cart = {
    add: function (it) {
      var f = cart.filter(function (c) { return c.name === it.name && c.brand === it.brand && c.mode === it.mode && (c.size || '') === (it.size || ''); })[0];
      if (f) { if (f.max && f.qty >= f.max) { flash('Only ' + f.max + ' in stock for this size'); return; } f.qty += 1; } else cart.push({ name: it.name, brand: it.brand, mode: it.mode, qty: 1, price: it.price || null, size: it.size || '', optLabel: it.optLabel || '', max: it.max || 0 });
      save(); draw(); flash('Added to cart');
    }
  };
  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-add]');
    if (a) { window.Cart.add({ name: a.getAttribute('data-name'), brand: a.getAttribute('data-brand'), mode: a.getAttribute('data-mode'), price: parseFloat(a.getAttribute('data-price')) || null }); return; }
    var q = e.target.closest('[data-q]');
    if (q) { var i = +q.getAttribute('data-q'); var d = +q.getAttribute('data-d'); if (d > 0 && cart[i].max && cart[i].qty >= cart[i].max) { flash('Only ' + cart[i].max + ' in stock for this size'); return; } cart[i].qty += d; if (cart[i].qty < 1) cart.splice(i, 1); save(); draw(); }
  });
  fab.onclick = function () { document.getElementById('gweMsg').textContent = ''; draw(); dlg.showModal(); };
  document.getElementById('gweClose').onclick = function () { dlg.close(); };
  document.getElementById('gweForm').onsubmit = function (e) {
    e.preventDefault();
    if (!cart.length) return;
    var msg = document.getElementById('gweMsg'), send = document.getElementById('gweSend');
    send.disabled = true; msg.style.color = '#4A3860'; msg.textContent = 'Sending...';
    var data = Object.fromEntries(new FormData(e.target).entries());
    data.items = cart;
    data.product = cart.map(function (i) { return i.qty + '× ' + i.name + (i.size ? (i.optLabel ? ' ' : ' size ') + i.size : '') + ' (' + i.brand + ')' + (i.mode === 'order' ? ' [by order]' : i.mode === 'clearance' ? ' [clearance]' : ''); }).join('; ');
    fetch('/api/orders', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, j: j }; }); })
      .then(function (x) {
        if (x.ok) { cart = []; save(); draw(); e.target.reset(); msg.style.color = '#2A7A1E'; msg.textContent = 'Thank you! We will contact you on WhatsApp soon.'; setTimeout(function () { dlg.close(); }, 2500); }
        else { msg.style.color = '#B00020'; msg.textContent = x.j.error || 'Something went wrong. Please try again.'; send.disabled = false; }
      }).catch(function () { msg.style.color = '#B00020'; msg.textContent = 'Could not send. Check your connection and try again.'; send.disabled = false; });
  };
  draw();
})();
