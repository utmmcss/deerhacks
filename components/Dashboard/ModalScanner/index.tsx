import Image from 'next/image'

import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded'
import InfoIcon from '@mui/icons-material/Info'
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

import Modal from '@/components/Dashboard/Modal'
import theme from '@/styles/theme'
import { User } from '@/types/User'

export type ScannerModalContext =
  | {
      message: string
      success: boolean
      qrId?: never
      user?: never
    }
  | {
      message?: never
      success?: never
      qrId: string
      user: User
    }

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
  onConfirmCheckIn: (qrId: string) => void
  modalContext: ScannerModalContext
  isLoading: boolean
}

const ModalScanner = (props: Props) => {
  const { open, setOpen, onConfirmCheckIn, modalContext, isLoading } = props

  const desktop = useMediaQuery(theme.breakpoints.up('sm'))

  const userContext = getUserContext(modalContext.user)
  const isUserModal = !!modalContext.user && !!userContext
  const isValidateName = isUserModal && userContext.success === undefined

  const getModalTitle = () => {
    if (isUserModal) {
      if (userContext.success === undefined) return 'Registration'
      return userContext.success ? 'Success' : 'Error'
    }
    return modalContext.success ? 'Success' : 'Error'
  }

  const modalTitle = getModalTitle()

  const getModalColor = () => {
    if (isUserModal) {
      if (userContext.success === undefined) return ''
      return userContext.success ? theme.palette.success.dark : theme.palette.error.dark
    }
    return modalContext.success ? theme.palette.success.dark : theme.palette.error.dark
  }

  const modalColor = getModalColor()

  return (
    <Modal
      open={open}
      title={modalTitle}
      onClose={() => setOpen(false)}
      primaryButton={{
        text: 'Continue',
        size: 'large',
        onClick: () => {
          isValidateName ? onConfirmCheckIn(modalContext.qrId) : setOpen(false)
        },
        fullWidth: !desktop,
        loading: isLoading,
        sx: {
          color: modalColor,
          transition: 'all 0.2s ease',
        },
      }}
      {...(isValidateName && {
        secondaryButton: {
          text: 'Cancel',
          size: 'large',
          onClick: () => {
            setOpen(false)
          },
          disabled: isLoading,
          fullWidth: !desktop,
        },
      })}
      iconButtonSX={{
        color: 'text.primary',
      }}
      PaperProps={{
        elevation: 2,
        sx: {
          transition: 'all 0.2s ease',
          backgroundColor: modalColor,
          m: '1rem',
          maxHeight: 'calc(100% - 2rem)',
          width: 'calc(100% - 2rem)',
        },
      }}
      {...(!desktop && {
        fullScreen: true,
        PaperProps: {
          elevation: 2,
          sx: {
            transition: 'all 0.2s ease',
            backgroundColor: modalColor,
            m: '0',
            maxHeight: '100%',
            width: '100%',
          },
        },
      })}
      dialogContentProps={{
        sx: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          whiteSpace: 'pre-line',
        },
      }}
    >
      {isUserModal ? (
        // Registration validate name before actual check-in
        <Grid
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100%"
          rowGap={4}
        >
          <Grid display="flex" flexDirection="column" alignItems="center" rowGap={2}>
            <Image
              src={modalContext.user.avatar}
              alt="User Avatar"
              width={150}
              height={150}
              style={{
                borderRadius: '50%',
                background: '#ffffff22',
              }}
              draggable={false}
              priority
            />
            <Grid>
              <Typography
                variant="h2"
                textAlign="center"
                width="100%"
                textOverflow="ellipsis"
                overflow="hidden"
                marginBottom="0.5rem"
              >
                {`${modalContext.user.first_name} ${modalContext.user.last_name}`}
              </Typography>
              <Typography color="text.primary" textAlign="center">
                {`@${modalContext.user.username}`}
              </Typography>
            </Grid>
            <Chip
              icon={<InfoIcon />}
              color="secondary"
              label={`Status: ${modalContext.user.status.title()}`}
            />
          </Grid>
          <Typography color="text.primary" textAlign="center">
            {userContext.success === false && <b>{`Error: `}</b>}
            {userContext.message}
          </Typography>
        </Grid>
      ) : (
        // Error or Success from check-in OR api error from user-get
        <>
          {modalContext.success ? (
            <Typography fontSize="8rem">
              <TaskAltRoundedIcon color="secondary" fontSize="inherit" />
            </Typography>
          ) : (
            <Typography fontSize="8rem">
              <ErrorOutlineRoundedIcon color="secondary" fontSize="inherit" />
            </Typography>
          )}
          <Typography color="text.primary" textAlign="center">
            {modalContext.message}
          </Typography>
        </>
      )}
    </Modal>
  )
}

const getUserContext = (user?: User) => {
  if (!user) return

  switch (user.status) {
    case 'accepted':
      return {
        message: `Confirm registration for this hacker?`,
      }

    case 'attended':
      return {
        message: 'Hacker has already checked in.',
        success: false,
      }
    case 'admin':
    case 'moderator':
    case 'guest':
    case 'volunteer':
      return {
        message: `${user.status.capitalize()}s don't need to check-in.`,
        success: true,
      }

    default:
      // pending, registering, applied, selected, rejected
      return {
        message: `${user.status.capitalize()} users cannot check-in.`,
        success: false,
      }
  }
}

export default ModalScanner
