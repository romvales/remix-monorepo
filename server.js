import { createRequestHandler } from '@remix-run/express'
import express from 'express'
import invariant from 'tiny-invariant'

const App = express()

invariant(process.env.APP, 'Missing APP environment variable.')

const listenPort = process.env.PORT || 5173
const { APP } = process.env
const vite = /production/.test(process.env.NODE_ENV) ? 
  null : 
  await import('vite').then(v => v.createServer({
    server: { middlewareMode: true },
  }))

const handleRequest = createRequestHandler({
  build: vite ? () => vite.ssrLoadModule('virtual:remix/server-build') : await import(`./build/${APP}/server/index.js`),
})

App.disable('X-Powered-By')

if (vite) {
  App.use(vite.middlewares)
} else {
  App.use('/assets', express.static(`build/${APP}/client/assets`, { immutable: true, maxAge: '1y' }))
}

App.use(express.static(`build/${APP}/client`, { maxAge: '1h' }))
App.all('*', handleRequest)

App.listen(listenPort, () => console.log(`Express server listening at http://localhost:${listenPort}`))