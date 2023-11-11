import { useEffect, useState } from 'react'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CloseIcon from '@mui/icons-material/Close'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Grow from '@mui/material/Grow'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import AccountCreate from '@/components/Dashboard/ModalAccount/AccountCreate'
import AccountSummary from '@/components/Dashboard/ModalAccount/AccountSummary'
import EmailUpdate from '@/components/Dashboard/ModalAccount/EmailUpdate'
import ModalPage, { ModalAccountState } from '@/components/Dashboard/ModalAccount/ModalPage'
import NameUpdate from '@/components/Dashboard/ModalAccount/NameUpdate'
import SuccessPage from '@/components/Dashboard/SuccessPage'
import { User } from '@/types/User'

const headings: { [key in ModalAccountState]: string } = {
  firstUpdate: 'Account Details',
  summary: 'Account Details',
  name: 'Name',
  email: 'Email',
  firstSuccess: '',
  success: '',
}

type Props = {
  user: User
  open: boolean
  setOpen: (open: boolean) => void
}

const ModalAccount = (props: Props) => {
  const { user, open, setOpen } = props

  const firstUpdate = !user.first_name || !user.last_name
  const [state, setState] = useState<ModalAccountState>(firstUpdate ? 'firstUpdate' : 'summary')
  const [disableSlideIn, setDisableSlideIn] = useState(true)

  const showBackButton = !['firstUpdate', 'firstSuccess', 'summary'].includes(state)

  const handleClose = () => {
    setOpen(false)
    setDisableSlideIn(true)
  }

  const handleChangePage = (state: ModalAccountState) => {
    return () => {
      setState(state)
      if (['firstSuccess', 'name', 'email'].includes(state)) setDisableSlideIn(false)
    }
  }

  useEffect(() => {
    if (open) setState(firstUpdate ? 'firstUpdate' : 'summary')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Grow}
      PaperProps={{
        elevation: 2,
        sx: { m: '1rem', maxHeight: 'calc(100% - 2rem)', width: 'calc(100% - 2rem)' },
      }}
      maxWidth="sm"
      disableRestoreFocus
    >
      {showBackButton && (
        <IconButton
          onClick={handleChangePage('summary')}
          sx={{
            position: 'absolute',
            left: 8,
            top: 12,
            color: 'text.secondary',
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      )}
      <DialogTitle sx={{ m: 0, p: 2, textAlign: showBackButton ? 'center' : 'start' }}>
        {headings[state]}
      </DialogTitle>
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
      <ModalPage
        page="firstUpdate"
        nextPage={['firstSuccess']}
        currentState={state}
        disableSlideIn={disableSlideIn}
      >
        <AccountCreate user={user} onSuccess={handleChangePage('firstSuccess')} />
      </ModalPage>
      <ModalPage
        page="summary"
        nextPage={['name', 'email']}
        currentState={state}
        disableSlideIn={disableSlideIn}
      >
        <AccountSummary
          user={user}
          onClickName={handleChangePage('name')}
          onClickEmail={handleChangePage('email')}
        />
      </ModalPage>
      <ModalPage page="name" previousPage={['summary']} currentState={state}>
        <NameUpdate show={state === 'name'} user={user} onSuccess={handleChangePage('summary')} />
      </ModalPage>
      <ModalPage
        page="email"
        previousPage={['summary']}
        nextPage={['success']}
        currentState={state}
      >
        <EmailUpdate show={state === 'email'} user={user} onSuccess={handleChangePage('success')} />
      </ModalPage>
      <ModalPage page="firstSuccess" previousPage={['firstUpdate']} currentState={state}>
        <DialogContent sx={{ pb: '2rem' }}>
          <SuccessPage show={state === 'firstSuccess'} heading={'Account Updated Successfully'}>
            <Typography gutterBottom>
              A confirmation email was sent to {user.email}. Please follow the link in the email to
              update your status to <code>registering</code>.
            </Typography>
          </SuccessPage>
        </DialogContent>
      </ModalPage>
      <ModalPage page="success" previousPage={['email']} currentState={state}>
        <DialogContent sx={{ pb: '2rem' }}>
          <SuccessPage show={state === 'success'} heading={'Email Updated Successfully'}>
            <Typography gutterBottom>
              A confirmation email was sent to {user.email}. Please follow the link in the email to
              update your status to <code>registering</code>.
            </Typography>
          </SuccessPage>
        </DialogContent>
      </ModalPage>
    </Dialog>
  )
}

export default ModalAccount
