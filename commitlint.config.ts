import type { UserConfig } from "@commitlint/types";
import { RuleConfigSeverity } from "@commitlint/types";

const Configuration: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      RuleConfigSeverity.Warning,
      "always",
      ["chore", "docs", "feat", "fix", "revert"],
    ],
    "scope-max-length": [RuleConfigSeverity.Warning, "always", 20],
    "subject-max-length": [RuleConfigSeverity.Warning, "always", 45],
  },
  ignores: [
    (commitMessage) => {
      // add an exception for github
      // biome-ignore lint/performance/useTopLevelRegex: not avoidable
      return /^Merge branch '.*' into [a-zA-Z0-9/\-_]+$/.test(commitMessage);
    },
  ],
};

export default Configuration;
