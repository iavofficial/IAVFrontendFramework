/**
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
 */

document.addEventListener('DOMContentLoaded', async () => {
    const getNewestVersion = async () => {
        return await fetch("./version-list.md")
            .then(response => response.text())
            .then(data => {
                const versions = data.trim().split('\n');
                return versions[versions.length - 1];
            })
    };
    const compareVersions = (v1, v2) => {
        const parts1 = v1.split('.').map(Number);
        const parts2 = v2.split('.').map(Number);
        for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
            const diff = (parts1[i] || 0) - (parts2[i] || 0);
            if (diff !== 0) return diff;
        }
        return 0;
    }
    const newestVersion = await getNewestVersion();
    if (compareVersions(newestVersion, '1.4.0') >= 0) {
        window.location.reload();
    } else if (newestVersion) {
        window.location.href = `/IAVFrontendFramework/${newestVersion}/index.html`;
    }
});