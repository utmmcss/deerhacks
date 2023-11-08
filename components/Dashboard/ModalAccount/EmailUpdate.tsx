import { useEffect, useState } from 'react'
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
import { emailZod, User } from '@/types/User'
import { zodResolver } from '@hookform/resolvers/zod'
import { infer as Infer, object } from 'zod'

const schema = object({
  email: emailZod,
})
type Form = Infer<typeof schema>

type Props = {
  show: boolean
  user: User
  onSuccess: () => void
}

const EmailUpdate = (props: Props) => {
  const { show, user, onSuccess } = props

  const [showAlert, setShowAlert] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    setError,
    reset,
  } = useForm<Form>({
    mode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues: { email: user.email },
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

  useEffect(() => {
    if (show) {
      reset({ email: user.email })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show])

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Box component="div" display="flex" flexDirection="column" gap="1.5rem">
        <Collapse in={showAlert}>
          <Alert severity="error">Something went wrong, try again.</Alert>
        </Collapse>
        <Grid display="flex" flexDirection="row" gap="1rem">
          <Controller
            name="email"
            control={control}
            render={({ field: { ref, ...field } }) => (
              <TextField
                label="Email"
                error={Boolean(errors.email)}
                placeholder={user.email}
                helperText={errors.email?.message}
                autoFocus
                inputRef={ref}
                {...field}
              />
            )}
          />
        </Grid>
        {user.status === 'pending' ? (
          <Typography fontSize="0.75rem" textAlign="center">
            A confirmation email will be sent to the email address you submit. Once verified, your
            user status will be updated to <code>registering</code>.
          </Typography>
        ) : (
          <Typography fontSize="0.75rem" textAlign="center">
            Updating your email will revert your status to <code>pending</code>. You will need to
            verify your account via the confirmation email to update your status back to{' '}
            <code>registering</code>.
          </Typography>
        )}
        <Grid display="flex" justifyContent="end">
          <ButtonLoading
            isLoading={isLoading}
            variant="contained"
            size="small"
            onClick={handleSubmit(onSubmit)}
            disabled={user.status === 'registering' && !isDirty}
          >
            {user.status === 'pending' && !isDirty ? 'Resend Email' : 'Update'}
          </ButtonLoading>
        </Grid>
      </Box>
    </form>
  )
}

export default EmailUpdate
