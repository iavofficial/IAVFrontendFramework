rem Copyright © 2024 IAV GmbH Ingenieurgesellschaft Auto und Verkehr, All Rights Reserved.
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

rmdir /S /q dist
mkdir dist

rem Using this expression to start the asynchronous tasks after package installation.

call npm i && (
start /b npx babel ./src --out-dir ./dist --extensions .ts,.tsx --watch --copy-files
start /b npx babel ./package.json --out-dir ./dist --watch --copy-files
start /b npx tsc --watch --outDir ./dist
)