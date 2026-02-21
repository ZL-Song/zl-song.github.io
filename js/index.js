/* copyright (c) 2022 Zilin Song */

/* pub switcher in `index.html`. */

// pages to rotate through
const pages = ['pub_selected.html', 'pub_all.html'];
let idx = 0; // start with first file

/**
 * Switch to the next page in the sequence.
 */
function pubToggle() {
  idx = (idx + 1) % pages.length;
  loadPubContent(pages[idx]);
}

/**
 * Fetch and inject the requested HTML fragment.
 * @param {string} url - Relative path to the partial HTML file
 */
function loadPubContent(url) {
  fetch(url)
    .then(r => r.text())
    .then(html => {
      const container = document.getElementById('pubContent');
      container.innerHTML = html;
      fixExternalLinks(container);
    })
    .catch(err => {
      document.getElementById('pubContent').innerHTML =
        `<p>Failed to load ${url}</p>`;
    });
  // update toggle-button label to show *next* page name
  const nextName = pages[(idx + 1) % pages.length].replace('pub_', '').replace('.html', '');
  document.getElementById('pubToggle').textContent = `${nextName} publications`;
}

/* run after the DOM is ready */
window.addEventListener('DOMContentLoaded', () => loadPubContent(pages[idx]));