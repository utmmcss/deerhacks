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
  school: string
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

export const OTHER_SPECIFY = 'Other (Specify)'

export const genderOptions = ['Male', 'Female', 'Prefer not to say', OTHER_SPECIFY] as const

export const pronounOptions = ['He / Him', 'She / Her', 'They / Them', OTHER_SPECIFY] as const

export const ethnicityOptions = [
  'Asian',
  'Black or African',
  'First Nations',
  'Hispanic or Latino',
  'Inuit',
  'Métis',
  'White',
  'Prefer not to say',
  OTHER_SPECIFY,
] as const

export const relationshipOptions = [
  'Parent / Guardian',
  'Sibling',
  'Spouse',
  'Friend',
  OTHER_SPECIFY,
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
  OTHER_SPECIFY,
] as const

export const educationOptions = [
  'Secondary / High School',
  "Undergraduate (Bachelor's Degree)",
  "Graduate (Master's Degree)",
  'Doctoral / PhD',
  OTHER_SPECIFY,
] as const

// get school options with API
export type SchoolListReq = { partial_name?: string }
export type SchoolListResp = {
  name: string
  [key: string]: any
}[]

export const programOptions = [
  'Accounting',
  'Actuarial Science',
  'Advertising and Public Relations',
  'Aerospace Engineering',
  'Agricultural Economics',
  'Agriculture Production and Management',
  'Animal Sciences',
  'Anthropology and Archeology',
  'Applied Mathematics',
  'Architectural Engineering',
  'Architecture',
  'Area Ethnic and Civilization Studies',
  'Art History and Criticism',
  'Art and Music Education',
  'Astronomy and Astrophysics',
  'Atmospheric Sciences and Meteorology',
  'Biochemical Sciences',
  'Biological Engineering',
  'Biology',
  'Biomedical Engineering',
  'Botany',
  'Business Economics',
  'Business Management and Administration',
  'Chemical Engineering',
  'Chemistry',
  'Civil Engineering',
  'Clinical Psychology',
  'Cognitive Science and Biopsychology',
  'Commercial Art and Graphic Design',
  'Communication Disorders Sciences and Services',
  'Communication Technologies',
  'Communications',
  'Community and Public Health',
  'Composition and Rhetoric',
  'Computer Administration Management and Security',
  'Computer Engineering',
  'Computer Networking and Telecommunications',
  'Computer Programming and Data Processing',
  'Computer Science',
  'Computer and Information Systems',
  'Construction Services',
  'Cosmetology Services and Culinary Arts',
  'Counseling Psychology',
  'Court Reporting',
  'Criminal Justice and Fire Protection',
  'Criminology',
  'Drama and Theater Arts',
  'Early Childhood Education',
  'Ecology',
  'Economics',
  'Educational Administration and Supervision',
  'Educational Psychology',
  'Electrical Engineering',
  'Electrical Engineering Technology',
  'Electrical, Mechanical, and Precision Technologies and Production',
  'Elementary Education',
  'Engineering Mechanics Physics and Science',
  'Engineering Technologies',
  'Engineering and Industrial Management',
  'English Language and Literature',
  'Environmental Engineering',
  'Environmental Science',
  'Family and Consumer Sciences',
  'Film Video and Photographic Arts',
  'Finance',
  'Fine Arts',
  'Food Science',
  'Forestry',
  'French German Latin and Other Common Foreign Language Studies',
  'General Agriculture',
  'General Business',
  'General Education',
  'General Engineering',
  'General Medical and Health Services',
  'General Social Sciences',
  'Genetics',
  'Geography',
  'Geological and Geophysical Engineering',
  'Geology and Earth Science',
  'Geosciences',
  'Health and Medical Administrative Services',
  'Health and Medical Preparatory Programs',
  'History',
  'Hospitality Management',
  'Human Resources and Personnel Management',
  'Human Services and Community Organization',
  'Humanities',
  'Industrial Production Technologies',
  'Industrial and Manufacturing Engineering',
  'Industrial and Organizational Psychology',
  'Information Sciences',
  'Intercultural and International Studies',
  'Interdisciplinary Social Sciences',
  'International Business',
  'International Relations',
  'Journalism',
  'Language and Drama Education',
  'Liberal Arts',
  'Library Science',
  'Linguistics and Comparative Language and Literature',
  'Management Information Systems and Statistics',
  'Marketing and Marketing Research',
  'Mass Media',
  'Materials Engineering and Materials Science',
  'Materials Science',
  'Mathematics',
  'Mathematics Teacher Education',
  'Mathematics and Computer Science',
  'Mechanical Engineering',
  'Mechanical Engineering Related Technologies',
  'Medical Assisting Services',
  'Medical Technologies Technicians',
  'Metallurgical Engineering',
  'Microbiology',
  'Military Technologies',
  'Mining and Mineral Engineering',
  'Miscellaneous Agriculture',
  'Miscellaneous Biology',
  'Miscellaneous Business & Medical Administration',
  'Miscellaneous Education',
  'Miscellaneous Engineering',
  'Miscellaneous Engineering Technologies',
  'Miscellaneous Fine Arts',
  'Miscellaneous Health Medical Professions',
  'Miscellaneous Psychology',
  'Miscellaneous Social Sciences',
  'Molecular Biology',
  'Multi-Disciplinary Or General Science',
  'Multi/interdisciplinary Studies',
  'Music',
  'Natural Resources Management',
  'Naval Architecture and Marine Engineering',
  'Neuroscience',
  'Nuclear Engineering',
  'Nuclear, Industrial Radiology, and Biological Technologies',
  'Nursing',
  'Nutrition Sciences',
  'Oceanography',
  'Operations Logistics and E-Commerce',
  'Other Foreign Languages',
  'Petroleum Engineering',
  'Pharmacology',
  'Pharmacy Pharmaceutical Sciences and Administration',
  'Philosophy and Religious Studies',
  'Physical Fitness Parks Recreation and Leisure',
  'Physical Sciences',
  'Physical and Health Education Teaching',
  'Physics',
  'Physiology',
  'Plant Science and Agronomy',
  'Political Science and Government',
  'Pre-Law and Legal Studies',
  'Psychology',
  'Public Administration',
  'Public Policy',
  'School Student Counseling',
  'Science and Computer Teacher Education',
  'Secondary Teacher Education',
  'Social Psychology',
  'Social Science Or History Teacher Education',
  'Social Work',
  'Sociology',
  'Soil Science',
  'Special Needs Education',
  'Statistics and Decision Science',
  'Studio Arts',
  'Teacher Education: Multiple Levels',
  'Theology and Religious Vocations',
  'Transportation Sciences and Technologies',
  'Treatment Therapy Professions',
  'United States History',
  'Visual and Performing Arts',
  'Zoology',
  OTHER_SPECIFY,
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
  OTHER_SPECIFY,
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
  OTHER_SPECIFY,
] as const
