/* Timssan — maquette · logique commune (header, menus, recherche, panier) + initialisation par page */
(() => {
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const P = window.PRODUCTS, img = window.img;
const byId = id => P.find(p => p.id === id);
const purl = p => (p.cat === "parfum" ? "parfum.html?p=" : "produit.html?p=") + p.id;
window.TIMSSAN_PURL = purl;
const eur = v => (Math.round(v * 100) / 100).toFixed(2).replace(".", ",").replace(",00", "") + " €";
const priceHTML = p => p.compare ? `<span class="price sale"><s>${eur(p.compare)}</s>${eur(p.price)}</span>` : `<span class="price">${eur(p.price)}</span>`;
const firstAvail = p => p.colors.findIndex(c => c.avail.length) ;
const inStock = p => p.colors.some(c => c.avail.length);
const ONERR = "this.onerror=null;this.style.visibility='hidden'";
const FREE = 80; // seuil livraison offerte (meta description du site actuel) — à confirmer
window.TIMSSAN = { $, $$, eur, priceHTML, byId, purl };

/* ---------- Layout commun ---------- */
const page = document.body.dataset.page;
function header() {
  const nav = window.MENU.map(m => {
    const mega = m.cols ? `<div class="mega"><div class="wrap mega-in">
      ${m.cols.map(c => `<div><h6>${c.title}</h6><ul>${c.links.map(([t, h]) => `<li><a href="${h}">${t}</a></li>`).join("")}</ul></div>`).join("")}
      ${m.cols.length < 3 ? '<div></div>'.repeat(3 - m.cols.length) : ""}
      ${m.feature ? (f => `<a class="mega-feat" href="${purl(f)}"><img src="${img(f.colors[0].imgs[0], 400)}" alt="${f.name}" loading="lazy" onerror="${ONERR}"><div><span class="mono muted">Le modèle du moment</span><b>${f.name}</b><span>${f.type}</span><br>${priceHTML(f)}</div></a>`)(byId(m.feature)) : ""}
    </div></div>` : "";
    const cur = location.href.includes(m.href) ? ' aria-current="page"' : "";
    return `<li><a href="${m.href}"${cur}>${m.label}${m.tag ? `<span class="tag mono">${m.tag}</span>` : ""}</a>${mega}</li>`;
  }).join("");
  return `
  <div class="announce mono" aria-label="Informations livraison"><div class="track">${("<span>Livraison offerte en 24/48h</span><span>Échange offert</span><span>14 jours pour changer d'avis</span><span>Paiement en 3 ou 4 fois sans frais</span><span>Confectionné à Casablanca</span>").repeat(2)}</div></div>
  <header class="site"><div class="wrap hd">
    <ul class="nav" role="menubar">${nav}</ul>
    <button class="burger icon-btn mono" id="burger" aria-expanded="false" aria-controls="mnav">Menu</button>
    <a class="logo" href="index.html" aria-label="Timssan, accueil"><span class="lockup"><b>TIMSSAN</b><small>BUILT FOR EVERYDAY</small><sup>™</sup></span></a>
    <div class="tools">
      <button class="icon-btn hide-xs" id="openSearch" aria-label="Rechercher">Rechercher</button>
      <a class="hide-s" href="index.html#club">Espace membres</a>
      <button class="cart-btn" id="cartBtn" aria-label="Ouvrir le panier"><svg class="bag" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14l-1 13H6L5 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg><span class="cb-l">Panier</span> <b id="cartCount">0</b></button>
    </div>
  </div></header>
  <nav class="mnav" id="mnav" aria-label="Menu mobile" aria-hidden="true">
    <div class="wrap mnav-top"><span class="mono">Menu</span><button class="icon-btn" id="closeMnav">Fermer ✕</button></div>
    <div class="wrap mnav-body">
      ${window.MENU.map(m => m.cols ? `<details><summary>${m.label}</summary><ul>${m.cols.flatMap(c => c.links).map(([t, h]) => `<li><a href="${h}">${t}</a></li>`).join("")}</ul></details>` : `<a class="solo" href="${m.href}">${m.label}${m.tag ? ` <span class="tag mono" style="font-size:11px">${m.tag}</span>` : ""}</a>`).join("")}
      <div class="mnav-foot"><span class="script">Built for everyday</span><a href="#" data-search>Rechercher un modèle</a><a href="index.html#club">Espace membres · fidélité &amp; parrainage</a><a href="index.html#taille">Guide des tailles</a><a href="#">Contact · FAQ</a></div>
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
    <div class="cart-top"><h2>Votre panier</h2><button class="icon-btn" id="closeCart">Fermer ✕</button></div>
    <div class="ship" id="ship"></div>
    <div class="cart-body" id="cartBody"></div>
    <div class="upsell" id="upsell"></div>
    <div class="cart-foot" id="cartFoot"></div>
  </aside>
  <div class="toast" id="toast" role="status" aria-live="polite"></div>
  <div class="mk mono">Maquette · Monsieur.H</div>`;
}
const MONO = `<svg viewBox="0 0 46 52" aria-hidden="true"><path d="M2 0h42a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H34v37a2 2 0 0 1-2 2h-7.5V14h-3v38H14a2 2 0 0 1-2-2V13H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z"/></svg>`;
window.TIMSSAN_MONO = MONO;
function footer() {
  return `<footer><div class="wrap">
    <div class="ft">
      <div><h5>Timssan</h5><p style="margin:0 0 18px;max-width:38ch">Des pantalons casual premium, bien coupés et agréables à porter, fabriqués dans le respect de l'humain et du savoir-faire. Confectionnés à Casablanca.</p>
        <ul class="pay" aria-label="Moyens de paiement acceptés">${[["cartes_bancaires", "CB"], ["visa", "Visa"], ["master", "Mastercard"], ["american_express", "American Express"], ["apple_pay", "Apple Pay"], ["google_pay", "Google Pay"], ["paypal", "PayPal"], ["shopify_pay", "Shop Pay"]].map(([f, n]) => `<li><img src="pay/${f}.svg" alt="${n}" title="${n}" width="38" height="24" loading="lazy"></li>`).join("")}</ul></div>
      <div><h5>Collections</h5><ul><li><a href="collection.html?c=jogpants">Jogpants</a></li><li><a href="collection.html?c=pantalons-7-8">Pantalons 7/8</a></li><li><a href="collection.html?c=pantalons">Classiques</a></li><li><a href="collection.html?c=bermudas-longs">Bermudas longs</a></li><li><a href="collection.html?c=hauts">T-shirts &amp; chemises</a></li><li><a href="parfum.html?p=parfum-22-09">Le Parfum</a></li></ul></div>
      <div><h5>Service</h5><ul><li><a href="index.html#club">Fidélité &amp; parrainage</a></li><li><a href="index.html#taille">Guide des tailles</a></li><li><a href="#">FAQ · Contact</a></li><li><a href="index.html#avis">Avis clients</a></li></ul></div>
      <div><h5>La maison</h5><ul><li><a href="index.html#manifeste">Le manifeste</a></li><li><a href="#">CGV</a></li><li><a href="#">Retours &amp; remboursements</a></li><li><a href="#">Mentions légales</a></li></ul></div>
    </div>
    <div class="foot-sign">
      <div class="wordmark" aria-hidden="true"><b>TIMSSAN</b><small>BUILT FOR EVERYDAY</small></div>
      <div style="display:grid;gap:18px;justify-items:end"><span class="script">Built for everyday</span><div class="foot-mono" style="color:var(--bg)">${MONO}</div></div>
    </div>
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
  $("#sRes").innerHTML = res.length ? res.map(p => `<a href="${purl(p)}"><img src="${img(p.colors[Math.max(0, firstAvail(p))].imgs[0], 400)}" alt="" loading="lazy" onerror="${ONERR}"><span>${p.name}<br><span class="muted" style="font-weight:400">${p.type}</span></span>${priceHTML(p)}</a>`).join("")
    : `<p class="muted" style="grid-column:1/-1">Aucun modèle pour « ${q} ». Essayez « jogpant » ou « denim ».</p>`;
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
    return `<div class="line"><a href="${purl(p)}"><img src="${img(c.imgs[0], 240)}" alt="${p.name}" onerror="${ONERR}"></a><div>
      <div style="display:flex;justify-content:space-between;gap:10px"><h4>${p.name}</h4><span class="price">${eur(p.price * l.qty)}</span></div>
      <div class="meta">${p.type}<br>${p.colors.length > 1 ? c.name + " · " : ""}Taille ${l.size}</div>
      <div class="bot"><div class="qty"><button data-q="-1" data-i="${i}" aria-label="Retirer un">−</button><span>${l.qty}</span><button data-q="1" data-i="${i}" aria-label="Ajouter un">+</button></div><button class="rm" data-rm="${i}">Retirer</button></div>
    </div></div>`;
  }).join("") : `<div class="empty"><p class="disp" style="font-size:46px">Votre panier<br>est vide.</p><p class="muted" style="margin:0">Commencez par le modèle qui a fait la maison.</p><a class="btn" href="collection.html?c=jogpants">Voir les jogpants →</a></div>`;
  const up = byId(cart.some(l => l.id === "parfum-22-09") ? "blevo" : "parfum-22-09");
  $("#upsell").innerHTML = cart.length ? `<div class="mono muted" style="margin-bottom:10px">Souvent acheté avec</div><a href="${purl(up)}"><img src="${img(up.colors[0].imgs[0], 160)}" alt="" onerror="${ONERR}"><span><b>${up.name}</b><br><span class="muted">${up.type}</span></span>${priceHTML(up)}</a>` : "";
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
      <a class="ph-link" href="${purl(p)}" aria-label="${p.name}, ${p.type}">
        <img class="a" src="${img(a, 800)}" alt="${p.name} — ${p.type}" loading="lazy" width="800" height="1200" onerror="${ONERR}">
        <img class="b" src="${img(b, 800)}" alt="" loading="lazy" width="800" height="1200" onerror="${ONERR}">
      </a>
      ${p.badge ? `<span class="badge mono${p.badge === "Best-seller" ? " dk" : ""}">${p.badge}</span>` : ""}
      ${soldOut ? `<span class="oos mono">Épuisé</span>` : p.cat === "parfum" ? "" : `<div class="qadd"><span class="mono muted">Ajout rapide${p.colors.length > 1 ? " · " + c.name : ""}</span><div class="s">${p.sizes.map(s => `<button ${c.avail.includes(s) ? "" : "disabled"} data-qa="${p.id}|${c.name}|${s}" aria-label="Ajouter ${p.name} taille ${s}">${s}</button>`).join("")}</div></div>`}
    </div>
    <a class="info" href="${purl(p)}">
      <div class="row"><h3>${p.name}<span>${p.type}</span></h3>${priceHTML(p)}</div>
      <div class="row"><div class="swatches">${p.cat === "parfum" ? "" : p.colors.map(x => `<i style="background:${x.hex}" title="${x.name}"></i>`).join("")}</div></div>
    </a>
  </article>`;
};
document.addEventListener("click", e => {
  const q = e.target.closest("[data-qa]"); if (!q) return;
  e.preventDefault(); const [id, color, size] = q.dataset.qa.split("|"); add(id, color, size);
});

/* ---------- Guide des tailles : barème officiel Timssan poids × taille (modale partagée) ---------- */
const LBL = { 38: "S", 40: "M", 42: "L", 44: "XL", 46: "XXL" };
/* [poids kg, 165-175 cm, 175-185 cm, 185-195 cm] */
const SIZE_GRID = [[60,38,38,38],[62,38,38,38],[64,40,38,38],[66,40,40,38],[68,40,40,38],[70,40,40,40],[72,40,40,40],[74,40,40,40],[76,42,40,40],[78,42,42,42],[80,42,42,42],[82,42,42,42],[84,42,42,42],[86,44,42,42],[88,44,44,44],[90,44,44,44],[92,46,44,44],[94,46,46,44],[96,46,46,46],[98,46,46,46],[100,46,46,46],[102,46,46,46],[104,46,46,46]];
function recSize(h, w) {
  if (!h || !w) return null;
  if (w > 105) return { size: null, msg: "Au-delà de 104 kg, écrivez-nous : on vous conseille la meilleure coupe." };
  const col = h < 175 ? 1 : h < 185 ? 2 : 3;
  const row = SIZE_GRID.reduce((b, r) => Math.abs(r[0] - w) < Math.abs(b[0] - w) ? r : b);
  const size = String(row[col]);
  let msg = `On vous conseille le ${size} (${LBL[size]}).`;
  if (h < 165 || h > 195 || w < 59) msg += " Vous êtes en bord de barème : en cas de doute, prenez la plus petite, la toile s'assouplit au porter.";
  return { size, label: LBL[size], msg };
}
const FINDER = id => `<div class="finder" data-finder="${id}">
  <label for="${id}H">Votre taille <output id="${id}HO">178 cm</output></label><input id="${id}H" type="range" min="155" max="200" value="178" step="1">
  <label for="${id}W">Votre poids <output id="${id}WO">75 kg</output></label><input id="${id}W" type="range" min="50" max="115" value="75" step="1">
  <div class="sizes" aria-hidden="true">${Object.keys(LBL).map(k => `<span data-s="${k}"><b>${k}</b><small>${LBL[k]}</small></span>`).join("")}</div>
  <p class="res" role="status" aria-live="polite"></p>
</div>`;
function bindFinder(root, onRec) {
  const [h, w] = root.querySelectorAll("input"), [ho, wo] = root.querySelectorAll("output");
  const run = () => {
    ho.textContent = h.value + " cm"; wo.textContent = w.value + " kg";
    const r = recSize(+h.value, +w.value);
    root.querySelectorAll(".sizes span").forEach(s => s.classList.toggle("hit", r && s.dataset.s === r.size));
    root.querySelector(".res").textContent = r ? r.msg : "";
    if (onRec) onRec(r);
  };
  h.oninput = run; w.oninput = run; run();
}
document.body.insertAdjacentHTML("beforeend", `<div class="modal" id="sizeModal" role="dialog" aria-modal="true" aria-labelledby="sgT"><div class="modal-in">
  <button class="x" data-close>Fermer ✕</button>
  <span class="mono muted">Guide des tailles</span><h2 id="sgT">Trouvez votre taille</h2>
  <p style="margin:0">Indiquez votre taille et votre poids : on vous donne la taille Timssan qui vous va. Entre deux tailles, prenez la plus petite.</p>
  ${FINDER("sg")}
  <details class="grid-d"><summary>Voir le barème complet</summary><div class="tbl-wrap"><table class="ptable"><thead><tr><th>Poids</th><th>165–175 cm</th><th>175–185 cm</th><th>185–195 cm</th></tr></thead><tbody>${SIZE_GRID.map(r => `<tr><td><b>${r[0]} kg</b></td>${r.slice(1).map(x => `<td>${LBL[x]} ${x}</td>`).join("")}</tr>`).join("")}</tbody></table></div></details>
</div></div>`);
bindFinder(document.querySelector('#sizeModal [data-finder]'));
window.TIMSSAN.recSize = recSize; window.TIMSSAN.FINDER = FINDER; window.TIMSSAN.bindFinder = bindFinder;
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

/* ---------- Signature « Built for everyday » : tracé exact du brand book (Luminaire Script) ---------- */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".script").forEach(el => {
    if (/^built for everyday$/i.test(el.textContent.trim())) { el.classList.add("bfe"); el.innerHTML = '<span class="sr">Built for everyday</span>'; }
  });
});
/* ---------- iOS : verrouillage du scroll fiable quand un panneau est ouvert ---------- */
(() => {
  let y = 0, locked = false;
  new MutationObserver(() => {
    const on = document.body.classList.contains("lock");
    if (on === locked) return; locked = on;
    const b = document.body.style;
    if (on) { y = window.scrollY; b.position = "fixed"; b.top = -y + "px"; b.left = "0"; b.right = "0"; b.width = "100%"; }
    else { b.position = b.top = b.left = b.right = b.width = ""; window.scrollTo(0, y); }
  }).observe(document.body, { attributes: true, attributeFilter: ["class"] });
})();
