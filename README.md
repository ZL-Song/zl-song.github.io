# zl-song.github.io

Personal academic homepage hosted on GitHub Pages.

🔗 **Live site**: [http://zl-song.github.io](http://zl-song.github.io)

## Overview

A lightweight, dependency-free static academic profile page. No build tools, no frameworks, no external CDNs — just plain HTML, CSS, and vanilla JavaScript.

## Features

- Clean, minimal academic layout
- Protected email address (assembled by JavaScript to deter scrapers)
- Foldable research cards
- Tab switcher for Selected / Published works
- Scrollable "What's New" section
- DOI links resolved automatically via `fixlinks.js`
- External links open in a new tab with `noopener noreferrer`

## Project structure

```
.
├── index.html        # Main profile page
├── htmls/
│   ├── pubs_sel.html     # Selected publications fragment
│   └── pubs_all.html # Full publications fragment
├── js/
│   ├── fixlinks.js   # DOI / external link helpers
│   └── index.js      # Foldable cards, tab switcher, email assembly
├── res/
│   └── style.css     # Stylesheet
├── LICENSE           # MIT License
└── README.md         # This file
```

## Deployment

The site is deployed automatically by GitHub Pages from the `main` branch. Pushing changes to `main` updates the live site.

## License

MIT License. See [LICENSE](LICENSE) for details.
