import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

import ScheduleIcon from '@/components/Shared/ScheduleGrid/ScheduleIcon'
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

  return (
    <Tooltip title={event.attributes.title}>
      <Button
        variant="outlined"
        color={important ? 'primary' : 'secondary'}
        onClick={onClick}
        sx={{
          boxShadow: 'inset 0 0 5px 5000px rgb(0 0 0 / 25%)',
          width: 'calc(100% - 4px)',
          height: 'calc(100% - 4px)',
          margin: '2px',
          padding: '0 0.5rem',
          backgroundColor: important ? 'rgba(144, 202, 249, 0.08)' : 'rgba(233, 233, 233, 0.08)',
          gridRow,
          gridColumn,
          ...(important && {
            backgroundImage:
              'radial-gradient(circle closest-corner at 62% 60%, rgba(52, 139, 209, 0.3), rgba(255, 255, 255, 0)),radial-gradient(circle farthest-side at 75% 16%, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0) 35%),radial-gradient(circle closest-corner at 32% 38%, rgba(87, 65, 174, 0.2), rgba(255, 255, 255, 0) 76%),radial-gradient(circle farthest-side at 69% 81%, rgba(255, 0, 48, 0.1), rgba(255, 255, 255, 0) 76%),linear-gradient(rgb(32, 33, 36), rgb(32, 33, 36))',
          }),
          transition: 'all 0.3s ease',
          '&:hover, &:focus-visible': {
            backdropFilter: 'blur(10px)',
            ...(important
              ? {
                  filter: 'saturate(1.5) brightness(1.1) contrast(0.9)',
                }
              : {
                  filter: 'saturate(1.5) ',
                }),
          },
        }}
      >
        {desktop && <ScheduleIcon event={event} />}
        <Typography
          color="text.primary"
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
