import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import Collapse from '@mui/material/Collapse'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import FormControlLabel from '@mui/material/FormControlLabel'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { APIError } from '@/api/types'
import LoadingButton from '@/components/Dashboard/LoadingButton'
import { useUserUpdate } from '@/hooks/User/useUserUpdate'
import { User } from '@/types/User'
import { emailField, textField } from '@/types/Zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { infer as Infer, object } from 'zod'

const schema = object({
  first_name: textField,
  last_name: textField,
  email: emailField,
})
type Form = Infer<typeof schema>

type Props = {
  user: User
  onSuccess: () => void
}

const AccountCreate = (props: Props) => {
  const { user, onSuccess } = props

  const [showAlert, setShowAlert] = useState(false)
  const [consent, setConsent] = useState(false)

  const { isLoading, mutate: userUpdate } = useUserUpdate()

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    setError,
  } = useForm<Form>({
    mode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues: { first_name: user.first_name, last_name: user.last_name, email: user.email },
  })

  const onSubmit = (data: Form) => {
    setShowAlert(false)
    userUpdate(data, {
      onSuccess,
      onError: (err) => {
        if ((err as APIError).apiError.status === 409) {
          setError('email', { type: '409', message: 'This email is already in use' })
        } else {
          setShowAlert(true)
        }
      },
    })
  }

  return (
    <>
      <DialogContent>
        <form noValidate>
          <Box component="div" display="flex" flexDirection="column" gap="1.5rem">
            <Collapse in={showAlert}>
              <Alert severity="error">Something went wrong, try again.</Alert>
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
                    autoFocus
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
            <Controller
              name="email"
              control={control}
              render={({ field: { ref, ...field } }) => (
                <TextField
                  label="Email"
                  error={Boolean(errors.email)}
                  placeholder={user.email}
                  helperText={errors.email?.message}
                  inputProps={{ maxLength: 128 }}
                  inputRef={ref}
                  {...field}
                />
              )}
            />
            <FormControlLabel
              sx={{ ml: 0 }}
              label={
                <Typography fontSize="0.9rem">
                  I allow DeerHacks to send me emails, containing updates and information from the
                  event sponsors.
                </Typography>
              }
              control={<Checkbox checked={consent} onChange={() => setConsent((curr) => !curr)} />}
            />
            <Typography fontSize="0.75rem" textAlign="center">
              A confirmation email will be sent to the email address you submit. Once verified, your
              user status will be updated to <code>registering</code>.
            </Typography>
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <LoadingButton
          loading={isLoading}
          onClick={handleSubmit(onSubmit)}
          disabled={!isDirty || !isValid || !consent}
        >
          Submit
        </LoadingButton>
      </DialogActions>
    </>
  )
}

export default AccountCreate
