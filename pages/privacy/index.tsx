import Head from 'next/head'

import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import { useFeatureToggle } from '@/contexts/FeatureToggle'
import Error404Page from '@/pages/404'

const Privacy = () => {
  const { toggles } = useFeatureToggle()

  if (!toggles.dashboard) return <Error404Page />

  return (
    <>
      <Head>
        <title>Privacy Policy | DeerHacks</title>
      </Head>
      <Container sx={{ flexDirection: 'column' }}>
        <Typography variant="h1">Privacy Policy</Typography>
        <Typography variant="subtitle1">Last Revised: Oct 27, 2023</Typography>
      </Container>
    </>
  )
}

export default Privacy
