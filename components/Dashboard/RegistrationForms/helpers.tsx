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
  programOptions,
  pronounOptions,
  relationshipOptions,
  SchoolListResp,
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
  if (!value) return
  return (options as unknown as string[]).includes(value) ? (value as T) : ('Other (Specify)' as T)
}

export const toMultiSelectType = <T extends any>(
  options: readonly T[],
  value: string[]
): { options: T[]; other: string } => {
  if (!value) return { options: [], other: '' }
  const selected = [...value]
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
    is_subscribed: true, // always true because we mention it in user update modal

    // Profile Details
    age: application.age == 0 ? undefined : application.age.toString(),
    gender,
    ...(gender == 'Other (Specify)' && { gender_other: application.gender }),
    pronoun,
    ...(pronoun == 'Other (Specify)' && { pronoun_other: application.pronoun }),
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
    ...(emergency_relationship == 'Other (Specify)' && {
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

const appToExpForm = (application: Application, schoolOptions: string[]) => {
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
    ...(education == 'Other (Specify)' && { education_other: application.education }),
    school,
    ...(school == 'Other (Specify)' && { school_other: application.school }),
    program,
    ...(program == 'Other (Specify)' && { program_other: application.program }),

    // Professional Journey
    // hanatodo
    //resume_link: string
    //resume_filename: string
    //resume_hash: string
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
    ...(deerhacks_reach == 'Other (Specify)' && {
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
  const newEthnicity = form.ethnicity.includes('Other (Specify)')
    ? (form.ethnicity as string[]).concat([form.ethnicity_other ?? ''])
    : form.ethnicity
  const ethnicity = currEthnicity.toSpliced(0, currEthnicity.length, ...newEthnicity)

  const currDiet = [...currApplication.diet_restriction] ?? []
  const newDiet = form.diet_restriction.includes('Other (Specify)')
    ? (form.diet_restriction as string[]).concat([form.diet_restriction_other ?? ''])
    : form.diet_restriction
  const diet_restriction = currDiet.toSpliced(0, currDiet.length, ...newDiet)

  return {
    ...currApplication,

    // Personal Information
    phone_number: form.phone_number,
    is_subscribed: true, // always true because we mention it in user update modal

    // Profile Details
    age: parseInt(form.age),
    gender: form.gender == 'Other (Specify)' ? form.gender_other ?? '' : form.gender,
    pronoun: form.pronoun == 'Other (Specify)' ? form.pronoun_other ?? '' : form.pronoun,
    ethnicity,

    // Location
    city: form.city,
    country: form.country,
    province: form.province,

    // Emergency Contact
    emergency_name: form.emergency_name,
    emergency_number: form.emergency_number,
    emergency_relationship:
      form.emergency_relationship == 'Other (Specify)'
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
  const newInterests = form.interests.includes('Other (Specify)')
    ? (form.interests as string[]).concat([form.interests_other ?? ''])
    : form.interests
  const interests = currInterests.toSpliced(0, currInterests.length, ...newInterests)

  return {
    ...currApplication,

    // Education
    education: form.education == 'Other (Specify)' ? form.education_other ?? '' : form.education,
    school: form.school == 'Other (Specify)' ? form.school_other ?? '' : form.school,
    program: form.program == 'Other (Specify)' ? form.program_other ?? '' : form.program,

    // Professional Journey
    // hanatodo
    //resume_link: string
    //resume_filename: string
    //resume_hash: string
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
      form.deerhacks_reach == 'Other (Specify)'
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

export const getSchoolOptions = (data: SchoolListResp) => {
  return (data?.map((val) => val.name) ?? []).sort().concat('Other (Specify)')
}
