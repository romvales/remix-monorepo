import { initTRPC } from '@trpc/server'

const t = initTRPC.context<ZapenlistCore.TRPCContext>().create()

export const router = t.router
export const pubProc = t.procedure