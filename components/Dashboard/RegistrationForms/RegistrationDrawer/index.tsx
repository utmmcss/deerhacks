import { ReactNode } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LinearProgress from '@mui/material/LinearProgress'
import { styled } from '@mui/material/styles'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import Typography from '@mui/material/Typography'

import { formKeys, FormSections } from '@/types/Registration'

const drawerBleeding = 60

const Puller = styled(Box)(() => ({
  width: 30,
  height: 6,
  backgroundColor: 'grey',
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}))

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
  activeStep: number
  formSections: FormSections
  children: ReactNode
}

const RegistrationDrawer = (props: Props) => {
  const { open, setOpen, activeStep, formSections, children } = props

  // hanatodo
  // child doesn't update properly
  // disappears when scrolling to top of window

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      swipeAreaWidth={drawerBleeding}
      ModalProps={{
        keepMounted: true,
      }}
      PaperProps={{
        style: {
          overflow: 'visible',
          borderRadius: 0,
        },
      }}
    >
      <Box
        component="div"
        sx={{
          position: 'absolute',
          top: -drawerBleeding,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          visibility: 'visible',
          right: 0,
          left: 0,
          backgroundColor: '#353535',
        }}
      >
        <Puller />
        <Typography sx={{ p: 2, color: 'text.secondary' }}>
          {formSections[formKeys[activeStep]].heading}
        </Typography>
        <LinearProgress variant="determinate" value={(activeStep / formKeys.length) * 100} />
      </Box>
      <Grid
        sx={{
          px: 2,
          pb: 2,
          height: '100%',
          overflow: 'auto',
          borderRadius: 0,
          paddingTop: `16px`,
        }}
      >
        {children}
      </Grid>
    </SwipeableDrawer>
  )
}

export default RegistrationDrawer
