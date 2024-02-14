import Head from 'next/head'
import { Suspense, useState } from 'react'

import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'
import Fade from '@mui/material/Fade'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Typography from '@mui/material/Typography'

import { APIError } from '@/api/types'
import ModalScanner, { ScannerModalContext } from '@/components/Dashboard/ModalScanner'
import BackButton from '@/components/Shared/BackButton'
import FullPageSpinner from '@/components/Shared/FullPageSpinner'
import { useAuth } from '@/contexts/Auth'
import { useFeatureToggle } from '@/contexts/FeatureToggle'
import { useToast } from '@/contexts/Toast'
import { useQRCheckIn } from '@/hooks/QRCode/useQRCheckIn'
import { useQRUserGet } from '@/hooks/QRCode/useQRUserGet'
import Error401Page from '@/pages/401'
import Error404Page from '@/pages/404'
import { QrScanner } from '@yudiel/react-qr-scanner'
import { QRCheckInContext, qrContextLabels, qrContextOptions } from 'types/QRCode'

const QRCodeScanner = () => {
  const [context, setContext] = useState<QRCheckInContext | ''>('')
  const [modalContext, setModalContext] = useState<ScannerModalContext>({
    message: '',
    success: false,
  })
  const [openResult, setOpenResult] = useState(false)

  const { user, loading, authenticated } = useAuth()
  const { toggles } = useFeatureToggle()
  const { setToast } = useToast()

  const { mutate: qrCheckIn, isLoading: qrCheckInLoading } = useQRCheckIn()
  const { mutate: qrUserGet, isLoading: qrUserLoading } = useQRUserGet()

  const enableScanner = !openResult && !qrCheckInLoading && !qrUserLoading
  const allowedStatuses = ['admin', 'moderator', 'volunteer']

  const handleChangeContext = (event: SelectChangeEvent) => {
    setContext(event.target.value as QRCheckInContext)
  }

  const handleRegistration = (qrId: string) => {
    qrUserGet(
      { qrId },
      {
        onSuccess: (resp) => {
          setModalContext({
            user: resp.user,
            qrId,
          })
          setOpenResult(true)
        },
        onError: (err) => {
          const apiError = (err as APIError).apiError.err
          setModalContext({
            message: apiError.message ?? apiError.error,
            success: false,
          })
          setOpenResult(true)
        },
      }
    )
  }

  const handleCheckIn = (qrId: string) => {
    if (!context) return
    qrCheckIn(
      { qrId, context },
      {
        onSuccess: (resp) => {
          setModalContext(resp)
          setOpenResult(true)
        },
        onError: (err) => {
          const apiError = (err as APIError).apiError.err
          setModalContext({
            message: apiError.message ?? apiError.error,
            success: false,
          })
          setOpenResult(true)
        },
      }
    )
  }

  if (!toggles.dashboard || (user?.status && !allowedStatuses.includes(user.status))) {
    return <Error404Page />
  }

  if (!loading && !authenticated) return <Error401Page />

  return (
    <>
      <Head>
        <title>QR Scanner | DeerHacks</title>
      </Head>
      {loading || !authenticated || !user ? (
        <FullPageSpinner />
      ) : (
        <>
          <Fade in timeout={1000}>
            <Container
              sx={{ minHeight: '100vh', flexDirection: 'column', justifyContent: 'start' }}
            >
              <BackButton navbar text="Dashboard" href="/dashboard" />
              <Typography variant="h1">QR Scanner</Typography>
              <Container maxWidth="xs" sx={{ p: '0 !important', flexDirection: 'column' }}>
                <Container sx={{ p: '0 !important' }}>
                  <QrScanner
                    stopDecoding={!context || !enableScanner}
                    onDecode={(qrId) => {
                      if (context === 'registration') {
                        handleRegistration(qrId)
                      } else {
                        handleCheckIn(qrId)
                      }
                    }}
                    onError={(error) =>
                      setToast({
                        type: 'error',
                        message: error?.message,
                      })
                    }
                    containerStyle={{ borderRadius: '1rem' }}
                  />
                  <Fade in={!enableScanner}>
                    <CircularProgress sx={{ position: 'absolute' }} />
                  </Fade>
                </Container>
                <FormControl fullWidth>
                  <InputLabel>Select Context</InputLabel>
                  <Select
                    value={context}
                    label="Select Context"
                    onChange={handleChangeContext}
                    error={!context}
                  >
                    {qrContextOptions.map((option) => (
                      <MenuItem
                        key={option}
                        disabled={option === 'registration' && user.status === 'volunteer'}
                        value={option}
                      >
                        {qrContextLabels[option]}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Container>
            </Container>
          </Fade>
          <Suspense>
            <ModalScanner
              open={openResult}
              setOpen={setOpenResult}
              onConfirmCheckIn={handleCheckIn}
              modalContext={modalContext}
              isLoading={qrCheckInLoading || qrUserLoading}
            />
          </Suspense>
        </>
      )}
    </>
  )
}

export default QRCodeScanner
