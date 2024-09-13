function searchHeadings() {
  // Get the search input value
  let input = document.getElementById('searchInput').value.toLowerCase();

  // Get all headings (h1, h2, h3)
  let headings = document.querySelectorAll('h1, h2, h3');

  // Loop through all headings and check if they match the input
  headings.forEach(function (heading) {
    // Remove previous highlights
    heading.classList.remove('highlight');

    // If the heading contains the search term, highlight it
    if (heading.innerText.toLowerCase().includes(input)) {
      heading.classList.add('highlight');
      heading.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
}

function clearSearch() {
  // Clear the search input and remove highlights
  document.getElementById('searchInput').value = '';
  let headings = document.querySelectorAll('h1, h2, h3');
  headings.forEach(function (heading) {
    heading.classList.remove('highlight');
  });
}
