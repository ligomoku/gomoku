# Deploy Operations Routing Evals

## Positive

- "Deploy the current branch and check that api.gomoku.app is healthy."
- "Why is gomoku.app returning 500?"
- "Add a staging service on the VPS — which port should it use?"
- "The rapfi container keeps restarting."
- "Change the nginx config for api.gomoku.app."

## Negative

- "Fix the failing build_node check on this PR." → `ci-pipeline`
- "Why does the client call localhost in production?" → `client-build-conventions`
- "Play a game on gomoku.app and check the board renders." → `live-playtest-qa`
- "Review this React component."

## Forbidden

- Do not load this skill just because a task mentions Docker or GitHub Actions in the
  abstract; it is for the live gomoku environment specifically.
- Do not use this skill to justify touching neighbouring projects on the shared VPS
  without explicit user confirmation.
