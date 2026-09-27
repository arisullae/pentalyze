# 📖 Pentalyze : 5 Niveaux d'Analyse & Livre 3D Interactif

> **Découvrez 5 perspectives d'analyse approfondie à partir d'une seule phrase dans un livre numérique 3D**  
> *1 Phrase ➔ 5 Dimensions d'Analyse & Livre Relié 3D Interactif*

[![PWA Ready](https://img.shields.io/badge/PWA-Installable-blue.svg)](https://web.dev/progressive-web-apps/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

### 🌐 Guides dans d'autres langues (Global Language Guides)
[**한국어 원문 (Main README)**](../README.md) | [**English Guide**](./README_en.md) | [**日本語**](./README_ja.md) | [**हिन्दी**](./README_hi.md) | [**Español**](./README_es.md) | [**Deutsch**](./README_de.md) | [**Italiano**](./README_it.md) | [**Português**](./README_pt.md) | [**Русский**](./README_ru.md)

---

## 📢 Avis de Publication & Archivage (Archive)
> **[Avis] Ce projet est un dépôt open-source publié sur GitHub en tant que projet d'archive.**  
> Suite à cette mise en ligne, **aucun développement supplémentaire ni maintenance continue (correctifs de bugs, mises à jour) ne sont prévus par l'auteur.**  
> Vous êtes invités à forker, adapter et enrichir ce projet librement dans le cadre de la licence MIT.

---

## 🌍 10 Langues et Systèmes d'Écriture Pris en Charge

Pentalyze prend en charge de façon native 10 langues internationales et leurs systèmes d'écriture respectifs :

| Pays / Région | Langue | Nom Natif | Système d'Écriture | Code | Document |
| :---: | :---: | :---: | :---: | :---: | :---: |
| 🇰🇷 **Corée du Sud** | **Coréen** | 한국어 | **Hangeul (한글)** | `ko` | [README Principal](../README.md) |
| 🇺🇸 **États-Unis / Monde** | **Anglais** | English | **Alphabet latin** | `en` | [README_en.md](./README_en.md) |
| 🇯🇵 **Japon** | **Japonais** | 日本語 | **Kanji & Kana (漢字・かな)** | `ja` | [README_ja.md](./README_ja.md) |
| 🇮🇳 **Inde** | **Hindi** | हिन्दी | **Écriture devanagari (देवनागरी)** | `hi` | [README_hi.md](./README_hi.md) |
| 🇪🇸 **Espagne / LATAM** | **Espagnol** | Español | **Alphabet latin** | `es` | [README_es.md](./README_es.md) |
| 🇫🇷 **France** | **Français** | Français | **Alphabet latin** | `fr` | **Document actuel** |
| 🇩🇪 **Allemagne** | **Allemand** | Deutsch | **Alphabet latin** | `de` | [README_de.md](./README_de.md) |
| 🇮🇹 **Italie** | **Italien** | Italiano | **Alphabet latin** | `it` | [README_it.md](./README_it.md) |
| 🇧🇷 **Brésil / Portugal** | **Portugais** | Português | **Alphabet latin** | `pt` | [README_pt.md](./README_pt.md) |
| 🇷🇺 **Russie** | **Russe** | Русский | **Alphabet cyrillique (Кириллица)** | `ru` | [README_ru.md](./README_ru.md) |

---

## 🌟 Présentation du Projet (Overview)

**Pentalyze** est une solution intelligente d'analyse linguistique, de réécriture et de visualisation tridimensionnelle. À partir d'une seule phrase ou d'un court extrait, le système extrait 5 couches de perspectives analytiques et sémantiques.

Avec une prise en charge native des 10 langues mondiales et écritures mentionnées ci-dessus, Pentalyze met en scène les résultats d'analyse sous la forme d'un livre relié en 3D avec animation réaliste de tournage de pages, vue comparative bilingue (Split-View) et lecture audio synchronisée en temps réel (TTS).

---

## 🔑 Fonctionnement de l'API & Guide Google AI Studio

### 1. Sécurité et fonctionnement de la clé sur les clones GitHub
* Le code source ne contient aucune clé d'API personnelle de l'auteur.
* Lors de l'exécution locale de ce projet, le système fonctionne selon le principe **BYOK (Bring Your Own Key)** : l'utilisateur utilise sa propre clé d'API.
* Les clés saisies sont conservées exclusivement dans le `localStorage` de votre navigateur et ne sont jamais envoyées vers des serveurs tiers.

### 2. Obtenir une clé d'API gratuite sur Google AI Studio (Recommandé)
Pentalyze est optimisé pour les modèles Gemini de **Google AI Studio**. Vous pouvez obtenir une clé gratuite rapidement :
1. Rendez-vous sur [Google AI Studio (https://aistudio.google.com/)](https://aistudio.google.com/) et connectez-vous avec votre compte Google.
2. Cliquez sur **'Get API key'** dans le menu de navigation.
3. Cliquez sur **'Create API key'**, générez votre clé et copiez-la.
4. Dans Pentalyze, cliquez sur l'icône **Paramètres (⚙️)** en haut à droite, cochez **[Utiliser ma propre clé d'API]**, collez votre clé Gemini et cliquez sur **Enregistrer**.
   - Vous pouvez également créer un fichier `.env` à la racine à partir de `.env.example` :
     ```env
     VITE_GEMINI_API_KEY=votre_cle_google_ai_studio
     ```

### 3. Intégration d'autres modèles (OpenAI, DeepSeek, Ollama local)
* **OpenAI (GPT-4o)** : Sélectionnez OpenAI dans le panneau Paramètres et renseignez votre clé `sk-...`.
* **LLM Locaux (Ollama)** : Modifiez `src/services/ai.ts` pour pointer vers votre instance locale (ex. `http://localhost:11434/v1/chat/completions`).

---

## 🎯 Les 5 Dimensions d'Analyse

1. **Niveau 1 : Interprétation (Interpretation)** : Décryptage du sens littéral, des intentions sous-jacentes et des nuances contextuelles.
2. **Niveau 2 : Synthèse Clé (Summary)** : Résumé percutant du message essentiel en une formule concise.
3. **Niveau 3 : Explication Approfondie (Deep Explanation)** : Éclairage sur le vocabulaire technique, le contexte culturel et thématique.
4. **Niveau 4 : Correction Grammaticale & Style (Grammar & Polish)** : Correction syntaxique et réécriture en style soutenu et professionnel.
5. **Niveau 5 : Reformulation Créative (Paraphrasing)** : 3 propositions d'écriture alternatives élégantes adaptées à divers registres.

---

## 🚀 Fonctionnalités Majeures

- **Moteur de Livre 3D Réaliste** : Rendu CSS 3D immersif, ombrages dynamiques et interaction tactile de feuilletage.
- **Architecture Multilingue à Deux Niveaux** : Interface conservée dans votre langue natale tandis que le contenu du livre peut être lu et traduit dans l'une des 10 langues gérées.
- **Vue Comparatif Bilingue (Split-View)** : Comparaison directe entre la phrase d'origine et la version polie.
- **PWA (Progressive Web App)** : Installation fluide sur mobile et bureau avec mise en cache hors ligne.
- **Moteur de Lecture Audio Hybride (TTS)** : Synthèse vocale native et support optionnel de clonage vocal ElevenLabs.
- **Bibliothèque Personnelle & Export** : Sauvegarde locale automatique et exportation au format Markdown ou PDF.

---

## 📦 Démarrage Rapide (Quick Start)

### Prérequis
- **Node.js** 18.0 ou supérieur (installez la version LTS depuis le [site officiel (nodejs.org)](https://nodejs.org/))

---

### 🖱️ Utilisateurs : Lancement en un clic (Recommandé)
Après avoir téléchargé le dépôt (décompressez le fichier ZIP), double-cliquez simplement sur le script adapté à votre système d'exploitation pour **installer automatiquement les dépendances et ouvrir le livre 3D dans votre navigateur** :

* **Utilisateurs Windows** : Double-cliquez sur le fichier **`start.bat`**.
* **Utilisateurs macOS / Linux** : Exécutez `bash start.sh` dans votre terminal ou double-cliquez sur `start.sh`.

---

### 💻 Développeurs : Lancement manuel via le terminal
```bash
# Cloner le dépôt
git clone https://github.com/your-username/pentalyze.git
cd pentalyze

# Installer les dépendances
npm install

# Démarrer le serveur de développement local (Port 3000)
npm run dev

# Compiler pour la production
npm run build
```

---

## 📲 Guide d'Installation (PWA) et de Désinstallation de l'Application

> 💡 **Déploiement du service et installation de l'application utilisateur**:  
> Que vous déployiez ce projet tel quel ou que vous lanciez une version personnalisée et enrichie du service, tous les composants techniques (manifeste PWA, Service Worker et modale d'invitation à l'installation) sont pleinement intégrés. Tout utilisateur visitant la plateforme depuis un PC, une tablette ou un smartphone peut ainsi l'installer et l'exécuter sous forme d'application native autonome (PWA) via le bouton **[Installer l'application]** de l'en-tête ou les outils natifs de son navigateur.

Pentalyze est entièrement conforme aux normes **PWA (Progressive Web App)**. Vous pouvez installer l'application sur ordinateur et appareils mobiles sans passer par un magasin d'applications, pour en profiter dans une fenêtre dédiée sans barre d'adresse de navigateur. Elle peut être désinstallée proprement à tout moment.

### 1. 🖥️ Ordinateur de Bureau (Windows / macOS / Linux)

#### 📥 Procédure d'Installation
1. **Depuis la barre d'adresse** : Sur Chrome, Edge, Brave ou Whale, cliquez sur l'icône **[Installer (⊕ / 💻)]** située à droite de la barre d'adresse.
2. **Depuis le bouton de l'application** : Cliquez sur le bouton **[Installer l'application]** dans l'en-tête supérieur, puis confirmez avec **[Installer]**.
3. Un raccourci s'ajoutera sur le bureau et dans le menu Démarrer/Dock, lançant l'application dans sa propre fenêtre haute résolution.

#### 🗑️ Procédure de Désinstallation / Suppression
* **Méthode 1 (Depuis la fenêtre de l'application - Recommandé)** :  
  Dans la fenêtre Pentalyze ouverte, cliquez sur le menu à trois points (**⋮** ou **···**) en haut à droite ➔ Sélectionnez **[Désinstaller Pentalyze...]** ➔ (Facultatif) Cochez "Effacer également les données" ➔ Cliquez sur **[Supprimer]**.
* **Méthode 2 (Gestionnaire d'applications du navigateur)** :  
  - Dans Chrome : Saisissez `chrome://apps` ➔ Clic droit sur **Pentalyze** ➔ **[Supprimer de Chrome...]**.
  - Dans Edge : Saisissez `edge://apps` ➔ Cliquez sur **[···]** ➔ **[Désinstaller]**.
* **Méthode 3 (Paramètres système Windows)** :  
  Menu Démarrer ➔ [Paramètres] ➔ [Applications] ➔ [Applications installées] ➔ Recherchez 'Pentalyze' ➔ Sélectionnez **[Désinstaller]**.
* **Méthode 4 (macOS Finder)** :  
  Finder ➔ [Applications] ou [Chrome Apps] ➔ Glissez 'Pentalyze' dans la Corbeille.

---

### 2. 📱 Mobiles & Tablettes (iOS Safari / Android Chrome)

#### 🍎 iPhone / iPad (iOS Safari)
* **Installation** : Ouvrez Safari ➔ Appuyez sur l'icône **Partager (⎋ / ↑)** ➔ Sélectionnez **[Sur l'écran d'accueil]** ➔ Appuyez sur **[Ajouter]**.
* **Désinstallation** : Maintenez l'icône Pentalyze enfoncée ➔ Appuyez sur **[Supprimer l'app]** ➔ **[Supprimer de l'écran d'accueil]** ou **[Supprimer]**.

#### 🤖 Android (Chrome)
* **Installation** : Ouvrez Chrome ➔ Menu **(⋮)** ➔ Appuyez sur **[Installer l'application]** ou **[Ajouter à l'écran d'accueil]** ➔ **[Installer]**.
* **Désinstallation** : Maintenez l'icône Pentalyze enfoncée ➔ Faites-la glisser vers **[Désinstaller]** ou choisissez **[Désinstaller]** dans le menu contextuel.

---

### 3. 💻 Exécution et Suppression du Projet Téléchargé (Git Clone / ZIP)

* **Lancement** :
  - Windows : Double-cliquez sur `start.bat`
  - macOS / Linux : Exécutez `bash start.sh` dans le terminal
* **Suppression Complète** :
  - L'application est autonome et portable ; elle n'altère ni la base de registre ni le système.
  - Déplacez simplement le dossier téléchargé vers la Corbeille pour le supprimer à 100%.
  - Pour effacer les clés API et l'historique stockés dans le navigateur, utilisez **[Tout effacer]** dans la Bibliothèque (📚) ou videz les données de navigation.

---

### 4. ☁️ Exécution et Suppression sur Google Colab Cloud Sandbox (Zero-Install)

> **Scripts 1-clic détaillés & guide opérationnel** : 📄 [GOOGLE_COLAB_GUIDE.md](./GOOGLE_COLAB_GUIDE.md)

Vous pouvez tester, exécuter et supprimer Pentalyze dans une machine virtuelle cloud (Ubuntu) sans aucune installation locale de Node.js ou d'outils de développement, directement via votre navigateur web.

* **💡 Consignes pour `your-username`** :  
  Dans `https://github.com/your-username/pentalyze.git`, remplacez `your-username` par **votre nom d'utilisateur GitHub** (ex: `developer-id`), ou collez directement l'adresse HTTPS de votre dépôt forké accessible via le bouton vert **[<> Code]** ➔ **[HTTPS]**.

* **Installation & Exécution en un clic (À coller dans une cellule Colab)** :
  ```python
  # 1. Configuration de l'environnement Node.js 20.x & installation de l'outil tunnel Cloudflare
  !curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && sudo apt-get install -y nodejs > /dev/null 2>&1
  !curl -sL https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o /usr/local/bin/cloudflared && chmod +x /usr/local/bin/cloudflared
  
  # 2. Clonage du dépôt (remplacez 'your-username' par votre identifiant GitHub)
  # (ex: !git clone https://github.com/developer-id/pentalyze.git /content/pentalyze)
  !rm -rf /content/pentalyze
  !git clone https://github.com/your-username/pentalyze.git /content/pentalyze
  %cd /content/pentalyze
  !npm install
  
  # 3. Lancement du serveur en arrière-plan & génération de l'URL publique
  import subprocess, time
  subprocess.Popen(["npm", "run", "dev"], cwd="/content/pentalyze")
  time.sleep(5) # Attente du démarrage du serveur
  !cloudflared tunnel --url http://localhost:3000
  ```
  *(Cliquez sur l'URL `https://*.trycloudflare.com` générée dans la sortie pour accéder instantanément à Pentalyze depuis n'importe quel appareil dans le monde)*
* **Suppression Complète (Teardown & Purge)** :
  ```bash
  # 1. Arrêter les processus : !pkill -f node && !pkill -f cloudflared
  # 2. Supprimer définitivement les fichiers : !rm -rf /content/pentalyze && !rm -f /usr/local/bin/cloudflared
  # 3. Réinitialiser l'environnement : Menu Colab [Exécution] ➔ [Déconnecter et supprimer l'environnement d'exécution]
  ```

---

## 📂 Structure du Projet (Project Directory)

```
pentalyze/
├── docs/                         # Guides multilingues et documents de passation technique
│   ├── DEVELOPER_HANDOVER_3D_XR_DRAG.md # [Fondamental] Analyse des interactions 3D/XR et feuille de route
│   ├── GOOGLE_COLAB_GUIDE.md     # [Nouveau] Guide de test, exécution et suppression Google Colab
│   └── README_*.md               # Guides utilisateurs globaux en 9 langues
├── public/                       # Manifeste PWA et ressources statiques
├── src/
│   ├── components/
│   │   ├── presets/              # Modules de phrases d'exemples par langue
│   │   ├── Book3D.tsx            # Tourne-page 3D et vue de comparaison côte à côte
│   │   ├── Header.tsx            # En-tête réactif, installation PWA et sélection de langue
│   │   ├── SentenceInput.tsx     # Saisie de texte et pipeline d'analyse en 5 dimensions
│   │   ├── BookshelfModal.tsx    # Bibliothèque personnelle de stockage
│   │   ├── ExportModal.tsx       # Exportation Markdown / PDF
│   │   └── SettingsModal.tsx     # Modal de configuration des clés API (BYOK)
│   ├── services/
│   │   ├── ai.ts                 # Pipeline multi-LLM (Gemini / OpenAI)
│   │   ├── tts.ts                # Moteur vocal hybride WebSpeech & ElevenLabs
│   │   └── storage.ts            # Gestionnaire de persistance LocalStorage
│   ├── i18n/
│   │   ├── locales/              # Dictionnaires pour 10 langues (ko, en, ja, hi, es, fr, de, it, pt, ru)
│   │   ├── translations.ts       # Enregistrement et mappage des 10 langues
│   │   └── types.ts              # Définitions de types pour les dictionnaires
│   ├── App.tsx                   # Composant racine de l'application
│   └── main.tsx                  # Point d'entrée React avec enregistrement du service worker PWA
├── package.json
├── start.bat                     # Fichier batch de lancement automatique sous Windows
├── start.sh                      # Script shell de lancement automatique sous Mac/Linux
└── README.md
```

---

## 🛠️ Passation Technique pour Développeurs & Administrateurs (Technical Handover)

> **Analyse Technique & Guide d'Action Détaillé** : 📄 [DEVELOPER_HANDOVER_3D_XR_DRAG.md](./DEVELOPER_HANDOVER_3D_XR_DRAG.md)  
> **Guide du Banc d'Essai Cloud** : 📄 [GOOGLE_COLAB_GUIDE.md](./GOOGLE_COLAB_GUIDE.md)

Pour les ingénieurs qui forkeront ce projet afin d'assurer **les futurs développements, l'optimisation des interactions, le déploiement en production et la maintenance**, les caractéristiques comportementales fines des boutons de glissement haut/bas lors de la désactivation de l'inclinaison (gyroscope/parallaxe) en modes **'3D Réaliste'** et **'Espace XR'**, ainsi que la mise en place d'un banc d'essai sous Google Colab, sont intégralement documentées.

### 📌 Synthèse des Enjeux Clés & Feuille de Route
1. **Analyse Comportementale** :
   * **Inclinaison ACTIVE** : L'évaluation continue des collisions (Continuous Hit-Testing) assurée par le thread compositeur du navigateur sous l'impulsion du gyroscope/souris garantit une réactivité immédiate au glisser.
   * **Inclinaison DESACTIVE** : Avec une rotation 3D statique (`rotateX: 14~18deg`), la mise en cache de la rastérisation sous-pixel et la divergence angulaire non linéaire entre l'écran 2D et le plan de projection 3D peuvent provoquer une sensation subtile de résistance au glissement.
2. **Feuille de Route Recommandée** :
   * **Court terme** : Seuil de glissement adaptatif haute densité (Retina/Mobile) & garde de sécurité par timer `onLostPointerCapture`.
   * **Moyen terme** : Calcul de projection inverse coordonnées écran vers repère local via `DOMMatrix.inverse()`.
   * **Long terme (Génération future)** : Migration complète vers un canevas 3D virtuel natif avec moteur Raycaster sous Three.js / WebGL / WebXR.
3. **Banc d'Essai Cloud (Cloud Sandbox Testbed)** :
   * Validation à distance sur terminaux mobiles réels (iOS Safari, Android Chrome) sans installation locale grâce aux tunnels Google Colab. Consultez [GOOGLE_COLAB_GUIDE.md](./GOOGLE_COLAB_GUIDE.md).

Pour les schémas d'architecture détaillés, les formules mathématiques et les matrices d'assurance qualité multi-navigateurs, veuillez vous référer au [Document de Passation Technique](./DEVELOPER_HANDOVER_3D_XR_DRAG.md).

---

## 📄 Licence

Ce projet est distribué sous la **Licence MIT**. Modification, utilisation commerciale et redistribution sont entièrement libres.
