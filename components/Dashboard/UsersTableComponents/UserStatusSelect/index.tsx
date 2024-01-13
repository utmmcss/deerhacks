import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Tooltip from '@mui/material/Tooltip'

import { useAuth } from '@/contexts/Auth'
import { UserStatus, userStatuses } from '@/types/User'

const statuses: {
  [key in UserStatus]: string
} = {
  admin: 'white',
  moderator: 'white',
  volunteer: 'white',
  pending: '#b1dbff',
  registering: '#56caff',
  applied: '#ffadf4',
  selected: '#bcffb1',
  accepted: '#53e25a',
  attended: '#bb86fc',
  rejected: '#ff6883',
}

// hanatodo
export const original_statuses: {
  [key in UserStatus]: string
} = {
  admin: '#29b6f6',
  moderator: '#29b6f6',
  volunteer: '#29b6f6',
  pending: '#ffa726',
  registering: '#ffa726',
  applied: '#66bb6a',
  selected: '#ffa726',
  accepted: '#66bb6a',
  attended: '#66bb6a',
  rejected: '#ff574e',
}

type StatusSelectProps = {
  value: UserStatus | ''
  onChange: (status: string) => void
  originalValue: UserStatus | ''
  disabled?: boolean
  isClearable?: boolean
}

const UserStatusSelect = (props: StatusSelectProps) => {
  const { value, onChange, originalValue, disabled = false, isClearable = false } = props

  const { user } = useAuth()

  if (disabled)
    return (
      <span
        style={{
          ...(value !== '' && {
            color: statuses[value],
          }),
        }}
      >
        {value}
      </span>
    )

  return (
    <Tooltip
      open={false}
      title={value}
      placement="bottom-start"
      PopperProps={{ sx: { zIndex: 1000 } }}
    >
      <Select
        value={value}
        onChange={(e) => {
          if (e.target.value === 'revert') {
            onChange(originalValue)
            return
          }
          if (e.target.value === 'clear') {
            onChange('')
            return
          }
          onChange(e.target.value)
        }}
        fullWidth
        sx={{
          fontSize: 'inherit',
          ...(value !== '' && {
            color: statuses[value],
          }),
          '& .MuiInput-input:focus': {
            backgroundColor: 'transparent',
          },
        }}
        variant="standard"
        disableUnderline
      >
        <MenuItem
          value="revert"
          key="revert"
          sx={{
            fontSize: '0.8rem',
            justifyContent: 'center',
          }}
          disabled={value === originalValue}
        >
          Undo Changes
        </MenuItem>
        {isClearable && (
          <MenuItem
            value="clear"
            key="clear"
            sx={{
              fontSize: '0.8rem',
              justifyContent: 'center',
            }}
            disabled={value === ''}
          >
            Clear Field
          </MenuItem>
        )}
        <Divider />
        {userStatuses.map((option, i) => {
          const disabled = user?.status === 'moderator' && ['admin', 'moderator'].includes(option)
          return (
            <MenuItem
              value={option}
              key={i + '-' + option}
              sx={{
                ...(!disabled && {
                  color: statuses[option],
                  opacity: 0.8,
                }),
              }}
              disabled={disabled}
            >
              {option}
            </MenuItem>
          )
        })}
      </Select>
    </Tooltip>
  )
}

export default UserStatusSelect
