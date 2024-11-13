import type { Config } from "tailwindcss";
import sharedConfig from "@northware/tailwind-config";
import colors from "tailwindcss/colors";

const config: Pick<Config, "content" | "presets" | "theme"> = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  presets: [sharedConfig],
  theme: {
    extend: {
      colors: {
        primary: colors.sky,
      },
    },
  },
};

export default config;
