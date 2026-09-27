#!/bin/bash

# ===================================================
#   📖 Pentalyze : 다섯결 3D 인터랙티브 서책 실행기 (Mac/Linux)
# ===================================================

echo "==================================================="
echo "  📖 Pentalyze : 다섯결 3D 인터랙티브 서책 실행기"
echo "==================================================="
echo ""

# 현재 스크립트 위치로 디렉터리 이동
cd "$(dirname "$0")"

# 1. Node.js 설치 여부 확인
if ! command -v node >/dev/null 2>&1; then
    echo "[알림] Node.js가 설치되어 있지 않습니다."
    echo "웹 서책을 로컬에서 실행하려면 Node.js가 필요합니다."
    echo "Node.js 공식 다운로드 페이지를 브라우저로 엽니다..."
    if command -v open >/dev/null 2>&1; then
        open https://nodejs.org/
    elif command -v xdg-open >/dev/null 2>&1; then
        xdg-open https://nodejs.org/
    fi
    echo ""
    echo "Node.js(LTS 권장) 설치를 완료하신 후 다시 실행해 주세요."
    exit 1
fi

# 2. 최초 실행 시 필요한 패키지 자동 설치
if [ ! -d "node_modules" ]; then
    echo "[1/2] 최초 실행을 감지했습니다. 필요한 패키지를 자동으로 설치합니다..."
    echo "(네트워크 환경에 따라 약 30초~1분 정도 소요될 수 있습니다)"
    echo ""
    npm install
    if [ $? -ne 0 ]; then
        echo ""
        echo "[오류] 패키지 설치 중 문제가 발생했습니다. 인터넷 연결을 확인해 주세요."
        exit 1
    fi
    echo ""
    echo "[설치 완료] 패키지 설치가 성공적으로 완료되었습니다!"
    echo ""
fi

# 3. 브라우저 자동 실행 및 로컬 서버 가동
echo "[2/2] 3D 서책 로컬 서버를 실행합니다..."
echo ""
echo "* 브라우저 주소: http://localhost:3000"
echo "* 실행을 종료하시려면 터미널 창에서 [Ctrl + C]를 누르시면 됩니다."
echo ""

# 브라우저 자동 오픈 (백그라운드에서 2초 대기 후 실행)
(
    sleep 2
    if command -v open >/dev/null 2>&1; then
        open http://localhost:3000
    elif command -v xdg-open >/dev/null 2>&1; then
        xdg-open http://localhost:3000
    fi
) &

# 서버 시작
npm run dev
