import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: [
    './web/**/{**,.client,.server}/**/*.{ts,tsx}',
    './shared/**/{**,components}/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config