import type { Config } from "tailwindcss";
import sharedConfig from "@northware/tailwind-config";

const config: Pick<Config, "content" | "presets" | "theme"> = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  presets: [sharedConfig],
};

export default config;
