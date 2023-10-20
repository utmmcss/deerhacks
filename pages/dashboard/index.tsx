import Head from 'next/head'
import Image from 'next/image'

import InfoIcon from '@mui/icons-material/Info'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

import FullPageLoader from '@/components/FullPageLoader'
import { useAuth } from '@/contexts/Auth'
import { useFeatureToggle } from '@/contexts/FeatureToggle'
import Error401Page from '@/pages/401'
import Error404Page from '@/pages/404'
import { UserStatusDescription } from '@/types/User'

const Dashboard = () => {
  const { toggles } = useFeatureToggle()
  const { user, loading, authenticated } = useAuth()

  if (!toggles.dashboard) return <Error404Page />
  if (!loading && !authenticated) return <Error401Page />

  return (
    <>
      <Head>
        <title>Dashboard | DeerHacks</title>
      </Head>
      {loading || !authenticated || !user ? (
        <FullPageLoader show showLoadingText />
      ) : (
        <Container sx={{ minHeight: '100vh' }}>
          <Image
            src={user.avatarURL}
            alt="User Avatar"
            width={100}
            height={100}
            style={{ borderRadius: '50%' }}
            draggable={false}
          />
          <Stack spacing="1rem">
            <Typography>
              Welcome <span style={{ fontWeight: 600 }}>{user.name}</span>!
            </Typography>
            <Box component="div">
              <Tooltip title={UserStatusDescription[user.status][1]}>
                <Chip
                  icon={<InfoIcon />}
                  color={UserStatusDescription[user.status][0]}
                  label={`Status: ${user.status}`}
                />
              </Tooltip>
            </Box>
          </Stack>
        </Container>
      )}
    </>
  )
}

export default Dashboard
