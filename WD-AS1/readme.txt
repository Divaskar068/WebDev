GameForge Marketplace - Assignment 1

Run instructions:
1) Open terminal in this folder:
   /Users/divaskararulmozhi/VScode/WebDev/WD-AS1
2) Start a local server (choose one):
   - python3 -m http.server 8000
   - php -S localhost:8000
3) Open in browser:
   http://localhost:8000

Notes for marker:
- Data is loaded dynamically from artifacts.json via XMLHttpRequest in script.js.
- No external frameworks or libraries are used.
- Features implemented:
  * Dynamic card rendering from JSON
  * Category filter (All Categories + Quantum Mods fake option)
  * Search highlight on visible cards only (case-insensitive, partial match)
  * Simple cart count via Add to Cart (+1 per click)
  * Reset Cart with confirmation dialog
  * Dark mode toggle
  * Responsive layout using CSS Grid/Flex with media query
- Edge-case handling:
  * Missing thumbnail -> fallback placeholder image
  * Missing rating -> N/A
  * Missing/blank category -> Uncategorized
  * No search matches -> "No matches found."
  * Empty filtered category -> "No artifacts in this category."
