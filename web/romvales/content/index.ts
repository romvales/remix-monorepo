import { MetaFunction } from '@remix-run/node'
import { z } from 'zod'
import contentBody from './content.yaml'

// Define the schema for the YAML
const MetatagsSchema = z.object({
  ['/']: z.custom<ReturnType<MetaFunction>>(),
  ['/contact']: z.custom<ReturnType<MetaFunction>>(),
})

const NavSchema = z.object({
  homeUrl: z.string(),
  links: z.array(z.object({
    name: z.string(),
    url: z.string(),
  })),
})

const MeSchema = z.object({
  profile: z.object({
    tagline: z.string(),
    name: z.string(),
    birthday: z.coerce.date(), // Using date type for birthday
    email: z.string().email(),
    phone: z.string(),
    social: z.array(
      z.object({
        plat: z.string(),
        url: z.string().url(),
      }),
    ),
    cv: z.string(),
    motto: z.string(),
    address: z.object({
      country: z.string(),
      state: z.string(),
      city: z.string(),
      postal: z.string().or(z.number()), // Postal code could be number or string
    }),
    cta: z.object({
      name: z.string().min(1),
      url: z.string().url(),
    }),
  }),
  
  about: z.object({
    title: z.string(),
    descriptions: z.array(z.string()),
  }),
  
  services: z.object({
    title: z.string(),
    desc: z.string(),
    copywriting: z.object({
      title: z.string(),
      desc: z.string(),
      message: z.string(),
      experiences: z.array(
        z.object({
          title: z.string(),
          packages: z.array(
            z.object({
              name: z.string(),
              price: z.number().optional(),
              featured: z.boolean().optional()
            }),
          ),
        }),
      ),
    }),

    design: z.object({
      title: z.string(),
      desc: z.string(),
      message: z.string(),
      packages: z.array(
        z.object({
          name: z.string(),
          price: z.number().optional(),
          featured: z.boolean().optional(),
        }),
      ),
    }),
  }),
  
  process: z.object({
    title: z.string(),
    message: z.string(),
    steps: z.array(
      z.object({
        title: z.string(),
        desc: z.string(),
        order: z.number().optional(),
      }),
    ),
  }),
  
  props: z.array(
    z.object({
      typ: z.string(),
      active: z.boolean().optional(),
      content: z.object({
        title: z.string(),
        desc: z.string().optional(),
        url: z.string().url().optional(),
      }),
    }),
  ),
})

const ContactSchema = z.object({
  sub: z.string(),
  message: z.string(),
  button: z.string(),
  props: z.array(
    z.object({
      typ: z.string(),
      name: z.string(),
      required: z.boolean().optional().default(false),
      attrs: z.object({
        placeholder: z.string().nullish().optional(),
        name: z.string(),
        type: z.string().optional(),
        maxLength: z.number().optional(),
        minLength: z.number().optional(),
      }),
    }),
  ),
})

const FAQSchema = z.array(
  z.object({
    question: z.string(),
    featured: z.boolean().optional().default(false),
    ans: z.array(z.string()).nullish().optional(),
  }),
)

// Main schema that combines all sections
const GlobalSchema = z.object({
  created: z.coerce.date(),
  updated: z.coerce.date(),
  title: z.string(),
  metatags: MetatagsSchema,
  nav: NavSchema,
  me: MeSchema,
  contact: ContactSchema,
  faqs: FAQSchema,
  industries: z.array(z.string()),
})

export const content = GlobalSchema.parse(contentBody)
export type GlobalType = z.infer<typeof GlobalSchema>
export default GlobalSchema