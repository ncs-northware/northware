const Configuration = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      1,
      "always",
      [
        "feature",
        "fix",
        "refactor",
        "docs",
        "code-style",
        "ci",
        "perf",
        "build",
        "test",
        "revert",
      ],
    ],
  },
  ignores: [
    (commitMessage) => {
      // add an exception for github
      return /^Merge branch '.*' into [a-zA-Z0-9\/\-_]+$/.test(commitMessage);
    },
  ],
};

module.exports = Configuration;
