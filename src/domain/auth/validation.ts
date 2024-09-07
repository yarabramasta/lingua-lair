import { z } from 'zod'

import { SAFE_STRING_REGEX } from '~/utils/regex'

export const signinActionSchema = z.object({
  username: z.string().min(3).regex(SAFE_STRING_REGEX),
  password: z.string().min(8).regex(SAFE_STRING_REGEX)
})

export const signinFormSchema = z.object({
  username: z
    .string()
    .min(3, 'Username is too short')
    .max(16, 'Username is too long')
    .regex(SAFE_STRING_REGEX, 'Invalid username format'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(24, 'Password is too long')
    .regex(SAFE_STRING_REGEX, 'Password is too weak')
})
