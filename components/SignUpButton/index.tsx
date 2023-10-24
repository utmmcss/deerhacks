import NextLink from 'next/link'

import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import AnimatedDiscord from '@/components/AnimatedDiscord'
import theme from '@/styles/theme'

type Props = {
  text?: string
  href?: string
  disabled?: boolean
  navbar?: boolean
  fullWidth?: boolean
  color?: boolean
  glow?: boolean
}

const SignUpButton = (props: Props) => {
  const {
    text,
    href,
    disabled = false,
    navbar = false,
    fullWidth = false,
    color = false,
    glow = false,
  } = props

  // const getBaseUrl = () => (typeof window !== 'undefined' ? window.location.origin : '')
  const path = process.env.NEXT_PUBLIC_DISCORD_OAUTH2_URL ?? ''

  return (
    <Button
      variant="outlined"
      href={href ?? path}
      fullWidth={fullWidth}
      sx={{
        justifyContent: { xs: 'space-between', sm: 'auto' },
        ...(glow &&
          !navbar && {
            position: 'relative',
            backgroundColor: theme.palette.background.default,
            '&::after': {
              position: 'absolute',
              content: '""',
              inset: 0,
              zIndex: -1,
              width: '100%',
              height: '100%',
              filter: 'blur(15px)',
              background:
                'linear-gradient(to left,#d6551b,#db3a3a,#c844b0,#ae34d0,#8f55f5,#ae34d0,#c844b0,#db3a3a,#d6551b)',
              backgroundSize: '200% 200%',
              transition: 'all 0.5s ease',
              animation: 'animateGlow 2s linear infinite',
            },
            '&:hover::after': {
              transform: 'scale(1.2)',
            },
            '@keyframes animateGlow': {
              '0%': {
                backgroundPosition: '0% 50%',
              },
              '100%': {
                backgroundPosition: '200% 50%',
              },
            },
          }),
      }}
      disabled={disabled}
      component={NextLink}
      endIcon={<AnimatedDiscord color={color} />}
    >
      <Grid flexDirection="column" textAlign="left">
        <Typography color="text.primary" fontWeight={500}>
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
