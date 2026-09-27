# 📖 Pentalyze : 5 Capas de Análisis y Libro 3D Interactivo

> **Descubra 5 dimensiones de análisis profundo a partir de una sola frase en un libro digital 3D interactivo**  
> *1 Frase ➔ 5 Dimensiones de Perspectivas y Libro Tapa Dura 3D*

[![PWA Ready](https://img.shields.io/badge/PWA-Installable-blue.svg)](https://web.dev/progressive-web-apps/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

### 🌐 Guías en Otros Idiomas (Global Language Guides)
[**한국어 원문 (Main README)**](../README.md) | [**English Guide**](./README_en.md) | [**日本語**](./README_ja.md) | [**हिन्दी**](./README_hi.md) | [**Français**](./README_fr.md) | [**Deutsch**](./README_de.md) | [**Italiano**](./README_it.md) | [**Português**](./README_pt.md) | [**Русский**](./README_ru.md)

---

## 📢 Aviso de Publicación y Estado de Archivo
> **[Aviso] Este proyecto se publica en GitHub como un repositorio de código abierto en estado de archivo.**  
> Tras esta publicación, **el autor no tiene previsto realizar nuevos desarrollos de funciones, actualizaciones ni mantenimiento continuo (corrección de errores o parches).**  
> Se invita a la comunidad a realizar bifurcaciones (Fork), modificar el código y adaptarlo libremente para sus propios proyectos o fines comerciales bajo la licencia MIT.

---

## 🌍 10 Idiomas y Sistemas de Escritura Compatibles

Pentalyze admite de forma nativa 10 idiomas globales y sus respectivos sistemas de escritura tanto en la interfaz como en el contenido 3D:

| País / Región | Idioma | Nombre Nativo | Sistema de Escritura | Código | Documento |
| :---: | :---: | :---: | :---: | :---: | :---: |
| 🇰🇷 **Corea del Sur** | **Coreano** | 한국어 | **Hangul (한글)** | `ko` | [README Principal](../README.md) |
| 🇺🇸 **EE. UU. / Global** | **Inglés** | English | **Alfabeto latino** | `en` | [README_en.md](./README_en.md) |
| 🇯🇵 **Japón** | **Japonés** | 日本語 | **Kanji y Kana (漢字・かな)** | `ja` | [README_ja.md](./README_ja.md) |
| 🇮🇳 **India** | **Hindi** | हिन्दी | **Escritura devanagari (देवनागरी)** | `hi` | [README_hi.md](./README_hi.md) |
| 🇪🇸 **España / LATAM** | **Español** | Español | **Alfabeto latino** | `es` | **Documento actual** |
| 🇫🇷 **Francia** | **Francés** | Français | **Alfabeto latino** | `fr` | [README_fr.md](./README_fr.md) |
| 🇩🇪 **Alemania** | **Alemán** | Deutsch | **Alfabeto latino** | `de` | [README_de.md](./README_de.md) |
| 🇮🇹 **Italia** | **Italiano** | Italiano | **Alfabeto latino** | `it` | [README_it.md](./README_it.md) |
| 🇧🇷 **Brasil / Portugal** | **Portugués** | Português | **Alfabeto latino** | `pt` | [README_pt.md](./README_pt.md) |
| 🇷🇺 **Rusia** | **Ruso** | Русский | **Alfabeto cirílico (Кириллица)** | `ru` | [README_ru.md](./README_ru.md) |

---

## 🌟 Descripción General (Overview)

**Pentalyze** es una solución inteligente de análisis, corrección y visualización tridimensional de oraciones. A partir de una sola frase o párrafo breve, el sistema extrae cinco capas analíticas y contextuales estructuradas.

Cuenta con soporte nativo completo para los 10 idiomas y alfabetos detallados anteriormente. Las oraciones analizadas se presentan en un libro digital de tapa dura en 3D con física realista de paso de página, vista comparativa bilingüe (Split-View) y lectura en voz alta (TTS) multilingüe en tiempo real.

---

## 🔑 Mecanismo de API y Guía de Google AI Studio

### 1. Seguridad y funcionamiento de la clave en clones de GitHub
* El código fuente de este repositorio no contiene ninguna clave de API privada del desarrollador.
* Al clonar o descargar el proyecto para ejecutarlo localmente en su PC, tableta o móvil, el sistema opera con el modelo **BYOK (Bring Your Own Key - Traiga su propia clave)**.
* Las claves de API introducidas en el navegador se guardan únicamente en el `localStorage` local del usuario y nunca se envían a servidores de terceros.

### 2. Cómo obtener una clave de API gratuita en Google AI Studio (Recomendado)
Pentalyze está optimizado para la API Gemini de **Google AI Studio**. Cualquiera puede generar una clave gratuita en minutos:
1. Acceda a [Google AI Studio (https://aistudio.google.com/)](https://aistudio.google.com/) e inicie sesión con su cuenta de Google.
2. Haga clic en **'Get API key'** en la barra lateral o superior.
3. Pulse **'Create API key'**, cree o seleccione un proyecto y copie su clave.
4. En Pentalyze, haga clic en el icono de **Ajustes (⚙️)** en la esquina superior derecha, seleccione **[Usar mi propia clave de API]**, pegue su clave Gemini y pulse **Guardar**.
   - O bien, copie `.env.example` como `.env` en la raíz del proyecto y configure:
     ```env
     VITE_GEMINI_API_KEY=su_clave_api_de_google_ai_studio
     ```

### 3. Modelos alternativos (OpenAI, DeepSeek, Ollama local)
* **OpenAI (GPT-4o)**: Seleccione OpenAI en la ventana de Ajustes e introduzca su clave `sk-...`.
* **LLM Locales (Ollama) / DeepSeek**: Puede ajustar la dirección base (`baseURL`) en `src/services/ai.ts` para conectarlo con su propio servidor local (ej. `http://localhost:11434/v1/chat/completions`).

---

## 🎯 Las 5 Capas de Análisis ("Gyeol")

1. **Capa 1: Interpretación (Interpretation)**: Análisis del significado explícito, intención implícita, matices y subtexto.
2. **Capa 2: Resumen Clave (Summary)**: Condensación del mensaje esencial en una sola idea contundente.
3. **Capa 3: Explicación Detallada (Deep Explanation)**: Explicación de terminología especializada y contexto temático.
4. **Capa 4: Corrección Gramatical y Estilo (Grammar & Polish)**: Corrección de fallos ortográficos, sintácticos y reescritura en estilo formal y pulido.
5. **Capa 5: Reformulación Creativa (Paraphrasing)**: 3 alternativas de redacción elegante adaptadas a diversos registros.

---

## 🚀 Características Principales

- **Libro 3D Realista**: Curvatura realista de hojas, sombras dinámicas y gestos táctiles de arrastre para pasar página.
- **Arquitectura Multilingüe Doble**: Mantenga los menús en su idioma natal mientras traduce y escucha el libro en cualquiera de los 10 idiomas disponibles.
- **Vista Comparativa (Split-View)**: Contraste simultáneo entre la frase original y el resultado pulido.
- **PWA (Progressive Web App)**: Instalable como aplicación independiente en móviles y ordenadores con soporte sin conexión.
- **Motor de Audio Híbrido (TTS)**: Síntesis nativa del navegador e integración opcional con ElevenLabs.
- **Biblioteca Local y Exportación**: Almacenamiento local automático y descarga en Markdown o PDF.

---

## 📦 Inicio Rápido (Quick Start)

### Requisitos previos
- **Node.js** 18.0 o superior (instale la versión LTS desde el [sitio oficial (nodejs.org)](https://nodejs.org/))

---

### 🖱️ Usuarios generales: Ejecución con un solo clic (Recomendado)
Tras descargar el repositorio (descomprimir el ZIP), simplemente haga doble clic en el archivo correspondiente a su sistema operativo para **instalar dependencias y abrir el libro 3D en su navegador automáticamente**:

* **Usuarios de Windows**: Haga doble clic en el archivo **`start.bat`**.
* **Usuarios de macOS / Linux**: Ejecute `bash start.sh` en su terminal o haga doble clic en `start.sh`.

---

### 💻 Desarrolladores: Comandos de terminal
```bash
# Clonar el repositorio
git clone https://github.com/your-username/pentalyze.git
cd pentalyze

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo local (Puerto 3000)
npm run dev

# Compilar para producción
npm run build
```

---

## 📲 Guía de Instalación (PWA) y Desinstalación de la Aplicación

> 💡 **Aviso sobre despliegue del servicio e instalación de la app para usuarios**:  
> Ya sea que despliegue este proyecto tal cual o lance un servicio con modificaciones y mejoras personalizadas, todos los componentes técnicos (manifiesto PWA, Service Worker y modal interactivo de instalación) están completamente integrados. De esta forma, cualquier usuario que visite el sitio desde una PC, tableta o teléfono inteligente podrá instalarlo y ejecutarlo como una aplicación nativa independiente (PWA) mediante el botón **[Instalar App]** del encabezado o la opción nativa del navegador.

Pentalyze es 100% compatible con el estándar **PWA (Progressive Web App)**. Permite instalar la aplicación de forma nativa en escritorios PC y dispositivos móviles sin depender de tiendas de aplicaciones, abriéndose en una ventana independiente sin barras de navegador. Se puede desinstalar limpiamente en cualquier momento.

### 1. 🖥️ Escritorio de PC (Windows / macOS / Linux)

#### 📥 Cómo Instalar
1. **Icono en la barra de direcciones**: Al acceder en Chrome, Edge, Brave o Whale, haga clic en el icono **[Instalar (⊕ / 💻)]** situado a la derecha de la barra de direcciones.
2. **Botón en la aplicación**: Haga clic en el botón **[Instalar App]** de la barra superior y pulse **[Instalar]** en el mensaje emergente.
3. Se creará un acceso directo en el escritorio y en el menú de inicio/Dock, abriéndose como una ventana de app nativa.

#### 🗑️ Cómo Desinstalar / Eliminar
* **Método 1 (Directamente desde la ventana de la app - Recomendado)**:  
  En la ventana abierta de Pentalyze, haga clic en el menú de tres puntos (**⋮** o **···**) de la barra superior ➔ Seleccione **[Desinstalar Pentalyze...]** ➔ (Opcional) Marque "Borrar también los datos de Chrome" ➔ Pulse **[Quitar]**.
* **Método 2 (Administrador de aplicaciones del navegador)**:  
  - En Chrome: Escriba `chrome://apps` en la barra de direcciones ➔ Clic derecho en **Pentalyze** ➔ **[Desinstalar de Chrome...]**.
  - En Edge: Escriba `edge://apps` ➔ Clic en **[···]** junto a Pentalyze ➔ **[Desinstalar]**.
* **Método 3 (Configuración del sistema Windows)**:  
  Inicio de Windows ➔ [Configuración] ➔ [Aplicaciones] ➔ [Aplicaciones instaladas] ➔ Busque 'Pentalyze' ➔ Seleccione **[Desinstalar]**.
* **Método 4 (macOS Finder)**:  
  Finder ➔ [Aplicaciones] o [Chrome Apps] ➔ Arrastre 'Pentalyze' a la Papelera.

---

### 2. 📱 Móviles y Tablets (iOS Safari / Android Chrome)

#### 🍎 iPhone / iPad (iOS Safari)
* **Instalación**: Abra Safari ➔ Toque el **icono de compartir (⎋ / ↑)** ➔ Seleccione **[Agregar a pantalla de inicio]** ➔ Toque **[Agregar]** arriba a la derecha.
* **Desinstalación**: Mantenga presionado el icono de Pentalyze en la pantalla de inicio ➔ Toque **[Eliminar app]** ➔ **[Eliminar de la pantalla de inicio]** o **[Eliminar]**.

#### 🤖 Android (Chrome)
* **Instalación**: Abra Chrome ➔ Toque el **menú (⋮)** arriba a la derecha ➔ Toque **[Instalar aplicación]** o **[Agregar a la pantalla principal]** ➔ Pulse **[Instalar]**.
* **Desinstalación**: Mantenga presionado el icono de Pentalyze ➔ Arrástrelo a **[Desinstalar]** o seleccione **[Desinstalar]** en el menú.

---

### 3. 💻 Ejecución y Eliminación del Proyecto Descargado (Git Clone / ZIP)

* **Ejecución**:
  - Windows: Doble clic en `start.bat`
  - macOS / Linux: Ejecute `bash start.sh` en la terminal
* **Eliminación Total**:
  - La aplicación es portátil y autónoma; no modifica registros ni archivos del sistema.
  - Para eliminarla por completo, envíe la carpeta descargada a la Papelera de reciclaje.
  - Para borrar las claves API y el historial guardado en el navegador, use **[Borrar todo]** en la Biblioteca (📚) o borre los datos de navegación del navegador.

---

## 📄 Licencia

Este proyecto está bajo la **Licencia MIT**. Es libre para uso comercial, modificación y distribución.
