import { FieldErrors } from 'react-hook-form'

import TextField, { TextFieldProps } from '@mui/material/TextField'

import { base } from '@/styles/theme'

type Props = {
  label: string
  name: string
  errors: FieldErrors
  optional?: boolean
} & TextFieldProps

const FormTextField = (props: Props) => {
  const { label, name, errors, optional = false, ...textFieldProps } = props

  return (
    <TextField
      label={
        <>
          {label}{' '}
          {optional && <span style={{ color: base.palette.text.secondary }}>(Optional)</span>}
        </>
      }
      error={Boolean(errors[name])}
      helperText={errors[name]?.message as string}
      inputProps={{ maxLength: 128 }}
      {...textFieldProps}
    />
  )
}

export default FormTextField
