import { FieldErrors } from 'react-hook-form'

import Box from '@mui/material/Box'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { base } from '@/styles/theme'

type Props = {
  label: string
  name: string
  value: string | undefined
  errors: FieldErrors
  maxLength?: number
  optional?: boolean
} & TextFieldProps

const FormTextArea = (props: Props) => {
  const {
    label,
    name,
    value,
    errors,
    maxLength = 1300,
    optional = false,
    ...textFieldProps
  } = props

  return (
    <Box component="div" display="flex" flexDirection="column" gap="0.5rem">
      <Typography>
        {label}{' '}
        {optional && <span style={{ color: base.palette.text.secondary }}> (Optional)</span>}
      </Typography>
      <TextField
        error={Boolean(errors[name])}
        helperText={
          <span style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>{errors[name]?.message as string}</span>
            <span>
              {value?.length ?? 0}/{maxLength}
            </span>
          </span>
        }
        multiline
        minRows={2}
        inputProps={{ maxLength }}
        value={value ?? ''}
        {...textFieldProps}
      />
    </Box>
  )
}

export default FormTextArea
