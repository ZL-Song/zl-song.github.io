/* copyright (c) 2022 Zilin Song */

/* page switchers in `index.html`. */

/** Fetch and inject the HTML fragment.
 * @param {string} url - Relative path to the partial HTML file
*/
function displayContent(url) {
  const container = document.getElementById('mainContent');
  fetch(url).then(r => r.text())
  .then(html => {container.innerHTML = html; fixExternalLinks(container); })
  .catch(err => {container.innerHTML = `<p>Failed to load ${url}</p>`;});
}

function displayResr() {displayContent("page_resr.html"); }
function displayPubs() {displayContent("page_pubs.html"); }
function displayNews() {displayContent("page_news.html"); }

// initial display
window.addEventListener('DOMContentLoaded', () => displayContent(url="page_resr.html"));