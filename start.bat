@echo off
title Pentalyze 3D Book Launcher

echo ===================================================
echo   Pentalyze : 3D Interactive Book Launcher
echo ===================================================
echo.

REM 1. Node.js & npm check
where node >nul 2>nul
if %errorlevel% neq 0 goto :NO_NODE

where npm >nul 2>nul
if %errorlevel% neq 0 goto :NO_NODE

REM 2. Install dependencies on first run
if not exist "node_modules\" (
    echo [1/2] Installing required packages...
    echo       First-time setup may take 30-60 seconds.
    echo.
    call npm install
    if %errorlevel% neq 0 (
        echo.
        echo [ERROR] Package installation failed. Please check internet connection.
        pause
        exit /b
    )
    echo.
    echo [OK] Packages installed successfully!
    echo.
)

REM 3. Launch browser and start dev server
echo [2/2] Starting 3D Book Server...
echo.
echo * Web Address: http://localhost:3000
echo * Press [Ctrl + C] in this window to stop the server.
echo.

start http://localhost:3000
call npm run dev

pause
exit /b

:NO_NODE
echo.
echo [ERROR] Node.js is not installed on this PC.
echo [알림] 현재 PC에 Node.js가 설치되어 있지 않습니다.
echo.
echo Opening Node.js download page (https://nodejs.org)...
echo 웹 브라우저에서 Node.js 공식 다운로드 페이지를 엽니다...
start https://nodejs.org/
echo.
echo Please install Node.js (LTS version recommended),
echo then double-click start.bat again!
echo.
echo Node.js 설치를 완료하신 후 start.bat을 다시 실행해 주세요.
echo.
pause
exit /b
