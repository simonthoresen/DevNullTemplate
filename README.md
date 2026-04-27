# my dev-null content

This repo was created from the
[dev-null-starter](https://github.com/simonthoresen/dev-null-starter)
template. It holds your authored games, plugins, and shaders for the
[dev-null](https://github.com/simonthoresen/dev-null) framework.

## Test locally

```powershell
.\play.ps1
```

This launches a local dev-null server pointed at this folder and opens
the GUI client. Your `games\`, `plugins\`, and `shaders\` show up in
the relevant sub-menus under a `── Create ──` section.

If dev-null isn't installed yet, `play.ps1` runs the upstream installer
first.

## Push and share

After committing and pushing, each `.js` file is live at:

```
https://raw.githubusercontent.com/<owner>/<repo>/<branch>/<path>
```

If you're using GitHub Copilot CLI with the included
`.github/copilot-instructions.md`, it computes and prints those URLs
after each push. Otherwise:

```powershell
.\print-raw-urls.ps1
```

Hand any of those URLs to the admin of a dev-null server. They paste it
into **File > Games > Add...** (or Plugins / Shaders > Add) and click
Load. GitHub `blob/` URLs also work — they're auto-converted to raw.

## Examples

Three working examples ship in `games\`, `plugins\`, and `shaders\`.
Open them and read the comments — that's the canonical reference.
The full JavaScript surface is documented at
[API-REFERENCE.md](https://github.com/simonthoresen/dev-null/blob/main/API-REFERENCE.md);
the end-to-end author workflow at
[AUTHORING.md](https://github.com/simonthoresen/dev-null/blob/main/AUTHORING.md).
