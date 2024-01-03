import NextLink from 'next/link'

import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt'
import FlagRoundedIcon from '@mui/icons-material/FlagRounded'
import NearMeRoundedIcon from '@mui/icons-material/NearMeRounded'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

import SignUpButton from '@/components/HomePage/SignUpButton'
import DeerHacksTitle from '@/components/Shared/DeerHacksTitle'
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
      <Box
        component="div"
        width="100%"
        mb="1rem"
        data-aos="zoom-out"
        data-aos-offset="100"
        data-aos-once="false"
      >
        <DeerHacksTitle />
      </Box>
      <Box
        component="div"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        pt="2rem"
        textAlign={{ xs: 'center', md: 'start' }}
      >
        <Typography variant="h2" color="text.secondary" gutterBottom>
          Welcome to the University of Toronto Mississauga's premier hackathon event{' '}
          <NearMeRoundedIcon
            color="success"
            fontSize="inherit"
            sx={{ verticalAlign: 'middle', mb: '0.25rem' }}
          />{' '}
          DeerHacks offers students the exciting opportunity to showcase their creativity and
          innovation over a dedicated 36-hour period, designed to empower hackers with enriching
          workshops{' '}
          <ElectricBoltIcon
            color="warning"
            fontSize="inherit"
            sx={{ verticalAlign: 'middle', mb: '0.25rem' }}
          />
          , thrilling competitions{' '}
          <FlagRoundedIcon
            color="error"
            fontSize="inherit"
            sx={{ verticalAlign: 'middle', mb: '0.25rem' }}
          />
          , and enjoyable activities{' '}
          <AutoAwesomeRoundedIcon
            color="info"
            fontSize="inherit"
            sx={{ verticalAlign: 'middle', mb: '0.25rem' }}
          />
        </Typography>
        <Typography variant="h2" color="text.secondary" display={{ xs: 'none', lg: 'block' }}>
          Participants will have the unique chance to present their projects before a distinguished
          panel of judges and industry experts, fostering valuable networking opportunities with our
          esteemed sponsors and partners. Whether you're a newcomer or an experienced developer, we
          invite hackers of all levels to join us for an exhilarating weekend filled with prizes,
          skill development, and innovation!
        </Typography>
      </Box>
      {toggles.dashboard && (
        <Box
          component="div"
          display="inline-flex"
          data-aos="zoom-out"
          data-aos-offset="50"
          data-aos-once="false"
          width="min(100%, 300px)"
          pt="3rem"
        >
          <SignUpButton text="Dare to Glow!" href="/login" glow fullWidth />
        </Box>
      )}
      {toggles.signupVolunteer && toggles.signupMentor && (
        <Box
          component="div"
          display="inline-flex"
          data-aos="fade"
          data-aos-offset="50"
          data-aos-once="false"
          pt="2rem"
        >
          <Link href="/login" component={NextLink} underline="always">
            Interested in becoming a volunteer or mentor?
          </Link>
        </Box>
      )}
    </Container>
  )
}

export default About
