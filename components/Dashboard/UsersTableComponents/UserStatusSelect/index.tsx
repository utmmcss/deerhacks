import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Tooltip from '@mui/material/Tooltip'

import { statusColors } from '@/components/Dashboard/UsersTableComponents/tableDefinitions'
import { useAuth } from '@/contexts/Auth'
import { UserStatus, userStatuses } from '@/types/User'

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
            color: statusColors[value],
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
            color: statusColors[value],
          }),
          '& .MuiInput-input:focus': {
            backgroundColor: 'transparent',
          },
        }}
        variant="standard"
        disableUnderline
      >
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
            Clear Status
          </MenuItem>
        )}
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
        <Divider />
        {userStatuses.map((option, i) => {
          const disabled =
            user?.status === 'moderator' &&
            ['admin', 'moderator', 'applied', 'accepted'].includes(option)
          return (
            <MenuItem
              value={option}
              key={i + '-' + option}
              sx={{
                ...(!disabled && {
                  color: statusColors[option],
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
