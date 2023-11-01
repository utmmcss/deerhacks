export type EventListResp = {
  data: Event[]
}

export type Event = {
  id: number
  attributes: {
    title: string
    description: string
    location: string
    startTime: string
    endTime?: string
    important?: boolean
    host: string
    type: string
  }
}
