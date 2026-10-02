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

## Copyable prompts for your coding agent

Replace every bracketed placeholder before sending a prompt. These prompts help an agent follow the process; they do not replace a teammate's review. Never paste credentials or private environment values into a prompt.

### Start and implement a task locally

```text
Help me implement this Team Ibis task: [TASK DESCRIPTION AND ACCEPTANCE CRITERIA].
Task/issue: [ISSUE LINK OR TASK ID, OR SAY NONE].

Read the applicable AGENTS.md, CONTRIBUTING.md, TEAM-CONTRIBUTING.md,
and repository conventions before editing. Verify that origin points to
https://github.com/zedu-ibis/zedu-fe.git. Our team PR base is staging,
even if GitHub's default branch or a template says main or dev.

Inspect git status and existing PRs. Preserve unrelated local work and
coordinate any overlapping task rather than duplicating it. Fetch origin
and start a new task branch from current origin/staging. Follow repository
branch naming rules; use feat/, fix/, or docs/ when no stricter rule applies.

Implement only this task using existing components and conventions.
Use pnpm and respect the pinned packageManager version. Do not commit
credentials, environment files, private contact lists, or generated artifacts.
Run pnpm check-format, pnpm check-lint, pnpm check-types, and pnpm build.
Report actual results and any pre-existing failures without bypassing hooks.

Finish with a diff summary, preview/test instructions, and a suggested
Conventional Commit message. Do not commit, push, create a PR, or merge yet.
```

### Commit, push, and open the team PR

This prompt authorizes a local commit, a feature-branch push, and PR creation. Use it after checking the local work and agreeing on task ownership.

```text
Prepare and submit my completed Team Ibis task: [TASK DESCRIPTION].
Task/issue: [ISSUE LINK OR TASK ID, OR SAY NONE].
Reviewer: [TEAMMATE'S GITHUB USERNAME, OR SAY UNASSIGNED].

Read the repository instructions and TEAM-CONTRIBUTING.md. Confirm origin
is zedu-ibis/zedu-fe and I am on the intended feature branch, not staging
or main. Inspect all staged and unstaged changes. Stage only this task's
files; do not include unrelated work or generated files.

Run pnpm check-format, pnpm check-lint, pnpm check-types, and pnpm build.
If any required check fails, stop before submitting and explain the failure.
Do not skip hooks, use --no-verify, or weaken CI to get a green result.

Create a focused Conventional Commit matching commitlint.config.cjs:
type(optional-scope): short lowercase description
Examples: feat(contributors): add ibis contributors page
          fix(contributors): remove duplicate names
          docs(team): explain internal review process
Do not invent an issue ID or claim tests you did not run.

Push only the feature branch to origin with upstream tracking. Check for an
existing PR for that branch and update it instead of making a duplicate.
Open the PR explicitly in zedu-ibis/zedu-fe with base staging; do not let
GitHub choose the production upstream or main by default. Follow the existing
PR template, keeping every required section. Use a Conventional Commit title
and include what changed, the task link if supplied, exact validation results,
UI screenshots where applicable, the route to test, and known limitations.
Include any AI-usage note required by the repository. Request the supplied
reviewer if assigned; otherwise report that review assignment is pending.

Return the branch, commit hash, PR URL, and check results. Do not merge,
approve my own PR, enable automatic merging, or submit an HNG PR yet.
```

### Help a teammate review a PR

```text
Help me review this Team Ibis PR: [PR URL].
Task requirements: [TASK DESCRIPTION OR ISSUE LINK].

Read the repository instructions and TEAM-CONTRIBUTING.md. Verify the PR
belongs to zedu-ibis/zedu-fe and targets staging. Review its actual diff,
CI results, test evidence, and unresolved conversations. Check task scope,
correctness, privacy, and unrelated changes. Run relevant checks in an
isolated checkout without disturbing my local work. For UI changes, verify
desktop/mobile behavior and the existing site layout. For contributors,
check unique names, one @ prefix per name, and absence of personal emails.

Report actionable findings with file/line references, reproduction steps,
and severity. Distinguish verified results from anything you could not test.
Recommend request changes or readiness for human approval with reasons.
Do not post comments, submit a GitHub review, approve, or merge. I will inspect
your findings and make the review decision myself.
```

### Prepare the later HNG submission

```text
Help prepare the HNG submission for this reviewed Team Ibis change:
[MERGED TEAM PR URL]. Team staging verification: [LIVE URL AND EVIDENCE].

Read the current zedu-hng/zedu-fe contribution instructions and verify its
required PR target (currently dev). Inspect fork ancestry and the proposed
diff against that target. Include only the approved feature, excluding
TEAM-CONTRIBUTING.md and unrelated team/production branch differences.
Preserve attribution and report any fork or branch compatibility problem.
Run the required checks and draft the upstream PR title/body, including the
team review and live verification evidence. Do not submit directly to
zeduchat, merge anything, or create the upstream PR yet. Show me the exact
source branch, target, diff summary, and remaining blockers first.
```
