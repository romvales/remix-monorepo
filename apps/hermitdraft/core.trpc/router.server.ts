import { publishAuthorDraftToWeb, unpublishAuthorDraft } from '@hermitdraft/core.service/author'
import { initTRPC } from '@trpc/server'
import { z } from 'zod'

export const trpc = initTRPC.context<HermitTRPCContext>().create({})

const $ = trpc

export const router = trpc.router({

  publish: $
    .procedure
    .input(z.custom<Partial<HermitTypes.AuthorDraft>>())
    .mutation(async ({ input }) => publishAuthorDraftToWeb(input)),

  unpublish: $
    .procedure
    .input(z.string().min(32))
    .mutation(async ({ input }) => unpublishAuthorDraft(input)),

})

export type HermitRouter = typeof router