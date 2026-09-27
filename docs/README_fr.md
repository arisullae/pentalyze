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

## 📄 Licence

Ce projet est distribué sous la **Licence MIT**. Modification, utilisation commerciale et redistribution sont entièrement libres.
