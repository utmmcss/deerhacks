import EngineeringIcon from '@mui/icons-material/Engineering'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

type Props = {
  href: string
  disabled?: boolean
}

const TileMentorForm = (props: Props) => {
  const { href, disabled = false } = props

  return (
    <Card
      variant={disabled ? 'outlined' : 'elevation'}
      {...(!disabled && {
        sx: {
          backgroundImage:
            'radial-gradient(circle closest-corner at 20% 6%, rgb(32 218 133 / 25%), rgb(255 255 255 / 6%)),radial-gradient(circle farthest-side at 71% 16%, rgba(154, 39, 238, 0.15), rgba(255, 255, 255, 0) 35%),radial-gradient(circle closest-corner at 73% 64%, rgb(214 142 19 / 22%), rgba(255, 255, 255, 0) 76%),radial-gradient(circle farthest-side at 69% 81%, rgb(56 40 202 / 25%), rgba(255, 255, 255, 0) 76%),linear-gradient(#202124, #202124)',
        },
      })}
    >
      <CardActionArea rel="noopener" href={href} target="_blank" disabled={disabled}>
        <CardContent sx={{ gap: '2rem' }}>
          <Typography
            color={disabled ? 'text.disabled' : 'primary'}
            variant="h2"
            display="flex"
            alignItems="center"
            gap="0.5rem"
            gutterBottom
          >
            <EngineeringIcon fontSize="inherit" />
            Mentor Signup
          </Typography>
          <Typography variant="body2" color={disabled ? 'text.disabled' : 'text.primary'}>
            {disabled
              ? 'Signup is unavailable while user is unverified'
              : 'Interested in mentoring hackers? Apply to be a mentor before January 30, 2024'}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default TileMentorForm
