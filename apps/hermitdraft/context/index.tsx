import { getAppWorker } from '@hermitdraft/app.client'
import { createContext, useContext } from 'react'

const authorContext = createContext<HermitTypes.AuthorContext | undefined>(undefined)
const appWorker = getAppWorker()

export function AuthorContext({ children }: ComponentProps) {

  return (
    <authorContext.Provider value={{ appWorker }}>
      {children}
    </authorContext.Provider>
  )
}

export function useAuthorContext() {
  return useContext(authorContext)!
}