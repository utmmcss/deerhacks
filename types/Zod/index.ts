import { string } from 'zod'

export const textField = string()
  .trim()
  .min(1, 'Required')
  .transform((val) => {
    return val.capitalize()
  })

export const textFieldOptional = string()
  .trim()
  .transform((val) => {
    return val.capitalize()
  })
  .optional()

export const emailField = string()
  .trim()
  .toLowerCase()
  .min(1, 'Required')
  .email('Invalid email address')
