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
      PaperProps={{
        sx: {
          m: '1rem',
          maxHeight: 'calc(100% - 2rem)',
          width: 'calc(100% - 2rem)',
          backgroundImage:
            'radial-gradient(circle farthest-side at 70% 82%, rgb(255 0 33 / 17%), rgba(255, 255, 255, 0) 67%),radial-gradient(circle farthest-side at 58% 0%, rgb(147 0 255 / 20%), rgba(255, 255, 255, 0) 82%),radial-gradient(circle farthest-side at 48% 29%, rgb(222 162 0 / 24%), rgba(255, 255, 255, 0) 65%),radial-gradient(circle farthest-side at 24% 80%, rgb(0 255 158 / 5%), rgba(255, 255, 255, 0) 54%),linear-gradient(hsl(225 6% 10% / 1), #202124)',
        },
      }}
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

const WavyLine = () => {
  // css from https://css-generators.com/wavy-shapes/
  const box = {
    '--mask':
      'radial-gradient(4px at 50% calc(100% + 1.80px),#0000 calc(99% - 1px),#000 calc(101% - 1px) 99%,#0000 101%) calc(50% - 6px) calc(50% - 2px + .5px)/12px 4px repeat-x, radial-gradient(4px at 50% -1.8px,#0000 calc(99% - 1px),#000 calc(101% - 1px) 99%,#0000 101%) 50% calc(50% + 2px)/12px 4px repeat-x',
    '-webkit-mask': 'var(--mask)',
    mask: 'var(--mask)',
    background: '#878789',
    height: '8px',
  }
  return <Box component="div" style={box}></Box>
}

export default ScheduleModal
