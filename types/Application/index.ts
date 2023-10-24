export type ApplicationGetResp = {
  application: Application
  isDraft: boolean
}

export type ApplicationUpdateReq = {
  application: Application
  isDraft: boolean
}

export type Application = {
  /**
   * The following fields are part of the User so they are not in the form
   *
   * firstName: string
   * lastName: string
   * email: string
   */

  phone: string
  emailSubscribe: boolean

  age: number
  gender: Gender
  pronouns: Pronouns
  ethnicity: Ethnicity
  country: string
  city: string
  state?: string

  contactName: string
  contactPhone: string
  contactRelationship: ContactRelationship

  shirtSize: ShirtSize
  dietaryRestrictions: DietaryRestrictions[]
  additionalInfo: string

  educationLevel: string
  school: string
  programField: string

  resume: string
  portfolio?: string
  github?: string
  linkedin?: string
  confirmDistributeResume: boolean

  hackathonExperience: HackathonExperience
  deerHacksExperience: boolean
  teamPreference: TeamPreference
  interests: Interests[]

  deerhacksPitch: string
  sharedProject: string
  futureTech: string

  deerhacksReach: DeerHacksReach
  mlhCodeAgreement: boolean
  mlhSubscribe: boolean
  mlhAuthorize: boolean
}

type Gender = keyof typeof GenderEnum
const enum GenderEnum {
  MALE = 'male',
  FEMALE = 'female',
  PREFER_NOT_TO_SAY = 'prefer_not_to_say',
  OTHER = 'other',
}

type Pronouns = keyof typeof PronounsEnum
const enum PronounsEnum {
  HE_HIM = 'he/him',
  SHE_HER = 'she/her',
  THEY_THEM = 'they/them',
  OTHER = 'other',
}

type Ethnicity = keyof typeof EthnicityEnum
const enum EthnicityEnum {
  PREFER_NOT_TO_SAY = 'prefer_not_to_say',
  OTHER = 'other',
}

type ContactRelationship = keyof typeof ContactRelationshipEnum
const enum ContactRelationshipEnum {
  GUARDIAN = 'guardian',
  SIBLING = 'sibling',
  SPOUSE = 'spouse',
  FRIEND = 'friend',
  OTHER = 'other',
}

type ShirtSize = keyof typeof ShirtSizeEnum
const enum ShirtSizeEnum {
  XS = 'xs',
  S = 's',
  M = 'm',
  L = 'l',
  XL = 'xl',
  XXL = 'xxl',
}

type DietaryRestrictions = keyof typeof DietaryRestrictionsEnum
const enum DietaryRestrictionsEnum {
  VEGETARIAN = 'vegetarian',
  VEGAN = 'vegan',
  GLUTEN_FREE = 'gluten_free',
  DAIRY_FREE = 'dairy_free',
  NUT_ALLERGY = 'nut_allergy',
  HALAL = 'halal',
  KOSHER = 'kosher',
  OTHER = 'other',
}

type HackathonExperience = keyof typeof HackathonExperienceEnum
const enum HackathonExperienceEnum {
  ROOKIE = 'rookie',
  ENTHUSIAST = 'enthusiast',
  VETERAN = 'veteran',
  EXPERT = 'expert',
}

type TeamPreference = keyof typeof TeamPreferenceEnum
const enum TeamPreferenceEnum {
  ALONE = 'alone',
  FRIENDS = 'friends',
  RANDOM = 'random',
}

type Interests = keyof typeof InterestsEnum
const enum InterestsEnum {
  AI = 'ai',
  AR_VR = 'ar_vr',
  BIO_INFORMATICS = 'bio_informatics',
  BLOCKCHAIN = 'blockchain',
  BUSINESS = 'business',
  CAD_3D = 'cad_3d',
  CLOUD = 'cloud',
  COMPUTER_VISION = 'computer_vision',
  CYBERSECURITY = 'cybersecurity',
  DATA_SCIENCE = 'data_science',
  DESIGN = 'design',
  DIGITAL_MARKETING = 'digital_marketing',
  EMBEDDED_SYSTEMS = 'embedded_systems',
  FINANCIAL_TECH = 'financial_tech',
  GAME_DESIGN = 'game_design',
  MACHINE_LEARNING = 'machine_learning',
  MOBILE = 'mobile',
  NLP = 'nlp',
  PRODUCT_MANAGEMENT = 'product_management',
  ROBOTICS = 'robotics',
  UX_UI = 'ux_ui',
  WEB = 'web',
  OTHER = 'other',
}

type DeerHacksReach = keyof typeof DeerHacksReachEnum
const enum DeerHacksReachEnum {
  DH_WEBSITE = 'dh_website',
  MLH_WEBSITE = 'mlh_website',
  EMAIL = 'email',
  DH_INSTAGRAM = 'dh_instagram',
  MCSS_INSTAGRAM = 'mcss_instagram',
  LINKEDIN = 'linkedin',
  UOFT = 'uoft',
  WORD_OF_MOUTH = 'word_of_mouth',
  OTHER = 'other',
}
