import EventRoundedIcon from '@mui/icons-material/EventRounded'
import RestaurantRoundedIcon from '@mui/icons-material/RestaurantRounded'
import Avatar from '@mui/material/Avatar'

import { Event } from '@/types/Event'

type Props = {
  event: Event
  chipIcon?: boolean
}

const ScheduleIcon = (props: Props) => {
  const { event, chipIcon = false } = props

  const style = {
    width: 'auto',
    height: 24,
    maxHeight: '100%',
    backgroundColor: 'transparent',
    ...(!chipIcon && {
      minHeight: '2rem',
      // hanatodo add border ??? how???
    }),
  }

  const host = event.attributes.host

  if (event.attributes.type === 'food' && host === 'deerhacks' && !chipIcon) {
    return (
      <Avatar
        alt="food icon"
        sx={{ ...style, color: 'inherit' }}
        variant={chipIcon ? 'circular' : 'square'}
      >
        <RestaurantRoundedIcon />
      </Avatar>
    )
  }

  if (host === 'deerhacks') {
    return (
      <Avatar
        alt="deerhacks icon"
        src="icons/neon.png"
        sx={{ ...style, backgroundColor: 'black' }}
      />
    )
  }

  const withBackground = ['utmRobotics', 'utmsam', 'mlh'].includes(host)

  return (
    <Avatar
      alt={`${host} icon`}
      src={`eventHosts/${host}.svg`}
      sx={{
        ...style,
        color: 'inherit',
        ...(withBackground && { backgroundColor: 'white' }),
      }}
      variant={withBackground || chipIcon ? 'circular' : 'square'}
    >
      <EventRoundedIcon />
    </Avatar>
  )
}

export default ScheduleIcon
