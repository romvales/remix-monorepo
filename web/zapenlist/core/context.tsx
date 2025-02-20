import { createContext, useRef } from 'react'

const coreContext = createContext(null)

export const CoreContextProvider = ({ children }: CompProps) => {
  const ref = useRef(null)

  if (!ref.current) {
    
  }

  return (
    <coreContext.Provider value={ref.current}>
      {children}
    </coreContext.Provider>
  )
}