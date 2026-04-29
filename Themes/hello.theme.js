// what this exercises: Example theme for the DevNull framework
// ES5-compatible, single-file theme example (no modules)

(function () {
  // Theme metadata
  var theme = {
    name: "Hello Theme",
    author: "Example",
    description: "A minimal example theme demonstrating color variables and a simple apply() function.",
    colors: {
      background: "#0b0f1a",
      foreground: "#e6edf3",
      accent: "#ff6b6b",
      panel: "#0f1724"
    },
    apply: function () {
      // Set CSS variables in a browser environment
      if (typeof document !== 'undefined' && document.documentElement && document.documentElement.style) {
        var root = document.documentElement.style;
        root.setProperty('--devnull-bg', this.colors.background);
        root.setProperty('--devnull-fg', this.colors.foreground);
        root.setProperty('--devnull-accent', this.colors.accent);
        root.setProperty('--devnull-panel', this.colors.panel);
      }
    }
  };

  // Register in a global container without using modules
  try {
    if (typeof window !== 'undefined') {
      window.DevNullThemes = window.DevNullThemes || {};
      window.DevNullThemes[theme.name] = theme;
    } else if (typeof global !== 'undefined') {
      global.DevNullThemes = global.DevNullThemes || {};
      global.DevNullThemes[theme.name] = theme;
    }
  } catch (e) {
    // Silence any environment errors
  }
})();
