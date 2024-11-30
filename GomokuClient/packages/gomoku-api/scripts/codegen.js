import { execSync } from "child_process";
import { join } from "path";

console.log("✨ Generating TypeScript types...");
execSync("npx openapi-typescript ./schema.json -o ./client/schema.d.ts", {
  stdio: "inherit",
});

console.log("✅ TypeScript types generated successfully.");
