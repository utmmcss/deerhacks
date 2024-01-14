import FilterListIcon from '@mui/icons-material/FilterList'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'

import { statuses } from '@/components/Dashboard/UsersTableComponents/tableDefinitions'
import { UserStatus, userStatuses } from '@/types/User'

const sortStatuses = (values: string | string[]) => {
  if (typeof values === 'string') return []
  if (values.includes('clear')) return []
  return userStatuses.filter((status) => values.includes(status)) as UserStatus[]
}

type StatusSelectProps = {
  values: UserStatus[]
  onChange: (statuses: UserStatus[]) => void
}

const UserStatusFilter = (props: StatusSelectProps) => {
  const { values, onChange } = props
  return (
    <>
      <TextField
        select
        SelectProps={{
          multiple: true,
          renderValue: () => (
            <Box component="div" sx={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {values.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  style={{
                    borderColor: statuses[value] + 'DD',
                    backgroundColor: statuses[value] + '11',
                  }}
                />
              ))}
            </Box>
          ),
          IconComponent: FilterListIcon,
          sx: {
            '& .MuiSelect-select': { paddingRight: '3.5rem !important' },
            '& .MuiSvgIcon-root': { transform: 'none', right: '1rem' },
          },
        }}
        label="User Status Filters"
        value={values}
        onChange={(e) => onChange(sortStatuses(e.target.value))}
        fullWidth
        style={{ fontSize: 'inherit' }}
      >
        <MenuItem key="clear" value="clear" disabled={values.length === 0}>
          Clear Filters
        </MenuItem>
        <Divider />
        {userStatuses.map((option, i) => (
          <MenuItem value={option} key={i + '-' + option}>
            <Checkbox
              checked={values.includes(option as UserStatus)}
              style={{ color: statuses[option] }}
            />
            {option}
          </MenuItem>
        ))}
      </TextField>
    </>
  )
}

export default UserStatusFilter
