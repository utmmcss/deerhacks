import { Controller, UseFormReturn } from 'react-hook-form'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import FormCheckbox from '@/components/Dashboard/RegistrationForms/FormComponents/FormCheckbox'
import FormDynamicSelect from '@/components/Dashboard/RegistrationForms/FormComponents/FormDynamicSelect'
import FormMultiSelect from '@/components/Dashboard/RegistrationForms/FormComponents/FormMultiSelect'
import FormResumeUpload from '@/components/Dashboard/RegistrationForms/FormComponents/FormResumeUpload'
import FormSelect from '@/components/Dashboard/RegistrationForms/FormComponents/FormSelect'
import FormTextField from '@/components/Dashboard/RegistrationForms/FormComponents/FormTextField'
import {
  deerhacksExperienceOptions,
  educationOptions,
  hackathonExperienceOptions,
  interestsOptions,
  OTHER_SPECIFY,
  programOptions,
  ResumeUpdateResp,
  schoolOptions,
  teamPreferenceOptions,
} from '@/types/Application'
import { ExperienceZodForm } from '@/types/Zod'

type Props = {
  form: UseFormReturn<ExperienceZodForm>
  onNext: (data: ExperienceZodForm) => void
}

const ExperienceForm = (props: Props) => {
  const { form, onNext } = props

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
          <Typography variant="h3" color="text.secondary" gutterBottom>
            📚 Taking notes, breaking hearts
          </Typography>
          <Box
            component="div"
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            gap="1rem"
            width="100%"
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
            {watch('education') == OTHER_SPECIFY && (
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
                  setOtherField={(val: string) => {
                    setValue('school_other', val, { shouldValidate: true })
                  }}
                  inputRef={ref}
                  {...field}
                />
              )}
            />
            {watch('school') == OTHER_SPECIFY && (
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
                  setOtherField={(val: string) => {
                    setValue('program_other', val, { shouldValidate: true })
                  }}
                  inputRef={ref}
                  {...field}
                />
              )}
            />
            {watch('program') == OTHER_SPECIFY && (
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
          <Typography variant="h3" color="text.secondary" gutterBottom>
            🚀 Flex that Hello World python script
          </Typography>
          <FormResumeUpload
            name={getValues('resume_file_name')}
            link={getValues('resume_link')}
            updateCount={getValues('resume_update_count')}
            error={errors.resume_link}
            onSuccess={(resp: ResumeUpdateResp) => {
              setValue('resume_file_name', resp.resume_file_name, { shouldValidate: true })
              setValue('resume_link', resp.resume_link, { shouldValidate: true })
              setValue('resume_update_count', resp.resume_update_count, { shouldValidate: true })
            }}
          />
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
          <Typography variant="h3" color="text.secondary" gutterBottom>
            💻 Spill the code beans, what makes your circuits buzz
          </Typography>
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
                  label="Topics of Interest (Choose up to 5)"
                  options={interestsOptions}
                  errors={errors}
                  maxSelection={5}
                  inputRef={ref}
                  {...field}
                />
              )}
            />
            {watch('interests')?.includes(OTHER_SPECIFY) && (
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

export default ExperienceForm
