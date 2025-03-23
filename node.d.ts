

declare namespace NodeJS {

  interface ProcessEnv {
    APP: string
    ENV: 'dev' | 'test' | 'prod'
    ADAPTER: 'vercel' | 'netlify' | 'serve' | 'express'
  }

}