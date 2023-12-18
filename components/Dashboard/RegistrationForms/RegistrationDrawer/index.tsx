import { ReactNode } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import Backdrop from '@mui/material/Backdrop'
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
      <Grid
        component="div"
        position="fixed"
        left={1}
        right={1}
        bottom={1}
        zIndex={100}
        style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
        borderRadius={1}
        margin={1}
        onClick={() => setOpen(true)}
        overflow="hidden"
      >
        <Typography sx={{ p: 2, color: 'text.primary' }}>
          {formSections[formKeys[activeStep]].heading}
        </Typography>
        <LinearProgress variant="determinate" value={((activeStep + 1) / formKeys.length) * 100} />
      </Grid>
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
        <Grid display="flex" flexDirection="column" gap="1rem">
          <Typography sx={{ p: 2, color: 'text.primary', paddingBottom: 0 }}>
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
          />
          {children}
        </Grid>
      </Drawer>
    </>
  )
}

export default RegistrationDrawer
