import { ReactNode } from 'react'

import CheckIcon from '@mui/icons-material/Check'
import DoDisturbIcon from '@mui/icons-material/DoDisturb'
import InfoIcon from '@mui/icons-material/Info'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

import { Application, OTHER_SPECIFY } from '@/types/Application'
import { User } from '@/types/User'

type Props = {
  user: User
  application: Application
  onSubmit?: () => void
}

const FormReview = (props: Props) => {
  const { user, application, onSubmit } = props

  return (
    <Grid container direction="column" gap="2.5rem">
      <Grid container direction="column" gap="1.25rem">
        <Typography variant="h2">Personal Information</Typography>
        <FieldReview name="Name" value={user.first_name + ' ' + user.last_name} />
        <FieldReview name="Email" value={user.email} />
        <FieldReview name="Phone Number" value={application.phone_number} />
        <br />
        <FieldReview name="Age" value={application.age.toString()} />
        <FieldReview name="Gender" value={application.gender} />
        <FieldReview name="Pronoun" value={application.pronoun} />
        <FieldReview name="Ethnic Origins" value={formatList(application.ethnicity)} isList />
        <br />
        <FieldReview
          name="Address"
          value={
            application.province
              ? `${application.city} ${application.province}, ${application.country}`
              : `${application.city}, ${application.country}`
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
        <FieldReview
          name="Dietary Restrictions"
          value={formatList(application.diet_restriction)}
          isList
        />
        {application.additional_info && (
          <FieldReview name="Additional Accommodations" value={application.additional_info} />
        )}
      </Grid>

      <Grid container direction="column" gap="1.25rem">
        <Typography variant="h2">Experience</Typography>
        <FieldReview name="Education" value={application.education} />
        <FieldReview name="School" value={application.school} />
        <FieldReview name="Program" value={application.program} />
        <br />
        <FieldReview
          name="Resume"
          value={application.resume_file_name}
          valueNode={
            <Link href={application.resume_link} rel="noopener" target="_blank">
              {application.resume_file_name}
            </Link>
          }
        />
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
          value={formatList(application.deerhacks_experience)}
          isList
        />
        <FieldReview name="Team Preferences" value={application.team_preference} />
        <FieldReview name="Topics of Interest" value={formatList(application.interests)} isList />
      </Grid>

      <Grid container direction="column" gap="1.25rem">
        <Typography variant="h2">Open Ended Responses</Typography>
        <FieldReview
          name="Why do you want to take part in DeerHacks?"
          value={application.deerhacks_pitch}
        />
        <FieldReview
          name="Share a project or initiative you've worked on that you're particularly proud of. What was your role, and what impact did it have?"
          value={application.shared_project}
        />
        <FieldReview
          name="In your opinion, what is the most exciting or groundbreaking technology trend right now, and how might it impact our daily lives in the future?"
          value={application.future_tech}
        />
      </Grid>

      <Grid container direction="column" gap="1.25rem">
        <Typography variant="h2">DeerHacks</Typography>
        <FieldReview
          name="Where Did You First Hear About DeerHacks?"
          value={application.deerhacks_reach}
        />
        <br />
        <FieldReview name="Meals" value={getMeals(application)} isList />
        <br />
        <CheckBoxReview
          name="MLH Terms and Conditions & Privacy Policy"
          value={application.mlh_authorize}
        />
        <CheckBoxReview name="MLH Code of Conduct" value={application.mlh_code_agreement} />
        <CheckBoxReview name="MLH Email Subscription" value={application.mlh_subscribe} />
      </Grid>

      {onSubmit && <Button onClick={onSubmit}>Submit Application</Button>}
    </Grid>
  )
}

const formatList = (values: string[]) => {
  return values.filter((val) => val !== OTHER_SPECIFY).join(',\n')
}

type FieldReviewProps = {
  name: string
  value: string
  valueNode?: ReactNode
  isList?: boolean
}

const FieldReview = (props: FieldReviewProps) => {
  const { name, value, valueNode, isList = false } = props
  return (
    <Box component="div" display="flex" flexDirection="column">
      <Typography>{name}</Typography>
      <Box component="div" display="flex" gap="1rem">
        {valueNode ? (
          valueNode
        ) : value && value.trim() ? (
          <Typography
            variant="h3"
            {...(isList && { whiteSpace: 'pre' })}
            textOverflow="ellipsis"
            style={{ overflowWrap: 'anywhere' }}
          >
            {value}
          </Typography>
        ) : (
          <Tooltip title="Missing" placement="left" arrow>
            <InfoIcon color="error" />
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
    <Box component="div" display="flex" flexDirection="column">
      <Typography>{name}</Typography>
      <Box component="div" display="flex" gap="1rem" alignItems="center">
        {value ? <CheckIcon color="secondary" /> : <DoDisturbIcon color="secondary" />}
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

  return meals.length ? formatList(meals) : 'None'
}

export default FormReview
