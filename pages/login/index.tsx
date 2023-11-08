import Head from 'next/head'
import Image from 'next/image'
import NextLink from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ReactNode } from 'react'

import Alert, { AlertColor } from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Collapse from '@mui/material/Collapse'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

import SignUpButton from '@/components/HomePage/SignUpButton'
import { useFeatureToggle } from '@/contexts/FeatureToggle'
import Error404Page from '@/pages/404'

type AlertDetails = {
  severity: AlertColor
  message: ReactNode
}

const getAlertDetails = (context: string | null): AlertDetails => {
  switch (context) {
    case 'auth':
      return { severity: 'info', message: 'Session expired, please login.' }
    case 'unverified':
      return {
        severity: 'error',
        message: (
          <>
            Your Discord account is unverified,{' '}
            <Link
              rel="noopener"
              target="_blank"
              underline="always"
              href="https://support.discord.com/hc/en-us/articles/6181726888215-Verification-Required-FAQ"
              sx={{ color: 'error.main', opacity: 1 }}
            >
              verify your account on Discord
            </Link>{' '}
            to continue.
          </>
        ),
      }
    default:
      return { severity: 'error', message: 'Something went wrong, try again.' }
  }
}

const Login = () => {
  const { toggles } = useFeatureToggle()
  const searchParams = useSearchParams()
  const showAlert = searchParams.has('context')
  const context = searchParams.get('context')

  const alert = showAlert ? getAlertDetails(context) : null

  if (!toggles.dashboard) return <Error404Page />

  return (
    <>
      <Head>
        <title>Login | DeerHacks</title>
      </Head>
      <Container
        maxWidth={false}
        sx={{
          p: 0,
          backgroundImage:
            'radial-gradient(circle closest-corner at 25% 60%, rgba(238, 39, 39, 0.25), rgba(255, 255, 255, 0)), radial-gradient(circle farthest-side at 71% 16%, rgba(154, 39, 238, 0.15), rgba(255, 255, 255, 0) 35%), radial-gradient(circle closest-corner at 32% 38%, rgba(238, 164, 39, 0.1), rgba(255, 255, 255, 0) 76%), radial-gradient(circle farthest-side at 69% 81%, rgba(255, 0, 48, 0.1), rgba(255, 255, 255, 0) 76%), linear-gradient(#202124, #202124)',
        }}
      >
        <Container
          sx={{
            minHeight: '100vh',
            pt: '1rem',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Box component="div" width="100%">
            <Button href="/" component={NextLink} sx={{ p: '0 0.5rem 0 0' }}>
              <Image src="/icons/neon.png" alt="DeerHacks Logo" width={80} height={80} priority />
              DeerHacks
            </Button>
          </Box>
          <Container
            maxWidth="xs"
            sx={{
              background: 'hsl(0deg 0% 0% / 25%)',
              flexDirection: 'column',
              textAlign: 'center',
              borderRadius: '1rem',
              gap: '1.5rem',
            }}
          >
            <Typography variant="h2">Welcome to DeerHacks</Typography>
            <Typography>
              Login to access registration, hacker perks and more on the DeerHacks Dashboard!
            </Typography>
            <Collapse in={showAlert} sx={{ width: '100%' }}>
              <Alert severity={alert?.severity} sx={{ width: '100%' }}>
                {alert?.message}
              </Alert>
            </Collapse>
            <SignUpButton text="Continue" color fullWidth />
            <Typography fontSize="0.75rem">
              By clicking “Continue with Discord” above, you acknowledge that you have read and
              understood, and agree to DeerHacks'{' '}
              <Link component={NextLink} href="/terms" underline="always" sx={{ opacity: 0.75 }}>
                Terms & Conditions
              </Link>{' '}
              and{' '}
              <Link component={NextLink} href="/privacy" underline="always" sx={{ opacity: 0.75 }}>
                Privacy Policy
              </Link>
              .
            </Typography>
          </Container>
          <span />
        </Container>
      </Container>
    </>
  )
}

export default Login
