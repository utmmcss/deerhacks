import Container from '@mui/material/Container'
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
        minHeight: '100vh',
      }}
    >
      <Typography variant="h1">DH III</Typography>
      {toggles.registration && <SignUpButton text="Sign Up / Login" color />}
    </Container>
  )
}

export default About
