import NextLink from 'next/link'

import ElectricBoltIcon from '@mui/icons-material/ElectricBolt'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

import { UserStatus } from '@/types/User'

type Props = {
  status: UserStatus
}

const TileHackerPack = (props: Props) => {
  const { status } = props

  const disabled =
    ['pending', 'registering', 'applied', 'selected', 'rejected'].includes(status) || true // TODO: remove this line when Hacker Pack is ready

  return (
    <Tooltip title="">
      <Card variant={disabled ? 'outlined' : 'elevation'} elevation={disabled ? 0 : 5}>
        <CardActionArea
          href="/hackerpack.pdf"
          rel="noopener"
          target="_blank"
          LinkComponent={NextLink}
          disabled={disabled}
        >
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
              {disabled ? 'Coming Soon' : 'Your resource center for all things DeerHacks!'}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Tooltip>
  )
}

export default TileHackerPack
