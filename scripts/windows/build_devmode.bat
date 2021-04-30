rmdir /S /q build

start /b npx babel ./src/lib --out-dir ./build/lib --extensions .ts,.tsx --watch --copy-files
start /b npx babel ./src/links --out-dir ./build --extensions .ts,.tsx --watch --copy-files
start /b npx tsc --watch