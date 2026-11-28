// Renders the shop and clearance pages from products.js
(function () {
  var main = document.getElementById('catalog');
  var MODES = (main.getAttribute('data-modes') || 'stock').split(',');
  var TREE = { Men: ['Leotard', 'Shorts', 'Pants'], Women: ['Leotard', 'Long sleeve', 'Short sleeve', 'Shorts'], Accessories: ['Shoes', 'Grips', 'Bags', 'Others'] };
  var TINT = { Men: '#E6DAF1', Women: '#F9D0E1', Accessories: '#FFE3BF' };
  var BRANDS = ['Quatro', 'Snowflake Designs', 'Destira', 'Agiva', 'IWA', 'Moreau', 'Reisport', 'Tiger Paw', 'Royal', 'Alpha Factor', 'Pink'];
  var SLUGS = { 'quatro': 'Quatro', 'snowflake-designs': 'Snowflake Designs', 'destira': 'Destira', 'agiva': 'Agiva', 'iwa': 'IWA', 'moreau': 'Moreau', 'reisport': 'Reisport' };
  var TABS = MODES.length > 1 ? [['stock', 'In stock'], ['order', 'By order · 5 to 8 weeks']] : null;
  var all = (window.PRODUCTS || []).filter(function (p) { return MODES.indexOf(p.mode) > -1 || (p.sale && MODES.indexOf('clearance') > -1); });
  var s = { mode: MODES[0], cat: 'All', type: 'All', brand: 'All' };
  var sel = {}, warn = {};
  var $ = function (i) { return document.getElementById(i); };
  var esc = function (x) { return String(x == null ? '' : x).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var egp = function (n) { return Number(n).toLocaleString('en-US') + ' EGP'; };

  function fromHash() {
    var h = (location.hash || '').replace('#', '').toLowerCase();
    if (h === 'by-order' && MODES.indexOf('order') > -1) s.mode = 'order';
    else if (SLUGS[h]) { s.brand = SLUGS[h]; s.cat = 'All'; s.type = 'All'; }
  }
  fromHash();
  window.addEventListener('hashchange', function () { fromHash(); render(); });

  function chips(el, list, key) {
    el.innerHTML = '';
    list.forEach(function (v) {
      var b = document.createElement('button');
      b.className = 'chip' + (s[key] === v ? ' on' : '');
      b.textContent = v;
      b.onclick = function () { s[key] = v; if (key === 'cat') s.type = 'All'; render(); };
      el.appendChild(b);
    });
  }
  function badge(m) {
    if (m === 'order') return '<div style="align-self:flex-start;background:#FFC20E;color:#2A1440;font:600 12px Inter,sans-serif;letter-spacing:.06em;padding:4px 10px;border-radius:999px">BY ORDER · 5 TO 8 WEEKS</div>';
    if (m === 'clearance') return '<div style="align-self:flex-start;background:#E5322D;color:#fff;font:600 12px Inter,sans-serif;letter-spacing:.06em;padding:4px 10px;border-radius:999px">CLEARANCE</div>';
    return '';
  }
  var ORD = ['GR00','GR0','GR1','GR2','GR3','XS','S','M','L','XL','XXL'];
  function sizeNums(p) { return Object.keys(p.sizes).sort(function (a, b) { var x = parseFloat(a), y = parseFloat(b); if (!isNaN(x) && !isNaN(y)) return x - y; return ORD.indexOf(a) - ORD.indexOf(b); }); }
  function soldOut(p) { if (!p.sizes) return p.stock === 0; return !sizeNums(p).some(function (z) { return p.sizes[z] > 0; }); }

  function card(p) {
    var h = '<div style="flex:1 1 260px;max-width:380px;background:#fff;border:1px solid #E6DAF1;border-radius:20px;padding:16px;display:flex;flex-direction:column;gap:10px">' + badge(p.sale ? 'clearance' : p.mode);
    h += p.img ? '<div style="height:' + (p.img2 ? 280 : 220) + 'px;border-radius:12px;background:#fff;display:flex;gap:6px;align-items:center;justify-content:center;overflow:hidden"><img src="' + esc(p.img) + '" alt="' + esc(p.name) + '" style="max-width:' + (p.img2 ? '49%' : '100%') + ';max-height:100%;object-fit:contain">' + (p.img2 ? '<img src="' + esc(p.img2) + '" alt="' + esc(p.name) + ' back" style="max-width:49%;max-height:100%;object-fit:contain">' : '') + '</div>'
      : '<div style="height:220px;border-radius:12px;background:' + (TINT[p.cat] || '#E6DAF1') + ';display:flex;align-items:center;justify-content:center;font-size:13px;color:#4A3860">[PRODUCT PHOTO]</div>';
    h += '<div style="font-size:13px;color:#4A3860">' + esc(p.brand) + ' · ' + esc(p.cat) + '</div>';
    h += '<div style="font-family:Fredoka,sans-serif;font-weight:600;font-size:20px">' + esc(p.name) + '</div>';
    h += '<div style="font-weight:600;font-size:18px">' + (p.oldPrice ? '<s style="color:#4A3860;font-weight:400;font-size:15px">' + egp(p.oldPrice) + '</s> ' : '') + egp(p.price) + '</div>';
    if (p.sizes) {
      var cur = sel[p.id];
      h += '<div style="font-size:13px;font-weight:600;color:#4A3860">' + (p.optionLabel || 'Size') + '</div><div style="display:flex;flex-wrap:wrap;gap:6px">' +
        sizeNums(p).map(function (z) {
          var n = p.sizes[z], on = cur === z;
          if (n <= 0) return '<span aria-label="Size ' + z + ' out of stock" style="min-width:44px;padding:0 12px;min-height:44px;display:inline-flex;align-items:center;justify-content:center;border-radius:12px;border:2px dashed #CDB8E3;color:#9A8AAE;text-decoration:line-through;font:600 15px Inter,sans-serif">' + z + '</span>';
          return '<button type="button" data-pid="' + esc(p.id) + '" data-size="' + esc(z) + '" aria-pressed="' + on + '" style="min-width:44px;padding:0 12px;min-height:44px;border-radius:12px;border:2px solid ' + (on ? '#6B2D8F' : '#CDB8E3') + ';background:' + (on ? '#6B2D8F' : '#fff') + ';color:' + (on ? '#fff' : '#2A1440') + ';font:600 15px Inter,sans-serif;cursor:pointer">' + z + '</button>';
        }).join('') + '</div>';
      var msg = cur ? (p.sizes[cur] <= 2 ? 'Only ' + p.sizes[cur] + ' left in ' + (p.optionLabel ? cur : 'size ' + cur) : p.sizes[cur] + ' available in ' + (p.optionLabel ? cur : 'size ' + cur)) : (warn[p.id] ? 'Choose a ' + (p.optionLabel || 'size').toLowerCase() + ' first' : 'Crossed-out options are out of stock');
      h += '<div role="status" style="font-size:13px;color:' + (!cur && warn[p.id] ? '#B00020' : '#4A3860') + '">' + msg + '</div>';
    }
    if (!p.sizes && p.stock != null && p.stock > 0) h += '<div style="font-size:13px;color:#4A3860">' + (p.stock <= 2 ? 'Only ' + p.stock + ' left' : p.stock + ' available') + '</div>';
    if (p.guide) {
      var g = p.guide;
      h += '<details style="background:#F7F2FB;border-radius:12px;padding:10px 14px"><summary style="cursor:pointer;font-weight:600;font-size:14px;min-height:28px">' + esc(g.title) + '</summary>' +
        '<div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:10px;align-items:flex-start">' + (g.img ? '<img src="' + esc(g.img) + '" alt="How to measure" style="width:120px;border-radius:8px">' : '') +
        '<div style="flex:1 1 140px;font-size:13px;line-height:1.5;color:#4A3860">' + esc(g.text) +
        '<div style="overflow-x:auto"><table style="margin-top:8px;border-collapse:collapse;width:100%;font-size:13px;color:#2A1440">' +
        (g.head ? '<tr>' + g.head.map(function (x, k) { return '<th style="padding:4px 6px 4px 0;text-align:' + (k ? 'right' : 'left') + ';font-weight:600">' + esc(x) + '</th>'; }).join('') + '</tr>' : '') +
        g.rows.map(function (r) { return '<tr>' + r.map(function (x, k) { return '<td style="padding:4px 6px 4px 0;border-top:1px solid #E6DAF1;text-align:' + (k && k === r.length - 1 && !g.head ? 'right' : (k ? 'right' : 'left')) + ';' + ((g.head ? k === 0 : k === r.length - 1) ? 'font-weight:600' : '') + '">' + esc(x) + '</td>'; }).join('') + '</tr>'; }).join('') + '</table></div></div></div></details>';
    }
    h += soldOut(p) ? '<button disabled style="border:0;background:#E5E0EA;color:#6B5D7E;font:600 15px Inter,sans-serif;padding:12px 18px;border-radius:999px;min-height:44px">Sold out</button>'
      : '<button type="button" data-addp="' + esc(p.id) + '" style="border:0;cursor:pointer;background:#C71F66;color:#fff;font:600 15px Inter,sans-serif;padding:12px 18px;border-radius:999px;min-height:44px">Add to cart</button>';
    return h + '</div>';
  }

  function render() {
    var tw = $('tabs');
    if (tw && TABS) {
      tw.innerHTML = '';
      TABS.forEach(function (t) { var b = document.createElement('button'); b.className = 'tab' + (s.mode === t[0] ? ' on' : ''); b.textContent = t[1]; b.onclick = function () { s.mode = t[0]; render(); }; tw.appendChild(b); });
      $('tabnote').textContent = s.mode === 'order' ? 'Not kept in stock. We order it for you, and it arrives in 5 to 8 weeks.' : 'Available now.';
    }
    chips($('cats'), ['All', 'Men', 'Women', 'Accessories'], 'cat');
    var hasT = s.cat !== 'All';
    $('typesWrap').hidden = !hasT;
    if (hasT) chips($('types'), ['All'].concat(TREE[s.cat]), 'type');
    chips($('brands'), ['All'].concat(BRANDS), 'brand');
    var items = all.filter(function (p) { return (p.mode === s.mode || (s.mode === 'clearance' && p.sale)) && (s.cat === 'All' || p.cat === s.cat) && (s.type === 'All' || p.type === s.type) && (s.brand === 'All' || p.brand === s.brand); });
    $('count').textContent = items.length ? 'Showing ' + items.length + (items.length === 1 ? ' product' : ' products') : '';
    $('empty').hidden = items.length > 0;
    $('grid').innerHTML = items.map(card).join('');
  }

  document.addEventListener('click', function (e) {
    var z = e.target.closest('[data-size]');
    if (z) { sel[z.getAttribute('data-pid')] = z.getAttribute('data-size'); render(); return; }
    var a = e.target.closest('[data-addp]');
    if (a) {
      var id = a.getAttribute('data-addp');
      var p = all.filter(function (x) { return x.id === id; })[0];
      if (!p) return;
      if (p.sizes && !sel[id]) { warn[id] = true; render(); return; }
      window.Cart.add({ name: p.name, brand: p.brand, mode: p.mode, price: p.price, size: sel[id] || '', optLabel: p.optionLabel || '', max: p.sizes ? p.sizes[sel[id]] : (p.stock || 0) });
    }
  });
  render();
})();
