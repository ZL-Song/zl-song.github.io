/* copyright (c) 2022 Zilin Song */


/**
 * Fix all <a> tags with `doi` attr. such that the `href` attr. opens the `https://doi` links.
 * @param {Document} [root=document] - The root contains the <a> tags. Defaults: the whole document.
 */
function fixDOIlinks(root = document) {
  root.querySelectorAll('a[doi]')
    .forEach(a => {
      const doi = a.getAttribute('doi').trim();
      if (doi) {
        a.href = `https://doi.org/${doi}`;
      }
    });
}

/**
 * Fix all <a> tags such that the `http` and `https` links are opened in a new tab.
 * @param {Document} [root=document] - The root contains the <a> tags. Defaults: the whole document.
 */
function fixExternalLinks(root = document) {
  fixDOIlinks(root)
  root.querySelectorAll('a[href^="http://"], a[href^="https://"]')
    .forEach(a => {
      if (a.hostname !== location.hostname) {   // optional: skip same-origin (on this site).
        a.target = '_blank';
        a.rel    = 'noopener noreferrer';
      }
    });
}

// run on first paint
document.addEventListener('DOMContentLoaded', () => fixExternalLinks());