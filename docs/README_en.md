# 📖 Pentalyze : 5-Step Sentence Insights & 3D Flip-Book

> **Discover 5 Layers of Deep Insights from a Single Sentence in an Interactive 3D Digital Book**  
> *Transform 1 Sentence into 5-Dimensional Perspectives & Realistic Hardcover Flip-Book*

[![PWA Ready](https://img.shields.io/badge/PWA-Installable-blue.svg)](https://web.dev/progressive-web-apps/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

### 🌐 Global Language Guides
[**한국어 원문 (Main README)**](../README.md) | [**日本語**](./README_ja.md) | [**हिन्दी**](./README_hi.md) | [**Español**](./README_es.md) | [**Français**](./README_fr.md) | [**Deutsch**](./README_de.md) | [**Italiano**](./README_it.md) | [**Português**](./README_pt.md) | [**Русский**](./README_ru.md)

---

## 📢 Project Release & Archive Notice
> **[Notice] This project is an open-source archive repository shared on GitHub.**  
> Following this public release, **no further active feature development, updates, or maintenance (bug patches, issue responses) are planned by the author.**  
> You are warmly welcome to fork, modify, and utilize this codebase for your own projects, educational pursuits, or commercial products under the MIT License.

---

## 🌍 Supported 10 Languages & Writing Scripts

Pentalyze natively supports 10 global languages and their respective writing systems in both UI and 3D translation:

| Country / Region | Language | Native Name | Writing Script | Code | Guide Document |
| :---: | :---: | :---: | :---: | :---: | :---: |
| 🇰🇷 **South Korea** | **Korean** | 한국어 | **Hangul (한글)** | `ko` | [Main README](../README.md) |
| 🇺🇸 **USA / Global** | **English** | English | **Latin script** | `en` | **Current Document** |
| 🇯🇵 **Japan** | **Japanese** | 日本語 | **Kanji & Kana (漢字・かな)** | `ja` | [README_ja.md](./README_ja.md) |
| 🇮🇳 **India** | **Hindi** | हिन्दी | **Devanagari script (देवनागरी)** | `hi` | [README_hi.md](./README_hi.md) |
| 🇪🇸 **Spain / LATAM** | **Spanish** | Español | **Latin script** | `es` | [README_es.md](./README_es.md) |
| 🇫🇷 **France** | **French** | Français | **Latin script** | `fr` | [README_fr.md](./README_fr.md) |
| 🇩🇪 **Germany** | **German** | Deutsch | **Latin script** | `de` | [README_de.md](./README_de.md) |
| 🇮🇹 **Italy** | **Italian** | Italiano | **Latin script** | `it` | [README_it.md](./README_it.md) |
| 🇧🇷 **Brazil / Portugal** | **Portuguese** | Português | **Latin script** | `pt` | [README_pt.md](./README_pt.md) |
| 🇷🇺 **Russia** | **Russian** | Русский | **Cyrillic script (Кириллица)** | `ru` | [README_ru.md](./README_ru.md) |

---

## 🌟 Overview

**Pentalyze** is an AI-powered sentence analysis and visualization solution that extracts 5 distinct contextual, linguistic, and analytical layers ("Gyeol" in Korean) from a single sentence or short passage. 

With full native support for the 10 global languages and scripts shown above, Pentalyze renders analyzed results into an interactive 3D digital hardcover book featuring realistic page-turning physics, a bilingual side-by-side comparison view (Split-View), and real-time synchronized text-to-speech (TTS).

---

## 🔑 API Keys & Google AI Studio Guide

### 1. Security & 'Default Server Key' in GitHub Clones
* When you clone and run this project locally, **no pre-configured server API keys or author credentials are shared or executed**.
* The application runs on a strict **BYOK (Bring Your Own Key)** architecture. Your API keys are stored exclusively in your browser's `localStorage` and are never transmitted to any third-party backend servers.

### 2. Getting a Free Google AI Studio API Key (Recommended)
This application is optimized for **Google AI Studio** and Gemini 2.5 Flash. You can acquire a free personal API key in seconds:
1. Visit [Google AI Studio (https://aistudio.google.com/)](https://aistudio.google.com/) and sign in with your Google account.
2. Click **'Get API key'** in the navigation bar.
3. Click **'Create API key'**, select or create a Google Cloud project, and copy your generated key.
4. In Pentalyze, click the **Settings icon (⚙️)** in the top right corner, select **'Use Custom API Key'**, paste your Gemini key, and click Save.
   - Alternatively, copy `.env.example` to `.env` in the root folder and set:
     ```env
     VITE_GEMINI_API_KEY=your_gemini_api_key_here
     ```

### 3. Alternative AI Models (OpenAI, DeepSeek, Local Ollama)
* **OpenAI (GPT-4o / GPT-4o-mini)**: Choose OpenAI in the Settings modal and supply your `sk-...` key.
* **DeepSeek / Ollama / Self-hosted LLMs**: Edit `src/services/ai.ts` to customize the base URL to point to your local or private API endpoint (e.g., `http://localhost:11434/v1/chat/completions`).

---

## 🎯 The 5 Dimensions ("Gyeol")

1. **Layer 1: Interpretation**: Unpacks surface meaning as well as underlying motives, subtext, and tone.
2. **Layer 2: Core Summary**: Condenses the central thesis into a single, punchy takeaway.
3. **Layer 3: In-Depth Explanation**: Provides background context, domain terminology, and cultural nuances.
4. **Layer 4: Grammar & Polish**: Rectifies grammatical errors, unnatural phrasing, and elevates prose into professional formal diction.
5. **Layer 5: Creative Paraphrasing**: Offers 3 distinct alternative phrasings suited for different registers and stylistic intents.

---

## 🚀 Key Features

- **Responsive 3D Flip-Book Engine**: 
  - CSS 3D perspective transformations, realistic paper curvature highlights, and hardcover shadow overlays.
  - **2-Page Spread (Desktop & Wide Tablets)**: Dual-page layout with top corner hinge controls and smooth horizontal flip.
  - **Single-Page View (Mobile & Tablet Portrait)**: Mobile-optimized 1-page layout with clean top/bottom page navigation (`Prev (Step N · ...)`, `Next (Step N+1 · ...)`), isolated from vertical content scrolling (`pan-y`) to prevent touch gesture conflicts.
  - **Dual-Mode Grip & Drag Interaction**:
    - **OFF (Default)**: Instant single-click page turns.
    - **ON (Physical Grip Mode)**: Enforces hold-and-drag gesture on navigation buttons before flipping to prevent accidental taps, accompanied by guidance toasts and haptic feedback.
- **Dual-Layer Internationalization**: Keep system UI in your native language while reading and translating book contents in any of the 10 supported global languages.
- **Bilingual Split-View (Dual Comparative View)**:
  - Side-by-side comparative inspection between original text and translated insights.
  - Streamlined header with country code badges (`KR`, `US`, etc.) and dedicated audio reading buttons (`Original Narration` / `Translation Narration` / `Alternate Narration`).
- **Progressive Web App (PWA)**: Installable standalone application on iOS, Android, macOS, and Windows with offline support.
- **Hybrid Audiobook Player**: Native Web Speech API synthesis coupled with optional ElevenLabs voice cloning.
- **Local Bookshelf & Export**: Save generated books to browser storage and export to Markdown or PDF.

---

## 📦 Quick Start

```bash
# Clone the repository
git clone https://github.com/your-username/pentalyze.git
cd pentalyze

# Install dependencies
npm install

# Start local development server (Port 3000)
npm run dev

# Build production bundle
npm run build
```

---

## 📄 License

This project is licensed under the [MIT License](../LICENSE). Feel free to fork and build upon it!
