# 🏖️ TrackWear - Maillot de Bain Intelligent

> *Pour que leurs seules traces soient celles dans le sable*

## 📋 Vue d'ensemble

**TrackWear** est un projet web innovant développé en **JavaScript pur** (HTML, CSS, JavaScript vanilla) présentant un concept de maillot de bain intelligent avec géolocalisation pour enfants. Le site offre une expérience utilisateur moderne avec des animations fluides et des interactions intuitives.

### Concept du produit
Trackwear combine un textile anti-UV de haute qualité avec une technologie de géolocalisation discrète pour offrir une double protection. Via une application mobile, les parents peuvent :
- Garder un œil sur leurs enfants en temps réel
- Recevoir une alerte instantanée si l'enfant sort du périmètre de sécurité
- Offrir aux enfants la liberté d'explorer en toute sécurité

---

## 📊 Structure du Projet

```
Projet-javascript/
├── index.html                    # Page d'accueil
├── acceuil.js                    # Animation du slogan
├── acceuil.css                   # Style de la page d'accueil
│
├── global/
│   ├── script.js                 # Fonctionnalités globales du site
│   └── styles.css                # Styles globaux
│
├── about/
│   ├── about.html                # Page "À propos"
│   ├── about.js                  # Logique de la page
│   └── about.css                 # Styles
│
├── produits/
│   ├── produits.html             # Page produits avec filtres
│   ├── produits.js               # Gestion des produits et filtres
│   └── produits.css              # Styles des produits
│
├── contact/
│   ├── contact.html              # Formulaire de contact
│   ├── contact.js                # Validation du formulaire
│   └── contact.css               # Styles du contact
│
├── team/
│   ├── team.html                 # Page présentation équipe
│   ├── team.js                   # Logique équipe
│   └── team.css                  # Styles équipe
│
├── location/
│   ├── location.html             # Page localisation
│   ├── location.js               # Logique localisation
│   └── location.css              # Styles localisation
│
├── assets/
│   ├── images/                   # Images (favicon, logos, etc.)
│   └── audio/                    # Sons (sonnerie)
│
└── liens.txt                     # Ressources externes
```

---

## ✨ Fonctionnalités Principales

### 1. **Horloge Numérique 7-Segments** ⏰
- Affichage en style "calculette vintage" des heures et minutes
- Mise à jour en temps réel chaque seconde
- Intégrée dans la barre de navigation

**Code clé** : `global/script.js` - Fonctions `addSegments()`, `updateDigit()`, `updateTime()`

### 2. **Chronomètre de Session** ⏱️
- Enregistre le temps d'utilisation depuis l'arrivée sur le site
- Format MM:SS
- Affichage permanent à côté de l'horloge

**Code clé** : `global/script.js` - Fonction `updateChrono()`

### 3. **Animation du Slogan** 📝
- Animation fluide avec apparition progressive des mots
- Les mots s'affichent un par un avec fondu (fade-in)
- Boucle infinie avec effet de mouvement final
- Slogan : *"Pour que leurs seules traces soient celles dans le sable"*

**Code clé** : `acceuil.js` - Fonction `initSloganAnimation()`

### 4. **Système de Navigation Intelligent** 🧭
- Menu hamburger responsive pour mobile
- Animations de transition entre pages
- Écran de chargement animé avec barre de progression
- Confirmation popup pour la page "Notre Équipe"
- Changement de style des liens actifs

**Code clé** : `global/script.js` - Fonction `initNavigation()`, `menu()`

### 5. **Écran de Chargement** 🔄
- Loader global avec barre animée
- Affichage lors de la transition entre pages
- Masquage automatique au chargement complet

### 6. **Gestion des Numéros Téléphone** ☎️
- Détection de copie des numéros en footer
- Confirmation popup avant "appel"
- Lecture d'une sonnerie audio si confirmé

**Code clé** : `global/script.js` - Fonction `initFooterPhoneEvents()`

### 7. **Protection du Contenu** 🛡️
- Alerte console si copie de contenu
- Message anti-plagiat dans la console
- Fonction d'analyse d'erreurs centralisée

**Code clé** : `global/script.js` - Fonction `initPlagiarismWarning()`

---

## 🎨 Technologies Utilisées

| Technologie | Utilisation |
|-------------|------------|
| **HTML5** | Structure sémantique |
| **CSS3** | Styling, animations, responsive design |
| **JavaScript** | Pas de framework, code pur |
| **Google Fonts** | Typo "Inter" |
| **SweetAlert2** | Alerts stylisées (page produits) |
| **Figma** | Prototype/maquette du design |

---

## 🔗 Ressources Externes

### Maquette du Projet
📐 **Figma** : [Accédez à la maquette TrackWear](https://www.figma.com/site/XRVJvh7rMv0xezGVWam6TK/TrackWear?node-id=0-1&t=kfsP2HcP8dSsIFE8-1)

Cette maquette contient :
- Design complet de toutes les pages
- Guide des couleurs et typographie
- Prototypes interactifs
- Spécifications détaillées des composants

### Code Source & Déploiement
🐙 **GitHub** : [machine-007-gif/Projet-javascript](https://github.com/machine-007-gif/Projet-javascript)

- Dépôt complet du projet
- Historique des commits et branches
- Collaboration en équipe

🚀 **GitHub Pages** : [Accédez au site Github Pages](https://machine-007-gif.github.io/Projet-javascript/index.html)

---

### Utilisation
1. Ouvrir `index.html` dans le navigateur
2. Naviguer via le menu ou le hamburger mobile
3. Consulter la console (F12) pour les logs détaillés
4. Tester les interactions :
   - Horloge et chronomètre
   - Animations du slogan
   - Transitions entre pages
   - Copie des numéros de téléphone

---

## 📱 Pages du Site

| Page | URL | Description |
|------|-----|------------|
| **Accueil** | `/index.html` | Présentation du produit TrackWear avec animation du slogan et actualités |
| **À propos** | `/about/about.html` | Informations détaillées sur l'entreprise |
| **Produits** | `/produits/produits.html` | Catalogue des produits avec système de filtrage |
| **Notre Équipe** | `/team/team.html` | Présentation des membres de l'équipe |
| **Contact** | `/contact/contact.html` | Formulaire de contact et coordonnées |
| **Nous trouver** | `/location/location.html` | Localisation des 4 campus (Brest, Caen, Nantes, Rennes) |

### Emplacements Physiques
- **Brest** : 20 Rue Cuirassé Bretagne, 29200 Brest | 02 98 03 84 00
- **Caen** : 16bis Quai Amiral Hamelin, 14000 Caen | 02 30 31 03 20
- **Nantes** : 33 QUATER Av. du Champ de Manœuvre, 44470 Carquefou | 02 30 13 05 60
- **Rennes** : 22 Bd Saint-Conwoïon, 35000 Rennes | 02 30 13 02 50

---

## 📄 Licence

Projet étudiant - Trackwear © 2024-2026

---

## 📧 Support

Pour toute question ou problème :
- 📍 Consulter les campus Trackwear
- 📧 Utiliser le formulaire de contact sur le site
- 🐙 Ouvrir une issue sur GitHub

---

**Dernier mise à jour** : Mai 2026  
**Statut** : Actif en développement  
**Version** : 1.0

---

*"Ne les perdez plus jamais de vue."* 🏖️
