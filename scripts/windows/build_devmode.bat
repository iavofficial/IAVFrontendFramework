rmdir /S /q build

start /b npx babel ./src/build --out-dir ./build/build --extensions .ts,.tsx --watch --copy-files
start /b npx babel ./src/links --out-dir ./build --extensions .ts,.tsx --watch --copy-files
start /b npx tsc --watch