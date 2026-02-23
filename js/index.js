/* copyright (c) 2022 Zilin Song */

/* pub switcher in `index.html`. */
// pages to rotate through
const pubContents = ['pub_selected.html', 'pub_all.html'];
let idx = 0; // start with first file

/** Switch to the next page in the sequence.*/
function researchPubToggle() {
  idx = (idx + 1) % pubContents.length; 
  researchLoadPubContent(pubContents[idx]); 
}

/**Fetch and inject the requested HTML fragment.
 * @param {string} url - Relative path to the partial HTML file
 */
function researchLoadPubContent(url) {
  const container = document.getElementById('pubContent'); 
  fetch(url).then(r => r.text())
  .then(html => {container.innerHTML = html; fixExternalLinks(container); })
  .catch(err => {container.innerHTML = `<p>Failed to load ${url}</p>`;});
  // update toggle label to show *next* page name
  const nextName = pubContents[(idx + 1) % pubContents.length].replace('pub_', '').replace('.html', '');
  document.getElementById('pubToggle').textContent = `${nextName} publications`;
}

/* run after the DOM is ready */
window.addEventListener('DOMContentLoaded', () => researchLoadPubContent(pubContents[idx]));