import { Controller, UseFormReturn } from 'react-hook-form'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import FormCheckbox from '@/components/Dashboard/RegistrationForms/FormComponents/FormCheckbox'
import FormDynamicSelect from '@/components/Dashboard/RegistrationForms/FormComponents/FormDynamicSelect'
import FormMultiSelect from '@/components/Dashboard/RegistrationForms/FormComponents/FormMultiSelect'
import FormSelect from '@/components/Dashboard/RegistrationForms/FormComponents/FormSelect'
import FormTextField from '@/components/Dashboard/RegistrationForms/FormComponents/FormTextField'
import { getSchoolOptions } from '@/components/Dashboard/RegistrationForms/helpers'
import FullPageSpinner from '@/components/Shared/FullPageSpinner'
import { useSchoolList } from '@/hooks/Application/useSchoolList'
import {
  deerhacksExperienceOptions,
  educationOptions,
  hackathonExperienceOptions,
  interestsOptions,
  programOptions,
  teamPreferenceOptions,
} from '@/types/Application'
import { ExperienceZodForm } from '@/types/Zod'

type Props = {
  form: UseFormReturn<ExperienceZodForm>
  onNext: (data: ExperienceZodForm) => void
  schoolOptions: string[]
}

const ExperienceForm = (props: Props) => {
  const { form, onNext, schoolOptions } = props

  const {
    control,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = form

  return (
    <form noValidate onSubmit={handleSubmit(onNext)}>
      <Grid container direction="column" gap="2.5rem">
        <Grid container direction="column" gap="1.5rem">
          <Typography variant="h2">Education</Typography>
          <Box
            component="div"
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            gap="1rem"
          >
            <Controller
              name="education"
              control={control}
              render={({ field: { ref, ...field } }) => (
                <FormSelect
                  label="Level of Study"
                  options={educationOptions}
                  errors={errors}
                  inputRef={ref}
                  {...field}
                />
              )}
            />
            {watch('education') == 'Other (Specify)' && (
              <Controller
                name="education_other"
                control={control}
                render={({ field: { ref, ...field } }) => (
                  <FormTextField label="Other" errors={errors} inputRef={ref} {...field} />
                )}
              />
            )}
          </Box>
          <Box
            component="div"
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            gap="1rem"
          >
            <Controller
              name="school"
              control={control}
              render={({ field: { ref, ...field } }) => (
                <FormDynamicSelect
                  label="School (Last Attended)"
                  options={schoolOptions}
                  errors={errors}
                  inputRef={ref}
                  {...field}
                />
              )}
            />
            {watch('school') == 'Other (Specify)' && (
              <Controller
                name="school_other"
                control={control}
                render={({ field: { ref, ...field } }) => (
                  <FormTextField label="Other" errors={errors} inputRef={ref} {...field} />
                )}
              />
            )}
          </Box>
          <Box
            component="div"
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            gap="1rem"
          >
            <Controller
              name="program"
              control={control}
              render={({ field: { ref, ...field } }) => (
                <FormDynamicSelect
                  label="Program of Study"
                  options={programOptions}
                  errors={errors}
                  inputRef={ref}
                  {...field}
                />
              )}
            />
            {watch('program') == 'Other (Specify)' && (
              <Controller
                name="program_other"
                control={control}
                render={({ field: { ref, ...field } }) => (
                  <FormTextField label="Other" errors={errors} inputRef={ref} {...field} />
                )}
              />
            )}
          </Box>
        </Grid>

        <Grid container direction="column" gap="1.5rem">
          <Typography variant="h2">Professional Journey</Typography>
          <Typography> --- Resume goes here --- </Typography>
          <Controller
            name="resume_consent"
            control={control}
            render={({ field: { ref, ...field } }) => (
              <FormCheckbox
                label="I allow DeerHacks to distribute my resume to event sponsors."
                errors={errors}
                inputRef={ref}
                {...field}
              />
            )}
          />
          <Controller
            name="portfolio"
            control={control}
            render={({ field: { ref, ...field } }) => (
              <FormTextField
                label="Personal Website or Portfolio"
                errors={errors}
                optional
                inputRef={ref}
                {...field}
              />
            )}
          />
          <Controller
            name="github"
            control={control}
            render={({ field: { ref, ...field } }) => (
              <FormTextField label="GitHub" errors={errors} optional inputRef={ref} {...field} />
            )}
          />
          <Controller
            name="linkedin"
            control={control}
            render={({ field: { ref, ...field } }) => (
              <FormTextField label="LinkedIn" errors={errors} optional inputRef={ref} {...field} />
            )}
          />
        </Grid>

        <Grid container direction="column" gap="1.5rem">
          <Typography variant="h2">Hacker Details</Typography>
          <Controller
            name="hackathon_experience"
            control={control}
            render={({ field: { ref, ...field } }) => (
              <FormSelect
                label="Number of Hackathons Attended"
                options={hackathonExperienceOptions}
                errors={errors}
                inputRef={ref}
                {...field}
              />
            )}
          />
          <Controller
            name="deerhacks_experience"
            control={control}
            render={({ field: { ref, ...field } }) => (
              <FormMultiSelect
                label="Previous DeerHacks Attendance"
                options={deerhacksExperienceOptions}
                errors={errors}
                inputRef={ref}
                {...field}
                onChange={(e) => {
                  if (e.target.value.slice(-1) == deerhacksExperienceOptions[0]) {
                    setValue('deerhacks_experience', [deerhacksExperienceOptions[0]], {
                      shouldValidate: true,
                    })
                  } else {
                    field.onChange(e)
                    setValue(
                      'deerhacks_experience',
                      getValues('deerhacks_experience')?.filter(
                        (e) => e != deerhacksExperienceOptions[0]
                      ),
                      { shouldValidate: true }
                    )
                  }
                }}
              />
            )}
          />
          <Controller
            name="team_preference"
            control={control}
            render={({ field: { ref, ...field } }) => (
              <FormSelect
                label="Team Preferences"
                options={teamPreferenceOptions}
                errors={errors}
                inputRef={ref}
                {...field}
              />
            )}
          />
          <Box
            component="div"
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            maxWidth="100%"
            gap="1rem"
          >
            <Controller
              name="interests"
              control={control}
              render={({ field: { ref, ...field } }) => (
                <FormMultiSelect
                  // do we really need other, just make them choose ones that fit best??
                  // can only check 5
                  // does checking other uncheck all others?
                  label="Areas of Interest (Limit 5)"
                  options={interestsOptions}
                  errors={errors}
                  maxSelection={5}
                  inputRef={ref}
                  {...field}
                />
              )}
            />
            {watch('interests')?.includes('Other (Specify)') && (
              <Controller
                name="interests_other"
                control={control}
                render={({ field: { ref, ...field } }) => (
                  <FormTextField label="Other" errors={errors} inputRef={ref} {...field} />
                )}
              />
            )}
          </Box>
        </Grid>

        <Button type="submit">Next</Button>
      </Grid>
    </form>
  )
}

type ExperienceLoaderProps = {
  form: UseFormReturn<ExperienceZodForm>
  onNext: (data: ExperienceZodForm) => void
}

const ExperienceLoader = (props: ExperienceLoaderProps) => {
  const { form, onNext } = props

  const { data: schoolList, isLoading } = useSchoolList()

  return isLoading ? (
    <FullPageSpinner />
  ) : (
    <ExperienceForm
      form={form}
      onNext={onNext}
      schoolOptions={getSchoolOptions(schoolList ?? [])}
    />
  )
}

export default ExperienceLoader
