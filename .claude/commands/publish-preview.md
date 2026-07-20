---
description: Tag and push a preview deploy (access-gated, not production)
---

Publish the current branch's content to the access-gated preview environment — for reviewing not-yet-live content before it merges to `main`. This does **not** touch production.

Steps:

1. Confirm the working tree is clean (`git status --short`). If not, stop and tell the user what's uncommitted rather than proceeding.
2. Do **not** switch branches — preview deploys are meant to preview whatever branch/content is currently checked out, which is often a feature branch not yet merged to `main`.
3. Pick a tag name: `preview-$(date +%Y-%m-%d)` by default, unless the user gave a more descriptive suffix as an argument.
4. `git tag <tag-name>` then `git push origin <tag-name>`.
5. Report back: the tag name and a link to watch the triggered run — `https://github.com/invisyne/docs/actions/workflows/preview-deploy.yml`.

If the preview infrastructure isn't provisioned yet (check with the user if unsure), this will push a tag that triggers a workflow run destined to fail at the credentials step — say so before tagging rather than after.

$ARGUMENTS
