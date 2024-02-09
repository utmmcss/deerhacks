import Head from 'next/head'
import { useState } from 'react'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Fade from '@mui/material/Fade'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'

import BackButton from '@/components/Shared/BackButton'
import DaySchedule from '@/components/Shared/DaySchedule'
import { parseEvents } from '@/components/Shared/DaySchedule/helper'
import FullPageSpinner from '@/components/Shared/FullPageSpinner'
import { useEventList } from '@/hooks/Event/useEventList'
import Error500Page from '@/pages/500'
import { RespEvent } from '@/types/Event'

type Props = {
  events: RespEvent[]
}

const Schedule = (props: Props) => {
  const { events } = props

  const parsedEvents = parseEvents(events)
  const days = Object.keys(parsedEvents).sort(
    (a: string, b: string) => new Date(a).getTime() - new Date(b).getTime()
  )

  const now = new Date()

  const [tabIndex, setTabIndex] = useState(() => {
    // set tab to today if exists
    const index = days.findIndex((day) => {
      const date = new Date(day)
      return (
        date.getFullYear() === now.getFullYear() &&
        date.getMonth() === now.getMonth() &&
        date.getDate() === now.getDate()
      )
    })
    if (index !== -1) return index
    // otherwise default to first tab
    return 0
  })

  const oneWeekFromNow = new Date(now.getTime() + 6 * 24 * 60 * 60 * 1000)

  return (
    <>
      <Box component="div" sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          // hanatodo match homepage tab style (border-radius) -> move inline styles on home page to theme
          value={tabIndex}
          onChange={(_, newIndex) => setTabIndex(newIndex)}
          aria-label="basic tabs example"
        >
          {days.map((day) => {
            const eventDate = new Date(day)
            const configs: Intl.DateTimeFormatOptions =
              eventDate < now || // eventDay is has passed OR
              eventDate > oneWeekFromNow // eventDay is more than a week away from now
                ? {
                    month: 'short',
                    day: 'numeric',
                  }
                : {
                    weekday: 'short',
                  }
            return <Tab key={day} label={eventDate.toLocaleDateString('en-US', configs)} />
          })}
        </Tabs>
      </Box>
      {Object.keys(parsedEvents).map((day, i) => {
        return (
          <Box key={day} hidden={i != tabIndex} component="div" width="100%">
            <Typography variant="h2" mb="1.5rem">
              {new Date(day).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </Typography>
            <DaySchedule key={day} {...parsedEvents[day]} />
          </Box>
        )
      })}
    </>
  )
}

const ScheduleLoader = () => {
  const { data, isLoading, isError } = useEventList()

  if (isError) return <Error500Page />

  return (
    <>
      <Head>
        <title>Schedule | DeerHacks</title>
      </Head>
      {isLoading || !data ? (
        <FullPageSpinner />
      ) : (
        <Fade in timeout={1000}>
          <Container sx={{ minHeight: '100vh', flexDirection: 'column', justifyContent: 'start' }}>
            <BackButton navbar />
            <Typography variant="h1">Schedule</Typography>
            <Schedule events={data.data} />
          </Container>
        </Fade>
      )}
    </>
  )
}

export default ScheduleLoader
