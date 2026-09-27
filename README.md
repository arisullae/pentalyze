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
- Node.js 18.0 이상
- npm 또는 pnpm, yarn

### 설치 및 로컬 실행
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

## 📂 프로젝트 구조 (Project Directory)

```
pentalyze/
├── docs/                         # 다국어 사용자 및 개발자 가이드 (9개 언어 문서)
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
└── README.md
```

---

## 📄 라이선스 (License)

이 프로젝트는 **MIT 라이선스**를 따릅니다. 상업적 이용, 수정, 재배포가 자유롭게 허용됩니다.
