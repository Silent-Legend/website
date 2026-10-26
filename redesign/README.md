# Silent Legend redesign preview

This directory contains an isolated, buildless redesign preview. It intentionally references optimized media already tracked in the parent website repository.

- The production homepage at `/index.html` is not replaced or imported here.
- Preview metadata is `noindex, nofollow, noarchive` while the work is unfinished.
- The full portfolio remains available through links to the current site.
- Do not copy or stage untracked source/master imagery for this preview.

Local preview from the repository root:

```powershell
python -m http.server 8765 --bind 127.0.0.1
```

Then open `http://127.0.0.1:8765/redesign/`.
