import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import AWS from '@/components/HomePage/Sponsors/Assets/AWS'
import BigDataAIHub from '@/components/HomePage/Sponsors/Assets/BigDataAIHub'
import Echo3D from '@/components/HomePage/Sponsors/Assets/Echo3D'
import ICUBE from '@/components/HomePage/Sponsors/Assets/ICUBE'
import MLH from '@/components/HomePage/Sponsors/Assets/MLH'
import MMPA from '@/components/HomePage/Sponsors/Assets/MMPA'
import Rotman from '@/components/HomePage/Sponsors/Assets/Rotman'
import SilverSpoon from '@/components/HomePage/Sponsors/Assets/SilverSpoon'
import StandoutStickers from '@/components/HomePage/Sponsors/Assets/StandoutStickers'
import Thirstea from '@/components/HomePage/Sponsors/Assets/Thirstea'
import Uber from '@/components/HomePage/Sponsors/Assets/Uber'
import UofT from '@/components/HomePage/Sponsors/Assets/UofT'
import Featured from '@/components/HomePage/Sponsors/Featured'
import Sponsor from '@/components/HomePage/Sponsors/Sponsor'

const Sponsors = () => {
  return (
    <Container id="sponsors" sx={{ flexDirection: 'column', textAlign: 'center' }}>
      <Typography variant="h1">Sponsors & Partners</Typography>
      <Typography variant="subtitle1" component="h2">
        DeerHacks is made possible by our sponsors and partners. Interested in making DeerHacks a
        reality?
      </Typography>
      <Box
        component="div"
        display="inline-flex"
        data-aos="zoom-in"
        data-aos-offset="50"
        data-aos-once="false"
      >
        <Button variant="outlined" href="mailto:sponsorship@deerhacks.ca">
          Become a Sponsor
        </Button>
      </Box>
      <Grid container spacing={{ xs: 2, md: 4 }} pt="1rem" justifyContent="center">
        {/* Diamond and Platinum Sponsors Here */}
        <Featured />
        {/* Gold and Silver Sponsors Here */}
        <Sponsor name="Uber" logo={<Uber />} link="https://uber.com" tier="silver" />
        <Sponsor name="ICUBE UTM" logo={<ICUBE />} link="https://icubeutm.ca" tier="silver" />
        {false && (
          <Sponsor
            name="Rotman"
            logo={<Rotman />}
            link="https://www.rotman.utoronto.ca"
            tier="silver"
          />
        )}
        <Sponsor name="MMPA" logo={<MMPA />} link="https://mmpa.utoronto.ca" tier="silver" />
        <Sponsor
          name="Thirstea"
          logo={<Thirstea />}
          link="https://thirsteacanada.com"
          tier="silver"
        />
      </Grid>
      {/* Bronze Sponsors Here */}
      <Grid
        container
        spacing={{ xs: 2, md: 4 }}
        pt={{ xs: 0, md: 2 }}
        pb="2rem"
        justifyContent="center"
      >
        <Sponsor name="Major League Hacking" logo={<MLH />} link="https://mlh.io" tier="bronze" />
        <Sponsor
          name="Amazon Web Services"
          logo={<AWS />}
          link="https://aws.amazon.com"
          tier="bronze"
        />
        <Sponsor name="Echo3D" logo={<Echo3D />} link="https://echo3d.com" tier="bronze" />
        <Sponsor
          name="Big Data AI Hub"
          logo={<BigDataAIHub />}
          link="https://www.utm.utoronto.ca/bigdataaihub"
          tier="bronze"
        />
        <Sponsor
          name="Standout Stickers"
          logo={<StandoutStickers />}
          link="https://standoutstickers.com"
          tier="bronze"
        />
        <Sponsor
          name="Silver Spoon"
          logo={<SilverSpoon />}
          link="https://silverspoononline.com"
          tier="bronze"
        />
        <Sponsor
          name="University of Toronto"
          logo={<UofT />}
          link="https://utoronto.ca"
          tier="bronze"
        />
      </Grid>
      <Typography variant="h2">...and more to come!</Typography>
    </Container>
  )
}

export default Sponsors
