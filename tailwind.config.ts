import type { Config } from 'tailwindcss';
import tailwindcssReactAriaComponents from 'tailwindcss-react-aria-components';
import tailwindcssSafeArea from 'tailwindcss-safe-area';
import { heroui } from '@heroui/react';

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',

    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [tailwindcssReactAriaComponents, tailwindcssSafeArea, heroui()],
} satisfies Config;
