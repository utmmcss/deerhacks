import { Fragment, useState } from 'react'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

import { ScheduleProps } from '@/components/Shared/DaySchedule/helper'
import ScheduleCell from '@/components/Shared/DaySchedule/ScheduleCell'
import ScheduleModal from '@/components/Shared/DaySchedule/ScheduleModal'
import theme from '@/styles/theme'
import { Event } from '@/types/Event'

const MINS_15 = 2
const HOURS_1 = MINS_15 * 4

const DaySchedule = (props: ScheduleProps) => {
  const { hours, firstHour, lastHour } = props

  const desktop = useMediaQuery(theme.breakpoints.up('md'))

  const [open, setOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | undefined>()

  /**
   * keep track of columns that are occupied
   * each index represents a row, and the value is an array of columns that are already occupied
   */
  const occupiedCells: number[][] = []

  /**
   * offset from taking away rows of hours if events start later in the day,
   * negative number or 0
   */
  const rowStartOffset = 1 - Math.max((firstHour - 2) * HOURS_1, 0)

  /**
   * offset from taking away rows of hours if events end earlier in the day,
   * positive number or 0
   */
  const rowEndOffset = (24 - Math.min(24, lastHour + 2)) * HOURS_1

  const gridHeight =
    HOURS_1 * 24 -
    1 + // rows start at 1 (?)
    rowStartOffset -
    rowEndOffset

  return (
    <Grid display="flex" flexDirection="row" position="relative" columnGap="0.25rem">
      <Grid display="grid" gridTemplateRows={`repeat(${gridHeight}, 10px)`}>
        {Array.from(
          { length: 24 - rowEndOffset / HOURS_1 + (rowStartOffset - 1) / HOURS_1 + 1 },
          (_, i) => {
            const numHour = -((rowStartOffset - 1) / HOURS_1) + i
            const rowStart = rowStartOffset + numHour * HOURS_1
            return (
              <Grid key={`time label-${i}`} gridRow={`${rowStart} / ${rowStart}`}>
                <Typography fontSize={desktop ? 'small' : 'x-small'}>
                  {getTimeLabel(numHour)}
                </Typography>
              </Grid>
            )
          }
        )}
      </Grid>
      <Grid
        display="grid"
        gridTemplateRows={`repeat(${gridHeight}, 10px)`}
        position="absolute"
        top={0}
        left={0}
        width="100%"
      >
        {Array.from(
          { length: 24 - rowEndOffset / HOURS_1 + (rowStartOffset - 1) / HOURS_1 + 1 },
          (_, i) => {
            const numHour = -((rowStartOffset - 1) / HOURS_1) + i
            const rowStart = rowStartOffset + numHour * HOURS_1
            return (
              <Grid
                key={`grid-line-${i}`}
                gridRow={`${rowStart} / ${rowStart}`}
                borderTop="1px grey solid"
                width="100%"
              ></Grid>
            )
          }
        )}
      </Grid>
      <Grid display="grid" gridTemplateRows={`repeat(${gridHeight}, 10px)`} width="100%">
        {hours.map((hour, numHour) => {
          // remove and store occupied columns for this hour from the array
          const currentOccupancy = occupiedCells.shift() ?? []
          return (
            <Fragment key={`hour-${numHour}`}>
              {hour.notificationEvents.map((event, j) => {
                // doesn't support notifications that aren't on the hour
                // const minuteOffset = Math.floor(
                //   (event.attributes.startTime.getMinutes() / 15) * MINS_15
                // )
                const minuteOffset = 0

                const rowStart =
                  rowStartOffset + numHour * HOURS_1 + j * MINS_15 * 1.5 + minuteOffset

                currentOccupancy?.push(1) // notifications are always on the first column (assumes no more than 2 per hour)

                return (
                  <Grid
                    key={`notification-${event.id}`}
                    gridRow={`${rowStart} / ${rowStart + MINS_15 * 1.5}`}
                    gridColumn={`1 / 2`} // notifications are always on the first column (assumes no more than 2 per hour)
                    margin="1px"
                  >
                    <ScheduleCell
                      event={event}
                      onClick={() => {
                        setSelectedEvent(event)
                        setOpen(true)
                      }}
                    />
                  </Grid>
                )
              })}

              {hour.eventsStarting.map((event, j) => {
                const startMinuteOffset = Math.floor(
                  (event.attributes.startTime.getMinutes() / 15) * MINS_15
                )
                const endMinuteOffset = Math.floor(
                  ((event.attributes.endTime?.getMinutes() ?? 0) / 15) * MINS_15
                )

                // endTime should always be defined because event is not a notification
                var endHour = event.attributes.endTime?.getHours() ?? 24
                // change 0 to 24 for events ending exactly at midnight
                if (endHour === 0 && endMinuteOffset === 0) {
                  endHour = 24
                }

                // only important events should be on the first column
                // move to next column if already occupied
                var columnPos = event.attributes.important ? 1 : j === 0 ? 2 : j + 1
                while ((currentOccupancy ?? []).includes(columnPos)) {
                  columnPos += 1
                }
                // add chosen column to current occupancy
                currentOccupancy?.push(columnPos)

                // mark column as occupied for the remainder of the event
                for (
                  let k = 0;
                  // columns start counting from 1 but array start from 0
                  numHour + k + 1 < (endMinuteOffset === 0 ? endHour : endHour + 1);
                  k++
                ) {
                  if (!occupiedCells[k]) {
                    occupiedCells[k] = [columnPos]
                  } else {
                    occupiedCells[k].push(columnPos)
                  }
                }

                const rowStart = rowStartOffset + numHour * HOURS_1 + startMinuteOffset

                const rowEnd = rowStartOffset + endHour * HOURS_1 + endMinuteOffset

                return (
                  <Grid
                    key={`event-${event.id}`}
                    gridRow={`${rowStart} / ${rowEnd}`}
                    gridColumn={`${columnPos} / ${columnPos + 1}`}
                    margin="1px"
                  >
                    <ScheduleCell
                      event={event}
                      onClick={() => {
                        setSelectedEvent(event)
                        setOpen(true)
                      }}
                    />
                  </Grid>
                )
              })}
            </Fragment>
          )
        })}
      </Grid>
      {selectedEvent && (
        <ScheduleModal open={open} onClose={() => setOpen(false)} event={selectedEvent} />
      )}
    </Grid>
  )
}

const getTimeLabel = (hour: number) => {
  if (hour === 0 || hour === 24) return '12AM'
  if (hour < 12) return hour + 'AM'
  if (hour === 12) return '12PM'
  return hour - 12 + 'PM'
}

export default DaySchedule
