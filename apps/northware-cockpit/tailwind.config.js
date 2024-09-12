// tailwind.config.js

const sharedConfig = require("@northware/config-tailwind");

const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  presets: [sharedConfig],
};

module.exports = config;
