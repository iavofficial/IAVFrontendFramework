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

rmdir /S /q build
mkdir build

start /b npx babel ./src --out-dir ./build/build --extensions .ts,.tsx --watch --copy-files

start /b npx babel ./package.json --out-dir ./build --watch --copy-files

start /b npx tsc --watch --outDir ./build/build