import Image from 'next/image'
import { useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Collapse from '@mui/material/Collapse'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Grow from '@mui/material/Grow'
import IconButton from '@mui/material/IconButton'

type Props = {
  qrCode: string
  open: boolean
  setOpen: (open: boolean) => void
}

const ModalQRCode = (props: Props) => {
  const { open, qrCode, setOpen } = props

  const [show, setShow] = useState(false)

  const handleClose = () => {
    setOpen(false)
    setShow(false)
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Grow}
      PaperProps={{
        elevation: 2,
        sx: { m: '1rem', maxHeight: 'calc(100% - 2rem)', width: 'calc(100% - 2rem)' },
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
          <Collapse in={show}>
            <Alert severity="info">Turn up your brightness for sign ins.</Alert>
          </Collapse>
          <Box
            component="div"
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
          >
            <Image
              src={qrCode}
              alt="User QR Code"
              width={0}
              height={0}
              sizes="100vw"
              style={{
                width: '100%',
                height: 'auto',
                aspectRatio: '1 / 1',
                background: 'white',
                borderRadius: '0.75rem',
              }}
              draggable={false}
              onLoad={() => setShow(true)}
            />
            {!show && <CircularProgress sx={{ position: 'absolute' }} />}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default ModalQRCode
