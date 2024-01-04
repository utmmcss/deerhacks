import {
  Application,
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
import {
  AboutYouZodForm,
  DeerhacksZodForm,
  ExperienceZodForm,
  OpenEndedResponsesZodForm,
} from '@/types/Zod'

export const toDropdownType = <T extends any>(
  options: readonly T[],
  value: string
): T | undefined => {
  if (!value) return undefined
  return (options as unknown as string[]).includes(value) ? (value as T) : (OTHER_SPECIFY as T)
}

export const toMultiSelectType = <T extends any>(
  options: readonly T[],
  value: string[]
): { options: T[]; other: string } => {
  if (!value) return { options: [], other: '' }
  const selected = value.filter(function (item, pos, self) {
    return self.indexOf(item) == pos
  })
  const i = selected.findIndex((val) => !(options as unknown as string[]).includes(val))
  const other = i !== -1 ? selected.splice(i, 1)[0] : ''
  return { options: selected as T[], other }
}

const appToAboutForm = (application: Application) => {
  const gender = toDropdownType(genderOptions, application.gender)
  const pronoun = toDropdownType(pronounOptions, application.pronoun)
  const { options: ethnicity, other: ethnicity_other } = toMultiSelectType(
    ethnicityOptions,
    application.ethnicity
  )
  const emergency_relationship = toDropdownType(
    relationshipOptions,
    application.emergency_relationship
  )
  const { options: diet_restriction, other: diet_restriction_other } = toMultiSelectType(
    dietaryRestrictionsOptions,
    application.diet_restriction
  )

  return {
    // Personal Information
    phone_number: application.phone_number,

    // Set in first user update
    is_subscribed: true,

    // Profile Details
    age: application.age == 0 ? undefined : application.age.toString(),
    gender,
    ...(gender == OTHER_SPECIFY && { gender_other: application.gender }),
    pronoun,
    ...(pronoun == OTHER_SPECIFY && { pronoun_other: application.pronoun }),
    ethnicity,
    ethnicity_other,

    // Location
    city: application.city,
    country: application.country,
    province: application.province,

    // Emergency Contact
    emergency_name: application.emergency_name,
    emergency_number: application.emergency_number,
    emergency_relationship,
    ...(emergency_relationship == OTHER_SPECIFY && {
      emergency_relationship_other: application.emergency_relationship,
    }),

    // Event Preferences
    ...(application.shirt_size && {
      shirt_size: application.shirt_size as (typeof shirtSizeOptions)[number],
    }),
    diet_restriction,
    diet_restriction_other,
    additional_info: application.additional_info,
  }
}

const appToExpForm = (application: Application) => {
  const education = toDropdownType(educationOptions, application.education)
  const school = toDropdownType(schoolOptions, application.school)
  const program = toDropdownType(programOptions, application.program)
  const hackathon_experience = toDropdownType(
    hackathonExperienceOptions,
    application.hackathon_experience
  )
  const team_preference = toDropdownType(teamPreferenceOptions, application.team_preference)
  const { options: interests, other: interests_other } = toMultiSelectType(
    interestsOptions,
    application.interests
  )
  const { options: deerhacks_experience } = toMultiSelectType(
    deerhacksExperienceOptions,
    application.deerhacks_experience
  )

  return {
    // Education
    education,
    ...(education == OTHER_SPECIFY && { education_other: application.education }),
    school,
    ...(school == OTHER_SPECIFY && { school_other: application.school }),
    program,
    ...(program == OTHER_SPECIFY && { program_other: application.program }),

    // Professional Journey
    resume_link: application.resume_link,
    resume_file_name: application.resume_file_name,
    resume_update_count: application.resume_update_count,
    ...(application.portfolio && { portfolio: application.portfolio }),
    ...(application.github && { github: application.github }),
    ...(application.linkedin && { linkedin: application.linkedin }),
    resume_consent: application.resume_consent,

    // Hacker Details
    hackathon_experience,
    deerhacks_experience,
    team_preference,
    interests,
    interests_other,
  }
}

const appToOpenResponseForm = (application: Application) => {
  return {
    deerhacks_pitch: application.deerhacks_pitch,
    shared_project: application.shared_project,
    future_tech: application.future_tech,
  }
}

const appToDeerHacksForm = (application: Application) => {
  const deerhacks_reach = toDropdownType(deerhacksReachOptions, application.deerhacks_reach)

  return {
    // Reach
    deerhacks_reach,
    ...(deerhacks_reach == OTHER_SPECIFY && {
      deerhacks_reach_other: application.deerhacks_reach,
    }),

    // Meals
    day1_dinner: application.day1_dinner,
    day2_breakfast: application.day2_breakfast,
    day2_lunch: application.day2_lunch,
    day2_dinner: application.day2_dinner,
    day3_breakfast: application.day3_breakfast,

    // MLH Permissions
    mlh_authorize: application.mlh_authorize,
    mlh_code_agreement: application.mlh_code_agreement,
    mlh_subscribe: application.mlh_subscribe,
  }
}

export const appToFormMap = {
  AboutYou: appToAboutForm,
  Experience: appToExpForm,
  OpenEndedResponses: appToOpenResponseForm,
  DeerHacks: appToDeerHacksForm,
}

const aboutFormToApp = (form: AboutYouZodForm, currApplication: Application) => {
  const currEthnicity = [...currApplication.ethnicity] ?? []
  const newEthnicity = form.ethnicity.includes(OTHER_SPECIFY)
    ? (form.ethnicity as string[]).concat([form.ethnicity_other ?? ''])
    : form.ethnicity
  const ethnicity = currEthnicity.slice()
  ethnicity.splice(0, currEthnicity.length, ...newEthnicity)

  const currDiet = [...currApplication.diet_restriction] ?? []
  const newDiet = form.diet_restriction.includes(OTHER_SPECIFY)
    ? (form.diet_restriction as string[]).concat([form.diet_restriction_other ?? ''])
    : form.diet_restriction
  const diet_restriction = currDiet.slice()
  diet_restriction.splice(0, currDiet.length, ...newDiet)

  return {
    ...currApplication,

    // Personal Information
    phone_number: form.phone_number,

    // Set in first user update
    is_subscribed: true,

    // Profile Details
    age: parseInt(form.age),
    gender: form.gender == OTHER_SPECIFY ? form.gender_other ?? '' : form.gender,
    pronoun: form.pronoun == OTHER_SPECIFY ? form.pronoun_other ?? '' : form.pronoun,
    ethnicity,

    // Location
    city: form.city,
    country: form.country,
    province: form.province,

    // Emergency Contact
    emergency_name: form.emergency_name,
    emergency_number: form.emergency_number,
    emergency_relationship:
      form.emergency_relationship == OTHER_SPECIFY
        ? form.emergency_relationship_other ?? ''
        : form.emergency_relationship,

    // Event Preferences
    shirt_size: form.shirt_size,
    diet_restriction,
    additional_info: form.additional_info ?? '',
  }
}

const expFormToApp = (form: ExperienceZodForm, currApplication: Application): Application => {
  const currInterests = [...currApplication.interests] ?? []
  const newInterests = form.interests.includes(OTHER_SPECIFY)
    ? (form.interests as string[]).concat([form.interests_other ?? ''])
    : form.interests
  const interests = currInterests.slice()
  interests.splice(0, currInterests.length, ...newInterests)

  return {
    ...currApplication,

    // Education
    resume_link: form.resume_link,
    resume_file_name: form.resume_file_name,
    resume_update_count: form.resume_update_count,
    education: form.education == OTHER_SPECIFY ? form.education_other ?? '' : form.education,
    school: form.school == OTHER_SPECIFY ? form.school_other ?? '' : form.school,
    program: form.program == OTHER_SPECIFY ? form.program_other ?? '' : form.program,

    // Professional Journey
    portfolio: form.portfolio,
    github: form.github,
    linkedin: form.linkedin,
    resume_consent: form.resume_consent,

    // Hacker Details
    hackathon_experience: form.hackathon_experience,
    deerhacks_experience: form.deerhacks_experience,
    team_preference: form.team_preference,
    interests,
  }
}

const openResponseFormToApp = (
  form: OpenEndedResponsesZodForm,
  currApplication: Application
): Application => {
  return {
    ...currApplication,

    deerhacks_pitch: form.deerhacks_pitch ?? '',
    shared_project: form.shared_project ?? '',
    future_tech: form.future_tech ?? '',
  }
}

const deerhacksFormToApp = (form: DeerhacksZodForm, currApplication: Application): Application => {
  return {
    ...currApplication,

    // Reach
    deerhacks_reach:
      form.deerhacks_reach == OTHER_SPECIFY
        ? form.deerhacks_reach_other ?? ''
        : form.deerhacks_reach,

    // Meals
    day1_dinner: form.day1_dinner,
    day2_breakfast: form.day2_breakfast,
    day2_lunch: form.day2_lunch,
    day2_dinner: form.day2_dinner,
    day3_breakfast: form.day3_breakfast,

    // MLH Permissions
    mlh_authorize: form.mlh_authorize,
    mlh_code_agreement: form.mlh_code_agreement,
    mlh_subscribe: form.mlh_subscribe,
  }
}

export const formToAppMap = {
  AboutYou: aboutFormToApp,
  Experience: expFormToApp,
  OpenEndedResponses: openResponseFormToApp,
  DeerHacks: deerhacksFormToApp,
}
