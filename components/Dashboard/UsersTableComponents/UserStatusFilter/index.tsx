import FilterListIcon from '@mui/icons-material/FilterList'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'

import { statusColors } from '@/components/Dashboard/UsersTableComponents/tableDefinitions'
import { UserStatus, userStatuses } from '@/types/User'

const sortStatuses = (values: string | string[]) => {
  if (typeof values === 'string') return []
  if (values.includes('clear')) return []
  return ['empty', ...userStatuses].filter((status) => values.includes(status)) as UserStatus[]
}

type StatusSelectProps = {
  label: string
  values: (UserStatus | 'empty')[]
  onChange: (statuses: UserStatus[]) => void
  hasEmpty?: boolean
}

const UserStatusFilter = (props: StatusSelectProps) => {
  const { label, values, onChange, hasEmpty = false } = props
  return (
    <TextField
      select
      SelectProps={{
        multiple: true,
        renderValue: () => (
          <Box component="div" sx={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {values.map((value) =>
              value === 'empty' ? (
                <Chip
                  key={value}
                  label={value}
                  style={{
                    borderColor: '#ffffffDD',
                    backgroundColor: '#ffffff11',
                  }}
                />
              ) : (
                <Chip
                  key={value}
                  label={value}
                  style={{
                    borderColor: statusColors[value] + 'DD',
                    backgroundColor: statusColors[value] + '11',
                  }}
                />
              )
            )}
          </Box>
        ),
        IconComponent: FilterListIcon,
        sx: {
          '& .MuiSelect-select': { paddingRight: '3.5rem !important' },
          '& .MuiSvgIcon-root': { fontSize: '1.25rem', transform: 'none', right: '1rem' },
        },
      }}
      label={label}
      value={values}
      onChange={(e) => onChange(sortStatuses(e.target.value))}
      fullWidth
      style={{ fontSize: 'inherit' }}
    >
      <MenuItem key="clear" value="clear" disabled={values.length === 0}>
        Clear Filters
      </MenuItem>
      <Divider />
      {hasEmpty && (
        <MenuItem value="empty">
          <Checkbox checked={values.includes('empty')} style={{ color: '#ffffff' }} />
          empty (no internal status)
        </MenuItem>
      )}
      {userStatuses.map((option, i) => (
        <MenuItem value={option} key={i + '-' + option}>
          <Checkbox checked={values.includes(option)} style={{ color: statusColors[option] }} />
          {option}
        </MenuItem>
      ))}
    </TextField>
  )
}

export default UserStatusFilter
