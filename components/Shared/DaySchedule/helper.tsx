import { Event, RespEvent } from '@/types/Event'

export type ScheduleProps = {
  hours: Hour[]
  gridOccupancy: GridOccupancy
  /* first hour with events */
  firstHour: number
  /* last hour with events */
  lastHour: number
}

type GridOccupancy = { [row: number]: { [column: number]: number } }

type Hour = {
  /* events that start within this hour */
  eventsStarting: Event[]
}

export const parseEvents = (events: RespEvent[]): { [date: string]: ScheduleProps } => {
  const parsedEvents: { [date: string]: ScheduleProps } = {}

  for (const event of events) {
    const startTime = new Date(event.attributes.startTime)
    const endTime = new Date(event.attributes.endTime ?? '')

    if (isNaN(endTime.valueOf())) {
      // notification event, pretend endTime is 15min from now, add actual event times as well
      parsedEvents[startTime.toDateString()] = newProps(
        {
          ...event,
          attributes: {
            ...event.attributes,
            startTime,
            endTime: new Date(startTime.getTime() + 15 * 60 * 1000),
            actualEventTimes: { startTime },
          },
        },
        parsedEvents[startTime.toDateString()]
      )
    } else if (
      // event that spans over midnight
      startTime.getDate() !== endTime.getDate() &&
      endTime.getHours() != 0 // no need to add to next day if event ends at midnight
    ) {
      // assume events are less than 24 hours

      const adjustEndTime = new Date(startTime)
      adjustEndTime.setHours(24)
      parsedEvents[startTime.toDateString()] = newProps(
        {
          ...event,
          attributes: {
            ...event.attributes,
            startTime,
            endTime: adjustEndTime,
            actualEventTimes: { startTime, endTime },
          },
        }, // change event to end at midnight
        parsedEvents[startTime.toDateString()]
      )

      const adjustStartTime = new Date(endTime)
      adjustStartTime.setHours(0)
      parsedEvents[endTime.toDateString()] = newProps(
        {
          ...event,
          attributes: {
            ...event.attributes,
            startTime: adjustStartTime,
            endTime,
            actualEventTimes: { startTime, endTime },
          },
        }, // add same event that starts at 00:00 next day
        parsedEvents[endTime.toDateString()]
      )
    } else {
      // regular event
      parsedEvents[startTime.toDateString()] = newProps(
        {
          ...event,
          attributes: { ...event.attributes, startTime, endTime },
        },
        parsedEvents[startTime.toDateString()]
      )
    }
  }

  Object.keys(parsedEvents).forEach((day) => {
    var firstHour = -1
    var lastHour = 24
    var maxCols = 1

    for (let i = 0; i < 24; i++) {
      const hour = parsedEvents[day].hours[i]
      if (hour.eventsStarting.length > 0) {
        // find first/last hour events happen
        if (firstHour < 0) {
          firstHour = i
        }
        lastHour = i
      }
      if (Object.keys(parsedEvents[day].gridOccupancy[i]).length > maxCols) {
        maxCols = Object.keys(parsedEvents[day].gridOccupancy[i]).length
      }
    }
    parsedEvents[day].firstHour = firstHour === -1 ? 0 : firstHour
    parsedEvents[day].lastHour = lastHour

    parsedEvents[day] = fillGrid(parsedEvents[day], maxCols)
  })
  return parsedEvents
}

const newProps = (newEvent: Event, curr?: ScheduleProps) => {
  if (!curr) {
    // default value for ScheduleProps if it doesn't exist yet for this day
    const hours = []
    const gridOccupancy: GridOccupancy = {}
    for (let i = 0; i < 24; i++) {
      hours.push({
        eventsStarting: [],
      } as Hour)
      gridOccupancy[i] = {}
    }
    curr = { hours, gridOccupancy, firstHour: 0, lastHour: 24 }
  }

  const hour = newEvent.attributes.startTime.getHours()
  curr.hours[hour].eventsStarting.push(newEvent)

  // add event to gridOccupancy
  const endMinuteOffset = Math.floor((newEvent.attributes.endTime.getMinutes() / 15) * 15)
  var endHour = newEvent.attributes.endTime.getHours()
  if (endHour === 0 && endMinuteOffset === 0) {
    endHour = 24
  }

  // move to next column if already occupied
  var columnPos = 0
  while (curr.gridOccupancy[hour][columnPos]) {
    columnPos += 1
  }
  curr.gridOccupancy[hour][columnPos] = newEvent.id

  for (let i = hour; i < (endMinuteOffset === 0 ? endHour : endHour + 1); i++) {
    curr.gridOccupancy[i][columnPos] = newEvent.id
  }

  return curr
}

const fillGrid = (curr: ScheduleProps, maxCols: number) => {
  for (let i = 0; i < curr.hours.length; i++) {
    for (let j = 0; j < curr.hours[i].eventsStarting.length; j++) {
      const event = curr.hours[i].eventsStarting[j]
      const startHour = event.attributes.startTime.getHours()
      var endHour = event.attributes.endTime.getHours()
      const endsPastHour = event.attributes.endTime.getMinutes() !== 0

      if (endHour === 0 && !endsPastHour) {
        endHour = 24
      }

      var currCol = 0

      for (const key in Object.keys(curr.gridOccupancy[i])) {
        if (curr.gridOccupancy[i][key] === event.id) {
          currCol = parseInt(key)
        }
      }

      const eventIDsThisHour = Object.values(curr.hours[i].eventsStarting).map((e) => e.id)

      var colsLeft = maxCols
      for (let k = startHour; k < (endsPastHour ? endHour + 1 : endHour); k++) {
        // num of free columns from currCol to next occupied column
        var spaceLeft = 0
        for (let l = currCol + 1; l < maxCols; l++) {
          if (curr.gridOccupancy[k][l]) {
            if (!eventIDsThisHour.includes(curr.gridOccupancy[k][l])) {
              break
            }
          } else {
            spaceLeft += 1
          }
        }
        if (spaceLeft < colsLeft) {
          colsLeft = spaceLeft
        }
      }

      if (colsLeft == 0) {
        // no more space for this event
        continue
      }

      if (curr.hours[i].eventsStarting.length - 1 === j) {
        // stretch event to fill empty column
        for (let k = 0; k < colsLeft + 1; k++) {
          curr.gridOccupancy[i][currCol + k] = event.id
          // fill in rest of hours for this event
          for (let l = i + 1; l < (endsPastHour ? endHour + 1 : endHour); l++) {
            curr.gridOccupancy[l][currCol + k] = event.id
          }
        }
        continue
      }

      // if event is not last event of the hour, make it take up more columns based on how many other events there are

      // check if theres no overlapping events that end at a later time than the current one
      var longestEvent = true
      // check how many events need to share the remainder of the space
      var numRemainingEvents = 1
      for (let k = startHour; k < (endsPastHour ? endHour + 1 : endHour); k++) {
        var beforeCurrEvent = true
        var numEvents = 1
        for (const key in Object.keys(curr.gridOccupancy[k])) {
          if (curr.gridOccupancy[k][key] !== event.id) {
            const otherEvent = curr.gridOccupancy[k][key]
            const otherEventEndTime = curr.hours[k].eventsStarting.find((e) => e.id === otherEvent)
              ?.attributes.endTime
            if (otherEventEndTime && otherEventEndTime > event.attributes.endTime) {
              // other event ends after current event
              longestEvent = false
            }
            if (!beforeCurrEvent) {
              numEvents += 1
            }
          } else {
            beforeCurrEvent = false
          }
        }
        if (numEvents > numRemainingEvents) {
          numRemainingEvents = numEvents
        }
      }

      const stretchAmount = Math.floor(colsLeft / numRemainingEvents)

      if (stretchAmount > 0 && longestEvent) {
        // need to make sure the other events don't take over space that future events need

        // for every hour this event lasts for,
        for (let k = startHour; k < (endsPastHour ? endHour + 1 : endHour); k++) {
          // if there's events occupying the next columns, move each one stretchAmount columns to the right

          for (
            let l = Object.keys(curr.gridOccupancy[k]).length - 1;
            l + stretchAmount > currCol;
            l--
          ) {
            if (curr.gridOccupancy[k][l]) {
              const otherId = curr.gridOccupancy[k][l]
              curr.gridOccupancy[k][l + stretchAmount] = otherId
              curr.gridOccupancy[k][l] = event.id
            }
          }
        }
      }
    }
  }

  return curr
}
