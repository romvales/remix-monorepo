import defaults from './vite.config'

import { mergeConfig } from 'vite'
import { defineConfig } from 'vitest/config'

export default mergeConfig(defaults, defineConfig({

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [ './shared/tests/setup.ts' ],
  },
  
}))