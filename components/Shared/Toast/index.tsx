import Alert from '@mui/material/Alert'
import Slide from '@mui/material/Slide'
import Snackbar from '@mui/material/Snackbar'

import { useToast } from '@/contexts/Toast'

const Toast = () => {
  const { open, toast, onClose, onExited } = useToast()

  const autoHideDuration = toast.autoHide === false ? null : 5000

  const handleClose = (_: any, reason?: string) => {
    if (reason === 'clickaway' && !autoHideDuration) return
    onClose()
  }

  return (
    <Snackbar
      open={open}
      key={toast.key}
      autoHideDuration={autoHideDuration}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      TransitionComponent={Slide}
      TransitionProps={{ onExited }}
      onClose={handleClose}
    >
      <Alert
        severity={toast.type}
        onClose={handleClose}
        sx={{
          width: '100%',
          boxShadow: 'inset 0 0 5px 100px rgb(0 0 0 / 30%)',
          backdropFilter: 'blur(10px)',
        }}
      >
        {toast.message}
      </Alert>
    </Snackbar>
  )
}

export default Toast
