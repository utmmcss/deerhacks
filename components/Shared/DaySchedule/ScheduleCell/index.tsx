import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

import ScheduleIcon from '@/components/Shared/DaySchedule/ScheduleIcon'
import theme from '@/styles/theme'
import { Event } from '@/types/Event'

type Props = {
  event: Event
  onClick: () => void
}

const ScheduleCell = (props: Props) => {
  const { event, onClick } = props

  const desktop = useMediaQuery(theme.breakpoints.up('md'))
  const tablet = useMediaQuery(theme.breakpoints.up('sm'))

  const shortEvent = event.attributes.endTime && isNaN(event.attributes.endTime.getTime())

  const important = event.attributes.important

  // hanatodo decide on important event styles

  return (
    <Tooltip title={event.attributes.title}>
      <Button
        onClick={onClick}
        variant="outlined"
        sx={{
          width: '100%',
          height: '100%',
          borderRadius: '16px',
          justifyContent: 'start',
          padding: '0.25rem 0.5rem',
          overflowX: 'hidden',
          display: 'flex',
          color: important ? 'common.black' : 'white',
          backgroundImage: important
            ? 'radial-gradient(at center, #f9fafd, #e5eeff)'
            : //  'radial-gradient(circle closest-corner at 62% 60%, rgba(52, 139, 209, 0.3), rgb(255 255 255)), radial-gradient(circle farthest-side at 75% 16%, rgba(255, 255, 255, 0.1), rgb(255 255 255) 35%), radial-gradient(circle closest-corner at 32% 38%, rgba(87, 65, 174, 0.2), rgb(255 255 255) 76%), radial-gradient(circle farthest-side at 69% 81%, rgba(255, 0, 48, 0.1), rgb(255 255 255) 76%), linear-gradient(rgb(32 33 36 / 0%), rgb(32 33 36 / 0%))'
              'radial-gradient(circle closest-corner at 62% 60%, rgba(52, 139, 209, 0.3), rgba(255, 255, 255, 0)), radial-gradient(circle farthest-side at 75% 16%, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0) 35%), radial-gradient(circle closest-corner at 32% 38%, rgba(87, 65, 174, 0.2), rgba(255, 255, 255, 0) 76%), radial-gradient(circle farthest-side at 69% 81%, rgba(255, 0, 48, 0.1), rgba(255, 255, 255, 0) 76%), linear-gradient(rgb(32, 33, 36), rgb(32, 33, 36))',
          '&:hover': {
            backgroundImage: important
              ? 'radial-gradient(at center, #f9fafd, #d3e3ffee)'
              : //  'radial-gradient(circle closest-corner at 62% 60%, rgba(52, 139, 209, 0.55), rgb(255 255 255)), radial-gradient(circle farthest-side at 75% 16%, rgba(255, 255, 255, 0.1), rgb(255 255 255) 35%), radial-gradient(circle closest-corner at 32% 38%, rgba(87, 65, 174, 0.45), rgb(255 255 255) 76%), radial-gradient(circle farthest-side at 69% 81%, rgba(255, 0, 48, 0.1), rgb(255 255 255) 76%), linear-gradient(rgb(32 33 36 / 0%), rgb(32 33 36 / 0%))'
                'radial-gradient(circle closest-corner at 62% 60%, rgba(52, 139, 209, 0.55), rgba(255, 255, 255, 0)), radial-gradient(circle farthest-side at 75% 16%, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0) 35%), radial-gradient(circle closest-corner at 32% 38%, rgba(87, 65, 174, 0.45), rgba(255, 255, 255, 0) 76%), radial-gradient(circle farthest-side at 69% 81%, rgba(255, 0, 48, 0.1), rgba(255, 255, 255, 0) 76%), linear-gradient(rgb(32, 33, 36), rgb(32, 33, 36))',
          },
        }}
        color={important ? 'secondary' : 'primary'}
      >
        {desktop && <ScheduleIcon event={event} />}
        <Typography
          sx={{
            width: 0,
            flex: 1,
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            textAlign: 'left',
            display: 'inline-block',
            fontSize: desktop ? 'small' : tablet ? 'x-small' : 'xx-small',
            lineHeight: 'normal',
            letterSpacing: 'normal',
            ...(shortEvent && {
              maxHeight: '100%',
              whiteSpace: 'nowrap',
            }),
          }}
          variant="button"
        >
          {event.attributes.title}
        </Typography>
      </Button>
    </Tooltip>
  )
}

export default ScheduleCell
