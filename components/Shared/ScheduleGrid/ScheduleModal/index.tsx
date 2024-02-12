import AccessTimeTwoToneIcon from '@mui/icons-material/AccessTimeTwoTone'
import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone'
import PlaceTwoToneIcon from '@mui/icons-material/PlaceTwoTone'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import Modal from '@/components/Dashboard/Modal'
import ScheduleIcon from '@/components/Shared/ScheduleGrid/ScheduleIcon'
import WavyDivider from '@/components/Shared/WavyDivider'
import { Event, EventHosts } from '@/types/Event'

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
          <ScheduleIcon event={event} chipIcon />
          <Chip
            label={hostNames[event.attributes.host] ?? event.attributes.host}
            sx={{
              fontWeight: 400,
              color: 'text.secondary',
            }}
          />
          <Chip
            label={event.attributes.type.capitalize()}
            sx={{
              fontWeight: 400,
              color: 'text.secondary',
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
            'radial-gradient(circle closest-corner at 62% 60%, rgba(52, 139, 209, 0.3), rgba(255, 255, 255, 0)), radial-gradient(circle farthest-side at 75% 16%, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0) 35%), radial-gradient(circle closest-corner at 32% 38%, rgba(87, 65, 174, 0.2), rgba(255, 255, 255, 0) 76%), radial-gradient(circle farthest-side at 69% 81%, rgba(255, 0, 48, 0.1), rgba(255, 255, 255, 0) 76%), linear-gradient(rgb(32, 33, 36), rgb(32, 33, 36))',
        },
      }}
    >
      <Grid display="flex" flexDirection="column" rowGap="1rem">
        <Typography variant="h2">{event.attributes.title}</Typography>
        <Grid display="flex" flexDirection="column" gap={1}>
          <Typography display="flex" alignItems="center" columnGap="0.5rem" flexGrow={1}>
            <AccessTimeTwoToneIcon color="secondary" />
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
              <PlaceTwoToneIcon color="secondary" />
              {event.attributes.location}
            </Typography>
          )}
          {event.attributes.presenter && (
            <Typography display="flex" alignItems="center" columnGap="0.5rem" flexGrow={1}>
              <PersonOutlineTwoToneIcon color="secondary" />
              {event.attributes.presenter}
            </Typography>
          )}
        </Grid>
        <WavyDivider />
        <Typography whiteSpace="pre-line">{event.attributes.description}</Typography>
      </Grid>
    </Modal>
  )
}

export default ScheduleModal
