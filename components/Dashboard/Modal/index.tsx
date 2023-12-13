import { ReactNode } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Grow from '@mui/material/Grow'
import IconButton from '@mui/material/IconButton'

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
  title: string
  content: ReactNode
  onSubmit: () => void
}
const Modal = (props: Props) => {
  const { open, setOpen, title, content, onSubmit } = props
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      TransitionComponent={Grow}
      PaperProps={{
        elevation: 2,
        sx: { m: '1rem', maxHeight: 'calc(100% - 2rem)', width: 'calc(100% - 2rem)' },
      }}
      maxWidth="sm"
    >
      <DialogTitle sx={{ m: 0, p: 2, textAlign: 'start' }}>{title}</DialogTitle>
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
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button onClick={onSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  )
}

export default Modal
