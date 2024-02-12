import { ReactNode } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { ButtonProps } from '@mui/material/Button'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import DialogActions, { DialogActionsProps } from '@mui/material/DialogActions'
import DialogContent, { DialogContentProps } from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Grow from '@mui/material/Grow'
import IconButton from '@mui/material/IconButton'
import { SxProps, Theme } from '@mui/material/styles'

import LoadingButton from '@/components/Dashboard/LoadingButton'

type Props = {
  open: boolean
  title: ReactNode
  onClose: () => void
  primaryButton?: CustomButtonProps
  secondaryButton?: CustomButtonProps
  children: ReactNode
  dialogContentProps?: DialogContentProps
  dialogActionsProps?: DialogActionsProps
  iconButtonSX?: SxProps<Theme>
} & Omit<DialogProps, 'title'>

const Modal = (props: Props) => {
  const {
    open,
    title,
    onClose,
    primaryButton,
    secondaryButton,
    children,
    dialogContentProps,
    dialogActionsProps,
    iconButtonSX,
    ...dialogProps
  } = props

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
          ...iconButtonSX,
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent {...dialogContentProps}>{children}</DialogContent>
      <DialogActions
        {...dialogActionsProps}
        {...(!primaryButton && !secondaryButton && { sx: { p: 0 } })}
      >
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

type CustomButtonProps = {
  text: string
  onClick: () => void
  loading?: boolean
} & ButtonProps

export default Modal
