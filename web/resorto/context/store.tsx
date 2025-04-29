
import { merge } from 'lodash-es'
import { createWithEqualityFn as create } from 'zustand/traditional'
import { StateCreator } from 'zustand/vanilla'

export type ResortoStateCreator = StateCreator<Partial<ResortoCoreState>, [], []>
export type ResortoStoreApi = ReturnType<typeof createResortoStore>

export function createResortoStore(initial: ResortoStateCreator) {
  return create<Partial<ResortoCoreState>>()((...props) => merge(
    root(...props),
    initial(...props),
  ))
}

const root: ResortoStateCreator = () => {
  return {}
}