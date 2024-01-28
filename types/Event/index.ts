export type EventListResp = {
  data: Event[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export type Event = {
  id: number
  attributes: {
    title: string
    description: string
    location: string
    startTime: Date
    endTime?: Date
    important: boolean
    host: EventHosts
    type: EventTypes
  }
}

export type EventHosts = (typeof eventHosts)[number]
export const eventHosts = ['deerhacks', 'mcss', 'gdsc', 'cssc', 'utmist', 'wisc', 'mlh'] as const

export type EventTypes = (typeof eventTypes)[number]
export const eventTypes = ['activity', 'workshop', 'competition', 'logistics', 'other'] as const
