# Client Build Conventions Routing Evals

## Positive

- "The production bundle is calling localhost instead of the API."
- "Add a dependency to the storybook package."
- "`yarn build` fails with Cannot find module '@gomoku/api'."
- "Where does the deployed client build come from?"
- "Change how VITE_API_URL is wired."

## Negative

- "The deploy job can't reach the VPS." → `deploy-operations`
- "DCO is failing on my PR." → `ci-pipeline`
- "Check that quick pairing works on the live site." → `live-playtest-qa`

## Forbidden

- Do not rename `envs/.env.prod`; the .NET server reads that filename directly.
- Do not "fix" module resolution by loosening `tsconfig` when the real cause is a stale
  `node_modules` or an undeclared tooling dependency.
