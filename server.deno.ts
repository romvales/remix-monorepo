// https://github.com/denoland/remix_template

import { createRequestHandlerWithStaticFiles } from '@remix-run/deno'
import { serve } from 'https://deno.land/std@0.128.0/http/server.ts'
import invariant from 'tiny-invariant'

const APP = Deno.env.get('APP')

invariant(APP, 'Missing APP environment variable.')

const listenPort = Deno.env.get('PORT') || 5173
const vite = /production/.test(Deno.env.get('NODE_ENV')) ? 
  null : 
  await import('vite').then(v => v.createServer({
    server: { middlewareMode: true },
  }))

const handleRequest = createRequestHandlerWithStaticFiles({
  build: vite ? () => vite.ssrLoadModule('virtual:remix/server-build') : await import(`./build/${APP}/server/index.js`),
  getLoadContext() {
    return {}
  },
})

console.log(`Listening on http://localhost:${listenPort}`)
serve(handleRequest, { port: listenPort })