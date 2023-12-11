import { Controller, UseFormReturn } from 'react-hook-form'

import InfoIcon from '@mui/icons-material/Info'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

import FormMultiSelect from '@/components/Dashboard/RegistrationForms/FormComponents/FormMultiSelect'
import FormSelect from '@/components/Dashboard/RegistrationForms/FormComponents/FormSelect'
import FormTextArea from '@/components/Dashboard/RegistrationForms/FormComponents/FormTextArea'
import FormTextField from '@/components/Dashboard/RegistrationForms/FormComponents/FormTextField'
import {
  dietaryRestrictionsOptions,
  ethnicityOptions,
  genderOptions,
  OTHER_SPECIFY,
  pronounOptions,
  relationshipOptions,
  shirtSizeOptions,
} from '@/types/Application'
import { User } from '@/types/User'
import { AboutYouZodForm } from '@/types/Zod'

type Props = {
  user: User
  form: UseFormReturn<AboutYouZodForm>
  onNext: (data: AboutYouZodForm) => void
}

const AboutYou = (props: Props) => {
  const { user, form, onNext } = props

  const {
    control,
    getValues,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = form

  return (
    <form noValidate onSubmit={handleSubmit(onNext)}>
      <Grid container direction="column" gap="2.5rem">
        <Grid container direction="column" gap="1.25rem">
          <Typography variant="h2">Personal Information</Typography>
          <Box
            component="div"
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            alignItems="center"
            gap="1rem"
          >
            <Typography>Name</Typography>
            <Typography variant="h3">{user.first_name + ' ' + user.last_name}</Typography>
            <Tooltip title={'Update in account settings'} placement="right" arrow>
              <InfoIcon color="disabled" />
            </Tooltip>
          </Box>
          <Box
            component="div"
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            alignItems="center"
            gap="1rem"
          >
            <Typography>Email</Typography>
            <Typography variant="h3">{user.email}</Typography>
            <Tooltip title={'Update in account settings'} placement="right" arrow>
              <InfoIcon color="disabled" />
            </Tooltip>
          </Box>
          <Controller
            name="phone_number"
            control={control}
            render={({ field: { ref, ...field } }) => (
              <FormTextField
                label="Phone Number"
                type="tel"
                errors={errors}
                inputRef={ref}
                {...field}
              />
            )}
          />
        </Grid>

        <Grid container direction="column" gap="1.5rem">
          <Typography variant="h2">Profile Details</Typography>
          <Controller
            name="age"
            control={control}
            render={({ field: { ref, ...field } }) => (
              <FormTextField
                label="Age"
                type="number"
                errors={errors}
                inputProps={{ min: 1, max: 100 }}
                inputRef={ref}
                {...field}
              />
            )}
          />
          <Box
            component="div"
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            gap="1rem"
          >
            <Controller
              name="gender"
              control={control}
              render={({ field: { ref, ...field } }) => (
                <FormSelect
                  label="Gender"
                  options={genderOptions}
                  errors={errors}
                  inputRef={ref}
                  {...field}
                />
              )}
            />
            {watch('gender') == OTHER_SPECIFY && (
              <Controller
                name="gender_other"
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
              name="pronoun"
              control={control}
              render={({ field: { ref, ...field } }) => (
                <FormSelect
                  label="Pronouns"
                  options={pronounOptions}
                  errors={errors}
                  inputRef={ref}
                  {...field}
                />
              )}
            />
            {watch('pronoun') == OTHER_SPECIFY && (
              <Controller
                name="pronoun_other"
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
              name="ethnicity"
              control={control}
              render={({ field: { ref, ...field } }) => (
                <FormMultiSelect
                  label="Ethnicity"
                  options={ethnicityOptions}
                  errors={errors}
                  inputRef={ref}
                  {...field}
                  onChange={(e) => {
                    if (e.target.value.slice(-1) == 'Prefer not to say') {
                      setValue('ethnicity', ['Prefer not to say'], { shouldValidate: true })
                    } else {
                      field.onChange(e)
                      setValue(
                        'ethnicity',
                        getValues('ethnicity')?.filter((e) => e != 'Prefer not to say'),
                        { shouldValidate: true }
                      )
                    }
                  }}
                />
              )}
            />
            {watch('ethnicity')?.includes(OTHER_SPECIFY) && (
              <Controller
                name="ethnicity_other"
                control={control}
                render={({ field: { ref, ...field } }) => (
                  <FormTextField label="Other" errors={errors} inputRef={ref} {...field} />
                )}
              />
            )}
          </Box>
        </Grid>

        <Grid container direction="column" gap="1.5rem">
          <Typography variant="h2">Location</Typography>
          <Controller
            name="city"
            control={control}
            render={({ field: { ref, ...field } }) => (
              <FormTextField label="City" errors={errors} inputRef={ref} {...field} />
            )}
          />
          <Box
            component="div"
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            gap="1rem"
          >
            <Controller
              name="country"
              control={control}
              render={({ field: { ref, ...field } }) => (
                <FormTextField label="Country" errors={errors} inputRef={ref} {...field} />
              )}
            />
            <Controller
              name="province"
              control={control}
              render={({ field: { ref, ...field } }) => (
                <FormTextField
                  label="Province / State"
                  errors={errors}
                  optional
                  inputRef={ref}
                  {...field}
                />
              )}
            />
          </Box>
        </Grid>

        <Grid container direction="column" gap="1.5rem">
          <Typography variant="h2">Emergency Contact</Typography>
          <Controller
            name="emergency_name"
            control={control}
            render={({ field: { ref, ...field } }) => (
              <FormTextField
                label="Full Name"
                errors={errors}
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
            name="emergency_number"
            control={control}
            render={({ field: { ref, ...field } }) => (
              <FormTextField
                label="Phone Number"
                type="tel"
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
            gap="1rem"
          >
            <Controller
              name="emergency_relationship"
              control={control}
              render={({ field: { ref, ...field } }) => (
                <FormSelect
                  label="Relationship"
                  options={relationshipOptions}
                  errors={errors}
                  inputRef={ref}
                  {...field}
                />
              )}
            />
            {watch('emergency_relationship') == OTHER_SPECIFY && (
              <Controller
                name="emergency_relationship_other"
                control={control}
                render={({ field: { ref, ...field } }) => (
                  <FormTextField label="Other" errors={errors} inputRef={ref} {...field} />
                )}
              />
            )}
          </Box>
        </Grid>

        <Grid container direction="column" gap="1.5rem">
          <Typography variant="h2">Event Preferences</Typography>
          <Controller
            name="shirt_size"
            control={control}
            render={({ field: { ref, ...field } }) => (
              <FormSelect
                label="Shirt Size"
                options={shirtSizeOptions}
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
              name="diet_restriction"
              control={control}
              render={({ field: { ref, ...field } }) => (
                <FormMultiSelect
                  label="Dietary Restrictions"
                  options={dietaryRestrictionsOptions}
                  errors={errors}
                  inputRef={ref}
                  {...field}
                  onChange={(e) => {
                    if (e.target.value.slice(-1) == 'None') {
                      setValue('diet_restriction', ['None'], { shouldValidate: true })
                    } else {
                      field.onChange(e)
                      setValue(
                        'diet_restriction',
                        getValues('diet_restriction')?.filter((e) => e != 'None'),
                        { shouldValidate: true }
                      )
                    }
                  }}
                />
              )}
            />
            {watch('diet_restriction')?.includes(OTHER_SPECIFY) && (
              <Controller
                name="diet_restriction_other"
                control={control}
                render={({ field: { ref, ...field } }) => (
                  <FormTextField label="Other" errors={errors} inputRef={ref} {...field} />
                )}
              />
            )}
          </Box>
          <Controller
            name="additional_info"
            control={control}
            render={({ field: { ref, ...field } }) => (
              <FormTextArea
                label="Please list all additional allergies, dietary restrictions, or any other information that we may need to know to accommodate you."
                errors={errors}
                inputRef={ref}
                maxLength={128}
                optional
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

export default AboutYou
