import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

import BigDataAIHub from '@/components/Sponsors/Assets/BigDataAIHub'
import Echo3D from '@/components/Sponsors/Assets/Echo3D'
import ICUBE from '@/components/Sponsors/Assets/ICUBE'
import MCSS from '@/components/Sponsors/Assets/MCSS'
import MLH from '@/components/Sponsors/Assets/MLH'
import MMPA from '@/components/Sponsors/Assets/MMPA'
import UofT from '@/components/Sponsors/Assets/UofT'
import Sponsor from '@/components/Sponsors/Sponsor'
import { useFeatureToggle } from '@/contexts/FeatureToggle'

const Sponsors = () => {
  const { toggles } = useFeatureToggle()

  return (
    <Container id="sponsors" sx={{ flexDirection: 'column', textAlign: 'center' }}>
      <Typography variant="h1">Sponsors & Partners</Typography>
      <Typography variant="subtitle1">
        DeerHacks is made possible by our sponsors and partners. Interested in making DeerHacks a
        reality?
      </Typography>
      <Button variant="outlined" href="mailto:mcss@utmsu.ca">
        Become a Sponsor
      </Button>
      {/* Gold and Silver Sponsors Here */}
      <Grid container spacing={{ xs: 2, md: 4 }} pt="2rem" justifyContent="center">
        <Grid container item xs={12} md={6}>
          <Tooltip title="UTM MCSS">
            <Button
              fullWidth
              href="https://mcss.club"
              sx={{
                height: '12rem',
                borderRadius: '1rem',
                background: 'white',
                p: { xs: '1rem', lg: '2rem' },
              }}
            >
              <MCSS />
            </Button>
          </Tooltip>
        </Grid>
        <Grid container item xs={12} md={6}>
          <Box
            component="div"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            textAlign={{ xs: 'center', md: 'start' }}
          >
            <Typography variant="h2" mb="1rem">
              UTM MCSS
            </Typography>
            <Typography color="secondary" mb="1rem">
              MCSS is the official academic society for the Mathematics and Computational Sciences
              Department at the University of Toronto Mississauga and partner of DeerHacks.
            </Typography>
          </Box>
        </Grid>
        <Sponsor name="ICUBE UTM" logo={<ICUBE />} link="https://icubeutm.ca" tier="silver" />
        <Sponsor name="MMPA" logo={<MMPA />} link="https://mmpa.utoronto.ca" tier="silver" />
      </Grid>
      {/* Bronze Sponsors Here */}
      <Grid
        container
        spacing={{ xs: 2, md: 4 }}
        pt={{ xs: 0, md: 2 }}
        pb="2rem"
        justifyContent="center"
      >
        {toggles.mlh && (
          <Sponsor name="Major League Hacking" logo={<MLH />} link="https://mlh.io" tier="bronze" />
        )}
        <Sponsor
          name="University of Toronto"
          logo={<UofT />}
          link="https://utoronto.ca"
          tier="bronze"
        />
        <Sponsor name="Echo3D" logo={<Echo3D />} link="https://echo3d.com" tier="bronze" />
        <Sponsor
          name="Big Data AI Hub"
          logo={<BigDataAIHub />}
          link="https://www.utm.utoronto.ca/bigdataaihub"
          tier="bronze"
        />
      </Grid>
      <Typography variant="h2">...and more to come!</Typography>
    </Container>
  )
}

export default Sponsors
