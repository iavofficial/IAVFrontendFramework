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

const getDirName = () => {
    const parts = window.location.pathname.split('/');
    const index = parts.indexOf('packages');
    return index !== -1 && parts.length > index + 1 ? parts[index + 1] : null;
};

const basePath = `/IAVFrontendFramework/packages/${getDirName()}`;
const localVersion = "docs-version";

document.addEventListener('DOMContentLoaded', async () => {
    const newestVersion = await getOptionalVersionList();
    const path = `${basePath}/${newestVersion}/index.html`;
    pushWindowState(path);
});

const getOptionalVersionList = async () => {
    const response = await fetch("./version-list.md");
    if (response.ok) {
        const data = await response.text();
        const versions = data.trim().split('\n');
        return versions[versions.length - 1];
    } else {
        return localVersion;
    }
};

const pushWindowState = (path) => {
    const newUrl = new URL(path, window.location.origin);
    window.location.href = newUrl.pathname + newUrl.search;
};
