// hello.js — a 30-second arena game that demonstrates the dev-null
// game lifecycle.
//
// What this exercises:
//   * Game.gameName / teamRange / splashScreen — required metadata.
//   * init(ctx)                — initial server-side state.
//   * begin(state, ctx)        — runs once after teams are bound;
//                                state.teams is now populated.
//   * update(state, dt, events, ctx)
//                              — every tick. Drains inputs, "leave"
//                                events, and the per-tick "tick".
//   * renderAscii(state, me, cells)
//                              — draws into a character grid.
//   * statusBar(state, me)     — top status row.
//   * commandBar(state, me)    — bottom hints row.
//   * ctx.gameOver([{name, result}]) — ranks players and ends the game.
//
// First edit ideas:
//   * Change GAME_DURATION below to make rounds longer/shorter.
//   * In renderAscii, draw a gradient background using cells.setChar.
//   * Add a new key in update's "input" handler (e.g. "z" to teleport).
//
// Save → run .\play.ps1 in the repo root → reload via the Games menu.

var GAME_DURATION = 30;

var Game = {
    gameName: "Hello",
    teamRange: { min: 1, max: 4 },

    splashScreen: "=== HELLO ===\n"
        + "Move with arrows, press Space to score\n"
        + "Game lasts 30 seconds",

    init: function(ctx) {
        return { players: {}, elapsed: 0 };
    },

    begin: function(state, ctx) {
        var t = state.teams || [];
        for (var i = 0; i < t.length; i++) {
            for (var j = 0; j < t[i].players.length; j++) {
                var p = t[i].players[j];
                state.players[p.id] = {
                    id:    p.id,
                    name:  p.name,
                    team:  t[i].name,
                    x:     5 + Math.floor(Math.random() * 20),
                    y:     2 + Math.floor(Math.random() * 8),
                    score: 0
                };
            }
        }
        ctx.log("Hello start: " + t.length + " teams");
    },

    update: function(state, dt, events, ctx) {
        state.elapsed += dt;

        for (var i = 0; i < events.length; i++) {
            var e = events[i];
            if (e.type === "leave") {
                delete state.players[e.playerID];
                continue;
            }
            if (e.type === "input") {
                var p = state.players[e.playerID];
                if (!p) continue;
                if (e.key === "up")    p.y = Math.max(0, p.y - 1);
                if (e.key === "down")  p.y++;
                if (e.key === "left")  p.x = Math.max(0, p.x - 1);
                if (e.key === "right") p.x++;
                if (e.key === " " || e.key === "space") p.score += 10;
            }
        }

        if (state.elapsed >= GAME_DURATION) {
            var results = [];
            for (var id in state.players) {
                var p = state.players[id];
                results.push({ name: p.name + " (" + p.team + ")", result: p.score + " pts" });
            }
            results.sort(function(a, b) {
                return parseInt(b.result, 10) - parseInt(a.result, 10);
            });
            ctx.gameOver(results);
        }
    },

    renderAscii: function(state, me, cells) {
        for (var y = 0; y < cells.height; y++) {
            for (var x = 0; x < cells.width; x++) {
                var ch = ".";
                for (var id in state.players) {
                    var p = state.players[id];
                    if (p.x === x && p.y === y) {
                        ch = (id === me.id) ? "@" : "O";
                        break;
                    }
                }
                cells.setChar(x, y, ch, null, null);
            }
        }
    },

    statusBar: function(state, me) {
        var p = state.players[me.id];
        if (!p) return "Hello";
        var remaining = Math.max(0, Math.ceil(GAME_DURATION - state.elapsed));
        var count = Object.keys(state.players).length;
        return "Hello  |  " + p.team + "  |  score: " + p.score + "  |  " + remaining + "s  |  players: " + count;
    },

    commandBar: function(state, me) {
        return "[arrow] Move  [Space] Score  [Enter] Chat";
    }
};
