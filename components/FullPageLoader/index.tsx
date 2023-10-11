import NextLink from 'next/link'
import { useEffect, useRef, useState } from 'react'

import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Fade from '@mui/material/Fade'
import Typography from '@mui/material/Typography'

import AnimatedLogo from '@/components/AnimatedLogo'
import theme from '@/styles/theme'

type Props = {
  loading: boolean
  showTips?: boolean
  showLoadingText?: boolean
  pulse?: boolean
  text?: string
  buttonText?: string
  buttonLink?: string
  onAnimationEnd?: () => void
}

const tips = [
  'Tips: Enable browser hardware acceleration for the best experience',
  'Tips: Follow our socials @deerhacks for announcements and updates',
  'Tips: Our website is open source! Check it out on GitHub at @utmmcss',
  'Tips: Download our progressive web app for the best experience on mobile',
  'Facts: There are over 60 different species of deer worldwide',
  'Facts: Deers can jump up to 10ft high',
  'Facts: Deers have a 310 degree vision',
  'Facts: Our homepage features the Maanjiwe Nendamowinan building',
]

const FullPageLoader = (props: Props) => {
  const {
    loading,
    showTips = false,
    showLoadingText = false,
    pulse,
    text,
    buttonText,
    buttonLink,
    onAnimationEnd,
  } = props

  const [randomTip, setRandomTip] = useState('')
  const initialized = useRef(false)

  const setRandomTipOnce = () => {
    if (initialized.current) return
    const visited = localStorage.getItem('deerhacks-2024-visited')
    setRandomTip(tips[visited === null ? 0 : Math.floor(Math.random() * tips.length)])
    initialized.current = true
    localStorage.setItem('deerhacks-2024-visited', 'true')
  }

  useEffect(() => {
    // Workaround since React StrictMode runs twice in development
    // and window / localStorage is not available in SSR
    if (initialized.current) return
    setRandomTipOnce()
  }, [])

  return (
    <Fade in={loading} appear={false} unmountOnExit>
      <Container
        maxWidth={false}
        sx={{
          height: '100vh',
          background: theme.palette.background.default,
          position: 'fixed',
          flexDirection: 'column',
          gap: '2rem',
          textAlign: 'center',
          top: 0,
          zIndex: 10000,
        }}
      >
        <AnimatedLogo onAnimationEnd={onAnimationEnd} pulse={pulse} />
        {showLoadingText && (
          <Fade in timeout={2000}>
            <Typography color="secondary" letterSpacing={2.5}>
              LOADING...
            </Typography>
          </Fade>
        )}
        {(text || showTips) && (
          <Fade in timeout={2250}>
            <Typography color="secondary" maxWidth="20rem">
              {text ?? randomTip}
            </Typography>
          </Fade>
        )}
        {(buttonText || buttonLink) && (
          <Fade in timeout={2500}>
            <Button href={buttonLink} LinkComponent={NextLink}>
              {buttonText}
            </Button>
          </Fade>
        )}
      </Container>
    </Fade>
  )
}

export default FullPageLoader
