import EventRoundedIcon from '@mui/icons-material/EventRounded'
import RestaurantRoundedIcon from '@mui/icons-material/RestaurantRounded'
import Avatar from '@mui/material/Avatar'

import MCSS from '@/components/HomePage/Sponsors/Assets/MCSS'
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
  }

  const host = event.attributes.host

  if (event.attributes.type === 'food' && !chipIcon) {
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

  // hanatodo mcss logo doesn't show on non-first tabs, because its an element??
  if (host == 'mcss') {
    return (
      <Avatar alt="mcss icon" sx={{ ...style }} variant={chipIcon ? 'circular' : 'square'}>
        <MCSS />
      </Avatar>
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
