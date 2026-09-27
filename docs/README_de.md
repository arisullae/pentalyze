# 📖 Pentalyze : 5-Stufen Satzanalyse & Interaktives 3D-Buch

> **Entdecken Sie 5 Dimensionen tiefgehender Erkenntnisse aus einem einzigen Satz in einem realistischen 3D-Digitalbuch**  
> *1 Satz ➔ 5 Analysedimensionen & Interaktives 3D-Hardcover-Buch*

[![PWA Ready](https://img.shields.io/badge/PWA-Installable-blue.svg)](https://web.dev/progressive-web-apps/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

### 🌐 Anleitungen in anderen Sprachen (Global Language Guides)
[**한국어 원문 (Main README)**](../README.md) | [**English Guide**](./README_en.md) | [**日本語**](./README_ja.md) | [**हिन्दी**](./README_hi.md) | [**Español**](./README_es.md) | [**Français**](./README_fr.md) | [**Italiano**](./README_it.md) | [**Português**](./README_pt.md) | [**Русский**](./README_ru.md)

---

## 📢 Hinweis zur Veröffentlichung & Archiv-Status
> **[Hinweis] Dieses Projekt wird auf GitHub als Open-Source-Archivprojekt bereitgestellt.**  
> Nach dieser Veröffentlichung sind seitens des Entwicklers **keine weiteren Funktionserweiterungen oder kontinuierlichen Wartungsarbeiten (Fehlerbehebungen, Updates) geplant.**  
> Sie sind herzlich eingeladen, das Projekt unter der MIT-Lizenz zu forken, zu modifizieren und für eigene Zwecke frei zu nutzen.

---

## 🌍 Unterstützte 10 Sprachen und Schriftsysteme

Pentalyze unterstützt nativ 10 globale Sprachen und ihre jeweiligen Schriftsysteme in Benutzeroberfläche und 3D-Übersetzung:

| Land / Region | Sprache | Lokale Bezeichnung | Schriftsystem | Sprachcode | Leitfaden |
| :---: | :---: | :---: | :---: | :---: | :---: |
| 🇰🇷 **Südkorea** | **Koreanisch** | 한국어 | **Hangeul (한글)** | `ko` | [Haupt-README](../README.md) |
| 🇺🇸 **USA / Global** | **Englisch** | English | **Lateinische Schrift** | `en` | [README_en.md](./README_en.md) |
| 🇯🇵 **Japan** | **Japanisch** | 日本語 | **Kanji & Kana (漢字・かな)** | `ja` | [README_ja.md](./README_ja.md) |
| 🇮🇳 **Indien** | **Hindi** | हिन्दी | **Devanagari-Schrift (देवनागरी)** | `hi` | [README_hi.md](./README_hi.md) |
| 🇪🇸 **Spanien / LATAM** | **Spanisch** | Español | **Lateinische Schrift** | `es` | [README_es.md](./README_es.md) |
| 🇫🇷 **Frankreich** | **Französisch** | Français | **Lateinische Schrift** | `fr` | [README_fr.md](./README_fr.md) |
| 🇩🇪 **Deutschland** | **Deutsch** | Deutsch | **Lateinische Schrift** | `de` | **Aktuelles Dokument** |
| 🇮🇹 **Italien** | **Italienisch** | Italiano | **Lateinische Schrift** | `it` | [README_it.md](./README_it.md) |
| 🇧🇷 **Brasilien / Portugal** | **Portugiesisch** | Português | **Lateinische Schrift** | `pt` | [README_pt.md](./README_pt.md) |
| 🇷🇺 **Russland** | **Russisch** | Русский | **Kyrillische Schrift (Кириллица)** | `ru` | [README_ru.md](./README_ru.md) |

---

## 🌟 Projektübersicht (Overview)

**Pentalyze** ist eine KI-gestützte Lösung zur vertieften Analyse, sprachlichen Verfeinerung und dreidimensionalen Visualisierung von Einzelsätzen oder kurzen Absätzen.

Mit nativer Unterstützung für die 10 oben aufgeführten Sprachen und Alphabete präsentiert Pentalyze Analyseergebnisse in einem lebendigen 3D-Hardcover-Buch mit authentischer Seitenblättermimik, einer zweisprachigen Gegenüberstellung (Split-View) und synchronisierter Sprachausgabe (TTS).

---

## 🔑 API-Architektur & Google AI Studio Leitfaden

### 1. Sicherheit & BYOK-Prinzip bei GitHub-Klonen
* Der Quellcode enthält keinerlei vertrauliche API-Schlüssel des Entwicklers.
* Beim Klonen und lokalen Ausführen greift die Anwendung auf das **BYOK-Prinzip (Bring Your Own Key)** zurück: Die Benutzer binden ihren eigenen Schlüssel ein.
* Die eingegebenen API-Schlüssel verbleiben ausschließlich im lokalen `localStorage` Ihres Browsers und werden niemals an Drittserver übermittelt.

### 2. Kostenlosen API-Schlüssel bei Google AI Studio anfordern (Empfohlen)
Pentalyze ist optimal auf die Gemini-Modelle von **Google AI Studio** abgestimmt:
1. Besuchen Sie [Google AI Studio (https://aistudio.google.com/)](https://aistudio.google.com/) und melden Sie sich an.
2. Klicken Sie auf **'Get API key'**.
3. Wählen Sie **'Create API key'** und kopieren Sie Ihren neuen Schlüssel.
4. Öffnen Sie in Pentalyze oben rechts die **Einstellungen (⚙️)**, wählen Sie **[Eigenen API-Schlüssel verwenden]**, tragen Sie den Gemini-Schlüssel ein und speichern Sie.
   - Alternativ eine `.env`-Datei aus `.env.example` im Projektstammverzeichnis anlegen:
     ```env
     VITE_GEMINI_API_KEY=ihr_google_ai_studio_schlüssel
     ```

### 3. Alternative KI-Modelle (OpenAI, DeepSeek, Lokales Ollama)
* **OpenAI (GPT-4o)**: Im Einstellungsfenster OpenAI auswählen und den API-Schlüssel (`sk-...`) eintragen.
* **Lokale LLMs (Ollama)**: Über `src/services/ai.ts` kann der Endpunkt einfach auf eine lokale Adresse (z. B. `http://localhost:11434/v1/chat/completions`) angepasst werden.

---

## 🎯 Die 5 Analysedimensionen ("Gyeol")

1. **Stufe 1: Interpretation**: Analyse von Wortlaut, Subtext, Intention und Tonalität.
2. **Stufe 2: Kernaussage (Summary)**: Auf den Punkt gebrachte Zusammenfassung der Hauptbotschaft.
3. **Stufe 3: Vertiefte Erklärung**: Fachtermini, thematischer Hintergrund und Kontextwissen.
4. **Stufe 4: Grammatik & Stilfeinschliff**: Beseitigung stilistischer Mängel und Überarbeitung in geschliffenes Hochdeutsch.
5. **Stufe 5: Paraphrasierung**: 3 elegante Neuformulierungen für unterschiedliche Register.

---

## 🚀 Kernfunktionen

- **Interaktives 3D-Buch**: CSS-3D-Perspektive, dynamische Wölbungen und Blättern per Maus-/Touch-Geste.
- **Zweistufige Mehrsprachigkeit**: UI in der gewohnten Muttersprache, während das Buch beliebig in eine der 10 Zielsprachen übersetzt und vorgelesen werden kann.
- **Zweisprachige Split-View**: Direkter Parallelvergleich zwischen Original und veredeltem Satz.
- **PWA-Unterstützung**: Als eigenständige App auf Mobilgeräten und Desktops installierbar inkl. Offline-Modus.
- **Hybrid-Audioausgabe (TTS)**: Standard-Sprachsynthese im Browser plus optionale ElevenLabs-Anbindung.
- **Eigene Bibliothek & Export**: Lokale Archivierung und Export in Markdown oder PDF.

---

## 📦 Schnellstart (Quick Start)

### Voraussetzungen
- **Node.js** 18.0 oder höher (LTS-Version von der [offiziellen Website (nodejs.org)](https://nodejs.org/) installieren)

---

### 🖱️ Allgemeine Benutzer: Ein-Klick-Start (Empfohlen)
Laden Sie das Repository herunter (ZIP entpacken) und doppelklicken Sie einfach auf die Datei für Ihr Betriebssystem. Dadurch werden **alle Abhängigkeiten automatisch installiert und das 3D-Buch im Browser geöffnet**:

* **Windows-Benutzer**: Doppelklicken Sie auf die Datei **`start.bat`**.
* **macOS / Linux-Benutzer**: Führen Sie `bash start.sh` im Terminal aus oder doppelklicken Sie auf `start.sh`.

---

### 💻 Entwickler: Manuelle Befehle im Terminal
```bash
# Repository klonen
git clone https://github.com/your-username/pentalyze.git
cd pentalyze

# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten (Port 3000)
npm run dev

# Für Produktion erstellen
npm run build
```

---

## 📄 Lizenz

Dieses Projekt ist unter der **MIT-Lizenz** lizenziert. Freie Nutzung, Modifikation und Weitergabe sind gestattet.
