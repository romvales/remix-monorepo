import register from 'promise-worker/register'

import { initialize } from '@hermitdraft/core.db/browser'
import { DraftClientWebWorkerService } from '@hermitdraft/core.worker/draft'
import { MediaClientWebWorkerService } from '@hermitdraft/core.worker/media'
import { HermitdraftMessageType, SQLocalMessageType } from './enum'
import { FolderClientWebWorkerService } from './folder'

register(async (data: any) => {

  if (/sqlocal\.worker/.test(data.type))
    return sqlocal.handleMessage(data)

  if (/hermitdraft\.worker/.test(data.type))
    return hermitdraft.handleMessage(data)

})

let props: Awaited<ReturnType<typeof initialize>>

const sqlocal = sqlocalMessageHandler()
const hermitdraft = hermitdraftMessageHandler()

function sqlocalMessageHandler() {
  const handleMessage = async (data: any) => {
    const { type, payload } = data

    switch (type) {
    case SQLocalMessageType.initialize:
      props = await initialize()

      const info = { 
        success: true, 
        info: await props.sqlocal.getDatabaseInfo(),
      }

      return info
    default:
    }

  }

  return { handleMessage }
}

function hermitdraftMessageHandler() {

  const handleMessage = async (data: any) => {
    const { type, payload } = data
    const mediaService = new MediaClientWebWorkerService(props)
    const draftService = new DraftClientWebWorkerService(props)
    const folderService = new FolderClientWebWorkerService(props)

    switch (type) {
    case HermitdraftMessageType.mediaUploadFile:
      try {
        
        return { 
          success: true, 
          media: await mediaService.saveMedia(payload.media)
        }
      } catch (e) {
        return { success: false }
      }

    case HermitdraftMessageType.getMedia:
      return mediaService.getMedia(payload.id)
    case HermitdraftMessageType.getMediaBySlug:
      return mediaService.getMediaBySlug(payload.slug)
    case HermitdraftMessageType.getMedias:
      return mediaService.getMedias(payload.author)
    case HermitdraftMessageType.deleteMedia:
      return mediaService.deleteMedia(payload.id)
    case HermitdraftMessageType.saveMedia:
      return mediaService.saveMedia(payload.media)
      
    case HermitdraftMessageType.getDrafts:
      return draftService.getDrafts(payload.author, payload.folder)
    case HermitdraftMessageType.getDraft:
      return draftService.getDraft(payload.id)
    case HermitdraftMessageType.getDraftBySlug:
      return draftService.getDraftBySlug(payload.slug)
    case HermitdraftMessageType.countDrafts:
      return draftService.countDrafts()
    case HermitdraftMessageType.createUntitledDraft:
      return draftService.createUntitledDraft(payload.author, payload.folder)
    case HermitdraftMessageType.deleteDraft:
      return draftService.deleteDraft(payload.id)
    case HermitdraftMessageType.saveDraft:
      return draftService.saveDraft(payload.draft)

    case HermitdraftMessageType.saveFolder:
      return folderService.saveFolder(payload.folder)
    case HermitdraftMessageType.createFolder:
      return folderService.createFolder(payload.folder)
    case HermitdraftMessageType.getFolderBySlug:
      return folderService.getFolderBySlug(payload.slug)
    case HermitdraftMessageType.getFolder:
      return folderService.getFolder(payload.folder)
    case HermitdraftMessageType.getFolders:
      return folderService.getFolders(payload.author, payload.target, payload.parent)
    case HermitdraftMessageType.deleteFolder:
      return folderService.deleteFolder(payload.folder)
    case HermitdraftMessageType.countFolders:
      return folderService.countFolders()
      
    default: 

    }
  }

  return { handleMessage }
}
