import type { Config } from 'tailwindcss';

const ColorConfig: Omit<Config, 'content'> = {
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background) / 100%)',
        foreground: 'hsl(var(--foreground) / 100%)',
        card: {
          DEFAULT: 'hsl(var(--card) / 100%)',
          foreground: 'hsl(var(--card-foreground) / 100%)',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover) / 100%)',
          foreground: 'hsl(var(--popover-foreground) / 100%)',
        },
        border: 'hsl(var(--border) / 100%)',
        input: 'hsl(var(--input) / 100%)',
        ring: 'hsl(var(--ring) / 100%)',
        muted: {
          DEFAULT: 'hsl(var(--muted) / 100%)',
          foreground: 'hsl(var(--muted-foreground) / 100%)',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary) / 100%)',
          foreground: 'hsl(var(--secondary-foreground) / 100%)',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent) / 100%)',
          foreground: 'hsl(var(--accent-foreground) / 100%)',
        },
        info: {
          DEFAULT: 'hsl(var(--info) / 100%)',
          foreground: 'hsl(var(--info-foreground) / 100%)',
        },
        success: {
          DEFAULT: 'hsl(var(--success) / 100%)',
          foreground: 'hsl(var(--success-foreground) / 100%)',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning) / 100%)',
          foreground: 'hsl(var(--warning-foreground) / 100%)',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive) / 100%)',
          foreground: 'hsl(var(--destructive-foreground) / 100%)',
        },
        danger: {
          DEFAULT: 'hsl(var(--danger) / 100%)',
          foreground: 'hsl(var(--danger-foreground) / 100%)',
        },
        cockpit: {
          DEFAULT: 'hsl(var(--cockpit) / 100%)',
          foreground: 'hsl(var(--cockpit-foreground) / 100%)',
        },
        finance: {
          DEFAULT: 'hsl(var(--finance) / 100%)',
          foreground: 'hsl(var(--finance-foreground) / 100%)',
        },
        trader: {
          DEFAULT: 'hsl(var(--trader) / 100%)',
          foreground: 'hsl(var(--trader-foreground) / 100%)',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary) / 100%)',
          foreground: 'hsl(var(--primary-foreground) / 100%)',
        },
      },
    },
  },
};
export default ColorConfig;
