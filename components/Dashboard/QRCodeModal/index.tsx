import Image from 'next/image'
import NextLink from 'next/link'
import { useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Collapse from '@mui/material/Collapse'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'

type Props = {
  qrCode: string
  scanPrivilege: boolean
  setOpen: (open: boolean) => void
}

const QRCodeModal = (props: Props) => {
  const { qrCode, scanPrivilege, setOpen } = props

  const [show, setShow] = useState(false)

  return (
    <Dialog
      open
      onClose={() => setOpen(false)}
      PaperProps={{
        elevation: 2,
        sx: { m: '1rem', maxHeight: 'calc(100% - 2rem)', width: 'calc(100% - 2rem)' },
      }}
      fullWidth
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>My QR Code</DialogTitle>
      <IconButton
        onClick={() => setOpen(false)}
        sx={{
          position: 'absolute',
          right: 8,
          top: 12,
          color: 'text.secondary',
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent sx={{ p: '0 1rem 1rem' }}>
        <Box component="div" display="flex" flexDirection="column" gap="1rem">
          <Collapse in={show}>
            <Alert severity="info">Turn up your brightness & show your code for sign ins.</Alert>
          </Collapse>
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
          {scanPrivilege && (
            <Button
              color="primary"
              component={NextLink}
              href="/dashboard/scanner"
              startIcon={<QrCodeScannerIcon />}
            >
              Scan QR Code
            </Button>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default QRCodeModal
