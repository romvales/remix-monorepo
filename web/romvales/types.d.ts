
declare namespace RomTypes {

  type DirectusSchema = import('./directus').Schema

  type Vars = {
    THEME: import('remix-themes').Theme | null
  }

}