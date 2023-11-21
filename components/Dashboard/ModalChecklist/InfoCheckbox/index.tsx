import { ReactNode } from 'react'

import InfoIcon from '@mui/icons-material/Info'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Tooltip from '@mui/material/Tooltip'
import useMediaQuery from '@mui/material/useMediaQuery'

type Props = {
  checked?: boolean
  icon: ReactNode
  label: string
  tooltip?: string
}

const InfoCheckbox = (props: Props) => {
  const { checked, icon, label, tooltip } = props

  const hasHover = useMediaQuery('(hover: hover)')

  return (
    <Box component="div" display="flex" justifyContent="space-between" alignItems="center">
      <FormControlLabel
        checked={checked}
        control={<Checkbox icon={icon} />}
        label={label}
        sx={{ width: '100%' }}
        componentsProps={{ typography: { sx: { color: '#ccc' } } }}
      />
      {tooltip && hasHover && (
        <Tooltip title={tooltip} placement="left" arrow>
          <InfoIcon color="disabled" />
        </Tooltip>
      )}
    </Box>
  )
}

export default InfoCheckbox
