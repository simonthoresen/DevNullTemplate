// hello.js — a chat plugin that replies when someone says "!hello".
//
// What this exercises:
//   * Plugin.onMessage(author, text, isSystem) — the only required hook.
//     Return a string to inject input as if the loaded-by player typed
//     it; return null/undefined to do nothing.
//
// First edit ideas:
//   * Change the trigger phrase from "!hello" to something else.
//   * Reply with the time of day, the current player count, etc.
//     (See API-REFERENCE.md for what the runtime exposes; plugins
//     have a minimal sandbox by design — start small.)
//   * Filter out your own messages so the plugin doesn't reply to itself.

var Plugin = {
    onMessage: function(author, text, isSystem) {
        if (!isSystem && text && text.indexOf("!hello") === 0) {
            return "hi " + author + "!";
        }
        return null;
    }
};
