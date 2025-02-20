
import yaml from '@modyfi/vite-plugin-yaml'
import { vitePlugin as remix } from '@remix-run/dev'
import tsconfigPaths from 'vite-tsconfig-paths'

import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    yaml(),
    tsconfigPaths(),
    remix({
      appDirectory: `web/${process.env.APP_NAME}`,
      buildDirectory: `web/${process.env.APP_NAME}`,

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