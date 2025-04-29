import { createContext, useContext, useRef } from 'react'
import { useStoreWithEqualityFn } from 'zustand/traditional'
import { createResortoStore } from './store'

export const ResortoContext = createContext<ResortoStoreApi | null>(null)

export function ResortoCoreProvider({ children }: ComponentProps) {
  const ref = useRef<ResortoStoreApi | null>()

  if (!ref.current) {
    ref.current = createResortoStore((set) => ({}))
  }


  return (
    <ResortoContext.Provider value={ref.current}>
      {children}
    </ResortoContext.Provider>
  )
}

export function useResorto<T>(
  selector: (state: Partial<ResortoCoreState>) => T,
  eqFn?: (l: T, right: T) => boolean,
) {
  const store = useContext(ResortoContext)

  if (!store) throw new Error('Cannot call useResorto outside `ResortoCoreProvider`.')

  return useStoreWithEqualityFn(store, selector, eqFn)
}