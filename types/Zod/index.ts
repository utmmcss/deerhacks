import {
  deerhacksExperienceOptions,
  deerhacksReachOptions,
  dietaryRestrictionsOptions,
  educationOptions,
  ethnicityOptions,
  genderOptions,
  hackathonExperienceOptions,
  interestsOptions,
  OTHER_SPECIFY,
  programOptions,
  pronounOptions,
  relationshipOptions,
  schoolOptions,
  shirtSizeOptions,
  teamPreferenceOptions,
} from '@/types/Application'
import { matchIsValidTel } from 'mui-tel-input'
import { boolean, enum as enumZod, infer as inferZod, literal, object, string } from 'zod'

export const textField = string()
  .trim()
  .min(1, 'Required')
  .max(128, 'Maximum Character Count Reached')
  .transform((val) => {
    return val.capitalize()
  })

export const textFieldOptional = string()
  .trim()
  .max(128, 'Maximum Character Count Reached')
  .transform((val) => {
    return val.capitalize()
  })
  .optional()

export const textArea = string().trim().max(1300, 'Maximum Character Count Reached')

export const emailField = string()
  .trim()
  .toLowerCase()
  .min(1, 'Required')
  .max(128, 'Maximum Character Count Reached')
  .email('Invalid email address')

export const urlField = string()
  .trim()
  .max(128, 'Maximum Character Count Reached')
  .url('Invalid URL')

const phoneField = textField.refine((str) => {
  return matchIsValidTel(str)
}, 'Invalid phone number')

const checkBoxRequired = literal<boolean>(true, {
  errorMap: () => ({ message: 'Required' }),
})

const ageField = string()
  .min(1, 'Required')
  .refine((str) => {
    const age = parseInt(str)
    if (age < 0) return false
    if (age > 100) return false
    return /^\d+$/.test(str)
  }, 'Invalid age')
  .refine((str) => parseInt(str) >= 18, 'Must be 18 or older to apply')

export const aboutYouZodForm = object({
  // Personal Information
  //first_name
  //last_name
  //email
  phone_number: phoneField,

  // Profile Details
  age: ageField,
  gender: enumZod(genderOptions, { required_error: 'Required' }),
  gender_other: textFieldOptional,
  pronoun: enumZod(pronounOptions, { required_error: 'Required' }),
  pronoun_other: textFieldOptional,
  ethnicity: enumZod(ethnicityOptions, { required_error: 'Required' }).array().min(1, 'Required'),
  ethnicity_other: textFieldOptional,

  // Location
  city: textField,
  country: textField,
  province: textFieldOptional,

  // Emergency Contact
  emergency_name: textField,
  emergency_number: phoneField,
  emergency_relationship: enumZod(relationshipOptions, { required_error: 'Required' }),
  emergency_relationship_other: textFieldOptional,

  // Event Preferences
  shirt_size: enumZod(shirtSizeOptions, { required_error: 'Required' }),
  diet_restriction: enumZod(dietaryRestrictionsOptions, { required_error: 'Required' })
    .array()
    .min(1, 'Required'),
  diet_restriction_other: textFieldOptional,
  additional_info: textArea.optional(),
}).superRefine(
  (
    {
      gender,
      gender_other,
      pronoun,
      pronoun_other,
      ethnicity,
      ethnicity_other,
      emergency_relationship,
      emergency_relationship_other,
      diet_restriction,
      diet_restriction_other,
    },
    refinementContext
  ) => {
    if (gender.includes(OTHER_SPECIFY) && !gender_other) {
      return refinementContext.addIssue({
        code: 'custom',
        message: 'Required',
        path: ['gender_other'],
      })
    }
    if (pronoun.includes(OTHER_SPECIFY) && !pronoun_other) {
      return refinementContext.addIssue({
        code: 'custom',
        message: 'Required',
        path: ['pronoun_other'],
      })
    }
    if (ethnicity.includes(OTHER_SPECIFY) && !ethnicity_other) {
      return refinementContext.addIssue({
        code: 'custom',
        message: 'Required',
        path: ['ethnicity_other'],
      })
    }
    if (emergency_relationship.includes(OTHER_SPECIFY) && !emergency_relationship_other) {
      return refinementContext.addIssue({
        code: 'custom',
        message: 'Required',
        path: ['emergency_relationship_other'],
      })
    }
    if (diet_restriction.includes(OTHER_SPECIFY) && !diet_restriction_other) {
      return refinementContext.addIssue({
        code: 'custom',
        message: 'Required',
        path: ['diet_restriction_other'],
      })
    }
  }
)
export type AboutYouZodForm = inferZod<typeof aboutYouZodForm>

export const experienceZodForm = object({
  // Education
  education: enumZod(educationOptions, { required_error: 'Required' }),
  education_other: textFieldOptional,
  school: enumZod(schoolOptions, {
    // need to overwrite invalid enum value error
    errorMap: () => ({ message: 'Required' }),
  }),
  school_other: textFieldOptional,
  program: enumZod(programOptions, {
    // need to overwrite invalid enum value error
    errorMap: () => ({ message: 'Required' }),
  }),
  program_other: textFieldOptional,

  // Professional Journey
  // hanatodo resume stuff
  // resume_link: urlField.min(1, 'Required'), // hanatodo i dont even know if its a url
  // resume_filename: textField,
  // resume_hash: textField,
  portfolio: urlField.or(literal('')).or(literal(undefined)),
  github: urlField.or(literal('')).or(literal(undefined)),
  linkedin: urlField.or(literal('')).or(literal(undefined)),
  resume_consent: checkBoxRequired,

  // Hacker Details
  hackathon_experience: enumZod(hackathonExperienceOptions, { required_error: 'Required' }),
  deerhacks_experience: enumZod(deerhacksExperienceOptions, { required_error: 'Required' })
    .array()
    .min(1, 'Required'),
  team_preference: enumZod(teamPreferenceOptions, { required_error: 'Required' }),
  interests: enumZod(interestsOptions, { required_error: 'Required' })
    .array()
    .min(1, 'Required')
    .max(5, 'Maximum Selection Reached'),
  interests_other: textFieldOptional,
}).superRefine(
  (
    {
      education,
      education_other,
      school,
      school_other,
      program,
      program_other,
      interests,
      interests_other,
    },
    refinementContext
  ) => {
    if (education.includes(OTHER_SPECIFY) && !education_other) {
      return refinementContext.addIssue({
        code: 'custom',
        message: 'Required',
        path: ['education_other'],
      })
    }
    if (school.includes(OTHER_SPECIFY) && !school_other) {
      return refinementContext.addIssue({
        code: 'custom',
        message: 'Required',
        path: ['school_other'],
      })
    }
    if (program.includes(OTHER_SPECIFY) && !program_other) {
      return refinementContext.addIssue({
        code: 'custom',
        message: 'Required',
        path: ['program_other'],
      })
    }
    if (interests.includes(OTHER_SPECIFY) && !interests_other) {
      return refinementContext.addIssue({
        code: 'custom',
        message: 'Required',
        path: ['interests_other'],
      })
    }
  }
)
export type ExperienceZodForm = inferZod<typeof experienceZodForm>

export const openEndedResponsesZodForm = object({
  deerhacks_pitch: textArea.min(1, 'Required'),
  shared_project: textArea.min(1, 'Required'),
  future_tech: textArea.min(1, 'Required'),
})
export type OpenEndedResponsesZodForm = inferZod<typeof openEndedResponsesZodForm>

export const deerhacksZodForm = object({
  // Reach
  deerhacks_reach: enumZod(deerhacksReachOptions, { required_error: 'Required' }),
  deerhacks_reach_other: textFieldOptional,

  // Meals
  day1_dinner: boolean(),
  day2_breakfast: boolean(),
  day2_lunch: boolean(),
  day2_dinner: boolean(),
  day3_breakfast: boolean(),

  // MLH Consent
  mlh_authorize: checkBoxRequired,
  mlh_code_agreement: checkBoxRequired,
  mlh_subscribe: boolean(),
}).superRefine(({ deerhacks_reach, deerhacks_reach_other }, refinementContext) => {
  if (deerhacks_reach.includes(OTHER_SPECIFY) && !deerhacks_reach_other) {
    return refinementContext.addIssue({
      code: 'custom',
      message: 'Required',
      path: ['deerhacks_reach_other'],
    })
  }
})
export type DeerhacksZodForm = inferZod<typeof deerhacksZodForm>
