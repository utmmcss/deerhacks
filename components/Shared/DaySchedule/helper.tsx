import { Event, RespEvent } from '@/types/Event'

export type ScheduleProps = {
  hours: Hour[]
  //gridOccupancy: GridOccupancy
  /* first hour with events */
  firstHour: number
  /* last hour with events */
  lastHour: number
}

//type GridOccupancy = { [row: number]: { [column: number]: boolean } }

type Hour = {
  /* events without end time */
  notificationEvents: Event[]
  /* events that start within this hour */
  eventsStarting: Event[]
}

export const parseEvents = (events: RespEvent[]): { [date: string]: ScheduleProps } => {
  const parsedEvents: { [date: string]: ScheduleProps } = {}

  for (const event of events) {
    const eventStartDate = new Date(event.attributes.startTime)
    const eventEndDate = new Date(event.attributes.endTime ?? '')

    if (
      !isNaN(eventEndDate.valueOf()) &&
      eventStartDate.getDate() !== eventEndDate.getDate() &&
      eventEndDate.getHours() != 0 // no need to add to next day if event ends at midnight
    ) {
      // assume events are less than 24 hours

      const adjustEndTime = new Date(eventStartDate)
      adjustEndTime.setHours(24)
      parsedEvents[eventStartDate.toDateString()] = newProps(
        {
          ...event,
          attributes: {
            ...event.attributes,
            startTime: eventStartDate,
            endTime: adjustEndTime,
            actualEventTimes: { startTime: eventStartDate, endTime: eventEndDate },
          },
        }, // change event to end at midnight
        parsedEvents[eventStartDate.toDateString()]
      )

      const adjustStartTime = new Date(eventEndDate)
      adjustStartTime.setHours(0)
      parsedEvents[eventEndDate.toDateString()] = newProps(
        {
          ...event,
          attributes: {
            ...event.attributes,
            startTime: adjustStartTime,
            endTime: eventEndDate,
            actualEventTimes: { startTime: eventStartDate, endTime: eventEndDate },
          },
        }, // add same event that starts at 00:00 next day
        parsedEvents[eventEndDate.toDateString()]
      )
    } else {
      parsedEvents[eventStartDate.toDateString()] = newProps(
        {
          ...event,
          attributes: { ...event.attributes, startTime: eventStartDate, endTime: eventEndDate },
        }, // regular or notification event
        parsedEvents[eventStartDate.toDateString()]
      )
    }
  }

  Object.keys(parsedEvents).forEach((day) => {
    var firstHour = -1
    var lastHour = 24

    for (let i = 0; i < 24; i++) {
      const hour = parsedEvents[day].hours[i]
      if (hour.eventsStarting.length > 0 || hour.notificationEvents.length > 0) {
        // find first/last hour events happen
        if (firstHour < 0) {
          firstHour = i
        }
        lastHour = i
      }
    }
    parsedEvents[day].firstHour = firstHour === -1 ? 0 : firstHour
    parsedEvents[day].lastHour = lastHour
  })

  return parsedEvents
}

const newProps = (newEvent: Event, curr?: ScheduleProps) => {
  if (!curr) {
    // default value for ScheduleProps if it doesn't exist yet for this day
    const hours = []
    //const gridOccupancy: GridOccupancy = {}
    for (let i = 0; i < 24; i++) {
      hours.push({
        notificationEvents: [],
        eventsStarting: [],
      } as Hour)
      // gridOccupancy[i] = {}
    }
    curr = { hours, firstHour: 0, lastHour: 24 }
  }

  const hour = newEvent.attributes.startTime.getHours()

  // if no endTime, add to notificationEvents
  if (!newEvent.attributes.endTime || isNaN(newEvent.attributes.endTime.valueOf())) {
    curr.hours[hour].notificationEvents.push(newEvent)
    return curr
  }

  // if curr list empty or new event is last item
  curr.hours[hour].eventsStarting.push(newEvent)

  return curr
}
