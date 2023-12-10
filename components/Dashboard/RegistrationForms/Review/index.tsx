import CheckIcon from '@mui/icons-material/Check'
import DoDisturbIcon from '@mui/icons-material/DoDisturb'
import InfoIcon from '@mui/icons-material/Info'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

import { Application } from '@/types/Application'
import { User } from '@/types/User'

type Props = {
  user: User
  application: Application
  onSubmit: () => void
}

const FormReview = (props: Props) => {
  const { user, application, onSubmit } = props

  return (
    <Grid container direction="column" gap="2.5rem">
      <Grid container direction="column" gap="1.25rem">
        <Typography variant="h2">Personal Information</Typography>
        <FieldReview
          name="Name"
          value={user.first_name + ' ' + user.last_name}
          tooltipTitle="Update in account settings"
        />
        <FieldReview name="Email" value={user.email} tooltipTitle="Update in account settings" />
        <FieldReview name="Phone Number" value={application.phone_number} />
        <br />
        <FieldReview name="Age" value={application.age.toString()} />
        <FieldReview name="Gender" value={application.gender} />
        <FieldReview name="Pronoun" value={application.pronoun} />
        <FieldReview name="Ethnicity" value={application.ethnicity.join(', ')} />
        <br />
        <FieldReview
          name="Address"
          value={
            application.province
              ? application.city + ' ' + application.province + ' ' + application.country
              : application.city + ' ' + application.country
          }
        />
        <br />
        <FieldReview name="Emergency Contact Name" value={application.emergency_name} />
        <FieldReview
          name="Emergency Contact Number"
          value={application.emergency_number.toString()}
        />
        <FieldReview
          name="Emergency Contact Relationship"
          value={application.emergency_relationship}
        />
        <br />
        <FieldReview name="Shirt Size" value={application.shirt_size} />
        <FieldReview name="Dietary Restrictions" value={application.diet_restriction.join(', ')} />
        {application.additional_info && (
          <FieldReview
            name="Additional Info"
            value={application.additional_info}
            direction="column"
          />
        )}
      </Grid>

      <Grid container direction="column" gap="1.25rem">
        <Typography variant="h2">Experience</Typography>
        <FieldReview name="Education" value={application.education} />
        <FieldReview name="School" value={application.school} />
        <FieldReview name="Program" value={application.program} />
        <br />
        <FieldReview name="Resume" value={'hanatodo'} />
        {application.portfolio && (
          <FieldReview name="Personal Website / Portfolio" value={application.portfolio} />
        )}
        {application.github && <FieldReview name="GitHub" value={application.github} />}
        {application.linkedin && <FieldReview name="LinkedIn" value={application.linkedin} />}
        <br />
        <FieldReview
          name="Number of Hackathons Attended"
          value={application.hackathon_experience}
        />
        <FieldReview
          name="Previous DeerHacks Attendance"
          value={application.deerhacks_experience.join(', ')}
        />
        <FieldReview name="Team Preferences" value={application.team_preference} />
        <FieldReview name="Areas of Interest" value={application.interests.join(', ')} />
      </Grid>

      <Grid container direction="column" gap="1.25rem">
        <Typography variant="h2">Open Ended Responses</Typography>
        <FieldReview
          name="Why do you want to take part in DeerHacks?"
          value={application.deerhacks_pitch}
          direction="column"
        />
        <FieldReview
          name="Share a project or initiative you've worked on that you're particularly proud of. What was your role, and what impact did it have?"
          value={application.shared_project}
          direction="column"
        />
        <FieldReview
          name="In your opinion, what is the most exciting or groundbreaking technology trend right now, and how might it impact our daily lives in the future?"
          value={application.future_tech}
          direction="column"
        />
      </Grid>

      <Grid container direction="column" gap="1.25rem">
        <Typography variant="h2">DeerHacks</Typography>
        <FieldReview name="How did you hear about DeerHacks?" value={application.deerhacks_reach} />
        <br />
        <FieldReview name="Meals" value={getMeals(application)} />
        <br />
        <CheckBoxReview
          name="MLH Terms and Conditions & Privacy Policy"
          value={application.mlh_authorize}
        />
        <CheckBoxReview name="MLH Code of Conduct" value={application.mlh_code_agreement} />
        <CheckBoxReview name="MLH Email Subscription" value={application.mlh_subscribe} />
      </Grid>

      <Button onClick={onSubmit}>submit</Button>
    </Grid>
  )
}

type FieldReviewProps = {
  name: string
  value: string
  tooltipTitle?: string
  direction?: 'row' | 'column'
}

const FieldReview = (props: FieldReviewProps) => {
  const { name, value, tooltipTitle, direction = 'row' } = props
  return (
    <Box
      component="div"
      display="flex"
      flexDirection={{ xs: 'column', sm: direction }}
      alignItems={{ xs: 'start', sm: direction == 'row' ? 'center' : 'start' }}
      justifyContent="space-between"
    >
      <Typography>{name}</Typography>
      <Box component="div" display="flex" gap="1rem" alignItems="center">
        {value && value.trim() ? (
          <Typography variant="h3">{value}</Typography>
        ) : (
          <Tooltip title="Missing" placement="right" arrow>
            <InfoIcon color="error" />
          </Tooltip>
        )}
        {tooltipTitle && (
          <Tooltip title={tooltipTitle} placement="right" arrow>
            <InfoIcon color="disabled" />
          </Tooltip>
        )}
      </Box>
    </Box>
  )
}

type CheckBoxReviewProps = {
  name: string
  value: boolean
}

const CheckBoxReview = (props: CheckBoxReviewProps) => {
  const { name, value } = props
  return (
    <Box
      component="div"
      display="flex"
      flexDirection={{ xs: 'column', sm: 'row' }}
      alignItems={{ xs: 'start', sm: 'center' }}
      justifyContent="space-between"
    >
      <Typography>{name}</Typography>
      <Box component="div" display="flex" gap="1rem" alignItems="center">
        {value ? <CheckIcon /> : <DoDisturbIcon />}
      </Box>
    </Box>
  )
}

const getMeals = (app: Application) => {
  const meals = []

  if (app.day1_dinner) meals.push('Day 1 Dinner')
  if (app.day2_breakfast) meals.push('Day 2 Breakfast')
  if (app.day2_lunch) meals.push('Day 2 Lunch')
  if (app.day2_dinner) meals.push('Day 2 Dinner')
  if (app.day3_breakfast) meals.push('Day 3 Breakfast')

  return meals.length ? meals.join(', ') : 'None'
}

export default FormReview
