/// <reference lib="WebWorker" />

import {
  clearUpOldCaches,
  DefaultFetchHandler,
  EnhancedCache,

  isDocumentRequest,
  isLoaderRequest,
} from '@remix-pwa/sw'

const version = 'v1'

const 
  DOCUMENT_CACHE_NAME = 'doc-cache',
  ASSET_CACHE_NAME = 'asset-cache',
  DATA_CACHE_NAME = 'data-cache',
  MEDIA_CACHE_NAME = 'media-cache'

const docCache = new EnhancedCache(DOCUMENT_CACHE_NAME, {
  version,
  strategy: 'CacheFirst',
  strategyOptions: {
    maxEntries: 64,
  },
})

const assetCache = new EnhancedCache(ASSET_CACHE_NAME, {
  version,
  strategy: 'CacheFirst',
  strategyOptions: {
    maxAgeSeconds: 3600 * 24 * 90,
    maxEntries: 64,
  },
})

const dataCache = new EnhancedCache(DATA_CACHE_NAME, {
  version,
  strategy: 'NetworkFirst',
  strategyOptions: {
    networkTimeoutInSeconds: 10,
    maxEntries: 72,
  },
})

const mediaCache = new EnhancedCache(MEDIA_CACHE_NAME, {
  version,
  strategy: 'CacheFirst',
  strategyOptions: {},
})

declare let self: ServiceWorkerGlobalScope

self.addEventListener('install', e => {
  console.log('Service worker installed')

  e.waitUntil(self.skipWaiting())
})

self.addEventListener('activate', e => {
  console.log('Service worker activated')

  e.waitUntil(Promise.all([
    clearUpOldCaches(
      [ DOCUMENT_CACHE_NAME, DATA_CACHE_NAME, ASSET_CACHE_NAME ],
      version,
    ),
    self.clients.claim(),
  ]))
})

self.addEventListener('message', e => {
  e.waitUntil(Promise.all([]))
})

export { }

export const defaultFetchHandler: DefaultFetchHandler = async ({ context }) => {
  const req = context.event.request
  const url = new URL(req.url)

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