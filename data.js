/* Données produits — reprises du catalogue Shopify timssan.com (prix, stocks, visuels au 22/10/2026) */
window.CDN = "https://cdn.shopify.com/s/files/1/0454/2693/3911/files/";
window.img = (f, w = 900) => window.CDN + f + (f.includes("?") ? "&" : "?") + "width=" + w;

const DENIM_CARE = "Lavage à 30 °C sur l'envers, séchage à plat. Pas de sèche-linge, pour garder toute l'élasticité de la toile.";
const T38 = ["38", "40", "42", "44", "46"];
const TSML = ["S", "M", "L", "XL", "XXL"];

window.PRODUCTS = [
  {
    id: "nuby", name: "NUBY", type: "Jogpant", cat: "jogpants", sku: "NUBYNOIR", price: 71.2, compare: 89, badge: "Nouveau · -20 %",
    sizes: ["38", "40", "42", "44"],
    colors: [{ name: "Noir", hex: "#16161a", avail: ["38", "40", "42", "44"],
      imgs: ["jogpant_Nuby_flottant.png?v=1792262269", "jogpant_noir_NUBY_dehors.png?v=1792262934", "Pantalon_jogger_noir_confort_optimal.png?v=1792093229", "pantalonjogpantnoirvelour15.png?v=1792086325", "tissu_NUBY.png?v=1792329358", "pantalonjogpantnoirvelour1.png?v=1792086325"] }],
    desc: "Le dernier-né de l'atelier. Un jogpant noir à la main douce, à la coupe nette et aux chevilles élastiquées. Il se porte aussi bien avec une chemise qu'avec un hoodie.",
    matiere: "Toile noire souple au toucher velouté, stretch dans les deux sens.", coupe: "Ajustée, taille normalement. Ceinture élastiquée, chevilles resserrées.", care: DENIM_CARE
  },
  {
    id: "lom", name: "LOM", type: "Jogpant Denim · 2 Stone", cat: "jogpants", sku: "D3JOG2ST", price: 71.2, compare: 89, badge: "-20 % lancement",
    sizes: T38,
    colors: [{ name: "Bleu 2 Stone", hex: "#5b7397", avail: T38,
      imgs: ["pantalon_jeans_jogpant_2_stone_09.png?v=1791894904", "Jogpant_denim_extensible_et_confortable.png?v=1791900356", "2_stone_dehors.png?v=1791908475", "pantalon_jeans_jogpant_2_stone_5.png?v=1791880523", "pantalon_jeans_jogpant_2_stone1.png?v=1791880525", "pantalon_jeans_jogpant_2_stone_9.png?v=1791880524"] }],
    desc: "Le combo gagnant confort et style, casual × streetwear. Un denim délavé double stone, des ourlets élastiqués pour un tombé net et des poches zippées. Du canapé à la rue, franchement.",
    matiere: "Denim stretch délavé double stone, lavé avant couture.", coupe: "Ajustée, taille normalement. Entre deux tailles, prends la plus petite.", care: DENIM_CARE
  },
  {
    id: "elvi", name: "ELVI", type: "Jogpant Denim · Gris stone", cat: "jogpants", sku: "D3JEGRIST", price: 89, badge: "Best-seller",
    sizes: T38,
    colors: [{ name: "Gris stone", hex: "#7d8088", avail: T38,
      imgs: ["jogpant_elvi.png?v=1786266720", "Jogpant_elvi_CRO.png?v=1787689491", "pantalon_jogpant_elvi_situation.png?v=1787694126", "pantalon_jogpant_homme_ELVI_gris.png?v=1787648460", "pantalon_jogpant_homme_ELVI_gris_19.png?v=1787648985", "v_5.png?v=1787648545"] }],
    desc: "Un pilier de la maison. Un denim stretch gris stone qui a la silhouette d'un jean et le confort d'un jogging. La pièce qu'on recommande pour découvrir Timssan.",
    matiere: "Denim stretch gris, délavage stone.", coupe: "Ajustée, taille normalement.", care: DENIM_CARE
  },
  {
    id: "node", name: "NODE", type: "Jogpant à genouillères", cat: "jogpants", sku: "D3NOD", price: 109, badge: "Dernières tailles",
    sizes: T38,
    colors: [
      { name: "Emrod", hex: "#3d5a4a", avail: ["40"], imgs: ["node_emrod.png?v=1776099076", "pantalonhommejogpantgenouillereemrode.png?v=1776099076", "pantalon_emrode.png?v=1776099076", "pantalon_node_emrode.png?v=1776099076"] },
      { name: "Amande", hex: "#d8c7a8", avail: ["38"], imgs: ["node_amande.png?v=1776099076", "1pantalonhommejogpantnodeamande6.png?v=1776099076", "pantalonhommejogpantnodeamande2.png?v=1776099076", "pantalonhommejogpantnodeamande4.png?v=1776099076"] },
      { name: "Kraft", hex: "#a3855f", avail: [], imgs: ["node_kraft.png?v=1776099076", "jogpant_homme_kraft_node_01.png?v=1776099076", "jogpant_homme_kraft_node_9.png?v=1776099076", "jogpant_homme_kraft_node_11.png?v=1776099076"] }],
    desc: "Le jogpant aux genouillères surpiquées, notre modèle le plus travaillé. Trois couleurs, une coupe qui ne bouge pas, des détails qu'on remarque de près.",
    matiere: "Toile stretch épaisse, empiècements genoux surpiqués.", coupe: "Ajustée, taille normalement.", care: DENIM_CARE
  },
  {
    id: "mist", name: "MIST", type: "Pantalon 7/8 · Stone", cat: "pantalons-7-8", sku: "MISTBLEU7/8", price: 63.2, compare: 79, badge: "-20 %",
    sizes: T38,
    colors: [{ name: "Bleu stone", hex: "#8ea3bf", avail: ["38", "42"],
      imgs: ["78e_mist.png?v=1780488678", "7_8mistcro.png?v=1787146571", "78e_mist_2.png?v=1787146214", "7_8EME_mist1.png?v=1780428335", "7_8EME_mist_151.png?v=1780428233", "7_8EME_mist_5.png?v=1780428406"] }],
    desc: "La longueur 7/8 qui dégage la cheville. Un denim stone clair, parfait avec une basket basse quand les beaux jours arrivent.",
    matiere: "Denim stretch léger, délavage stone clair.", coupe: "Coupe droite raccourcie, arrive au-dessus de la cheville.", care: DENIM_CARE
  },
  {
    id: "blevo", name: "BLÉVO", type: "Bermuda long · Denim", cat: "bermudas-longs", sku: "BLEVOBERBLEU", price: 69,
    sizes: T38,
    colors: [{ name: "Bleu", hex: "#4f6f99", avail: T38,
      imgs: ["bermuda_blevo.png?v=1780319172", "bermudablevo.png?v=1786454840", "bermudalong.png?v=1787158254", "bermudajeanslonghommeblevo1.png?v=1780230452", "bermuda_jeans_long_homme_blevo_18.png?v=1780348215"] }],
    desc: "Une toile légère, souple et stretch, qui se délave naturellement au fil du temps pour devenir une pièce unique.",
    matiere: "Denim léger stretch, délavage naturel au porter.", coupe: "Longueur genou, jambe droite.", care: DENIM_CARE
  },
  {
    id: "miro", name: "MIRO", type: "Bermuda long · Denim noir", cat: "bermudas-longs", sku: "MIRONOIR", price: 69,
    sizes: T38,
    colors: [{ name: "Noir", hex: "#232327", avail: ["38", "40", "42", "46"],
      imgs: ["bermuda_jeans_noir.png?v=1779356710", "bermuda_long_jeans_noir_11.png?v=1780336228", "bermudalongjeansnoir9.png?v=1779349745", "bermudalongjeansnoir7.png?v=1779349744", "bermuda_long_jeans_noir_0.png?v=1780336226"] }],
    desc: "La version noire du bermuda long. Même toile stretch, même délavé naturel qui se forme avec le temps.",
    matiere: "Denim noir léger stretch.", coupe: "Longueur genou, jambe droite.", care: DENIM_CARE
  },
  {
    id: "axis", name: "AXIS", type: "Bermuda cargo", cat: "bermudas-longs", sku: "DB1CAR", price: 75,
    sizes: T38,
    colors: [
      { name: "Bleu ciel", hex: "#a9c2dc", avail: ["40"], imgs: ["bermuda_cargo_azur.png?v=1779390122", "bermuda_long_cargo_bleu_ciel_122_1.png?v=1779389995", "20_bermuda_long_cargo_bleu_ciel_12_76a8a048-dfb5-4c57-baaf-9b6673817bff.png?v=1779389996"] },
      { name: "Amande", hex: "#cdb98f", avail: ["40"], imgs: ["bermuda_cargo_mande.png?v=1779388601", "bermuda_cargo_long_amande_pour_homme.png?v=1751466285", "bermuda_cargo_long_amande_pour_homme_2.png?v=1751466285"] },
      { name: "Crème", hex: "#ece3cf", avail: [], imgs: ["bermuda_cargo_creme_a_plat.jpg?v=1750243694", "bermuda_long_cargo_creme_7.png?v=1750243694", "bermuda_long_cargo_creme_12.png?v=1750243694"] },
      { name: "Kraft", hex: "#a3855f", avail: [], imgs: ["bermudacargokraft.jpg?v=1751466285", "bermuda_cargo_long_kraft_pour_homme_5.png?v=1751466285", "bermuda_cargo_long_kraft_pour_homme1.png?v=1751466285"] }],
    desc: "Conçu pour durer, avec un look chic et décontracté. Les poches cargo structurent la silhouette tout l'été.",
    matiere: "Toile coton stretch, poches cargo plaquées.", coupe: "Longueur genou, coupe droite.", care: DENIM_CARE
  },
  {
    id: "cozy", name: "COZY", type: "Bermuda cargo molletonné", cat: "bermudas-longs", sku: "DB1MOLCAR", price: 59,
    sizes: ["S", "XXL"],
    colors: [{ name: "Noir", hex: "#16161a", avail: ["S"],
      imgs: ["bermuda_cargo_long_molleton_noir_89b079a3-9850-427b-9d0e-d79e4db05536.jpg?v=1747574865", "bermudalonghommenoirmolletonne14.png?v=1747574865", "bermudalonghommenoirmolletonne1.png?v=1747574865", "bermudalonghommenoirmolletonne4.png?v=1747574865"] }],
    desc: "Un bermuda cargo en molleton, doux et souple, pour un style casual et sportif. Il se marie avec un t-shirt comme avec un pull léger.",
    matiere: "Molleton doux et flexible.", coupe: "Coupe relax.", care: "Lavage à 30 °C, séchage à plat."
  },
  {
    id: "built", name: "BUILT 280", type: "T-shirt manches longues", cat: "hauts", sku: "BUILTLONG", price: 39,
    sizes: TSML,
    colors: [
      { name: "Beige", hex: "#d9c9ad", avail: ["S", "M", "XXL"], imgs: ["mlbeige.png?v=1777840042", "beige_tshirt_long_dos.png?v=1778001218"] },
      { name: "Marine", hex: "#1f2b45", avail: ["S", "M"], imgs: ["ml_bleu_N.png?v=1778001067", "manche_bleu_tshirt_ML.png?v=1778001134", "manche_longue_bleu_assi.png?v=1778065861"] },
      { name: "Kaki", hex: "#6b6a48", avail: ["M", "XXL"], imgs: ["kaki_tshirt_long.png?v=1777995200", "kaki_logo.png?v=1778001500"] },
      { name: "Noir", hex: "#141414", avail: [], imgs: ["Mlnoir.png?v=1777840043"] }],
    desc: "Fabriqué en coton 100 % peigné, pour une texture douce et aérée. Finition soignée et coutures renforcées : il tient la durée au quotidien.",
    matiere: "100 % coton peigné.", coupe: "Coupe droite, taille normalement.", care: "Lavage à 30 °C, repassage doux sur l'envers."
  },
  {
    id: "parfum-22-09", name: "22.09", type: "Eau de parfum · 100 ml", cat: "parfum", sku: "PARFUM2209100", price: 100, compare: 125, badge: "-20 % lancement",
    sizes: ["100 ml"],
    colors: [{ name: "100 ml", hex: "#e3d9cc", avail: ["100 ml"],
      imgs: ["Parfum_22.09_peche_safran_et_ambre.png?v=1791460102", "Parfum_22.09_elegance_ambree.png?v=1791459849", "Parfum_22.09_en_ecrin_ivoire.png?v=1791459850", "Flacon_et_boite_22.09_en_studio.png?v=1791459953", "parfum_peche_pistache.png?v=1791459913"] }],
    desc: "Un fruit, une épice, un bois. La pêche ouvre, ronde et lumineuse. Le safran arrive, sec, presque cuiré. Puis le bois et l'ambre s'installent, avec une pointe de pistache qui adoucit le tout. Chaleureux sans être sucré, présent sans être lourd.",
    matiere: "Tête : pêche · Cœur : safran · Fond : bois, ambre, pistache.", coupe: "Le second parfum de la maison. Composé en France.", care: "Conserver à l'abri de la lumière et de la chaleur."
  }
];

window.COLLECTIONS = {
  "pantalons": { title: "Tous les pantalons", eyebrow: "Pantalons homme", cats: ["jogpants", "pantalons-7-8"],
    intro: "Jogpants denim, pantalons 7/8 et classiques : toute la gamme Timssan, coupée dans des toiles stretch et cousue à la main dans notre atelier de Casablanca.",
    seo: "Chez Timssan, chaque pantalon homme est pensé pour le mouvement. Nos toiles stretch suivent le genou, nos ceintures élastiquées tiennent sans serrer et nos coupes restent nettes du matin au soir. Toutes les tailles vont du 38 au 46." },
  "jogpants": { title: "Jogpants", eyebrow: "Pantalons homme", cats: ["jogpants"],
    intro: "L'allure d'un jean, le confort d'un jogging. Le modèle qui a fait Timssan, décliné en denim stone, noir et couleurs de saison.",
    seo: "Le jogpant homme Timssan associe une toile denim stretch à une ceinture et des chevilles élastiquées. Résultat : la silhouette d'un jean, avec la liberté de mouvement d'un pantalon de jogging. Livraison offerte en 24/48h et échange offert." },
  "pantalons-7-8": { title: "Pantalons 7/8", eyebrow: "Pantalons homme", cats: ["pantalons-7-8"],
    intro: "La longueur qui dégage la cheville, pour les baskets basses et les beaux jours.",
    seo: "Le pantalon 7/8 homme Timssan s'arrête juste au-dessus de la cheville. Une coupe droite et un denim stretch léger, pensés pour la mi-saison." },
  "bermudas-longs": { title: "Bermudas longs", eyebrow: "L'été", cats: ["bermudas-longs"],
    intro: "Denim, cargo ou molleton : des bermudas longueur genou, aussi confortables que nos jogpants.",
    seo: "Les bermudas longs Timssan reprennent nos toiles stretch dans une longueur genou. Denim qui se délave avec le temps, cargo structuré ou molleton doux." },
  "hauts": { title: "Hauts", eyebrow: "T-shirts, chemises, vestes", cats: ["hauts"],
    intro: "Des hauts en coton peigné pour aller avec tous nos bas.",
    seo: "T-shirts 100 % coton peigné, chemises en denim et vestes : les hauts Timssan sont pensés pour accompagner nos jogpants au quotidien." },
  "parfum": { title: "Le Parfum", eyebrow: "La maison", cats: ["parfum"],
    intro: "Les parfums de la maison Timssan, composés en France.",
    seo: "22.09, l'eau de parfum Timssan : pêche, safran, bois et ambre, avec une touche de pistache." }
};

window.MENU = [
  { label: "Pantalons", href: "collection.html?c=pantalons", feature: "lom",
    cols: [{ title: "Par modèle", links: [["Tous les pantalons", "collection.html?c=pantalons"], ["Jogpants", "collection.html?c=jogpants"], ["Pantalons 7/8", "collection.html?c=pantalons-7-8"], ["Classiques", "collection.html?c=pantalons"]] },
           { title: "Par toile", links: [["Denim stone", "collection.html?c=jogpants"], ["Noir", "produit.html?p=nuby"], ["Couleurs", "produit.html?p=node"]] }] },
  { label: "Bermudas longs", href: "collection.html?c=bermudas-longs", feature: "blevo",
    cols: [{ title: "Bermudas", links: [["Tous les bermudas", "collection.html?c=bermudas-longs"], ["Denim", "produit.html?p=blevo"], ["Cargo", "produit.html?p=axis"], ["Molletonné", "produit.html?p=cozy"]] }] },
  { label: "Hauts", href: "collection.html?c=hauts", feature: "built",
    cols: [{ title: "Hauts", links: [["T-shirts", "collection.html?c=hauts"], ["Chemises", "collection.html?c=hauts"], ["Vestes", "collection.html?c=hauts"]] }] },
  { label: "Le Parfum", href: "produit.html?p=parfum-22-09" },
  { label: "Le Dernier Passage", href: "collection.html?c=pantalons", tag: "Outlet" }
];
