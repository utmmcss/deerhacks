export type ApplicationGetResp = {
  application: Omit<Application, 'resume_file_name' | 'resume_link' | 'resume_update_count'>
  is_draft: boolean
}

export type ApplicationUpdateReq = {
  application: Application
  is_draft: boolean
}

export type ResumeUpdateResp = {
  resume_file_name: string
  resume_link: string
  resume_update_count: number
}

export type ResumeGetResp = ResumeUpdateResp | {}

export type Application = {
  /**
   * User Fields, Outside of Application
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

  // Resume Fields, Outside of Application Endpoint
  resume_link: string
  resume_file_name: string
  resume_update_count: number

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
  'Arab',
  'Black',
  'Chinese',
  'Filipino',
  'Indigenous',
  'Japanese',
  'Korean',
  'Latin American',
  'South Asian',
  'Southeast Asian',
  'West Asian',
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

export const schoolOptions = [
  'Acadia University',
  'Algonquin College',
  'Ashton College',
  'Assumption University',
  'Athabasca University',
  'Augustana University College',
  "Bishop's University",
  'Bow Valley College',
  'Brandon University',
  'British Columbia Institute of Technology',
  'British Columbia Open University',
  'Brock University',
  'Camosun College',
  'Canadian College of Business & Computers',
  'Canadian Mennonite University',
  'Capilano College',
  'Carleton University',
  'Centennial College',
  'College of Bois-de-Boulogne',
  'College of New Caledonia',
  'College of the Rockies',
  'Collège Boréal',
  'Collège Universel Gatineau',
  'Columbia College',
  'Concordia University',
  'Concordia University College of Alberta',
  'Conestoga College',
  'Cégep de Saint-Jérôme',
  'Dalhousie University',
  'DeVry Institute of Technology',
  'Dominican College of Philosophy & Theology',
  'Douglas College',
  'Durham College',
  'Emily Carr Institute of Art & Design',
  'École Polytechnique de Montréal, Université de Montréal',
  'École de technologie supérieure, Université du Québec',
  'École des Hautes Études Commerciales',
  "École nationale d'administration publique, Université du Québec",
  'Fanshawe College',
  'First Nations University of Canada',
  'George Brown College',
  'Humber College',
  'Huron University College',
  'Institut Armand-Frappier, Université du Québec',
  'Institut National de la Recherche Scientifique, Université du Québec',
  "King's University College",
  'Kingston College',
  'Kwantleen University College',
  'Lakehead University',
  'Lambton College',
  'Langara College',
  'Lansbridge University',
  'Laurentian University of Sudbury',
  'Luther College',
  'MacEwan University',
  'Malaspina University College',
  'McGill University',
  'McMaster University',
  'Memorial University of Newfoundland',
  'Mohawk College',
  'Mount Allison University',
  'Mount Royal University',
  'Mount Saint Vincent University',
  'Nicola Valley Institute of Technology',
  'Nipissing University',
  'North Island College',
  'Northern Alberta Institute of Technology',
  'Northern Lights College',
  'Nova Scotia Agricultural College',
  'Nova Scotia College of Art & Design',
  'Okanagan University College',
  'Ontario College of Art & Design',
  'Ontario Tech University',
  'Pacific International College',
  "Queen's University",
  'Quest University',
  'Redeemer College',
  'Regent College',
  'Royal Military College of Canada',
  'Royal Roads University',
  'Ryerson Polytechnic University',
  'Saskatchewan Indian Federated College',
  'Sauder School of Business',
  'Selkirk College',
  'Seneca College',
  'Sheridan College',
  'Simon Fraser University',
  'Southern Alberta Institute of Technology',
  'St. Anne University',
  'St. Clair College',
  'St. Francis Xavier University',
  "St. Mary's University",
  'St. Paul University',
  'St. Thomas University',
  'Thompson Rivers University',
  'Toronto Metropolitan University',
  'Trent University',
  'Trinity Western University',
  'Télé-université, Université du Québec',
  'University Canada West',
  'University College of Cape Breton',
  'University College of Saint-Boniface',
  'University College of the Cariboo',
  'University of Alberta',
  'University of British Columbia',
  'University of Calgary',
  'University of Guelph',
  "University of King's College",
  'University of Lethbridge',
  'University of Manitoba',
  'University of Moncton',
  'University of Moncton, Edmundston',
  'University of Moncton, Shippagan',
  'University of New Brunswick',
  'University of New Brunswick, Saint John',
  'University of Northern British Columbia',
  'University of Ontario Institute of Technology',
  'University of Ottawa',
  'University of Prince Edward Island',
  'University of Québec',
  'University of Regina',
  'University of Saskatchewan',
  "University of St. Jerome's College",
  'University of Sudbury',
  'University of Toronto',
  'University of Toronto, Mississauga',
  'University of Toronto, Scarborough',
  'University of Trinity College',
  'University of Victoria',
  'University of Waterloo',
  'University of Western Ontario',
  'University of Windsor',
  'University of Winnipeg',
  'University of the Fraser Valley',
  'Université Laval',
  'Université de Montréal',
  'Université de Sherbrooke',
  'Université du Québec en Abitibi-Témiscamingue',
  'Université du Québec en Outaouais',
  'Université du Québec à Chicoutimi',
  'Université du Québec à Montréal',
  'Université du Québec à Rimouski',
  'Université du Québec à Trois-Rivières',
  'Vancouver Community College',
  'Vanier College',
  'Victoria University Toronto, University of Toronto',
  'Wilfrid Laurier University',
  'William and Catherine Booth College',
  'York University',
  'Yukon College',
  OTHER_SPECIFY,
] as const

export const programOptions = [
  'Accounting',
  'Actuarial Science',
  'Advertising & Public Relations',
  'Aerospace Engineering',
  'Agricultural Economics',
  'Agriculture Production & Management',
  'Animal Sciences',
  'Anthropology & Archeology',
  'Applied Mathematics',
  'Architectural Engineering',
  'Architecture',
  'Area Ethnic & Civilization Studies',
  'Art History & Criticism',
  'Art & Music Education',
  'Astronomy & Astrophysics',
  'Atmospheric Sciences & Meteorology',
  'Biochemical Sciences',
  'Biological Engineering',
  'Biology',
  'Biomedical Engineering',
  'Botany',
  'Business Economics',
  'Business Management & Administration',
  'Chemical Engineering',
  'Chemistry',
  'Civil Engineering',
  'Clinical Psychology',
  'Cognitive Science & Biopsychology',
  'Commercial Art & Graphic Design',
  'Communication Disorders Sciences & Services',
  'Communication Technologies',
  'Communications',
  'Community & Public Health',
  'Composition & Rhetoric',
  'Computer Administration Management & Security',
  'Computer Engineering',
  'Computer Networking & Telecommunications',
  'Computer Programming & Data Processing',
  'Computer Science',
  'Computer & Information Systems',
  'Construction Services',
  'Cosmetology Services & Culinary Arts',
  'Counseling Psychology',
  'Court Reporting',
  'Criminal Justice & Fire Protection',
  'Criminology',
  'Drama & Theater Arts',
  'Early Childhood Education',
  'Ecology',
  'Economics',
  'Educational Administration & Supervision',
  'Educational Psychology',
  'Electrical Engineering',
  'Electrical Engineering Technology',
  'Electrical, Mechanical, & Precision Technologies & Production',
  'Elementary Education',
  'Engineering Mechanics Physics & Science',
  'Engineering Technologies',
  'Engineering & Industrial Management',
  'English Language & Literature',
  'Environmental Engineering',
  'Environmental Science',
  'Family & Consumer Sciences',
  'Film Video & Photographic Arts',
  'Finance',
  'Fine Arts',
  'Food Science',
  'Forestry',
  'French German Latin & Other Common Foreign Language Studies',
  'General Agriculture',
  'General Business',
  'General Education',
  'General Engineering',
  'General Medical & Health Services',
  'General Social Sciences',
  'Genetics',
  'Geography',
  'Geological & Geophysical Engineering',
  'Geology & Earth Science',
  'Geosciences',
  'Health & Medical Administrative Services',
  'Health & Medical Preparatory Programs',
  'History',
  'Hospitality Management',
  'Human Resources & Personnel Management',
  'Human Services & Community Organization',
  'Humanities',
  'Industrial Production Technologies',
  'Industrial & Manufacturing Engineering',
  'Industrial & Organizational Psychology',
  'Information Sciences',
  'Intercultural & International Studies',
  'Interdisciplinary Social Sciences',
  'International Business',
  'International Relations',
  'Journalism',
  'Language & Drama Education',
  'Liberal Arts',
  'Library Science',
  'Linguistics & Comparative Language & Literature',
  'Management Information Systems & Statistics',
  'Marketing & Marketing Research',
  'Mass Media',
  'Materials Engineering & Materials Science',
  'Materials Science',
  'Mathematics',
  'Mathematics Teacher Education',
  'Mathematics & Computer Science',
  'Mechanical Engineering',
  'Mechanical Engineering Related Technologies',
  'Medical Assisting Services',
  'Medical Technologies Technicians',
  'Metallurgical Engineering',
  'Microbiology',
  'Military Technologies',
  'Mining & Mineral Engineering',
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
  'Multi-Disciplinary / General Science',
  'Multi / Interdisciplinary Studies',
  'Music',
  'Natural Resources Management',
  'Naval Architecture & Marine Engineering',
  'Neuroscience',
  'Nuclear Engineering',
  'Nuclear, Industrial Radiology, & Biological Technologies',
  'Nursing',
  'Nutrition Sciences',
  'Oceanography',
  'Operations Logistics & E-Commerce',
  'Other Foreign Languages',
  'Petroleum Engineering',
  'Pharmacology',
  'Pharmacy Pharmaceutical Sciences & Administration',
  'Philosophy & Religious Studies',
  'Physical Fitness Parks Recreation & Leisure',
  'Physical Sciences',
  'Physical & Health Education Teaching',
  'Physics',
  'Physiology',
  'Plant Science & Agronomy',
  'Political Science & Government',
  'Pre-Law & Legal Studies',
  'Psychology',
  'Public Administration',
  'Public Policy',
  'School Student Counseling',
  'Science & Computer Teacher Education',
  'Secondary Teacher Education',
  'Social Psychology',
  'Social Science / History Teacher Education',
  'Social Work',
  'Sociology',
  'Soil Science',
  'Special Needs Education',
  'Statistics & Decision Science',
  'Studio Arts',
  'Teacher Education',
  'Theology & Religious Vocations',
  'Transportation Sciences & Technologies',
  'Treatment Therapy Professions',
  'United States History',
  'Visual & Performing Arts',
  'Zoology',
  OTHER_SPECIFY,
] as const

export const hackathonExperienceOptions = [
  'Rookie (This Is My First Hackathon)',
  'Enthusiast (1-2 Hackathons)',
  'Veteran (3-5 Hackathons)',
  'Expert (5+ Hackathons)',
] as const

export const deerhacksExperienceOptions = [
  'DeerHacks First Timer',
  'DeerHacks I (April 2022)',
  'DeerHacks II (April 2023)',
] as const

export const teamPreferenceOptions = [
  'Hacker With a Team',
  'Hacker Looking for Teammates',
  'Solo Hacker',
] as const

export const interestsOptions = [
  '3D Printing & CAD',
  'Artificial Intelligence',
  'Augmented & Virtual Reality',
  'Bioinformatics',
  'Blockchain',
  'Business & Entrepreneurship',
  'Cloud Technologies',
  'Computer Vision',
  'Cybersecurity',
  'Data Science & Analytics',
  'Digital Marketing',
  'Financial Technology',
  'Game Development',
  'Machine Learning',
  'Mobile App Development',
  'Natural Language Processing (NLP)',
  'Product Management',
  'Robotics',
  'UX & UI Design',
  'Web Development',
  OTHER_SPECIFY,
] as const

export const deerhacksReachOptions = [
  'Major League Hacking Website',
  'MCSS Instagram Page',
  'MCSS LinkedIn Page',
  'DeerHacks Website',
  'DeerHacks Instagram Page',
  'DeerHacks LinkedIn Page',
  'Email Newsletter',
  'University / College Announcement',
  'Previous Event Participation',
  'In-person Advertising',
  'Word of Mouth',
  OTHER_SPECIFY,
] as const
