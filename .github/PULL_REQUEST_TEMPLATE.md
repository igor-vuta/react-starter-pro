<!--
  Target branch check:
    feature/* or fix/*  ->  develop
    develop             ->  staging   (release candidate)
    staging             ->  main      (production, triggers the Pages deploy)
    hotfix/*            ->  main      (then merge main down into staging and develop)
-->

## What does this change?

<!-- One or two sentences. Link the issue: Closes #123 -->

## Why?

<!-- The problem this solves, or the decision behind it. -->

## How to test

1.
2.

## Checklist

- [ ] Branched from the correct base and targeting the correct base
- [ ] `npm run verify` passes locally (format, lint, build)
- [ ] Commits follow [Conventional Commits](https://www.conventionalcommits.org/)
- [ ] Docs updated if behaviour or setup changed
- [ ] Screenshots attached for visible UI changes

## Screenshots

<!-- Before / after, if this changes the UI. -->
