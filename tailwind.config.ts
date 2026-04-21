import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#f9ffe0',
          100: '#eeff99',
          200: '#d9f542',
          500: '#C8F000',
          600: '#a8cc00',
          700: '#7a9900',
          900: '#3d4d00',
        },
      },
    },
  },
  plugins: [],
};

export default config;
