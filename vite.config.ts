import invariant from 'tiny-invariant'
import { defineConfig } from 'vite'

import yaml from '@modyfi/vite-plugin-yaml'
import { vitePlugin as remix } from '@remix-run/dev'
import { envOnlyMacros } from 'vite-env-only'
import tsconfigPaths from 'vite-tsconfig-paths'

invariant(process.env.APP, 'Missing APP environment variable.')

export default defineConfig({
  publicDir: `web/${process.env.APP}/public`,
  plugins: [
    yaml(),
    envOnlyMacros(),
    tsconfigPaths(),
    remix({
      appDirectory: `web/${process.env.APP}`,
      buildDirectory: `build/${process.env.APP}`,

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
})