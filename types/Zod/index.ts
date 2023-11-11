import { string } from 'zod'

export const textField = string()
  .trim()
  .min(1, 'Required')
  .transform((val) => {
    return val.title()
  })

export const textFieldOptional = string()
  .trim()
  .transform((val) => {
    return val.title()
  })
  .optional()

export const emailField = string()
  .trim()
  .toLowerCase()
  .min(1, 'Required')
  .email('Invalid email address')
