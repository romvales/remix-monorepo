import { HermitdraftMessageType } from '@hermitdraft/core.worker/enum'
import { worker } from './worker.client'

export async function saveFolder(folder: Partial<HermitTypes.AuthorFolder>) {
  return worker.postMessage({
    type: HermitdraftMessageType.saveFolder,
    payload: { folder },
  })
}

export async function createFolder(folder: Partial<HermitTypes.AuthorFolder>) {
  return worker.postMessage({
    type: HermitdraftMessageType.createFolder,
    payload: { folder },
  }) as Promise<HermitTypes.AuthorFolder | undefined>
}

export async function getFolders(author: number, target: string, parent?: number) {
  return worker.postMessage({
    type: HermitdraftMessageType.getFolders,
    payload: { author, parent, target },
  }) as Promise<HermitTypes.AuthorFolder[] | []>
}

export async function getFolder(folder: number) {
  return worker.postMessage({
    type: HermitdraftMessageType.getFolder,
    payload: { folder },
  }) as Promise<HermitTypes.AuthorFolder | undefined>
}

export async function getFolderBySlug(slug: string) {
  return worker.postMessage({
    type: HermitdraftMessageType.getFolderBySlug,
    payload: { slug },
  }) as Promise<HermitTypes.AuthorFolder | undefined>
}

export async function deleteFolder(folder: number) {
  return worker.postMessage({
    type: HermitdraftMessageType.deleteFolder,
    payload: { folder },
  })
}

export async function countFolders() {
  return worker.postMessage({
    type: HermitdraftMessageType.countFolders,
    payload: {},
  })
}