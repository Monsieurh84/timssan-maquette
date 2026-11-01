/* Timssan — comportements du thème (en-tête, recherche, guide des tailles, ajout rapide, signature)
   Les Monsieurs by Monsieur.H */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const TM = (window.TM = window.TM || {});
  TM.$ = $; TM.$$ = $$;
  const money = cents => {
    const fmt = (window.Shopify && Shopify.currency && Shopify.currency.active) || 'EUR';
    try { return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: fmt }).format(cents / 100).replace(',00', ''); } catch (e) { return (cents / 100).toFixed(2) + ' €'; }
  };
  TM.money = money;

  /* ---------- Panneaux (menu mobile, recherche, guide des tailles) ---------- */
  const scrim = $('#tmScrim');
  let open = null, lastFocus = null;
  function show(el) {
    hide(); if (!el) return;
    lastFocus = document.activeElement;
    el.classList.add('t-on'); el.setAttribute('aria-hidden', 'false'); el.removeAttribute('inert');
    if (scrim && !el.classList.contains('t-modal')) scrim.classList.add('t-on');
    document.body.classList.add('t-lock'); open = el;
  }
  function hide() {
    $$('.t-mnav.t-on,.t-search.t-on,.t-modal.t-on').forEach(e => { e.classList.remove('t-on'); e.setAttribute('aria-hidden', 'true'); if (!e.classList.contains('t-modal')) e.setAttribute('inert', ''); });
    if (scrim) scrim.classList.remove('t-on');
    document.body.classList.remove('t-lock');
    const b = $('#tmBurger'); if (b) b.setAttribute('aria-expanded', 'false');
    if (open && lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
    open = null;
  }
  TM.show = show; TM.hide = hide;
  if (scrim) scrim.addEventListener('click', hide);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && open) hide(); });
  document.addEventListener('click', e => {
    const t = e.target;
    if (t.closest('#tmBurger')) { show($('#tmNav')); $('#tmBurger').setAttribute('aria-expanded', 'true'); return; }
    if (t.closest('[data-tm-search]')) { e.preventDefault(); show($('#tmSearch')); setTimeout(() => { const i = $('#tmSIn'); if (i) i.focus(); }, 60); runSearch(''); return; }
    if (t.closest('[data-tm-sizes]')) { e.preventDefault(); show($('#tmSizeModal')); return; }
    if (t.closest('[data-tm-close]')) { hide(); return; }
    if (t.classList && t.classList.contains('t-modal')) { hide(); return; }
  });

  /* ---------- Verrouillage du scroll compatible iOS ---------- */
  let y = 0, locked = false;
  new MutationObserver(() => {
    const on = document.body.classList.contains('t-lock');
    if (on === locked) return; locked = on;
    const b = document.body.style;
    if (on) { y = window.scrollY; b.position = 'fixed'; b.top = -y + 'px'; b.left = '0'; b.right = '0'; b.width = '100%'; }
    else { b.position = b.top = b.left = b.right = b.width = ''; window.scrollTo(0, y); }
  }).observe(document.body, { attributes: true, attributeFilter: ['class'] });

  /* ---------- Recherche instantanée (API Shopify predictive search) ---------- */
  let sTimer = null, sCtrl = null;
  function runSearch(q) {
    const box = $('#tmSRes'); if (!box) return;
    clearTimeout(sTimer);
    sTimer = setTimeout(async () => {
      const query = q.trim() || 'jogpant';
      try {
        if (sCtrl) sCtrl.abort(); sCtrl = new AbortController();
        const r = await fetch(`${(window.routes && routes.predictive_search_url) || '/search/suggest'}.json?q=${encodeURIComponent(query)}&resources[type]=product&resources[limit]=6&resources[options][unavailable_products]=last`, { signal: sCtrl.signal });
        const d = await r.json();
        const ps = (d.resources && d.resources.results && d.resources.results.products) || [];
        box.innerHTML = ps.length ? ps.map(p => `<a href="${p.url}"><img src="${p.featured_image && p.featured_image.url ? p.featured_image.url + (p.featured_image.url.includes('?') ? '&' : '?') + 'width=400' : ''}" alt="" loading="lazy"><span>${p.title}</span><span class="t-price">${p.compare_at_price_max > p.price ? `<s>${money(Math.round(p.compare_at_price_max * 100))}</s>` : ''}${money(Math.round(p.price * 100))}</span></a>`).join('')
          : `<p class="t-muted" style="grid-column:1/-1">Aucun modèle pour « ${q.replace(/[<>&"]/g, '')} ». Essayez « jogpant » ou « denim ».</p>`;
      } catch (e) { /* requête annulée */ }
    }, 180);
  }
  document.addEventListener('input', e => { if (e.target.id === 'tmSIn') runSearch(e.target.value); });
  document.addEventListener('click', e => { const c = e.target.closest('.t-search-pop .t-chip'); if (c) { const i = $('#tmSIn'); i.value = c.dataset.q; runSearch(c.dataset.q); } });

  /* ---------- Guide des tailles : barème poids × taille ---------- */
  let GRID = [];
  try { GRID = JSON.parse(($('#tmSizeGrid') || {}).textContent || '[]'); } catch (e) { GRID = []; }
  function recSize(h, w) {
    if (!h || !w || !GRID.length) return null;
    const maxW = GRID[GRID.length - 1][0];
    if (w > maxW + 1) return { size: null, msg: `Au-delà de ${maxW} kg, écrivez-nous : on vous conseille la meilleure coupe.` };
    const col = h < 175 ? 1 : h < 185 ? 2 : 3;
    const row = GRID.reduce((b, r) => Math.abs(r[0] - w) < Math.abs(b[0] - w) ? r : b);
    const size = String(row[col]);
    let msg = `On vous conseille le ${size}.`;
    if (h < 165 || h > 195 || w < GRID[0][0] - 1) msg += " Vous êtes en bord de barème : en cas de doute, prenez la plus petite, la toile s'assouplit au porter.";
    return { size, msg };
  }
  TM.recSize = recSize;
  function bindFinder(root, onRec) {
    const [h, w] = root.querySelectorAll('input'), [ho, wo] = root.querySelectorAll('output');
    const run = () => {
      ho.textContent = h.value + ' cm'; wo.textContent = w.value + ' kg';
      const r = recSize(+h.value, +w.value);
      root.querySelectorAll('.t-sizes span').forEach(s => s.classList.toggle('t-hit', !!(r && s.dataset.s === r.size)));
      root.querySelector('.t-res').textContent = r ? r.msg : '';
      if (onRec) onRec(r);
    };
    h.addEventListener('input', run); w.addEventListener('input', run); run();
    root._run = run;
  }
  TM.bindFinder = bindFinder;
  $$('[data-finder]').forEach(f => { if (!f.dataset.manual) bindFinder(f); });
  const sgBody = $('#tmSgBody');
  if (sgBody) sgBody.innerHTML = GRID.map(r => `<tr><td><b>${r[0]} kg</b></td>${r.slice(1).map(x => `<td>${x}</td>`).join('')}</tr>`).join('');

  /* ---------- Anatomie : pastilles ---------- */
  $$('[data-tm-anat]').forEach(root => {
    const pins = $$('.t-pin', root), specs = $$('.t-spec', root);
    const sel = i => { pins.forEach((p, k) => p.setAttribute('aria-pressed', String(k == i))); specs.forEach((s, k) => s.classList.toggle('t-on', k == i)); };
    pins.forEach(p => p.addEventListener('click', () => sel(p.dataset.pin)));
    specs.forEach(s => s.addEventListener('click', () => sel(s.dataset.spec)));
  });

  /* ---------- Vidéos : bouton pause / lecture ---------- */
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-tm-vid]'); if (!b) return;
    const v = document.getElementById(b.dataset.tmVid) || b.parentNode.querySelector('video'); if (!v) return;
    if (v.paused) { v.play(); b.textContent = '❚❚'; b.setAttribute('aria-label', 'Mettre la vidéo en pause'); }
    else { v.pause(); b.textContent = '▶'; b.setAttribute('aria-label', 'Lire la vidéo'); }
  });
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) $$('.t-hero-vid').forEach(v => { v.removeAttribute('autoplay'); v.pause(); });

  /* ---------- Ajout au panier (cartes, fiche) → tiroir panier de Dawn ---------- */
  TM.add = async (id, qty = 1, btn) => {
    const drawer = document.querySelector('cart-drawer');
    if (btn) btn.setAttribute('aria-busy', 'true');
    try {
      const body = { items: [{ id: Number(id), quantity: qty }] };
      if (drawer) { body.sections = drawer.getSectionsToRender().map(s => s.id); body.sections_url = window.location.pathname; }
      const r = await fetch(((window.routes && routes.cart_add_url) || '/cart/add') + '.js', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(body) });
      const d = await r.json();
      if (d.status) { alert(d.description || d.message); return false; }
      if (drawer) { drawer.classList.remove('is-empty'); drawer.renderContents(d); }
      else window.location = (window.routes && routes.cart_url) || '/cart';
      if (window.publish && window.PUB_SUB_EVENTS) publish(PUB_SUB_EVENTS.cartUpdate, { source: 'timssan', productVariantId: id, cartData: d });
      const cb = $('#cart-icon-bubble'); if (cb) { cb.classList.remove('t-bump'); void cb.offsetWidth; cb.classList.add('t-bump'); }
      return true;
    } catch (e) { console.error(e); return false; }
    finally { if (btn) btn.removeAttribute('aria-busy'); }
  };
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-tm-add]'); if (!b || b.disabled) return;
    e.preventDefault(); TM.add(b.dataset.tmAdd, 1, b);
  });

  /* ---------- Signature « Built for everyday » : tracé exact du brand book ---------- */
  const bfe = () => $$('.t-script').forEach(el => {
    if (!el.classList.contains('t-bfe') && /^built for everyday$/i.test(el.textContent.trim())) { el.classList.add('t-bfe'); el.innerHTML = '<span class="t-sr">Built for everyday</span>'; }
  });
  bfe(); document.addEventListener('shopify:section:load', bfe);

  /* ---------- Cartes : photos qui défilent (doigt, flèches au survol, points) ---------- */
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-tm-ph-prev],[data-tm-ph-next]'); if (!b) return;
    e.preventDefault(); e.stopPropagation();
    const tr = b.closest('[data-tm-ph]').querySelector('[data-tm-track]'); if (!tr) return;
    const w = tr.clientWidth, n = tr.children.length, i = Math.round(tr.scrollLeft / w);
    const j = b.hasAttribute('data-tm-ph-next') ? (i + 1) % n : (i - 1 + n) % n;
    tr.scrollTo({ left: j * w, behavior: 'smooth' });
  });
  const dotsFor = tr => {
    const dots = tr.closest('[data-tm-ph]').querySelectorAll('.t-ph-dots i'); if (!dots.length) return;
    const i = Math.round(tr.scrollLeft / (tr.clientWidth || 1));
    dots.forEach((d, k) => d.classList.toggle('t-on', k === i));
  };
  document.addEventListener('scroll', e => { const t = e.target; if (t && t.matches && t.matches('[data-tm-track]')) dotsFor(t); }, true);
  /* Au survol (ordinateur) : les photos de la carte défilent toutes seules */
  if (window.matchMedia('(hover: hover)').matches) {
    let hovTimer = null, hovPh = null;
    const stop = () => { clearInterval(hovTimer); hovTimer = null; if (hovPh) { const tr = hovPh.querySelector('[data-tm-track]'); if (tr) tr.scrollTo({ left: 0, behavior: 'smooth' }); } hovPh = null; };
    document.addEventListener('mouseover', e => {
      const ph = e.target.closest && e.target.closest('[data-tm-ph]');
      if (ph === hovPh) return; stop(); if (!ph) return;
      const tr = ph.querySelector('[data-tm-track]'); if (!tr || tr.children.length < 2) return;
      hovPh = ph;
      const step = () => { const w = tr.clientWidth, n = tr.children.length, i = Math.round(tr.scrollLeft / w); tr.scrollTo({ left: ((i + 1) % n) * w, behavior: 'smooth' }); };
      setTimeout(() => { if (hovPh === ph) { step(); hovTimer = setInterval(step, 1100); } }, 350);
    });
  }
})();
