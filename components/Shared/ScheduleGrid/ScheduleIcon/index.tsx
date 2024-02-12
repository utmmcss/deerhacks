import EventRoundedIcon from '@mui/icons-material/EventRounded'
import FastfoodRoundedIcon from '@mui/icons-material/FastfoodRounded'
import Avatar from '@mui/material/Avatar'

import { Event } from '@/types/Event'

type Props = {
  event: Event
}

const ScheduleIcon = (props: Props) => {
  const { event } = props

  const style = {
    width: 32,
    height: 32,
    color: 'inherit',
    backgroundColor: 'transparent',
  }

  const host = event.attributes.host

  if (host === 'deerhacks') {
    if (event.attributes.type === 'food') {
      return (
        <Avatar sx={style}>
          <FastfoodRoundedIcon />
        </Avatar>
      )
    }

    return (
      <Avatar
        alt="deerhacks icon"
        src="icons/neon.png"
        sx={{
          ...style,
          transform: 'scale(1.5)',
        }}
      >
        <EventRoundedIcon />
      </Avatar>
    )
  }

  const withBackground = [
    'utmRobotics',
    'utmsam',
    'uber',
    'thirstea',
    'gdsc',
    'amd',
    'mlh',
  ].includes(host)

  return (
    <Avatar
      alt={`${host} icon`}
      src={`events/${host}.svg`}
      sx={{
        ...style,
        '& img': {
          height: 'auto',
        },
        ...(withBackground && { backgroundColor: 'white', padding: '2px' }),
      }}
      variant={withBackground ? 'circular' : 'square'}
    >
      <EventRoundedIcon />
    </Avatar>
  )
}

export default ScheduleIcon
