const sharedConfig = require("@gomoku/tailwind-config");

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...sharedConfig,
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "../gomoku-story/src/**/*.{js,ts,jsx,tsx}", // Only include this line in gomoku-core
  ],
};
