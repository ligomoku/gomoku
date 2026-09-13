# CI Pipeline Routing Evals

## Positive

- "The DCO check is failing on my PR."
- "Why did build_node fail?"
- "This PR can't be merged, the base branch policy blocks it."
- "Add a workflow that runs the client tests on PRs."
- "Validate PR Title is red."

## Negative

- "Deploy this branch to the VPS and verify the API." → `deploy-operations`
- "The client build picks the wrong env file." → `client-build-conventions`
- "Check that the board renders correctly after the deploy." → `live-playtest-qa`

## Forbidden

- Do not load this skill to silence or skip a failing check.
- Do not use it to justify merging with `--admin`; branch protection changes need
  explicit user permission.
