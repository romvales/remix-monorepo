import { inferRouterInputs, inferRouterOutputs } from '@trpc/server'
import { router } from './router'

export const contractRouter = router({

})

export type TRPCContractRouter = typeof contractRouter
export type RouterInput = inferRouterInputs<TRPCContractRouter>
export type RouterOutput = inferRouterOutputs<TRPCContractRouter>
