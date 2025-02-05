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

let basePath = '/IAVFrontendFramework';

document.addEventListener('DOMContentLoaded', async () => {
    const newestVersion = await getNewestVersion();
    const response = await fetch(`${basePath}/${newestVersion}/index.html`)
    const indexHTML = await response.text();
    document.open();
    document.write(indexHTML);
    document.close();
    document.getElementById('header-container').innerHTML = await fetchData(`${basePath}/${newestVersion}/pages/html/header.html`);
    document.getElementById('footer-container').innerHTML = await fetchData(`${basePath}/${newestVersion}/pages/html/imprint-footer.html`);
    document.getElementById('nav-placeholder').innerHTML = await fetchData(`${basePath}/${newestVersion}/pages/html/nav.html`);
    let fileName = extractFileNameFromURL(window.location.href)
    if (fileName === "index.html") {
        fileName = "overview.html"
        pushWindowState(`${basePath}/${newestVersion}/${fileName}`)
        await loadPage(fileName)
    }
    await loadVersionDropdown(window.location.href);
    await loadPage(fileName)
    await loadPageNav();
    await loadVersionBanner();
});

const getOptionalVersionList = async () => {
    const response = await fetch("../version-list.md");
    if (response.ok) {
        const data = await response.text();
        const versions = data.trim().split('\n');
        return versions[versions.length - 1];
    } else {
        return "docs";
    }
};

const getNewestVersion = async () => {
    return await getOptionalVersionList();
};

const getSelectedVersion = () => {
    const versionDropdown = document.getElementById('versionDropdown');
    return versionDropdown.value;
}

const pushWindowState = (path) => {
    window.history.pushState({}, '', path);
}

const navigate = async (url, version = null) => {
    const currentVersion = version || await getSelectedVersion();
    const expectedPath = `${basePath}/${currentVersion}/${url}`;
    const currentPath = window.location.pathname;
    if (currentPath !== expectedPath) {
        window.history.pushState({}, '', expectedPath);
    }
    document.getElementById('container').innerHTML = await fetchData(expectedPath);
    createPageNavigation();
}

const fetchData = async (path) => {
    const response = await fetch(path);
    return response.text();
}

const extractFileNameFromURL = (url) => {
    const urlObj = new URL(url);
    const pathSegments = urlObj.pathname.split('/');
    return pathSegments[pathSegments.length - 1];
}

const extractVersionFromURL = (url) => {
    const urlObj = new URL(url);
    const pathSegments = urlObj.pathname.split('/');
    return pathSegments[pathSegments.length - 2];
}


const loadPage = async (url) => {
    document.getElementById('container').innerHTML = await fetchData(`${url}`);
}

const loadPageNav = async () => {
    const version = getSelectedVersion();
    fetch(`${basePath}/${version}/pages/html/page-nav.html`)
        .then(response => response.text())
        .then(data => {
            document.getElementById('page-placeholder').innerHTML = data;
            const navList = document.getElementById('nav-list');
            const headers = document.querySelectorAll('h1, h2');
            headers.forEach(header => {
                const listItem = document.createElement('li');
                listItem.classList.add(header.tagName.toLowerCase());
                const link = document.createElement('a');
                link.textContent = header.textContent;
                link.href = `#${header.id || header.textContent.replace(/\s+/g, '-').toLowerCase()}`;
                listItem.appendChild(link);
                navList.appendChild(listItem);
            });
        });
}

const createPageNavigation = () => {
    document.getElementById('nav-list').innerHTML = '';
    const container = document.getElementById('container');
    const pagePlaceholder = document.getElementById('nav-list');
    const navList = document.createElement('ul');
    const headers = container.querySelectorAll('h1, h2');
    headers.forEach((header) => {
        const listItem = document.createElement('li');
        listItem.classList.add(header.tagName.toLowerCase());
        const link = document.createElement('a');
        link.textContent = header.textContent;
        link.href = `#${header.id || header.textContent.replace(/\s+/g, '-').toLowerCase()}`;
        listItem.appendChild(link);
        navList.appendChild(listItem);
    });
    pagePlaceholder.appendChild(navList);
}

const loadVersionDropdown = async (url) => {
    const versionDropdown = document.getElementById('versionDropdown');
    const versionResponse = await fetch("../version-list.md");
    if (versionResponse.ok) {
        const currentVersion = extractVersionFromURL(url);
        const versionText = await versionResponse.text();
        const versions = versionText.split('\n')
            .map(line => line.trim())
            .filter(line => line !== '' && line !== currentVersion)
            .reverse();
        versions.unshift(currentVersion);
        versions.forEach(version => {
            const option = document.createElement('option');
            option.value = version;
            option.textContent = version;
            versionDropdown.appendChild(option);
        });
    } else {
        const version = "docs"
        const option = document.createElement('option');
        option.value = version;
        option.textContent = version;
        versionDropdown.appendChild(option);
    }
    versionDropdown.addEventListener('change', () => {
        const selectedVersion = this.value;
        navigate(extractFileNameFromURL(window.location.href), selectedVersion);
        loadVersionBanner()
    });
}

const loadVersionBanner = async () => {
    const versionBanner = document.getElementById('versionBanner');
    const newestVersion = await getNewestVersion();
    const selectedVersion = await getSelectedVersion();
    if (newestVersion !== selectedVersion) {
        versionBanner.innerHTML = `
            <div class="version-banner">
                Version ${newestVersion} is out now!
            </div>
        `;
    } else {
        versionBanner.innerHTML = "";
    }
};
