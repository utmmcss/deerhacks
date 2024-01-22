import Head from 'next/head'
import { Suspense, useState } from 'react'

import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded'
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded'
import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'
import Fade from '@mui/material/Fade'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Typography from '@mui/material/Typography'

import { APIError } from '@/api/types'
import Modal from '@/components/Dashboard/Modal'
import BackButton from '@/components/Shared/BackButton'
import FullPageSpinner from '@/components/Shared/FullPageSpinner'
import { useAuth } from '@/contexts/Auth'
import { useFeatureToggle } from '@/contexts/FeatureToggle'
import { useToast } from '@/contexts/Toast'
import { useQRCheckIn } from '@/hooks/QRCode/useQRCheckIn'
import Error401Page from '@/pages/401'
import Error404Page from '@/pages/404'
import { QrScanner } from '@yudiel/react-qr-scanner'
import { QRCheckInContext, QRCheckInResp, qrContextLabels, qrContextOptions } from 'types/QRCode'

const QRCodeScanner = () => {
  const { toggles } = useFeatureToggle()
  const { user, loading, authenticated } = useAuth()
  const { setToast } = useToast()

  const [context, setContext] = useState<QRCheckInContext | ''>('')
  const [openResult, setOpenResult] = useState(false)
  const [result, setResult] = useState<QRCheckInResp>({ message: '', success: false })

  const { mutate: qrCheckIn, isLoading } = useQRCheckIn()

  const enableScanner = !openResult && !isLoading

  const handleChange = (event: SelectChangeEvent) => {
    setContext(event.target.value as QRCheckInContext)
  }

  if (
    !toggles.dashboard ||
    (user?.status && !['admin', 'moderator', 'volunteer'].includes(user.status))
  )
    return <Error404Page />
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
              <Typography
                variant="h1"
                display="flex"
                alignItems="center"
                textAlign="left"
                gap="0.5rem"
              >
                QR Scanner
              </Typography>
              <Container maxWidth="xs" sx={{ p: '0 !important', flexDirection: 'column' }}>
                <Container sx={{ p: '0 !important' }}>
                  <QrScanner
                    stopDecoding={!context || !enableScanner}
                    onDecode={(result) => {
                      if (!context) return
                      qrCheckIn(
                        { qrId: result, context },
                        {
                          onSuccess: (resp) => {
                            setResult(resp)
                            setOpenResult(true)
                          },
                          onError: (err) => {
                            const apiError = (err as APIError).apiError.err
                            setResult({
                              message: apiError.message ?? apiError.error,
                              success: false,
                            })
                            setOpenResult(true)
                          },
                        }
                      )
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
                    <CircularProgress sx={{ position: 'absolute', mt: '-1rem' }} />
                  </Fade>
                </Container>
                <FormControl fullWidth>
                  <InputLabel>Select Context</InputLabel>
                  <Select
                    value={context}
                    label="Select Context"
                    onChange={handleChange}
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
            <Modal
              open={openResult}
              title={result.success ? 'Success' : 'Error'}
              onClose={() => setOpenResult(false)}
              primaryButton={{
                text: 'Ok',
                onClick: () => {
                  setOpenResult(false)
                },
                fullWidth: true,
              }}
              fullScreen
              sx={{ '& .MuiDialog-paper': { borderRadius: '1rem' } }}
            >
              {result.success ? (
                <TaskAltRoundedIcon color="success" />
              ) : (
                <ErrorOutlineRoundedIcon color="error" />
              )}
              <Typography>{result.message}</Typography>
            </Modal>
          </Suspense>
        </>
      )}
    </>
  )
}

export default QRCodeScanner
