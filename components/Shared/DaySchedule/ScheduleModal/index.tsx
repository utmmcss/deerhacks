import { ReactElement } from 'react'

import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded'
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded'
import CelebrationRoundedIcon from '@mui/icons-material/CelebrationRounded'
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded'
import HardwareRoundedIcon from '@mui/icons-material/HardwareRounded'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
import RestaurantRoundedIcon from '@mui/icons-material/RestaurantRounded'
import ScienceRoundedIcon from '@mui/icons-material/ScienceRounded'
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
            label={hostNames[event.attributes.host]}
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
        <Grid display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={1}>
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
          <Typography display="flex" alignItems="center" columnGap="0.5rem" flexGrow={1}>
            <LocationOnRoundedIcon color="secondary" />
            {event.attributes.location}
          </Typography>
        </Grid>
        <Typography>{event.attributes.description}</Typography>
      </Grid>
    </Modal>
  )
}

export default ScheduleModal
