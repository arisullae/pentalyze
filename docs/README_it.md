# 📖 Pentalyze : Analisi in 5 Livelli & Libro 3D Interattivo

> **Scopri 5 livelli di analisi e intuizioni profonde da una singola frase in un libro digitale 3D interattivo**  
> *1 Frase ➔ 5 Dimensioni Analitiche & Libro Cartonato 3D con Sfoglio Pagine*

[![PWA Ready](https://img.shields.io/badge/PWA-Installable-blue.svg)](https://web.dev/progressive-web-apps/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[**한국어 원문 (Main README)**](../README.md) | [**English Guide**](./README_en.md) | [**日本語**](./README_ja.md) | [**हिन्दी**](./README_hi.md) | [**Español**](./README_es.md) | [**Français**](./README_fr.md) | [**Deutsch**](./README_de.md) | [**Português**](./README_pt.md) | [**Русский**](./README_ru.md)

---

## 📢 Avviso di Pubblicazione e Stato di Archivio (Archive)
> **[Avviso] Questo progetto è reso pubblico su GitHub come archivio open source.**  
> A seguito della pubblicazione, **l'autore non ha in programma ulteriori sviluppi di nuove funzionalità né manutenzione continuativa (correzione di bug, aggiornamenti periodici).**  
> Siete invitati a effettuare il fork del repository, modificarlo e utilizzarlo liberamente per scopi personali, accademici o commerciali nel rispetto della licenza MIT.

---

## 🌟 Panoramica del Progetto (Overview)

**Pentalyze** è una soluzione basata sull'intelligenza artificiale per l'analisi approfondita, il perfezionamento stilistico e la visualizzazione 3D di frasi o brevi testi. Da una singola frase, il sistema estrae cinque dimensioni analitiche complementari ("Gyeol").

Il sistema supporta nativamente 10 lingue e i relativi sistemi di scrittura (coreano in Hangul, hindi in Devanagari, russo in Cirillico, giapponese in Kanji/Kana, inglese, spagnolo, francese, tedesco, italiano e portoghese in caratteri latini). I risultati vengono visualizzati all'interno di un libro rilegato 3D con fisica realistica di sfoglio, vista comparativa bilingue a schermo diviso (Split-View) e lettura vocale multilingue in tempo reale (TTS).

---

## 🔑 Architettura API e Guida a Google AI Studio

### 1. Sicurezza e funzionamento con modello 'BYOK' nei cloni GitHub
* Il codice sorgente non contiene alcuna chiave API personale dell'autore.
* Quando il progetto viene clonato ed eseguito in locale, opera secondo l'architettura sicura **BYOK (Bring Your Own Key)**: l'utente utilizza la propria chiave.
* Le chiavi API inserite nel browser rimangono isolate nel `localStorage` del dispositivo e non vengono mai inviate a server terzi.

### 2. Come ottenere una chiave gratuita su Google AI Studio (Consigliato)
Pentalyze è ottimizzato per l'API Gemini di **Google AI Studio**:
1. Accedere a [Google AI Studio (https://aistudio.google.com/)](https://aistudio.google.com/) con il proprio account Google.
2. Cliccare su **'Get API key'** nel menu di navigazione.
3. Selezionare **'Create API key'**, creare o scegliere un progetto e copiare la chiave generata.
4. Nell'app Pentalyze, cliccare sull'icona delle **Impostazioni (⚙️)** in alto a destra, selezionare **[Usa la mia chiave API]**, incollare la chiave Gemini e fare clic su **Salva**.
   - Oppure creare un file `.env` partendo da `.env.example` nella directory radice:
     ```env
     VITE_GEMINI_API_KEY=la_tua_chiave_google_ai_studio
     ```

### 3. Integrazione con altri modelli (OpenAI, DeepSeek, Ollama locale)
* **OpenAI (GPT-4o)**: Nel pannello impostazioni, selezionare OpenAI e inserire la chiave `sk-...`.
* **LLM Locali (Ollama)**: Modificare il file `src/services/ai.ts` per indirizzare l'endpoint di base verso il proprio server locale (es. `http://localhost:11434/v1/chat/completions`).

---

## 🎯 Le 5 Dimensioni di Analisi ("Gyeol")

1. **Livello 1: Interpretazione (Interpretation)**: Esplora il significato letterale, i sottotesti impliciti e la tonalità emotiva.
2. **Livello 2: Sintesi Chiave (Summary)**: Condensa il messaggio essenziale in una formulazione concisa e immediata.
3. **Livello 3: Spiegazione Dettagliata (Deep Explanation)**: Approfondimento del lessico specialistico e del contesto conoscitivo.
4. **Livello 4: Revisione Grammaticale & Stile (Grammar & Polish)**: Correzione di imprecisioni sintattiche e riscrittura in stile formale ed elegante.
5. **Livello 5: Parafrasi Creativa (Paraphrasing)**: 3 raffinate alternative di espressione adatte a diversi registri comunicativi.

---

## 🚀 Caratteristiche Principali

- **Libro 3D Realistico**: Prospettiva CSS 3D, curvatura dinamica delle pagine, ombre realistiche e sfoglio tramite tocco o mouse drag.
- **Doppia Architettura Multilingue**: Interfaccia di sistema nella propria lingua madre, con possibilità di tradurre e ascoltare il contenuto del libro in una qualsiasi delle 10 lingue supportate.
- **Vista Comparativa Bilingue (Split-View)**: Confronto simultaneo affiancato tra la frase originale e il testo revisionato.
- **PWA (Progressive Web App)**: Installabile come app nativa su smartphone, tablet e PC, con funzionamento offline.
- **Motore Vocale Ibrido (TTS)**: Sintesi vocale standard integrata nel browser e supporto opzionale a ElevenLabs.
- **Libreria Personale ed Esportazione**: Salvataggio automatico locale ed esportazione in formato Markdown o PDF.

---

## 📦 Avvio Rapido (Quick Start)

### Prerequisiti
- **Node.js** 18.0 o superiore (installare la versione LTS dal [sito ufficiale (nodejs.org)](https://nodejs.org/))

---

### 🖱️ Utenti generici: Avvio con un solo clic (Consigliato)
Dopo aver scaricato il repository (estrai il file ZIP), fai doppio clic sul file corrispondente al tuo sistema operativo per **installare le dipendenze e avviare automaticamente il libro 3D nel browser**:

* **Utenti Windows**: Fai doppio clic sul file **`start.bat`**.
* **Utenti macOS / Linux**: Esegui `bash start.sh` nel terminale oppure fai doppio clic su `start.sh`.

---

### 💻 Sviluppatori: Comandi da terminale
```bash
# Clona il repository
git clone https://github.com/your-username/pentalyze.git
cd pentalyze

# Installa le dipendenze
npm install

# Avvia il server di sviluppo locale (Porta 3000)
npm run dev

# Compila la versione per produzione
npm run build
```

---

## 📲 Guida all'Installazione (PWA) e Disinstallazione dell'App

> 💡 **Distribuzione del servizio e installazione dell'app per gli utenti**:  
> Sia che distribuisciate questo progetto così com'è, sia che avviiate un servizio modificato e migliorato con le vostre personalizzazioni, tutti i componenti necessari (Manifest PWA, Service Worker e modale interattivo di installazione) sono completamente integrati. In questo modo, qualsiasi utente che visiti la pagina da PC, tablet o smartphone potrà installare ed eseguire l'applicazione come app nativa indipendente (PWA) tramite il pulsante **[Installa App]** nell'intestazione o le funzioni native del browser.

Pentalyze supporta pienamente lo standard **PWA (Progressive Web App)**. È possibile installare l'applicazione direttamente su PC desktop e dispositivi mobili senza passare dagli store di app, usandola come app nativa senza la barra degli indirizzi del browser. Può essere rimossa in qualsiasi momento senza lasciare residui.

### 1. 🖥️ PC Desktop (Windows / macOS / Linux)

#### 📥 Come Installare
1. **Dalla barra degli indirizzi**: In Chrome, Edge, Brave o Whale, fai clic sull'icona **[Installa (⊕ / 💻)]** a destra nella barra degli indirizzi.
2. **Dal pulsante nell'app**: Fai clic su **[Installa App]** nella barra superiore e premi **[Installa]** nel popup.
3. Verrà creata un'icona sul desktop e nel menu Start/Dock per l'avvio in finestra dedicata.

#### 🗑️ Come Disinstallare / Rimuovere
* **Metodo 1 (Dalla finestra dell'app - Consigliato)**:  
  Nella finestra aperta di Pentalyze, fai clic sul menu a tre punti (**⋮** o **···**) in alto a destra ➔ Seleziona **[Disinstalla Pentalyze...]** ➔ (Facoltativo) Spunta "Cancella anche i dati" ➔ Fai clic su **[Rimuovi]**.
* **Metodo 2 (Gestione app del browser)**:  
  - In Chrome: Digita `chrome://apps` ➔ Clic destro su **Pentalyze** ➔ **[Rimuovi da Chrome...]**.
  - In Edge: Digita `edge://apps` ➔ Fai clic su **[···]** ➔ **[Disinstalla]**.
* **Metodo 3 (Impostazioni di sistema Windows)**:  
  Start ➔ [Impostazioni] ➔ [App] ➔ [App installate] ➔ Cerca 'Pentalyze' ➔ **[Disinstalla]**.
* **Metodo 4 (macOS Finder)**:  
  Finder ➔ [Applicazioni] o [Chrome Apps] ➔ Trascina 'Pentalyze' nel Cestino.

---

### 2. 📱 Smartphone e Tablet (iOS Safari / Android Chrome)

#### 🍎 iPhone / iPad (iOS Safari)
* **Installazione**: Apri Safari ➔ Tocca l'icona **Condividi (⎋ / ↑)** ➔ Seleziona **[Aggiungi alla schermata Home]** ➔ Tocca **[Aggiungi]**.
* **Disinstallazione**: Tieni premuta l'icona di Pentalyze ➔ Tocca **[Rimuovi app]** ➔ **[Elimina dalla schermata Home]** o **[Elimina app]**.

#### 🤖 Android (Chrome)
* **Installazione**: Apri Chrome ➔ Menu **(⋮)** ➔ Tocca **[Installa app]** o **[Aggiungi a schermata Home]** ➔ **[Installa]**.
* **Disinstallazione**: Tieni premuta l'icona di Pentalyze ➔ Trascina su **[Disinstalla]** o seleziona **[Disinstalla]** dal menu.

---

### 3. 💻 Esecuzione e Rimozione del Progetto Scaricato (Git Clone / ZIP)

* **Esecuzione**:
  - Windows: Doppio clic su `start.bat`
  - macOS / Linux: Esegui `bash start.sh` nel terminale
* **Rimozione Completa**:
  - Il progetto è autonomo e portatile; non altera il registro né i file di sistema.
  - È sufficiente cestinare l'intera cartella scaricata per rimuoverla al 100%.
  - Per azzerare le chiavi API e la libreria salvate nel browser, premi **[Elimina tutto]** nella Libreria (📚) o svuota i dati del browser.

---

### 4. ☁️ Esecuzione e Rimozione su Google Colab Cloud Sandbox (Zero-Install)

> **Script dettagliati con 1 clic & guida operativa**: 📄 [GOOGLE_COLAB_GUIDE.md](./GOOGLE_COLAB_GUIDE.md)

Puoi testare, eseguire e rimuovere Pentalyze in una macchina virtuale cloud (Ubuntu) senza alcuna installazione locale di Node.js o strumenti di sviluppo, direttamente tramite il tuo browser web.

* **💡 Guida a `your-username`**:  
  In `https://github.com/your-username/pentalyze.git`, sostituisci `your-username` con **il tuo nome utente GitHub** (es: `developer-id`), oppure incolla l'URL HTTPS del tuo repository forked copiato dal pulsante verde **[<> Code]** ➔ **[HTTPS]**.

* **Installazione ed esecuzione con un clic (Incolla nella cella di Colab)**:
  ```python
  # 1. Configura ambiente Node.js 20.x e installa strumento tunnel Cloudflare
  !curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && sudo apt-get install -y nodejs > /dev/null 2>&1
  !curl -sL https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o /usr/local/bin/cloudflared && chmod +x /usr/local/bin/cloudflared
  
  # 2. Clona repository (sostituisci 'your-username' con il tuo ID GitHub)
  # (es: !git clone https://github.com/developer-id/pentalyze.git /content/pentalyze)
  !rm -rf /content/pentalyze
  !git clone https://github.com/your-username/pentalyze.git /content/pentalyze
  %cd /content/pentalyze
  !npm install
  
  # 3. Avvia server in background e ottieni URL pubblico
  import subprocess, time
  subprocess.Popen(["npm", "run", "dev"], cwd="/content/pentalyze")
  time.sleep(5) # Attesa avvio server
  !cloudflared tunnel --url http://localhost:3000
  ```
  *(Fai clic sull'URL `https://*.trycloudflare.com` generato nell'output per accedere istantaneamente a Pentalyze da qualsiasi dispositivo nel mondo)*
* **Rimozione Completa (Teardown & Purge)**:
  ```bash
  # 1. Ferma processi: !pkill -f node && !pkill -f cloudflared
  # 2. Elimina file permanentemente: !rm -rf /content/pentalyze && !rm -f /usr/local/bin/cloudflared
  # 3. Reimposta runtime: Nel menu Colab [Runtime] ➔ [Disconnetti ed elimina runtime]
  ```

---

## 📂 Struttura del Progetto (Project Directory)

```
pentalyze/
├── docs/                         # Guide multilingue e documenti di passaggio tecnico
│   ├── DEVELOPER_HANDOVER_3D_XR_DRAG.md # [Fondamentale] Analisi interazione di trascinamento 3D/XR e roadmap
│   ├── GOOGLE_COLAB_GUIDE.md     # [Nuovo] Guida a test, esecuzione e rimozione su Google Colab
│   └── README_*.md               # Guide utente globali in 9 lingue
├── public/                       # Manifest PWA e risorse statiche
├── src/
│   ├── components/
│   │   ├── presets/              # Moduli di frasi di esempio per ciascuna lingua
│   │   ├── Book3D.tsx            # Volta pagina 3D e vista di confronto affiancata
│   │   ├── Header.tsx            # Header responsive, installazione PWA e selettore lingua
│   │   ├── SentenceInput.tsx     # Inserimento frasi e pipeline di analisi a 5 dimensioni
│   │   ├── BookshelfModal.tsx    # Libreria personale di archiviazione
│   │   ├── ExportModal.tsx       # Esportazione Markdown / PDF
│   │   └── SettingsModal.tsx     # Modale impostazioni chiavi API (BYOK)
│   ├── services/
│   │   ├── ai.ts                 # Pipeline multi-LLM (Gemini / OpenAI)
│   │   ├── tts.ts                # Motore vocale ibrido WebSpeech & ElevenLabs
│   │   └── storage.ts            # Gestore di persistenza LocalStorage
│   ├── i18n/
│   │   ├── locales/              # Dizionari per 10 lingue (ko, en, ja, hi, es, fr, de, it, pt, ru)
│   │   ├── translations.ts       # Registrazione e mappatura delle 10 lingue
│   │   └── types.ts              # Definizioni di tipi per i dizionari
│   ├── App.tsx                   # Applicazione principale
│   └── main.tsx                  # Punto di ingresso React con registrazione del service worker PWA
├── package.json
├── start.bat                     # File batch per avvio automatico con un clic su Windows
├── start.sh                      # Script shell per avvio automatico con un clic su Mac/Linux
└── README.md
```

---

## 🛠️ Passaggio Tecnico per Sviluppatori e Operatori (Technical Handover)

> **Analisi Tecnica Dettagliata & Guida Operativa**: 📄 [DEVELOPER_HANDOVER_3D_XR_DRAG.md](./DEVELOPER_HANDOVER_3D_XR_DRAG.md)  
> **Guida al Testbed Cloud**: 📄 [GOOGLE_COLAB_GUIDE.md](./GOOGLE_COLAB_GUIDE.md)

Per gli ingegneri che eseguono il fork di questo progetto per **sviluppi futuri, miglioramenti dell'interazione, deployment in produzione e manutenzione**, sono documentate le caratteristiche di comportamento fine dei pulsanti di trascinamento superiore e inferiore quando l'inclinazione (giroscopio/parallasse) è disattivata nelle modalità **'3D Realistico'** e **'Spazio XR'**, nonché la configurazione del banco di prova su Google Colab.

### 📌 Sintesi dei Problemi Chiave e Roadmap
1. **Analisi del Comportamento**:
   * **Inclinazione ATTIVA**: L'hit-testing continuo del thread compositor del browser guidato da giroscopio/mouse garantisce una risposta immediata al trascinamento.
   * **Inclinazione DISATTIVA**: Con una rotazione 3D statica (`rotateX: 14~18deg`), il caching della rasterizzazione subpixel e la divergenza angolare non lineare tra schermo 2D e piano di proiezione 3D possono causare una sottile sensazione di resistenza.
2. **Roadmap di Azione Consigliata**:
   * **Breve termine**: Adattamento dinamico della soglia di trascinamento per schermi ad alta densità (Retina/Mobile) e guardia con timer di sicurezza `onLostPointerCapture`.
   * **Medio termine**: Calcolo di proiezione inversa da coordinate schermo a spazio locale con `DOMMatrix.inverse()`.
   * **Lungo termine (Prossima generazione)**: Migrazione completa a una canvas 3D virtuale nativa con motore Raycaster in Three.js / WebGL / WebXR.
3. **Banco di Prova Cloud (Cloud Sandbox Testbed)**:
   * Verifica remota su dispositivi mobili reali (iOS Safari, Android Chrome) senza configurazione dell'ambiente locale tramite i tunnel di Google Colab. Consulta [GOOGLE_COLAB_GUIDE.md](./GOOGLE_COLAB_GUIDE.md).

Per diagrammi di architettura completi, formule matematiche e matrici QA cross-browser, consulta il [Documento di Passaggio Tecnico](./DEVELOPER_HANDOVER_3D_XR_DRAG.md).

---

## 📄 Licenza (License)

Questo progetto è rilasciato sotto licenza **MIT**. Sono liberamente consentiti l'uso commerciale, la modifica e la ridistribuzione.
