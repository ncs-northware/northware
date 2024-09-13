const colors = require("tailwindcss/colors");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  presets: [require("@northware/tailwind-config")],
  theme: {
    extend: {
      colors: {
        primary: colors.sky,
        onPrimary: colors.white,
      },
    },
  },
};
