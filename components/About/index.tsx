import Image from 'next/image'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import SignUpButton from '@/components/SignUpButton'
import { useFeatureToggle } from '@/contexts/FeatureToggle'

const About = () => {
  const { toggles } = useFeatureToggle()

  return (
    <Container
      id="about"
      sx={{
        flexDirection: 'column',
        textAlign: 'center',
      }}
    >
      <Typography variant="h1">Light Up Your Adventure</Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid container item xs={12} md={5} justifyContent="center">
          <Image
            src="/icons/neon.png"
            alt="DeerHacks Glow"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }}
          />
        </Grid>
        <Grid container item xs={12} md={7}>
          <Box
            component="div"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            textAlign={{ xs: 'center', md: 'start' }}
          >
            <Typography variant="h2" mb="1rem">
              Dare to Glow!
            </Typography>
            <Typography color="secondary" mb="1rem">
              Welcome to the University of Toronto Mississauga's premier hackathon event! DeerHacks
              offers students the exciting opportunity to showcase their creativity and innovation
              over a dedicated 36-hour period, designed to empower hackers with enriching workshops,
              thrilling competitions, and enjoyable activities!
            </Typography>
            <Typography color="secondary" mb="1rem" display={{ xs: 'none', lg: 'block' }}>
              Participants will have the unique chance to present their projects before a
              distinguished panel of judges and industry experts, fostering valuable networking
              opportunities with our esteemed sponsors and partners. Whether you're a newcomer or an
              experienced developer, we invite hackers of all levels to join us for an exhilarating
              weekend filled with prizes, skill development, and innovation.
            </Typography>
          </Box>
        </Grid>
      </Grid>
      {toggles.registration && (
        <SignUpButton
          text={
            toggles.registration === 'true'
              ? 'Get Started on Your Registration'
              : 'Take Me to My Dashboard'
          }
          color
        />
      )}
    </Container>
  )
}

export default About
