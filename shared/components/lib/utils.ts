import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { serialize } from 'object-to-formdata'
import { parseFormData } from 'parse-nested-form-data'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const parseForm = parseFormData
export const serializeForm = serialize