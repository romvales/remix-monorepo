import type { WebAppManifest } from '@remix-pwa/dev'
import { data } from '@vercel/remix'

export const loader = () => {
  return data(
    {
      short_name: 'Hermitdraft',
      name: 'Hermitdraft',
      start_url: '/',
      display: 'standalone',
      background_color: '#d3d7dd',
      theme_color: '#c34138',
    } as WebAppManifest,
    {
      headers: {
        'Cache-Control': 'public, max-age=600',
        'Content-Type': 'application/manifest+json',
      },
    }
  )
}