import invariant from 'tiny-invariant'
import { defineConfig, PluginOption } from 'vite'

import yaml from '@modyfi/vite-plugin-yaml'
import { remixPWA } from '@remix-pwa/dev'
import { Preset, vitePlugin as remix } from '@remix-run/dev'
import { vercelPreset } from '@vercel/remix/vite'
import { envOnlyMacros } from 'vite-env-only'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import tsconfigPaths from 'vite-tsconfig-paths'

invariant(process.env.APP, 'Missing APP environment variable.')
invariant(process.env.ENV, 'Missing ENV environment variable.')

const presets: Preset[] = []
const plugins: PluginOption[] = [
  yaml(),
  envOnlyMacros(),
  tsconfigPaths(),
  nodePolyfills({
    include: [ 'buffer' ],
    globals: { Buffer: true },
  }),

  // For web workers
  {
    name: 'configWebWorkersHeaders',
    configureServer: server => {
      server.middlewares.use((_req, res, next) => {
        res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp')
        res.setHeader('Cross-Origin-Opener-Policy', 'same-origin')
        next()
      })
    }
  },
]

// Add the vercelPreset if process.env.ADAPTER is vercel.
if (/vercel/.test(process.env.ADAPTER)) presets.push(vercelPreset())
if (process.env.PWA) plugins.push(remixPWA({
  workerBuildDirectory: `web/${process.env.APP}/public`,
}))

plugins.push(
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
  })
)

export default defineConfig({
  publicDir: `web/${process.env.APP}/public`,
  plugins,

  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext',
    },

    exclude: [ 'sqlocal' ],
  },

  worker: {
    format: 'iife',
    plugins: () => [
      tsconfigPaths(),
      nodePolyfills({
        include: [ 'buffer' ],
        globals: { Buffer: true },
      }),
    ],
  },

  build: {
    target: 'esnext', 
  },
})