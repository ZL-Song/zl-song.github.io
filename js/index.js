/* copyright (c) 2022 Zilin Song */

/* content switchers in `index.html`. */

function activateTab(clickedBtn) {
  // 1. If already the active bottom, do nothing.
  if (clickedBtn.classList.contains('active')) { return false; }
  // 2. Set all bottoms to `inactive`.
  const bar = clickedBtn.closest('.tab-bar');
  bar.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  // 3. Set the clicked bottom to active.
  clickedBtn.classList.add('active');
  return true;   // state changed.
}

/** Fetch and inject the HTML fragment.
 * @param {string} url - Relative path to the partial HTML file.
*/
function displayContent(url) {
  const box = document.getElementById('mainContent');
  // 1. instantly hide (no animation needed).
  box.style.transition = 'none';
  box.style.opacity = 0;
  // 2. next frame – restore transition.
  requestAnimationFrame(() => {
    box.style.transition = 'opacity .15s ease-in';
    fetch(url)
      .then(r => r.text())
      .then(html => {
        box.innerHTML = html; 
        fixExternalLinks(box);
        // 3. following frame – start fade-in.
        requestAnimationFrame(() => box.style.opacity = 1); })
      .catch(err => {
        box.innerHTML = `<p>Failed to load ${url}</p>`;
        box.style.opacity = 1; });
  });
}

function displayResr() {displayContent("page_resr.html"); }
function displayPubs() {displayContent("page_pubs.html"); }
function displayNews() {displayContent("page_news.html"); }

// initial display
window.addEventListener('DOMContentLoaded', () => displayContent(url="page_resr.html"));