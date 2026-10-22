# Timssan — maquette de refonte

Maquette navigable de la refonte premium de timssan.com, réalisée par Les Monsieurs by Monsieur.H.

## Pages

| Page | URL |
|---|---|
| Accueil | `index.html` |
| Collection | `collection.html?c=pantalons` · `jogpants` · `pantalons-7-8` · `bermudas-longs` · `hauts` · `parfum` |
| Fiche produit | `produit.html?p=lom` · `nuby` · `elvi` · `node` · `mist` · `blevo` · `miro` · `axis` · `cozy` · `built` · `parfum-22-09` |

Ce qui est fonctionnel : méga-menu, menu mobile, recherche, panier (conservé d'une page à l'autre), fiche produit avec variantes couleur et taille, stock réel par taille, alerte retour en stock, guide des tailles, zoom photo, barre d'achat mobile, ventes croisées.

## Mettre en ligne sur GitHub Pages

1. Crée un dépôt vide sur GitHub, par exemple `timssan-maquette`.
2. Dépose tout le contenu de ce dossier à la racine du dépôt (le fichier `.nojekyll` compris).
3. Va dans **Settings → Pages**, puis choisis **Deploy from a branch**, branche `main`, dossier `/ (root)`.
4. Le lien est prêt au bout d'environ une minute : `https://<ton-compte>.github.io/timssan-maquette/`.

## Structure

```
index.html · collection.html · produit.html
style.css   → design system (tokens en tête de fichier)
data.js     → produits, collections, menu
app.js      → header, menus, recherche, panier, carte produit, SEO
```

Pour ajouter un produit, il suffit de compléter `data.js`. Les visuels sont chargés depuis le CDN Shopify de Timssan.

## À valider avec le client

- Les chiffres du module « Pourquoi 89 € ? » sont des exemples.
- Le barème du guide des tailles est indicatif.
- Les textes matière et entretien sont génériques.
- Le seuil de livraison offerte est fixé à 80 € dans le panier, d'après la meta description du site actuel. Le bandeau, lui, annonce la livraison offerte sans minimum : il faut trancher.
- Les avis affichés sur les fiches produit sont génériques. À brancher sur l'application d'avis.
- La page est en `noindex` tant que c'est une maquette.
