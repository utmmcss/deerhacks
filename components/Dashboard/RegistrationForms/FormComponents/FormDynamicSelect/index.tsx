import { useState } from 'react'
import { FieldErrors } from 'react-hook-form'

import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import { FilterOptionsState } from '@mui/material/useAutocomplete'

import { OTHER_SPECIFY } from '@/types/Application'

type Props = {
  name: string
  label: string
  value: string
  options: readonly string[]
  errors: FieldErrors
  onChange: (...event: any[]) => void
  setOtherField: (value: string) => void
} & TextFieldProps

const FormDynamicSelect = (props: Props) => {
  const { name, label, errors, options, onChange, value, setOtherField, ...textFieldProps } = props

  const [input, setInput] = useState(value)

  const _filterOptions = createFilterOptions()
  const filterOptions = (options: unknown[], state: FilterOptionsState<unknown>) => {
    const results = _filterOptions(options, state)
    // always show 'Other (Specify)'
    if (!results.includes(OTHER_SPECIFY)) {
      results.push(OTHER_SPECIFY)
    }
    return results
  }

  return (
    <Autocomplete
      options={options}
      onChange={(e, value, reason) => {
        if (reason === 'selectOption' || reason === 'blur') {
          if (value === OTHER_SPECIFY) {
            setOtherField(input)
          }
          onChange(value)
        }
      }}
      onInputChange={(e, value, reason) => {
        if (reason === 'input') setInput(value)
      }}
      value={value || null}
      filterOptions={filterOptions}
      forcePopupIcon
      autoComplete
      autoSelect
      autoHighlight
      renderInput={(params) => (
        <TextField
          label={label}
          error={Boolean(errors[name])}
          helperText={errors[name]?.message as string}
          {...textFieldProps}
          {...params}
        />
      )}
    />
  )
}

export default FormDynamicSelect
