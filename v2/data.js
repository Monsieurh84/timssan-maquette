/* Données produits — reprises du catalogue Shopify timssan.com (prix, stocks au 22/10/2026).
   Galeries triées à la main : packshot, porté face, dos, mouvement, détails, infographie.
   `look` = visuels éditoriaux du bas de fiche (affichés entiers, jamais recadrés). */
window.CDN = "https://cdn.shopify.com/s/files/1/0454/2693/3911/files/";
window.img = (f, w = 900) => window.CDN + f + (f.includes("?") ? "&" : "?") + "width=" + w;

const DENIM_CARE = "Lavage à 30 °C sur l'envers, séchage à plat. Pas de sèche-linge, pour garder toute l'élasticité de la toile.";
const T38 = ["38", "40", "42", "44", "46"];
const TSML = ["S", "M", "L", "XL", "XXL"];
const MADE = ["Fabrication", "Atelier Timssan, Casablanca"];

window.PRODUCTS = [
  {
    id: "nuby", name: "NUBY", type: "Jogpant", cat: "jogpants", sku: "NUBYNOIR", price: 71.2, compare: 89, badge: "Nouveau · -20 %",
    sizes: ["38", "40", "42", "44"],
    colors: [{ name: "Noir", hex: "#16161a", avail: ["38", "40", "42", "44"],
      imgs: ["jogpant_Nuby_flottant.png", "pantalonjogpantnoirvelour15.png", "pantalonjogpantnoirvelour1.png", "pantalonjogpantnoirvelour5.png", "pantalonjogpantnoirvelour8.png", "pantalonjogpantnoirvelour9.png", "pantalonjogpantnoirvelour19.png", "pantalonjogpantnoirvelour22.png", "Pantalon_jogger_noir_confort_optimal.png"] }],
    look: [["jogpant_noir_NUBY_dehors.png", "En ville", "Avec un hoodie sable et des baskets sombres, il passe partout."],
           ["pantalonjogpantnoirvelour25.png", "Assis, accroupi, en mouvement", "La toile suit le genou sans tirer."],
           ["tissu_NUBY.png", "La matière", "Une main douce, presque veloutée."]],
    desc: "Le dernier-né de l'atelier. Un jogpant noir à la main douce, à la coupe nette et aux chevilles élastiquées. Il se porte aussi bien avec une chemise qu'avec un hoodie.",
    specs: [["Toile", "Noire, toucher velouté, stretch"], ["Coupe", "Ajustée, taille normalement"], ["Ceinture", "Élastiquée, passants ceinture"], ["Chevilles", "Élastiquées"], ["Poches", "5 poches, dont poche téléphone"], MADE],
    care: DENIM_CARE
  },
  {
    id: "lom", name: "LOM", type: "Jogpant Denim · 2 Stone", cat: "jogpants", sku: "D3JOG2ST", price: 71.2, compare: 89, badge: "-20 % lancement",
    sizes: T38,
    colors: [{ name: "Bleu 2 Stone", hex: "#8fb0cf", avail: T38,
      imgs: ["pantalon_jeans_jogpant_2_stone_09.png", "pantalon_jeans_jogpant_2_stone_5.png", "pantalon_jeans_jogpant_2_stone_7.png", "pantalon_jeans_jogpant_2_stone1.png", "Hommeensweatacapucheblanc.png", "pantalon_jeans_jogpant_2_stone_17.png", "pantalon_jeans_jogpant_2_stone_12.png", "Jogpant_denim_extensible_et_confortable.png"] }],
    look: [["2_stone_dehors.png", "En ville", "Un hoodie blanc, des baskets blanches. C'est tout ce qu'il faut."],
           ["pantalon_jeans_jogpant_2_stone_9.png", "Le stretch, en vrai", "La toile s'étire sans se déformer."],
           ["pantalon_jeans_jogpant_2_stone_18.png", "Les finitions", "Braguette, rivets et surpiqûres d'un vrai jean."]],
    desc: "Le combo gagnant confort et style, casual × streetwear. Un denim délavé double stone, des ourlets élastiqués pour un tombé net. Du canapé à la rue, franchement.",
    specs: [["Toile", "Denim stretch, délavage double stone"], ["Coupe", "Ajustée, taille normalement"], ["Ceinture", "Élastiquée à l'arrière, passants"], ["Chevilles", "Élastiquées"], ["Poches", "5 poches façon jean"], MADE],
    care: DENIM_CARE
  },
  {
    id: "elvi", name: "ELVI", type: "Jogpant Denim · Gris stone", cat: "jogpants", sku: "D3JEGRIST", price: 89, badge: "Best-seller",
    sizes: T38,
    colors: [{ name: "Gris stone", hex: "#6f7277", avail: T38,
      imgs: ["jogpant_elvi.png", "pantalon_jogpant_homme_ELVI_gris.png", "pantalon_jogpant_homme_ELVI_gris_3.png", "v_5.png", "pantalon_jogpant_homme_ELVI_gris_9.png", "pantalon_jogpant_homme_ELVI_gris_13.png", "pantalon_jogpant_homme_ELVI_gris_3n1.png", "pantalon_jogpant_homme_ELVI_gris_15.png", "Jogpant_elvi_CRO.png"] }],
    look: [["pantalon_jogpant_elvi_situation.png", "En ville", "Un sweat écru, et le gris stone fait le reste."],
           ["pantalon_jogpant_homme_ELVI_gris_19.png", "Accroupi, sans retenue", "Aucune tension au genou ni à la taille."],
           ["pantalon_jogpant_homme_ELVI_gris_fb76e728-84e4-4616-a8dc-684041a3f3a7.png", "Le stretch, en vrai", "Une toile qui s'étire et revient en place."]],
    desc: "Un pilier de la maison. Un denim stretch gris stone qui a la silhouette d'un jean et le confort d'un jogging. La pièce qu'on recommande pour découvrir Timssan.",
    specs: [["Toile", "Denim stretch gris, délavage stone"], ["Coupe", "Ajustée, taille normalement"], ["Ceinture", "Élastiquée à l'arrière, passants"], ["Chevilles", "Élastiquées"], ["Poches", "5 poches façon jean"], MADE],
    care: DENIM_CARE
  },
  {
    id: "node", name: "NODE", type: "Jogpant à genouillères", cat: "jogpants", sku: "D3NOD", price: 109, badge: "Dernières tailles",
    sizes: T38,
    colors: [
      { name: "Emrod", hex: "#2f5068", avail: ["40"], imgs: ["node_emrod.png", "pantalon_emrode.png", "2_pantalon_homme_jogpant_genouillere_emrode_4.png", "pantalon_node_emrode.png", "5_pantalon_homme_jogpant_genouillere_emrode_4.png"] },
      { name: "Amande", hex: "#a9b4a2", avail: ["38"], imgs: ["node_amande.png", "pantalonhommejogpantnodeamande6.png", "pantalonhommejogpantnodeamande4.png", "pantalonhommejogpantnodeamande2.png", "1pantalonhommejogpantnodeamande6.png"] },
      { name: "Kraft", hex: "#c4ab86", avail: [], imgs: ["node_kraft.png", "jogpant_homme_kraft_node_11.png", "jogpant_homme_kraft_node_13.png", "jogpant_homme_kraft_node_9.png", "jogpant_homme_kraft_5.png", "jogpant_homme_kraft_node_01.png"] }],
    look: [["pantalonhommejogpantgenouillereemrode.png", "En ville", "Le bleu pétrole Emrod, avec un t-shirt blanc."],
           ["5_pantalon_homme_jogpant_genouillere_emrode_4.png", "Les genouillères", "Elles laissent le genou plier sans marquer la toile."],
           ["pantalonhommejogpantnodeamande2.png", "La cheville", "Un resserrage net sur la basket."]],
    desc: "Le jogpant aux genouillères surpiquées, notre modèle le plus travaillé. Trois couleurs, une coupe qui ne bouge pas, des détails qu'on remarque de près.",
    specs: [["Toile", "Toile stretch épaisse"], ["Coupe", "Ajustée, taille normalement"], ["Genoux", "Empiècements surpiqués"], ["Chevilles", "Élastiquées"], ["Couleurs", "Emrod, Amande, Kraft"], MADE],
    care: DENIM_CARE
  },
  {
    id: "mist", name: "MIST", type: "Pantalon 7/8 · Stone", cat: "pantalons-7-8", sku: "MISTBLEU7/8", price: 63.2, compare: 79, badge: "-20 %",
    sizes: T38,
    colors: [{ name: "Bleu stone", hex: "#5d7fa8", avail: ["38", "42"],
      imgs: ["78e_mist.png", "7_8EME_mist1.png", "7_8EME_mist_5.png", "7_8EME_mist_151.png", "7_8EME_mist_3.png", "7_8EME_mist_2.png", "7_8mistcro.png"] }],
    look: [["78e_mist_2.png", "En ville", "La cheville dégagée, pour les baskets basses."],
           ["7_8EME_mist_55.png", "Avec une chemise en jean", "Le total denim, sans faire costume."],
           ["7_8EME_mist_11.png", "La longueur 7/8", "Elle s'arrête juste au-dessus de la cheville."]],
    desc: "La longueur 7/8 qui dégage la cheville. Un denim stone, parfait avec une basket basse quand les beaux jours arrivent.",
    specs: [["Toile", "Denim stretch léger, délavage stone"], ["Coupe", "Droite raccourcie, taille normalement"], ["Longueur", "Au-dessus de la cheville"], ["Poches", "5 poches façon jean"], MADE],
    care: DENIM_CARE
  },
  {
    id: "blevo", name: "BLÉVO", type: "Bermuda long · Denim", cat: "bermudas-longs", sku: "BLEVOBERBLEU", price: 69,
    sizes: T38,
    colors: [{ name: "Bleu", hex: "#34507a", avail: T38,
      imgs: ["bermuda_blevo.png", "bermudajeanslonghommeblevo1.png", "bermudajeanslonghommeblevo0.png", "bermudajeanslonghommeblevo3.png", "bermudajeanslonghommeblevo8.png", "bermudajeanslonghommeblevo11.png", "bermudablevo.png"] }],
    look: [["bermudalong.png", "En ville", "Un t-shirt blanc et des baskets : la tenue d'été réglée."],
           ["bermudajeanslonghommeblevo15.png", "Assis", "La toile stretch ne remonte pas et ne serre pas."],
           ["bermudajeanslonghommeblevo16.png", "Le stretch, en vrai", "Une toile légère qui suit chaque mouvement."]],
    desc: "Une toile légère, souple et stretch, qui se délave naturellement au fil du temps pour devenir une pièce unique.",
    specs: [["Toile", "Denim léger stretch, délavage naturel"], ["Coupe", "Jambe droite, taille normalement"], ["Longueur", "Sous le genou"], ["Poches", "5 poches façon jean"], MADE],
    care: DENIM_CARE
  },
  {
    id: "miro", name: "MIRO", type: "Bermuda long · Denim noir", cat: "bermudas-longs", sku: "MIRONOIR", price: 69,
    sizes: T38,
    colors: [{ name: "Noir", hex: "#2b2c30", avail: ["38", "40", "42", "46"],
      imgs: ["bermuda_jeans_noir.png", "bermuda_long_jeans_noir_11.png", "bermuda_long_jeans_noir_18.png", "bermudalongjeansnoir6.png", "bermudalongjeansnoir9.png", "bermudalongjeansnoir5.png", "bermuda_long_jeans_noir_13.png"] }],
    look: [["bermuda_long_jeans_noir_24.png", "Assis", "Il reste en place, même assis."],
           ["bermuda_long_jeans_noir_0.png", "Le stretch, en vrai", "La même toile que nos jogpants."],
           ["bermudalongjeansnoir4.png", "L'ourlet", "Un revers net qui se roule ou se porte droit."]],
    desc: "La version noire du bermuda long. Même toile stretch, même délavé naturel qui se forme avec le temps.",
    specs: [["Toile", "Denim noir léger stretch"], ["Coupe", "Jambe droite, taille normalement"], ["Longueur", "Sous le genou"], ["Poches", "5 poches façon jean"], MADE],
    care: DENIM_CARE
  },
  {
    id: "axis", name: "AXIS", type: "Bermuda cargo", cat: "bermudas-longs", sku: "DB1CAR", price: 75,
    sizes: T38,
    colors: [
      { name: "Bleu ciel", hex: "#c3d5e0", avail: ["40"], imgs: ["bermuda_cargo_azur.png", "bermuda_long_cargo_bleu_ciel_122_1.png", "1_bermuda_long_cargo_bleu_ciel_12_429fca36-fded-491e-a1fc-b9ef06fca796.png", "20_bermuda_long_cargo_bleu_ciel_12_76a8a048-dfb5-4c57-baaf-9b6673817bff.png"] },
      { name: "Amande", hex: "#b4bfac", avail: ["40"], imgs: ["bermuda_cargo_mande.png", "bermuda_cargo_long_amande_pour_homme_2.png", "bermuda_cargo_long_amande_pour_homme1.png", "bermuda_cargo_long_amande_pour_homme.png"] },
      { name: "Crème", hex: "#ece6d6", avail: [], imgs: ["bermuda_cargo_creme_a_plat.jpg", "bermuda_long_cargo_creme_7.png", "bermuda_long_cargo_creme_12.png", "bermuda_long_cargo_creme_6.png"] },
      { name: "Kraft", hex: "#c7ad84", avail: [], imgs: ["bermudacargokraft.jpg", "bermuda_cargo_long_kraft_pour_homme1.png", "bermuda_cargo_long_kraft_pour_homme_3.png", "bermuda_cargo_long_kraft_pour_homme_5.png"] }],
    look: [["bermuda_cargo_long_kraft_pour_homme_5.png", "Assis", "Le cargo garde sa tenue, même assis."],
           ["bermuda_cargo_long_amande_pour_homme.png", "Avec une surchemise", "La version Amande, pour la mi-saison."],
           ["20_bermuda_long_cargo_bleu_ciel_12_76a8a048-dfb5-4c57-baaf-9b6673817bff.png", "Les poches cargo", "Plaquées, à rabat, pour ranger sans déformer."]],
    desc: "Conçu pour durer, avec un look chic et décontracté. Les poches cargo structurent la silhouette tout l'été.",
    specs: [["Toile", "Coton stretch"], ["Coupe", "Droite, taille normalement"], ["Poches", "Cargo plaquées à rabat"], ["Longueur", "Sous le genou"], MADE],
    care: DENIM_CARE
  },
  {
    id: "cozy", name: "COZY", type: "Bermuda cargo molletonné", cat: "bermudas-longs", sku: "DB1MOLCAR", price: 59,
    sizes: ["S", "XXL"],
    colors: [{ name: "Noir", hex: "#16161a", avail: ["S"],
      imgs: ["bermuda_cargo_long_molleton_noir_89b079a3-9850-427b-9d0e-d79e4db05536.jpg", "bermudalonghommenoirmolletonne14.png", "bermudalonghommenoirmolletonne4.png", "bermudalonghommenoirmolletonne2.png"] }],
    look: [["bermudalonghommenoirmolletonne1.png", "Assis", "Un molleton souple qui ne marque pas."],
           ["bermudalonghommenoirmolletonne1_21e913e5-ab5b-4c5f-9270-2d14f1020b5a.png", "La poche cargo", "Brodée du logo Timssan."],
           ["bermudalonghommenoirmolletonne14.png", "Porté", "Avec un t-shirt blanc, simplement."]],
    desc: "Un bermuda cargo en molleton, doux et souple, pour un style casual et sportif. Il se marie avec un t-shirt comme avec un pull léger.",
    specs: [["Matière", "Molleton doux et flexible"], ["Coupe", "Relax"], ["Poches", "Cargo à rabat"], MADE],
    care: "Lavage à 30 °C, séchage à plat."
  },
  {
    id: "built", name: "BUILT 280", type: "T-shirt manches longues", cat: "hauts", sku: "BUILTLONG", price: 39,
    sizes: TSML,
    colors: [
      { name: "Beige", hex: "#d6c7ac", avail: ["S", "M", "XXL"], imgs: ["mlbeige.png", "beige_tshirt_long_dos.png"] },
      { name: "Marine", hex: "#1f2b45", avail: ["S", "M"], imgs: ["ml_bleu_N.png", "manche_bleu_tshirt_ML.png", "manche_longue_bleu_assi.png"] },
      { name: "Kaki", hex: "#5f6447", avail: ["M", "XXL"], imgs: ["kaki_tshirt_long.png", "kaki_logo.png"] },
      { name: "Noir", hex: "#141414", avail: [], imgs: ["Mlnoir.png", "Generated_with_Kive.ai_-_kive-image.png"] }],
    look: [["Generated_with_Kive.ai_-_kive-image.png", "En ville", "En noir, avec un jogpant gris stone."],
           ["manche_longue_bleu_assi.png", "Au quotidien", "Le marine, coupe droite, col net."],
           ["kaki_logo.png", "Le détail", "Le logo Timssan brodé ton sur ton."]],
    desc: "Fabriqué en coton 100 % peigné, pour une texture douce et aérée. Finition soignée et coutures renforcées : il tient la durée au quotidien.",
    specs: [["Matière", "100 % coton peigné"], ["Coupe", "Droite, taille normalement"], ["Finitions", "Coutures renforcées, logo brodé"], ["Couleurs", "Beige, Marine, Kaki, Noir"], MADE],
    care: "Lavage à 30 °C, repassage doux sur l'envers."
  },
  {
    id: "parfum-22-09", name: "22.09", type: "Eau de parfum · 100 ml", cat: "parfum", sku: "PARFUM2209100", price: 100, compare: 125, badge: "-20 % lancement",
    sizes: ["100 ml"],
    colors: [{ name: "100 ml", hex: "#e3d9cc", avail: ["100 ml"],
      imgs: ["Parfum_22.09_peche_safran_et_ambre.png", "Parfum_22.09_elegance_ambree.png", "Flacon_et_boite_22.09_en_studio.png", "Parfum_22.09_en_ecrin_ivoire.png"] }],
    look: [["parfum_peche_pistache.png", "Pêche et pistache", "Le fruit ouvre, la pistache adoucit le fond."],
           ["Parfum_22.09_en_ecrin_ivoire.png", "L'écrin", "Un coffret ivoire, prêt à offrir."],
           ["Parfum_22.09_elegance_ambree.png", "L'ambre", "Chaleureux sans être sucré."]],
    desc: "Un fruit, une épice, un bois. La pêche ouvre, ronde et lumineuse. Le safran arrive, sec, presque cuiré. Puis le bois et l'ambre s'installent, avec une pointe de pistache qui adoucit le tout. Chaleureux sans être sucré, présent sans être lourd.",
    specs: [["Tête", "Pêche"], ["Cœur", "Safran"], ["Fond", "Bois, ambre, pistache"], ["Contenance", "100 ml"], ["Composition", "Composé en France"]],
    care: "Conserver à l'abri de la lumière et de la chaleur."
  }
];
/* rétro-compatibilité des champs utilisés ailleurs */
window.PRODUCTS.forEach(p => { p.matiere = p.specs[0][1]; p.coupe = (p.specs.find(s => s[0] === "Coupe") || p.specs[1])[1]; });

/* Avis repris du site actuel (reformulés). À remplacer par le flux de l'app d'avis. */
window.REVIEWS = [
  { name: "Will", rating: 5, title: "Cinquième commande", text: "Jogpant et 7/8 : je suis toujours aussi content de la coupe et de la qualité. L'envoi est rapide, rien à redire.", fit: 0, helpful: 14 },
  { name: "Julien", rating: 5, title: "Guide des tailles fiable", text: "Livraison rapide, produit impeccable et matière au rendez-vous. Reporte les mesures d'un pantalon qui te va bien : avec le guide, impossible de se tromper.", fit: 0, helpful: 11 },
  { name: "Hicham", rating: 5, title: "Qualité constante", text: "J'en suis à ma troisième commande et la qualité est vraiment excellente. Délai très court, et un échantillon de parfum en plus sur la dernière.", fit: 0, helpful: 9 },
  { name: "Abdel", rating: 5, title: "Surpris à la réception", text: "J'hésitais au début, puis j'ai vu le rendu en vidéo sur les réseaux. À la réception, franchement surpris par la qualité. Il mérite ses cinq étoiles.", fit: 0, helpful: 7 },
  { name: "Ghislain", rating: 5, title: "Tient au lavage", text: "On m'a offert trois t-shirts 100 % coton. Après plusieurs machines ils restent nickel, et ils sont très agréables à porter.", fit: 0, helpful: 5 }
];
/* Répartition des notes : exemple de maquette, à brancher sur l'app d'avis */
window.RATING_SPLIT = [88, 8, 2, 1, 1];

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
  { label: "Le Parfum", href: "parfum.html?p=parfum-22-09" },
  { label: "Le Dernier Passage", href: "collection.html?c=pantalons", tag: "Outlet" }
];

/* Vidéos produits (médias Shopify existants de timssan.com) — insérées en 2e position du carrousel */
(() => {
  const V = (id, file) => ({ src: "https://cdn.shopify.com/videos/c/vp/" + id + "/" + id + "." + file + ".mp4", poster: window.CDN + "preview_images/" + id + ".thumbnail.0000000000.jpg" });
  const map = {
    nuby: V("e7c3cf00f00341238f4d849ebb456627", "HD-720p-1.6Mbps-97752433"),
    lom: V("50a9f637b6aa41848689e3cccacf11cb", "HD-720p-1.6Mbps-97332582"),
    elvi: V("983a31618f96446191226a3f67c5c2b4", "HD-1080p-7.2Mbps-92596081"),
    mist: V("5221494eff394fc6a79750d4b6e5cbac", "HD-720p-1.6Mbps-85610973"),
    blevo: V("384419ff57214a1aa14929fdc7032d26", "HD-720p-2.1Mbps-85462911"),
    miro: V("0ea3af9f27ff47209e0163e392cda91c", "HD-1080p-3.3Mbps-85714543")
  };
  window.PRODUCTS.forEach(p => { if (map[p.id]) p.video = map[p.id]; });
})();
