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

const basePath = '/iav-test';

const getNewestVersion = async () => {
    return await fetch("./version-list.md")
        .then(response => response.text())
        .then(data => {
            const versions = ["1.9.0", "1.8.0"]
            return versions[0];
        });
}

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
    generatePageNavigation();
}

const fetchData = async (path) => {
    const response = await fetch(path);
    return response.text();
}

document.addEventListener('DOMContentLoaded', async () => {
    const newestVersion = await getNewestVersion();
    document.getElementById('header-container').innerHTML = await fetchData(`${newestVersion}/pages/html/header.html`);
    document.getElementById('footer-container').innerHTML = await fetchData(`${newestVersion}/pages/html/imprint-footer.html`);
    document.getElementById('nav-placeholder').innerHTML = await fetchData(`${newestVersion}/pages/html/nav.html`);
    pushWindowState(`${basePath}/${newestVersion}/overview.html`)
    await loadInitial()
});

document.addEventListener('DOMContentLoaded', async function () {
    const currentVersion = await getNewestVersion();
    const data = await fetchData(`${currentVersion}/pages/html/nav.html`)
    document.getElementById('drawer').innerHTML = data;
    const currentPath = window.location.pathname.split('/').pop();
    const links = document.querySelectorAll('.drawer a');
    links.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
});

const loadInitial = async () => {
    const startUrl = "overview.html";
    const data = await fetchData(`${startUrl}`);
    document.getElementById('container').innerHTML = data;
    generatePageNavigation();
}

document.addEventListener('DOMContentLoaded', async () => {
    const currentVersion = await getNewestVersion();
    fetch(`${currentVersion}/pages/html/page-nav.html`)
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
});

function generatePageNavigation() {
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

const loadVersionDropdown = async () => {
    const versionResponse = await fetch("version-list.md");
    const versionText = await versionResponse.text();
    const versionDropdown = document.getElementById('versionDropdown');
    const versions = versionText.split('\n').filter(line => line.trim() !== '');
    versions.forEach(version => {
        const option = document.createElement('option');
        option.value = version;
        option.textContent = version;
        versionDropdown.appendChild(option);
    });
    versionDropdown.addEventListener('change', function () {
        const selectedVersion = this.value;
        navigate("overview.html", selectedVersion)
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    const currentVersion = await getNewestVersion();
    const response = await fetch(`${currentVersion}/pages/html/header.html`)
    document.getElementById('header-container').innerHTML = await response.text();
    await loadVersionDropdown();
});