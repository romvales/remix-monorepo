import { createDirectus, rest, staticToken } from '@directus/sdk'
import invariant from 'tiny-invariant'

const url = process.env.DIRECTUS_URL
const token = process.env.DIRECTUS_TOKEN

invariant(url, 'Environment variable `process.env.DIRECTUS_URL` is missing.')
invariant(token, 'Environment variable `process.env.DIRECTUS_TOKEN` is missing.')

export const createClient = <T>() => createDirectus<T>(url).with(staticToken(token)).with(rest())