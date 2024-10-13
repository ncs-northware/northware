const Configuration = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      1,
      "always",
      ["chore", "ci", "docs", "feat", "fix", "revert", "test"],
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
