const { join } = require("path");

module.exports = {
  mode: "jit",
  content: [join(__dirname, "./src/**/*.{js,ts,jsx,tsx}")],
  darkMode: "media",
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        "bg-main": "rgba(231, 245, 255,0.4)",
      },
      gridTemplateColumns: {
        sidebar: "250px auto", //for sidebar layout
      },
      gridTemplateRows: {
        header: "64px auto", //for the navbar layout
      },
    },
  },
  plugins: [],
};
