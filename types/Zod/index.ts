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
import {
  boolean,
  enum as enumZod,
  infer as inferZod,
  intersection,
  literal,
  object,
  string,
} from 'zod'

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

export const textArea = string().trim().max(1500, 'Maximum Character Count Reached')

export const emailField = string()
  .trim()
  .toLowerCase()
  .min(1, 'Required')
  .max(128, 'Maximum Character Count Reached')
  .email('Invalid Email Address')

export const urlField = string()
  .trim()
  .max(128, 'Maximum Character Count Reached')
  .url('Invalid URL')

const phoneField = textField.refine((str) => {
  return matchIsValidTel(str)
}, 'Invalid Phone Number')

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
  }, 'Invalid Age')
  .refine((str) => parseInt(str) >= 18, 'Must be 18+ to Apply')

const gender = object({
  gender: enumZod(genderOptions, { required_error: 'Required' }),
  gender_other: textFieldOptional,
}).superRefine(({ gender, gender_other }, refinementContext) => {
  if (gender.includes(OTHER_SPECIFY) && !gender_other) {
    refinementContext.addIssue({
      code: 'custom',
      message: 'Required',
      path: ['gender_other'],
    })
  }
  return refinementContext
})

const pronoun = object({
  pronoun: enumZod(pronounOptions, { required_error: 'Required' }),
  pronoun_other: textFieldOptional,
}).superRefine(({ pronoun, pronoun_other }, refinementContext) => {
  if (pronoun.includes(OTHER_SPECIFY) && !pronoun_other) {
    refinementContext.addIssue({
      code: 'custom',
      message: 'Required',
      path: ['pronoun_other'],
    })
  }
  return refinementContext
})

const ethnicity = object({
  ethnicity: enumZod(ethnicityOptions, { required_error: 'Required' }).array().min(1, 'Required'),
  ethnicity_other: textFieldOptional,
}).superRefine(({ ethnicity, ethnicity_other }, refinementContext) => {
  if (ethnicity.includes(OTHER_SPECIFY) && !ethnicity_other) {
    refinementContext.addIssue({
      code: 'custom',
      message: 'Required',
      path: ['ethnicity_other'],
    })
  }
  return refinementContext
})

const emergency_relationship = object({
  emergency_relationship: enumZod(relationshipOptions, { required_error: 'Required' }),
  emergency_relationship_other: textFieldOptional,
}).superRefine(({ emergency_relationship, emergency_relationship_other }, refinementContext) => {
  if (emergency_relationship.includes(OTHER_SPECIFY) && !emergency_relationship_other) {
    refinementContext.addIssue({
      code: 'custom',
      message: 'Required',
      path: ['emergency_relationship_other'],
    })
  }
  return refinementContext
})

const diet_restriction = object({
  diet_restriction: enumZod(dietaryRestrictionsOptions, { required_error: 'Required' })
    .array()
    .min(1, 'Required'),
  diet_restriction_other: textFieldOptional,
}).superRefine(({ diet_restriction, diet_restriction_other }, refinementContext) => {
  if (diet_restriction.includes(OTHER_SPECIFY) && !diet_restriction_other) {
    refinementContext.addIssue({
      code: 'custom',
      message: 'Required',
      path: ['diet_restriction_other'],
    })
  }
  return refinementContext
})

export const aboutYouZodForm = intersection(
  gender.and(pronoun).and(ethnicity).and(emergency_relationship).and(diet_restriction),
  object({
    phone_number: phoneField,
    age: ageField,
    city: textField,
    country: textField,
    province: textFieldOptional,
    emergency_name: textField,
    emergency_number: phoneField,
    shirt_size: enumZod(shirtSizeOptions, { required_error: 'Required' }),
    additional_info: textArea.max(128, 'Maximum Character Count Reached').optional(),
  })
)
export type AboutYouZodForm = inferZod<typeof aboutYouZodForm>

const education = object({
  education: enumZod(educationOptions, { required_error: 'Required' }),
  education_other: textFieldOptional,
}).superRefine(({ education, education_other }, refinementContext) => {
  if (education.includes(OTHER_SPECIFY) && !education_other) {
    refinementContext.addIssue({
      code: 'custom',
      message: 'Required',
      path: ['education_other'],
    })
  }
  return refinementContext
})

const school = object({
  school: enumZod(schoolOptions, {
    // need to overwrite invalid enum value error
    errorMap: () => ({ message: 'Required' }),
  }),
  school_other: textFieldOptional,
}).superRefine(({ school, school_other }, refinementContext) => {
  if (school.includes(OTHER_SPECIFY) && !school_other) {
    refinementContext.addIssue({
      code: 'custom',
      message: 'Required',
      path: ['school_other'],
    })
  }
  return refinementContext
})

const program = object({
  program: enumZod(programOptions, {
    // need to overwrite invalid enum value error
    errorMap: () => ({ message: 'Required' }),
  }),
  program_other: textFieldOptional,
}).superRefine(({ program, program_other }, refinementContext) => {
  if (program.includes(OTHER_SPECIFY) && !program_other) {
    refinementContext.addIssue({
      code: 'custom',
      message: 'Required',
      path: ['program_other'],
    })
  }
  return refinementContext
})

const interests = object({
  interests: enumZod(interestsOptions, { required_error: 'Required' })
    .array()
    .min(1, 'Required')
    .max(5, 'Maximum Selection Reached'),
  interests_other: textFieldOptional,
}).superRefine(({ interests, interests_other }, refinementContext) => {
  if (interests.includes(OTHER_SPECIFY) && !interests_other) {
    refinementContext.addIssue({
      code: 'custom',
      message: 'Required',
      path: ['interests_other'],
    })
  }
  return refinementContext
})

export const experienceZodForm = intersection(
  education.and(school).and(program).and(interests),
  object({
    // TODO: Resume Stuff
    // resume_link: urlField.min(1, 'Required'),
    // resume_filename: textField,
    // resume_hash: textField,
    portfolio: urlField.or(literal('')).or(literal(undefined)),
    github: urlField.or(literal('')).or(literal(undefined)),
    linkedin: urlField.or(literal('')).or(literal(undefined)),
    resume_consent: checkBoxRequired,
    hackathon_experience: enumZod(hackathonExperienceOptions, { required_error: 'Required' }),
    deerhacks_experience: enumZod(deerhacksExperienceOptions, { required_error: 'Required' })
      .array()
      .min(1, 'Required'),
    team_preference: enumZod(teamPreferenceOptions, { required_error: 'Required' }),
  })
)
export type ExperienceZodForm = inferZod<typeof experienceZodForm>

export const openEndedResponsesZodForm = object({
  deerhacks_pitch: textArea.min(1, 'Required'),
  shared_project: textArea.min(1, 'Required'),
  future_tech: textArea.min(1, 'Required'),
})
export type OpenEndedResponsesZodForm = inferZod<typeof openEndedResponsesZodForm>

const deerhacks_reach = object({
  deerhacks_reach: enumZod(deerhacksReachOptions, { required_error: 'Required' }),
  deerhacks_reach_other: textFieldOptional,
}).superRefine(({ deerhacks_reach, deerhacks_reach_other }, refinementContext) => {
  if (deerhacks_reach.includes(OTHER_SPECIFY) && !deerhacks_reach_other) {
    refinementContext.addIssue({
      code: 'custom',
      message: 'Required',
      path: ['deerhacks_reach_other'],
    })
  }
  return refinementContext
})

export const deerhacksZodForm = intersection(
  deerhacks_reach,
  object({
    day1_dinner: boolean(),
    day2_breakfast: boolean(),
    day2_lunch: boolean(),
    day2_dinner: boolean(),
    day3_breakfast: boolean(),
    mlh_authorize: checkBoxRequired,
    mlh_code_agreement: checkBoxRequired,
    mlh_subscribe: boolean(),
  })
)
export type DeerhacksZodForm = inferZod<typeof deerhacksZodForm>
