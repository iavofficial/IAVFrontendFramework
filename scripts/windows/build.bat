rmdir /S /q lib
Xcopy src\assets lib\assets /i

npx tsc

if %errorlevel%==0 (
    npx babel src\components --out-dir lib\components --copy-files --extensions .ts,.tsx &^
    npx babel src\contexts --out-dir lib\contexts --copy-files --extensions .ts,.tsx &^
    npx babel src\links --out-dir lib --copy-files &&^
    npx tsc --p ./generate_decl_tsconfig.json
)