import { HermitdraftMessageType } from '@hermitdraft/core.worker/enum'
import { worker } from './worker.client'

export function getDrafts(author: number, folder?: number) {
  return worker.postMessage({
    type: HermitdraftMessageType.getDrafts,
    payload: {
      author,
      folder,
    },
  }) as Promise<HermitTypes.AuthorDraft[] | []>
}

export function getDraft(id: number) {
  return worker.postMessage({
    type: HermitdraftMessageType.getDraft,
    payload: { id },
  })
}

export function getDraftBySlug(slug: string) {
  return worker.postMessage({
    type: HermitdraftMessageType.getDraftBySlug,
    payload: { slug },
  }) as Promise<HermitTypes.AuthorDraft>
}

export function saveDraft(draft: Partial<HermitTypes.AuthorDraft>) {
  return worker.postMessage({
    type: HermitdraftMessageType.saveDraft,
    payload: { draft },
  }) as Promise<{ updated: HermitTypes.AuthorDraft, refs: [ File[], HermitTypes.AuthorMedia[] ] }>
}

export function deleteDraft(id: number) {
  return worker.postMessage({
    type: HermitdraftMessageType.deleteDraft,
    payload: { id },
  })
}

export function createUntitledDraft(author: number, folder?: number) {
  return worker.postMessage({
    type: HermitdraftMessageType.createUntitledDraft,
    payload: {
      author,
      folder,
    },
  }) as Promise<{ updated: HermitTypes.AuthorDraft, refs: [ File[], HermitTypes.AuthorMedia[] ] }>
}

export function countDrafts() {
  return worker.postMessage({
    type: HermitdraftMessageType.countDrafts,
    payload: {},
  })
}