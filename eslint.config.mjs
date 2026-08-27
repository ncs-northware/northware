import clerkNext from "@clerk/eslint-plugin/next";
import { defineConfig, includeIgnoreFile } from "eslint/config";
import tsParser from "typescript-eslint";

/**
 * ATTENTION ESLint is only used to lint Clerk Rules such as route protection.
 * All the other linting and formatting is performed through Biome paired with Ultracite.
 */

export default defineConfig([
  includeIgnoreFile(new URL(".gitignore", import.meta.url).pathname, {
    gitignoreResolution: true,
  }),
  {
    ignores: [
      "**/.next/**",
      "**/dist/**",
      "**/node_modules/**",
      "**/storybook-static/**",
    ],
  },
  {
    files: ["apps/cockpit/**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser.parser,
    },
    plugins: { "@clerk/next": clerkNext },
    rules: {
      // You will have to define this rule once for each application that uses Clerk Authentication
      "@clerk/next/require-auth-protection": [
        "error",
        {
          protected: ["**"],
          public: ["src/app/login/**"],
          rootDir: "apps/cockpit",
        },
      ],
    },
  },
]);
