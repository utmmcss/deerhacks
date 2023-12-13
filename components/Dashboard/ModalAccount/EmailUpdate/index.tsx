import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { APIError } from '@/api/types'
import LoadingButton from '@/components/Dashboard/LoadingButton'
import { useUserUpdate } from '@/hooks/User/useUserUpdate'
import { User } from '@/types/User'
import { emailField } from '@/types/Zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { infer as Infer, object } from 'zod'

const schema = object({
  email: emailField,
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
    formState: { errors, isDirty, isValid },
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
        if ((err as APIError).apiError.status == 409) {
          setError('email', { type: '409', message: 'This email is already in use' })
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
    <>
      <DialogContent>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Box component="div" display="flex" flexDirection="column" gap="1.5rem">
            <Collapse in={showAlert}>
              <Alert severity="error">Something went wrong, try again.</Alert>
            </Collapse>
            <Box component="div" display="flex" flexDirection="row" gap="1rem">
              <Controller
                name="email"
                control={control}
                render={({ field: { ref, ...field } }) => (
                  <TextField
                    label="Email"
                    error={Boolean(errors.email)}
                    placeholder={user.email}
                    helperText={errors.email?.message}
                    InputProps={{
                      classes: {
                        input: 'lowercase',
                      },
                    }}
                    inputRef={ref}
                    {...field}
                  />
                )}
              />
            </Box>
            {
              user.status === 'pending' ? (
                <Typography fontSize="0.75rem" textAlign="center">
                  A confirmation email will be sent to the email address you submit. Once verified,
                  your user status will be updated to <code>registering</code>.
                </Typography>
              ) : (
                <Typography fontSize="0.75rem" textAlign="center">
                  Important: Updating your email will revert your status to <code>pending</code>.
                  You will need to reverify your account via the confirmation email to update your
                  status back to <code>registering</code>.
                </Typography>
              )
              // hanatodo do we add text here too about how we'll send them emails
            }
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <LoadingButton
          loading={isLoading}
          onClick={handleSubmit(onSubmit)}
          disabled={user.status === 'registering' && !isDirty ? true : !isValid}
        >
          {user.status === 'pending' && !isDirty ? 'Resend Email' : 'Update'}
        </LoadingButton>
      </DialogActions>
    </>
  )
}

export default EmailUpdate
