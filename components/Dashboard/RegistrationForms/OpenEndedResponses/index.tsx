import { Controller, UseFormReturn } from 'react-hook-form'

import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import FormTextArea from '@/components/Dashboard/RegistrationForms/FormComponents/FormTextArea'
import { OpenEndedResponsesZodForm } from '@/types/Zod'

type Props = {
  form: UseFormReturn<OpenEndedResponsesZodForm>
  onNext: (data: OpenEndedResponsesZodForm) => void
}

const OpenEndedResponsesForm = (props: Props) => {
  const { form, onNext } = props

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form

  return (
    <form noValidate onSubmit={handleSubmit(onNext)}>
      <Grid container direction="column" gap="2.5rem">
        <Grid container direction="column" gap="1.5rem">
          <Typography variant="h2">DeerHacks Pitch</Typography>
          <Controller
            name="deerhacks_pitch"
            control={control}
            render={({ field: { ref, ...field } }) => (
              <FormTextArea
                label="Why do you want to take part in DeerHacks?"
                errors={errors}
                inputRef={ref}
                {...field}
              />
            )}
          />
        </Grid>

        <Grid container direction="column" gap="1.5rem">
          <Typography variant="h2">Past Project</Typography>
          <Controller
            name="shared_project"
            control={control}
            render={({ field: { ref, ...field } }) => (
              <FormTextArea
                label="Share a project or initiative you've worked on that you're particularly proud of. What was your role, and what impact did it have?"
                errors={errors}
                inputRef={ref}
                {...field}
              />
            )}
          />{' '}
        </Grid>

        <Grid container direction="column" gap="1.5rem">
          <Typography variant="h2">Future Technology</Typography>
          <Controller
            name="future_tech"
            control={control}
            render={({ field: { ref, ...field } }) => (
              <FormTextArea
                label="In your opinion, what is the most exciting or groundbreaking technology trend right now, and how might it impact our daily lives in the future?"
                errors={errors}
                inputRef={ref}
                {...field}
              />
            )}
          />
        </Grid>

        <Button type="submit">Next</Button>
      </Grid>
    </form>
  )
}

export default OpenEndedResponsesForm
