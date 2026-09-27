@echo off
chcp 65001 >nul
title Pentalyze (다섯결) - 원클릭 서책 실행기

echo ===================================================
echo   📖 Pentalyze : 다섯결 3D 인터랙티브 서책 실행기
echo ===================================================
echo.

:: 1. Node.js 설치 여부 확인
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [알림] Node.js가 설치되어 있지 않습니다.
    echo 웹 서책을 로컬에서 실행하려면 Node.js가 필요합니다.
    echo Node.js 공식 다운로드 페이지를 엽니다...
    start https://nodejs.org/
    echo.
    echo Node.js(LTS 권장) 설치를 완료하신 후, 이 실행 파일(start.bat)을 다시 더블 클릭해 주세요.
    echo.
    pause
    exit /b
)

:: 2. 최초 실행 시 필요한 패키지 자동 설치
if not exist "node_modules\" (
    echo [1/2] 최초 실행을 감지했습니다. 필요한 패키지를 자동으로 설치합니다...
    echo (네트워크 환경에 따라 약 30초~1분 정도 소요될 수 있습니다)
    echo.
    call npm install
    if %errorlevel% neq 0 (
        echo.
        echo [오류] 패키지 설치 중 문제가 발생했습니다. 인터넷 연결을 확인해 주세요.
        pause
        exit /b
    )
    echo.
    echo [설치 완료] 패키지 설치가 성공적으로 완료되었습니다!
    echo.
)

:: 3. 브라우저 자동 실행 및 로컬 서버 가동
echo [2/2] 3D 서책 로컬 서버를 실행합니다...
echo.
echo * 브라우저 주소: http://localhost:3000
echo * 실행을 종료하시려면 이 창에서 [Ctrl + C]를 누르시면 됩니다.
echo.

:: 브라우저를 2초 후 자동으로 열도록 백그라운드 호출
start "" timeout /t 2 /nobreak >nul & start http://localhost:3000

:: 서버 시작 (tsx server.ts)
call npm run dev

pause
