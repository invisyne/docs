---
description: Tag and push a production release (deploys to docs.invisyne.com)
---

Publish a production release of the docs site. Production deploys are gated behind a `release-*` tag push (see README.md → "Releasing to production") — merging to `main` alone does not deploy.

Steps:

1. Confirm the working tree is clean (`git status --short`). If not, stop and tell the user what's uncommitted rather than proceeding.
2. `git checkout main && git pull` — releases always go out from `main`, never a feature branch.
3. Pick a tag name: `release-$(date +%Y-%m-%d)` by default, unless the user gave a more descriptive suffix as an argument (e.g. `/publish-release hub-launch` → `release-hub-launch`). If today's date-based tag already exists, ask the user for a distinguishing suffix instead of silently overwriting.
4. `git tag <tag-name>` then `git push origin <tag-name>`.
5. Report back: the tag name, and a link to watch the triggered run — `https://github.com/invisyne/docs/actions/workflows/deploy.yml`.

Do not run this against any branch other than `main`. Do not skip the clean-working-tree check.

$ARGUMENTS
