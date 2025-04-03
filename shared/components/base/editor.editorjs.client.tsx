import EditorJS from '@editorjs/editorjs'
import ImageTool from '@editorjs/image'
import { createUploadByFileUploader, createUploadByUrlUploader } from '@hermitdraft/core.service/media.client'
import { useRoute_authorLoaderData } from '@hermitdraft/core.service/routes'

import { useEffect, useRef, useState } from 'react'

export function Editor() {
  const ref = useRef<HTMLDivElement>(null)

  const [,setEditor] = useState<EditorJS>()
  const { author } = useRoute_authorLoaderData()

  useEffect(() => {
    setEditor(new EditorJS({
      holder: ref.current!,
      tools: {
        image: {
          class: ImageTool,
          config: {
            uploader: {
              uploadByFile: createUploadByFileUploader(author),
              uploadByUrl: createUploadByUrlUploader(author),
            },
          },
        },
      },
    }))
    
    return () => setEditor(undefined)
  }, [ ref ])

  return (
    <div ref={ref}></div>
  )  
}