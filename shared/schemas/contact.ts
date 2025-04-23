import { z } from 'zod'

export const contactWithServicesSchema = z.object({
  ['cf-turnstile-response']: z.string().min(1),
  services: z.array(z.string()).nullish(),
  country: z.string().min(1),
  name: z.string().min(1),
  email: z.string().email(),
  gender: z.enum([ 'male', 'female', 'other' ]).default('male'),
  companyName: z.string().min(1),
  industry: z.string().min(1),
  message: z.string().min(1),
})
