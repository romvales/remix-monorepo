import { createContext, useRef } from 'react'

const coreContext = createContext(null)

export const CoreContextProvider = ({ children }: ComponentProps) => {
  const ref = useRef(null)

  if (!ref.current) {
    
  }

  return (
    <coreContext.Provider value={ref.current}>
      {children}
    </coreContext.Provider>
  )
}