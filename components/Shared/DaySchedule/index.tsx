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
  const { hours, gridOccupancy, firstHour, lastHour } = props

  const desktop = useMediaQuery(theme.breakpoints.up('md'))

  const [open, setOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | undefined>()

  // number of extra hours to show before/after first/last event
  const numExtraHours = 1

  /**
   * offset from taking away rows of hours if events start later in the day,
   * negative number or 0
   */
  const rowStartOffset = 1 - Math.max((firstHour - numExtraHours) * HOURS_1, 0)

  /**
   * offset from taking away rows of hours if events end earlier in the day,
   * positive number or 0
   */
  const rowEndOffset = (24 - Math.min(24, lastHour + numExtraHours)) * HOURS_1

  const gridHeight =
    HOURS_1 * 24 -
    1 + // rows start at 1 (?)
    rowStartOffset -
    rowEndOffset

  return (
    <Grid display="flex" flexDirection="row" position="relative" columnGap="0.25rem">
      <Grid
        display="grid"
        gridTemplateRows={`repeat(${gridHeight}, 12px)`}
        minWidth={desktop ? '44px' : '34px'}
      >
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
        gridTemplateRows={`repeat(${gridHeight}, 12px)`}
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
                borderTop="1px rgb(255, 255, 255, 0.1) solid"
                width="100%"
              />
            )
          }
        )}
      </Grid>
      <Grid display="grid" gridTemplateRows={`repeat(${gridHeight}, 12px)`} width="100%">
        {hours.map((hour, numHour) => {
          // remove and store occupied columns for this hour from the array
          const currentOccupancy = gridOccupancy[numHour]
          return (
            <Fragment key={`hour-${numHour}`}>
              {hour.eventsStarting.map((event) => {
                const startMinuteOffset = Math.floor(
                  (event.attributes.startTime.getMinutes() / 15) * MINS_15
                )
                const endMinuteOffset = Math.floor(
                  ((event.attributes.endTime.getMinutes() ?? 0) / 15) * MINS_15
                )

                var endHour = event.attributes.endTime.getHours() ?? 24
                // change 0 to 24 for events ending exactly at midnight
                if (endHour === 0 && endMinuteOffset === 0) {
                  endHour = 24
                }

                const rowStart = rowStartOffset + numHour * HOURS_1 + startMinuteOffset
                const rowEnd = rowStartOffset + endHour * HOURS_1 + endMinuteOffset

                var colStart = -1
                var colEnd = 1

                for (const key in Object.keys(currentOccupancy)) {
                  if (currentOccupancy[key] === event.id) {
                    if (colStart === -1) {
                      colStart = parseInt(key) + 1
                    }
                    colEnd = parseInt(key) + 2
                  }
                }

                return (
                  <ScheduleCell
                    key={`event-${event.id}`}
                    event={event}
                    onClick={() => {
                      setSelectedEvent(event)
                      setOpen(true)
                    }}
                    gridRow={`${rowStart} / ${rowEnd}`}
                    gridColumn={`${colStart} / ${colEnd}`}
                  />
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
  if (hour === 0 || hour === 24) return '12 am'
  if (hour < 12) return hour < 10 ? `0${hour} am` : `${hour} am`
  if (hour === 12) return '12 pm'
  const pmHour = hour - 12
  return pmHour < 10 ? `0${pmHour} pm` : `${pmHour} pm`
}

export default DaySchedule
