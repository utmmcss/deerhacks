import NextLink from 'next/link'

import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

const TileUsersTable = () => {
  return (
    <Card elevation={5}>
      <CardActionArea href="/dashboard/users" LinkComponent={NextLink}>
        <CardContent>
          <Typography
            color="primary"
            variant="h2"
            display="flex"
            alignItems="center"
            gap="0.5rem"
            gutterBottom
          >
            <SupervisedUserCircleIcon fontSize="inherit" />
            Staff: Users Table
          </Typography>
          <Typography variant="body2">Interact with Hacker Data & Applications</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default TileUsersTable
