function loadNav() {
  fetch('./pages/html/nav.html')
    .then(response => {
      return response.text()
    })
    .then(data => {
      document.getElementById('nav-placeholder').innerHTML = data;
    });
}

document.addEventListener('DOMContentLoaded', loadNav);

function toggleDrawer() {
  const drawer = document.getElementById('drawer');
  if (drawer) {
    drawer.classList.toggle('open');
  }
}