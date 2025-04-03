
import { EditorJs } from '@components/base/editor'
import { useRoute_authorLoaderData } from '@hermitdraft/core.service/routes'
import { ClientLoaderFunctionArgs } from '@remix-run/react'
import { useEffect } from 'react'

export const clientLoader = async ({}: ClientLoaderFunctionArgs) => {

  return {}
}

export default function Draft() {
  const { author } = useRoute_authorLoaderData()

  useEffect(() => {

  }, [])

  return (
    <main>
      <EditorJs></EditorJs>
    </main>
  )
}