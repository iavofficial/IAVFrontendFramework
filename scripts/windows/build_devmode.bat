rmdir /S /q build
mkdir build

start /b npx babel ./src/lib --out-dir ./build/lib --extensions .ts,.tsx --watch --copy-files
start /b npx babel ./src/links --out-dir ./build --extensions .ts,.tsx --watch --copy-files

REM The package.json file is copied only once.
copy ./package.json ./build

start /b npx babel ./package.json --out-dir ./build --extensions .ts,.tsx --watch --copy-files

start /b npx tsc --watch