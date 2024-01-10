import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

import { UserStatus } from '@/types/User'

// hanatodo this is the same thing in UserStatusSelect

const statuses: {
  [key in UserStatus]: string
} = {
  admin: '#29b6f6',
  moderator: '#29b6f6',
  volunteer: '#29b6f6',
  pending: '#ffa726',
  registering: '#ffa726',
  applied: '#ffa726',
  selected: '#ffa726',
  accepted: '#66bb6a',
  attended: '#66bb6a',
  rejected: '#ff574e',
  unverified: '#ff574e',
}

type StatusSelectProps = {
  values: UserStatus[]
  onChange: (statuses: UserStatus[]) => void
}

const UserStatusFilter = (props: StatusSelectProps) => {
  const { values, onChange } = props

  const handleDelete = (selected: UserStatus) => () => {
    onChange(values.filter((value) => value !== selected))
  }

  return (
    <>
      <Select
        multiple
        value={values}
        onChange={(e) => onChange(e.target.value as UserStatus[])}
        fullWidth
        style={{
          fontSize: 'inherit',
          // hanatodo
          // ...(Object.keys(statuses).includes(value) && {
          //   color: statuses[value as UserStatus],
          // }),
        }}
        renderValue={() => <></>}
      >
        {Object.keys(statuses).map((option, i) => {
          if (option === 'unverified') return
          return (
            <MenuItem value={option} key={i + '-' + option}>
              {option}
            </MenuItem>
          )
        })}
      </Select>

      <Box component="div" sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
        {values.map((value) => (
          <Chip key={value} label={value} onDelete={handleDelete(value)} />
        ))}
      </Box>
    </>
  )
}

export default UserStatusFilter
