import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Icon from '@mui/material/Icon'
import Typography from '@mui/material/Typography'

import theme from '@/styles/theme'

const DevpostIcon = () => {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.002 1.61 0 12.004 6.002 22.39h11.996L24 12.004 17.998 1.61zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31 0 4.436-3.21 6.302-6.456 6.302H7.595zm2.517 2.449v7.714h1.241c2.646 0 3.862-1.55 3.862-3.861.009-2.569-1.096-3.853-3.767-3.853z" />
    </svg>
  )
}

const TileDevpost = () => {
  const devpostLink = process.env.NEXT_PUBLIC_DEVPOST_URL ?? ''

  return (
    <Card variant={!devpostLink ? 'outlined' : 'elevation'}>
      <CardActionArea
        rel="noopener"
        href={devpostLink}
        target="_blank"
        disabled={!devpostLink}
        {...(devpostLink && { sx: { background: theme.palette.secondary.main } })}
      >
        <CardContent>
          <Typography
            variant="h3"
            display="flex"
            alignItems="center"
            gap="0.5rem"
            gutterBottom
            color={!devpostLink ? 'text.disabled' : '#003E54'}
          >
            <Icon fontSize="inherit">
              <DevpostIcon />
            </Icon>
            Devpost
          </Typography>
          <Typography color={!devpostLink ? 'text.disabled' : '#003E54'} variant="body2">
            {!devpostLink ? 'Coming Soon' : 'Project Submissions'}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default TileDevpost
