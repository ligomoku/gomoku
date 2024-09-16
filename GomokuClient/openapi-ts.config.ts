import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  client: '@hey-api/client-fetch',
  input: 'src/api/schema.json',
  output: 'src/api/client',
  types: {
    enums: 'javascript',
  },
});
