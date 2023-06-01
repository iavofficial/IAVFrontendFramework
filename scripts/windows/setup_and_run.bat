@echo off

rmdir /S /q build
mkdir build

echo [31m Beginning to install all dependencies, building the framework and running the example project. [37m

call npm install

echo [31m Finished installation for the framework. [37m

call npx babel ./src --out-dir ./build --extensions .ts,.tsx --copy-files 

call npx babel ./package.json --out-dir ./build --copy-files 

call npx tsc

echo [31m Finished building of the framework. [37m

call cd .\example

call npm install

echo [31m Finished installation of dependencies for the example project. [37m

call npm start