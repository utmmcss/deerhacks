import NextLink from 'next/link'

import GrainIcon from '@mui/icons-material/Grain'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'
import Collapse from '@mui/material/Collapse'
import Typography from '@mui/material/Typography'

import { useEventList } from '@/hooks/Event/useEventList'
import { UserStatus } from '@/types/User'

type Props = {
  status: UserStatus
}

const TileSchedule = (props: Props) => {
  const { status } = props

  const disabled =
    !['admin', 'moderator', 'guest', 'volunteer', 'accepted', 'attended'].includes(status) ||
    (process.env.NODE_ENV !== 'development' && !['admin', 'moderator'].includes(status)) // TODO: remove this line when schedule is ready

  const { data, isLoading, isError } = useEventList({ enabled: !disabled })

  const hasEvents = !isLoading && data?.data?.length !== 0
  const now = new Date()
  const oneWeekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)

  const upcomingEvents = data?.data.filter((event) => {
    const eventDate = new Date(event.attributes.startTime)
    const nowPlusFiveMinutes = new Date(now.getTime() + 5 * 60 * 1000)
    return nowPlusFiveMinutes <= eventDate
  })

  if (disabled || isError || (!hasEvents && !isLoading)) {
    return (
      <Card variant="outlined" elevation={0}>
        <CardActionArea disabled>
          <CardContent>
            <Typography
              variant="h1"
              display="flex"
              alignItems="center"
              textAlign="left"
              gap="0.5rem"
              gutterBottom
              color="text.disabled"
            >
              <GrainIcon color="info" fontSize="inherit" />
              Schedule
            </Typography>
            <Typography variant="body2">Coming Soon</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    )
  }

  return (
    <Card
      variant={hasEvents ? 'elevation' : 'outlined'}
      elevation={hasEvents ? 5 : 0}
      sx={{
        transition: 'all 0.2s ease',
        border: '1px solid rgba(255, 255, 255, 0)',
        backgroundImage:
          'radial-gradient(circle closest-corner at 62% 60%, rgb(52 139 209 / 30%), rgba(255, 255, 255, 0)),radial-gradient(circle farthest-side at 75% 16%, rgb(255 255 255 / 10%), rgba(255, 255, 255, 0) 35%),radial-gradient(circle closest-corner at 32% 38%, rgb(87 65 174 / 20%), rgba(255, 255, 255, 0) 76%),radial-gradient(circle farthest-side at 69% 81%, rgba(255, 0, 48, 0.1), rgba(255, 255, 255, 0) 76%),linear-gradient(#202124, #202124)',
      }}
    >
      <CardActionArea href="/dashboard/schedule" LinkComponent={NextLink} disabled={!hasEvents}>
        <CardContent>
          <Typography
            variant="h1"
            display="flex"
            alignItems="center"
            textAlign="left"
            gap="0.5rem"
            gutterBottom
            color={hasEvents ? 'text.primary' : 'text.disabled'}
            sx={{ transition: 'all 0.2s ease' }}
          >
            <GrainIcon color="info" fontSize="inherit" />
            Schedule
          </Typography>

          <>
            <Collapse in={!isLoading && upcomingEvents?.length !== 0} timeout={500}>
              <Box component="div" display="flex" flexDirection="column" gap="1rem">
                <Typography variant="h3">Up Next:</Typography>
                <Box component="div" display="flex" flexDirection="column" gap="0.5rem">
                  {upcomingEvents?.slice(0, 3).map((event) => {
                    const eventDate = new Date(event?.attributes?.startTime)

                    const configs: Intl.DateTimeFormatOptions =
                      eventDate > oneWeekFromNow
                        ? {
                            timeZone: 'America/Toronto',
                            month: 'short',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                          }
                        : {
                            timeZone: 'America/Toronto',
                            weekday: 'short',
                            hour: 'numeric',
                            minute: 'numeric',
                          }

                    return (
                      <Chip
                        key={event?.id}
                        color={event?.attributes?.important ? 'primary' : 'default'}
                        label={`${eventDate.toLocaleString('en', configs)} / ${
                          event?.attributes?.title
                        } / ${event?.attributes?.location}`}
                        sx={{ width: 'fit-content', color: 'lightgray' }}
                      />
                    )
                  })}
                </Box>
              </Box>
            </Collapse>
            {!isLoading && upcomingEvents?.length === 0 && (
              <Typography variant="body2">Explore DeerHacks events, workshops & more</Typography>
            )}
            {isLoading && <CircularProgress size="1.5rem" />}
          </>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default TileSchedule
