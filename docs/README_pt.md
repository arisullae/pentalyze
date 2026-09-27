# 📖 Pentalyze : 5 Camadas de Análise e Livro 3D Interativo

> **Descubra 5 dimensões de percepções profundas a partir de uma única frase em um livro digital 3D interativo**  
> *1 Frase ➔ 5 Dimensões de Análise & Livro de Capa Dura 3D*

[![PWA Ready](https://img.shields.io/badge/PWA-Installable-blue.svg)](https://web.dev/progressive-web-apps/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

### 🌐 Guias em Outros Idiomas (Global Language Guides)
[**한국어 원문 (Main README)**](../README.md) | [**English Guide**](./README_en.md) | [**日本語**](./README_ja.md) | [**हिन्दी**](./README_hi.md) | [**Español**](./README_es.md) | [**Français**](./README_fr.md) | [**Deutsch**](./README_de.md) | [**Italiano**](./README_it.md) | [**Русский**](./README_ru.md)

---

## 📢 Aviso de Publicação e Status de Arquivo (Archive)
> **[Aviso] Este projeto é um repositório de código aberto publicado no GitHub em status de arquivo.**  
> Após esta publicação, **o autor não planeja desenvolvimento adicional de recursos ou manutenção contínua (correções de bugs, atualizações).**  
> Sinta-se à vontade para bifurcar (Fork), modificar e utilizar este projeto para seus próprios propósitos pessoais ou comerciais sob a licença MIT.

---

## 🌍 10 Idiomas e Sistemas de Escrita Suportados

O Pentalyze suporta nativamente 10 idiomas globais e seus respectivos alfabetos, tanto na interface quanto no leitor 3D:

| País / Região | Idioma | Nome Nativo | Sistema de Escrita | Código | Guia |
| :---: | :---: | :---: | :---: | :---: | :---: |
| 🇰🇷 **Coreia do Sul** | **Coreano** | 한국어 | **Hangul (한글)** | `ko` | [README Principal](../README.md) |
| 🇺🇸 **EUA / Global** | **Inglês** | English | **Alfabeto latino** | `en` | [README_en.md](./README_en.md) |
| 🇯🇵 **Japão** | **Japonês** | 日本語 | **Kanji e Kana (漢字・かな)** | `ja` | [README_ja.md](./README_ja.md) |
| 🇮🇳 **Índia** | **Hindi** | हिन्दी | **Escrita devanágari (देवनागरी)** | `hi` | [README_hi.md](./README_hi.md) |
| 🇪🇸 **Espanha / LATAM** | **Espanhol** | Español | **Alfabeto latino** | `es` | [README_es.md](./README_es.md) |
| 🇫🇷 **França** | **Francês** | Français | **Alfabeto latino** | `fr` | [README_fr.md](./README_fr.md) |
| 🇩🇪 **Alemanha** | **Alemão** | Deutsch | **Alfabeto latino** | `de` | [README_de.md](./README_de.md) |
| 🇮🇹 **Itália** | **Italiano** | Italiano | **Alfabeto latino** | `it` | [README_it.md](./README_it.md) |
| 🇧🇷 **Brasil / Portugal** | **Português** | Português | **Alfabeto latino** | `pt` | **Documento atual** |
| 🇷🇺 **Rússia** | **Russo** | Русский | **Alfabeto cirílico (Кириллица)** | `ru` | [README_ru.md](./README_ru.md) |

---

## 🌟 Visão Geral (Overview)

**Pentalyze** é uma solução inteligente de análise linguística, aprimoramento textual e visualização 3D de frases. A partir de uma única oração ou parágrafo curto, o sistema deduz cinco camadas analíticas e contextuais ricas.

Com suporte nativo a 10 idiomas globais e seus sistemas de escrita, o Pentalyze apresenta os resultados na forma de um livro de capa dura em 3D realista com efeito de virar páginas, visualização comparativa lado a lado (Split-View) e leitura em voz alta sincronizada (TTS).

---

## 🔑 Funcionamento da API & Guia do Google AI Studio

### 1. Segurança e funcionamento ao clonar do GitHub
* O código-fonte não inclui chaves de API confidenciais do autor.
* Ao clonar e executar localmente, o aplicativo opera sob a arquitetura **BYOK (Bring Your Own Key)**: o usuário utiliza sua própria chave.
* As chaves inseridas permanecem isoladas no `localStorage` do seu navegador e nunca são transmitidas a servidores de terceiros.

### 2. Obtenção de Chave Gratuita no Google AI Studio (Recomendado)
O Pentalyze é otimizado para os modelos Gemini do **Google AI Studio**:
1. Acesse o [Google AI Studio (https://aistudio.google.com/)](https://aistudio.google.com/) e faça login.
2. No menu de navegação, clique em **'Get API key'**.
3. Clique em **'Create API key'**, selecione ou crie um projeto e copie sua chave gratuita.
4. No Pentalyze, clique no ícone de **Configurações (⚙️)** no canto superior direito, marque **[Usar minha própria chave de API]**, cole a chave Gemini e clique em **Salvar**.
   - Ou crie um arquivo `.env` a partir de `.env.example`:
     ```env
     VITE_GEMINI_API_KEY=sua_chave_google_ai_studio
     ```

### 3. Integração com outros modelos (OpenAI, DeepSeek, Ollama local)
* **OpenAI (GPT-4o)**: Escolha OpenAI no modal de configurações e informe sua chave `sk-...`.
* **LLMs Locais (Ollama)**: Configure a URL base no arquivo `src/services/ai.ts` para conectar ao seu servidor local (ex: `http://localhost:11434/v1/chat/completions`).

---

## 🎯 As 5 Camadas de Análise ("Gyeol")

1. **Camada 1: Interpretação (Interpretation)**: Desvenda o sentido explícito, intenções ocultas e nuances de tom.
2. **Camada 2: Resumo Central (Summary)**: Síntese concisa da mensagem essencial em uma única sentença.
3. **Camada 3: Explicação Aprofundada (Deep Explanation)**: Esclarecimento de vocabulário técnico e contexto cultural.
4. **Camada 4: Gramática e Polimento (Grammar & Polish)**: Correção de deslizes sintáticos e reescrita em estilo formal e elegante.
5. **Camada 5: Paráfrase Criativa (Paraphrasing)**: 3 alternativas sofisticadas de redação para diferentes registros.

---

## 🚀 Principais Recursos

- **Livro 3D Realista**: Curvatura realista de páginas, sombras dinâmicas e gestos táteis de virar páginas.
- **Internacionalização em Duas Camadas**: Mantenha a interface no seu idioma nativo enquanto traduz e ouve o livro em qualquer um dos 10 idiomas suportados.
- **Visualização Dividida (Split-View)**: Comparação simultânea entre o texto de entrada original e o resultado revisado.
- **PWA (Progressive Web App)**: Instale como aplicativo nativo no celular ou computador com suporte offline.
- **Leitor de Áudio Híbrido (TTS)**: Síntese de voz nativa do navegador e suporte opcional ao ElevenLabs.
- **Estante Pessoal & Exportação**: Armazenamento local automático e exportação para Markdown ou PDF.

---

## 📦 Início Rápido (Quick Start)

### Pré-requisitos
- **Node.js** 18.0 ou superior (instale a versão LTS pelo [site oficial (nodejs.org)](https://nodejs.org/))

---

### 🖱️ Usuários em geral: Execução com um clique (Recomendado)
Após baixar o repositório (extraia o arquivo ZIP), basta clicar duas vezes no script correspondente ao seu sistema operacional para **instalar as dependências e abrir o livro 3D no navegador automaticamente**:

* **Usuários Windows**: Clique duas vezes no arquivo **`start.bat`**.
* **Usuários macOS / Linux**: Execute `bash start.sh` no terminal ou clique duas vezes em `start.sh`.

---

### 💻 Desenvolvedores: Comandos no terminal
```bash
# Clonar o repositório
git clone https://github.com/your-username/pentalyze.git
cd pentalyze

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento (Porta 3000)
npm run dev

# Gerar build de produção
npm run build
```

---

## 📲 Guia de Instalação (PWA) e Desinstalação do Aplicativo

> 💡 **Aviso de implantação de serviço e instalação do app para usuários**:  
> Quer você publique este projeto exatamente como está ou lance um serviço personalizado com suas próprias melhorias, todos os componentes necessários (Manifesto PWA, Service Worker e modal interativo de instalação) estão totalmente integrados. Assim, qualquer usuário que acesse a plataforma a partir de um PC, tablet ou smartphone poderá instalar e utilizar o Pentalyze como um aplicativo nativo independente (PWA) por meio do botão **[Instalar App]** no cabeçalho ou pelo próprio navegador.

O Pentalyze suporta integralmente os padrões **PWA (Progressive Web App)**. É possível instalar o aplicativo diretamente no computador ou smartphone/tablet sem necessidade de lojas de aplicativos, desfrutando de uma janela independente sem barra de navegação. A desinstalação pode ser feita a qualquer momento de forma 100% limpa.

### 1. 🖥️ Computador Desktop (Windows / macOS / Linux)

#### 📥 Como Instalar
1. **Pela barra de endereços**: Ao acessar via Chrome, Edge, Brave ou Whale, clique no ícone **[Instalar (⊕ / 💻)]** no canto direito da barra de endereços.
2. **Pelo botão do aplicativo**: Clique no botão **[Instalar App]** na barra superior e confirme em **[Instalar]**.
3. Um atalho será criado na área de trabalho e no menu Iniciar/Dock, abrindo o Pentalyze em janela dedicada.

#### 🗑️ Como Desinstalar / Remover
* **Método 1 (Diretamente pela janela do app - Recomendado)**:  
  Na janela aberta do Pentalyze, clique no menu de três pontos (**⋮** ou **···**) no topo direito ➔ Selecione **[Desinstalar o Pentalyze...]** ➔ (Opcional) Marque "Excluir também dados" ➔ Clique em **[Remover]**.
* **Método 2 (Gerenciador de apps do navegador)**:  
  - No Chrome: Digite `chrome://apps` ➔ Clique com botão direito em **Pentalyze** ➔ **[Remover do Chrome...]**.
  - No Edge: Digite `edge://apps` ➔ Clique em **[···]** ➔ **[Desinstalar]**.
* **Método 3 (Configurações do Windows)**:  
  Iniciar ➔ [Configurações] ➔ [Aplicativos] ➔ [Aplicativos instalados] ➔ Pesquise 'Pentalyze' ➔ **[Desinstalar]**.
* **Método 4 (macOS Finder)**:  
  Finder ➔ [Aplicativos] ou [Chrome Apps] ➔ Mova o ícone 'Pentalyze' para o Lixo.

---

### 2. 📱 Smartphones e Tablets (iOS Safari / Android Chrome)

#### 🍎 iPhone / iPad (iOS Safari)
* **Instalação**: Abra o Safari ➔ Toque no ícone de **Compartilhar (⎋ / ↑)** ➔ Selecione **[Adicionar à Tela de Início]** ➔ Toque em **[Adicionar]**.
* **Desinstalação**: Pressione e segure o ícone do Pentalyze ➔ Toque em **[Remover App]** ➔ **[Apagar App]** ou **[Remover da Tela de Início]**.

#### 🤖 Android (Chrome)
* **Instalação**: Abra o Chrome ➔ Menu **(⋮)** ➔ Toque em **[Instalar aplicativo]** ou **[Adicionar à tela inicial]** ➔ **[Instalar]**.
* **Desinstalação**: Pressione e segure o ícone do Pentalyze ➔ Arraste até **[Desinstalar]** ou selecione **[Desinstalar]** no menu.

---

### 3. 💻 Execução e Remoção do Projeto Local (Git Clone / ZIP)

* **Execução**:
  - Windows: Clique duas vezes em `start.bat`
  - macOS / Linux: Execute `bash start.sh` no terminal
* **Remoção Total**:
  - A aplicação é portátil e não altera registros do sistema.
  - Para desinstalar por completo, basta mover a pasta baixada para a Lixeira.
  - Para limpar as chaves de API e registros salvos no navegador, clique em **[Limpar tudo]** na Estante (📚) ou limpe os dados de navegação do navegador.

---

## 📄 Licença

Este projeto é distribuído sob a **Licença MIT**. Uso comercial, modificação e redistribuição são permitidos livremente.
