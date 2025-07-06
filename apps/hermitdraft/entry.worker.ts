/// <reference lib="WebWorker" />

import {
  clearUpOldCaches,
  DefaultFetchHandler,
  EnhancedCache,

  isDocumentRequest,
  isLoaderRequest,
  logger
} from '@remix-pwa/sw'

import register from 'promise-worker/register'

import {
  assetCacheName,
  cacheVersion,
  dataCacheName,
  documentCacheName
} from './core.worker/enum'
import { getMediaFromStore } from './core.worker/storage-sw'

const docCache = new EnhancedCache(documentCacheName, {
  version: cacheVersion,
  strategy: 'CacheFirst',
  strategyOptions: {
    ignoreRoutes: [
      /\/(land|login|contact|signup)/,
      /^\/@[a-z0-9_-]+(\/[a-zA-Z0-9_-]+)?$/,
    ],
    maxEntries: 72,
  },
})

const assetCache = new EnhancedCache(assetCacheName, {
  version: cacheVersion,
  strategy: 'CacheFirst',
  strategyOptions: {
    maxAgeSeconds: 3600 * 24 * 90,
    maxEntries: 64,
  },
})

const dataCache = new EnhancedCache(dataCacheName, {
  version: cacheVersion,
  strategy: 'NetworkFirst',
  strategyOptions: {
    networkTimeoutInSeconds: 10,
    maxEntries: 72,
  },
})

declare let self: ServiceWorkerGlobalScope

self.addEventListener('install', e => {
  logger.log('Service worker installed')

  e.waitUntil(self.skipWaiting())
})

self.addEventListener('activate', e => {
  logger.log('Service worker activated')

  e.waitUntil(Promise.all([
    clearUpOldCaches(
      [ documentCacheName, dataCacheName, assetCacheName ],
      cacheVersion,
    ),

    self.clients.claim(),
  ]))
  
})

const hermitdraft = hermidraftServiceWorkerMessageHandler()

self.addEventListener('message', e => {
  e.waitUntil(Promise.all([]))
})

register(async (data: any) => {

  if (/hermitdraft\.serviceWorker/.test(data.type))
    return hermitdraft.handleMessage(data)

})

export { }


export const defaultFetchHandler: DefaultFetchHandler = async ({ context }) => {
  const req = context.event.request
  const url = new URL(req.url)
  const patt = /\/media\/(?<slug>.+)$/
  const { pathname } = url

  if (patt.test(pathname)) {
    return new Promise((resolve) => {
      setTimeout(async () => {
        const { slug } = pathname.match(patt)?.groups ?? {}
        
        try {
          const media = await getMediaFromStore(slug)
          const file = new File([ media.bin! ], media.originalName, {
            type: media.type,
            lastModified: media.updated.getTime(),
          })

          resolve(
            new Response(file, {
              headers: {
                'Content-Type': media.type,
                'Content-Length': file.size.toString(),
              },
            })
          )
        } catch {
          return fetch(req)
        }
      }, 500)
    })
  }

  if (isDocumentRequest(req)) {
    return docCache.handleRequest(req)
  }

  if (isLoaderRequest(req)) {
    return dataCache.handleRequest(req)
  }

  if (self.__workerManifest.assets.includes(url.pathname)) {
    return assetCache.handleRequest(req)
  }

  return fetch(req)
}

function hermidraftServiceWorkerMessageHandler() {

  const handleMessage = async (data: any) => {
    const { type, payload } = data
    
  }

  return { handleMessage }
}