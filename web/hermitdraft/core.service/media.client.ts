import { HermitdraftMessageType } from '@hermitdraft/core.worker/enum'
import { worker } from './worker.client'

import { persistMediaToStore } from '@hermitdraft/core.worker/storage-sw'

export async function saveMedia(subj: Partial<HermitTypes.AuthorMedia>) {
  await persistMediaToStore(subj)
  return worker.postMessage({
    type: HermitdraftMessageType.saveMedia,
    payload: { media: subj },
  })
}

export function getMedias(author: number, folder?: number) {
  return worker.postMessage({
    type: HermitdraftMessageType.getMedias,
    payload: { author, folder },
  })
}

export function getMedia(id: number) {
  return worker.postMessage({
    type: HermitdraftMessageType.getMedia,
    payload: { id },
  })
}

export function getMediaBySlug(slug: string) {
  return worker.postMessage({
    type: HermitdraftMessageType.getMediaBySlug,
    payload: { slug },
  })
}
 
export function deleteMedia(id: number) {
  return worker.postMessage({
    type: HermitdraftMessageType.deleteMedia,
    payload: { id },
  })
}
