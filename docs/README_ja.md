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

## 📲 アプリのインストール (PWA) およびアンインストール・削除ガイド

> 💡 **サービス配布およびユーザー向けアプリインストール対応について**:  
> 今後本プロジェクトをそのまま公開・配布する場合や、独自に機能修正・改善を加えてサービスを展開する場合でも、アクセスした一般ユーザーがPC・タブレット・スマートフォンどこからでもヘッダーの **[アプリインストール]** ボタンやブラウザ標準のインストール機能を通じて独立したネイティブアプリ(PWA)として手軽にインストールして利用できるよう、すべての構成（PWAマニフェスト、サービスワーカー、インストール案内モーダル）が完全に組み込まれています。

Pentalyze は、Web標準技術である **PWA (Progressive Web App)** に完全準拠しています。アプリストアを介さず、PCデスクトップやスマートフォン／タブレット端末にネイティブアプリ感覚でインストールでき、ブラウザのアドレスバーがない独立した全画面・単独ウィンドウで読書体験を楽しむことができます。不要になった場合もいつでも簡単に削除可能です。

### 1. 🖥️ PC デスクトップ (Windows / macOS / Linux)

#### 📥 アプリのインストール手順
1. **ブラウザのアドレスバーから**: Chrome、Edge、Brave等でアクセス時、アドレスバー右端に表示される **[インストール (⊕ / 💻)]** アイコンをクリックします。
2. **ヘッダーボタンから**: 画面上部の **[アプリインストール]** ボタンをクリックし、ポップアップで **[インストール]** をクリックします。
3. デスクトップやスタートメニューにPentalyzeのショートカットが生成され、独立ウィンドウで起動します。

#### 🗑️ アプリの削除 (アンインストール) 手順
* **方法 1 (アプリウィンドウから直接削除 - 最も簡単)**:  
  起動中のPentalyzeウィンドウ右上にある **メニュー(⋮ または ···)** をクリック ➔ **[Pentalyze をアンインストール...]** を選択 ➔ (任意)「Chrome からデータも削除する」にチェック ➔ **[削除]** をクリック。
* **方法 2 (ブラウザのアプリ管理画面)**:  
  - Chrome: アドレスバーに `chrome://apps` と入力して Enter ➔ `Pentalyze` アイコンを右クリック ➔ **[Chrome から削除...]** を選択。
  - Edge: アドレスバーに `edge://apps` と入力して Enter ➔ `Pentalyze` 横の **[···]** ➔ **[アンインストール]** を選択。
* **方法 3 (Windows OS の設定)**:  
  Windows [スタート] ➔ [設定] ➔ [アプリ] ➔ [インストールされているアプリ] ➔ 「Pentalyze」を検索 ➔ [アンインストール] を選択。
* **方法 4 (macOS Finder)**:  
  Finder ➔ [アプリケーション (Applications)] またはホーム直下の [Chrome アプリ] ➔ 「Pentalyze」アイコンをゴミ箱へドラッグ。

---

### 2. 📱 スマートフォン・タブレット (iOS Safari / Android Chrome)

#### 🍎 iPhone / iPad (iOS Safari)
* **インストール**: Safari でアクセス ➔ 画面下部中央の **共有アイコン (⎋ / ↑)** をタップ ➔ メニューから **[ホーム画面に追加]** を選択 ➔ 右上の **[追加]** をタップ。
* **アンインストール**: ホーム画面の Pentalyze アイコンを長押し (ロングタップ) ➔ **[App を削除]** ➔ **[ホーム画面から取り除く]** または **[削除]** を選択。

#### 🤖 Android (Chrome)
* **インストール**: Chrome でアクセス ➔ 画面右上の **メニュー (⋮)** をタップ ➔ **[アプリをインストール]** または **[ホーム画面に追加]** ➔ **[インストール]** を選択。
* **アンインストール**: ホーム画面の Pentalyze アイコンを長押し ➔ 画面上部の **[アンインストール]** にドラッグ、またはメニューから **[アンインストール]** を選択。

---

### 3. 💻 ローカル実行版 (Git Clone / ZIP 解凍) の起動と削除

* **起動方法**:
  - Windows: フォルダ内の `start.bat` をダブルクリック
  - macOS / Linux: ターミナルで `bash start.sh` を実行
* **完全削除**:
  - レジストリやシステム領域を一切変更しない完全ポータブル仕様です。
  - 解凍したフォルダをそのままゴミ箱に捨てるだけで、システムに一切の痕跡を残さず100%完全に削除されます。
  - ブラウザ内のAPIキーや保存記録も消去したい場合は、アプリ内の本棚(📚)で **[すべて削除]** を押すか、ブラウザのサイトデータを消去してください。

---

### 4. ☁️ Google Colab クラウドサンドボックス実行＆完全削除 (Zero-Install)

> **詳細ワンクリックスクリプト＆運用ガイド**: 📄 [GOOGLE_COLAB_GUIDE.md](./GOOGLE_COLAB_GUIDE.md)

ローカルPCにNode.jsや開発環境を一切インストールすることなく、Webブラウザのみでクラウド仮想マシン(Ubuntu)上で安全にPentalyzeをテスト・運用し、痕跡を残さず削除できます。

* **💡 `your-username` のご案内**:  
  `https://github.com/your-username/pentalyze.git` の `your-username` は、**ご自身のGitHubユーザー名**(例: `developer-id`)に置き換えるか、ご自身のアカウントにForkしたリポジトリ上部の緑色 **[<> Code]** ➔ **[HTTPS]** でコピーしたURLをそのまま貼り付けてください。

* **ワンクリックインストール＆実行 (Colabセルに貼り付け)**:
  ```python
  # 1. Node.js 20.x 環境構築および Cloudflare トンネルツールのインストール
  !curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && sudo apt-get install -y nodejs > /dev/null 2>&1
  !curl -sL https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o /usr/local/bin/cloudflared && chmod +x /usr/local/bin/cloudflared
  
  # 2. リポジトリのクローン ('your-username' を自身のGitHub IDに置換)
  # (例: !git clone https://github.com/developer-id/pentalyze.git /content/pentalyze)
  !rm -rf /content/pentalyze
  !git clone https://github.com/your-username/pentalyze.git /content/pentalyze
  %cd /content/pentalyze
  !npm install
  
  # 3. バックグラウンドサーバー起動および外部公開URLの発行
  import subprocess, time
  subprocess.Popen(["npm", "run", "dev"], cwd="/content/pentalyze")
  time.sleep(5) # サーバー起動待機
  !cloudflared tunnel --url http://localhost:3000
  ```
  *(出力に表示される `https://*.trycloudflare.com` URLから、世界中どこからでも即座にブラウザでアクセス可能です)*
* **完全削除 (Teardown & Purge)**:
  ```bash
  # 1. プロセスの停止: !pkill -f node && !pkill -f cloudflared
  # 2. ファイルの完全削除: !rm -rf /content/pentalyze && !rm -f /usr/local/bin/cloudflared
  # 3. ランタイムの初期化: Colabメニューの [ランタイム] ➔ [ランタイムの接続を解除して削除] を選択
  ```

---

## 📂 プロジェクト構成 (Project Directory)

```
pentalyze/
├── docs/                         # 多言語ガイドおよび開発・運用者向け技術引継ぎ文書
│   ├── DEVELOPER_HANDOVER_3D_XR_DRAG.md # [必読] 3D/XRドラッグ操作の技術分析およびロードマップ
│   ├── GOOGLE_COLAB_GUIDE.md     # [新規] Google Colab クラウド無環境実行・運用・削除ガイド
│   └── README_*.md               # 9言語グローバルユーザーガイド
├── public/                       # PWAマニフェストおよび静的アセット
├── src/
│   ├── components/
│   │   ├── presets/              # 各言語別例文プリセットモジュール
│   │   ├── Book3D.tsx            # 3D立体ページめくり＆分割比較ビュー
│   │   ├── Header.tsx            # レスポンシブヘッダー・PWAインストール・言語切替
│   │   ├── SentenceInput.tsx     # 文章入力および5次元解析パイプライン
│   │   ├── BookshelfModal.tsx    # 保存した文庫本棚ストレージ
│   │   ├── ExportModal.tsx       # Markdown / PDFエクスポート
│   │   └── SettingsModal.tsx     # BYOK APIキー設定モーダル
│   ├── services/
│   │   ├── ai.ts                 # Gemini / OpenAI マルチLLMパイプライン
│   │   ├── tts.ts                # WebSpeech & ElevenLabs ハイブリッドTTSエンジン
│   │   └── storage.ts            # LocalStorage 永続化マネージャー
│   ├── i18n/
│   │   ├── locales/              # 10言語辞書 (ko, en, ja, hi, es, fr, de, it, pt, ru)
│   │   ├── translations.ts       # 10言語登録およびマッピング
│   │   └── types.ts              # 辞書型定義
│   ├── App.tsx                   # メインアプリケーション
│   └── main.tsx                  # PWAサービスワーカー登録を含むReactエントリポイント
├── package.json
├── start.bat                     # Windows向けワンクリック自動実行バッチ
├── start.sh                      # Mac/Linux向けワンクリック自動実行シェル
└── README.md
```

---

## 🛠️ 開発・改善・運用者のための技術ハンドオーバー (Technical Handover)

> **詳細技術分析＆対応ガイド**: 📄 [DEVELOPER_HANDOVER_3D_XR_DRAG.md](./DEVELOPER_HANDOVER_3D_XR_DRAG.md)  
> **クラウドテストベッド運用ガイド**: 📄 [GOOGLE_COLAB_GUIDE.md](./GOOGLE_COLAB_GUIDE.md)

本プロジェクトをフォーク(Fork)して**今後の機能開発、UI/UX向上、本番環境へのデプロイおよび運用**を担当するエンジニアのために、「3D立体」および「XR空間」モードでチルト(ジャイロ/パララックス)をOFFにした際の上・下部「掴んでめくる」ボタンの微小な挙動特性と対応策、ならびにGoogle Colabを活用したクラウドサンドボックステスト環境の構築手順をまとめています。

### 📌 主要課題の要約と対応ロードマップ
1. **挙動分析**:
   * **チルトON時**: マウスやジャイロの動きによりブラウザのコンポジタスレッドが毎フレーム当たり判定(Continuous Hit-Testing)を再評価するため、即座にドラッグに反応します。
   * **チルトOFF時**: 静的な3D回転角度(`rotateX: 14~18deg`)で固定されるため、サブピクセルラスタライズのキャッシュや2D画面座標と3D投影面との非線形な角度差により、極めて微小な操作抵抗感が感じられる場合があります。
2. **推奨対応ロードマップ**:
   * **短期**: 高解像度(Retina/モバイル)DPIに応じたドラッグしきい値(Threshold)の動的調整＆`onLostPointerCapture`安全タイマーガードの実装
   * **中期**: `DOMMatrix.inverse()`による3D逆投影(スクリーン座標からローカル座標への逆変換)の補正計算
   * **長期 (次世代)**: Three.js / WebGL / WebXRネイティブのRaycasterによる完全仮想3Dキャンバスへの移行
3. **クラウドサンドボックステストベッド (Cloud Sandbox Testbed)**:
   * ローカルPCの環境設定なしで、Google Colabのトンネリングを通じて実機端末(iOS Safari, Android Chrome)での3D/XRドラッグジェスチャーをリモート検証可能です。[GOOGLE_COLAB_GUIDE.md](./GOOGLE_COLAB_GUIDE.md) をご参照ください。

アーキテクチャ図、数学的座標計算式、ブラウザ別(Chrome/Safari/Firefox)QAマトリクスについては **[技術ハンドオーバー文書](./DEVELOPER_HANDOVER_3D_XR_DRAG.md)** をご覧ください。

---

## 📄 ライセンス

このプロジェクトは **MITライセンス** のもとで公開されています。商用利用・改変・再配布が自由に許可されています。
