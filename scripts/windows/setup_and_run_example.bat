rem Copyright © 2025 IAV GmbH Ingenieurgesellschaft Auto und Verkehr, All Rights Reserved.
rem 
rem Licensed under the Apache License, Version 2.0 (the "License");
rem you may not use this file except in compliance with the License.
rem You may obtain a copy of the License at
rem 
rem http://www.apache.org/licenses/LICENSE-2.0
rem 
rem Unless required by applicable law or agreed to in writing, software
rem distributed under the License is distributed on an "AS IS" BASIS,
rem WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
rem See the License for the specific language governing permissions and
rem limitations under the License.
rem 
rem SPDX-License-Identifier: Apache-2.0

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