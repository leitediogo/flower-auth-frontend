@echo off
echo on
cd..\..\flower-in-memory-backend\utils
call "cmd /c start backend-running.cmd"
pause
cd..\..\flower-auth-frontend\utils
call "cmd /c start frontend-running.cmd"