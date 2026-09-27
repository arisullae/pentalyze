# 📖 Pentalyze : 다섯결 (5-Step Sentence Insights & 3D Flip-Book)

> **한 문장에서 발견하는 5가지 깊이 있는 통찰과 3D 디지털 북 인터랙션**  
> *1 Sentence ➔ 5-Step Deep Insights & 3D Interactive Hardcover Book*

[![PWA Ready](https://img.shields.io/badge/PWA-Installable-blue.svg)](https://web.dev/progressive-web-apps/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

### 🌐 다국어 가이드 문서 (Global Language Guides)
[**English**](./docs/README_en.md) | [**日本語**](./docs/README_ja.md) | [**हिन्दी**](./docs/README_hi.md) | [**Español**](./docs/README_es.md) | [**Français**](./docs/README_fr.md) | [**Deutsch**](./docs/README_de.md) | [**Italiano**](./docs/README_it.md) | [**Português**](./docs/README_pt.md) | [**Русский**](./docs/README_ru.md)

---

## 📢 프로젝트 공개 및 아카이브(Archive) 공지
> **[안내] 본 프로젝트는 개인 및 오픈소스 공유 목적으로 깃허브에 공개된 아카이브(Archive) 프로젝트입니다.**  
> 깃허브 업로드 이후 제작자에 의한 **별도의 추가 기능 개발이나 지속적인 유지보수(버그 패치, 신규 기능 추가 등)는 계획되어 있지 않습니다.**  
> 모든 코드는 자유롭게 복제(Fork), 수정 및 상업적·비상업적 용도로 활용하실 수 있습니다. 필요하신 기능이나 변경 사항이 있다면 저장소를 Fork하여 자유롭게 발전시켜 주시기 바랍니다.

---

## 🌍 지원 국가·언어 및 문자 체계 (10 Supported Languages & Scripts)

Pentalyze는 코드베이스 전반(`src/i18n/translations.ts`, `src/types.ts`)에 걸쳐 **글로벌 10개국 언어와 고유 문자 체계**를 완벽하게 지원합니다.

| 국가 / 지역 | 언어명 (Language) | 고유 표기 (Native) | 문자 체계 (Writing Script) | 언어 코드 | 가이드 문서 |
| :---: | :---: | :---: | :---: | :---: | :---: |
| 🇰🇷 **대한민국** | **한국어** | **한국어** | **한글 (Hangul)** | `ko` | **현재 문서 (Main)** |
| 🇺🇸 **미국 / 영미권** | **영어 (English)** | English | 로마자 (Latin script) | `en` | [README_en.md](./docs/README_en.md) |
| 🇯🇵 **일본** | **일본어 (Japanese)** | 日本語 | 한자 / 히라가나 / 가타카나 (Kanji & Kana) | `ja` | [README_ja.md](./docs/README_ja.md) |
| 🇮🇳 **인도** | **힌디어 (Hindi)** | हिन्दी | 데바나가리 (Devanagari script) | `hi` | [README_hi.md](./docs/README_hi.md) |
| 🇪🇸 **스페인** | **스페인어 (Spanish)** | Español | 로마자 (Latin script) | `es` | [README_es.md](./docs/README_es.md) |
| 🇫🇷 **프랑스** | **프랑스어 (French)** | Français | 로마자 (Latin script) | `fr` | [README_fr.md](./docs/README_fr.md) |
| 🇩🇪 **독일** | **독일어 (German)** | Deutsch | 로마자 (Latin script) | `de` | [README_de.md](./docs/README_de.md) |
| 🇮🇹 **이탈리아** | **이탈리아어 (Italian)** | Italiano | 로마자 (Latin script) | `it` | [README_it.md](./docs/README_it.md) |
| 🇧🇷 **브라질 / 포르투갈** | **포르투갈어 (Portuguese)** | Português | 로마자 (Latin script) | `pt` | [README_pt.md](./docs/README_pt.md) |
| 🇷🇺 **러시아** | **러시아어 (Russian)** | Русский | 키릴 문자 (Cyrillic script) | `ru` | [README_ru.md](./docs/README_ru.md) |

---

## 🌟 프로젝트 소개 (Overview)

**Pentalyze(다섯결)**는 단 한 문장 또는 짧은 문단으로부터 다각도의 언어적·맥락적 통찰(5가지 결)을 도출하는 AI 기반 문장 분석, 교정 및 3D 시각화 솔루션입니다.

한국어와 한글을 메인 기반으로 구축되었으며, 상기 명시된 10개국 고유 문자와 언어를 완벽하게 지원합니다. 분석된 문장은 3차원 입체 디지털 양장본 책장 넘김 인터랙션, 원문 대조 듀얼 뷰(Split-View), 실시간 다국어 오디오북 낭독(TTS)을 통해 한 권의 문집을 독서하듯 감상할 수 있습니다.

---

## 🔑 API 작동 원리 및 AI Studio 키 연동 가이드

### 1. '서버 기본키'의 의미와 깃허브 배포 환경에서의 작동 방식
* **개발자 키 및 AI Studio 키 미노출**: 본 저장소의 소스코드는 보안 표준에 따라 개발자의 개인 API 키를 코드나 배포 파일에 일체 포함하지 않습니다. 
* **깃허브 다운로드 실행 시 작동 방식**: 사용자가 이 저장소를 클론(다운로드)받아 본인의 PC/태블릿/모바일 환경에서 실행할 경우, AI Studio 운영 서버의 키는 연결되지 않습니다. 대신 **사용자 본인이 발급받은 API 키를 입력하여 사용하는 'BYOK(Bring Your Own Key)' 체제**로 안전하게 동작합니다.
* **철저한 로컬 보안**: 사용자가 브라우저에서 입력한 API 키는 외부 서버로 전송되지 않으며, 사용자 본인 브라우저의 `localStorage`에만 암호화/격리 보관됩니다.

### 2. Google AI Studio 무료 API Key 발급 및 등록 절차 (권장)
본 프로젝트는 **Google AI Studio**의 Gemini API에 최적화되어 있습니다. 누구나 무료로 개인 API 키를 발급받아 사용할 수 있습니다.

1. **API 키 발급받기**:
   - [Google AI Studio (https://aistudio.google.com/)](https://aistudio.google.com/)에 접속하여 구글 계정으로 로그인합니다.
   - 상단 또는 좌측 메뉴에서 **'Get API key'**를 클릭합니다.
   - **'Create API key'** 버튼을 눌러 새 프로젝트를 생성하고 무료 API 키를 복사합니다.
2. **앱에서 키 등록하기**:
   - 방법 A (웹 UI에서 간편 설정): 앱 우측 상단의 **설정(⚙️) 아이콘**을 클릭 ➔ **[내 API 키 사용]** 선택 ➔ 복사한 Gemini API 키 붙여넣기 ➔ **저장**
   - 방법 B (로컬 환경 변수 설정): 프로젝트 루트의 `.env.example`을 복사하여 `.env` 파일을 생성한 뒤 아래와 같이 설정
     ```env
     VITE_GEMINI_API_KEY=여러분의_구글_AI_STUDIO_API_키
     ```

### 3. 타사 AI 모델(OpenAI, DeepSeek, Claude, 로컬 Ollama) 연동 가이드
* **OpenAI (GPT-4o, GPT-4o-mini)**: 앱 상단 설정(⚙️) 모달에서 `OpenAI` 제공자를 선택하고 본인의 OpenAI API Key(`sk-...`)를 입력하면 즉시 작동합니다.
* **DeepSeek, Mistral, 로컬 Ollama (오프라인 오픈소스 LLM)**: 
  `src/services/ai.ts`의 `analyzeWithOpenAI()` 함수에서 `baseURL`을 타사 엔드포인트(예: `http://localhost:11434/v1/chat/completions`)로 지정하여 자유롭게 확장할 수 있습니다.

---

## 🎯 5가지 결 (5 Dimensions of Insights)

1. **제1결: 해석 (Interpretation)**: 문장의 표면적 의미뿐 아니라 행간의 숨은 의도와 뉘앙스 탐색
2. **제2결: 요약 (Summary)**: 1초 만에 파악하는 원포인트 코어 메시지 압축
3. **제3결: 상세 설명 (Deep Explanation)**: 문맥에 부합하는 고급 전문 어휘 및 배경지식 해설
4. **제4결: 문법 수정 (Grammar & Polish)**: 비문, 맞춤법, 어색한 번역투 교정 및 비즈니스 격식체 리라이팅
5. **제5결: 단어 재조합 (Paraphrasing)**: 풍부한 어휘 풀을 활용한 세련된 대체 표현 3선 제시

---

## 🚀 주요 기능 (Key Features)

- **반응형 3D 입체 디지털 북 (Responsive 3D Flip-Book Engine)**: 
  - CSS 3D Perspective 변환 기반의 사실적인 종이 책장 곡면 및 양장본 그림자 효과
  - **PC/와이드 양면 모드 (2-Page Spread)**: 2페이지 동시 펼침, 좌/우 상단 모서리 힌지 버튼 및 부드러운 수평 플립
  - **모바일/태블릿 세로 단일 모드 (Single-Page View)**: 모바일 뷰포트에 최적화된 1페이지 레이아웃, 상·하단 직관적 넘기기 버튼(`이전 장 (N결 · ...)`, `다음 장 (N+1결 · ...)`), 본문 터치 스크롤(`pan-y`)과 분리되어 터치 충돌 없는 최상의 모바일 독서 경험
  - **물리 잡고 넘기기 (Grip & Drag Mode) 듀얼 시스템**:
    - **OFF (기본 모드)**: 가벼운 원클릭/탭으로 즉시 페이지 전환
    - **ON (잡고 드래그 모드)**: 오직 넘기기 버튼을 누른 채 드래그(Hold & Drag)했을 때만 실시간 종이 말림 연출과 함께 페이지가 넘어가는 물리 모드 (단순 탭 시 드래그 안내 플로팅 토스트 및 햅틱 진동 피드백 표출)
- **이원화 다국어 아키텍처 (헤더 베이스 언어 vs 3D 책장 열람/번역 모드)**:
  - **헤더 언어 설정**: 전체 UI(메뉴, 도움말, 시스템 알림 등)를 친숙한 모국어로 유지
  - **3D 책장 내부 언어 설정**: 현재 읽고 있는 책만을 다른 국가의 언어로 선택하여 실시간 AI 번역 및 다국어 낭독(TTS) 감상
  - **원터치 베이스 복귀**: 언제든지 `[↩ 베이스 언어로]` 버튼을 통해 기본 언어로 즉시 복귀
- **원문-번역/교정 대조 듀얼 뷰 (Bilingual Split-View)**:
  - 3D 책장 상단 툴바의 `대조 뷰` 버튼을 통해 원본 문장(Source)과 각 결의 교정문(Polished)을 좌우로 분할 대조
  - **컴팩트 헤더 레이아웃**: 국기 및 국가 코드(`KR`, `US` 등)와 언어명 기반의 미니멀리즘 헤더로 모바일 세로 뷰포트에서도 줄바꿈 없는 깔끔한 1줄 배치
  - **맞춤형 개별 & 교차 오디오 낭독**: 원어 단독 낭독, 번역어 단독 낭독, 원어↔번역어 교차 대조 낭독 지원
- **PWA (Progressive Web App) 오프라인 및 설치 지원**:
  - 모바일(iOS/Android) 및 PC 데스크톱에서 브라우저 주소창 없이 네이티브 앱처럼 독립 창(Standalone) 실행
  - Service Worker 캐싱을 통한 빠른 초기 로딩 지원
- **하이브리드 오디오북 낭독 엔진 (Hybrid TTS)**:
  - 브라우저 표준 Web Speech API 내장 엔진으로 비용 없는 실시간 음성 지원 (열람 중인 언어의 네이티브 발음 자동 매칭)
  - ElevenLabs 개인 음성 복제 연동 지원 및 배속(0.8x~1.5x) 조절
- **나만의 서재 & 내보내기**:
  - 분석된 모든 문장의 브라우저 로컬 자동 보관 및 즐겨찾기
  - 마크다운(.md) 복사 및 다운로드, 인쇄/PDF 저장 지원

---

## 📦 시작하기 (Quick Start)

### 사전 요구사항
- **Node.js** 18.0 이상 ([공식 홈페이지(nodejs.org)](https://nodejs.org/)에서 LTS 버전 설치)

---

### 🖱️ 일반 사용자: 더블 클릭 한 번으로 실행하기 (추천)
저장소를 다운로드(ZIP 압축 해제)한 후, 본인의 운영체제에 맞는 파일을 더블 클릭하기만 하면 **의존성 설치부터 브라우저 실행까지 자동으로 완료**됩니다.

* **Windows 사용자**: 폴더 안의 **`start.bat`** 파일을 마우스로 더블 클릭합니다.
* **Mac / Linux 사용자**: 터미널에서 `bash start.sh`를 입력하거나 `chmod +x start.sh && ./start.sh`를 실행합니다.

---

### 💻 개발자: 터미널 명령어로 직접 실행하기
```bash
# 저장소 클론
git clone https://github.com/your-username/pentalyze.git
cd pentalyze

# 의존성 패키지 설치
npm install

# 로컬 개발 서버 실행 (포트 3000)
npm run dev

# 프로덕션 번들 빌드
npm run build
```

---

## 📲 앱 설치(PWA) 및 삭제/제거 가이드 (Installation & Uninstallation)

> 💡 **서비스 배포 및 사용자 앱 설치 지원 안내**:  
> 향후 본 프로젝트를 그대로 배포하거나 독자적으로 수정·개선하여 서비스를 오픈할 경우, 이를 방문한 일반 사용자가 PC·태블릿·스마트폰 어디서든 헤더의 **[앱 설치]** 버튼이나 브라우저 자체 설치 기능을 통해 독립된 네이티브 앱(PWA) 형태로 설치하여 사용할 수 있도록 모든 구성(PWA 매니페스트, 서비스 워커, 인스톨 프롬프트 모달)이 완벽하게 포함되어 있습니다.

Pentalyze는 웹 표준 기술인 **PWA(Progressive Web App)**를 완벽 지원합니다. 별도의 앱스토어를 거치지 않고 PC 데스크톱 및 모바일 기기에 네이티브 독립형 앱으로 간편하게 설치하여 브라우저 주소창 없이 실제 책처럼 이용할 수 있으며, 언제든 손쉽게 삭제(제거)할 수 있습니다.

### 1. 🖥️ PC 데스크톱 (Windows / macOS / Linux)

#### 📥 앱 설치 방법
1. **브라우저 주소창 아이콘**: Chrome, Edge, Whale 등 브라우저로 Pentalyze 접속 시 주소창 우측 끝에 나타나는 **[설치 (⊕ / 💻)]** 아이콘을 클릭합니다.
2. **앱 내부 버튼**: 앱 상단 헤더의 **[앱 설치]** 버튼을 클릭한 후 팝업 창에서 **[설치]**를 클릭합니다.
3. 설치 완료 시 바탕화면과 시작 메뉴(작업표시줄)에 Pentalyze 바로가기 아이콘이 생성되며, 브라우저 메뉴 없는 독립 앱 창으로 즉시 실행됩니다.

#### 🗑️ 앱 삭제 (제거) 방법
* **방법 1 (앱 창 내부에서 직접 삭제 - 가장 간편)**:  
  실행 중인 Pentalyze 독립 창 우측 상단의 **메뉴(⋮ 또는 ···)** 클릭 ➔ **[Pentalyze 제거...]** 또는 **[앱 제거]** 클릭 ➔ (선택) '관련 데이터도 삭제' 체크 후 **[제거]**를 클릭합니다.
* **방법 2 (브라우저 앱 관리자)**:  
  - Chrome 브라우저 주소창에 `chrome://apps` 입력 후 Enter ➔ `Pentalyze` 아이콘 우클릭 ➔ **[Chrome에서 삭제...]** 선택.
  - Edge 브라우저 주소창에 `edge://apps` 입력 후 Enter ➔ `Pentalyze` 항목 우측의 **[···]** 클릭 ➔ **[제거]** 선택.
* **방법 3 (Windows 운영체제 설정)**:  
  Windows [시작] ➔ [설정] ➔ [앱] ➔ [설치된 앱] (또는 프로그램 추가/제거) ➔ 'Pentalyze' 검색 후 **[제거]** 선택.
* **방법 4 (macOS Finder)**:  
  Finder ➔ [응용 프로그램 (Applications)] 또는 사용자 홈 폴더 내 [Chrome Apps] ➔ 'Pentalyze' 아이콘을 휴지통으로 이동.

---

### 2. 📱 모바일 및 태블릿 (iOS Safari / Android Chrome)

#### 🍎 iPhone / iPad (iOS Safari)
* **설치**: Safari 브라우저로 접속 ➔ 하단 중앙 툴바의 **공유(Share, ⎋ / ↑) 아이콘** 탭 ➔ 메뉴 목록에서 **[홈 화면에 추가 (Add to Home Screen)]** 선택 ➔ 우측 상단 **[추가]** 탭 ➔ 홈 화면에 정식 앱 아이콘 생성.
* **삭제**: 홈 화면의 Pentalyze 아이콘을 길게 누름(Long-press) ➔ **[앱 삭제]** ➔ **[홈 화면에서 제거]** 또는 **[삭제]** 선택.

#### 🤖 Android 스마트폰 / 태블릿 (Chrome)
* **설치**: Chrome 브라우저로 접속 ➔ 우측 상단 **메뉴(⋮)** 탭 ➔ **[앱 설치]** 또는 **[홈 화면에 추가]** 탭 ➔ 확인 팝업에서 **[설치]** 선택.
* **삭제**: 홈 화면의 Pentalyze 아이콘을 길게 누름 ➔ 상단 **[설치 삭제]** 아이콘으로 드래그하거나 팝업 메뉴의 **[설치 삭제]** 선택 (또는 기기 [설정] ➔ [애플리케이션] ➔ 'Pentalyze' ➔ [삭제]).

---

### 3. 💻 로컬 다운로드(Git Clone / ZIP 압축 해제) 프로젝트 실행 및 삭제

* **설치 및 실행**:
  - Windows: 폴더 안의 `start.bat` 더블 클릭 (Node.js 감지 및 자동 패키지 설치 후 브라우저 자동 오픈)
  - Mac / Linux: 터미널에서 `bash start.sh` 실행
* **완전 삭제(제거)**:
  - 본 프로그램은 레지스트리나 시스템 파일을 수정하지 않는 100% 독립 포터블 구조입니다.
  - 다운로드한 프로젝트 폴더 전체를 휴지통으로 이동(삭제)하시면 시스템에 아무런 잔여물 없이 완전히 제거됩니다.
  - 브라우저에 저장된 API 키와 서재 기록을 초기화하시려면, 앱 내 서재(📚)에서 **[전체 삭제]**를 누르시거나 브라우저 인터넷 사용 기록에서 캐시/사이트 데이터를 삭제하시면 됩니다.

---

### 4. ☁️ 구글 코랩(Google Colab) 클라우드 샌드박스 실행 및 삭제 (Zero-Install)

> **상세 원클릭 스크립트 및 운영 가이드**: 📄 [docs/GOOGLE_COLAB_GUIDE.md](./docs/GOOGLE_COLAB_GUIDE.md)

로컬 PC에 Node.js나 개발 환경을 전혀 설치하지 않고, 웹 브라우저만으로 클라우드 가상머신(Ubuntu)에서 안전하게 Pentalyze를 테스트·운영하고 흔적 없이 삭제할 수 있습니다.

* **💡 `your-username` 안내**:  
  `https://github.com/your-username/pentalyze.git`에서 `your-username`은 **본인의 깃허브 계정 아이디**(예: `developer-id` 등)로 교체하시거나, 본인 계정으로 Fork한 저장소 페이지 상단의 초록색 **[<> Code]** 버튼 ➔ **[HTTPS]** 복사 주소를 그대로 붙여넣으시면 됩니다.

* **원클릭 설치 및 실행 (Colab 셀에 붙여넣기)**:
  ```python
  # 1. Node.js 20.x 환경 구성 및 Cloudflare 터널 도구 설치
  !curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && sudo apt-get install -y nodejs > /dev/null 2>&1
  !curl -sL https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o /usr/local/bin/cloudflared && chmod +x /usr/local/bin/cloudflared
  
  # 2. 저장소 복제 ('your-username'을 본인의 GitHub 아이디로 교체)
  # (예: !git clone https://github.com/developer-id/pentalyze.git /content/pentalyze)
  !rm -rf /content/pentalyze
  !git clone https://github.com/your-username/pentalyze.git /content/pentalyze
  %cd /content/pentalyze
  !npm install
  
  # 3. 백그라운드 서버 구동 및 외부 접속 URL 발급
  import subprocess, time
  subprocess.Popen(["npm", "run", "dev"], cwd="/content/pentalyze")
  time.sleep(5) # 서버 부팅 대기
  !cloudflared tunnel --url http://localhost:3000
  ```
  *(출력창에 생성되는 `https://*.trycloudflare.com` URL로 전 세계 어디서든 브라우저로 즉시 접속 가능)*
* **완전 삭제 (Teardown & Purge)**:
  ```bash
  # 1. 프로세스 중단: !pkill -f node && !pkill -f cloudflared
  # 2. 파일 영구 삭제: !rm -rf /content/pentalyze && !rm -f /usr/local/bin/cloudflared
  # 3. 런타임 초기화: 코랩 메뉴 [런타임] ➔ [런타임 연결 해제 및 삭제] 클릭 시 100% 초기화
  ```

---

## 📂 프로젝트 구조 (Project Directory)

```
pentalyze/
├── docs/                         # 다국어 가이드 및 개발·운영자 기술 핸드오버 문서
│   ├── DEVELOPER_HANDOVER_3D_XR_DRAG.md # [필독] 3D/XR 드래그 인터랙션 분석 및 추가 조치 로드맵
│   ├── GOOGLE_COLAB_GUIDE.md     # [신규] 구글 코랩 클라우드 무설치 테스트·운영·삭제 가이드
│   └── README_*.md               # 9개 언어별 글로벌 사용자 가이드
├── public/                       # PWA 매니페스트 및 정적 에셋
├── src/
│   ├── components/
│   │   ├── presets/              # 언어별 추천 예시문 모듈
│   │   ├── Book3D.tsx            # 3D 입체 책장 넘김 & 대조 뷰(Split-View)
│   │   ├── Header.tsx            # 반응형 헤더 & PWA 설치 & 언어 선택
│   │   ├── SentenceInput.tsx     # 문장 입력 및 5결 분석 파이프라인
│   │   ├── BookshelfModal.tsx    # 나만의 서재 보관소
│   │   ├── ExportModal.tsx       # 마크다운 / PDF 내보내기
│   │   └── SettingsModal.tsx     # BYOK API 설정 모달
│   ├── services/
│   │   ├── ai.ts                 # Gemini / OpenAI 멀티 LLM 파이프라인
│   │   ├── tts.ts                # WebSpeech & ElevenLabs 하이브리드 엔진
│   │   └── storage.ts            # LocalStorage 영속성 관리
│   ├── i18n/
│   │   ├── locales/              # 10개국 언어 사전 (ko, en, ja, hi, es, fr, de, it, pt, ru)
│   │   ├── translations.ts       # 10개국 언어 정의 및 매핑
│   │   └── types.ts              # 사전 타입 정의
│   ├── App.tsx                   # 메인 애플리케이션
│   └── main.tsx                  # 리액트 엔트리 포인트
├── package.json
├── start.bat                     # Windows 원클릭 자동 실행 배치 파일
├── start.sh                      # Mac/Linux 원클릭 자동 실행 스크립트
└── README.md
```

---

## 🛠️ 개발·개선·배포·운영자를 위한 기술 핸드오버 (Developer & Maintainer Handover)

> **상세 기술 분석 및 조치 가이드**: 📄 [docs/DEVELOPER_HANDOVER_3D_XR_DRAG.md](./docs/DEVELOPER_HANDOVER_3D_XR_DRAG.md)  
> **클라우드 테스트베드 실행 가이드**: 📄 [docs/GOOGLE_COLAB_GUIDE.md](./docs/GOOGLE_COLAB_GUIDE.md)

본 프로젝트를 포크(Fork)하여 **향후 개발, 인터랙션 개선, 프로덕션 배포 및 운영**을 담당할 엔지니어를 위해, **'3D 입체' 및 'XR 공간' 모드에서 틸트(자이로/패럴랙스) 비활성화 시 상·하단 '잡고 넘기기' 버튼의 미세한 동작 특성과 추가 조치 항목**, 그리고 **구글 코랩 기반의 클라우드 샌드박스 테스트베드 구축 방법**이 문서화되어 있습니다.

### 📌 주요 이슈 요약 및 추가 조치 로드맵
1. **현상 및 원인 분석**:
   * **틸트 ON 상태**: 마우스 이동/자이로 센서 입력으로 인해 브라우저의 합성 스레드(Compositor Thread)가 매 프레임 레이어 기하 구조를 재평가(Continuous Hit-Testing)하여 드래그 반응이 즉각적임.
   * **틸트 OFF 상태**: 3D 공간 상에서 정적 각도(`rotateX: 14~18deg`)로 레이어가 고정되면서, 브라우저의 정적 서브픽셀 텍스처 캐싱 및 2D 스크린 벡터와 3D 투영 평면 간의 비선형 각도 차이로 인해 극미세한 조작감의 이질감이 잔존할 수 있음.
2. **개발·운영자를 위한 단계별 권장 조치 항목**:
   * **단기**: 고해상도(Retina/Mobile) DPI 기반 반응형 드래그 임계값(Threshold) 가변화 및 `onLostPointerCapture` 안전 타이머 가드 추가
   * **중기**: `DOMMatrix.inverse()` 기반 3D 역투영(Screen-to-Local-Space) 좌표 보정 연산 적용
   * **장기 (차세대)**: Three.js / WebGL / WebXR 네이티브 Raycaster 기반 완전한 3D 가상 캔버스 엔진으로의 마이그레이션
3. **클라우드 샌드박스 테스트베드(Cloud Sandbox Testbed)**:
   * 로컬 개발 머신 세팅 없이 구글 코랩 환경에서 터널링을 통해 모바일/태블릿 등 다양한 실제 단말기에서 3D/XR 드래그 제스처를 실시간 원격 디버깅할 수 있습니다. 자세한 방법은 [구글 코랩 가이드](./docs/GOOGLE_COLAB_GUIDE.md)를 참고하십시오.

자세한 아키텍처 다이어그램, 수학적 좌표식, 브라우저 엔진별(Chrome/Safari/Firefox) QA 매트릭스는 **[기술 핸드오버 가이드 문서](./docs/DEVELOPER_HANDOVER_3D_XR_DRAG.md)**를 참조하시기 바랍니다.

---

## 📄 라이선스 (License)

이 프로젝트는 **MIT 라이선스**를 따릅니다. 상업적 이용, 수정, 재배포가 자유롭게 허용됩니다.
