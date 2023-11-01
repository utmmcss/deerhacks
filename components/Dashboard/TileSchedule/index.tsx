import NextLink from 'next/link'

import GrainIcon from '@mui/icons-material/Grain'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import { UserStatus } from '@/types/User'

type Props = {
  status: UserStatus
}

const TileSchedule = (props: Props) => {
  const { status } = props

  const disabled = !['admin', 'moderator', 'volunteer', 'accepted', 'attended'].includes(status)

  return (
    <Card variant={disabled ? 'outlined' : 'elevation'} elevation={disabled ? 0 : 5}>
      <CardActionArea href="/dashboard/schedule" LinkComponent={NextLink} disabled={disabled}>
        <CardContent>
          <Typography
            variant="h1"
            display="flex"
            alignItems="center"
            textAlign="left"
            gap="0.5rem"
            gutterBottom
            color={disabled ? 'text.disabled' : 'text.primary'}
          >
            <GrainIcon color="info" fontSize="inherit" />
            Schedule
          </Typography>
          <Typography variant="body2">
            {disabled ? 'Coming Soon' : 'Explore DeerHacks events, workshops & more!'}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default TileSchedule
