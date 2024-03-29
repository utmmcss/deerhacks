import CloseIcon from '@mui/icons-material/Close'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Grow from '@mui/material/Grow'
import IconButton from '@mui/material/IconButton'

import { useAPI } from '@/contexts/API'
import { UserStatus } from '@/types/User'
import { QRCodeSVG } from 'qrcode.react'

type Props = {
  status: UserStatus
  qrCode: string
  open: boolean
  setOpen: (open: boolean) => void
}

const ModalQRCode = (props: Props) => {
  const { status, open, qrCode, setOpen } = props

  const api = useAPI()

  const handleClose = () => {
    setOpen(false)
    if (status === 'accepted') {
      // Refetch if user signs in
      api.queryClient.invalidateQueries({ queryKey: ['userGet'] })
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Grow}
      PaperProps={{
        sx: {
          m: '1rem',
          maxHeight: 'calc(100% - 2rem)',
          width: 'calc(100% - 2rem)',
          backgroundImage:
            'radial-gradient(circle closest-corner at 25% 60%, rgb(238 39 39 / 44%), rgba(255, 255, 255, 0)),radial-gradient(circle farthest-side at 71% 16%, rgba(154, 39, 238, 0.15), rgba(255, 255, 255, 0) 35%),radial-gradient(circle closest-corner at 32% 38%, rgb(39 238 188 / 36%), rgba(255, 255, 255, 0) 76%),radial-gradient(circle farthest-side at 69% 81%, rgb(255 0 48 / 16%), rgba(255, 255, 255, 0) 76%),linear-gradient(#202124, #202124)',
        },
      }}
      maxWidth="xs"
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>My QR Code</DialogTitle>
      <IconButton
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 12,
          color: 'text.secondary',
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent sx={{ pt: 0 }}>
        <Box component="div" display="flex" flexDirection="column" gap="1rem">
          <Alert severity="info">Turn up your brightness for sign-ins.</Alert>
          <Box component="div" display="flex" sx={{ borderRadius: '0.75rem', overflow: 'hidden' }}>
            <QRCodeSVG
              value={qrCode}
              includeMargin
              bgColor="#fff"
              fgColor="#000"
              style={{ height: 'auto', width: '100%' }}
            />
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default ModalQRCode
