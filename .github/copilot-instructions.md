# Instructions for GitHub Copilot CLI in this repo

This repo holds dev-null content (games, plugins, shaders) that the
user authors locally and shares via raw GitHub URLs. Stay grounded in
the dev-null JavaScript surface and the surrounding workflow.

## Authoring

- The framework is documented at
  https://github.com/simonthoresen/dev-null/blob/main/API-REFERENCE.md
  and the workflow at
  https://github.com/simonthoresen/dev-null/blob/main/AUTHORING.md.
  Consult those when proposing API calls.
- The three `hello.*` files in `games/`, `plugins/`, and `shaders/` are
  the canonical starting points. When suggesting new content, mirror
  their structure (top-of-file `// what this exercises` block,
  ES5-compatible JS, no modules, no build step).
- Games are single `.js` files (or a folder with `main.js`). Plugins
  and shaders are always single `.js` files.

## Test rule

After modifying any `.js` under `games/`, `plugins/`, or `shaders/`,
suggest the user run `.\play.ps1` in the repo root to verify the
change locally before committing.

## URL-echo rule (after push)

After committing AND pushing any change under `games/`, `plugins/`, or
`shaders/`, derive each changed file's raw URL and print it on its own
line so the user can copy it.

URL pattern:
```
https://raw.githubusercontent.com/<owner>/<repo>/<branch>/<path>
```

Where:
- `<owner>/<repo>` comes from `git remote get-url origin`. Accept both
  `https://github.com/<owner>/<repo>(.git)?` and
  `git@github.com:<owner>/<repo>.git`.
- `<branch>` comes from `git symbolic-ref --short HEAD`.
- `<path>` is the path inside this repo (e.g.
  `games/hello.js`).

Optionally `curl -I --silent --output /dev/null --write-out "%{http_code}"`
the URL and confirm 200 before printing — but don't block on it; print
the URL even if the HEAD check fails.

After printing, mention that the user can hand this URL to any
dev-null server admin who can paste it into **File > Games > Add...**
(or Plugins / Shaders > Add) to load it on a live server.
