import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import TextField from '@mui/material/TextField'

import LoadingButton from '@/components/Dashboard/LoadingButton'
import { useUserUpdate } from '@/hooks/User/useUserUpdate'
import { User } from '@/types/User'
import { textField } from '@/types/Zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { infer as Infer, object } from 'zod'

const schema = object({
  first_name: textField,
  last_name: textField,
})
type Form = Infer<typeof schema>

type Props = {
  show: boolean
  user: User
  onSuccess: () => void
}

const NameUpdate = (props: Props) => {
  const { show, user, onSuccess } = props

  const [showAlert, setShowAlert] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm<Form>({
    mode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues: { first_name: user.first_name, last_name: user.last_name },
  })

  const { isLoading, mutate: userUpdate } = useUserUpdate()
  const onSubmit = (data: Form) => {
    setShowAlert(false)
    userUpdate(data, {
      onSuccess,
      onError: () => {
        setShowAlert(true)
      },
    })
  }

  useEffect(() => {
    if (show) {
      reset({ first_name: user.first_name, last_name: user.last_name })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show])

  return (
    <>
      <DialogContent>
        <form noValidate>
          <Box component="div" display="flex" flexDirection="column" gap="1.5rem">
            <Collapse in={showAlert}>
              <Alert severity="error">Something went wrong, try again later.</Alert>
            </Collapse>
            <Box
              component="div"
              display="flex"
              flexDirection={{ xs: 'column', sm: 'row' }}
              gap="1rem"
            >
              <Controller
                name="first_name"
                control={control}
                render={({ field: { ref, ...field } }) => (
                  <TextField
                    label="First Name"
                    error={Boolean(errors.first_name)}
                    helperText={errors.first_name?.message}
                    inputProps={{ maxLength: 128 }}
                    InputProps={{
                      classes: {
                        input: 'capitalize',
                      },
                    }}
                    inputRef={ref}
                    {...field}
                  />
                )}
              />
              <Controller
                name="last_name"
                control={control}
                render={({ field: { ref, ...field } }) => (
                  <TextField
                    label="Last Name"
                    error={Boolean(errors.last_name)}
                    helperText={errors.last_name?.message}
                    inputProps={{ maxLength: 128 }}
                    InputProps={{
                      classes: {
                        input: 'capitalize',
                      },
                    }}
                    inputRef={ref}
                    {...field}
                  />
                )}
              />
            </Box>
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <LoadingButton
          loading={isLoading}
          disabled={!isDirty || !isValid}
          onClick={handleSubmit(onSubmit)}
        >
          Update
        </LoadingButton>
      </DialogActions>
    </>
  )
}

export default NameUpdate
