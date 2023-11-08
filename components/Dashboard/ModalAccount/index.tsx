import { ReactNode, useEffect, useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Grid from '@mui/material/Grid'
import Grow from '@mui/material/Grow'
import IconButton from '@mui/material/IconButton'
import Slide from '@mui/material/Slide'
import Typography from '@mui/material/Typography'

import SuccessPage from '@/components/Dashboard/SuccessPage'
import { User } from '@/types/User'

import AccountSummary from './AccountSummary'
import EmailUpdate from './EmailUpdate'
import FirstUserUpdate from './FirstUserUpdate'
import NameUpdate from './NameUpdate'

const states = ['firstUpdate', 'summary', 'name', 'email', 'firstSuccess', 'success'] as const
type State = (typeof states)[number]

const headings: { [key in State]: string } = {
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

  // First account configuration requires all flags to be sent
  const firstUpdate = !user.first_name || !user.last_name
  const [state, setState] = useState<State>(firstUpdate ? 'firstUpdate' : 'summary')

  // don't want to slide in when we open the modal
  const [disableSlideIn, setDisableSlideIn] = useState(true)

  const handleClose = () => {
    setOpen(false)
    setDisableSlideIn(true)
  }

  const handleChangePage = (state: State) => {
    return () => {
      setState(state)
      if (['firstSuccess', 'name', 'email'].includes(state)) setDisableSlideIn(false)
    }
  }

  useEffect(() => {
    // flickers before closing if we change on close
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
      {!['firstUpdate', 'firstSuccess', 'summary'].includes(state) && (
        <Button
          size="small"
          onClick={handleChangePage('summary')}
          disabled={false}
          startIcon={<NavigateBeforeIcon />}
          sx={{
            position: 'absolute',
            left: 8,
            top: 8,
            color: 'text.secondary',
            padding: '0.75rem',
            borderRadius: '16px',
          }}
        >
          Back
        </Button>
      )}
      <DialogTitle sx={{ m: 0, p: 2, textAlign: 'center' }}>{headings[state]}</DialogTitle>
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

      <DialogContent>
        <ModalPage
          page="firstUpdate"
          nextPage={['firstSuccess']}
          currentState={state}
          disableSlideIn={disableSlideIn}
        >
          <FirstUserUpdate user={user} onSuccess={handleChangePage('firstSuccess')} />
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
          <EmailUpdate
            show={state === 'email'}
            user={user}
            onSuccess={handleChangePage('success')}
          />
        </ModalPage>

        <ModalPage page="firstSuccess" previousPage={['firstUpdate']} currentState={state}>
          <SuccessPage show={state === 'firstSuccess'} heading={'Account Updated Successfully'}>
            <Typography>
              A confirmation email will be sent to {user.email}. Please follow the link in the email
              to update your status to <code>registering</code>.
            </Typography>
          </SuccessPage>
        </ModalPage>

        <ModalPage page="success" previousPage={['email']} currentState={state}>
          <SuccessPage show={state === 'success'} heading={'Email Updated Successfully'}>
            <Typography>
              A confirmation email was sent to {user.email}. Your status has been reverted to{' '}
              <code>pending</code>. Please follow the link in the email to change your status back
              to <code>registering</code>.
            </Typography>
          </SuccessPage>
        </ModalPage>
      </DialogContent>
    </Dialog>
  )
}

export default ModalAccount

type PageProps = {
  page: State
  previousPage?: State[]
  nextPage?: State[]
  currentState: State
  disableSlideIn?: boolean
  children: ReactNode
}

const ModalPage = (props: PageProps) => {
  const { page, previousPage, nextPage, currentState, disableSlideIn, children } = props

  const [direction, setDirection] = useState<'left' | 'right'>('right')

  useEffect(() => {
    if (previousPage?.includes(currentState)) {
      setDirection('left')
    }
    if (nextPage?.includes(currentState)) {
      setDirection('right')
    }
  }, [currentState, nextPage, previousPage])

  if (disableSlideIn && currentState === page) {
    return children
  }

  return (
    <Grid overflow="hidden" {...(currentState !== page && { height: 0 })}>
      <Slide
        direction={direction}
        in={currentState === page}
        appear={false}
        easing={{ enter: 'cubic-bezier(0, 1.1, .8, 1)', exit: 'cubic-bezier(0, 1.1, .8, 1)' }}
      >
        <div>{children}</div>
      </Slide>
    </Grid>
  )
}
