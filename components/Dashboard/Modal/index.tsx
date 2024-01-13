import { ReactNode } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { ButtonProps } from '@mui/material/Button'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Grow from '@mui/material/Grow'
import IconButton from '@mui/material/IconButton'

import LoadingButton from '@/components/Dashboard/LoadingButton'

type CustomButtonProps = {
  text: string
  onClick: () => void
  loading?: boolean
} & ButtonProps

type Props = {
  open: boolean
  title: string
  onClose: () => void
  primaryButton?: CustomButtonProps
  secondaryButton?: CustomButtonProps
  children: ReactNode
} & DialogProps

const Modal = (props: Props) => {
  const { open, title, onClose, primaryButton, secondaryButton, children, ...dialogProps } = props

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Grow}
      PaperProps={{
        elevation: 2,
        sx: { m: '1rem', maxHeight: 'calc(100% - 2rem)', width: 'calc(100% - 2rem)' },
      }}
      maxWidth="sm"
      {...dialogProps}
    >
      <DialogTitle sx={{ m: 0, p: 2, textAlign: 'start' }}>{title}</DialogTitle>
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 12,
          color: 'text.secondary',
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {secondaryButton && (
          <LoadingButton variant="text" loading={!!secondaryButton.loading} {...secondaryButton}>
            {secondaryButton.text}
          </LoadingButton>
        )}
        {primaryButton && (
          <LoadingButton loading={!!primaryButton.loading} {...primaryButton}>
            {primaryButton.text}
          </LoadingButton>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default Modal
