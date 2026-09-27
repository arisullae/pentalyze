# 📖 Pentalyze : 5結 (5-Step Sentence Insights & 3D Flip-Book)

> **一文から見出す5つの深い洞察と3Dインタラクティブ・ブック**  
> *1つの文章から広がる5層の知的分析とリアルな3D上製本フリップブック*

[![PWA Ready](https://img.shields.io/badge/PWA-Installable-blue.svg)](https://web.dev/progressive-web-apps/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

### 🌐 多言語ガイドドキュメント (Global Language Guides)
[**한국어 원문 (Main README)**](../README.md) | [**English Guide**](./README_en.md) | [**हिन्दी**](./README_hi.md) | [**Español**](./README_es.md) | [**Français**](./README_fr.md) | [**Deutsch**](./README_de.md) | [**Italiano**](./README_it.md) | [**Português**](./README_pt.md) | [**Русский**](./README_ru.md)

---

## 📢 プロジェクト公開およびアーカイブ（Archive）告知
> **【ご案内】本プロジェクトは個人およびオープンソース共有を目的としてGitHub上に公開されたアーカイブプロジェクトです。**  
> GitHub公開後、開発者による**追加の機能開発や継続的な保守（バグ修正、アップデート等）は予定されておりません。**  
> MITライセンスのもと、コードの複製（Fork）、改変、商用および非商用での自由な活用を歓迎いたします。

---

## 🌍 対応する10か国の言語と文字体系 (10 Supported Languages & Scripts)

Pentalyzeは、UIおよび3D翻訳機能において、世界10か国の言語とその固有文字体系を完全サポートしています。

| 国・地域 | 言語名 (Language) | ネイティブ表記 | 文字体系 (Writing Script) | 言語コード | ガイド文書 |
| :---: | :---: | :---: | :---: | :---: | :---: |
| 🇰🇷 **大韓民国** | **韓国語 (Korean)** | 한국어 | **ハングル (Hangul)** | `ko` | [メインREADME](../README.md) |
| 🇺🇸 **アメリカ / グローバル** | **英語 (English)** | English | **ラテン文字 (Latin script)** | `en` | [README_en.md](./README_en.md) |
| 🇯🇵 **日本** | **日本語 (Japanese)** | 日本語 | **漢字・ひらがな・カタカナ (Kanji & Kana)** | `ja` | **現在の文書** |
| 🇮🇳 **インド** | **ヒンディー語 (Hindi)** | हिन्दी | **デーヴァナーガリー文字 (Devanagari)** | `hi` | [README_hi.md](./README_hi.md) |
| 🇪🇸 **スペイン** | **スペイン語 (Spanish)** | Español | **ラテン文字 (Latin script)** | `es` | [README_es.md](./README_es.md) |
| 🇫🇷 **フランス** | **フランス語 (French)** | Français | **ラテン文字 (Latin script)** | `fr` | [README_fr.md](./README_fr.md) |
| 🇩🇪 **ドイツ** | **ドイツ語 (German)** | Deutsch | **ラテン文字 (Latin script)** | `de` | [README_de.md](./README_de.md) |
| 🇮🇹 **イタリア** | **イタリア語 (Italian)** | Italiano | **ラテン文字 (Latin script)** | `it` | [README_it.md](./README_it.md) |
| 🇧🇷 **ブラジル / ポルトガル** | **ポルトガル語 (Portuguese)** | Português | **ラテン文字 (Latin script)** | `pt` | [README_pt.md](./README_pt.md) |
| 🇷🇺 **ロシア** | **ロシア語 (Russian)** | Русский | **キリル文字 (Cyrillic script)** | `ru` | [README_ru.md](./README_ru.md) |

---

## 🌟 プロジェクト概要 (Overview)

**Pentalyze**は、わずか一文または短い文章から、多角的な言語的・文脈的洞察（5つの「結」）を導き出すAI駆動型文章分析および3D視覚化ソリューションです。

上記10か国の言語・文字にネイティブ対応しており、分析された文章は立体的な3Dハードカバー本としてページめくり操作、原文と校正文の並列対照（Split-View）、多言語リアルタイム音声読み上げ（TTS）を通じて、読書するように楽しむことができます。

---

## 🔑 API動作仕様とGoogle AI Studioキー連携ガイド

### 1. セキュリティと「サーバー基本キー」について
* 本プロジェクトのソースコードには開発者の個人APIキーは一切含まれていません。
* GitHubからダウンロード（クローン）してローカル環境で実行する場合、AI Studioの共有キーは作動せず、**利用者が自身のAPIキーを入力して利用する「BYOK（Bring Your Own Key）」方式**で安全に動作します。
* 入力されたAPIキーは外部サーバーへ送信されることはなく、ブラウザの`localStorage`内のみに安全に保管されます。

### 2. Google AI Studio 無料APIキーの取得・設定手順（推奨）
本アプリは**Google AI Studio**のGemini APIに最適化されています。誰でも無料でキーを取得できます。

1. **APIキーの取得**:
   - [Google AI Studio (https://aistudio.google.com/)](https://aistudio.google.com/)にアクセスし、Googleアカウントでログインします。
   - ナビゲーションメニューから **「Get API key」** をクリックします。
   - **「Create API key」** ボタンを押してキーを生成・コピーします。
2. **アプリへの登録**:
   - アプリ画面右上の **設定アイコン（⚙️）** をクリック ➔ **「自分のAPIキーを使用」** を選択 ➔ Geminiキーを貼り付けて **保存**
   - または、ルートディレクトリの `.env.example` を `.env` にコピーして次のように設定：
     ```env
     VITE_GEMINI_API_KEY=取得したGemini_APIキー
     ```

### 3. 他社AIモデル（OpenAI、DeepSeek、ローカルOllama）の利用
* **OpenAI (GPT-4o)**: 設定モーダルで「OpenAI」を選択し、APIキー（`sk-...`）を入力すると即座に利用可能です。
* **ローカルLLM (Ollama)**: `src/services/ai.ts` 内のエンドポイントURLをローカルアドレス（例: `http://localhost:11434/v1/chat/completions`）に変更することで柔軟に連携可能です。

---

## 🎯 5つの結（5つの次元による深い洞察）

1. **第1結: 解釈 (Interpretation)**: 文面の意味だけでなく、行間に潜む意図やニュアンスを深く読み解く
2. **第2結: 要約 (Summary)**: 1秒で把握できるワンポイント・コアメッセージの凝縮
3. **第3結: 詳細解説 (Deep Explanation)**: 文脈に沿った専門語彙や背景知識の丁寧な解説
4. **第4結: 文法校正 (Grammar & Polish)**: 誤字・不自然な表現を正し、洗練されたビジネス格式表現へリライト
5. **第5結: 言い換え (Paraphrasing)**: 豊かな語彙を活かした3つの洗練された代替表現を提示

---

## 🚀 主な機能

- **3D上製本デジタルブック**: CSS 3Dによるリアルな紙の湾曲、影、ドラッグによるページめくり体験
- **二元化多言語アーキテクチャ**: UI言語はお好みの母国語のまま、3D本の中身だけを他言語に切り替えてAI翻訳・朗読可能
- **原文・校正対照ビュー (Bilingual Split-View)**: 入力した原文と校正結果を左右分割で比較
- **PWA (Progressive Web App)**: モバイル・デスクトップでアプリとしてインストール・オフライン利用可能
- **ハイブリッド朗読エンジン (TTS)**: ブラウザ標準音声 ＋ ElevenLabs高品質ボイス対応
- **本棚保存・エクスポート**: 解析した文章をブラウザに自動保存、MarkdownおよびPDF出力対応

---

## 📦 クイックスタート

### 事前要件
- **Node.js** 18.0 以上 ([公式サイト (nodejs.org)](https://nodejs.org/) から LTS 版をインストール)

---

### 🖱️ 一般ユーザー向け：ダブルクリックでワンクリック起動 (推奨)
リポジトリをダウンロード（ZIPを解凍）後、お使いのOSに合わせたファイルをダブルクリックするだけで、**必要なパッケージの自動インストールからブラウザ起動まで自動で完了**します。

* **Windows ユーザー**: フォルダ内の **`start.bat`** をダブルクリックします。
* **Mac / Linux ユーザー**: ターミナルで `bash start.sh` を実行するか、`chmod +x start.sh && ./start.sh` を実行します。

---

### 💻 開発者向け：ターミナルコマンドで直接実行
```bash
# リポジトリのクローン
git clone https://github.com/your-username/pentalyze.git
cd pentalyze

# 依存パッケージのインストール
npm install

# ローカル開発サーバー起動 (ポート 3000)
npm run dev

# プロダクションビルド
npm run build
```

---

## 📄 ライセンス

このプロジェクトは **MITライセンス** のもとで公開されています。商用利用・改変・再配布が自由に許可されています。
