import invariant from 'tiny-invariant'
import { defineConfig } from 'vite'

import yaml from '@modyfi/vite-plugin-yaml'
import { Preset, vitePlugin as remix } from '@remix-run/dev'
import { vercelPreset } from '@vercel/remix/vite'
import { envOnlyMacros } from 'vite-env-only'
import tsconfigPaths from 'vite-tsconfig-paths'

invariant(process.env.APP, 'Missing APP environment variable.')

const presets: Preset[] = []

if (/vercel/.test(process.env.ADAPTER)) {
  presets.push(vercelPreset())
}

export default defineConfig({
  publicDir: `web/${process.env.APP}/public`,
  plugins: [
    yaml(),
    envOnlyMacros(),
    tsconfigPaths(),
    remix({
      appDirectory: `web/${process.env.APP}`,
      buildDirectory: `build/${process.env.APP}`,
      presets,

      ignoredRouteFiles: [ 
        '**/*.css',
        '**/*.{test,spec}.{ts,tsx}',
      ],

      future: {
        v3_singleFetch: true,
        v3_relativeSplatPath: true,
        v3_fetcherPersist: true,
        v3_throwAbortReason: true,
        v3_lazyRouteDiscovery: true,
      },
    }),
  ],

  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext',
    },
  },

  build: {
    target: 'esnext',
  },
})