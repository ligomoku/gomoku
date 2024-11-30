console.log("Fixing sdk.gen.ts...");

const fs = require("fs");
const path = require("path");
const sdkFilePath = path.resolve(
  __dirname,
  "packages/gomoku-api/client/sdk.gen.ts",
);

let content = fs.readFileSync(sdkFilePath, "utf8");

content = content.replace(
  /"Content-Type": "application\/json",\s*\.\.\.options\?\.headers,/g,
  '...options?.headers, "Content-Type": "application/json",',
);

fs.writeFileSync(sdkFilePath, content, "utf8");

console.log("Fixed redundant 'Content-Type' declarations in sdk.gen.ts.");
