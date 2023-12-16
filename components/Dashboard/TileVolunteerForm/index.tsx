import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

type Props = {
  href: string
}

const TileVolunteerForm = (props: Props) => {
  const { href } = props

  return (
    <Card
      sx={{
        backgroundImage:
          'radial-gradient(circle closest-corner at 74% 18%, rgb(218 189 32 / 25%), rgb(255 255 255 / 6%)),radial-gradient(circle farthest-side at 71% 16%, rgba(154, 39, 238, 0.15), rgba(255, 255, 255, 0) 35%),radial-gradient(circle closest-corner at 59% 57%, rgb(214 19 19 / 22%), rgba(255, 255, 255, 0) 76%),radial-gradient(circle farthest-side at 49% 65%, rgb(213 109 20 / 25%), rgba(255, 255, 255, 0) 76%),linear-gradient(#202124, #202124)',
      }}
    >
      <CardActionArea rel="noopener" href={href} target="_blank">
        <CardContent sx={{ gap: '2rem' }}>
          <Typography
            color="primary"
            variant="h2"
            display="flex"
            alignItems="center"
            gap="0.5rem"
            gutterBottom
          >
            <EmojiPeopleIcon fontSize="inherit" />
            Volunteer Signup
          </Typography>
          <Typography variant="body2" color="text.primary">
            {'Want to volunteer for DeerHacks? Apply to be a volunteer before {TBD DATE}'}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default TileVolunteerForm
