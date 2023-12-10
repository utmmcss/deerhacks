export type ApplicationGetResp = {
  application: Application
  is_draft: boolean
}

export type ApplicationUpdateReq = {
  application: Application
  is_draft: boolean
}

export type Application = {
  /**
   * The following fields are part of the User so they are not in the form
   *
   * first_name: string
   * last_name: string
   * email: string
   */

  phone_number: string
  is_subscribed: boolean

  age: number
  gender: (typeof genderOptions)[number] | string
  pronoun: (typeof pronounOptions)[number] | string
  ethnicity: ((typeof ethnicityOptions)[number] | string)[]
  country: string
  city: string
  province?: string

  emergency_name: string
  emergency_number: string
  emergency_relationship: (typeof relationshipOptions)[number] | string

  shirt_size: (typeof shirtSizeOptions)[number]
  diet_restriction: ((typeof dietaryRestrictionsOptions)[number] | string)[]
  additional_info?: string

  education: (typeof educationOptions)[number] | string
  school: (typeof schoolOptions)[number] | string
  program: (typeof programOptions)[number] | string

  resume_link: string
  resume_filename: string
  resume_hash: string
  portfolio?: string
  github?: string
  linkedin?: string
  resume_consent: boolean

  hackathon_experience: (typeof hackathonExperienceOptions)[number]
  deerhacks_experience: (typeof deerhacksExperienceOptions)[number][]
  team_preference: (typeof teamPreferenceOptions)[number]
  interests: ((typeof interestsOptions)[number] | string)[]

  deerhacks_pitch: string
  shared_project: string
  future_tech: string

  deerhacks_reach: (typeof deerhacksReachOptions)[number] | string

  day1_dinner: boolean
  day2_breakfast: boolean
  day2_lunch: boolean
  day2_dinner: boolean
  day3_breakfast: boolean

  mlh_authorize: boolean
  mlh_code_agreement: boolean
  mlh_subscribe: boolean
}

export const genderOptions = ['Male', 'Female', 'Prefer not to say', 'Other (Specify)'] as const

export const pronounOptions = ['He / Him', 'She / Her', 'They / Them', 'Other (Specify)'] as const

export const ethnicityOptions = [
  'Asian',
  'Black or African',
  'First Nations',
  'Hispanic or Latino',
  'Inuit',
  'Métis',
  'White',
  'Prefer not to say',
  'Other (Specify)',
] as const

export const relationshipOptions = [
  'Parent / Guardian',
  'Sibling',
  'Spouse',
  'Friend',
  'Other (Specify)',
] as const

export const shirtSizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL'] as const

export const dietaryRestrictionsOptions = [
  'None',
  'Dairy free',
  'Gluten free',
  'Halal',
  'Kosher',
  'Nut Allergy',
  'Vegan',
  'Vegetarian',
  'Other (Specify)',
] as const

export const educationOptions = [
  'Secondary / High School',
  "Undergraduate (Bachelor's Degree)",
  "Graduate (Master's Degree)",
  'Doctoral / PhD',
  'Other (Specify)',
] as const

export const schoolOptions = [
  'UofT',
  // hanatodo
  'Other (Specify)',
] as const

export const programOptions = [
  'CS',
  // hanatodo
  'Other (Specify)',
] as const

export const hackathonExperienceOptions = [
  'Rookie (This is my first hackathon)',
  'Enthusiast (1-2 hackathons)',
  'Veteran (3-5 hackathons)',
  'Expert (5+ hackathons)',
] as const

export const deerhacksExperienceOptions = [
  'First time attending DeerHacks',
  'DeerHacks I (April 2022)',
  'DeerHacks II (April 2023)',
] as const

export const teamPreferenceOptions = [
  'Hacker with a team',
  'Solo hacker looking for a team',
  'Solo hacker who doesn’t need a team',
] as const

export const interestsOptions = [
  'Web Development',
  'Mobile App Development',
  'Data Science & Analytics',
  'Artificial Intelligence',
  'Machine Learning',
  'Augmented & Virtual Reality',
  'Blockchain',
  'Cybersecurity',
  'Cloud Technologies',
  'Game Development',
  'Robotics',
  'Natural Language Processing (NLP)',
  'Computer Vision',
  'Bioinformatics',
  'Financial Technology',
  '3D Printing / CAD',
  'Product Management',
  'Business & Entrepreneurship',
  'Digital Marketing',
  'UX/UI Design',
  'Other (Specify)',
] as const // anthony added embedded systems in enum but its not on doc

export const deerhacksReachOptions = [
  'DeerHacks Instagram Page',
  'MCSS Instagram Page',
  'LinkedIn Announcement',
  'University or College Announcement', // change this to UofT?
  'Word of Mouth',
  'DeerHacks Website',
  'Major League Hacking Website',
  'Email Newsletter',
  'Previous Event Participation',
  'In-person Advertising',
  'Other (Specify)',
] as const
