import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';
import colorConfig from './colors';

const config: Omit<Config, 'content'> = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: ['class'],
  presets: [colorConfig],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '80rem',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-sourcesans)'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'caret-blink': {
          '0%,70%,100%': { opacity: '1' },
          '20%,50%': { opacity: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'caret-blink': 'caret-blink 1.25s ease-out infinite',
      },
    },
  },
  plugins: [animate],
};

export default config;
