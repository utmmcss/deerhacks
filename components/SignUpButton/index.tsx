import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import AnimatedDiscord from '@/components/AnimatedDiscord'

type Props = {
  text?: string
  disabled?: boolean
  color?: boolean
}

const SignUpButton = (props: Props) => {
  const { text, disabled = false, color } = props

  const getBaseUrl = () => (typeof window !== 'undefined' ? window.location.origin : '')

  const path = `${process.env.NEXT_PUBLIC_DISCORD_OAUTH2_URL}${getBaseUrl()}/login/callback`
  return (
    <Button
      variant="outlined"
      color="secondary"
      href={path}
      fullWidth
      sx={{
        width: { xs: '100%', sm: 'auto' },
        justifyContent: { xs: 'space-between', sm: 'auto' },
      }}
      disabled={disabled}
      endIcon={<AnimatedDiscord color={color} />}
    >
      <Grid flexDirection="column" textAlign="left">
        <Typography variant="body1" color="primary">
          {text ?? 'Register'}
        </Typography>
        <Typography variant="body1" fontSize="0.75rem">
          with discord
        </Typography>
      </Grid>
    </Button>
  )
}

export default SignUpButton
