import Image from 'next/image'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import SignUpButton from '@/components/HomePage/SignUpButton'
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
      <Grid container spacing={2} justifyContent="center">
        <Grid
          container
          item
          xs={12}
          md={5}
          justifyContent="center"
          data-aos="fade"
          data-aos-offset="100"
          data-aos-once="false"
        >
          <Image
            src="/icons/neon.png"
            alt="DeerHacks Glow"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto', margin: '-2rem 0' }}
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
            <Typography mb="1rem">
              Welcome to the University of Toronto Mississauga's premier hackathon event! DeerHacks
              offers students the exciting opportunity to showcase their creativity and innovation
              over a dedicated 36-hour period, designed to empower hackers with enriching workshops,
              thrilling competitions, and enjoyable activities!
            </Typography>
            <Typography mb="1rem" display={{ xs: 'none', lg: 'block' }}>
              Participants will have the unique chance to present their projects before a
              distinguished panel of judges and industry experts, fostering valuable networking
              opportunities with our esteemed sponsors and partners. Whether you're a newcomer or an
              experienced developer, we invite hackers of all levels to join us for an exhilarating
              weekend filled with prizes, skill development, and innovation.
            </Typography>
          </Box>
        </Grid>
      </Grid>
      {toggles.dashboard && (
        <Box
          component="div"
          display="inline-flex"
          data-aos="zoom-out"
          data-aos-offset="100"
          data-aos-once="false"
        >
          <SignUpButton text="Get Started Now" href="/login" color glow />
        </Box>
      )}
    </Container>
  )
}

export default About
