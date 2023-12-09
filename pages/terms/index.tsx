import Head from 'next/head'

import Container from '@mui/material/Container'
import Fade from '@mui/material/Fade'
import Typography from '@mui/material/Typography'

import BackButton from '@/components/Shared/BackButton'
import { useFeatureToggle } from '@/contexts/FeatureToggle'
import Error404Page from '@/pages/404'

const Terms = () => {
  const { toggles } = useFeatureToggle()

  if (!toggles.dashboard && !toggles.bypassPage) return <Error404Page />

  return (
    <>
      <Head>
        <title>Terms & Conditions | DeerHacks</title>
      </Head>
      <Fade in timeout={1000}>
        <Container sx={{ flexDirection: 'column' }}>
          <BackButton navbar />
          <Typography variant="h1">Terms & Conditions</Typography>
          <Typography variant="subtitle1">Last Revised: Oct 27, 2023</Typography>
        </Container>
      </Fade>
    </>
  )
}

export default Terms
