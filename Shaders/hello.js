// hello.js — a per-player post-processing shader. This one tints
// alternating rows ever so slightly to suggest a CRT scanline.
//
// What this exercises:
//   * Shader.process(buf, time) — called every frame on the rendered
//     buffer before it goes to the player's screen.
//   * buf.recolor(x, y, w, h, fg, bg, attr) — most common buf op.
//     Use null to leave a channel unchanged. Other ops are documented
//     in API-REFERENCE.md (look for "Shaders").
//   * ATTR_FAINT / ATTR_BOLD / ATTR_REVERSE — built-in attribute flags.
//
// First edit ideas:
//   * Change the row stride (the `y += 2`) for thicker bands.
//   * Animate horizontally instead of vertically (use `time * speed`
//     to compute an x offset and recolor a vertical strip).
//   * Recolor only inside a circle around `me.x, me.y` for a spotlight
//     effect (signature: `process(buf, time, me)` — `me` is optional).

const Shader = {
    process(buf, time) {
        var start = Math.floor((time * 3) % 4) % 2;
        for (var y = start; y < buf.height; y += 2) {
            buf.recolor(0, y, buf.width, 1, null, null, ATTR_FAINT);
        }
    }
};
