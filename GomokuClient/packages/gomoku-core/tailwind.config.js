// gomoku-story/tailwind.config.js and gomoku-core/tailwind.config.js
const sharedConfig = require("@gomoku/tailwind-config");

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...sharedConfig,
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "../gomoku-story/src/**/*.{js,ts,jsx,tsx}", // Only include this line in gomoku-core
  ],
};
