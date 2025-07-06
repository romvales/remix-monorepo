import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: [
    './apps/**/{**,.client,.server}/**/*.{ts,tsx}',
    './shared/**/{**,components}/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config