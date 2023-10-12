import Head from 'next/head'

import Container from '@mui/material/Container'

import FullPageLoader from '@/components/FullPageLoader'
import { useAuth } from '@/contexts/Auth'
import { useFeatureToggle } from '@/contexts/FeatureToggle'
import Error401Page from '@/pages/401'
import Error404Page from '@/pages/404'

const Dashboard = () => {
  const { toggles } = useFeatureToggle()
  const { loading, authenticated } = useAuth()

  if (!toggles.registration) return <Error404Page />
  if (!loading && !authenticated) return <Error401Page />

  return (
    <>
      <Head>
        <title>Dashboard | DeerHacks</title>
      </Head>
      {loading || !authenticated ? (
        <FullPageLoader show showLoadingText />
      ) : (
        <Container>
          <h1>Add Dashboard Here</h1>
        </Container>
      )}
    </>
  )
}

export default Dashboard
