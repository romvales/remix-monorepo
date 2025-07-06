import { z } from 'zod'
import unverifiedContent from './content.yml'

const contentSchema = z.object({
  name: z.string(),
  tagline: z.string(),

  nav: z.array(
    z.object({
      label: z.string(),
      to: z.string().startsWith('/'),
    })
  ),

  hero: z.object({
    main: z.string(),
  }),

  benefits: z.array(
    z.object({
      title: z.string(),
      desc: z.string(),
    })
  ),

  features: z.array(
    z.object({
      title: z.string(),
      desc: z.string(),
    })
  ),

  faqs: z.object({
    title: z.string(),
    desc: z.string(),
    items: z.array(
      z.object({
        text: z.string(),
        ans: z.string(),
      })
    ),
  }),

  convo: z.object({
    title: z.string(),
    desc: z.array(z.string()),
  }),

  cta: z.object({
    title: z.string(),
    actions: z.array(
      z.object({
        label: z.string(),
        to: z.string().startsWith('/'),
      })
    ),
  }),

})

export const content = contentSchema.parse(unverifiedContent)