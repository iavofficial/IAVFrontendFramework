document.addEventListener('DOMContentLoaded', () => {
    fetch('./pages/html/nav.html')
        .then(response => {
            return response.text()
        })
        .then(data => {
            document.getElementById('nav-placeholder').innerHTML = data;
        });
});

document.addEventListener('DOMContentLoaded', () => {
    fetch('./pages/html/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-container').innerHTML = data;
        });
});

document.addEventListener('DOMContentLoaded', () => {
    fetch('./pages/html/imprint-footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
        });
});

document.addEventListener('DOMContentLoaded', function () {
    fetch('./pages/html/nav.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('drawer').innerHTML = data;
            const currentPath = window.location.pathname.split('/').pop();
            const links = document.querySelectorAll('.drawer a');
            links.forEach(link => {
                if (link.getAttribute('href') === currentPath) {
                    link.classList.add('active');
                }
            });
        });
});

document.addEventListener('DOMContentLoaded', () => {
    fetch('./pages/html/page-nav.html')
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
