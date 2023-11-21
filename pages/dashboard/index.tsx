import Head from 'next/head'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Fade from '@mui/material/Fade'
import Grid from '@mui/material/Grid'

import TileChecklist from '@/components/Dashboard/TileChecklist'
import TileGallery from '@/components/Dashboard/TileGallery'
import TileHackerPack from '@/components/Dashboard/TileHackerPack'
import TileInstagram from '@/components/Dashboard/TileInstagram'
import TileLinkedIn from '@/components/Dashboard/TileLinkedIn'
import TileRegistration from '@/components/Dashboard/TileRegistration'
import TileScanner from '@/components/Dashboard/TileScanner'
import TileSchedule from '@/components/Dashboard/TileSchedule'
import TileStatus from '@/components/Dashboard/TileStatus'
import TileTips from '@/components/Dashboard/TileTips'
import TileUser from '@/components/Dashboard/TileUser'
import TileUsersTable from '@/components/Dashboard/TileUsersTable'
import FullPageSpinner from '@/components/Shared/FullPageSpinner'
import Navbar from '@/components/Shared/Navbar'
import { useAuth } from '@/contexts/Auth'
import { useFeatureToggle } from '@/contexts/FeatureToggle'
import Error401Page from '@/pages/401'
import Error418Page from '@/pages/418'

const Dashboard = () => {
  const { toggles } = useFeatureToggle()
  const { user, loading, authenticated } = useAuth()

  if (!toggles.dashboard) return <Error418Page />
  if (!loading && !authenticated) return <Error401Page />

  return (
    <>
      <Head>
        <title>Dashboard | DeerHacks</title>
      </Head>
      {loading || !authenticated || !user ? (
        <FullPageSpinner />
      ) : (
        <Fade in timeout={1000}>
          <Container
            sx={{ minHeight: '100vh', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <Navbar />
            <Box component="div" display="flex" flexDirection="column" gap="1rem" width="100%">
              <TileUser user={user} />
              {['admin', 'moderator', 'volunteer'].includes(user.status) && (
                <Grid container spacing={2}>
                  <Grid item xs={12} md>
                    <TileScanner />
                  </Grid>
                  {user.status !== 'volunteer' && (
                    <Grid item xs={12} md>
                      <TileUsersTable />
                    </Grid>
                  )}
                </Grid>
              )}
              <Grid container spacing={2}>
                <Grid item xs={12} md={7} lg={8} order={{ xs: 2, md: 1 }}>
                  {['pending', 'registering', 'unverified'].includes(user.status) ? (
                    <TileRegistration status={user.status} />
                  ) : (
                    <TileHackerPack status={user.status} />
                  )}
                </Grid>
                <Grid container item xs={12} md={5} lg={4} spacing={2} order={{ xs: 1, md: 2 }}>
                  <Grid item xs={12}>
                    <TileStatus status={user.status} />
                  </Grid>
                  <Grid item xs={6}>
                    <TileChecklist status={user.status} />
                  </Grid>
                  <Grid item xs={6}>
                    <TileTips status={user.status} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
                  <TileGallery />
                </Grid>
                <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
                  <TileSchedule status={user.status} />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid container item xs={12} md={5} lg={4} spacing={2} order={{ xs: 2, md: 1 }}>
                  <Grid item xs={6}>
                    <TileInstagram />
                  </Grid>
                  <Grid item xs={6}>
                    <TileLinkedIn />
                  </Grid>
                </Grid>
                <Grid item xs={12} md={7} lg={8} order={{ xs: 1, md: 2 }}>
                  {['pending', 'registering', 'unverified'].includes(user.status) ? (
                    <TileHackerPack status={user.status} />
                  ) : (
                    <TileRegistration status={user.status} />
                  )}
                </Grid>
              </Grid>
            </Box>
            <span />
          </Container>
        </Fade>
      )}
    </>
  )
}

export default Dashboard
