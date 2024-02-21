import { ScheduleProps } from '@/components/Shared/ScheduleGrid/helper'

export type EventListResp = {
  data: RespEvent[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
  parsedData: ParsedEventData
}

export type ParsedEventData = { [date: string]: ScheduleProps }

export type RespEvent = {
  id: number
  attributes: {
    title: string
    description: string
    location?: string | null
    createdAt: string
    updatedAt: string
    publishedAt: string
    startTime: string
    endTime?: string | null
    important: boolean
    host: EventHosts
    presenter?: string | null
    type: EventTypes
  }
}

export type Event = {
  id: number
  attributes: {
    title: string
    description: string
    location?: string | null
    startTime: Date
    endTime: Date
    important: boolean
    host: EventHosts
    presenter?: string | null
    type: EventTypes
    /* used only when displaying event details in modal */
    actualEventTimes?: {
      startTime: Date
      endTime?: Date | null
    }
  }
}

export type EventHosts = (typeof eventHosts)[number]
export const eventHosts = [
  'deerhacks',
  'mcss',
  'utmRobotics',
  'esports',
  'gdsc',
  'cssc',
  'utmsam',
  'mlh',
  'guidewire',
  'inworldAi',
  'uber',
  'amd',
  'thirstea',
] as const

export type EventTypes = (typeof eventTypes)[number]
export const eventTypes = [
  'activity',
  'workshop',
  'competition',
  'logistics',
  'food',
  'other',
] as const
