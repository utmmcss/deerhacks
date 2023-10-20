import NextLink from 'next/link'

import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import AnimatedDiscord from '@/components/AnimatedDiscord'

type Props = {
  text?: string
  href?: string
  disabled?: boolean
  navbar?: boolean
  fullWidth?: boolean
  color?: boolean
}

const SignUpButton = (props: Props) => {
  const { text, href, disabled = false, navbar = false, fullWidth = false, color } = props

  // const getBaseUrl = () => (typeof window !== 'undefined' ? window.location.origin : '')
  const path = process.env.NEXT_PUBLIC_DISCORD_OAUTH2_URL ?? ''

  return (
    <Button
      variant="outlined"
      color="secondary"
      href={href ?? path}
      fullWidth={fullWidth}
      sx={{
        justifyContent: { xs: 'space-between', sm: 'auto' },
      }}
      disabled={disabled}
      component={NextLink}
      endIcon={<AnimatedDiscord color={color} />}
    >
      <Grid flexDirection="column" textAlign="left">
        <Typography color="primary" fontWeight={500}>
          {text ?? 'Register'}
        </Typography>
        <Typography fontSize="0.75rem" display={{ xs: 'block', md: navbar ? 'none' : 'block' }}>
          with discord
        </Typography>
      </Grid>
    </Button>
  )
}

export default SignUpButton
