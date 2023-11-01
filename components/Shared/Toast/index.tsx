import { useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import Snackbar from '@mui/material/Snackbar'

// TODO: Make this the global toast component

const Toast = () => {
  const [open, setOpen] = useState(true)

  return (
    <Snackbar
      open={open}
      message="Test"
      color="success"
      key={new Date().getTime()}
      autoHideDuration={6000}
      onClose={() => setOpen(false)}
      action={
        <IconButton onClick={() => setOpen(false)}>
          <CloseIcon />
        </IconButton>
      }
    />
  )
}

export default Toast
