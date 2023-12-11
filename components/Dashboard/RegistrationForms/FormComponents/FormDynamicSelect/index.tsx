import { FieldErrors } from 'react-hook-form'

import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import { FilterOptionsState } from '@mui/material/useAutocomplete'

type Props = {
  name: string
  label: string
  options: readonly string[]
  errors: FieldErrors
  onChange: (...event: any[]) => void
} & TextFieldProps

const FormDynamicSelect = (props: Props) => {
  const { name, label, errors, options, onChange, value, ...textFieldProps } = props

  const _filterOptions = createFilterOptions()
  const filterOptions = (options: unknown[], state: FilterOptionsState<unknown>) => {
    const results = _filterOptions(options, state)
    // always show 'Other (Specify)'
    if (!results.includes('Other (Specify)')) {
      results.push('Other (Specify)')
    }
    return results
  }

  return (
    <Autocomplete
      options={options}
      onChange={(e, value) => {
        onChange(value)
      }}
      value={value}
      filterOptions={filterOptions}
      renderInput={(params) => (
        <TextField
          label={label}
          error={Boolean(errors[name])}
          helperText={errors[name]?.message as string}
          defaultValue=""
          {...textFieldProps}
          {...params}
        ></TextField>
      )}
    />
  )
}

export default FormDynamicSelect
