import { execSync } from "child_process";
import { writeFileSync } from "fs";
import { join } from "path";
import dotenv from "dotenv";

dotenv.config({ path: join(process.cwd(), "../../../envs/.env.local") });

if (!process.env.VITE_API_URL) {
  throw new Error("VITE_API_URL is not defined in .env.local");
}

console.log("✨ Generating TypeScript types...");
execSync("npx openapi-typescript ./schema.json -o ./client/schema.d.ts", {
  stdio: "inherit",
});

console.log("✨ Setting up API client...");
const clientCode = `
import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";
import type { paths } from "./schema";

const fetchClient = createFetchClient<paths>({
  baseUrl: "${process.env.VITE_API_URL}",
});

export const apiClient = createClient(fetchClient);
`;

writeFileSync(join(process.cwd(), "./client/api-client.ts"), clientCode);

console.log("✅ API client and types generated successfully.");
