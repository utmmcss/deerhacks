import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'

import { UserStatus } from '@/types/User'

const statuses: {
  [key in UserStatus]: string
} = {
  // hanatodo idk what colors, purple for something? grey? white?
  admin: '#29b6f6',
  moderator: '#29b6f6',
  volunteer: '#29b6f6',
  pending: '#ffa726',
  registering: '#ffa726',
  applied: '#ffa726', // hanatodo should have its own color
  selected: '#ffa726',
  accepted: '#66bb6a',
  attended: '#66bb6a',
  rejected: '#ff574e',
  unverified: '#ff574e',
}

type StatusSelectProps = {
  value: string
  onChange: (e: SelectChangeEvent<any>) => void
  isClearable?: boolean
}

const UserStatusSelect = (props: StatusSelectProps) => {
  const { value, onChange, isClearable = false } = props
  return (
    <Select
      value={value}
      onChange={onChange}
      fullWidth
      style={{
        fontSize: 'inherit',
        ...(Object.keys(statuses).includes(value) && {
          color: statuses[value as UserStatus],
        }),
      }}
      variant="standard"
      disableUnderline
    >
      {isClearable && (
        <MenuItem
          value=""
          key="clear"
          sx={{
            fontSize: '0.8rem',
            justifyContent: 'center',
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: 'grey',
            },
            // hanatodo thinks its selected when status isn't defined need to change css
            // just change the onchange to accept statuses and handle the clear case in here
          }}
        >
          Clear Status
        </MenuItem>
      )}
      <Divider />
      {Object.keys(statuses).map((option, i) => {
        if (option === 'unverified') return
        return (
          <MenuItem value={option} key={i + '-' + option}>
            {option}
          </MenuItem>
        )
      })}
    </Select>
  )
}

export default UserStatusSelect
