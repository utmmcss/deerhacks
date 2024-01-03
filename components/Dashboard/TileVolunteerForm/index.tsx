import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople'
import PushPinIcon from '@mui/icons-material/PushPin'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

type Props = {
  href: string
  disabled?: boolean
}

const TileVolunteerForm = (props: Props) => {
  const { href, disabled = false } = props

  return (
    <Card
      variant={disabled ? 'outlined' : 'elevation'}
      sx={{
        overflow: 'visible',
        ...(!disabled && {
          backgroundImage:
            'radial-gradient(circle closest-corner at 74% 18%, rgb(218 189 32 / 25%), rgb(255 255 255 / 6%)),radial-gradient(circle farthest-side at 71% 16%, rgba(154, 39, 238, 0.15), rgba(255, 255, 255, 0) 35%),radial-gradient(circle closest-corner at 59% 57%, rgb(214 19 19 / 22%), rgba(255, 255, 255, 0) 76%),radial-gradient(circle farthest-side at 49% 65%, rgb(213 109 20 / 25%), rgba(255, 255, 255, 0) 76%),linear-gradient(#202124, #202124)',
        }),
      }}
    >
      <CardActionArea rel="noopener" href={href} target="_blank" disabled={disabled}>
        <CardContent sx={{ gap: '2rem' }}>
          <PushPinIcon
            sx={{
              position: 'absolute',
              top: '-0.5rem',
              right: '-0.5rem',
              transform: 'rotate(45deg)',
            }}
          />
          <Typography
            color={disabled ? 'text.disabled' : 'primary'}
            variant="h2"
            display="flex"
            alignItems="center"
            gap="0.5rem"
            gutterBottom
          >
            <EmojiPeopleIcon fontSize="inherit" />
            Volunteer Signup
          </Typography>
          <Typography variant="body2" color={disabled ? 'text.disabled' : 'text.primary'}>
            {disabled
              ? 'Signup is unavailable while user is unverified'
              : 'Want to volunteer for DeerHacks? Apply to be a volunteer before January 30'}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default TileVolunteerForm
