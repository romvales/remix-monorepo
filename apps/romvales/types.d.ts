
type DBSchema = import('idb').DBSchema

declare namespace RomTypes {

  type DirectusSchema = import('./directus').Schema

  type Vars = {
    THEME: import('remix-themes').Theme | null
  }

  interface JobsDBSchema extends DBSchema {

    jobApps: {
      value: {
        id?: string
        jobAppId: string
        jobId: string
        contact: string
        status: string
      },
      key: string
      indexes: {
        byContact: string
        byJob: string
      },
    },

    bookmarks: {
      value: {
        id?: string
        jobId: string
      },
      key: string
      indexes: {
        byJob: string
      },
    },

    views: {
      value: {
        id?: string
        jobId: string
        viewed: string
      },
      key: string
      indexes: {
        byJob: string
      },
    },

    caches: {
      value: {
        id?: string
        key: string
        value: unknown
      },
      key: string
      indexes: {
        byKey: string
      },
    },

  }

}