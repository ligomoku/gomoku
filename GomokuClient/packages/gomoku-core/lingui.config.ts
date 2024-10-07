/** @type {import('@lingui/conf').LinguiConfig} */
const config = {
  locales: ["en"],
  catalogs: [
    {
      path: "<rootDir>/src/locales/{locale}/messages",
      include: ["src"],
    },
  ],
  compileNamespace: "en",
};

export default config;
