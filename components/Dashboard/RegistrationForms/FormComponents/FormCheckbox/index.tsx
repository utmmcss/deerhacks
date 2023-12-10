import { ReactNode } from 'react'
import { FieldErrors } from 'react-hook-form'

import Box from '@mui/material/Box'
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'

type Props = {
  label: ReactNode
  name: string
  errors: FieldErrors
  value: boolean
} & CheckboxProps

const FormCheckbox = (props: Props) => {
  const { label, name, errors, value, ...checkboxProps } = props
  return (
    <Box component="div">
      <FormControlLabel
        label={label}
        control={
          <Checkbox
            checked={value}
            {...(Boolean(errors[name]) && { color: 'error' })}
            {...checkboxProps}
          />
        }
      />
      <Typography className="formError">{errors[name]?.message as string}</Typography>
    </Box>
  )
}

export default FormCheckbox
