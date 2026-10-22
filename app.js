/* Timssan — maquette · logique commune (header, menus, recherche, panier) + initialisation par page */
(() => {
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const P = window.PRODUCTS, img = window.img;
const byId = id => P.find(p => p.id === id);
const eur = v => (Math.round(v * 100) / 100).toFixed(2).replace(".", ",").replace(",00", "") + " €";
const priceHTML = p => p.compare ? `<span class="price sale"><s>${eur(p.compare)}</s>${eur(p.price)}</span>` : `<span class="price">${eur(p.price)}</span>`;
const firstAvail = p => p.colors.findIndex(c => c.avail.length) ;
const inStock = p => p.colors.some(c => c.avail.length);
const ONERR = "this.onerror=null;this.style.visibility='hidden'";
const FREE = 80; // seuil livraison offerte (meta description du site actuel) — à confirmer
window.TIMSSAN = { $, $$, eur, priceHTML, byId };

/* ---------- Layout commun ---------- */
const page = document.body.dataset.page;
function header() {
  const nav = window.MENU.map(m => {
    const mega = m.cols ? `<div class="mega"><div class="wrap mega-in">
      ${m.cols.map(c => `<div><h6>${c.title}</h6><ul>${c.links.map(([t, h]) => `<li><a href="${h}">${t}</a></li>`).join("")}</ul></div>`).join("")}
      ${m.cols.length < 3 ? '<div></div>'.repeat(3 - m.cols.length) : ""}
      ${m.feature ? (f => `<a class="mega-feat" href="produit.html?p=${f.id}"><img src="${img(f.colors[0].imgs[0], 400)}" alt="${f.name}" loading="lazy" onerror="${ONERR}"><div><span class="mono muted">Le modèle du moment</span><b>${f.name}</b><span>${f.type}</span><br>${priceHTML(f)}</div></a>`)(byId(m.feature)) : ""}
    </div></div>` : "";
    const cur = location.href.includes(m.href) ? ' aria-current="page"' : "";
    return `<li><a href="${m.href}"${cur}>${m.label}${m.tag ? `<span class="tag mono">${m.tag}</span>` : ""}</a>${mega}</li>`;
  }).join("");
  return `
  <div class="announce mono" aria-label="Informations livraison"><div class="track">${("<span>Livraison offerte en 24/48h en France métropolitaine</span><span>Échange offert</span><span>Retours sous 14 jours</span><span>Paiement en 3 ou 4 fois sans frais</span><span>Cousu main à Casablanca depuis 2017</span>").repeat(2)}</div></div>
  <header class="site"><div class="wrap hd">
    <ul class="nav" role="menubar">${nav}</ul>
    <button class="burger icon-btn mono" id="burger" aria-expanded="false" aria-controls="mnav">Menu</button>
    <a class="logo" href="index.html" aria-label="Timssan, accueil"><img src="https://www.timssan.com/cdn/shop/files/logo_timssan_black.svg?v=1737025110&width=356" alt="Timssan" width="160" height="26" onerror="this.outerHTML='<span class=&quot;txt&quot;>TIMSSAN</span>'"></a>
    <div class="tools">
      <button class="icon-btn hide-xs" id="openSearch" aria-label="Rechercher">Rechercher</button>
      <a class="hide-s" href="index.html#club">Espace membres</a>
      <button class="cart-btn" id="cartBtn" aria-label="Ouvrir le panier">Panier <b id="cartCount">0</b></button>
    </div>
  </div></header>
  <nav class="mnav" id="mnav" aria-label="Menu mobile" aria-hidden="true">
    <div class="wrap mnav-top"><span class="mono">Menu</span><button class="icon-btn" id="closeMnav">Fermer ✕</button></div>
    <div class="wrap mnav-body">
      ${window.MENU.map(m => m.cols ? `<details><summary>${m.label}</summary><ul>${m.cols.flatMap(c => c.links).map(([t, h]) => `<li><a href="${h}">${t}</a></li>`).join("")}</ul></details>` : `<a class="solo" href="${m.href}">${m.label}${m.tag ? ` <span class="tag mono" style="font-size:11px">${m.tag}</span>` : ""}</a>`).join("")}
      <div class="mnav-foot"><a href="#" data-search>Rechercher un modèle</a><a href="index.html#club">Espace membres · fidélité &amp; parrainage</a><a href="index.html#taille">Guide des tailles</a><a href="#">Contact · FAQ</a></div>
    </div>
  </nav>
  <div class="search" id="search" aria-hidden="true" role="dialog" aria-label="Recherche">
    <div class="wrap">
      <form id="sForm" role="search"><label for="sIn" class="sr">Rechercher</label><input id="sIn" type="search" placeholder="Jogpant, denim, noir…" autocomplete="off"><button type="button" class="icon-btn" id="closeSearch">Fermer ✕</button></form>
      <div class="search-pop"><span class="mono muted" style="align-self:center">Populaire</span>${["Jogpant", "Denim", "Noir", "Bermuda", "Parfum"].map(t => `<button class="chip" data-q="${t}">${t}</button>`).join("")}</div>
      <div class="search-res" id="sRes"></div>
    </div>
  </div>
  <div class="scrim" id="scrim"></div>
  <aside class="cart" id="cart" aria-hidden="true" aria-label="Panier">
    <div class="cart-top"><h2>Ton panier</h2><button class="icon-btn" id="closeCart">Fermer ✕</button></div>
    <div class="ship" id="ship"></div>
    <div class="cart-body" id="cartBody"></div>
    <div class="upsell" id="upsell"></div>
    <div class="cart-foot" id="cartFoot"></div>
  </aside>
  <div class="toast" id="toast" role="status" aria-live="polite"></div>
  <div class="mk mono">Maquette · Monsieur.H</div>`;
}
function footer() {
  return `<footer><div class="wrap">
    <div class="ft">
      <div><h5 class="mono">Timssan</h5><p style="margin:0 0 18px;max-width:36ch">Marque française de jogpants et pantalons confortables pour homme. Des pièces durables, confectionnées à la main dans notre atelier de Casablanca depuis 2017.</p>
        <div class="pay mono">${["CB", "Visa", "Mastercard", "Amex", "Apple Pay", "PayPal", "Shop Pay", "Bancontact"].map(x => `<span>${x}</span>`).join("")}</div></div>
      <div><h5 class="mono">Collections</h5><ul><li><a href="collection.html?c=jogpants">Jogpants</a></li><li><a href="collection.html?c=pantalons-7-8">Pantalons 7/8</a></li><li><a href="collection.html?c=pantalons">Classiques</a></li><li><a href="collection.html?c=bermudas-longs">Bermudas longs</a></li><li><a href="collection.html?c=hauts">T-shirts &amp; chemises</a></li><li><a href="produit.html?p=parfum-22-09">Le Parfum</a></li></ul></div>
      <div><h5 class="mono">Service client</h5><ul><li><a href="index.html#club">Fidélité &amp; parrainage</a></li><li><a href="index.html#taille">Guide des tailles</a></li><li><a href="#">FAQ</a></li><li><a href="#">Contact</a></li><li><a href="index.html#avis">Avis clients</a></li></ul></div>
      <div><h5 class="mono">La maison</h5><ul><li><a href="index.html#atelier">Notre histoire</a></li><li><a href="index.html#atelier">L'atelier</a></li><li><a href="#">CGV</a></li><li><a href="#">Retours &amp; remboursements</a></li><li><a href="#">Mentions légales</a></li></ul></div>
    </div>
    <div class="wordmark" aria-hidden="true">TIMSSAN</div>
    <div class="legal"><span>© 2026 Timssan · Tous droits réservés</span><span class="credit">Développé par <a href="#">Monsieur.H</a></span></div>
  </div></footer>`;
}
document.body.insertAdjacentHTML("afterbegin", header());
document.body.insertAdjacentHTML("beforeend", footer());

/* ---------- Ouverture / fermeture des panneaux ---------- */
const scrim = $("#scrim");
let openPanel = null;
function show(el) { hideAll(); el.classList.add("on"); el.setAttribute("aria-hidden", "false"); scrim.classList.add("on"); document.body.classList.add("lock"); openPanel = el; }
function hideAll() { $$(".mnav,.search,.cart").forEach(e => { e.classList.remove("on"); e.setAttribute("aria-hidden", "true"); }); $$(".modal").forEach(m => m.classList.remove("on")); scrim.classList.remove("on"); document.body.classList.remove("lock"); $("#burger").setAttribute("aria-expanded", "false"); openPanel = null; }
window.TIMSSAN.hideAll = hideAll; window.TIMSSAN.lock = () => document.body.classList.add("lock");
scrim.onclick = hideAll;
document.addEventListener("keydown", e => { if (e.key === "Escape") hideAll(); });
$("#burger").onclick = () => { show($("#mnav")); $("#burger").setAttribute("aria-expanded", "true"); };
$("#closeMnav").onclick = hideAll;
$("#closeCart").onclick = hideAll;
$("#cartBtn").onclick = () => { renderCart(); show($("#cart")); };

/* ---------- Recherche ---------- */
function openSearch() { show($("#search")); setTimeout(() => $("#sIn").focus(), 60); runSearch(""); }
$("#openSearch").onclick = openSearch;
$$("[data-search]").forEach(a => a.onclick = e => { e.preventDefault(); openSearch(); });
$("#closeSearch").onclick = hideAll;
function norm(s) { return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); }
function runSearch(q) {
  const n = norm(q.trim());
  const res = (n ? P.filter(p => norm([p.name, p.type, p.cat, p.desc, ...p.colors.map(c => c.name)].join(" ")).includes(n)) : P.slice(0, 6)).slice(0, 6);
  $("#sRes").innerHTML = res.length ? res.map(p => `<a href="produit.html?p=${p.id}"><img src="${img(p.colors[Math.max(0, firstAvail(p))].imgs[0], 400)}" alt="" loading="lazy" onerror="${ONERR}"><span>${p.name}<br><span class="muted" style="font-weight:400">${p.type}</span></span>${priceHTML(p)}</a>`).join("")
    : `<p class="muted" style="grid-column:1/-1">Aucun modèle pour « ${q} ». Essaie « jogpant » ou « denim ».</p>`;
}
$("#sIn").oninput = e => runSearch(e.target.value);
$("#sForm").onsubmit = e => { e.preventDefault(); const a = $("#sRes a"); if (a) location.href = a.href; };
$$(".search-pop .chip").forEach(c => c.onclick = () => { $("#sIn").value = c.dataset.q; runSearch(c.dataset.q); });

/* ---------- Panier (localStorage pour suivre d'une page à l'autre) ---------- */
let cart = [];
try { cart = JSON.parse(localStorage.getItem("timssan-cart") || "[]"); } catch (e) { cart = []; }
const save = () => { try { localStorage.setItem("timssan-cart", JSON.stringify(cart)); } catch (e) {} };
const total = () => cart.reduce((s, l) => s + byId(l.id).price * l.qty, 0);
function count() { const n = cart.reduce((s, l) => s + l.qty, 0); $("#cartCount").textContent = n; }
function add(id, color, size, qty = 1) {
  const l = cart.find(x => x.id === id && x.color === color && x.size === size);
  l ? l.qty += qty : cart.push({ id, color, size, qty });
  save(); count();
  const b = $("#cartBtn"); b.classList.remove("bump"); void b.offsetWidth; b.classList.add("bump");
  const p = byId(id);
  toast(`${p.name} · ${size} ajouté au panier`);
}
window.TIMSSAN.add = add;
function renderCart() {
  const t = total(), left = Math.max(0, FREE - t);
  $("#ship").innerHTML = t === 0 ? `<span>Livraison offerte en 24/48h dès ${FREE} €</span><div class="ship-bar"><i style="width:0"></i></div>`
    : left > 0 ? `<span>Plus que <b>${eur(left)}</b> pour la livraison offerte</span><div class="ship-bar"><i style="width:${Math.min(100, t / FREE * 100)}%"></i></div>`
    : `<span><b>Livraison offerte</b> en 24/48h · échange offert</span><div class="ship-bar"><i style="width:100%"></i></div>`;
  $("#cartBody").innerHTML = cart.length ? cart.map((l, i) => {
    const p = byId(l.id), c = p.colors.find(x => x.name === l.color) || p.colors[0];
    return `<div class="line"><a href="produit.html?p=${p.id}"><img src="${img(c.imgs[0], 240)}" alt="${p.name}" onerror="${ONERR}"></a><div>
      <div style="display:flex;justify-content:space-between;gap:10px"><h4>${p.name}</h4><span class="price">${eur(p.price * l.qty)}</span></div>
      <div class="meta">${p.type}<br>${p.colors.length > 1 ? c.name + " · " : ""}Taille ${l.size}</div>
      <div class="bot"><div class="qty"><button data-q="-1" data-i="${i}" aria-label="Retirer un">−</button><span>${l.qty}</span><button data-q="1" data-i="${i}" aria-label="Ajouter un">+</button></div><button class="rm" data-rm="${i}">Retirer</button></div>
    </div></div>`;
  }).join("") : `<div class="empty"><p class="disp" style="font-size:44px">Ton panier<br>est vide.</p><p class="muted" style="margin:0">Commence par le modèle qui a fait la maison.</p><a class="btn" href="collection.html?c=jogpants">Voir les jogpants →</a></div>`;
  const up = byId(cart.some(l => l.id === "parfum-22-09") ? "blevo" : "parfum-22-09");
  $("#upsell").innerHTML = cart.length ? `<div class="mono muted" style="margin-bottom:10px">Souvent acheté avec</div><a href="produit.html?p=${up.id}"><img src="${img(up.colors[0].imgs[0], 160)}" alt="" onerror="${ONERR}"><span><b>${up.name}</b><br><span class="muted">${up.type}</span></span>${priceHTML(up)}</a>` : "";
  $("#upsell").hidden = !cart.length;
  $("#cartFoot").innerHTML = cart.length ? `<div class="tot"><span>Total</span><span>${eur(t)}</span></div><button class="btn block" id="checkout">Valider mon panier · ${eur(t)}</button><small>ou 3 × ${eur(t / 3)} sans frais · Paiement 100 % sécurisé</small>` : "";
  const co = $("#checkout"); if (co) co.onclick = () => toast("Maquette : le paiement se fera via le checkout Shopify");
}
$("#cart").addEventListener("click", e => {
  const q = e.target.closest("[data-q]"), r = e.target.closest("[data-rm]");
  if (q && q.dataset.i !== undefined) { const l = cart[+q.dataset.i]; l.qty += +q.dataset.q; if (l.qty < 1) cart.splice(+q.dataset.i, 1); }
  else if (r) cart.splice(+r.dataset.rm, 1); else return;
  save(); count(); renderCart();
});
window.TIMSSAN.openCart = () => { renderCart(); show($("#cart")); };
count();

let tt; function toast(m) { const el = $("#toast"); el.textContent = m; el.classList.add("on"); clearTimeout(tt); tt = setTimeout(() => el.classList.remove("on"), 2600); }
window.TIMSSAN.toast = toast;

/* ---------- Carte produit (réutilisée partout) ---------- */
window.TIMSSAN.card = function (p) {
  const ci = Math.max(0, firstAvail(p)), c = p.colors[ci];
  const a = c.imgs[0], b = c.imgs[1] || (p.colors[1] && p.colors[1].imgs[0]) || a;
  const soldOut = !inStock(p);
  return `<article class="card" data-cat="${p.cat}" data-price="${p.price}">
    <div class="ph">
      <a class="ph-link" href="produit.html?p=${p.id}" aria-label="${p.name}, ${p.type}">
        <img class="a" src="${img(a, 800)}" alt="${p.name} — ${p.type}" loading="lazy" width="800" height="1200" onerror="${ONERR}">
        <img class="b" src="${img(b, 800)}" alt="" loading="lazy" width="800" height="1200" onerror="${ONERR}">
      </a>
      ${p.badge ? `<span class="badge mono${p.badge === "Best-seller" ? " dk" : ""}">${p.badge}</span>` : ""}
      ${soldOut ? `<span class="oos mono">Épuisé</span>` : p.cat === "parfum" ? "" : `<div class="qadd"><span class="mono muted">Ajout rapide${p.colors.length > 1 ? " · " + c.name : ""}</span><div class="s">${p.sizes.map(s => `<button ${c.avail.includes(s) ? "" : "disabled"} data-qa="${p.id}|${c.name}|${s}" aria-label="Ajouter ${p.name} taille ${s}">${s}</button>`).join("")}</div></div>`}
    </div>
    <a class="info" href="produit.html?p=${p.id}">
      <div class="row"><h3>${p.name}<span>${p.type}</span></h3>${priceHTML(p)}</div>
      <div class="row"><div class="swatches">${p.cat === "parfum" ? "" : p.colors.map(x => `<i style="background:${x.hex}" title="${x.name}"></i>`).join("")}</div><span class="mono muted">${p.colors.length > 1 ? p.colors.length + " couleurs" : ""}</span></div>
    </a>
  </article>`;
};
document.addEventListener("click", e => {
  const q = e.target.closest("[data-qa]"); if (!q) return;
  e.preventDefault(); const [id, color, size] = q.dataset.qa.split("|"); add(id, color, size);
});

/* ---------- Guide des tailles (modale partagée) ---------- */
const SIZE_ROWS = [["38", "74 – 79", "S"], ["40", "80 – 84", "M"], ["42", "85 – 89", "L"], ["44", "90 – 95", "XL"], ["46", "96 – 102", "XXL"]];
document.body.insertAdjacentHTML("beforeend", `<div class="modal" id="sizeModal" role="dialog" aria-modal="true" aria-labelledby="sgT"><div class="modal-in">
  <button class="x" data-close>Fermer ✕</button>
  <span class="mono muted">Guide des tailles</span><h2 id="sgT">Trouve ta taille</h2>
  <p style="margin:0">Mesure ton tour de taille au niveau du nombril, ou pose à plat un pantalon qui te va bien et multiplie la largeur de la ceinture par deux. Entre deux tailles, prends la plus petite : la toile s'assouplit au porter.</p>
  <div class="tbl-wrap"><table class="ptable"><thead><tr><th>Taille FR</th><th>Tour de taille (cm)</th><th>Équivalent</th></tr></thead><tbody>${SIZE_ROWS.map(r => `<tr><td><b>${r[0]}</b></td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join("")}</tbody></table></div>
  <p class="note" style="margin:0">Barème indicatif de la maquette, à remplacer par le guide officiel Timssan.</p>
</div></div>`);
window.TIMSSAN.SIZE_ROWS = SIZE_ROWS;
window.TIMSSAN.openSizes = () => { $("#sizeModal").classList.add("on"); document.body.classList.add("lock"); };
document.addEventListener("click", e => {
  if (e.target.closest("[data-close]") || e.target.classList.contains("modal")) { $$(".modal").forEach(m => m.classList.remove("on")); if (!openPanel) document.body.classList.remove("lock"); }
  if (e.target.closest("[data-sizes]")) { e.preventDefault(); window.TIMSSAN.openSizes(); }
});

/* ---------- SEO : balises dynamiques ---------- */
window.TIMSSAN.seo = (title, desc, ld) => {
  document.title = title;
  let m = $('meta[name="description"]'); if (!m) { m = document.createElement("meta"); m.name = "description"; document.head.appendChild(m); }
  m.content = desc;
  if (ld) { const s = document.createElement("script"); s.type = "application/ld+json"; s.textContent = JSON.stringify(ld); document.head.appendChild(s); }
};
})();
