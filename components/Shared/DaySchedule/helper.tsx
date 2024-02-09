import { Event, RespEvent } from '@/types/Event'

export type ScheduleProps = {
  hours: Hour[]
  /* first hour with events */
  firstHour: number
  /* last hour with events */
  lastHour: number
}

type Hour = {
  /* events without end time */
  notificationEvents: Event[]
  /* events that start within this hour */
  eventsStarting: Event[]
}

export const parseEvents = (events: RespEvent[]): { [date: string]: ScheduleProps } => {
  const parsedEvents: { [date: string]: ScheduleProps } = {}

  // hanatodo don't use example events
  for (const event of exampleEvents) {
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
    for (let i = 0; i < 24; i++) {
      hours.push({
        notificationEvents: [],
        eventsStarting: [],
      } as Hour)
    }
    curr = { hours, firstHour: 0, lastHour: 24 }
  }

  // dates aren't actually typed as Date when obtaining from API
  newEvent.attributes.startTime = new Date(newEvent.attributes.startTime)
  newEvent.attributes.endTime = new Date(newEvent.attributes.endTime ?? '')

  const hour = newEvent.attributes.startTime.getHours()

  // if no endTime, add to notificationEvents
  if (isNaN(newEvent.attributes.endTime.valueOf())) {
    var added = false
    const newImportant = newEvent.attributes.important
    for (let i = 0; i < curr.hours[hour].notificationEvents.length; i++) {
      const event = curr.hours[hour].notificationEvents[i]
      const currImportant = event.attributes.important

      // if new event is important and current event is as well, compare lengths, add if starts earlier
      if (newImportant && currImportant) {
        if (newEvent.attributes.startTime < event.attributes.startTime) {
          curr.hours[hour].notificationEvents.splice(i, 0, newEvent)
          added = true
          break
        }
      }

      // if new event is important and current event is not, add
      if (newImportant && !currImportant) {
        curr.hours[hour].notificationEvents.splice(i, 0, newEvent)
        added = true
        break
      }

      // if new event is not important and current event is, don't add

      // if new event is not important and current event is not, compare lengths, add if longer
      if (!newImportant && !currImportant) {
        if (newEvent.attributes.startTime < event.attributes.startTime) {
          curr.hours[hour].notificationEvents.splice(i, 0, newEvent)
          added = true
          break
        }
      }
    }
    // if curr list empty or new event is last item
    if (!added) {
      curr.hours[hour].notificationEvents.push(newEvent)
    }
    return curr
  }

  var added = false

  const newImportant = newEvent.attributes.important
  const newEndTime = newEvent.attributes.endTime
  const newDuration = newEndTime.getTime() - newEvent.attributes.startTime.getTime()

  for (let i = 0; i < curr.hours[hour].eventsStarting.length; i++) {
    const event = curr.hours[hour].eventsStarting[i]
    const currImportant = event.attributes.important
    const currEndTime = event.attributes.endTime
    const currDuration = currEndTime
      ? currEndTime.getTime() - event.attributes.startTime.getTime()
      : 0

    // if new event is important and current event is as well, compare lengths, add if longer
    if (newImportant && currImportant) {
      if (currEndTime && newDuration > currDuration) {
        curr.hours[hour].eventsStarting.splice(i, 0, newEvent)
        added = true
        break
      }
    }

    // if new event is important and current event is not, add to eventsStarting
    if (newImportant && !currImportant) {
      curr.hours[hour].eventsStarting.splice(i, 0, newEvent)
      added = true
      break
    }

    // if new event is not important and current event is, don't add

    // if new event is not important and current event is not, compare lengths, add if longer
    if (!newImportant && !currImportant) {
      if (currEndTime && newDuration > currDuration) {
        curr.hours[hour].eventsStarting.splice(i, 0, newEvent)
        added = true
        break
      }
    }
  }

  // if curr list empty or new event is last item
  if (!added) {
    curr.hours[hour].eventsStarting.push(newEvent)
  }

  return curr
}

// hanatodo cms and delete
const exampleEvents: Event[] = [
  {
    id: 1,
    attributes: {
      title: 'Hacker Sign-ins',
      description: 'description',
      location: 'location',
      startTime: new Date('2022-01-01T15:00:00'),
      endTime: new Date('2022-01-01T18:00:00'),
      important: true,
      host: 'deerhacks',
      type: 'logistics',
    },
  },
  {
    id: 2,
    attributes: {
      title: 'VR Demos',
      description:
        'I need to type a longer description because one word descriptions do not look good when previewing things.',
      location: 'location',
      startTime: new Date('2022-01-01T15:00:00'),
      endTime: new Date('2022-01-01T18:00:00'),
      important: false,
      host: 'inworldAi',
      type: 'logistics',
    },
  },
  {
    id: 3,
    attributes: {
      title: 'Opening Ceremony',
      description: 'description',
      location: 'location',
      startTime: new Date('2022-01-01T18:00:00'),
      endTime: new Date('2022-01-01T19:00:00'),
      important: true,
      host: 'deerhacks',
      type: 'logistics',
    },
  },
  {
    id: 4,
    attributes: {
      title: 'Drones, ChatGPT, & Azure',
      description: 'description',
      location: 'location',
      startTime: new Date('2022-01-01T19:00:00'),
      endTime: new Date('2022-01-01T20:00:00'),
      important: false,
      host: 'gdsc',
      type: 'logistics',
    },
  },
  {
    id: 5,
    attributes: {
      title: 'Coffee Chat',
      description: 'description',
      location: 'location',
      startTime: new Date('2022-01-01T19:00:00'),
      endTime: new Date('2022-01-01T20:00:00'),
      important: false,
      host: 'cssc',
      type: 'logistics',
    },
  },
  {
    id: 6,
    attributes: {
      title: 'Game Drop-ins',
      description: 'description',
      location: 'location',
      startTime: new Date('2022-01-01T19:00:00'),
      endTime: new Date('2022-01-01T23:00:00'),
      important: false,
      host: 'mcss',
      type: 'logistics',
    },
  },
  {
    id: 7,
    attributes: {
      title: 'Pizza',
      description: 'description',
      location: 'location',
      startTime: new Date('2022-01-01T20:00:00'),
      // endTime: new Date('2022-01-01T21:00:00'),
      important: true,
      host: 'mcss',
      type: 'food',
    },
  },
  {
    id: 8,
    attributes: {
      title: 'Hacking Begins - actually',
      description: 'description',
      location: 'location',
      startTime: new Date('2022-01-01T21:45:00'),
      important: true,
      host: 'mcss',
      type: 'logistics',
    },
  },
  {
    id: 9,
    attributes: {
      title: 'Backend 101',
      description: 'description',
      location: 'location',
      startTime: new Date('2022-01-01T21:30:00'),
      endTime: new Date('2022-01-01T23:00:00'),
      important: false,
      host: 'mcss',
      type: 'logistics',
    },
  },
  {
    id: 10,
    attributes: {
      title: 'Discord Bot 101',
      description: 'description',
      location: 'location',
      startTime: new Date('2022-01-01T21:00:00'),
      endTime: new Date('2022-01-01T22:00:00'),
      important: false,
      host: 'mcss',
      type: 'logistics',
    },
  },
  {
    id: 11,
    attributes: {
      title: '3D Printing Workshop',
      description: 'description',
      location: 'location',
      startTime: new Date('2022-01-01T21:00:00'),
      endTime: new Date('2022-01-01T23:30:00'),
      important: false,
      host: 'guidewire',
      type: 'logistics',
    },
  },
  {
    id: 12,
    attributes: {
      title: 'Test 1',
      description: 'description',
      location: 'location',
      startTime: new Date('2022-01-01T23:00:00'),
      endTime: new Date('2022-01-01T23:30:00'),
      important: false,
      host: 'utmRobotics',
      type: 'logistics',
    },
  },
  {
    id: 13,
    attributes: {
      title: 'Test 2',
      description: 'description',
      location: 'location',
      startTime: new Date('2022-01-01T23:00:00'),
      endTime: new Date('2022-01-01T24:00:00'),
      important: false,
      host: 'utmsam',
      type: 'logistics',
    },
  },
  {
    id: 14,
    attributes: {
      title: 'Test 3',
      description: 'description',
      location: 'location',
      startTime: new Date('2022-01-01T23:00:00'),
      endTime: new Date('2022-01-01T23:55:00'),
      important: false,
      host: 'mlh',
      type: 'logistics',
    },
  },
  {
    id: 15,
    attributes: {
      title: 'Hacking Begins - soon',
      description: 'description',
      location: 'location',
      startTime: new Date('2022-01-01T21:00:00'),
      important: true,
      host: 'mcss',
      type: 'logistics',
    },
  },
  {
    id: 16,
    attributes: {
      title: 'Test 4',
      description: 'description',
      location: 'location',
      startTime: new Date('2022-01-01T23:00:00'),
      endTime: new Date('2022-01-02T02:00:00'),
      important: false,
      host: 'amd',
      type: 'logistics',
    },
  },
  // {
  //   id: 17,
  //   attributes: {
  //     title: 'Test 5',
  //     description: 'description',
  //     location: 'location',
  //     startTime: new Date('2022-01-01T00:00:00'),
  //     endTime: new Date('2022-01-01T02:00:00'),
  //     important: false,
  //     host: 'mcss',
  //     type: 'logistics',
  //   },
  // },
  {
    id: 18,
    attributes: {
      title: 'Juice Box',
      description: 'description',
      location: 'location',
      startTime: new Date('2022-01-02T10:00:00'),
      // endTime: new Date('2022-01-01T21:00:00'),
      important: true,
      host: 'mcss',
      type: 'food',
    },
  },
  // {
  //   id: 18,
  //   attributes: {
  //     title: 'Test 6',
  //     description: 'description',
  //     location: 'location',
  //     startTime: new Date('2022-01-01T00:00:00'),
  //     endTime: new Date('2022-01-01T00:30:00'),
  //     important: false,
  //     host: 'mcss',
  //     type: 'logistics',
  //   },
  // },
  {
    id: 19,
    attributes: {
      title: 'Hacker Sign-ins have been over for a while',
      description: 'description',
      location: 'location',
      startTime: new Date('2022-01-01T20:00:00'),
      endTime: new Date('2022-01-01T22:00:00'),
      important: true,
      host: 'mcss',
      type: 'logistics',
    },
  },
  {
    id: 19,
    attributes: {
      title: 'Hacker Sign-ins have been over for a while',
      description: 'description',
      location: 'location',
      startTime: new Date('2024-02-15T20:00:00'),
      endTime: new Date('2024-02-15T22:00:00'),
      important: true,
      host: 'mcss',
      type: 'logistics',
    },
  },
]
