import Head from 'next/head'
import { useState } from 'react'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Fade from '@mui/material/Fade'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'

import BackButton from '@/components/Shared/BackButton'
import FullPageSpinner from '@/components/Shared/FullPageSpinner'
import ScheduleGrid from '@/components/Shared/ScheduleGrid'
import { useToast } from '@/contexts/Toast'
import { useEventList } from '@/hooks/Event/useEventList'
import Error500Page from '@/pages/500'
import theme from '@/styles/theme'
import { ParsedEventData } from '@/types/Event'

type Props = {
  parsedEvents: ParsedEventData
}

const Schedule = (props: Props) => {
  const { parsedEvents } = props

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

  const handleSetTabIndex = (index: number) => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    setTabIndex(index)
  }

  const oneWeekFromNow = new Date(now.getTime() + 6 * 24 * 60 * 60 * 1000)

  const transitionDuration = {
    enter: 400,
    exit: 100,
  }

  return (
    <>
      <Box
        component="div"
        display="flex"
        justifyContent="center"
        width="100%"
        position="sticky"
        top={0}
        zIndex={1000}
        mb="1rem"
        sx={{ backgroundColor: theme.palette.background.default }}
      >
        <Tabs
          variant="scrollable"
          value={tabIndex}
          onChange={(_, newIndex) => handleSetTabIndex(newIndex)}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
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
                    weekday: 'long',
                  }
            return <Tab key={day} label={eventDate.toLocaleDateString('en-US', configs)} />
          })}
        </Tabs>
      </Box>
      {Object.keys(parsedEvents).map((day, i) => {
        return (
          <Fade
            key={day}
            in={tabIndex === i}
            timeout={transitionDuration}
            style={{
              transitionDelay: `${i === tabIndex ? transitionDuration.exit : 0}ms`,
            }}
          >
            <Box hidden={i != tabIndex} component="div" width="100%">
              <Typography variant="h2" mb="1.5rem">
                {new Date(day).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                })}
              </Typography>
              <ScheduleGrid {...parsedEvents[day]} />
            </Box>
          </Fade>
        )
      })}
    </>
  )
}

const ScheduleLoader = () => {
  const { setToast } = useToast()
  const { data, isLoading, isError } = useEventList({
    onSuccess: () => {
      setToast({
        type: 'info',
        message:
          'Note: Events are subject to change & any last minute changes will also be announced on Discord.',
      })
    },
  })

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
            <Schedule parsedEvents={data.parsedData} />
          </Container>
        </Fade>
      )}
    </>
  )
}

export default ScheduleLoader
