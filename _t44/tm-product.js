/* Timssan — fiche produit : galerie (photos + vidéos), couleurs, pop-up de taille, alerte retour en stock Klaviyo */
(() => {
  document.querySelectorAll('[data-tm-product]').forEach(root => {
    if (root.dataset.ready) return; root.dataset.ready = '1';
    const $ = s => root.querySelector(s), $$ = s => [...root.querySelectorAll(s)];
    let P; try { P = JSON.parse($('[data-tm-product-json]').textContent); } catch (e) { return; }
    const TM = window.TM || {}, money = TM.money || (c => (c / 100).toFixed(2) + ' €');
    const CI = P.colorIndex, SI = P.sizeIndex;
    let cur = P.variants.find(v => v.id === P.current) || P.variants[0];
    const color = () => (CI === null ? null : cur.options[CI]);

    /* ---------- Galerie ---------- */
    const track = $('[data-track]'), stage = $('[data-stage]');
    const allSlides = $$('.t-pg-slide'), allThumbs = $$('[data-thumbs] button');
    const colorNames = CI === null ? [] : [...new Set(P.variants.map(v => v.options[CI].toLowerCase()))];
    const groupByAlt = allSlides.some(s => colorNames.includes((s.dataset.alt || '').toLowerCase()));
    let vis = [], idx = 0;
    /* Regroupement par couleur via l'image mise en avant de chaque variante */
    const starts = {};
    if (!groupByAlt && CI !== null) P.variants.forEach(v => {
      if (!v.media) return; const i = allSlides.findIndex(s => s.dataset.mediaId == v.media); if (i < 0) return;
      const k = v.options[CI].toLowerCase(); if (starts[k] === undefined || i < starts[k]) starts[k] = i;
    });
    const startList = Object.entries(starts).sort((a, b) => a[1] - b[1]);
    const groupByVariant = startList.length > 1;
    const rangeOf = c => { const k = startList.findIndex(e => e[0] === c); if (k < 0) return null; return [startList[k][1], k + 1 < startList.length ? startList[k + 1][1] : allSlides.length]; };
    function filter() {
      const c = (color() || '').toLowerCase();
      const rg = groupByVariant ? rangeOf(c) : null;
      vis = allSlides.map((s, i) => i).filter(i => {
        if (rg) return (i >= rg[0] && i < rg[1]) || (i < startList[0][1]);
        if (!groupByAlt) return true;
        const a = (allSlides[i].dataset.alt || '').toLowerCase();
        return !colorNames.includes(a) || a === c;
      });
      allSlides.forEach((s, i) => { s.hidden = !vis.includes(i); });
      allThumbs.forEach((b, i) => { b.hidden = !vis.includes(i); });
      const dots = $('[data-dots]'); if (dots) dots.innerHTML = vis.length <= 10 ? vis.map(() => '<i></i>').join('') : '';
    }
    function syncVideos() {
      allSlides.forEach((s, i) => {
        const v = s.querySelector('video'); if (!v) return;
        if (i === vis[idx]) { v.muted = true; const p = v.play(); if (p && p.catch) p.catch(() => {}); } else v.pause();
      });
    }
    function go(n, instant) {
      const len = vis.length || 1; idx = ((n % len) + len) % len;
      if (instant) track.style.transition = 'none';
      track.style.transform = `translateX(${-idx * 100}%)`;
      if (instant) { void track.offsetWidth; track.style.transition = ''; }
      const cnt = $('[data-count]'); if (cnt) cnt.textContent = String(idx + 1).padStart(2, '0') + ' / ' + String(len).padStart(2, '0');
      allThumbs.forEach((b, i) => b.setAttribute('aria-current', String(i === vis[idx])));
      $$('[data-dots] i').forEach((d, k) => d.classList.toggle('t-on', k === idx));
      const tb = allThumbs[vis[idx]]; if (tb && tb.scrollIntoView && matchMedia('(min-width:1081px)').matches) tb.scrollIntoView({ block: 'nearest' });
      syncVideos();
    }
    function goToMedia(id) {
      const i = allSlides.findIndex(s => s.dataset.mediaId == id); const k = vis.indexOf(i);
      if (k >= 0) go(k, true);
    }
    root.addEventListener('click', e => {
      const t = e.target.closest('[data-thumbs] button'); if (t) { const k = vis.indexOf(+t.dataset.i); if (k >= 0) go(k); }
      if (e.target.closest('[data-prev]')) go(idx - 1);
      if (e.target.closest('[data-next]')) go(idx + 1);
    });
    $('[data-thumbs]') && $('[data-thumbs]').addEventListener('mouseover', e => { const b = e.target.closest('button'); if (b && matchMedia('(hover:hover)').matches) { const k = vis.indexOf(+b.dataset.i); if (k >= 0 && k !== idx) go(k); } });
    let x0 = null, y0 = null, moved = false;
    stage.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; moved = false; }, { passive: true });
    stage.addEventListener('touchmove', e => { if (x0 === null) return; const dx = e.touches[0].clientX - x0, dy = e.touches[0].clientY - y0; if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 8) { moved = true; track.style.transition = 'none'; track.style.transform = `translateX(calc(${-idx * 100}% + ${dx}px))`; } }, { passive: true });
    stage.addEventListener('touchend', e => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; track.style.transition = ''; if (moved && Math.abs(dx) > 50) go(idx + (dx < 0 ? 1 : -1)); else go(idx); x0 = null; });
    /* le carrousel fonctionne par index visible : on réordonne le DOM visible */
    const origTransform = () => {};
    filter(); go(0, true);
    if (cur.media) goToMedia(cur.media);

    /* ---------- Couleurs ---------- */
    function setVariant(v) {
      cur = v;
      const input = document.querySelector('#tmProductForm [data-variant-input]'); if (input) input.value = v.id;
      const pr = $('[data-price]');
      if (pr) {
        const pct = v.compare > v.price ? Math.round((v.compare - v.price) * 100 / v.compare) : 0;
        pr.innerHTML = (v.compare > v.price ? `<span class="t-price t-sale"><s>${money(v.compare)}</s>${money(v.price)}</span><span class="t-badge t-label" style="position:static">-${pct} %</span>` : `<span class="t-price">${money(v.price)}</span>`);
      }
      const cn = $('[data-cname]'); if (cn && CI !== null) cn.textContent = v.options[CI];
      $$('[data-color]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.color === color())));
      const meta = $('[data-sb-meta]'); if (meta) meta.textContent = money(v.price) + (CI !== null ? ' · ' + v.options[CI] : '');
      try { const u = new URL(location.href); u.searchParams.set('variant', v.id); history.replaceState(null, '', u); } catch (e) {}
      const idp = $('[data-idcard-img] img'); if (idp && v.img) { idp.src = v.img; idp.removeAttribute('srcset'); }
      const sk = $('[data-stock]'); if (sk) sk.hidden = !v.available;
    }
    /* ---------- En stock : date de livraison estimée (règles de l'ancien site) ---------- */
    const sk = $('[data-stock]');
    if (sk) {
      const cutoff = +sk.dataset.cutoff || 12;
      const hol = (sk.dataset.holidays || '').split(',').map(x => x.trim()).filter(Boolean);
      const key = d => `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
      const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Paris' }));
      const am = now.getHours() < cutoff;
      /* lun→mer/jeu, mar→jeu/ven, mer→ven/sam, jeu→sam/lun, ven→lun/mar, sam & dim→mar */
      const add = { 1: am ? 2 : 3, 2: am ? 2 : 3, 3: am ? 2 : 3, 4: am ? 2 : 4, 5: am ? 3 : 4, 6: 3, 0: 2 }[now.getDay()];
      const d = new Date(now); d.setDate(d.getDate() + add);
      /* un jour férié sur le trajet décale d'un jour (jamais un dimanche) */
      for (let i = 0, t = new Date(now); i < add; i++) { t.setDate(t.getDate() + 1); if (t.getDay() !== 0 && t.getDay() !== 6 && hol.includes(key(t))) d.setDate(d.getDate() + 1); }
      while (d.getDay() === 0 || hol.includes(key(d))) d.setDate(d.getDate() + 1);
      const out = sk.querySelector('[data-stock-date]');
      if (out) out.textContent = d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
    }
    root.addEventListener('click', e => {
      const b = e.target.closest('[data-color]'); if (!b) return;
      const c = b.dataset.color; if (c === color()) return;
      const same = P.variants.filter(v => v.options[CI] === c);
      const v = same.find(x => x.available) || same[0]; if (!v) return;
      setVariant(v); filter(); go(0, true); if (v.media) goToMedia(v.media);
    });

    /* ---------- Pop-up de taille : un toucher = ajout au panier ---------- */
    const sheet = $('[data-sheet]'), list = $('[data-ss-list]');
    let rec = null, notifyV = null, lastFocus = null;
    const sizesFor = () => P.variants.filter(v => CI === null || v.options[CI] === color());
    function renderSheet() {
      const meta = $('[data-ss-meta]'); if (meta) meta.textContent = money(cur.price) + (CI !== null ? ' · ' + color() : '');
      list.innerHTML = sizesFor().map(v => {
        const s = SI === null ? v.options.join(' / ') : v.options[SI];
        const ok = v.available, low = ok && v.qty !== null && v.qty > 0 && v.qty <= P.low;
        const st = ok ? `<i class="t-ss-ok"></i>${low ? 'Plus que quelques pièces' : 'En stock'}` : (P.drop ? `<span class="t-ss-drop">${P.drop.replace(/[<>&]/g, '')}</span>` : 'Épuisé');
        const isRec = rec && String(s) === String(rec);
        const can = ok || !!P.nmode;
        return `<button type="button" data-v="${v.id}" class="t-ss-row${ok ? '' : ' t-out'}${can ? '' : ' t-dead'}${low ? ' t-low' : ''}${notifyV === v.id ? ' t-on' : ''}${isRec ? ' t-rec' : ''}"${can ? '' : ' disabled'} aria-label="${ok ? `Choisir la taille ${s} et l'ajouter au panier` : can ? `Taille ${s} épuisée, ${P.nmode === 'drop' ? "s'inscrire au drop" : 'être prévenu de son retour'}` : `Taille ${s} épuisée`}"><span class="t-ss-size">${s}</span><span class="t-ss-st">${st}${isRec ? ' <em>Conseillé pour vous</em>' : ''}</span>${can ? `<span class="t-ss-go" aria-hidden="true">${ok ? 'Choisir' : P.nmode === 'drop' ? "M'inscrire" : 'Me prévenir'}</span>` : ''}</button>`;
      }).join('');
    }
    function openSheet() {
      if (P.variants.length === 1 && P.variants[0].available) { TM.add && TM.add(P.variants[0].id); return; }
      lastFocus = document.activeElement; notifyV = null;
      const n = $('[data-ss-notify]'); if (n) n.hidden = true; const m = $('[data-ss-msg]'); if (m) m.textContent = '';
      renderSheet();
      sheet.classList.add('t-on'); sheet.setAttribute('aria-hidden', 'false'); document.body.classList.add('t-lock');
      setTimeout(() => { const c = $('[data-ss-close]'); if (c) c.focus({ preventScroll: true }); }, 60);
    }
    function closeSheet() { sheet.classList.remove('t-on'); sheet.setAttribute('aria-hidden', 'true'); document.body.classList.remove('t-lock'); if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true }); }
    root.addEventListener('click', async e => {
      if (e.target.closest('[data-open-size]')) { openSheet(); return; }
      if (e.target.closest('[data-ss-close]') || e.target === sheet) { closeSheet(); return; }
      const row = e.target.closest('[data-v]'); if (!row) return;
      const v = P.variants.find(x => x.id == row.dataset.v);
      if (row.classList.contains('t-dead')) return;
      if (row.classList.contains('t-out')) {
        notifyV = v.id;
        const n = $('[data-ss-notify]'); n.hidden = false; $('[data-ss-msg]').textContent = '';
        $('[data-ss-notify-t]').textContent = P.nmode === 'drop' ? `${P.drop} · recevoir l'alerte du lancement (${SI === null ? 'produit' : 'taille ' + v.options[SI]})` : `Être prévenu dès que le ${SI === null ? 'produit' : v.options[SI]} est de retour`;
        renderSheet(); setTimeout(() => n.querySelector('input').focus(), 30);
      } else {
        row.setAttribute('aria-busy', 'true');
        setVariant(v); closeSheet();
        if (TM.add) await TM.add(v.id); else document.getElementById('tmProductForm').submit();
      }
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && sheet.classList.contains('t-on') && !document.querySelector('#tmSizeModal.t-on')) closeSheet(); });

    /* Calculateur dans la pop-up : surligne la taille conseillée */
    const fd = $('[data-ss-find]');
    if (fd && TM.bindFinder) {
      const f = fd.querySelector('[data-finder]');
      TM.bindFinder(f, r => { rec = fd.open && r ? r.size : null; if (sheet.classList.contains('t-on')) renderSheet(); });
      fd.addEventListener('toggle', () => { if (f._run) f._run(); if (!fd.open) rec = null; renderSheet(); });
    }

    /* Alerte retour en stock : API publique Klaviyo (Back in Stock) */
    const nf = $('[data-ss-notify-f]');
    if (nf) nf.addEventListener('submit', async e => {
      e.preventDefault();
      const input = nf.querySelector('input'), msg = $('[data-ss-msg]'), email = input.value.trim();
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { msg.textContent = 'Vérifiez votre adresse e-mail : il manque le @ ou le domaine.'; return; }
      if (!P.klaviyo || !notifyV) { msg.textContent = "Le service d'alerte n'est pas encore configuré."; return; }
      msg.textContent = 'Envoi…';
      try {
        const r = await fetch(`https://a.klaviyo.com/client/back-in-stock-subscriptions/?company_id=${encodeURIComponent(P.klaviyo)}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/vnd.api+json', Accept: 'application/vnd.api+json', revision: '2024-10-15' },
          body: JSON.stringify({ data: { type: 'back-in-stock-subscription', attributes: { channels: ['EMAIL'], profile: { data: { type: 'profile', attributes: { email } } } }, relationships: { variant: { data: { type: 'catalog-variant', id: `$shopify:::$default:::${notifyV}` } } } } })
        });
        if (r.ok || r.status === 202) { const v = P.variants.find(x => x.id === notifyV); msg.textContent = P.nmode === 'drop' ? `C'est noté : vous êtes sur la liste du drop (${SI === null ? 'produit' : 'taille ' + v.options[SI]}).` : `C'est noté : on vous écrit dès que le ${SI === null ? 'produit' : v.options[SI]} est de retour.`; input.value = ''; }
        else msg.textContent = "L'inscription n'a pas fonctionné, réessayez dans un instant.";
      } catch (err) { msg.textContent = "L'inscription n'a pas fonctionné, réessayez dans un instant."; }
    });

    /* Barre d'achat mobile : visible tant que le bouton principal n'est pas à l'écran */
    const main = root.querySelector('.t-cta [data-open-size]'), sticky = $('[data-sticky]');
    if (main && sticky && 'IntersectionObserver' in window) new IntersectionObserver(([en]) => sticky.classList.toggle('t-on', !en.isIntersecting)).observe(main);
  });
})();
