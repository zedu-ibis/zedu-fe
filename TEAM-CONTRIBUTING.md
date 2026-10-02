# Team Ibis contribution and review guide

This supplements [CONTRIBUTING.md](CONTRIBUTING.md) with the team's internal process. The team integration branch is `staging`. GitHub's default branch may still be `main`; always select the PR base explicitly.

## Start a task

1. Agree on the task and its owner in the team channel. Check open PRs to avoid duplicating someone's work.
2. Clone `https://github.com/zedu-ibis/zedu-fe.git`. Use Node.js 24 and the pinned pnpm version (`10.27.0`).
3. Update your checkout and create a separate branch:

   ```sh
   git switch staging
   git pull --ff-only origin staging
   git switch -c feat/your-task-name
   pnpm install --frozen-lockfile
   pnpm dev
   ```

4. Request environment values privately from the team lead. Never commit credentials, environment files, or team email lists. The static contributors page needs no backend credentials.

Use `feat/`, `fix/`, or `docs/` for normal team branches. Keep one focused task per PR. Do not push directly to `staging` or `main`.

## Prepare a PR

Run these checks and include their results in the PR:

```sh
pnpm check-format
pnpm check-lint
pnpm check-types
pnpm build
```

Do not describe failed checks as passing. If the base branch already fails, provide the baseline evidence and ask the maintainer to resolve the failing gate before merge; do not bypass required checks.

Commit using Conventional Commits, for example `feat(contributors): add ibis contributors page`. Push your feature branch and open a PR **inside `zedu-ibis/zedu-fe`, with base `staging`**. Fill in the existing PR template, and include:

- The task and what changed.
- Exact test commands and results.
- Screenshots for UI changes and the route to test.
- Any known limitations or deployment requirements.

Mark unfinished work as a draft. Request review from a teammate who did not author the change. Do not open a duplicate of Ren's contributors PR without coordinating ownership first.

## Review and merge

The team lead assigns a reviewer and a maintainer for each PR. The reviewer checks:

- The change meets the task and contains no unrelated edits.
- UI works on desktop and mobile, and in light and dark themes where applicable.
- Names are accurate, current, and unique; no personal emails or secrets are published.
- Test evidence and CI results are credible; new errors have been addressed.
- Feedback has been resolved and the PR targets `staging`.

Leave actionable comments and request changes when necessary. Approve only after checking the final code. The author cannot approve their own PR. New commits after approval require another review.

A designated maintainer squash-merges after at least one other teammate approves, required checks pass, and all conversations are resolved. No automatic merging or routine administrator bypass.

## GitHub review rules

An organization administrator must configure these settings. This document does not activate them.

Under **Settings → Rules → Rulesets**, create an active branch ruleset named **Ibis staging review**, targeting `staging` with no routine bypass actors:

- Require a pull request and one approving review.
- Dismiss stale approvals when new commits are pushed.
- Require approval of the most recent reviewable push.
- Require all review conversations to be resolved.
- Require status checks and an up-to-date branch before merging.
- Block force pushes and branch deletion.

After CI has run, select the actual reported checks. The existing quality job is named **Prettier, ESLint, TypeScript, and build**. Also require applicable security checks after verifying their exact names in the PR. Do not invent check names, select the deployment job as a PR gate, or disable failing checks to merge.

Under repository merge settings, allow squash merging and leave automatic merging disabled. If the repository plan does not support rulesets, use equivalent branch protection where available and enforce the same process through maintainer permissions and recorded reviews until enforcement is available.

## Staging and HNG submission

The meeting described automatic deployment to the team's Coolify staging URL after merging into the configured branch. Record the confirmed repository, deployment branch, and exact frontend/API URLs in the team channel. The inherited GitHub deployment workflow skips forks, so a green or skipped Actions deployment alone does not establish that Coolify deployed.

After merge, the maintainer records the merged commit and checks the team URL. For this task, visit `/contributors/ibis`, verify the 44 supplied unique members, and capture a screenshot. If deployment fails, pause upstream submission and investigate; coordinate any revert through a reviewed PR.

Only after team staging works, prepare a small PR against `zedu-hng/zedu-fe:dev`, following the current HNG contribution guide. Coordinate with reviewers if the team repository's production fork parent makes the upstream PR difficult. Include only the contributors feature in that submission, not this team-specific guide or unrelated differences between branches. Never submit directly to production `zeduchat`.

Completion means: local checks and page verified → teammate review recorded → team PR merged → team staging page verified → HNG PR reviewed → later production promotion handled by central maintainers.
