import type { Config } from 'tailwindcss'

export default {
  content: [
    './web/**/{**,.client,.server}/**/*.{ts,tsx}',
    './shared/**/{**,components}/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config