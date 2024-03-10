import Image from 'next/image'
import NextLink from 'next/link'
import { Suspense, useState } from 'react'

import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Slide from '@mui/material/Slide'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import Tooltip from '@mui/material/Tooltip'
import useMediaQuery from '@mui/material/useMediaQuery'

import MLHBadge from '@/components/HomePage/MLHBadge'
import SignUpButton from '@/components/HomePage/SignUpButton'
import { useFeatureToggle } from '@/contexts/FeatureToggle'
import theme from '@/styles/theme'

type Props = {
  loading: boolean
}

type MenuProps = {
  desktop?: boolean
  afterClick: () => void
}

const Menu = (props: MenuProps) => {
  const { desktop = false, afterClick } = props
  const { toggles } = useFeatureToggle()

  const handleClick = (dest: string) => {
    if (typeof window === 'undefined') return
    const section = document.querySelector(dest)
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    afterClick()
  }

  return (
    <Box
      component="div"
      display="inline-flex"
      flexWrap="wrap"
      flexDirection={{ xs: 'column', md: 'row' }}
      alignItems="center"
      gap={{ xs: '1.5rem', md: '1.75rem', lg: '2rem' }}
      p="0.5rem 1rem"
    >
      {!toggles.dashboard && (
        <>
          <Box component="div" data-aos="fade" data-aos-delay="1000" data-aos-duration="1000">
            <Tooltip title="DeerHacks 2023">
              <Link rel="noopener" href="https://2023.deerhacks.ca">
                2023
              </Link>
            </Tooltip>
          </Box>
          <Box component="div" data-aos="fade" data-aos-delay="1000" data-aos-duration="1000">
            <Tooltip title="Instagram">
              <Link
                rel="noopener"
                href="https://instagram.com/deerhacks"
                target="_blank"
                display="flex"
              >
                <InstagramIcon />
              </Link>
            </Tooltip>
          </Box>
          <Box component="div" data-aos="fade" data-aos-delay="1000" data-aos-duration="1000">
            <Tooltip title="LinkedIn">
              <Link
                rel="noopener"
                href="https://linkedin.com/company/deerhacks"
                target="_blank"
                display="flex"
              >
                <LinkedInIcon />
              </Link>
            </Tooltip>
          </Box>
          <Divider
            variant="middle"
            orientation="vertical"
            sx={{ display: { xs: 'none', lg: 'initial' } }}
          />
        </>
      )}
      <Box
        component="div"
        display="inline-flex"
        flexDirection="inherit"
        alignItems="center"
        gap="0.5rem"
      >
        <Box component="div" data-aos="fade" data-aos-delay="1250" data-aos-duration="1250">
          <Button sx={{ p: '0.5rem' }} onClick={() => handleClick('#about')}>
            About
          </Button>
        </Box>
        <Box component="div" data-aos="fade" data-aos-delay="1250" data-aos-duration="1250">
          <Button sx={{ p: '0.5rem' }} onClick={() => handleClick('#sponsors')}>
            Sponsors
          </Button>
        </Box>
        <Box component="div" data-aos="fade" data-aos-delay="1250" data-aos-duration="1250">
          <Button sx={{ p: '0.5rem' }} onClick={() => handleClick('#faq')}>
            FAQ
          </Button>
        </Box>
      </Box>
      {toggles.dashboard && (
        <Box component="div" data-aos="fade" data-aos-delay="1250" data-aos-duration="1250">
          <SignUpButton
            href="/login"
            navbar={desktop}
            glow
            {...(!toggles.signupHacker && { text: 'Login' })}
          />
        </Box>
      )}
      <Box
        component="div"
        width={75}
        data-aos="fade"
        data-aos-delay="1500"
        data-aos-duration="1500"
      >
        <Tooltip title="Major League Hacking">
          <Link
            rel="noopener"
            href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2024-season&utm_content=black"
            target="_blank"
            sx={{ width: 75, opacity: 1, position: 'absolute', top: 0 }}
          >
            <MLHBadge />
          </Link>
        </Tooltip>
      </Box>
    </Box>
  )
}

const Navbar = (props: Props) => {
  const { loading } = props

  const [open, setOpen] = useState(false)

  const { toggles } = useFeatureToggle()

  const desktop = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <Container
      sx={{
        position: 'absolute',
        inset: '0 0 auto 0',
        m: '0 auto',
        p: '0 !important',
      }}
    >
      <AppBar position="relative" elevation={0}>
        <Grid container justifyContent="space-between">
          <Box
            component="div"
            position="absolute"
            top="2.5rem"
            left={{ xs: '1.5rem', lg: '2.5rem' }}
          >
            {toggles.dashboard ? (
              <Tooltip
                title="Take me to my dashboard"
                placement="right"
                arrow
                data-aos="fade"
                data-aos-delay="500"
                data-aos-duration="1000"
              >
                <Button href="/login" component={NextLink} sx={{ p: '0', borderRadius: '50%' }}>
                  <Image
                    src="/icons/neon.png"
                    alt="DeerHacks Logo"
                    width={80}
                    height={80}
                    priority
                  />
                </Button>
              </Tooltip>
            ) : (
              <Image src="/icons/neon.png" alt="DeerHacks Logo" width={80} height={80} priority />
            )}
          </Box>
          <span />
          <Slide in={!loading} timeout={500} mountOnEnter>
            <Grid
              item
              p={desktop ? '0.5rem 1rem' : '0.75rem'}
              sx={{
                borderRadius: '1rem',
                backgroundColor: theme.palette.background.default,
              }}
            >
              {desktop ? (
                <Menu afterClick={() => setOpen(false)} desktop />
              ) : (
                <Box component="div" data-aos="fade" data-aos-delay="1250" data-aos-duration="1250">
                  <Button
                    onClick={() => setOpen(true)}
                    sx={{ minWidth: 0, borderRadius: '0.5rem', p: '0.5rem' }}
                  >
                    <MenuIcon /> Menu
                  </Button>
                </Box>
              )}
            </Grid>
          </Slide>
        </Grid>
      </AppBar>
      <Suspense>
        <SwipeableDrawer
          open={open}
          variant="temporary"
          anchor="right"
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          elevation={0}
          PaperProps={{
            sx: {
              maxWidth: '80%',
              px: '1rem',
              justifyContent: 'end',
            },
          }}
        >
          <Menu afterClick={() => setOpen(false)} />
        </SwipeableDrawer>
      </Suspense>
    </Container>
  )
}

export default Navbar
