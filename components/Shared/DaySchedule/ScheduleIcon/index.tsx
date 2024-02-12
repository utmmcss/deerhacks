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
    width: 28,
    height: 28,
    backgroundColor: 'transparent',
  }

  const host = event.attributes.host

  if (event.attributes.type === 'food' && host === 'deerhacks' && !chipIcon) {
    return (
      <Avatar alt="food icon" sx={{ ...style, color: 'inherit' }}>
        <RestaurantRoundedIcon />
      </Avatar>
    )
  }

  if (host === 'deerhacks') {
    return (
      <Avatar
        alt="deerhacks icon"
        src="icons/neon.png"
        sx={{
          ...style,
          backgroundColor: 'black',
          ...(event.attributes.important && !chipIcon && { border: 'solid 1px white' }),
        }}
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
        ...(withBackground && { backgroundColor: event.attributes.important ? 'black' : 'white' }),
      }}
      variant={withBackground ? 'circular' : 'square'}
    >
      <EventRoundedIcon />
    </Avatar>
  )
}

export default ScheduleIcon
