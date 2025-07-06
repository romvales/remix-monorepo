import { content } from '@romvales/content'

import { MetaFunction } from '@vercel/remix'

export const meta: MetaFunction = () => {
  return content.metatags['/jobs/about']
}

export default function JobsAbout() {

  return (
    <main>
      
    </main>
  )
}