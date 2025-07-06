import { content } from '@romvales/content'

import { MetaFunction } from '@vercel/remix'

export const meta: MetaFunction = () => {
  return content.metatags['/jobs/for-employers']
}


export default function ForEmployers() {

  return (
    <main>
      
    </main>
  )
}