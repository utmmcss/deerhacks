import NextLink from 'next/link'

import AdjustIcon from '@mui/icons-material/Adjust'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import { useFeatureToggle } from '@/contexts/FeatureToggle'
import { UserStatus } from '@/types/User'

type Props = {
  status: UserStatus
}

const TileRegistration = (props: Props) => {
  const { status } = props

  const { toggles } = useFeatureToggle()

  const disabledUser = ['pending', 'unverified'].includes(status)
  const disabled =
    disabledUser || (!toggles.signupHacker && status === 'registering' && !toggles.bypassPage)
  const noApplication = ['admin', 'moderator', 'volunteer'].includes(status)

  return (
    <Card
      variant={disabled || noApplication ? 'outlined' : 'elevation'}
      elevation={disabled || noApplication ? 0 : 5}
    >
      <CardActionArea
        href="/dashboard/registration"
        LinkComponent={NextLink}
        disabled={disabled || noApplication}
      >
        <CardContent>
          <Typography
            variant="h1"
            display="flex"
            alignItems="center"
            textAlign="left"
            gap="0.5rem"
            gutterBottom
            color={disabled || noApplication ? 'text.disabled' : 'text.primary'}
          >
            <AdjustIcon color="error" fontSize="inherit" />
            Register
          </Typography>
          <Typography variant="body2">
            {disabled
              ? `Registration is unavailable ${
                  disabledUser ? 'while email is unverified' : 'during this time'
                }`
              : status === 'registering'
              ? 'Get started on your registration for DeerHacks! Hacker applications are open until January 25, 2024'
              : noApplication
              ? `${status.title()}s cannot register as hackers`
              : 'Revisit your application to DeerHacks'}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default TileRegistration
