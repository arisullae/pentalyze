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

## 📲 App-Installations- (PWA) und Deinstallationsanleitung

> 💡 **Hinweis zu Bereitstellung und Benutzer-App-Installation**:  
> Egal, ob Sie dieses Projekt unverändert bereitstellen oder mit eigenen Anpassungen und Erweiterungen als Dienst betreiben: Alle erforderlichen Komponenten (PWA-Manifest, Service Worker und interaktives Installations-Modal) sind vollständig integriert. Besucher können die Anwendung über die Schaltfläche **[App installieren]** in der Kopfzeile oder über die browserinterne Funktion auf PCs, Tablets und Smartphones als eigenständige native App (PWA) installieren und nutzen.

Pentalyze unterstützt den modernen **PWA (Progressive Web App)**-Standard. Die Anwendung kann ohne App-Store direkt auf Desktop-PCs und Mobilgeräten als eigenständige App ohne Adressleiste installiert und jederzeit rückstandslos entfernt werden.

### 1. 🖥️ Desktop-PC (Windows / macOS / Linux)

#### 📥 Installation
1. **Über die Adressleiste**: In Chrome, Edge, Brave oder Whale auf das Symbol **[Installieren (⊕ / 💻)]** am rechten Rand der Adressleiste klicken.
2. **Über die App**: Auf den Button **[App installieren]** in der oberen Leiste klicken und im Dialog **[Installieren]** wählen.
3. Ein Desktop-Icon wird erstellt und die App öffnet sich in einem separaten Fenster.

#### 🗑️ Deinstallation / Entfernen
* **Methode 1 (Direkt aus dem App-Fenster - Empfohlen)**:  
  Im geöffneten App-Fenster oben rechts auf das Dreipunkt-Menü (**⋮** oder **···**) klicken ➔ **[Pentalyze deinstallieren...]** wählen ➔ (Optional) Daten löschen anhaken ➔ Auf **[Entfernen]** klicken.
* **Methode 2 (Browser-App-Manager)**:  
  - In Chrome: `chrome://apps` aufrufen ➔ Rechtsklick auf **Pentalyze** ➔ **[Aus Chrome entfernen...]**.
  - In Edge: `edge://apps` aufrufen ➔ Klick auf **[···]** ➔ **[Deinstallieren]**.
* **Methode 3 (Windows-Einstellungen)**:  
  Windows-Start ➔ [Einstellungen] ➔ [Apps] ➔ [Installierte Apps] ➔ Nach 'Pentalyze' suchen ➔ **[Deinstallieren]** wählen.
* **Methode 4 (macOS Finder)**:  
  Finder ➔ [Programme (Applications)] oder [Chrome Apps] ➔ 'Pentalyze' in den Papierkorb ziehen.

---

### 2. 📱 Smartphone & Tablet (iOS Safari / Android Chrome)

#### 🍎 iPhone / iPad (iOS Safari)
* **Installation**: In Safari auf das **Teilen-Symbol (⎋ / ↑)** tippen ➔ **[Zum Home-Bildschirm]** wählen ➔ Oben rechts auf **[Hinzufügen]** tippen.
* **Deinstallation**: Das App-Icon auf dem Home-Bildschirm gedrückt halten ➔ **[App entfernen]** ➔ **[Vom Home-Bildschirm entfernen]** oder **[App löschen]**.

#### 🤖 Android (Chrome)
* **Installation**: In Chrome auf das **Menü (⋮)** tippen ➔ **[App installieren]** oder **[Zum Startbildschirm hinzufügen]** ➔ **[Installieren]**.
* **Deinstallation**: App-Icon gedrückt halten ➔ Nach oben auf **[Deinstallieren]** ziehen oder im Menü **[Deinstallieren]** wählen.

---

### 3. 💻 Lokales Projekt (Git Clone / ZIP) starten und entfernen

* **Ausführen**:
  - Windows: Doppelklick auf `start.bat`
  - macOS / Linux: `bash start.sh` im Terminal ausführen
* **Vollständige Entfernung**:
  - Pentalyze ist portabel und verändert keine System- oder Registrierungsdateien.
  - Das Löschen des Projektordners in den Papierkorb entfernt die Anwendung zu 100%.
  - Gespeicherte API-Schlüssel im Browser können über **[Alle löschen]** in der Bibliothek (📚) oder über das Löschen der Browserdaten entfernt werden.

---

### 4. ☁️ Google Colab Cloud-Sandbox Ausführung & Bereinigung (Zero-Install)

> **Detaillierte One-Click-Skripte & Betriebsleitfaden**: 📄 [GOOGLE_COLAB_GUIDE.md](./GOOGLE_COLAB_GUIDE.md)

Sie können Pentalyze ohne jegliche lokale Installation von Node.js oder Entwicklungstools sicher in einer Cloud-VM (Ubuntu) über Ihren Webbrowser testen, betreiben und rückstandslos entfernen.

* **💡 Hinweis zu `your-username`**:  
  Ersetzen Sie in `https://github.com/your-username/pentalyze.git` den Platzhalter `your-username` durch **Ihren GitHub-Benutzernamen** (z. B. `developer-id`) oder fügen Sie die geklonte HTTPS-URL Ihres Fork-Repositories über die grüne Schaltfläche **[<> Code]** ➔ **[HTTPS]** ein.

* **One-Click Installation & Start (in Colab-Zelle einfügen)**:
  ```python
  # 1. Node.js 20.x Umgebung einrichten & Cloudflare Tunnel-Tool installieren
  !curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && sudo apt-get install -y nodejs > /dev/null 2>&1
  !curl -sL https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o /usr/local/bin/cloudflared && chmod +x /usr/local/bin/cloudflared
  
  # 2. Repository klonen ('your-username' durch eigene GitHub-ID ersetzen)
  # (z. B. !git clone https://github.com/developer-id/pentalyze.git /content/pentalyze)
  !rm -rf /content/pentalyze
  !git clone https://github.com/your-username/pentalyze.git /content/pentalyze
  %cd /content/pentalyze
  !npm install
  
  # 3. Hintergrund-Server starten & öffentlichen Tunnel-Link generieren
  import subprocess, time
  subprocess.Popen(["npm", "run", "dev"], cwd="/content/pentalyze")
  time.sleep(5) # Wartezeit auf Server-Start
  !cloudflared tunnel --url http://localhost:3000
  ```
  *(Über die in der Ausgabe generierte URL `https://*.trycloudflare.com` ist Pentalyze sofort weltweit im Browser aufrufbar)*
* **Vollständige Bereinigung (Teardown & Purge)**:
  ```bash
  # 1. Prozesse beenden: !pkill -f node && !pkill -f cloudflared
  # 2. Dateien dauerhaft löschen: !rm -rf /content/pentalyze && !rm -f /usr/local/bin/cloudflared
  # 3. Laufzeitumgebung zurücksetzen: Im Colab-Menü [Laufzeit] ➔ [Laufzeit trennen und löschen] wählen
  ```

---

## 📂 Projektstruktur (Project Directory)

```
pentalyze/
├── docs/                         # Mehrsprachige Anleitungen & technische Übergabedokumente
│   ├── DEVELOPER_HANDOVER_3D_XR_DRAG.md # [Kern] 3D/XR Drag-Interaktionsanalyse & Roadmap
│   ├── GOOGLE_COLAB_GUIDE.md     # [Neu] Google Colab Cloud-Sandbox Test-, Betriebs- & Bereinigungsleitfaden
│   └── README_*.md               # Globale Benutzerhandbücher in 9 Sprachen
├── public/                       # PWA-Manifest und statische Assets
├── src/
│   ├── components/
│   │   ├── presets/              # Beispielsatz-Module für jede Sprache
│   │   ├── Book3D.tsx            # 3D-Buchumblättern & geteilte Vergleichsansicht
│   │   ├── Header.tsx            # Responsiver Header, PWA-Installation & Sprachauswahl
│   │   ├── SentenceInput.tsx     # Satzeingabe & 5-Dimensionen-Analyse-Pipeline
│   │   ├── BookshelfModal.tsx    # Persönliche Bibliothek
│   │   ├── ExportModal.tsx       # Markdown- / PDF-Export
│   │   └── SettingsModal.tsx     # BYOK API-Schlüssel-Modal
│   ├── services/
│   │   ├── ai.ts                 # Gemini / OpenAI Multi-LLM-Pipeline
│   │   ├── tts.ts                # WebSpeech & ElevenLabs hybride Sprachausgabe
│   │   └── storage.ts            # LocalStorage Persistenz-Manager
│   ├── i18n/
│   │   ├── locales/              # Wörterbücher für 10 Sprachen (ko, en, ja, hi, es, fr, de, it, pt, ru)
│   │   ├── translations.ts       # Registrierung und Zuordnung von 10 Sprachen
│   │   └── types.ts              # Typdefinitionen für Wörterbücher
│   ├── App.tsx                   # Hauptanwendungs-Komponente
│   └── main.tsx                  # React-Einstiegspunkt mit Service-Worker-Registrierung
├── package.json
├── start.bat                     # Windows Ein-Klick-Autostart-Batch-Datei
├── start.sh                      # Mac/Linux Ein-Klick-Autostart-Shell-Skript
└── README.md
```

---

## 🛠️ Technische Übergabe für Entwickler & Betreiber (Technical Handover)

> **Detaillierte Analyse & Maßnahmen**: 📄 [DEVELOPER_HANDOVER_3D_XR_DRAG.md](./DEVELOPER_HANDOVER_3D_XR_DRAG.md)  
> **Cloud-Testbed Leitfaden**: 📄 [GOOGLE_COLAB_GUIDE.md](./GOOGLE_COLAB_GUIDE.md)

Für Ingenieure, die dieses Projekt forken, um **zukünftige Weiterentwicklungen, Interaktionsverbesserungen, Produktions-Deployments und Betrieb** zu übernehmen, sind die Verhaltenscharakteristika der oberen und unteren Drag-Buttons bei deaktiviertem Neigungssensor (Gyroskop/Parallaxe) im **'3D-Realistisch'**- und **'XR-Raum'**-Modus sowie die Einrichtung einer Testumgebung via Google Colab dokumentiert.

### 📌 Zusammenfassung der Kernpunkte & Roadmap
1. **Verhaltensanalyse**:
   * **Tilt AKTIV**: Kontinuierliches Hit-Testing des Browser-Compositor-Threads durch Gyro/Maus-Deltas ermöglicht sofortige Drag-Reaktion.
   * **Tilt INAKTIV**: Bei fixer 3D-Drehung (`rotateX: 14~18deg`) können Subpixel-Rasterungs-Caching und nicht-lineare Winkelabweichungen zwischen 2D-Bildschirm und 3D-Projektionsebene zu einem subtilen Bedienungswiderstand führen.
2. **Empfohlene Maßnahmen**:
   * **Kurzfristig**: Dynamische Schwellenwert-Anpassung für High-DPI/Mobilgeräte & `onLostPointerCapture` Failsafe-Timer-Guard.
   * **Mittelfristig**: Inverse Projektionsberechnung von Bildschirm- zu lokalen Koordinaten mittels `DOMMatrix.inverse()`.
   * **Langfristig (Next-Gen)**: Vollständige Migration auf eine virtuelle 3D-Canvas mit nativer Three.js / WebGL / WebXR Raycaster-Engine.
3. **Cloud-Sandbox Testbed**:
   * Remote-Validierung auf realen Mobilgeräten (iOS Safari, Android Chrome) ohne lokale Umgebungseinrichtung über Google Colab Tunneling. Details siehe [GOOGLE_COLAB_GUIDE.md](./GOOGLE_COLAB_GUIDE.md).

Ausführliche Architekturdiagramme, mathematische Koordinatenformeln und Browser-QA-Matrizen finden Sie im [Technischen Übergabedokument](./DEVELOPER_HANDOVER_3D_XR_DRAG.md).

---

## 📄 Lizenz

Dieses Projekt ist unter der **MIT-Lizenz** lizenziert. Freie Nutzung, Modifikation und Weitergabe sind gestattet.
