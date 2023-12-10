import { Controller, UseFormReturn } from 'react-hook-form'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

import FormCheckbox from '@/components/Dashboard/RegistrationForms/FormComponents/FormCheckbox'
import FormSelect from '@/components/Dashboard/RegistrationForms/FormComponents/FormSelect'
import FormTextField from '@/components/Dashboard/RegistrationForms/FormComponents/FormTextField'
import { base } from '@/styles/theme'
import { deerhacksReachOptions } from '@/types/Application'
import { DeerhacksZodForm } from '@/types/Zod'

type Props = {
  form: UseFormReturn<DeerhacksZodForm>
  onNext: (data: DeerhacksZodForm) => void
}

const DeerhacksForm = (props: Props) => {
  const { form, onNext } = props

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = form

  return (
    <form noValidate onSubmit={handleSubmit(onNext)}>
      <Grid container direction="column" gap="2.5rem">
        <Grid container direction="column" gap="1.5rem">
          <Typography variant="h2">Reach</Typography>
          <Box
            component="div"
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            gap="1rem"
          >
            <Controller
              name="deerhacks_reach"
              control={control}
              render={({ field: { ref, ...field } }) => (
                <FormSelect
                  label="How did you hear about DeerHacks?"
                  options={deerhacksReachOptions}
                  errors={errors}
                  inputRef={ref}
                  {...field}
                />
              )}
            />
            {watch('deerhacks_reach') == 'Other (Specify)' && (
              <Controller
                name="deerhacks_reach_other"
                control={control}
                render={({ field: { ref, ...field } }) => (
                  <FormTextField label="Other" errors={errors} inputRef={ref} {...field} />
                )}
              />
            )}
          </Box>
        </Grid>

        <Grid container direction="column" gap="1.25rem">
          <Typography variant="h2">Meals</Typography>
          <Controller
            name="day1_dinner"
            control={control}
            render={({ field: { ref, ...field } }) => (
              <FormCheckbox label="Friday Dinner" errors={errors} inputRef={ref} {...field} />
            )}
          />
          <Controller
            name="day2_breakfast"
            control={control}
            render={({ field: { ref, ...field } }) => (
              <FormCheckbox label="Saturday Breakfast" errors={errors} inputRef={ref} {...field} />
            )}
          />
          <Controller
            name="day2_lunch"
            control={control}
            render={({ field: { ref, ...field } }) => (
              <FormCheckbox label="Saturday Lunch" errors={errors} inputRef={ref} {...field} />
            )}
          />
          <Controller
            name="day2_dinner"
            control={control}
            render={({ field: { ref, ...field } }) => (
              <FormCheckbox label="Saturday Dinner" errors={errors} inputRef={ref} {...field} />
            )}
          />
          <Controller
            name="day3_breakfast"
            control={control}
            render={({ field: { ref, ...field } }) => (
              <FormCheckbox label="Sunday Breakfast" errors={errors} inputRef={ref} {...field} />
            )}
          />
        </Grid>

        <Grid container direction="column" gap="1.25rem">
          <Typography variant="h2">MLH Permissions</Typography>
          <Controller
            name="mlh_authorize"
            control={control}
            render={({ field: { ref, ...field } }) => (
              <FormCheckbox
                label={
                  <>
                    I authorize DeerHacks to share my application/registration information with
                    Major League Hacking for event administration, ranking, and MLH administration
                    in-line with the MLH Privacy Policy. I further agree to the terms of both the{' '}
                    <Link
                      rel="noopener"
                      href="https://github.com/MLH/mlh-policies/blob/main/contest-terms.md"
                      target="_blank"
                      underline="always"
                      sx={{ opacity: 0.75 }}
                    >
                      MLH Contest Terms and Conditions
                    </Link>{' '}
                    and the{' '}
                    <Link
                      rel="noopener"
                      href="https://mlh.io/privacy"
                      target="_blank"
                      underline="always"
                      sx={{ opacity: 0.75 }}
                    >
                      MLH Privacy Policy
                    </Link>
                    .
                  </>
                }
                errors={errors}
                inputRef={ref}
                {...field}
              />
            )}
          />
          <Controller
            name="mlh_code_agreement"
            control={control}
            render={({ field: { ref, ...field } }) => (
              <FormCheckbox
                label={
                  <>
                    I have read and agree to the{' '}
                    <Link
                      rel="noopener"
                      href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf"
                      target="_blank"
                      underline="always"
                      sx={{ opacity: 0.75 }}
                    >
                      MLH Code of Conduct
                    </Link>
                    .
                  </>
                }
                errors={errors}
                inputRef={ref}
                {...field}
              />
            )}
          />
          <Controller
            name="mlh_subscribe"
            control={control}
            render={({ field: { ref, ...field } }) => (
              <FormCheckbox
                label={
                  <>
                    I authorize MLH to send me pre- and post-event informational emails, which
                    contain free credit and opportunities from their partners.{' '}
                    <span style={{ color: base.palette.text.secondary }}>(Optional)</span>
                  </>
                }
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

export default DeerhacksForm
