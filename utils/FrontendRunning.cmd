@echo off
echo Batch script for running Frontend
cd /d C:\Projects\flower-auth-frontend
echo on
git pull
call npm install
call npm start