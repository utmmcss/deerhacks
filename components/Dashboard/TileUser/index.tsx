import Image from 'next/image'
import { Suspense, useState } from 'react'

import InfoIcon from '@mui/icons-material/Info'
import OutboundTwoToneIcon from '@mui/icons-material/OutboundTwoTone'
import QrCodeIcon from '@mui/icons-material/QrCode'
import SettingsIcon from '@mui/icons-material/Settings'
import VerifiedIcon from '@mui/icons-material/Verified'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

import ModalAccount from '@/components/Dashboard/ModalAccount'
import ModalQRCode from '@/components/Dashboard/ModalQRCode'
import { useAPI } from '@/contexts/API'
import { User, UserStatusDescription } from '@/types/User'

type Props = {
  user: User
}

const TileUser = (props: Props) => {
  const { user } = props

  const api = useAPI()

  const [openAccountDetails, setOpenAccountDetails] = useState(!user.first_name || !user.last_name)

  const [openQRCode, setOpenQRCode] = useState(false)
  const qrCodeEnabled = ['admin', 'moderator', 'volunteer', 'accepted', 'attended'].includes(
    user.status
  )

  return (
    <>
      <Paper
        sx={{
          width: '100%',
          m: '2rem 0',
          p: '2rem',
          borderRadius: '2rem',
          position: 'relative',
          backgroundImage:
            'radial-gradient(circle closest-corner at 25% 60%, rgba(238, 39, 39, 0.25), rgba(255, 255, 255, 0)), radial-gradient(circle farthest-side at 71% 16%, rgba(154, 39, 238, 0.15), rgba(255, 255, 255, 0) 35%), radial-gradient(circle closest-corner at 32% 38%, rgba(238, 164, 39, 0.1), rgba(255, 255, 255, 0) 76%), radial-gradient(circle farthest-side at 69% 81%, rgba(255, 0, 48, 0.1), rgba(255, 255, 255, 0) 76%), linear-gradient(#292b2f, #121212)',
          '&::after': {
            position: 'absolute',
            content: '""',
            inset: 0,
            zIndex: -1,
            width: '100%',
            height: '100%',
            filter: 'blur(24px)',
            background:
              'linear-gradient(135deg,#d6551b,#db3a3a,#c844b0,#ae34d0,#8f55f5,#ae34d0,#c844b0,#db3a3a,#d6551b)',
            backgroundSize: '200% 200%',
            borderRadius: 'inherit',
          },
        }}
      >
        <Grid container spacing={4} justifyContent="center">
          <Grid container item xs={12} md={4} lg={3} justifyContent="center" alignItems="center">
            <Box component="div">
              <Tooltip title={qrCodeEnabled ? 'Open QR Code' : ''}>
                <IconButton
                  disabled={!qrCodeEnabled}
                  onClick={() => setOpenQRCode(true)}
                  sx={{ p: '1rem', position: 'relative' }}
                >
                  <Image
                    src={user.avatar}
                    alt="User Avatar"
                    width={150}
                    height={150}
                    style={{
                      borderRadius: '50%',
                      background: '#ffffff03',
                      filter:
                        'drop-shadow(1px 2px 5px #d36bc6) drop-shadow(2px 1px 1px #eaaf0f) drop-shadow(-1px -2px 1px #d6551b) drop-shadow(-2px -2px 1px #c844b0)',
                    }}
                    draggable={false}
                    priority
                  />
                  {qrCodeEnabled && (
                    <QrCodeIcon
                      fontSize="large"
                      sx={{ position: 'absolute', bottom: '1rem', right: '1rem' }}
                    />
                  )}
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>
          <Grid
            container
            item
            xs={12}
            md={8}
            lg={9}
            rowGap={3}
            justifyContent="start"
            flexDirection="column"
          >
            <Box component="div" maxWidth="100%">
              <Typography
                variant="h1"
                textAlign={{ xs: 'center', md: 'left' }}
                lineHeight="1.25"
                mb="0.5rem !important"
                maxWidth="100%"
                noWrap
                sx={{ whiteSpace: 'normal' }}
              >
                {user.first_name && user.last_name
                  ? `${user.first_name} ${user.last_name}`
                  : 'Welcome to DH III'}
              </Typography>
              <Typography noWrap textAlign={{ xs: 'center', md: 'left' }}>
                {user.email}
              </Typography>
              <Typography
                noWrap
                maxWidth="100%"
                display="flex"
                alignItems="center"
                justifyContent={{ xs: 'center', md: 'start' }}
                gap="0.25rem"
              >
                @{user.username}
                {user.verified && (
                  <Tooltip title="Discord Verified" placement="right">
                    <VerifiedIcon color="primary" fontSize="small" />
                  </Tooltip>
                )}
              </Typography>
            </Box>
            <Box
              component="div"
              display="flex"
              gap="1rem"
              flexWrap="wrap"
              justifyContent={{ xs: 'center', md: 'start' }}
            >
              <Chip
                icon={<InfoIcon />}
                color={UserStatusDescription[user.status][0]}
                label={`Status: ${user.status.title()}`}
              />
              {(user.status === 'pending' || user.status === 'registering') && (
                <Chip
                  variant="filled"
                  {...(user.status === 'pending' && {
                    color: !user.first_name || !user.last_name ? 'error' : 'warning',
                  })}
                  icon={<SettingsIcon />}
                  label={`Account ${!user.first_name || !user.last_name ? '*' : ''}`}
                  clickable
                  onClick={() => setOpenAccountDetails(true)}
                />
              )}
              <Chip
                label="Sign Out"
                icon={<OutboundTwoToneIcon />}
                clickable
                onClick={() => {
                  document.cookie = 'Authorization=; expires=Tue, 27 Feb 2001 13:00:00 UTC; path=/;'
                  api.queryClient.invalidateQueries({ queryKey: ['userGet'] })
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>
      <Suspense>
        <ModalQRCode qrCode={user.qr_code} open={openQRCode} setOpen={setOpenQRCode} />
      </Suspense>
      <Suspense>
        <ModalAccount user={user} open={openAccountDetails} setOpen={setOpenAccountDetails} />
      </Suspense>
    </>
  )
}

export default TileUser
