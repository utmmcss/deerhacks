import NextLink from 'next/link'

import ElectricBoltIcon from '@mui/icons-material/ElectricBolt'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import { UserStatus } from '@/types/User'

type Props = {
  status: UserStatus
}

const TileHackerPack = (props: Props) => {
  const { status } = props

  const disabled =
    ['pending', 'registering', 'applied', 'selected', 'rejected'].includes(status) || 1 === 1 // TODO: remove this line when Hacker Pack is ready

  return (
    <Card
      variant={disabled ? 'outlined' : 'elevation'}
      elevation={disabled ? 0 : 5}
      {...(!disabled && {
        sx: {
          backgroundImage:
            'radial-gradient(circle closest-corner at 60% 100%, rgb(255 129 24 / 34%), rgba(255, 255, 255, 0)),radial-gradient(circle farthest-side at 75% 16%, rgb(185 104 33 / 10%), rgba(255, 255, 255, 0) 35%),radial-gradient(circle closest-corner at 35% 62%, rgb(168 47 9 / 44%), rgba(255, 255, 255, 0) 76%),radial-gradient(circle farthest-side at 69% 81%, rgba(255, 0, 48, 0.1), rgba(255, 255, 255, 0) 76%),linear-gradient(#202124, #202124)',
        },
      })}
    >
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
  )
}

export default TileHackerPack
