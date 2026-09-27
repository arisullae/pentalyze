# ☁️ 구글 코랩(Google Colab)을 활용한 설치·운영·삭제 완벽 가이드
## [Google Colab Cloud Sandbox Guide] Zero-Install Testbed & Disposable Deployment

> **가이드 대상**: 로컬 PC에 Node.js나 개발 툴 설치 없이 웹 브라우저만으로 Pentalyze를 클라우드 환경에서 즉시 구동, 테스트, 운영 및 흔적 없이 삭제하고자 하는 모든 사용자 및 개발자  
> **소요 시간**: 약 2~3분 내외  
> **비용**: 구글 계정만 있으면 100% 무료 (Google Colab Free Tier CPU 활용)

---

## 📌 목차 (Table of Contents)
1. [구글 코랩(Google Colab) 샌드박스 개요 및 장점](#1-구글-코랩google-colab-샌드박스-개요-및-장점)
2. [⚖️ 코랩 구동 실패(오류) vs 성공 코드 심층 비교 및 교체 내역](#2-️-코랩-구동-실패오류-vs-성공-코드-심층-비교-및-교체-내역)
3. [📌 'your-username' 및 깃허브(GitHub) 저장소 URL 설정 상세 안내](#3--your-username-및-깃허브github-저장소-url-설정-상세-안내)
4. [🚀 원클릭 빠른 실행 (Quick Start - 권장 성공 코드)](#4--원클릭-빠른-실행-quick-start---권장-성공-코드)
5. [단계별 상세 설치 및 실행 가이드 (Installation & Launch)](#5-단계별-상세-설치-및-실행-가이드-installation--launch)
   - Step 1: 코랩 노트북 생성 및 런타임 연결
   - Step 2: Node.js LTS 환경 세팅 및 프로젝트 클론
   - Step 3: 패키지 의존성 설치 및 프로덕션 빌드
   - Step 4: 외부 접속 터널링(Cloudflare / LocalTunnel) 실행
6. [운영 및 모니터링 가이드 (Operation & Monitoring)](#6-운영-및-모니터링-가이드-operation--monitoring)
   - 백그라운드 프로세스 확인 및 관리
   - 환경변수 및 API 키 설정 (Colab Secrets)
7. [완전 삭제 및 자원 회수 가이드 (Teardown & Clean-up)](#7-완전-삭제-및-자원-회수-가이드-teardown--clean-up)
   - 1단계: 실행 프로세스 강제 종료 (Kill)
   - 2단계: 저장소 및 디렉토리 완전 삭제 (Purge)
   - 3단계: 코랩 런타임 세션 연결 해제 (Clean Reset)
8. [자주 묻는 질문 및 트러블슈팅 (FAQ & Troubleshooting)](#8-자주-묻는-질문-및-트러블슈팅-faq--troubleshooting)

---

## 1. 구글 코랩(Google Colab) 샌드박스 개요 및 장점

Google Colab은 구글이 제공하는 클라우드 기반 가상 머신(Ubuntu Linux 환경) 서비스입니다. 본 프로젝트를 코랩에서 구동하면 다음과 같은 이점이 있습니다:

* **Zero-Install (로컬 무설치)**: 사용자 PC에 Node.js, Git, VS Code 등 개발 도구를 일절 설치하지 않아도 됩니다.
* **OS 독립성**: Windows, macOS, ChromeOS, 태블릿, 저사양 노트북 어디서나 동일한 Linux 환경에서 구동됩니다.
* **완벽한 보안 격리 (Sandbox)**: 클라우드 가상 머신 안에서만 동작하므로 로컬 PC의 파일 시스템이나 레지스트리에 아무런 영향을 미치지 않습니다.
* **100% 깔끔한 일회용(Disposable) 환경**: 테스트 후 폴더 삭제나 런타임 초기화 클릭 한 번으로 모든 파일과 실행 기록이 즉시 파기됩니다.

---

## 2. ⚖️ 코랩 구동 실패(오류) vs 성공 코드 심층 비교 및 교체 내역

구글 코랩 환경에서 발생하기 쉬운 주요 실패 사례와 이를 해결한 안정적인 성공 코드 구성을 비교한 내용입니다.

| 구분 | ❌ 실패 사례 (오류 발생 원인) | ✅ 성공 코드 (개선 및 교체 내용) |
| :--- | :--- | :--- |
| **저장소 클론** | `!git clone https://github.com/your-username/pentalyze.git`<br>➔ `your-username`을 미변경한 채 실행하여 `fatal: repository not found` 에러로 중단됨 | 코랩의 인터랙티브 파라미터(`#@param`) 및 자동 검증 로직 적용. 만약 미변경 시 즉각적이고 친절한 교체 안내 메시지 출력 |
| **서버 기동 대기** | `server = subprocess.Popen(...)`<br>`time.sleep(4)`<br>➔ 코랩 시스템 부하로 서버 초기화가 4초보다 늦어지면 터널 접속 시 **502 Bad Gateway** 발생 | 단순 시간 지연 대신 **`socket.connect_ex` 루프**를 구현하여 로컬 3000번 포트가 실제 응답할 때까지 대기 후 터널을 연결 |
| **터널 도구 설치** | `!dpkg -i cloudflared.deb`<br>➔ 다른 백그라운드 apt 프로세스가 lock을 잡고 있거나 파일 손상 시 dpkg 오류 발생 | `/usr/local/bin/cloudflared`로 공식 단독 실행 바이너리를 직접 다운로드(`curl -L`)하여 패키지 충돌을 원천 차단 |
| **작업 디렉토리** | 주피터 노트북의 `%cd` 명령이 재실행 시 꼬여 디렉토리를 찾지 못함 | 서브프로세스 실행 시 `cwd="/content/pentalyze"`를 명시적으로 강제 바인딩하여 항상 일관된 동작 보장 |

---

## 3. 📌 'your-username' 및 깃허브(GitHub) 저장소 URL 설정 상세 안내

코드 내의 아래 구문에 대한 올바른 적용 방법입니다:
```python
# 본인의 Fork 저장소 또는 메인 저장소 URL로 교체 가능합니다
!git clone https://github.com/your-username/pentalyze.git
```

### ❓ 'your-username'에는 무엇을 넣어야 하나요?
* **`your-username`**은 **본인의 깃허브 계정 아이디(Username)**를 의미합니다.
* **적용 예시**:
  * 만약 사용자의 GitHub 아이디가 `developer-id`라면:
    ```bash
    https://github.com/developer-id/pentalyze.git
    ```
  * 만약 사용자의 GitHub 아이디가 `user-account`라면:
    ```bash
    https://github.com/user-account/pentalyze.git
    ```

### 📋 깃허브 웹페이지에서 정확한 복사 URL 확인하는 법
1. 본인의 GitHub에 로그인한 후, Fork(포크)해 둔 **Pentalyze 저장소 페이지**로 이동합니다.
2. 저장소 상단의 초록색 **`[<> Code]`** 버튼을 클릭합니다.
3. 드롭다운에서 **[HTTPS]** 탭을 선택한 뒤, 주소 우측의 **복사 아이콘(📋)**을 클릭합니다.
4. 복사된 주소(`https://github.com/[내아이디]/pentalyze.git`)를 아래 코드의 `GITHUB_REPO_URL` 입력란에 그대로 붙여넣으시면 됩니다.

> 💡 **참고**: 아직 본인 계정으로 Fork(포크)하지 않고 먼저 테스트해 보려는 경우, 현재 열려있는 원본 저장소의 실제 주소를 입력하셔도 정상 구동됩니다.

---

## 4. 🚀 원클릭 빠른 실행 (Quick Start - 권장 성공 코드)

새 구글 코랩 노트북([colab.research.google.com](https://colab.research.google.com))을 연 뒤, 아래의 코드 블록을 복사하여 코드 셀에 붙여넣고 **[Shift + Enter]**를 누르면 모든 설치, 빌드 및 외부 접속 URL 생성이 안정적으로 자동 완료됩니다.

*(우측 폼에서 본인의 GitHub 저장소 URL을 바로 수정할 수 있습니다)*

```python
#@title 🚀 [Pentalyze] 구글 코랩 원클릭 자동 설치 & Cloudflare 터널 실행기 { display-mode: "form" }
#@markdown 본인의 GitHub 저장소 URL을 입력해 주세요 (Fork한 본인의 계정 아이디를 입력)
GITHUB_REPO_URL = "https://github.com/your-username/pentalyze.git" #@param {type:"string"}

import os, sys, time, socket, subprocess

# ==============================================================================
# 0. 깃허브 저장소 주소 검증 ('your-username' 미변경 방지)
# ==============================================================================
if "your-username" in GITHUB_REPO_URL:
    print("\n" + "!" * 70)
    print("⚠️ [안내] GITHUB_REPO_URL에 'your-username'이 그대로 포함되어 있습니다!")
    print("👉 위 폼 입력창 또는 코드에서 'your-username'을 본인의 GitHub 아이디로 변경해 주세요.")
    print("   (예시: https://github.com/developer-id/pentalyze.git)")
    print("!" * 70 + "\n")
    raise ValueError("올바른 GitHub 저장소 URL을 입력한 후 다시 실행해 주세요.")

print(f"🔗 사용할 저장소 주소: {GITHUB_REPO_URL}")

# ==============================================================================
# 1. 최신 Node.js 20.x LTS 설치 (충돌 방지 처리)
# ==============================================================================
print("📦 [1/4] Node.js 20.x LTS 환경 확인 및 설치 중...")
subprocess.run("curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - > /dev/null 2>&1", shell=True)
subprocess.run("sudo apt-get install -y nodejs > /dev/null 2>&1", shell=True)
node_ver = subprocess.getoutput("node -v")
npm_ver = subprocess.getoutput("npm -v")
print(f"✅ Node.js: {node_ver} / npm: {npm_ver}")

# ==============================================================================
# 2. Cloudflare 터널링 툴 바이너리 설치 (dpkg 잠금 충돌 원천 차단)
# ==============================================================================
print("🌐 [2/4] 외부 접속 터널링 도구(cloudflared) 설치 중...")
subprocess.run("curl -sL https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o /usr/local/bin/cloudflared", shell=True)
subprocess.run("chmod +x /usr/local/bin/cloudflared", shell=True)

# ==============================================================================
# 3. 프로젝트 저장소 클론 및 패키지 설치
# ==============================================================================
print("📥 [3/4] Pentalyze 소스코드 클론 및 패키지 설치 중...")
os.chdir("/content")
subprocess.run("rm -rf /content/pentalyze", shell=True)
clone_res = subprocess.run(f"git clone {GITHUB_REPO_URL} /content/pentalyze", shell=True)
if clone_res.returncode != 0:
    raise RuntimeError("❌ Git 저장소를 복제하지 못했습니다. URL과 공개(Public) 여부를 확인해 주세요.")

os.chdir("/content/pentalyze")
subprocess.run("npm install", shell=True)

# ==============================================================================
# 4. 풀스택 서버 백그라운드 구동 & 소켓 포트(3000) 감지 후 터널 개방
# ==============================================================================
print("✨ [4/4] Express/Vite 서버 구동 중...")
server_process = subprocess.Popen(["npm", "run", "dev"], cwd="/content/pentalyze")

# 3000번 포트가 실제로 열릴 때까지 안전 대기 (502 Bad Gateway 방지)
def wait_for_port(port=3000, timeout=30):
    start_time = time.time()
    while time.time() - start_time < timeout:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
            if sock.connect_ex(('127.0.0.1', port)) == 0:
                return True
        time.sleep(1)
    return False

print("⏳ 로컬 서버 포트(3000) 바인딩 대기 중...")
if wait_for_port(3000, timeout=35):
    print("✅ 로컬 서버가 포트 3000에서 정상 응답을 시작했습니다!")
else:
    print("⚠️ 포트 감지 시간 초과: 터널 연결을 계속 시도합니다.")

print("\n" + "=" * 70)
print("🎉 Pentalyze 클라우드 서버가 성공적으로 실행되었습니다!")
print("👉 아래 로그에 표시되는 'https://*.trycloudflare.com' 주소를 클릭하세요.")
print("=" * 70 + "\n")

# Cloudflare 임시 보안 터널 오픈 (전 세계 어디서든 브라우저로 접속 가능)
subprocess.run("cloudflared tunnel --url http://localhost:3000", shell=True)
```

---

## 5. 단계별 상세 설치 및 실행 가이드 (Installation & Launch)

### Step 1: 코랩 노트북 준비
1. 웹 브라우저에서 [Google Colab](https://colab.research.google.com)에 접속하여 로그인합니다.
2. **[파일]** ➔ **[새 노트]**를 클릭하여 새로운 주피터 노트북을 생성합니다.
3. 상단 메뉴 **[런타임]** ➔ **[런타임 유형 변경]**에서 기본 `CPU`를 선택합니다 (GPU 가속이 필요하지 않은 웹 프론트엔드/Node 환경이므로 무료 CPU 런타임으로도 매우 쾌적합니다).

---

### Step 2: Node.js LTS 환경 세팅 및 프로젝트 클론
기본 코랩 환경의 구형 Node 버전을 최신 LTS(20.x)로 업그레이드하고 프로젝트를 불러옵니다.

```bash
# Node.js 20.x 설치
!curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
!sudo apt-get install -y nodejs

# 저장소 클론 (본인의 GitHub 아이디가 developer-id인 경우의 예시)
%cd /content
!git clone https://github.com/developer-id/pentalyze.git
%cd /content/pentalyze
```

---

### Step 3: 패키지 의존성 설치
프로젝트에 필요한 React, Tailwind CSS, Lucide 아이콘 등의 라이브러리를 설치합니다.

```bash
# 의존성 설치
!npm install
```

---

### Step 4: 외부 접속 터널링(Tunneling) 실행

구글 코랩 가상머신의 로컬 포트(`localhost:3000`)는 기본적으로 외부 인터넷에 노출되지 않으므로, 터널링 도구를 통해 안전한 외부 HTTPS 도메인을 연결합니다.

#### 방법 A. Cloudflare Tunnel (가장 안정적 / 적극 권장)
회원가입이나 인증 토큰 없이 고속 글로벌 HTTPS 주소를 부여받습니다.

```python
# Cloudflare 바이너리 설치 및 실행
!curl -sL https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o /usr/local/bin/cloudflared && chmod +x /usr/local/bin/cloudflared

# 백그라운드로 Node 서버 구동
import subprocess, time
subprocess.Popen(["npm", "run", "dev"], cwd="/content/pentalyze")
time.sleep(5)

# 터널 개방 (출력되는 https://*.trycloudflare.com 링크 접속)
!cloudflared tunnel --url http://localhost:3000
```

#### 방법 B. LocalTunnel (대체 옵션)
```python
import subprocess, time
subprocess.Popen(["npm", "run", "dev"], cwd="/content/pentalyze")
time.sleep(5)

# 터널링 실행 (외부 공인 IP 확인 후 링크 접속)
!curl ipv4.icanhazip.com
!npx localtunnel --port 3000
```

---

## 6. 운영 및 모니터링 가이드 (Operation & Monitoring)

### 📊 프로세스 동작 상태 확인
코랩 셀에서 현재 백그라운드로 실행 중인 서버 프로세스 상태를 확인할 수 있습니다.

```bash
# 실행 중인 node 및 터널 프로세스 목록 확인
!ps aux | grep node
!ps aux | grep cloudflared
```

### 🔑 환경변수 및 API 키 보호 (Google Colab Secrets 활용)
Google Gemini 또는 OpenAI API 키를 하드코딩하지 않고 코랩의 비밀 저장소(Secrets) 기능을 통해 안전하게 주입할 수 있습니다:

1. 코랩 좌측 사이드바에서 **열쇠 모양 아이콘(Secrets)**을 클릭합니다.
2. 새 비밀값 추가:
   * 이름: `GEMINI_API_KEY`
   * 값: `AIzaSy...` (발급받은 실제 키 입력)
   * **[노트북 액세스 권한]** 스위치를 ON으로 설정합니다.
3. 파이썬 셀에서 이를 읽어 프로젝트 환경변수 파일(`.env`)을 생성합니다:

```python
from google.colab import userdata

try:
    gemini_key = userdata.get('GEMINI_API_KEY')
    with open('/content/pentalyze/.env', 'w') as f:
        f.write(f"VITE_GEMINI_API_KEY={gemini_key}\n")
    print("✅ .env 파일에 API 키가 안전하게 주입되었습니다.")
except Exception as e:
    print("ℹ️ Secrets에 GEMINI_API_KEY가 등록되지 않았습니다 (앱 내 UI에서 직접 입력 가능).")
```

---

## 7. 완전 삭제 및 자원 회수 가이드 (Teardown & Clean-up)

테스트 및 체험이 완료된 후, 클라우드 환경을 깨끗하게 정리하고 자원을 회수하는 방법입니다.

### 1단계: 실행 프로세스 강제 종료 (Kill)
백그라운드에서 실행 중인 Node.js 웹 서버 및 Cloudflare 터널 프로세스를 중단합니다.

```bash
# 구동 중인 관련 프로세스 일괄 종료
!pkill -f node || true
!pkill -f cloudflared || true
!echo "🛑 모든 서버 및 터널 프로세스가 정상 종료되었습니다."
```

### 2단계: 저장소 및 디렉토리 완전 삭제 (Purge)
다운로드된 소스코드, `node_modules` 라이브러리, `.env` 설정 파일을 디스크에서 영구 삭제합니다.

```bash
%cd /content
!rm -rf /content/pentalyze
!rm -f /usr/local/bin/cloudflared
!echo "🗑️ Pentalyze 디렉토리 및 설치 파일이 완벽히 삭제되었습니다."
```

### 3단계: 구글 코랩 런타임 세션 연결 해제 (Clean Reset)
가상 머신 인스턴스 자체를 완전히 소멸시켜 구글 클라우드에 어떤 세션 잔여물도 남기지 않으려면:

1. 코랩 상단 메뉴 바에서 **[런타임 (Runtime)]**을 클릭합니다.
2. **[런타임 연결 해제 및 삭제 (Disconnect and delete runtime)]**를 선택합니다.
3. 확인 팝업창에서 **[예]**를 누르면 가상 머신 디스크가 즉시 포맷 및 반환됩니다.

---

## 8. 자주 묻는 질문 및 트러블슈팅 (FAQ & Troubleshooting)

### Q1. 브라우저 창을 닫으면 코랩 서버가 꺼지나요?
* 네, 구글 코랩 무료 티어는 웹 브라우저 탭을 닫거나 일정 시간 동안 인터랙션이 없으면 백그라운드 세션이 절전/종료 상태로 전환됩니다.
* 장시간 운영이 목적이 아닌 **"무설치 테스트베드 / 빠른 검증 및 기능 체험"** 목적으로 활용하시는 것을 권장합니다.

### Q2. Cloudflare 터널 주소로 접속했는데 보안 경고가 나타납니다.
* Cloudflare의 무료 임시 터널(`trycloudflare.com`) 접속 시 첫 화면에 경고성 안내 페이지(Notice)가 나타날 수 있습니다. 이는 피싱 방지를 위한 Cloudflare의 기본 정책이며, 중앙의 **[Visit Site / 계속하기]** 버튼을 클릭하시면 정상적으로 Pentalyze 앱이 로드됩니다.

### Q3. LocalTunnel 사용 시 비밀번호(Password)를 입력하라고 나옵니다.
* LocalTunnel은 최초 접속 시 접속자의 보안 확인을 위해 호스트의 공인 IP 주소를 비밀번호로 요구합니다.
* 코랩 셀에서 `!curl ipv4.icanhazip.com` 명령으로 출력된 IP 주소 숫자(예: `34.125.xx.xx`)를 복사하여 비밀번호 입력창에 붙여넣고 Submit을 누르시면 됩니다.

---

> **연관 문서**:
> * [Pentalyze 공식 README.md](../README.md)
> * [3D/XR 인터랙션 기술 핸드오버 문서](./DEVELOPER_HANDOVER_3D_XR_DRAG.md)
