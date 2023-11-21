import { useState } from 'react'

import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Grow from '@mui/material/Grow'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import { UserStatus } from '@/types/User'

type Props = {
  status: UserStatus
  open: boolean
  setOpen: (open: boolean) => void
}

const ModalTips = (props: Props) => {
  const { status, open, setOpen } = props

  const [expanded, setExpanded] = useState<string | false>('dashboard')
  const handleChange =
    (panel: string) =>
    ({}, different: boolean) => {
      setExpanded(different ? panel : false)
    }

  const qrCodeEnabled = ['admin', 'moderator', 'volunteer', 'accepted', 'attended'].includes(status)

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      TransitionComponent={Grow}
      PaperProps={{
        sx: {
          m: '1rem',
          maxHeight: 'calc(100% - 2rem)',
          width: 'calc(100% - 2rem)',
          backgroundImage:
            'radial-gradient(circle closest-corner at 25% 60%, rgba(238, 39, 39, 0.25), rgba(255, 255, 255, 0)), radial-gradient(circle farthest-side at 71% 16%, rgba(154, 39, 238, 0.15), rgba(255, 255, 255, 0) 35%), radial-gradient(circle closest-corner at 32% 38%, rgba(238, 164, 39, 0.1), rgba(255, 255, 255, 0) 76%), radial-gradient(circle farthest-side at 69% 81%, rgba(255, 0, 48, 0.1), rgba(255, 255, 255, 0) 76%), linear-gradient(#202124, #202124)',
        },
      }}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>Tips & Help</DialogTitle>
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
      <Alert severity="info" sx={{ m: '0.5rem 1rem' }}>
        More tips will become available as your user status changes.
      </Alert>
      <DialogContent sx={{ p: '1rem' }}>
        <Box component="div" display="flex" flexDirection="column" gap="0.25rem">
          <Accordion expanded={expanded === 'dashboard'} onChange={handleChange('dashboard')}>
            <AccordionSummary expandIcon={<AddIcon />}>
              <Typography>DeerHacks Dashboard</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography gutterBottom>
                The DeerHacks Dashboard is a platform for hackers to register for DeerHacks, acquire
                information about events, and obtain resources for success! Organized by the
                Mathematical and Computational Sciences Society (MCSS), we welcome you to join us in
                our third iteration of DeerHacks!
              </Typography>
              <Typography>
                To get the most out of DeerHacks, we recommend you frequently check on the dashboard
                and follow us @deerhacks for any updates or giveaways.
              </Typography>
            </AccordionDetails>
          </Accordion>
          {qrCodeEnabled && (
            <Accordion expanded={expanded === 'qrCode'} onChange={handleChange('qrCode')}>
              <AccordionSummary expandIcon={<AddIcon />}>
                <Typography>QR Code</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography gutterBottom>
                  You can access your QR code by clicking on your avatar in the dashboard. This QR
                  code is your personal ticket to DeerHacks and will be used for your
                  identification, so make sure to not share it with anyone else.
                </Typography>
                <Typography>
                  Organizers and volunteers will scan your QR code to check you into DeerHacks,
                  along other sign-ins such as food distribution. Keep a screenshot of your QR code
                  handy in case you need to access it offline.
                </Typography>
              </AccordionDetails>
            </Accordion>
          )}
          <Accordion expanded={expanded === 'status'} onChange={handleChange('status')}>
            <AccordionSummary expandIcon={<AddIcon />}>
              <Typography>User Status</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography gutterBottom>
                Your user <code>status</code> is the state of progress in your DeerHacks
                application. Our dashboard status tile will provide you with information regarding
                your status and what steps to take next. For example, a user with a pending status
                will need to verify their email address before starting their registration.
              </Typography>
              <Typography>
                Your status must be of <code>accepted</code> for in person registration & will be
                updated to <code>attended</code>, which is required to access our venue and
                participate in our events. If your status does not automatically update, try logging
                in again.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'help'} onChange={handleChange('help')}>
            <AccordionSummary expandIcon={<AddIcon />}>
              <Typography>Help</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography gutterBottom>
                If you need any assistance or have questions not already outlined in our FAQ /
                dashboard, open a ticket on our DeerHacks Discord server and our team will be happy
                to help out! However, please note that direct messages to DeerHacks organizers for
                ticket related assistance will be ignored.
              </Typography>
              <Typography>
                We are always open to feedback and suggestions at DeerHacks. If you have any
                concerns, ideas, or found a bug in our dashboard please let us know!
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default ModalTips
