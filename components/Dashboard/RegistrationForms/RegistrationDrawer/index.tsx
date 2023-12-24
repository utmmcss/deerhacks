import { ReactNode } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'

import { formKeys, FormSections } from '@/types/Registration'

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
  activeStep: number
  formSections: FormSections
  children: ReactNode
}

const RegistrationDrawer = (props: Props) => {
  const { open, setOpen, activeStep, formSections, children } = props

  return (
    <>
      <Box
        component="div"
        position="fixed"
        zIndex={1000}
        width="100%"
        p="0 0.5rem 0.5rem"
        sx={{ inset: 'auto 0 0' }}
      >
        <Button
          fullWidth
          onClick={() => setOpen(true)}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            pt: 2,
            pb: 0,
            px: 2,
            gap: '1rem',
            boxShadow: 'inset 0 0 5px 100px rgb(0 0 0 / 50%)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Typography sx={{ color: 'text.primary' }}>
            {formSections[formKeys[activeStep]].heading}
          </Typography>
          <ExpandMoreIcon
            sx={{
              position: 'absolute',
              m: 1,
              right: 8,
              top: 10,
              color: 'text.secondary',
            }}
          />

          <LinearProgress
            variant="determinate"
            value={((activeStep + 1) / formKeys.length) * 100}
            sx={{ width: '100%', borderRadius: '0.25rem' }}
          />
        </Button>
      </Box>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer - 1 }}
        open={open}
        onClick={() => setOpen(false)}
      />
      <Drawer
        variant="persistent"
        anchor="bottom"
        open={open}
        onClose={() => setOpen(false)}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Grid display="flex" flexDirection="column" gap="1rem" py={2} px={2}>
          <Typography sx={{ color: 'text.primary' }}>
            {formSections[formKeys[activeStep]].heading}
          </Typography>
          <IconButton
            onClick={() => setOpen(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'text.secondary',
            }}
          >
            <CloseIcon />
          </IconButton>
          <LinearProgress
            variant="determinate"
            value={((activeStep + 1) / formKeys.length) * 100}
            sx={{ borderRadius: '0.25rem' }}
          />
          {children}
        </Grid>
      </Drawer>
    </>
  )
}

export default RegistrationDrawer
