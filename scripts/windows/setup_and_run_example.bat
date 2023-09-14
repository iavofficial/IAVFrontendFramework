@echo off

echo [31mRemoving the old build folder if it exists. [37m
rmdir /S /q build

echo [31mCreating the new build folder. [37m
mkdir build

echo [31mBeginning to install all dependencies of the framework. [37m

call npm install

echo [31mBeginning to build the framework. [37m

call npx babel ./src --out-dir ./build/build --extensions .ts,.tsx --copy-files

call npx babel ./package.json --out-dir ./build --copy-files

call npx tsc --outDir ./build/build

echo [31mBeginning to install all dependencies of the example project. [37m

call cd .\example

call npm install

echo [31mLaunching the example project. [37m

call npm run dev