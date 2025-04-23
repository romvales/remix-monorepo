import type { WebAppManifest } from '@remix-pwa/dev'

import icon32 from '@shared/assets/pwa-32.png'
import icon512 from '@shared/assets/pwa-512.png'
import screenshot from '@shared/assets/pwa-screenshot.jpg'

export const loader = () => {
  return Response.json(
    {
      id: '/',
      short_name: 'Hermitdraft',
      name: 'Hermitdraft',
      start_url: '/',
      scope: '/',
      display: 'standalone',
      background_color: '#d3d7dd',
      theme_color: '#c34138',
      icons: [
        {
          src: icon32,
          sizes: '32x32',
          type: 'image/png',
        },
        {
          src: icon512,
          sizes: '512x512',
          type: 'image/png',
        },
      ],
      screenshots: [
        {
          platform: 'android',
          src: screenshot,
          sizes: '640x640',
          label: 'An example PWA screenshot (but not of the app).',
        },
        {
          platform: 'windows',
          src: screenshot,
          sizes: '640x640',
          form_factor: 'wide',
          label: 'An example PWA screenshot (but not of the app).',
        },
      ],
    } as WebAppManifest,
    {
      headers: {
        'Cache-Control': 'public, max-age=600',
        'Content-Type': 'application/manifest+json',
      },
    }
  )
}