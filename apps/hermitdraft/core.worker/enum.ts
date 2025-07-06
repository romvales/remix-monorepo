
export const cacheVersion = 'v1'

export const documentCacheName = 'hermitdraft-docs'
export const assetCacheName = 'hermitdraft-assets'
export const dataCacheName = 'hermitdraft-data'
export const mediaCacheName = 'hermitdraft-media'

export enum SQLocalMessageType {
  initialize = 'sqlocal.worker.initialize'
}

export enum HermitdraftMessageType {
  mediaUploadFile = 'hermitdraft.worker.mediaUploadFile',

  saveMedia = 'hermitdraft.worker.saveMedia',
  getMedias = 'hermitdraft.worker.getMedias',
  getMedia = 'hermitdraft.worker.getMedia',
  getMediaBySlug = 'hermitdraft.worker.getMediaBySlug',
  deleteMedia = 'hermitdraft.worker.deleteMedia',
  
  createUntitledDraft = 'hermitdraft.worker.createUntitledDraft',
  countDrafts = 'hermitdraft.worker.countDrafts',
  deleteDraft = 'hermitdraft.worker.deleteDraft',
  getDraft = 'hermitdraft.worker.getDraft',
  getDraftBySlug = 'hermitdraft.worker.getDraftBySlug',
  getDrafts = 'hermitdraft.worker.getDrafts',
  saveDraft = 'hermitdraft.worker.saveDraft',

  saveFolder = 'hermitdraft.worker.saveFolder',
  createFolder = 'hermitdraft.worker.createFolder',
  getFolders = 'hermitdraft.worker.getFolders',
  getFolder = 'hermitdraft.worker.getFolder',
  getFolderBySlug = 'hermitdraft.worker.getFolderBySlug',
  deleteFolder = 'hermitdraft.worker.deleteFolder',
  countFolders = 'hermitdraft.worker.countFolders',

}
