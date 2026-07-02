/* copyright (c) 2022 Zilin Song */

/* Assemble email addresses from split data attributes to deter scrapers. */
function assembleEmails() {
  document.querySelectorAll('[data-email-user][data-email-domain]').forEach(el => {
    const email = el.dataset.emailUser + '@' + el.dataset.emailDomain;
    const span = document.createElement('span');
    span.textContent = email;
    el.appendChild(span);
  });
}


/* foldable card display */
function initFoldableCards() {
  document.querySelectorAll('.card-header').forEach(h3 => {
    h3.addEventListener('click', () => {
      const body = h3.nextElementSibling;
      if (!body) return;
      if (body.classList.contains('open')) {
        body.style.maxHeight = '0px';
        body.classList.remove('open');
      } else {
        body.style.maxHeight = body.scrollHeight + 'px';
        body.classList.add('open');
      }
    });
  });
}


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
 * @param {string} hid - html id of the host control
 * @param {string} url - Relative path to the partial HTML file.
*/
function displayPubs(hid, url) {
  const box = document.getElementById(hid);
  // 1. instantly hide (no animation needed).
  box.style.transition = 'none';
  box.style.opacity = 0;
  // 2. next frame – restore transition.
  requestAnimationFrame(() => {
    box.style.transition = 'opacity 0.4s ease';
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

function displayPubsSel() {displayPubs("pubs-content", "htmls/pubs_sel.html"); }
function displayPubsAll() {displayPubs("pubs-content", "htmls/pubs_all.html"); }


// run on first paint
document.addEventListener('DOMContentLoaded', () => {
  displayPubs("pubs-content", "htmls/pubs_sel.html")
  displayPubs("news-content", "htmls/news.html")
  initFoldableCards();
  assembleEmails();
});