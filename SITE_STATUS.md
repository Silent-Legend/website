# SITE_STATUS.md

State-of-the-repo report for an external AI advisor. Generated Jul 5, 2026. Regenerate on request.
Scope: root `index.html` (the deployed page). The `.claude/worktrees/` copy is ignored.

## Page structure (`index.html`, section order + line numbers)

| Line | Element | Notes |
|------|---------|-------|
| 67 | `<header id="header">` | Logo + nav + hamburger |
| 86 | `<nav id="menu-container">` | Mobile menu overlay |
| 99 | `<section id="hero">` | Logo + "DESIGN re-IMAGINED" |
| 110 | `<section id="services">` | 4 service cards (VFX, Web, Photo, AI Art) |
| 206–387 | `#services-visual-effects` / `-web-design` / `-photography` / `-ai-art` | Expandable service detail panels |
| 392 | `<section id="featured-work">` | YouTube documentary embed (external) |
| 415 | `<section id="parallax-quote">` | Lou Danziger quote |
| 432 | `<section id="about">` | Bio copy (final) |
| 448 | `<section id="portfolio">` | Filters + grid (16 articles) |
| 795 | `<section id="portfolio-detail">` | Hidden detail view template |
| 883 | `<div id="project-details-modal">` | Hidden modal template |
| 961 | `<section id="contact">` | Contact form |
| 1003 | `<footer id="footer">` | Footer |
| 1030 | `<div id="lightbox">` | Hidden lightbox template |

## Portfolio inventory (16 `<article>`s wired in the grid)

Copy = **final** (bespoke objective/process) vs **placeholder** (generic boilerplate + fake client). All image paths below resolve on disk.

| # | Line | Title | Filter class | Image path | Copy |
|---|------|-------|--------------|------------|------|
| 1 | 496 | EXPLOSION COMPOSITE | `visual-effects` | Visual_Effects/Explosion.jpg | placeholder |
| 2 | 514 | DIGITAL IRIS | `motion-graphics` | Motion_Graphics/Digital_Iris.jpg | placeholder |
| 3 | 532 | KATE WINSLET | `graphic-design` | Graphic_Design/KW Typographic Portrait.png | **final** |
| 4 | 553 | MILITARY COMPOSITE | `retouching-and-restoration` | Retouching_and_Restoration/Soldier.jpg | placeholder |
| 5 | 571 | STUDIO RETOUCH | `retouching-and-restoration` | Retouching_and_Restoration/retouch-studio-after.webp | placeholder (before/after wired) |
| 6 | 591 | ROYALTY | `ai-art-and-prompt-design` | AI_Art_and_Prompt_Design/Royalty.webp | placeholder |
| 7 | 607 | DUAL-TONE COMPOSITION | `ai-art-and-prompt-design` | AI_Art_and_Prompt_Design/Split.webp | placeholder |
| 8 | 625 | DRONE EMBASSY VIEW | `photography` | Photography/Drone_Embassy.jpeg | placeholder |
| 9 | 643 | SNOWY CABIN LANDSCAPE | `photography` | Photography/Snowy_Cabin.jpeg | placeholder |
| 10 | 661 | A PRIDE OF LIONS | `graphic-design` | Graphic_Design/A_Pride_Of_Lions.png | placeholder |
| 11 | 679 | BAROQUE POSTCARD — BERNINI EXHIBITION | `graphic-design` | Graphic_Design/Baroque/baroque-postcard-cover.webp | restored (+2-img gallery) |
| 12 | 698 | ASTON MARTIN | `graphic-design` | Graphic_Design/GQ_Aston_Martin.png | **final** |
| 13 | 718 | NADIA COMANECI | `graphic-design` | Graphic_Design/Nadia Comaneci shattered 3.png | **final** |
| 14 | 738 | ART EXHIBIT | `graphic-design` | Graphic_Design/Art_Exhibit.png | placeholder |
| 15 | 756 | DFW GAMES | `branding-and-identity` | Branding_and_Identity/DFW_Logo/dfw-games-final-silhouette-red.webp | restored (+5-img gallery) |
| 16 | 775 | SAMURAI ARTWORK | `ai-art-and-prompt-design` | AI_Art_and_Prompt_Design/samurai_original.webp | placeholder |

Multi-image galleries (`data-detail-images`): #3 Kate Winslet (7 imgs), #11 Baroque (2), #15 DFW (5). All those paths exist on disk.
Note: filter button `.motion-graphics` exists but only 1 item uses it; `.motion-graphics` has no dedicated filter distinct issue.

## Pending assets (on disk under `images/Portfolio/`, NOT referenced by any HTML)

Staged-but-unwired originals/extras:
- **Web_Design/** (entire folder, all untracked): `Bruce_Hero.png`, `Tolkien_Hero.png`, `Tolkien_Composite.jpg`, `Tolkien_Mobile.png`, `Tolkien_Timeline_Hero.png` — no `web-design` filter or articles exist yet.
- **Graphic_Design/** untracked: `DUO menu.png` (10.6MB), `G.SPELL 3.png` (10.2MB), `God Spell/G.SPELL 1.png`, `God Spell/G.SPELL.png`.
- **AI_Art_and_Prompt_Design/New folder/** (6 source files): `Dragon.png/.jpeg`, `Royalty.png`, `Split.png/.jpeg`, `samurai_original.jpg`.
- **AI_Art_and_Prompt_Design/**: `Dragon.webp` + `Dragon_thumbnail.webp` (no Dragon article in root; only in worktree copy).
- **Photography/** unwired: `Alley.jpeg` (8.1MB), `Door.jpeg`, `Sattelite_View.jpg` (6.9MB, misspelled), `Street_Level.jpeg` (14.9MB).
- **Visual_Effects/**: `Fighter_Jet.jpeg` (unwired in root; used only in worktree).
- `Retouching_and_Restoration/retouch-studio-after.png` (**37.1MB**) — superseded by the `.webp` that is actually wired.
- Remaining `*_thumbnail.webp` files (Royalty, Split, samurai, Dragon, retouch-before): **not referenced** — `main.js` builds thumbnails from the full images, not from these files.

## Known issues

- **Oversized referenced images (>5MB) — will hurt load/LCP:** `Art_Exhibit.png` (18.1MB), `Snowy_Cabin.jpeg` (9.1MB), `KW Final.png` (7.9MB, gallery), `Explosion.jpg` (7.0MB), `Drone_Embassy.jpeg` (6.8MB), `retouch-studio-before.jpg` (5.3MB, gallery).
- **Oversized unreferenced junk on disk:** `retouch-studio-after.png` (37.1MB), `Street_Level.jpeg` (14.9MB), `DUO menu.png`, `G.SPELL 3.png`, `Alley.jpeg`, plus 5–6MB PNGs in `New folder/`. Safe to delete/exclude to shrink repo.
- **Filenames with spaces/periods** (wired, so risky if paths are ever URL-encoded): `KW Typographic Portrait.png`, `Nadia Comaneci shattered 3.png`, all `KW *.png` variants. Untracked ones add periods: `G.SPELL 3.png`, `G.SPELL.png`. Directories with spaces: `New folder/`, `God Spell/`.
- **Misspelled asset:** `Photography/Sattelite_View.jpg` ("Sattelite" → "Satellite"); currently unwired so harmless.
- **Orphaned pages/JS:**
  - `services.html` — not linked from `index.html`; references `assets/js/services.js` which **does not exist**, and uses a `via.placeholder.com` image for AI Art.
  - `test.html` (root) and `assets/css/test.html` — stray test files, unlinked.
- **Duplicate tree:** `.claude/worktrees/laughing-shirley-2e41a4/` is a full second copy of the site (git worktree). Not deployed, but inflates greps/repo.

## Deploy readiness (GitHub Pages)

- **Absolute paths (⚠ project-site breaker):** `index.html` lines 22 & 29 use `content="/images/Hero/logo.png"` (og:image + twitter:image). A leading `/` resolves to the domain root. Fine on a custom domain (silentlegend.com) or user/org root site; **404s on a `user.github.io/repo` project site.** All other asset paths are relative (safe).
- **Case-sensitivity:** No mismatches found — every `src`/`data-detail-*` path in root `index.html` matches on-disk casing exactly (GitHub Pages is case-sensitive; local Windows is not, so re-verify after any rename).
- **Missing files referenced in HTML:** None in `index.html` (all 22 portfolio/service image paths resolve). Missing: `assets/js/services.js` (referenced by orphan `services.html` only).
- **External deps:** Font Awesome (cdnjs, SRI-pinned), Google Fonts, YouTube thumbnail/embed — all require network; fine on Pages.
- **Manifest:** loaded conditionally (skips `file://`) — `images/Fav/site.webmanifest` should exist for production.

## Uncommitted changes (`git status`, branch `main`)

Modified (tracked):
- `assets/css/styles.css`
- `index.html`
- `images/Portfolio/portfolio-report.txt`

Untracked:
- `.claude/` (worktrees + local agent data — consider `.gitignore`)
- `images/Portfolio/Graphic_Design/DUO menu.png`
- `images/Portfolio/Graphic_Design/G.SPELL 3.png`
- `images/Portfolio/Graphic_Design/God Spell/` (2 files)
- `images/Portfolio/Web_Design/` (5 files)
