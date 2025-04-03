
type Generated = import('kysely').Generated

declare namespace HermitTypes {

  type AuthorContext = {
    appWorker: Worker
  }

  type Author = Omit<import('@prisma/client').Author, 'secret'>
  type AuthorDataSync = import('@prisma/client').AuthorDataSync
  type AuthorDraft = import('./core.db/browser/schema').Draft
  type AuthorMedia = import('./core.db/browser/schema').Media

  type CoreStore = {
    author: Author
  }

}
