import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { ApiError } from '@/api/types'
import ButtonLoading from '@/components/Dashboard/ButtonLoading'
import { useUserUpdate } from '@/hooks/Users/useUserUpdate'
import { emailZod, nameZod, User } from '@/types/User'
import { zodResolver } from '@hookform/resolvers/zod'
import { infer as Infer, object } from 'zod'

const schema = object({
  first_name: nameZod,
  last_name: nameZod,
  email: emailZod,
})
type Form = Infer<typeof schema>

type Props = {
  user: User
  onSuccess: () => void
}

const FirstUserUpdate = (props: Props) => {
  const { user, onSuccess } = props

  const [showAlert, setShowAlert] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    setError,
  } = useForm<Form>({
    mode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues: { first_name: user.first_name, last_name: user.last_name, email: user.email },
  })

  const { isLoading, mutate: userUpdate } = useUserUpdate()
  const onSubmit = (data: Form) => {
    setShowAlert(false)
    userUpdate(data, {
      onSuccess,
      onError: (err) => {
        if ((err as ApiError).apiError.status == 409) {
          setError('email', { type: '409', message: 'Email already in use' })
        } else {
          setShowAlert(true)
        }
      },
    })
  }

  return (
    <form noValidate>
      <Box component="div" display="flex" flexDirection="column">
        <Collapse in={showAlert}>
          <Alert severity="error">Something went wrong, try again.</Alert>
        </Collapse>
        <Grid display="flex" flexDirection="column" gap="1rem">
          <Grid display="flex" flexDirection="row" gap="1rem">
            <Controller
              name="first_name"
              control={control}
              render={({ field: { ref, ...field } }) => (
                <TextField
                  label="First Name"
                  error={Boolean(errors.first_name)}
                  helperText={errors.first_name?.message}
                  autoFocus
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
          </Grid>
          <Controller
            name="email"
            control={control}
            render={({ field: { ref, ...field } }) => (
              <TextField
                label="Email"
                error={Boolean(errors.email)}
                placeholder={user.email}
                helperText={errors.email?.message}
                inputRef={ref}
                {...field}
              />
            )}
          />
          <Typography fontSize="0.75rem" textAlign="center">
            A confirmation email will be sent to the email address you submit. Once verified, your
            user status will be updated to <code>registering</code>.
          </Typography>
        </Grid>
        <Grid display="flex" justifyContent="end">
          <ButtonLoading
            isLoading={isLoading}
            variant="contained"
            size="small"
            onClick={handleSubmit(onSubmit)}
            disabled={!isDirty}
          >
            Submit
          </ButtonLoading>
        </Grid>
      </Box>
    </form>
  )
}

export default FirstUserUpdate
