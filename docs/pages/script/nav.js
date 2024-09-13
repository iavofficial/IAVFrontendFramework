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
