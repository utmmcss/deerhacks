import { FieldValues, UseFormReturn } from 'react-hook-form'

import {
  AboutYouZodForm,
  DeerhacksZodForm,
  ExperienceZodForm,
  OpenEndedResponsesZodForm,
} from '@/types/Zod'

export const formKeys = [
  'AboutYou',
  'Experience',
  'OpenEndedResponses',
  'DeerHacks',
  'Review',
] as const

type Section<Values extends FieldValues> = {
  heading: string
  subHeadings: readonly string[]
  form: UseFormReturn<Values>
}

export type FormSections = {
  AboutYou: Section<AboutYouZodForm>
  Experience: Section<ExperienceZodForm>
  OpenEndedResponses: Section<OpenEndedResponsesZodForm>
  DeerHacks: Section<DeerhacksZodForm>
  Review: Omit<Section<any>, 'form'>
}
