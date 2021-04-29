rmdir /S /q lib

start /b npx babel ./src/lib --out-dir ./lib/lib --extensions .ts,.tsx --watch --copy-files
start /b npx babel ./src/links --out-dir ./lib --extensions .ts,.tsx --watch --copy-files
start /b npx tsc --watch