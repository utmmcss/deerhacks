import NextLink from 'next/link'

import AdjustIcon from '@mui/icons-material/Adjust'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import { UserStatus } from '@/types/User'

type Props = {
  status: UserStatus
}

const TileRegistration = (props: Props) => {
  const { status } = props

  const disabled = ['pending', 'unverified'].includes(status)
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
              ? 'Registration is unavailable while user is unverified'
              : status === 'registering'
              ? 'Get started on your registration for DeerHacks 2024! Hacker applications are open until {TDB DATE}'
              : !noApplication
              ? 'Revisit your application to DeerHacks'
              : ''}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default TileRegistration
