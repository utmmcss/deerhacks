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
  gridRow: string
  gridColumn: string
}

const ScheduleCell = (props: Props) => {
  const { event, onClick, gridRow, gridColumn } = props

  const tablet = useMediaQuery(theme.breakpoints.up('sm'))
  const desktop = useMediaQuery(theme.breakpoints.up('md'))

  const shortEvent = !!event.attributes.endTime && isNaN(event.attributes.endTime.getTime())

  const important = event.attributes.important

  const margin = 4

  return (
    <Tooltip title={event.attributes.title}>
      <Button
        onClick={onClick}
        sx={{
          width: `calc(100% - ${margin * 2}px)`,
          height: `calc(100% - ${margin * 2}px)`,
          margin: `${margin}px`,
          padding: '0 0.5rem',
          color: important ? 'common.black' : 'white',
          transition: '0.2s all ease',
          background: important
            ? 'radial-gradient(at center, #f9fafd, #e5eeff)'
            : //  'radial-gradient(circle closest-corner at 62% 60%, rgba(52, 139, 209, 0.3), rgb(255 255 255)), radial-gradient(circle farthest-side at 75% 16%, rgba(255, 255, 255, 0.1), rgb(255 255 255) 35%), radial-gradient(circle closest-corner at 32% 38%, rgba(87, 65, 174, 0.2), rgb(255 255 255) 76%), radial-gradient(circle farthest-side at 69% 81%, rgba(255, 0, 48, 0.1), rgb(255 255 255) 76%), linear-gradient(rgb(32 33 36 / 0%), rgb(32 33 36 / 0%))'
              'radial-gradient(circle closest-corner at 62% 60%, rgba(52, 139, 209, 0.3), rgba(255, 255, 255, 0)), radial-gradient(circle farthest-side at 75% 16%, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0) 35%), radial-gradient(circle closest-corner at 32% 38%, rgba(87, 65, 174, 0.2), rgba(255, 255, 255, 0) 76%), radial-gradient(circle farthest-side at 69% 81%, rgba(255, 0, 48, 0.1), rgba(255, 255, 255, 0) 76%), linear-gradient(rgb(32, 33, 36), rgb(32, 33, 36))',
          '&:hover': {
            filter: 'brightness(1.1)',
          },
          gridRow,
          gridColumn,
        }}
        color={important ? 'secondary' : 'primary'}
      >
        {desktop && <ScheduleIcon event={event} />}
        <Typography
          sx={{
            width: 0,
            flex: 1,
            textOverflow: 'ellipsis',
            overflowX: 'hidden',
            textAlign: 'left',
            display: 'inline-block',
            lineHeight: 'normal',
            letterSpacing: 'normal',
            fontSize: desktop ? 'small' : tablet ? 'x-small' : 'xx-small',
            maxHeight: '100%',
            ...(shortEvent && {
              overflowX: 'clip',
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
