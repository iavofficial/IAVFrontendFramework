@echo off

echo [31mRemoving the old build folder if it exists. [37m
rmdir /S /q build

echo [31mCreating the new build folder. [37m
mkdir build

echo [31mBeginning to install all dependencies, building the framework and running the example project. [37m

call npm install

echo [31mFinished installation for the framework. [37m

call npx babel ./src --out-dir ./build --extensions .ts,.tsx,.js --copy-files

call npx babel ./package.json --out-dir ./build --copy-files

call npx tsc

echo [31mFinished building of the framework. [37m

call cd .\example

call npm install

echo [31mFinished installation of dependencies for the example project. [37m

call npm run dev