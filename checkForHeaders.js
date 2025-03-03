#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Define the expected copyright header.
// Adjust the string below to match your exact header (including newlines and whitespace).
const expectedHeader = `/**
 * Copyright © 2025 IAV GmbH Ingenieurgesellschaft Auto und Verkehr, All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */`;

// Allowed file extensions
const allowedExtensions = new Set(['.js', '.jsx', '.ts', '.tsx']);

/**
 * Checks if a file starts with the expected header.
 * @param {string} filePath - The full path to the file.
 * @returns {boolean} - True if the file starts with the header, false otherwise.
 */
function fileHasHeader(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return content.startsWith(expectedHeader);
  } catch (err) {
    console.error(`Error reading ${filePath}: ${err.message}`);
    // Consider a file with an error reading as missing header.
    return false;
  }
}

/**
 * Recursively traverses a directory and collects files that do not have the expected header.
 * @param {string} dir - The directory to traverse.
 * @param {string[]} missingFiles - Array to store file paths missing the header.
 */
function traverseDirectory(dir, missingFiles) {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const itemPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      traverseDirectory(itemPath, missingFiles);
    } else if (item.isFile()) {
      const ext = path.extname(item.name);
      if (allowedExtensions.has(ext)) {
        if (!fileHasHeader(itemPath)) {
          missingFiles.push(itemPath);
        }
      }
    }
  }
}

// The directory to check is taken from the command line arguments, or defaults to the current folder.
const directoryToCheck = process.argv[2] || '.';
const missingHeaderFiles = [];
traverseDirectory(directoryToCheck, missingHeaderFiles);

if (missingHeaderFiles.length > 0) {
  console.log('Files missing the required header:');
  missingHeaderFiles.forEach((filePath) => {
    // Convert to Windows-style paths if needed.
    console.log(filePath.split(path.sep).join('\\'));
  });
  process.exit(1);
} else {
  console.log('All files have the required header.');
}
