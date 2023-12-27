import Head from 'next/head'
import NextLink from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { ReactNode, useEffect, useRef } from 'react'

import Alert, { AlertColor } from '@mui/material/Alert'
import Collapse from '@mui/material/Collapse'
import Container from '@mui/material/Container'
import Fade from '@mui/material/Fade'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

import SignUpButton from '@/components/HomePage/SignUpButton'
import Navbar from '@/components/Shared/Navbar'
import { useAPI } from '@/contexts/API'
import { useFeatureToggle } from '@/contexts/FeatureToggle'
import Error418Page from '@/pages/418'

const Login = () => {
  const { toggles } = useFeatureToggle()
  const searchParams = useSearchParams()
  const showAlert = searchParams.has('context')
  const context = searchParams.get('context') ?? ''
  const alert = showAlert ? getAlertDetails(context) : null
  const initialized = useRef(false)

  const router = useRouter()
  const api = useAPI()

  const path = process.env.NEXT_PUBLIC_DISCORD_OAUTH2_URL ?? ''

  const handleStorage = (e: any) => {
    initialized.current = true
    const { key } = e
    if (key === 'deerhacks-last-login') {
      window.removeEventListener('storage', handleStorage)
      // Invalidation in popup window does not affect main window
      api.queryClient.invalidateQueries({ queryKey: ['userGet'] })
      router.push('/dashboard')
    }
  }

  useEffect(() => {
    if (initialized.current) return
    window.addEventListener('storage', handleStorage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!toggles.dashboard && !toggles.bypassPage) return <Error418Page />

  return (
    <>
      <Head>
        <title>Login | DeerHacks</title>
      </Head>
      <Fade in timeout={1000}>
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
            <Navbar />
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
              <SignUpButton
                text="Continue"
                fullWidth
                onClick={() => window.open(path, '_blank', 'width=500,height=750')}
              />
              <Typography fontSize="0.75rem">
                By clicking “Continue with Discord” above, you acknowledge that you have read and
                understood, and agree to DeerHacks'{' '}
                <Link component={NextLink} href="/code" underline="always" sx={{ opacity: 0.75 }}>
                  Code of Conduct
                </Link>{' '}
                and{' '}
                <Link
                  component={NextLink}
                  href="/privacy"
                  underline="always"
                  sx={{ opacity: 0.75 }}
                >
                  Privacy Policy
                </Link>
                .
              </Typography>
            </Container>
            <span />
          </Container>
        </Container>
      </Fade>
    </>
  )
}

type AlertDetails = {
  severity: AlertColor
  message: ReactNode
}

const getAlertDetails = (context: string): AlertDetails => {
  switch (context) {
    case 'auth':
      return { severity: 'info', message: 'No session found, please login.' }
    case 'unverified':
      return {
        severity: 'warning',
        message: (
          <>
            Your Discord account is unverified, verify your account{' '}
            <Link
              rel="noopener"
              target="_blank"
              underline="always"
              href="https://support.discord.com/hc/en-us/articles/6181726888215-Verification-Required-FAQ"
              sx={{ color: 'warning.light', opacity: 0.9 }}
            >
              on Discord
            </Link>{' '}
            to continue.
          </>
        ),
      }
    default:
      return { severity: 'error', message: 'Something went wrong, try again.' }
  }
}

export default Login
