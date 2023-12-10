import { FieldErrors } from 'react-hook-form'

import MenuItem from '@mui/material/MenuItem'
import TextField, { TextFieldProps } from '@mui/material/TextField'

type Props = {
  name: string
  label: string
  options: readonly string[]
  errors: FieldErrors
} & TextFieldProps

const FormSelect = (props: Props) => {
  const { name, label, options, errors, ...textFieldProps } = props

  return (
    <TextField
      select
      label={label}
      error={Boolean(errors[name])}
      helperText={errors[name]?.message as string}
      defaultValue=""
      {...textFieldProps}
    >
      {options.map((option, i) => {
        return (
          <MenuItem value={option} key={i + '-' + option}>
            {option}
          </MenuItem>
        )
      })}
    </TextField>
  )
}

export default FormSelect
