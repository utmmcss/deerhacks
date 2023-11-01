import ElectricBoltIcon from '@mui/icons-material/ElectricBolt'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

import { useFeatureToggle } from '@/contexts/FeatureToggle'
import { UserStatus } from '@/types/User'

type Props = {
  status: UserStatus
}

const TileHackerPack = (props: Props) => {
  const { status } = props

  const { toggles } = useFeatureToggle()

  const disabled =
    ['pending', 'registering', 'applied', 'selected', 'rejected', 'unverified'].includes(status) ||
    !toggles.hackerPack

  return (
    <Tooltip title="">
      <Card variant={disabled ? 'outlined' : 'elevation'} elevation={disabled ? 0 : 5}>
        <CardActionArea href="/HackerPack.pdf" disabled={disabled}>
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
              <ElectricBoltIcon color="warning" fontSize="inherit" />
              Hacker Pack
            </Typography>
            <Typography variant="body2">
              {disabled
                ? 'Coming Soon'
                : 'Your resource center for all things DeerHacks! Please review it before attending for the best experience'}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Tooltip>
  )
}

export default TileHackerPack
