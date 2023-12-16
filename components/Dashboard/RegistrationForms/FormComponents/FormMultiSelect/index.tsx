import { FieldErrors } from 'react-hook-form'

import Checkbox from '@mui/material/Checkbox'
import MenuItem from '@mui/material/MenuItem'
import TextField, { TextFieldProps } from '@mui/material/TextField'

type Props = {
  name: string
  label: string
  options: readonly string[]
  value: readonly string[]
  errors: FieldErrors
  maxSelection?: number
} & TextFieldProps

const FormMultiSelect = (props: Props) => {
  const { name, label, options, value, errors, maxSelection, ...textFieldProps } = props

  return (
    <TextField
      select
      SelectProps={{ multiple: true, renderValue: () => value.join(', ') }}
      label={label}
      error={Boolean(errors[name])}
      helperText={errors[name]?.message as string}
      value={value}
      {...textFieldProps}
    >
      {options.map((option, i) => {
        return (
          <MenuItem
            value={option}
            key={i + '-' + option}
            disabled={!!maxSelection && !value.includes(option) && value.length == maxSelection}
          >
            <Checkbox checked={value.includes(option)} />
            {option}
          </MenuItem>
        )
      })}
    </TextField>
  )
}

export default FormMultiSelect
