/**
 * Copyright © 2024 IAV GmbH Ingenieurgesellschaft Auto und Verkehr, All Rights Reserved.
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
    const newestVersion = await getNewestVersion();
    if (newestVersion) {
        window.location.href = `/IAVFrontendFramework/${newestVersion}/index.html`;
    }
});