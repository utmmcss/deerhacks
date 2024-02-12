import { Event, ParsedEventData, RespEvent } from '@/types/Event'

export type ScheduleProps = {
  /* should always have length 24 */
  hours: Hour[]
  /* should always have keys 0-23 */
  gridOccupancy: GridOccupancy
  /* first hour with events */
  firstHour: number
  /* last hour with events */
  lastHour: number
}

/* map of 24 rows to which columns are currently occupied by some event */
type GridOccupancy = { [row: number]: { [column: number]: number } }

type Hour = {
  /* events that start within this hour */
  eventsStarting: Event[]
}

/**
 * Parses events from events cms endpoint into a map of dates to info required for the ScheduleGrid Component
 * @param events response from events cms endpoint
 * @returns map of dates to ScheduleProps
 */
export const parseEvents = (events: RespEvent[]): ParsedEventData => {
  const parsedEvents: ParsedEventData = {}

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
    // first and last hour events happen
    var firstHour = -1
    var lastHour = 24

    // max number of events happening simultaneously
    var maxCols = 1

    for (let hour_i = 0; hour_i < 24; hour_i++) {
      const hour = parsedEvents[day].hours[hour_i]
      if (hour.eventsStarting.length > 0) {
        if (firstHour < 0) {
          firstHour = hour_i
        }
        lastHour = hour_i
      }
      if (Object.keys(parsedEvents[day].gridOccupancy[hour_i]).length > maxCols) {
        maxCols = Object.keys(parsedEvents[day].gridOccupancy[hour_i]).length
      }
    }
    parsedEvents[day].firstHour = firstHour === -1 ? 0 : firstHour
    parsedEvents[day].lastHour = lastHour

    parsedEvents[day] = fillGrid(parsedEvents[day], maxCols)
  })
  return parsedEvents
}

/**
 * Adds a new event to the ScheduleProps
 * @param newEvent a new event that needs to be added to the ScheduleProps
 * @param curr current state of the ScheduleProps
 * @returns an updated state of the ScheduleProps with the newEvent added
 */
const newProps = (newEvent: Event, curr?: ScheduleProps) => {
  if (!curr) {
    // default values for if ScheduleProps object doesn't exist for the specific day yet
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

  // add event to hours
  curr.hours[hour].eventsStarting.push(newEvent)

  // add event to gridOccupancy
  const endMinuteOffset = Math.floor((newEvent.attributes.endTime.getMinutes() / 15) * 15)
  var endHour = newEvent.attributes.endTime.getHours()
  if (endHour === 0 && endMinuteOffset === 0) {
    endHour = 24
  }

  // move to next column if spot is already occupied
  // (only need to worry about the first hour, since we fill in occupancy in order of event time at this point)
  var columnPos = 0
  while (curr.gridOccupancy[hour][columnPos]) {
    columnPos += 1
  }

  // add event to gridOccupancy for the current hour, as well as the remaining hours this event lasts for
  for (let hour_i = hour; hour_i < (endMinuteOffset === 0 ? endHour : endHour + 1); hour_i++) {
    curr.gridOccupancy[hour_i][columnPos] = newEvent.id
  }

  return curr
}

/**
 * Modifies GridOccupancy to make events fill up as many columns as possible, as evenly as possible
 * @param curr current state of the ScheduleProps
 * @param maxCols max number of events happening simultaneously
 * @returns an updated state of the ScheduleProps, with each event filling up as many columns as possible
 */
const fillGrid = (curr: ScheduleProps, maxCols: number) => {
  // for every hour in 0-23
  for (let hour_i = 0; hour_i < curr.hours.length; hour_i++) {
    // for every event that starts in this hour
    for (let event_j = 0; event_j < curr.hours[hour_i].eventsStarting.length; event_j++) {
      const event = curr.hours[hour_i].eventsStarting[event_j]

      const startHour = event.attributes.startTime.getHours()
      var endHour = event.attributes.endTime.getHours()
      const endsPastHour = event.attributes.endTime.getMinutes() !== 0
      if (endHour === 0 && !endsPastHour) {
        endHour = 24
      }

      // find the column that this event is currently in
      var currCol = parseInt(
        Object.keys(curr.gridOccupancy[hour_i]).find(
          (id) => curr.gridOccupancy[hour_i][parseInt(id)] === event.id
        ) ?? '0'
      )

      // all event ids that start in this hour
      const eventIDsThisHour = Object.values(curr.hours[hour_i].eventsStarting).map((e) => e.id)

      // find the number of free columns to the right of the current column
      // to simplify logic, assume there's no columns left if any event starts midway the current one, otherwise, we would have to change the last-event-in-hour logic
      var colsLeft = maxCols
      // for every hour this event lasts for
      for (let hour_k = startHour; hour_k < (endsPastHour ? endHour + 1 : endHour); hour_k++) {
        var spaceLeft = 0
        // for every column to the right of the current column
        for (let column_l = currCol + 1; column_l < maxCols; column_l++) {
          if (curr.gridOccupancy[hour_k][column_l]) {
            // don't add to spaceLeft if there's an event in the next column,
            // BUT if the event in the next column starts in the same hour, continue counting
            if (!eventIDsThisHour.includes(curr.gridOccupancy[hour_k][column_l])) {
              // otherwise, we've reached the end of free space
              break
            }
          } else {
            // no event in next column
            spaceLeft += 1
          }
        }
        // need the smallest number of free columns to the right of the current column
        if (spaceLeft < colsLeft) {
          colsLeft = spaceLeft
        }
      }

      if (colsLeft == 0) {
        // no more space for this event, move on to next event in hour
        continue
      }

      // if event is the last event of the hour, make it take up the rest of the space
      if (curr.hours[hour_i].eventsStarting.length - 1 === event_j) {
        for (let spaceLeft_k = 0; spaceLeft_k < colsLeft + 1; spaceLeft_k++) {
          curr.gridOccupancy[hour_i][currCol + spaceLeft_k] = event.id
          // fill in rest of hours for this event
          for (let l = hour_i + 1; l < (endsPastHour ? endHour + 1 : endHour); l++) {
            curr.gridOccupancy[l][currCol + spaceLeft_k] = event.id
          }
        }
        // move on to next event in hour
        continue
      }

      // if event is not last event of the hour, make it take up more columns based on how many other events there are

      // check if theres no overlapping events that end at a later time than the current one
      // we're not going to fill extra space if this is true, for the sake of simplifying logic
      var longestEvent = true

      // check how many events need to share the remainder of the space
      var numRemainingEvents = 1

      // for each hour this event lasts for
      for (let hour_k = startHour; hour_k < (endsPastHour ? endHour + 1 : endHour); hour_k++) {
        var beforeCurrEvent = true
        var numEvents = 1
        // for each event that starts in this hour
        for (const column in Object.keys(curr.gridOccupancy[hour_k])) {
          const otherEventId = curr.gridOccupancy[hour_k][column]
          // if event in this column is not the current event
          if (otherEventId !== event.id) {
            const otherEventEndTime = curr.hours[hour_k].eventsStarting.find(
              (e) => e.id === otherEventId
            )?.attributes.endTime

            if (otherEventEndTime && otherEventEndTime > event.attributes.endTime) {
              // other event ends after current event
              longestEvent = false
            }

            if (!beforeCurrEvent) {
              numEvents += 1
            }
          } else {
            // event in this column is the current event
            beforeCurrEvent = false
          }
        }

        // want the max number of events that need to share the rest of the space
        if (numEvents > numRemainingEvents) {
          numRemainingEvents = numEvents
        }
      }

      // number of columns we can extend this event by
      const extendAmount = Math.floor(colsLeft / numRemainingEvents)

      if (extendAmount > 0 && longestEvent) {
        // for every hour this event lasts for,
        for (let hour_k = startHour; hour_k < (endsPastHour ? endHour + 1 : endHour); hour_k++) {
          // if there's events occupying the next columns, move each one stretchAmount columns to the right
          // start shifting from last column so we don't overwrite anything
          for (
            let column_l = Object.keys(curr.gridOccupancy[hour_k]).length - 1;
            column_l + extendAmount > currCol;
            column_l--
          ) {
            // events to the left of currCol
            if (column_l < currCol) {
              // fills in columns where currCol < column_l + extendAmount < currCol + extendAmount
              curr.gridOccupancy[hour_k][column_l + extendAmount] = event.id

              // for events to right of current event, including the current event,
              // if some value exists, shift it to the right by extendAmount
            } else if (curr.gridOccupancy[hour_k][column_l]) {
              const otherId = curr.gridOccupancy[hour_k][column_l]
              curr.gridOccupancy[hour_k][column_l + extendAmount] = otherId
            }
          }
        }
      }
    }
  }

  return curr
}
