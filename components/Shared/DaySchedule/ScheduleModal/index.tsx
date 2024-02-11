import { ReactElement } from 'react'

import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded'
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded'
import CelebrationRoundedIcon from '@mui/icons-material/CelebrationRounded'
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded'
import HardwareRoundedIcon from '@mui/icons-material/HardwareRounded'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import RestaurantRoundedIcon from '@mui/icons-material/RestaurantRounded'
import ScienceRoundedIcon from '@mui/icons-material/ScienceRounded'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import Modal from '@/components/Dashboard/Modal'
import ScheduleIcon from '@/components/Shared/DaySchedule/ScheduleIcon'
import { Event, EventHosts, EventTypes } from '@/types/Event'

type Props = {
  open: boolean
  onClose: () => void
  event: Event
}

const ScheduleModal = (props: Props) => {
  const { open, onClose, event } = props

  const hostNames: { [key in EventHosts]: string } = {
    deerhacks: 'DeerHacks',
    mcss: 'MCSS',
    utmRobotics: 'UTM Robotics',
    gdsc: 'GDSC',
    cssc: 'CSSC',
    utmsam: 'UTMSAM',
    guidewire: 'Guidewire',
    inworldAi: 'Inworld AI',
    uber: 'Uber',
    amd: 'AMD',
    mlh: 'MLH',
    thirstea: 'ThirsTEA',
  }

  const typeIcons: { [key in EventTypes]: ReactElement } = {
    activity: <CelebrationRoundedIcon />,
    workshop: <HardwareRoundedIcon />,
    competition: <EmojiEventsRoundedIcon />,
    logistics: <ScienceRoundedIcon />,
    food: <RestaurantRoundedIcon />,
    other: <CategoryRoundedIcon />,
  }

  // get actual event duration for events that run past midnight
  const startTime = event.attributes.actualEventTimes
    ? event.attributes.actualEventTimes.startTime
    : event.attributes.startTime
  const endTime = event.attributes.actualEventTimes
    ? event.attributes.actualEventTimes.endTime
    : event.attributes.endTime

  return (
    <Modal
      open={open}
      title={
        <Grid display="flex" alignItems="center" columnGap="0.5rem" paddingRight="40px">
          <Chip
            avatar={<ScheduleIcon event={event} chipIcon />}
            label={hostNames[event.attributes.host] ?? event.attributes.host}
            sx={{
              padding: '0.25rem',
              fontWeight: 400,
              color: 'text.secondary',
            }}
          />
          <Chip
            avatar={typeIcons[event.attributes.type]}
            label={event.attributes.type.capitalize()}
            sx={{
              padding: '0.25rem',
              fontWeight: 400,
              color: 'text.secondary',
              '& .MuiChip-avatar': {
                width: '16px',
                height: '16px',
              },
            }}
          />
        </Grid>
      }
      onClose={onClose}
    >
      <Grid display="flex" flexDirection="column" rowGap="1rem">
        <Typography variant="h2">{event.attributes.title}</Typography>
        <Grid display="flex" flexDirection="column" gap={1}>
          <Typography display="flex" alignItems="center" columnGap="0.5rem" flexGrow={1}>
            <AccessTimeRoundedIcon color="secondary" />
            {startTime.toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
            })}
            {endTime &&
              !isNaN(endTime.getTime()) &&
              ' - ' +
                endTime.toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                })}
          </Typography>
          {event.attributes.location && (
            <Typography display="flex" alignItems="center" columnGap="0.5rem" flexGrow={1}>
              <LocationOnRoundedIcon color="secondary" />
              {event.attributes.location}
            </Typography>
          )}
          {event.attributes.presenter && (
            <Typography display="flex" alignItems="center" columnGap="0.5rem" flexGrow={1}>
              <PersonRoundedIcon color="secondary" />
              {event.attributes.presenter}
            </Typography>
          )}
        </Grid>
        <WavyLine />
        <Typography whiteSpace="pre-line">{event.attributes.description}</Typography>
      </Grid>
    </Modal>
  )
}

// hanatodo
const WavyLine = () => {
  const holder = {
    // position: 'relative',
    width: '100%',
    height: '50px',
  }
  const clip = {
    // Clip edges, as some of the lines don't terminate nicely.
    overflow: 'hidden',
  }

  const circle = {
    //position: 'absolute',
    width: '120%',
    height: '20px',
    background:
      'radial-gradient(16px, transparent, transparent 4px, black 2px, black 10px, transparent 11px)',
    backgroundSize: '30px 40px',
  }

  const circle2 = {
    // Offset to make squigglies line up
    top: '20px',
    left: '-15px',
    backgroundPosition: '0px -22px',
  }

  return (
    <Box component="div" position="relative" style={{ ...holder, ...clip }}>
      <Box component="div" position="absolute" style={circle}></Box>
      <Box component="div" position="absolute" style={{ ...circle, ...circle2 }}></Box>
    </Box>
  )
}

export default ScheduleModal
