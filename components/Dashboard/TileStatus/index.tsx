import InfoIcon from '@mui/icons-material/Info'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import { UserStatus, UserStatusDescription } from '@/types/User'

type Props = {
  status: UserStatus
}

const TileStatus = (props: Props) => {
  const { status } = props

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h2" display="flex" alignItems="center" gap="0.5rem" gutterBottom>
          <InfoIcon color={UserStatusDescription[status][0]} fontSize="inherit" />
          {`Status / ${status.title()}`}
        </Typography>
        <Typography variant="body2">{UserStatusDescription[status][1]}</Typography>
      </CardContent>
    </Card>
  )
}

export default TileStatus
