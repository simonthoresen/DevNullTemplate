# my DevNull content

This repo was created from the
[DevNullCreateTemplate](https://github.com/simonthoresen/DevNullCreateTemplate)
template. It holds your authored games, plugins, and shaders for the
[DevNull](https://github.com/simonthoresen/DevNull) framework.

## Test locally

```powershell
.\DevNullTest.ps1
```

This launches a local DevNull server pointed at this folder and opens
the GUI client. Your `Games\`, `Plugins\`, and `Shaders\` show up in
the relevant sub-menus under a `── Create ──` section.

DevNull must already be installed; `DevNullTest.ps1` exits with the
installer one-liner if it can't find `~/DevNull/`.

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

Hand any of those URLs to the admin of a DevNull server. They paste it
into **File > Games > Add...** (or Plugins / Shaders > Add) and click
Load. GitHub `blob/` URLs also work — they're auto-converted to raw.

## Examples

Three working examples ship in `Games\`, `Plugins\`, and `Shaders\`.
Open them and read the comments — that's the canonical reference.
The full JavaScript surface is documented at
[API-REFERENCE.md](https://github.com/simonthoresen/DevNull/blob/main/API-REFERENCE.md);
the end-to-end author workflow at
[AUTHORING.md](https://github.com/simonthoresen/DevNull/blob/main/AUTHORING.md).
