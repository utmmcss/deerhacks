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

  // event is notification (short) if we set actual event time without end time
  const shortEvent = event.attributes.actualEventTimes && !event.attributes.actualEventTimes.endTime

  const important = event.attributes.important

  const margin = 2

  return (
    <Tooltip title={event.attributes.title}>
      <Button
        variant="outlined"
        color={important ? 'primary' : 'secondary'}
        onClick={onClick}
        sx={{
          boxShadow: 'inset 0 0 5px 5000px rgb(0 0 0 / 25%)',
          width: `calc(100% - ${margin * 2}px)`,
          height: `calc(100% - ${margin * 2}px)`,
          margin: `${margin}px`,
          padding: '0 0.5rem',
          backgroundColor: important ? 'rgba(144, 202, 249, 0.08)' : 'rgba(233, 233, 233, 0.08)',
          gridRow,
          gridColumn,
          transition: 'all 0.3s ease',
          '&:hover, &:focus-visible': {
            backdropFilter: 'blur(10px)',
          },
        }}
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
              fontSize: 'x-small',
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
