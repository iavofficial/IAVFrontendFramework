@echo off

if exist dist rmdir /S /Q dist
mkdir dist

call npx babel ./src --out-dir ./dist --extensions .ts,.tsx --copy-files
if errorlevel 1 exit /b %errorlevel%

call npx babel ./package.json --out-dir ./dist --copy-files
if errorlevel 1 exit /b %errorlevel%

call npx tsc --outDir ./dist
if errorlevel 1 exit /b %errorlevel%
