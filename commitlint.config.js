/**
 * Conventional Commits, enforced by the Husky `commit-msg` hook.
 *
 *   type(optional scope): subject
 *
 *   feat(profile): add avatar upload
 *   fix: guard against a missing session token
 *   docs(branching): document the hotfix flow
 */
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // a new user-facing capability
        'fix', // a bug fix
        'docs', // documentation only
        'style', // formatting, no behaviour change
        'refactor', // neither fixes a bug nor adds a feature
        'perf', // performance improvement
        'test', // adding or correcting tests
        'build', // build system or dependencies
        'ci', // CI configuration
        'chore', // housekeeping
        'revert', // reverts a previous commit
      ],
    ],
    'subject-case': [2, 'never', ['start-case', 'pascal-case', 'upper-case']],
    'header-max-length': [2, 'always', 100],
  },
}
