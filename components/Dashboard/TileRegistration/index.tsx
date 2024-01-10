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
  const disabled = disabledUser || (!toggles.signupHacker && status === 'registering')
  const noApplication = ['admin', 'moderator', 'volunteer'].includes(status)

  return (
    <Card
      variant={disabled || noApplication ? 'outlined' : 'elevation'}
      elevation={disabled || noApplication ? 0 : 5}
      {...(!disabled &&
        !noApplication && {
          sx: {
            backgroundImage:
              'radial-gradient(circle closest-corner at 62% 44%, rgb(209 52 132 / 30%), rgba(255, 255, 255, 0)),radial-gradient(circle farthest-side at 75% 16%, rgb(255 255 255 / 10%), rgba(255, 255, 255, 0) 35%),radial-gradient(circle closest-corner at 32% 38%, rgb(87 65 174 / 20%), rgba(255, 255, 255, 0) 76%),radial-gradient(circle farthest-side at 69% 81%, rgba(255, 0, 48, 0.1), rgba(255, 255, 255, 0) 76%),linear-gradient(#202124, #202124)',
          },
        })}
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
              ? 'Get started on your registration for DeerHacks! Hacker applications are open until January 25'
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
